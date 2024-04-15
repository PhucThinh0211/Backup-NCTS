import { ArrowLeftOutlined } from '@ant-design/icons';
import {
  getCreateOrUpdateMenu,
  getSelectedMenu,
  getSelectedMenuDetail,
  menuActions,
} from '@/store/menu';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Avatar, Button, Col, Form, Input, Row, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { MenuInformation } from './MenuInformation';
import { useEffect } from 'react';
import Utils from '@/utils';
import { getLoading } from '@/store/loading';
import { SavingMenuLoadingKey } from '@/common';
import vi from '@/assets/vn.svg';
import en from '@/assets/us.svg';
import { getLocales } from '@/store/persistState';

const flag = {
  vi,
  en,
};

export const CreateUpdateMenuPage = () => {
  const { t } = useTranslation(['common', 'menu']);
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const createOrUpdate = useAppSelector(getCreateOrUpdateMenu());
  const selectedMenu = useAppSelector(getSelectedMenu());
  const selectedMenuDetail = useAppSelector(getSelectedMenuDetail());
  const locale = useAppSelector(getLocales());
  const isSubmmiting = useAppSelector(getLoading(SavingMenuLoadingKey));

  const menuTitle = Form.useWatch('label', form);

  useEffect(() => {
    dispatch(menuActions.setCreateOrUpdate(true));
    return () => {
      dispatch(menuActions.setCreateOrUpdate(false));
    };
  }, []);

  useEffect(() => {
    if (menuTitle) {
      form.setFieldValue('url', Utils.createSlug(menuTitle));
    }
  }, [menuTitle]);

  useEffect(() => {
    if (locale && selectedMenu) {
      dispatch(menuActions.getMenuRequest({ menuId: selectedMenu.id }));
    }
  }, [locale, selectedMenu]);

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
      <Link
        to={'/admin/menu'}
        className={'flex flex-row items-center gap-1 mb-4'}
      >
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
      {createOrUpdate && (
        <Form
          form={form}
          onFinish={handleSaveMenu}
          initialValues={{
            ...selectedMenuDetail,
            url: selectedMenuDetail?.url
              ? selectedMenuDetail?.url.split('/').pop()
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
                      <Input
                        suffix={
                          <Avatar
                            size={18}
                            src={locale ? flag[locale] : flag['vi']}
                          />
                        }
                      />
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
      )}
    </div>
  );
};
