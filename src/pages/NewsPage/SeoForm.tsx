import { Form, Input, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '@/store/hooks';
import { getLocale } from '@/store/persistState';

export const SeoForm = () => {
  const { t } = useTranslation(['news', 'seo']);
  const locale = useAppSelector(getLocale());

  return (
    <div className='w-full border-b rounded-2 bg-white p-3 shadow-sm'>
      <Typography.Title level={5}>{t('SEO', { ns: 'seo' })}</Typography.Title>
      <Form.Item name={'seo'}>
        <Form.Item
          label={
            <div>
              <span>{t('Title', { ns: 'news' })}</span>
              {' - '}
              <span className='uppercase text-red-600'>{locale}</span>
            </div>
          }
          name={['seo', 'title']}
          rules={[
            {
              max: 500,
              min: 0,
              message: t('StringRange', {
                ns: 'common',
                range1: 0,
                range2: 500,
              }),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={
            <div>
              <span>{t('Description', { ns: 'news' })}</span>
              {' - '}
              <span className='uppercase text-red-600'>{locale}</span>
            </div>
          }
          name={['seo', 'description']}
          rules={[
            {
              max: 2000,
              min: 0,
              message: t('StringRange', {
                ns: 'common',
                range1: 0,
                range2: 2000,
              }),
            },
          ]}
        >
          <Input.TextArea rows={5} />
        </Form.Item>
      </Form.Item>
    </div>
  );
};
