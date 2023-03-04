import React, { useEffect, useState } from 'react';
import { Divider, List, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDeletePostMutation, useGetPostsQuery } from '@redux/store/postsAPI';
import { IPost } from 'types/posts';
import { AddPostModal } from '@components/add-post-modal';
import { PrimaryButton } from 'src/UI/button';
import { NotificationType, useOpenNotification } from 'src/UI/notification';

import * as Styled from './posts.styled'
import { PostItem } from '@components/postItem';


export const Posts: React.FC = () => {
  const { data: myposts, isSuccess } = useGetPostsQuery();
  const [postsToShow, setPostsToShow] = useState<IPost[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { contextHolder, openNotificationWithIcon } = useOpenNotification();
  const [deletePost] = useDeletePostMutation();
  
  useEffect(() => {
    if (myposts) {
      setPostsToShow(myposts.slice().reverse().slice(0, 10));
    }
  }, [myposts]);


  if (!myposts) {
    return <Skeleton avatar paragraph={{ rows: 1 }} active />;
  }
  
  const next = () => {
    const nextPosts = myposts?.slice(postsToShow.length, postsToShow.length + 10);

    if (nextPosts) {
      setPostsToShow([...postsToShow, ...nextPosts]);
    }
  };


  const handleDeletePost = async(id: number) => {
    try {
      await deletePost(id);
      openNotificationWithIcon(
        NotificationType.SUCCESS,
        'Success!',
        'Post successfully deleted',
      );
      
    } catch (error) {
      openNotificationWithIcon(
        NotificationType.ERROR,
        'Fail!',
        'Unexpected error occurred',
      );
    }
  };

  return (
    <Styled.PostsWrapper>
      {contextHolder}
      <PrimaryButton
        onClick={() => setIsModalOpen(value => !value)}
        >
        Create Post
      </PrimaryButton>
      {isSuccess && <InfiniteScroll
        dataLength={postsToShow.length}
        next={next}
        hasMore={postsToShow.length < myposts.length}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>It is all, no more posts yet 🤐</Divider>}
      >
        <div id="scrollableDiv">
          <List
            dataSource={postsToShow}
            renderItem={(item) => <PostItem post={item} handleDeletePost={handleDeletePost}/>}
          />
        </div>
      </InfiniteScroll>}
      <AddPostModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
      />
    </Styled.PostsWrapper>
  );
};