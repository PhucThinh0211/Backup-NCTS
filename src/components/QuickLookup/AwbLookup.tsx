import { Button, Form, Input, Row } from 'antd';
import { useTranslation } from 'react-i18next';

export const AwbLookup = () => {
  const { t } = useTranslation(['common']);

  return (
    <Form layout="vertical" requiredMark autoComplete="off">
      <Form.Item noStyle>
        <Form.Item
          label={t('Carrier', { ns: 'common' })}
          required
          rules={[{ required: true }]}
          style={{ display: 'inline-block', width: 'calc(50% - 4px)' }}>
          <Input />
        </Form.Item>
        <Form.Item
          label={t('AWB number', { ns: 'common' })}
          required
          style={{
            display: 'inline-block',
            width: 'calc(50% - 4px)',
            marginBottom: 0,
            marginLeft: 8,
          }}>
          <Form.Item
            name="awbPfx"
            rules={[{ required: true }]}
            style={{ display: 'inline-block', width: 'calc(50% - 4px)' }}>
            <Input placeholder="Prefix" />
          </Form.Item>
          <Form.Item
            name="awbNum"
            rules={[{ required: true }]}
            style={{ display: 'inline-block', width: 'calc(50% - 4px)', marginLeft: 8 }}>
            <Input placeholder="AWB#" />
          </Form.Item>
        </Form.Item>
      </Form.Item>
      <Form.Item noStyle>
        <Row justify="end">
          <Button type="primary" htmlType="submit">
            {t('Lookup', { ns: 'common' })}
          </Button>
        </Row>
      </Form.Item>
    </Form>
  );
};
