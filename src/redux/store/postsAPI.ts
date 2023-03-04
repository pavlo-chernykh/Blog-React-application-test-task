import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IEditBody, IPost, IPostWithComments } from 'types/posts'
import { ApiRoutes, apiTags } from 'src/consts/routes';



const serviceRoute = ApiRoutes.POSTS;

enum EndpointsRoutes {
  getPostsInfo = '/',
  createPost = '/',
  deletePost = '/',
  getPostInfo = '/',
  updatePostInfo = '/',
}


export const postsApi = createApi({
  reducerPath: 'posts',
  baseQuery: fetchBaseQuery({ baseUrl: ApiRoutes.BASEURL }),
  tagTypes: Object.values(apiTags),
  endpoints: (builder) => ({
    getPosts: builder.query<IPost[], void>({
      query: () => ({
        url: serviceRoute + EndpointsRoutes.getPostsInfo,
        method: 'GET'
      }),
      providesTags: ([apiTags.POSTS])
    }),
    getPost: builder.query<IPostWithComments, number>({
      query: (id) => ({
        url: `${serviceRoute}${EndpointsRoutes.getPostInfo}${id}?_embed=comments`,
        method: 'GET'
      }),
      providesTags: ([apiTags.POSTS])
    }),
    addPost: builder.mutation<IPost, Partial<IPost>>({
      query: (post) => ({
        url: serviceRoute + EndpointsRoutes.createPost,
        method: 'POST',
        body: post,
      }),
      invalidatesTags: ([apiTags.POSTS])
    }),
    updatePost: builder.mutation<IEditBody, IEditBody>({
      query: ({id, body}) => ({
        url: serviceRoute + EndpointsRoutes.updatePostInfo + id,
        method: 'PUT',
        body
      }),
      invalidatesTags: ([apiTags.POSTS])
    }),
    deletePost: builder.mutation<void, number>({
      query: (id) => ({
        url: serviceRoute + EndpointsRoutes.deletePost + id,
        method: 'DELETE',
      }),
      invalidatesTags: ([apiTags.POSTS])
    }),
    
  }),
})

export const { 
  useGetPostsQuery, 
  useGetPostQuery, 
  useAddPostMutation, 
  useUpdatePostMutation, 
  useDeletePostMutation 
} = postsApi