import { COLORS } from './../../consts/colors';
import { Button } from "antd";
import { SPACES } from "src/consts";
import styled from "styled-components";

export const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: ${COLORS.PRIMARY}
`;

export const GoToPostsButton = styled(Button)`
  margin-top: ${SPACES.l};
`;