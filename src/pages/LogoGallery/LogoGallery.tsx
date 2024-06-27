import { Row, Col, Divider } from 'antd';
import { NewsPublicSider } from '../NewsPublic/components/NewsPublicSider';
import {
  getLogos,
  getSelectedPageDetail,
  publicCmsActions,
} from '@/store/publicCms';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useEffect } from 'react';
import { LogoCategory } from '@/services/FileService';
import { uploadedFileUrl } from '@/common';
import './LogoGallery.scss';
import { Link } from 'react-router-dom';

interface LogoCategoryProps {
  category: LogoCategory;
}
export const LogoGallery = ({ category }: LogoCategoryProps) => {
  const dispatch = useAppDispatch();

  const pageDetail = useAppSelector(getSelectedPageDetail());
  const logoFolders = useAppSelector(getLogos());

  useEffect(() => {
    dispatch(
      publicCmsActions.getLogosRequest({
        params: {
          Category: category,
        },
      })
    );
  }, []);

  return (
    <div style={{ backgroundColor: '#80808008' }}>
      <div className='container py-2 py-md-5'>
        <Row gutter={[50, 10]}>
          <Col span={24} md={14} lg={16}>
            <div>
              <div className='h5 text-orange'>{pageDetail?.title}</div>
              <Divider style={{ marginTop: 4 }} />
              {logoFolders?.length && (
                <div className='logoList'>
                  {logoFolders[0].files?.map((logo) =>
                    logo.link ? (
                      <Link
                        to={logo.link}
                        key={logo.id}
                        className='logoWrapper'
                        target='_blank'
                      >
                        <img
                          src={uploadedFileUrl(
                            `${logo.location}/${logo.fileName}`
                          )}
                          style={{ width: '100%' }}
                        />
                      </Link>
                    ) : (
                      <div key={logo.id} className='logoWrapper'>
                        <img
                          src={uploadedFileUrl(
                            `${logo.location}/${logo.fileName}`
                          )}
                          style={{ width: '100%' }}
                        />
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </Col>
          <Col span={24} md={10} lg={8}>
            <NewsPublicSider />
          </Col>
        </Row>
      </div>
    </div>
  );
};
