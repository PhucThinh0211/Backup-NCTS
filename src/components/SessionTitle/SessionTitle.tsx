import React from 'react';
import './SessionTitleStyle.scss';

type Props = {
  title: string;
};

const SessionTitle = ({ title }: Props) => {
  return (
    <div className='session-title'>
      <h1 className='bg-layer'>{title}</h1>
      <h4 className='title-layer'>{title}</h4>
    </div>
  );
};

export default SessionTitle;
