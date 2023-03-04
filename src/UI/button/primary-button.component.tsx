import { FC } from 'react';
import { ButtonProps } from 'antd';
import { Button } from 'antd';

export const PrimaryButton: FC<ButtonProps> = props => {
  return (
    <Button type="primary" {...props}>
      {props.children}
    </Button>
  );
};