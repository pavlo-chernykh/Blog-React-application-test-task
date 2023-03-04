import { List } from "antd"
import { SPACES } from "src/consts"
import styled from "styled-components"

export const Post = styled(List.Item)`
  cursor: pointer;
`

export const PostTitle = styled(List.Item)`
  width: 20%;
  margin-right: ${SPACES.m};
`
export const PostDescription = styled(List.Item)`
  margin-right: ${SPACES.m};
  width: 50%
`