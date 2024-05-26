import { Button, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getSearchVisibility, persistStateActions } from '@/store/persistState';

export const SearchForm = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const searchVisibility = useAppSelector(getSearchVisibility());

  const searchToggle = () => {
    dispatch(persistStateActions.setSearchVisible(!searchVisibility));
  };

  return (
    <div
      style={{
        width: '100%',
        height: 80,
      }}
      className="d-flex align-items-center px-3 px-lg-5 bg-info">
      <div style={{ flex: 1, paddingTop: 10 }}>
        <Form layout="inline" autoFocus>
          <Form.Item style={{ flex: 1 }}>
            <Input autoFocus placeholder={t('Type to search', { ns: 'common' })} />
          </Form.Item>
          <Form.Item>
            <Button className='mr-4'>{t('Search', { ns: 'common' })}</Button>
          </Form.Item>
        </Form>
      </div>
      <Button
        type="text"
        shape="circle"
        onClick={searchToggle}
      >
        <i className="fa-solid fa-xmark fa-lg" />
      </Button>
    </div>
  );
};
