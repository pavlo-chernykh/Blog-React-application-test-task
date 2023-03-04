import React from 'react'
import { Posts } from 'src/components/posts';
import * as Styled from './posts.styled'


export const PostsPage = () => {
  return (
    <>
      <Styled.Header>Posts</Styled.Header>
      <Posts/>
    </>
  )
}
