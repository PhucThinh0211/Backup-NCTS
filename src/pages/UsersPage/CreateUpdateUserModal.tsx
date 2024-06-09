import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Checkbox,
  Col,
  Form,
  FormProps,
  Input,
  Modal,
  Row,
  Spin,
  Tabs,
  Tooltip,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

import { CreateUserInput, IRole } from '@/services/IdentityService';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  IdentityLoadingEnum,
  IdentityModalEnum,
  createAssignableRolesSelector,
  createUserRolesSelector,
  createUserSelectedSelector,
  identityActions,
} from '@/store/identity';
import { getLoading } from '@/store/loading';
import { getModalVisible, hideModal } from '@/store/modal';

export const CreateUpdateUserModal = () => {
  const { t } = useTranslation(['common']);
  const [tabActiveKey, setTabActiveKey] = useState('1');
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const selectedUser = useAppSelector(createUserSelectedSelector());
  const userRoles = useAppSelector(createUserRolesSelector());
  const assignableRoles = useAppSelector(createAssignableRolesSelector());

  const isModalOpen = useAppSelector(
    getModalVisible(IdentityModalEnum.userModal)
  );
  const isLoading = useAppSelector(
    getLoading([
      IdentityLoadingEnum.getUserRoles,
      IdentityLoadingEnum.getAssignableRoles,
    ])
  );
  const isSaving = useAppSelector(
    getLoading([IdentityLoadingEnum.createUser, IdentityLoadingEnum.updateUser])
  );

  useEffect(() => {
    dispatch(identityActions.getAssignableRolesRequest());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (selectedUser) {
      dispatch(identityActions.getUserRoles(selectedUser.id));
    }
    // eslint-disable-next-line
  }, [selectedUser]);

  const handleCancel = () => {
    dispatch(identityActions.setUserSelected(undefined));
    dispatch(identityActions.setUserRoles([]));
    dispatch(hideModal({ key: IdentityModalEnum.userModal }));
  };

  const handleOk = () => form.submit();

  const checkRoleSelected = (roleId: string) => {
    return userRoles.findIndex((x) => x.id === roleId) > -1;
  };

  const onChangeRoles = (role: IRole) => {
    const userRoleList: IRole[] = JSON.parse(JSON.stringify(userRoles));
    const idx = userRoleList.findIndex((x) => x.id === role.id);
    if (idx > -1) {
      userRoleList.splice(idx, 1);
    } else {
      userRoleList.push(role);
    }
    dispatch(identityActions.setUserRoles(userRoleList));
  };

  const handleSaveUser = (values: any) => {
    const inputData: CreateUserInput = {
      ...values,
      roleNames: userRoles.map((x) => x.name),
      password: values.password || undefined,
    };
    if (selectedUser) {
      dispatch(
        identityActions.updateUserRequest({
          id: selectedUser.id,
          input: inputData,
        })
      );
      return;
    }
    dispatch(identityActions.createUserRequest(inputData));
  };

  const onFinishFailed: FormProps<any>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
    setTabActiveKey('1');
  };

  return (
    <Modal
      title={
        selectedUser
          ? t('Update', { ns: 'common' })
          : t('Add new', { ns: 'common' })
      }
      open={isModalOpen}
      okText={t('OkText', { ns: 'common' })}
      onOk={handleOk}
      cancelText={t('CancelText', { ns: 'common' })}
      onCancel={handleCancel}
      confirmLoading={isSaving}
    >
      <Spin spinning={isLoading}>
        <Tabs
          activeKey={tabActiveKey}
          onChange={setTabActiveKey}
          items={[
            {
              label: t('User information'),
              key: '1',
              children: (
                <Form
                  form={form}
                  layout='vertical'
                  initialValues={{
                    ...selectedUser,
                  }}
                  onFinish={handleSaveUser}
                  onFinishFailed={onFinishFailed}
                  autoComplete='off'
                >
                  <Form.Item
                    label={t('username', { ns: 'common' })}
                    name='userName'
                    rules={[
                      {
                        required: true,
                        message: t('Enter user name', { ns: 'common' }),
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label={
                      <>
                        {t('Password', { ns: 'common' })}{' '}
                        <Tooltip title={t('Valid password', { ns: 'common' })}>
                          <QuestionCircleOutlined
                            style={{ marginLeft: 6, fontSize: 12 }}
                          />
                        </Tooltip>
                      </>
                    }
                    name='password'
                    rules={[
                      {
                        required: true,
                        message: t('Enter password', { ns: 'common' }),
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Row gutter={[10, 10]}>
                    <Col span={24} sm={12}>
                      <Form.Item
                        label={t('Last name', { ns: 'common' })}
                        name='name'
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={24} sm={12}>
                      <Form.Item
                        label={t('First name', { ns: 'common' })}
                        name='surname'
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    label={t('Email', { ns: 'common' })}
                    name='email'
                    rules={[
                      {
                        required: true,
                        message: t('Email required', { ns: 'common' }),
                      },
                      {
                        type: 'email',
                        message: t('Invalid email', { ns: 'common' }),
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label={t('Phone', { ns: 'common' })}
                    name='phoneNumber'
                  >
                    <Input />
                  </Form.Item>
                  <div>
                    <Form.Item name='isActive' valuePropName='checked'>
                      <Checkbox>{t('Active')}</Checkbox>
                    </Form.Item>
                    <Form.Item name='lockoutEnabled' valuePropName='checked'>
                      <Checkbox>
                        {t('Lock account after failed login attempts')}
                      </Checkbox>
                    </Form.Item>
                  </div>
                </Form>
              ),
            },
            {
              label: t('Roles'),
              key: '2',
              children: (
                <div>
                  {assignableRoles.map((role) => (
                    <div key={role.id} className='my-2'>
                      <Checkbox
                        checked={checkRoleSelected(role.id)}
                        onClick={() => onChangeRoles(role)}
                      >
                        {role.name}
                      </Checkbox>
                    </div>
                  ))}
                </div>
              ),
            },
          ]}
        />
      </Spin>
    </Modal>
  );
};
