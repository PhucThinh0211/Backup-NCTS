import React from 'react';
import './SessionTitleStyle.scss';

type Props = {
  title: string;
  titleLayer?: string;
};

const SessionTitle = ({ title, titleLayer }: Props) => {
  return (
    <div className='session-title'>
      <h1 className='bg-layer d-none d-lg-block'>{titleLayer || title}</h1>
      <h4 className='title-layer'>{title}</h4>
    </div>
  );
};

export default SessionTitle;
