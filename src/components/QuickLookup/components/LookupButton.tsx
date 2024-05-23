import React from 'react';
import { Button, ButtonProps } from 'antd';

export const LookupButton = (props: ButtonProps) => {
  return (
    <Button
      type='primary'
      htmlType='submit'
      className='fw-semibold rounded-pill'
      size='large'
    >
      {props.children}
    </Button>
  );
};
