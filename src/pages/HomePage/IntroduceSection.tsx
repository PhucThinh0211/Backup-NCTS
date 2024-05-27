import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getIntroducePage, publicCmsActions } from '@/store/publicCms';
import { getLanguage } from '@/store/persistState';
import SessionTitle from '@/components/SessionTitle/SessionTitle';
import logo from '@/assets/logo.png';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { uploadedPhotoUrl } from '@/common';

const partner =[
  {
    url : "https://ncts.hicas.vn/api/photo/dowload/7d820d9a-3c0b-7d25-ba30-3a12ca4d037a.png"
  },
  {
    url : "https://ncts.hicas.vn/api/photo/dowload/5c27a694-b894-3d15-ae92-3a12ca4db141.png"
  },
  {
    url : "https://ncts.hicas.vn/api/photo/dowload/ba43955c-4815-62d0-9040-3a12ca4df65e.png"
  },
]  

export const IntroduceSection = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const intro = useAppSelector(getIntroducePage());
  const lang = useAppSelector(getLanguage());

  useEffect(() => {
    dispatch(publicCmsActions.getIntroducePageRequest());
  }, [lang]);

  return (
    <div className="py-2">
      <SessionTitle title={t('Instruction', { ns: 'home' })} />
      <div className="container aboutUs-content my-5">
        <div className="row">
          <img className="col-lg-5 col-md-12 pb-3 pb-lg-3" src={intro?.photoUrl ? uploadedPhotoUrl(intro?.photoUrl) : logo} alt="Intro" style={{ minHeight: 250 }} />
          <div className="col-lg-7 col-md-12">
            <h5 style={{ fontSize: 16 }}>{intro?.title}</h5>
            <p>{intro?.description}</p>
            <div className="partner d-flex flex-row gap-3" style={{ maxHeight: 130 }}>
              {partner.map((i, index) => (
                <img src={i.url} key={index} />
              ))}
            </div>
            <Link className="d-flex justify-content-start mt-5" to="/">
              <Button size='large' type='primary' className='rounded-5'>
                {t('See more', { ns: 'home' })}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
