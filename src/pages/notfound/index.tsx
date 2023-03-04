import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'src/consts';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle='Sorry, the page you visited does not exist.'
      extra={
        <Button onClick={() => navigate(ROUTES.HOME)} type="primary">
          Go back to the main page
        </Button>
      }
    />
  );
};

