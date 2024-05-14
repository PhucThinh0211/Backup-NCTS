import {  Layout, Row, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';

export const AppFooter = () => {
  return (
    <Layout.Footer  style={{ backgroundColor: 'orange', padding: 16 }}>
      <Row className="container d-flex justify-content-between">
        <Space>
          <Typography.Text style={{ color: 'white' }}>{`Copyright © NCTS Noi Bai Cargo `}</Typography.Text>
        </Space>
        
        <Space className ="d-none d-xl-flex gap-3">
          <Link to='/sitemap'>
            <Typography.Text style={{ color: 'white' }}>Sitemap</Typography.Text>
          </Link>
          <Link to='/contact'>
            <Typography.Text style={{ color: 'white' }}>Contact</Typography.Text>
          </Link>
          <Link to='/support'>
            <Typography.Text style={{ color: 'white' }}>Support</Typography.Text>
          </Link>
          
        </Space>
        
      </Row>
    </Layout.Footer>
  );
};
          {/* <Typography.Link style={{ color: 'white' }} href='tel:0983550608'>Hotline: 0983550608</Typography.Link> */}
