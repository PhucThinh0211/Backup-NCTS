import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getIntroducePage, publicCmsActions } from '@/store/publicCms';
import { getLanguage } from '@/store/persistState';
import SessionTitle from '@/components/SessionTitle/SessionTitle';
import logo from '@/assets/logo.png';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

const partner =[
  {
    url : "https://s3-alpha-sig.figma.com/img/4351/b56c/19e398c091eb2fc03aaecb417c151b54?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=B53mJNHyr3h6pCFHKsFYkPO8l-MUBacDT8AMPHcGE7suFN3G2bO7P2YLSYpVwNSEI2zD60NOK61PFR14nTWxY5m1hxYeG-FhEdReTbEkKKGOko8grhdwOn9rml~uXy0KR5oNsgNgoWGxL8vxiU6dck~7W-56jdZw3Rh~r8BTvGoMGHOW0juBgeJeU5KBTcwRmAqM8zbgiQya-gX0JIEDFwQzLd-v9MoC0qPZdmzPWMV3XztxfgK3~GMz0mTp1T67C9hQjIVHax9bfKHRKShvxCIoB2k7przZGljTwd~2LAToN37Cfb6-33K76vGaGRN4OeJk27ZU1IIQZR-nlyRmtw__"
  },
  {
    url : "https://s3-alpha-sig.figma.com/img/704a/a250/6d9ac464b2022e2358e4cde9814bb99d?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VQTdJ8qQYigelRri9Y8Mhe275ajG7ErRWHnYdZwldZxya8dojtvn0jELWaLRMFoGPRRX8ErQFnj7no1l~m8e1oVXFpBZpHd~gta7xsXS1gy7nEZ4BEBzcz20Ei3LWl4so9lXre76X9oyRSvw-C2OWtFz7apZZiynug0QR~czM6IH5jwpeyZyaHxYvWLc~MYYYV8LYCJCiMO2zQsXLHTLTR8SJQRzYNpTCstFlJf4KJ8kvlYTUVf0sJDmlynXDsiR7XAS0Ec2bSMMwUhiKobmPq7UreKsQWKgsd8b9JI-awnoX6YQt6ALOPsbDjy28-RrsSS9mIORrEN3O2wM3vZljg__"
  },
  {
    url : "https://s3-alpha-sig.figma.com/img/3595/10e6/104b5446d8d99ac8d7c6c8ff798b8dcd?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SYAJ2p9n-OWuZDDTEYUWyix8lUCRmACuk7h4MmrwmoZQ7650c6elvjM8J5AntdHKxgcyjI5j3SFhNSeoIHCnnnKEPgfn0O2ZMhoq64cNhR1RTRJuMeR-xnqc6BxDfeJ1LDzemSUhcs4zAm~r5RW2q0j20irZpuqZgue0gSZEmLnlAVGglCg2nOgjL-6v5EdQPU0gaUp0udNVk-zeEOuYFH6LVJShdUk8sQ1b6ApdW91GQSfW6HiQpf~OYckJec2aIFqaaVJIanzZCo8qBJjOYtQLxI0aBvxiYesoMnp7kGM0mFfTLkTKiIZ6flJvqkNoEUpoveVjqCiZtZIphP7ynA__"
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
          <img className="col-5 col-md-12 pb-md-3" src={intro?.photoUrl || logo} alt="Intro" style={{ minHeight: 250 }} />
          <div className="col-7 col-md-12">
            <h5 style={{ fontSize: 16 }}>{intro?.title}</h5>
            <p>{intro?.description}</p>
            <div className="partner d-flex flex-row gap-3">
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
