import { ArrowLeftOutlined } from '@ant-design/icons';
import { getSelectedMenu, menuActions } from '@/store/menu';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Button, Col, Form, Input, Row, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MenuInformation } from './MenuInformation';
import { useEffect } from 'react';
import Utils from '@/utils';
import { getLoading } from '@/store/loading';
import { SavingMenuLoadingKey } from '@/common';

export const CreateUpdateMenuPage = () => {
  const { t } = useTranslation(['common', 'menu']);
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const selectedMenu = useAppSelector(getSelectedMenu());
  const isSubmmiting = useAppSelector(getLoading(SavingMenuLoadingKey));

  const menuTitle = Form.useWatch('label', form);

  useEffect(() => {
    if (menuTitle) {
      form.setFieldValue('url', Utils.createSlug(menuTitle));
    }
  }, [menuTitle]);

  const handleSaveMenu = (values: any) => {
    const inputData = {
      ...values,
    };
    if (selectedMenu) {
      // prettier-ignore
      dispatch(menuActions.updateMenuRequest({ menuId: selectedMenu.id, menu: { ...selectedMenu, ...inputData }}));
      return;
    }
    dispatch(
      menuActions.createMenuRequest({
        menu: {
          ...inputData,
          url: `/${inputData.url}`,
        },
      })
    );
  };

  return (
    <div className='p-4'>
      <Link to={'/admin/menu'} className={'flex flex-row items-center gap-1'}>
        <ArrowLeftOutlined style={{ fontSize: 12 }} />
        {t('Back', { ns: 'common' })}
      </Link>
      <div className='flex flex-row justify-between items-center'>
        <div>
          <Typography.Title level={4}>
            {selectedMenu
              ? t('Update menu', { ns: 'menu' })
              : t('Create menu', { ns: 'menu' })}
          </Typography.Title>
        </div>
        <div>
          <Button type='primary' onClick={form.submit} loading={isSubmmiting}>
            {t('OkText', { ns: 'common' })}
          </Button>
        </div>
      </div>
      <Form
        form={form}
        onFinish={handleSaveMenu}
        initialValues={{
          ...selectedMenu,
          url: selectedMenu?.url
            ? selectedMenu?.url.split('/').pop()
            : undefined,
        }}
        layout='vertical'
      >
        <Row gutter={[10, 10]} className='mt-4'>
          <Col span={16}>
            <div className='w-full border-b-gray-500 rounded-md bg-white p-4 shadow-sm'>
              <Row>
                <Col span={24} md={24}>
                  <Form.Item
                    label={t('Name', { ns: 'menu' })}
                    name='label'
                    rules={[
                      {
                        required: true,
                        message: t('Name required', { ns: 'menu' }),
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label={t('Url', { ns: 'menu' })}
                    name='url'
                    rules={[
                      {
                        required: true,
                        message: t('Url required', { ns: 'menu' }),
                      },
                    ]}
                  >
                    <Input addonBefore={'/'} />
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </Col>
          <Col span={8}>
            <MenuInformation />
          </Col>
        </Row>
      </Form>
    </div>
  );
};
