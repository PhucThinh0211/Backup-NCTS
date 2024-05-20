import React from 'react';

interface BannerProps {
  src: string;
  active?: boolean;
}

export const Banner = ({ src, active }: BannerProps) => {
  return (
    <div
      className={`
        banner
        position-relative w-100
        ${active ? 'd-block' : 'd-none'}
    `}
    >
      <img
        src={src}
        alt='banner-img'
        className='w-100 h-100 object-fit-cover'
      />
    </div>
  );
};
