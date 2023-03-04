import { Dispatch, SetStateAction } from "react";

export interface IComment {
  postId: number
  name: string
  email: string
  body: string
}

export interface ICreateCommentModal {
  isCommentModalOpen: boolean;
  setIsCommentModalOpen: Dispatch<SetStateAction<boolean>>;
  id: number;
}