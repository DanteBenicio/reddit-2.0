import { useMutation, useQuery } from '@apollo/client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'
import Post from '../../components/Post'
import { ADD_COMMENT, GET_POST_BY_POST_ID } from '../../graphql/queries'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import Avatar from '../../components/Avatar'
import TimeAgo from 'react-timeago'

type FormData = {
  comment: string
}

export default function PostPage() {
  const {
    query: { postId },
  } = useRouter()
  const { data: session } = useSession()
  const [addComment] = useMutation(ADD_COMMENT, {
    refetchQueries: [GET_POST_BY_POST_ID, 'getPostListByPostId'],
  })
  const { register, handleSubmit, setValue } = useForm<FormData>()
  const { data } = useQuery(GET_POST_BY_POST_ID, {
    variables: {
      post_id: postId,
    },
  })

  const post: Post = data?.getPostListByPostId

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (data.comment.length === 0) {
      toast.error('Add a text message!')
      return
    }

    const notification = toast.loading('Posting your comment...')

    await addComment({
      variables: {
        post_id: postId,
        username: session?.user?.name,
        text: data.comment,
      },
    })

    setValue('comment', '')

    toast.success('Comment successfully posted!', {
      id: notification,
    })
  }

  return (
    <div className="-mt-7 pt-6 max-w-[100vw] min-h-[100vh] dark:bg-[#000]">
      <div className="mx-auto my-7 max-w-5xl px-6 pb-5 mb:px-4 mb:pb-4">
        <Post post={post} postPage />

        <div className="-mt-1 rounded-b-md border border-t-0 border-gray-200 bg-white p-5 pl-14 dark:bg-black-700 dark:border-transparent">
          <p className="text-[0.8125rem] dark:text-gray-300 mb-1">
            Comment as{' '}
            <span className="text-red-500 dark:text-blue-400 text-[0.8125rem]">
              {session?.user?.name}
            </span>
          </p>

          <form
            className="flex max-w-5xl flex-col space-y-3 dark:bg-black-700"
            onSubmit={handleSubmit(onSubmit)}
          >
            <textarea
              {...register('comment')}
              disabled={!session}
              className="h-24 rounded-md border border-gray-200 p-2 pl-4 outline-none disabled:bg-gray-50 resize-none dark:bg-black-700 dark:border-gray-850 dark:focus:border-gray-300 dark:text-gray-300"
              placeholder={
                session
                  ? 'What are your thoughts?'
                  : 'Please sign in to comment'
              }
            />

            <button
              disabled={!session}
              type="submit"
              className="rounded-full bg-blue-500 p-3 font-semibold text-white disabled:bg-gray-200 hover:bg-red-400 transition-colors dark:bg-orange-500 dark:hover:brightness-110"
            >
              Comment
            </button>
          </form>
        </div>

        <div className="-my-5 rounded-b-md border border-t-0 border-gray-300 bg-white py-5 px-10 dark:bg-black-700 dark:border-transparent">
          {post?.comments.map((comment) => (
            <div className="comment" key={comment.id}>
              <div className="">
                <Avatar seed={comment.username} />
              </div>

              <div className="flex flex-col">
                <p className="py-2 text-xs text-gray-400">
                  <span className="font-medium dark:text-gray-100 tracking-wide">
                    {comment.username}
                  </span>{' '}
                  · <TimeAgo date={comment.created_at} />
                </p>
                <p className="font-medium dark:text-gray-300">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
