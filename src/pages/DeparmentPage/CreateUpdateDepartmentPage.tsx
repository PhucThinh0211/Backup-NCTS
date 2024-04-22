import { useEffect } from 'react';

import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Spin, Typography } from 'antd';
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
import {
  CreateUpdateContactModalName,
  GettingDepartmentLoadingKey,
  SavingDepartmentLoadingKey,
} from '@/common';

import { getLocale } from '@/store/persistState';
import { DepartmentResponse } from '@/services/DepartmentService';
import { getModalVisible, showModal } from '@/store/modal';
import { CreateUpdateContactModal } from './CreateUpdateContactModal';
import { ContactListTable } from './ContactListTable';

export const CreateUpdateDepartmentPage = () => {
  const { t } = useTranslation(['common', 'department']);
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const isContactModalOpen = useAppSelector(
    getModalVisible(CreateUpdateContactModalName)
  );
  const departments = useAppSelector(getDepartments());
  const selectedDepartment = useAppSelector(getSelectedDepartment());
  const selectedDepartmentDetail = useAppSelector(
    getSelectedDepartmentDetail()
  );
  const locale = useAppSelector(getLocale());
  const isSubmmiting = useAppSelector(getLoading(SavingDepartmentLoadingKey));
  const isLoading = useAppSelector(getLoading(GettingDepartmentLoadingKey));

  const sortedDepartments: DepartmentResponse[] = Utils.deepClone(
    departments?.items || []
  );
  sortedDepartments.sort((a, b) => {
    return a.sortSeq - b.sortSeq;
  });

  useEffect(() => {
    if (locale && selectedDepartment) {
      dispatch(
        departmentActions.getDepartmentRequest({
          departmentId: selectedDepartment.id,
        })
      );
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
    dispatch(
      departmentActions.createDepartmentRequest({
        department: { ...inputData },
      })
    );
  };

  const createContact = () => {
    dispatch(departmentActions.setSelectedContact(undefined));
    dispatch(showModal({ key: CreateUpdateContactModalName }));
  };

  return (
    <div className='p-4'>
      {isContactModalOpen && <CreateUpdateContactModal />}
      <Link
        to={'/admin/contacts'}
        className={'d-flex flex-row align-items-center gap-1 mb-2'}
      >
        <ArrowLeftOutlined style={{ fontSize: 12 }} />
        {t('Back', { ns: 'common' })}
      </Link>
      <div className='d-flex flex-row justify-content-between align-items-center'>
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
      <Form
        autoComplete='off'
        form={form}
        onFinish={handleSaveDepartment}
        layout='vertical'
      >
        <Spin spinning={isLoading}>
          <Row gutter={[10, 10]} className='mt-2'>
            <Col md={16} sm={24}>
              <div className='w-full border-b rounded-2 bg-white p-3 shadow-sm'>
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
                          <span className='text-uppercase text-danger'>
                            {locale}
                          </span>
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
                    {selectedDepartment && (
                      <>
                        <div className='w-100 d-flex flex-row justify-content-between align-items-center'>
                          <Typography.Text className='ant-form-item-label'>
                            {t('Contacts', { ns: 'department' })}
                          </Typography.Text>
                          <Button
                            type='primary'
                            onClick={createContact}
                            icon={<PlusOutlined />}
                          >
                            {t('Add new', { ns: 'department' })}
                          </Button>
                        </div>
                        <ContactListTable />
                      </>
                    )}
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
