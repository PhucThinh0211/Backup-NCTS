import React from 'react';
import { Button, ButtonProps } from 'antd';

export const LookupButton = ({ children, ...rest }: ButtonProps) => {
  return (
    <Button type="primary" htmlType="submit" className="fw-semibold rounded-pill" {...rest}>
      {children}
    </Button>
  );
};
