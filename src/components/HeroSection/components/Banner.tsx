import React from 'react';
import { BannerHorizontal, BannerResponse, BannerVertical } from '@/services/BannerService';
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
      }}>
      <img
        src={banner.photoUrl ? uploadedPhotoUrl(banner.photoUrl) : ''}
        alt="banner-img"
        className="w-100 object-fit-cover"
        style={{
          aspectRatio: '16 / 5',
        }}
      />
      {banner.title && banner.description && (
        <div
          className="
          bannerOverlay
          px-3 px-lg-5 py-2 pb-4 py-lg-4
        "
          style={{
            justifyContent: justifyContent[banner.horizontal || BannerHorizontal.LEFT],
            alignItems: alignItems[banner.vertical || BannerVertical.TOP],
          }}>
          <div className="bannerWrapper">
            {banner.title && (
              <div>
                <Typography.Text
                  strong
                  className="title mb-2 "
                  style={{
                    color: banner.titleColor || '#fff',
                  }}>
                  {banner.title}
                </Typography.Text>
              </div>
            )}
            {banner.description && (
              <div>
                <Typography.Text
                  className="description"
                  style={{
                    color: banner.descriptionColor || '#fff',
                  }}>
                  {banner.description}{' '}
                </Typography.Text>
              </div>
            )}
            {banner.buttonLabel && banner.linkButton && (
              <div>
                <Button
                  type="primary"
                  onClick={handleClick}
                  size="large"
                  className="button"
                  style={{
                    backgroundColor: banner.buttonColor || '#006E9C',
                    color: banner.buttonLabelColor || '#fff',
                  }}>
                  {banner.buttonLabel}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
