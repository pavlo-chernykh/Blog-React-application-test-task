import React from 'react';
import { Spin } from 'antd';
import * as Styled from './spinner.styled';

const Spinner = () => {
  return (
      <Styled.SpinContainer>
        <Spin />
      </Styled.SpinContainer>
    );
}
export default Spinner;