import { useEffect } from 'react';

import { ArrowLeftOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Spin,
  Typography,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import {
  getDepartments,
  getSelectedDepartment,
  getSelectedDepartmentDetail,
  departmentActions,
} from '@/store/department';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { AuditedDepartment } from './AuditedDepartment';
import Utils from '@/utils';
import { getLoading } from '@/store/loading';
import { GettingDepartmentLoadingKey, SavingDepartmentLoadingKey } from '@/common';

import { getLocale } from '@/store/persistState';
import { DepartmentResponse } from '@/services/DepartmentService';

export const CreateUpdateDepartmentPage = () => {
  const { t } = useTranslation(['common', 'department']);
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const departments = useAppSelector(getDepartments());
  const selectedDepartment = useAppSelector(getSelectedDepartment());
  const selectedDepartmentDetail = useAppSelector(getSelectedDepartmentDetail());
  const locale = useAppSelector(getLocale());
  const isSubmmiting = useAppSelector(getLoading(SavingDepartmentLoadingKey));
  const isLoading = useAppSelector(getLoading(GettingDepartmentLoadingKey));

  const sortedDepartments: DepartmentResponse[] = Utils.deepClone(departments?.items || []);
  sortedDepartments.sort((a, b) => {
    return a.sortSeq - b.sortSeq;
  })

  const contactTypes = [
    {
      label: t('Phone', { ns: 'department'}),
      value: "Phone",
    },
    {
      label: t('Ext', { ns: 'department'}),
      value: "Ext",
    },
    {
      label: t('Fax', { ns: 'department'}),
      value: "Fax",
    },
    {
      label: t('Email', { ns: 'department'}),
      value: "Email",
    },
  ]

  useEffect(() => {
    if (locale && selectedDepartment) {
      dispatch(departmentActions.getDepartmentRequest({ departmentId: selectedDepartment.id }));
    }
  }, [locale, selectedDepartment]);
  
  useEffect(() => {
    if (selectedDepartmentDetail) {
      form.setFieldsValue({
        ...selectedDepartmentDetail,
      });
    } else {
      form.resetFields();
    }
  }, [selectedDepartmentDetail]);

  const handleSaveDepartment = (values: any) => {
    const inputData = {
      ...values,
    };
    if (selectedDepartment) {
      // prettier-ignore
      dispatch(departmentActions.updateDepartmentRequest({ departmentId: selectedDepartment.id, department: { ...selectedDepartmentDetail, ...inputData }}));
      return;
    }
    dispatch(departmentActions.createDepartmentRequest({ department: { ...inputData } }));
  };

  return (
    <div className='p-4'>
      <Link
        to={'/admin/contacts'}
        className={'flex flex-row items-center gap-1 mb-4'}
      >
        <ArrowLeftOutlined style={{ fontSize: 12 }} />
        {t('Back', { ns: 'common' })}
      </Link>
      <div className='flex flex-row justify-between items-center'>
        <div>
          <Typography.Title level={4}>
            {selectedDepartment
              ? t('Update department', { ns: 'department' })
              : t('Create department', { ns: 'department' })}
          </Typography.Title>
        </div>
        <div>
          <Button type='primary' onClick={form.submit} loading={isSubmmiting}>
            {t('OkText', { ns: 'common' })}
          </Button>
        </div>
      </div>
      <Form autoComplete='off' form={form} onFinish={handleSaveDepartment} layout='vertical'>
        <Spin spinning={isLoading}>
          <Row gutter={[10, 10]} className='mt-4'>
            <Col md={16} sm={24}>
              <div className='w-full border-b-gray-500 rounded-md bg-white p-4 shadow-sm'>
                <Row>
                  <Col span={24} md={24}>
                    <Form.Item
                      label={t('Code', { ns: 'department' })}
                      name='code'
                      rules={[
                        {
                          required: true,
                          message: t('Code required', { ns: 'department' }),
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label={
                        <div>
                          <span>{t('Name', { ns: 'department' })}</span>
                          {' - '}
                          <span className='uppercase text-red-600'>{locale}</span>
                        </div>
                      }
                      name='name'
                      rules={[
                        {
                          required: true,
                          message: t('Name required', { ns: 'department' }),
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.List name='contacts'>
                      {(fields, { add, remove }, { errors }) => (
                        <>
                          <div className='w-full flex flex-row justify-between items-center'>
                            <Typography.Text className='ant-form-item-label'>
                              {t('Contacts', { ns: 'department' })}
                            </Typography.Text>
                            <Button
                              type='primary'
                              onClick={() => add()}
                              icon={<PlusOutlined />}
                            >
                              {t('Add contact', { ns: 'department' })}
                            </Button>
                          </div>

                          {fields.map((field) => (
                            <div
                              key={field.key}
                              className='flex flex-row justify-between my-3 gap-2'
                            >
                              <div className='w-full flex flex-col gap-2'>
                                <Row gutter={[10, 10]}>
                                  <Col xs={24} md={12}>
                                    <Form.Item
                                      {...field}
                                      name={[field.name, 'type']}
                                      rules={[
                                        {
                                          required: true,
                                          message: t('Type required', { ns: 'department' }),
                                        },
                                      ]}
                                    >
                                      <Select
                                        options={contactTypes}
                                        placeholder={t('Type', {
                                          ns: 'department',
                                        })}
                                        style={{ width: '100%' }}
                                      />
                                    </Form.Item>
                                  </Col>
                                  <Col xs={24} md={12}>
                                    <Form.Item
                                      {...field}
                                      name={[field.name, 'code']}
                                      rules={[
                                        {
                                          required: true,
                                          message: t('Code required', { ns: 'department' }),
                                        },
                                      ]}
                                    >
                                      <Input
                                        placeholder={t('Code', {
                                          ns: 'department',
                                        })}
                                      />
                                    </Form.Item>
                                  </Col>
                                  <Col xs={24} md={12}>
                                    <Form.Item
                                      {...field}
                                      name={[field.name, 'title']}
                                      rules={[
                                        {
                                          required: true,
                                          message: t('Title required', { ns: 'department' }),
                                        },
                                      ]}
                                    >
                                      <Input
                                        placeholder={t('Title', {
                                          ns: 'department',
                                        })}
                                      />
                                    </Form.Item>
                                  </Col>
                                  <Col xs={24} md={12}>
                                    <Form.Item
                                      {...field}
                                      name={[field.name, 'contactNum']}
                                      rules={[
                                        {
                                          required: true,
                                          whitespace: true,
                                          message: t('Contact num required', { ns: 'department' }),
                                        },
                                      ]}
                                    >
                                      <Input
                                        placeholder={t('Contact num', {
                                          ns: 'department',
                                        })}
                                      />
                                    </Form.Item>
                                  </Col>
                                </Row>
                              </div>
                              <MinusCircleOutlined
                                className='dynamic-delete-button'
                                onClick={() => remove(field.name)}
                              />
                            </div>
                          ))}
                        <Form.ErrorList errors={errors} />
                        </>
                      )}
                    </Form.List>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col md={8} sm={24}>
              <AuditedDepartment />
            </Col>
          </Row>
        </Spin>
      </Form>
    </div>
  );
};
