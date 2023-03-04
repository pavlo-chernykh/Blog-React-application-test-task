import { Route, Routes } from 'react-router-dom';

import { Home } from '@pages/home';
import { NotFoundPage } from '@pages/notfound';
import { PostsPage } from '@pages/posts';
import { ROUTES } from 'src/consts';
import { TodoItem } from '@pages/post';

export function Navigation() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.POSTS} element={<PostsPage />} />
      <Route path={ROUTES.POST} element={<TodoItem />} />
      <Route path={ROUTES.NOTFOUND} element={<NotFoundPage />} />
    </Routes> 
  )
}


