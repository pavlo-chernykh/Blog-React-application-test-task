import { Link } from 'react-router-dom'
import * as Styled from './home.styled'

export const Home = () => {
  return (
    <Styled.HomePageContainer>
      <h1>Go to posts</h1>
      <Link to="/posts">
        <Styled.GoToPostsButton type="primary">Go to Posts</Styled.GoToPostsButton>
      </Link>
    </Styled.HomePageContainer>
  )
}
