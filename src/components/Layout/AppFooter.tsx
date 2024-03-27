import { Divider, Layout, Row, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';

export const AppFooter = () => {
  return (
    <Layout.Footer style={{ backgroundColor: 'orange', padding: 16 }}>
      <Row>
        <Space style={{ flex: 1 }}>
          <Typography.Link style={{ color: 'white' }} href='mailto:webmaster@noibaicargo.com.vn'>Email: webmaster@noibaicargo.com.vn</Typography.Link>
          <Divider type='vertical' style={{ borderInlineStart: '1px solid black' }}/>
          <Typography.Link style={{ color: 'white' }} href='tel:0983550608'>Hotline: 0983550608</Typography.Link>
          <Divider type='vertical' style={{ borderInlineStart: '1px solid black' }} />
          <Link to='/sitemap'>
            <Typography.Text style={{ color: 'white' }}>Sitemap</Typography.Text>
          </Link>
        </Space>
        <Space>
          <Typography.Text style={{ color: 'white' }}>{`© 2024 Noi Bai Cargo Terminal Services JSC`}</Typography.Text>
        </Space>
      </Row>
    </Layout.Footer>
  );
};
