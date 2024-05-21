import React from 'react';
import {
  BannerHorizontal,
  BannerResponse,
  BannerVertical,
} from '@/services/BannerService';
import { uploadedPhotoUrl } from '@/common';
import { Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

interface BannerProps {
  banner: BannerResponse;
}

const justifyContent = {
  [BannerHorizontal.LEFT]: 'flex-start',
  [BannerHorizontal.CENTER]: 'center',
  [BannerHorizontal.RIGHT]: 'flex-end',
};

const alignItems = {
  [BannerVertical.TOP]: 'flex-start',
  [BannerVertical.MIDDLE]: 'center',
  [BannerVertical.BOTTOM]: 'flex-end',
};

export const Banner = ({ banner }: BannerProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (banner.linkButton) {
      navigate(banner.linkButton);
    }
  };
  return (
    <div
      className={`
        banner
        position-relative w-100 h-100
    `}
      style={{
        maxHeight: 600,
      }}
    >
      <img
        src={banner.photoUrl ? uploadedPhotoUrl(banner.photoUrl) : ''}
        alt='banner-img'
        className='w-100 object-fit-cover'
        style={{
          aspectRatio: '16 / 5',
        }}
      />
      <div
        className='bannerOverlay'
        style={{
          justifyContent:
            justifyContent[banner.horizontal || BannerHorizontal.LEFT],
          alignItems: alignItems[banner.vertical || BannerVertical.TOP],
        }}
      >
        <div className='bannerWrapper'>
          <div>
            <Typography.Text
              strong
              className='title'
              style={{
                color: banner.titleColor || undefined,
              }}
            >
              {banner.title}
            </Typography.Text>
          </div>
          <div>
            <Typography.Text
              className='description'
              style={{
                color: banner.descriptionColor || undefined,
              }}
            >
              {banner.description}{' '}
            </Typography.Text>
          </div>
          <div>
            <Button
              type='primary'
              onClick={handleClick}
              className='button'
              style={{
                backgroundColor: banner.buttonColor || undefined,
                color: banner.buttonLabelColor || undefined,
              }}
            >
              {banner.buttonLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
