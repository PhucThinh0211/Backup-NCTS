import { useEffect, useMemo } from 'react';

import { ArrowLeftOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Col,
  Form,
  Input,
  Row,
  Spin,
  TreeSelect,
  Typography,
} from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import {
  getMenus,
  getSelectedMenu,
  getSelectedMenuDetail,
  menuActions,
} from '@/store/menu';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { AuditedMenu } from './AuditedMenu';
import Utils from '@/utils';
import { getLoading } from '@/store/loading';
import {
  GettingMenuLoadingKey,
  SavingMenuLoadingKey,
  TreeItem,
} from '@/common';
import vi from '@/assets/vn.svg';
import en from '@/assets/us.svg';
import { getLocale } from '@/store/persistState';
import { MenuResponse } from '@/services/MenuService';

const flag = {
  vi,
  en,
};

export const CreateUpdateMenuPage = () => {
  const { t } = useTranslation(['common', 'menu']);
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const menus = useAppSelector(getMenus());
  const selectedMenu = useAppSelector(getSelectedMenu());
  const selectedMenuDetail = useAppSelector(getSelectedMenuDetail());
  const locale = useAppSelector(getLocale());
  const isSubmmiting = useAppSelector(getLoading(SavingMenuLoadingKey));
  const isLoading = useAppSelector(getLoading(GettingMenuLoadingKey));
  const menuTitle = Form.useWatch('label', form);
  const parentId = Form.useWatch('parentId', form);
  const parentMenu = useMemo(
    () => menus?.items.find((item) => item.id === parentId),
    [parentId, menus]
  );

  const sortedMenus: MenuResponse[] = Utils.deepClone(menus?.items || []);
  sortedMenus.sort((a, b) => {
    return a.sortSeq - b.sortSeq;
  });

  useEffect(() => {
    if (menuTitle && !selectedMenu) {
      form.setFieldValue('url', '/' + Utils.createSlug(menuTitle));
    }
  }, [menuTitle]);

  useEffect(() => {
    if (locale) {
      dispatch(
        menuActions.getMenusRequest({
          headers: {
            'Accept-Language': locale || 'vi',
          },
        })
      );
    }
  }, [locale]);

  useEffect(() => {
    if (locale && selectedMenu) {
      dispatch(menuActions.getMenuRequest({ menuId: selectedMenu.id }));
    }
  }, [locale, selectedMenu]);

  useEffect(() => {
    if (selectedMenuDetail) {
      const lastIndexOfSlash = selectedMenuDetail.url?.lastIndexOf('/');

      form.setFieldsValue({
        ...selectedMenuDetail,
        url: selectedMenuDetail.url?.slice(
          lastIndexOfSlash,
          selectedMenuDetail.url.length
        ),
      });
    } else {
      form.resetFields();
    }
  }, [selectedMenuDetail]);

  const handleSaveMenu = (values: any) => {
    const inputData = {
      ...values,
    };
    if (values.url && !values.url.startsWith('/')) {
      inputData.url = '/' + values.url.trim();
    }
    if (parentMenu) {
      inputData.url = parentMenu.url + inputData.url;
    }
    if (selectedMenu) {
      // prettier-ignore
      dispatch(menuActions.updateMenuRequest({ menuId: selectedMenu.id, menu: { ...selectedMenuDetail, ...inputData }}));
      return;
    }
    dispatch(menuActions.createMenuRequest({ menu: { ...inputData } }));
  };

  const mapTreeToSelectOption = (item: TreeItem<MenuResponse>): any => {
    return {
      title: item.label,
      value: item.id,
      children: item.children
        ? item.children.map((child) => mapTreeToSelectOption(child))
        : undefined,
    };
  };

  return (
    <div className='p-4'>
      <Link
        to={'/admin/menu'}
        className={'d-flex flex-row align-items-center gap-1 mb-2'}
      >
        <ArrowLeftOutlined style={{ fontSize: 12 }} />
        {t('Back', { ns: 'common' })}
      </Link>
      <div className='d-flex flex-row justify-content-between align-items-center'>
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
        autoComplete='off'
        form={form}
        onFinish={handleSaveMenu}
        layout='vertical'
      >
        <Spin spinning={isLoading}>
          <Row gutter={[10, 10]} className='mt-2'>
            <Col span={16}>
              <div className='w-full border-b rounded-2 bg-white p-3 shadow-sm'>
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
                      <Input
                        addonBefore={parentMenu ? parentMenu.url : undefined}
                      />
                    </Form.Item>
                    <Form.Item
                      label={t('Parent menu', { ns: 'menu' })}
                      name='parentId'
                    >
                      <TreeSelect
                        treeData={Utils.buildTree(
                          sortedMenus.filter(
                            (item) => item.id !== selectedMenuDetail?.id
                          )
                        ).map((item) => mapTreeToSelectOption(item))}
                        allowClear
                        treeDefaultExpandAll
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col span={8}>
              <AuditedMenu />
            </Col>
          </Row>
        </Spin>
      </Form>
    </div>
  );
};
