import { Avatar, Form, Input, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import vi from '@/assets/vn.svg';
import en from '@/assets/us.svg';

const flag = {
  vi,
  en,
};

import { useAppSelector } from '@/store/hooks';
import { getLocale } from '@/store/persistState';

export const SeoForm = () => {
    const { t } = useTranslation(['news', 'seo']);
    const locale = useAppSelector(getLocale());
    const FlagComponent = () => (
        <Avatar
          size={20}
          shape='square'
          src={locale ? flag[locale] : flag['vi']}
          className='!rounded-none '
        />
      );
    return (
        <div className='w-full border-b-gray-500 rounded-md bg-white p-4 shadow-sm'>
            <Typography.Title level={5}>{t('SEO', { ns: 'seo' })}</Typography.Title>
            <Form.Item name={'seo'}>
                <Form.Item
                    label={t('Title', { ns: 'news' })}
                    name={['seo', 'title']}
                    rules={[
                    { required: true, message: t('Title required') },
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
                    <Input suffix={<FlagComponent />} />
                </Form.Item>
                <Form.Item
                    label={
                    <div>
                        <span>{t('Description', { ns: 'news' })}</span>
                        {' - '}
                        <span className='uppercase'>{locale}</span>
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
                    <Input.TextArea />
                </Form.Item>
            </Form.Item>
        </div>
  )
}
