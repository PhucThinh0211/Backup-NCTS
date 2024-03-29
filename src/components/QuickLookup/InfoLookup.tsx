import { Button, Form, Input, Row } from 'antd';
import { useTranslation } from 'react-i18next';

export const InfoLookup = () => {
  const { t } = useTranslation(['common']);

  return (
    <Form layout="vertical" requiredMark>
      <Form.Item label={t('Type to search', { ns: 'common' })} required>
        <Input />
      </Form.Item>
      <Form.Item noStyle>
        <Row justify="end">
          <Button type="primary" htmlType="submit">
            {t('Search', { ns: 'common' })}
          </Button>
        </Row>
      </Form.Item>
    </Form>
  );
};
