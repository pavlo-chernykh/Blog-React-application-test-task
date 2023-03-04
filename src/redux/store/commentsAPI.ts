import { IComment } from 'types/comment';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ApiRoutes, apiTags } from 'src/consts/routes';



const serviceRoute = ApiRoutes.COMMENTS;

enum EndpointsRoutes {
  createComment = '/',
}


export const commentsApi = createApi({
  reducerPath: 'comments',
  baseQuery: fetchBaseQuery({ baseUrl: ApiRoutes.BASEURL }),
  tagTypes: Object.values(apiTags),
  endpoints: (builder) => ({
    addComment: builder.mutation<IComment, Partial<IComment>>({
      query: (comment) => ({
        url: serviceRoute + EndpointsRoutes.createComment,
        method: 'POST',
        body: comment,
      }),
      invalidatesTags: ([apiTags.POSTS])
    })
  }),
})

export const { 
  useAddCommentMutation, 
} = commentsApi