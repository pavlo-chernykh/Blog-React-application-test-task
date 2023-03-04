import { AddCommentModal } from '@components/add-comment-modal';
import { useGetPostQuery } from '@redux/store/postsAPI';
import { Empty, List } from 'antd';
import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PrimaryButton } from 'src/UI/button';
import Spinner from 'src/UI/spinner';
import { IComment } from 'types/comment';
import * as Styled from './post.page.styled';


export const TodoItem: FC = () => {
  const [isCommentModalOpen, setIsCommentModalOpen] = useState<boolean>(false);

  const params = useParams();
  const id = Number(params['id']);

  const { data: post, isLoading } = useGetPostQuery(id);
  if (isLoading) {
    return <Spinner/>
  }

  return (
    <>
      <Styled.PostItemWrapper>
        <Styled.PostTitle>{post?.title}</Styled.PostTitle>
        <Styled.PostBody>{post?.body}</Styled.PostBody>
        <PrimaryButton
          onClick={() => setIsCommentModalOpen(value => !value)}
        >
        Post Comment
      </PrimaryButton>
      </Styled.PostItemWrapper>
      <Styled.PostTitle>Comments:</Styled.PostTitle>
      {post?.comments?.length ? (
        <Styled.ListWrapper>
          <List
            dataSource={post?.comments}
            renderItem={(comment: IComment) => (
              <List.Item key={comment.postId}>
                <Styled.StyledComment>
                  <p>Name: {comment.name}</p>
                  <p>Email: {comment.email}</p>
                  <p>Body: {comment.body}</p>
                </Styled.StyledComment>
              </List.Item>
            )}
          />
        </Styled.ListWrapper>

      ) : (
        <Empty description='No Comments Yet...' />
      )}
      <AddCommentModal
        isCommentModalOpen={isCommentModalOpen}
        setIsCommentModalOpen={setIsCommentModalOpen}
        id={id}
      />
    </>

)};
