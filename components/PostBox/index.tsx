import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import Avatar from '../Avatar'
import { Link, Photograph } from 'heroicons-react'
import { useForm } from 'react-hook-form'
import { ADD_POST, ADD_SUBREDDIT } from '../../graphql/mutation'
import { useMutation } from '@apollo/client'
import { client } from '../../apollo-client'
import { GET_ALL_POSTS, GET_SUBREDDIT_BY_TOPIC } from '../../graphql/queries'
import toast from 'react-hot-toast'

interface FormData {
  postTitle: string
  postBody: string
  postImage: string
  subreddit: string
}

interface PostBoxProps {
  subreddit?: string
}

export default function PostBox({ subreddit }: PostBoxProps) {
  const { data: session } = useSession()
  const [addPost] = useMutation(ADD_POST, {
    refetchQueries: [GET_ALL_POSTS, 'getPostList'],
  })
  const [addSubreddit] = useMutation(ADD_SUBREDDIT)
  const [imageBoxOpen, setImageBoxOpen] = useState<boolean>(false)
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = handleSubmit(async (formData) => {
    const notification = toast.loading('Creating new post...')

    try {
      // Query for the subreddit topic...
      const {
        data: { getSubredditListByTopic },
      } = await client.query({
        query: GET_SUBREDDIT_BY_TOPIC,
        variables: {
          topic: subreddit || formData.subreddit,
        },
      })

      const subredditExists = getSubredditListByTopic.length > 0

      if (!subredditExists) {
        // create subreddit...

        const {
          data: { insertSubreddit: newSubreddit },
        } = await addSubreddit({
          variables: {
            topic: formData.subreddit,
          },
        })

        console.log('Creating post', formData)
        const image = formData.postImage || ''

        const {
          data: { insertPost: newPost },
        } = await addPost({
          variables: {
            body: formData.postBody,
            image,
            subreddit_id: newSubreddit.id,
            title: formData.postTitle,
            username: session?.user?.name,
          },
        })

        console.log('New post added:', newPost)
      } else {
        // use existing subreddit...
        console.log('Using existing subreddit!')
        console.log(getSubredditListByTopic)

        const image = formData.postImage || ''

        const {
          data: { inserPost: newPost },
        } = await addPost({
          variables: {
            body: formData.postBody,
            image,
            subreddit_id: getSubredditListByTopic[0].id,
            title: formData.postTitle,
            username: session?.user?.name,
          },
        })

        console.log('New post added:', newPost)
      }
      // After the post has been added!
      setValue('postBody', '')
      setValue('postImage', '')
      setValue('postTitle', '')
      setValue('subreddit', '')

      toast.success('New post Created!', {
        id: notification,
      })
    } catch (error) {
      console.error(error)
      toast.error('Whoops something went wrong!', {
        id: notification,
      })
    }
  })

  return (
    <form
      onSubmit={onSubmit}
      className="top-20 z-40 bg-white border rounded-md border-gray-200 dark:bg-black-700 dark:border-gray-850"
    >
      <div className="flex items-center space-x-3 p-3">
        <div className="mb:hidden">
          <Avatar />
        </div>

        <input
          {...register('postTitle', { required: true })}
          className="w-full bg-gray-50 p-2 pl-5 outline-none flex-1 mb:pl-0 rounded-md dark:bg-gray-900 border dark:border-gray-850 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-black-700"
          disabled={!session}
          type="text"
          placeholder={
            session
              ? subreddit
                ? `Create a post in r/${subreddit}`
                : 'Create a post by entering a title!'
              : `Sign in to post`
          }
        />

        <Photograph
          onClick={() => setImageBoxOpen((prevState) => !prevState)}
          className={`flex-shrink-0 h-6 text-gray-300 cursor-pointer ${
            imageBoxOpen && 'text-blue-300 dark:text-orange-500'
          }`}
        />
        <Link className="flex-shrink-0 h-6 text-gray-300 cursor-pointer" />
      </div>

      {!!watch('postTitle') && (
        <div className="flex flex-col p-2">
          <div className="flex items-center px-2">
            <p className="min-w-[5.625rem] dark:text-gray-300">Body:</p>
            <input
              className="m-2 flex-1 bg-blue-50 p-2 outline-none dark:bg-gray-900 rounded-md border dark:border-gray-850 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-black-700"
              type="text"
              placeholder="Text"
              {...register('postBody')}
            />
          </div>

          {!subreddit && (
            <div className="flex items-center px-2">
              <p className="min-w-[5.625rem] dark:text-gray-300">Subreddit:</p>
              <input
                className="m-2 flex-1 bg-blue-50 p-2 outline-none dark:bg-gray-900 rounded-md border dark:border-gray-850 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-black-700"
                type="text"
                placeholder="i.e. reactjs"
                {...register('subreddit', { required: true })}
              />
            </div>
          )}

          {imageBoxOpen && (
            <div className="flex items-center px-2">
              <p className="min-w-[5.625rem] dark:text-gray-300">Image URL:</p>
              <input
                className="m-2 flex-1 bg-blue-50 p-2 outline-none rounded-md border dark:bg-gray-900 dark:border-gray-850 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-black-700"
                type="text"
                placeholder="https://example.com/example-image.png"
                {...register('postImage')}
              />
            </div>
          )}

          {!!Object.keys(errors).length && (
            <div className="space-y-2 p-2 text-red-500">
              {errors.postTitle?.type === 'required' && (
                <p>- A Post Title is required</p>
              )}

              {errors.subreddit?.type === 'required' && (
                <p>- A Subreddit is required</p>
              )}
            </div>
          )}

          {!!watch('postTitle') && (
            <button
              type="submit"
              className="max-w-full rounded-3xl bg-blue-400 mt-2 p-2 mx-3 text-white font-medium dark:bg-orange-500 dark:hover:brightness-110"
            >
              Create Post
            </button>
          )}
        </div>
      )}
    </form>
  )
}
