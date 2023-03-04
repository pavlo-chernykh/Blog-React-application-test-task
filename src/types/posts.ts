import { Dispatch, SetStateAction } from 'react';
import { IComment } from './comment';

export interface IPost {
  id: number
  title: string
  body: string
}

export interface IPostWithComments extends IPost {
  comments?: IComment[]
}

export interface ICreatePost {
  title: string
  body: string
}

export interface IEditPost {
  id?: number
  title?: string
  body?: string
}

export interface IEditBody {
  id?: number,
  body: IEditPost
}

export interface ICreatePostModal {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export interface IEditPostModal {
  isEditModalOpen: boolean;
  setIsEditModalOpen: Dispatch<SetStateAction<boolean>>;
  initialValues: IPost;
}
