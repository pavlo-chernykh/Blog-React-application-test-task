import { EditPostModal } from "@components/edit-post-modal"
import { FC, useState } from "react"
import { generatePath, useNavigate } from "react-router-dom"
import { ROUTES } from "src/consts"
import { PrimaryButton } from "src/UI/button"
import { IPost } from "types/posts"
import * as Styled from './post.styled'

interface IPostItem {
  post: IPost;
  handleDeletePost: (id: number) => Promise<void>
}

export const PostItem:FC<IPostItem> = ({post, handleDeletePost}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const navFunc = (props: number) => {
    const id = JSON.stringify(props);
    const path = generatePath(ROUTES.POST, { id });
    navigate(path);
  };

  return (
    <Styled.Post key={post.id}>
      <Styled.PostTitle onClick={() => navFunc(post.id)}>{post.title}</Styled.PostTitle>
      <Styled.PostDescription onClick={() => navFunc(post.id)}>{post.body}</Styled.PostDescription>
      <PrimaryButton onClick={() => navFunc(post.id)}>View</PrimaryButton>
      <PrimaryButton onClick={() => setIsEditModalOpen(value => !value)}>Edit</PrimaryButton>
      <PrimaryButton onClick={() => handleDeletePost(post.id)} danger>Delete</PrimaryButton>
      <EditPostModal
        setIsEditModalOpen={setIsEditModalOpen}
        isEditModalOpen={isEditModalOpen}
        initialValues={post}
      />
    </Styled.Post>
  )
}
