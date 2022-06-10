/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import {
  ArrowDown,
  ArrowUp,
  ChatAltOutline,
  GiftOutline,
  ShareOutline,
  BookmarkOutline,
  DotsHorizontalOutline,
} from 'heroicons-react'
import Avatar from '../Avatar'
import TimeAgo from 'react-timeago'
import Link from 'next/link'
import { Jelly } from '@uiball/loaders'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import { useMutation, useQuery } from '@apollo/client'
import { ADD_VOTE, GET_ALL_VOTES_BY_POST_ID } from '../../graphql/queries'

interface PostProps {
  post: Post
  postPage?: boolean
}

export default function Post({ post, postPage }: PostProps) {
  const { data: session } = useSession()
  const [vote, setVote] = useState<boolean>()
  const { data } = useQuery(GET_ALL_VOTES_BY_POST_ID, {
    variables: {
      post_id: post?.id,
    },
  })
  const [addVote] = useMutation(ADD_VOTE, {
    refetchQueries: [GET_ALL_VOTES_BY_POST_ID, 'getVotesByPostId'],
  })

  const upVote = async (isUpvote: boolean) => {
    if (!session) {
      toast("You'll need to sign in to Vote!")
    }

    if (vote && isUpvote) return
    if (vote === false && !isUpvote) return

    await addVote({
      variables: {
        post_id: post.id,
        username: session?.user?.name,
        upvote: isUpvote,
      },
    })
  }

  const goToComments = () => {
    if (!postPage) return
    if (post.comments.length === 0) return

    const { clientHeight } = window.document.documentElement

    window.scrollTo({
      behavior: 'smooth',
      top: clientHeight,
    })
  }

  const displayVotes = (data: any) => {
    const votes: Vote[] = data?.getVotesByPostId
    const displayNumber = votes?.reduce(
      (total, vote) => (vote.upvote ? (total += 1) : (total -= 1)),
      0,
    )

    if (votes?.length === 0) return

    if (displayNumber === 0) {
      return votes[0]?.upvote ? 1 : -1
    }

    return displayNumber
  }

  useEffect(() => {
    const votes: Vote[] = data?.getVotesByPostId

    const vote = votes?.find(
      (vote) => vote.username === session?.user?.name,
    )?.upvote

    setVote(vote)
  }, [data])

  if (!post) {
    return (
      <div className="flex w-full items-center justify-center p-10 text-xl">
        <Jelly size={50} color="#FF4501" />
      </div>
    )
  }

  return postPage ? (
    <article className="rounded-md flex border-gray-200 bg-white shadow-sm">
      <div className="flex flex-col w-12 items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400 dark:bg-black-700">
        <ArrowUp
          onClick={() => upVote(true)}
          className={`voteButtons hover:text-red-400 ${
            vote && 'text-orange-500'
          }`}
        />
        <span
          className={`text-black font-bold text-xs ${
            vote ? 'text-orange-500' : 'text-blue-400'
          }`}
        >
          {displayVotes(data)}
        </span>
        <ArrowDown
          onClick={() => upVote(false)}
          className={`voteButtons hover:text-blue-400 ${
            vote === false && 'text-blue-400'
          }`}
        />
      </div>

      <div className="flex-shrink-1 p-3 pb-1 w-full dark:bg-black-700">
        <header className="flex items-center space-x-2">
          <Avatar seed={post.subreddit[0]?.topic} />
          <p className="text-xs text-gray-400 w-full">
            <Link href={`/subreddit/${post.subreddit[0]?.topic}`}>
              <span className="font-bold text-black hover:underline dark:text-gray-100">
                r/{post.subreddit[0]?.topic}
              </span>
            </Link>{' '}
            * Posted bt u/
            {post.username} <TimeAgo date={post.created_at} />
          </p>
        </header>

        <div className="py-4">
          <h2 className="text-xl font-semibold dark:text-gray-300">
            {post.title}
          </h2>
          <p className="mt-2 text-sm font-light dark:text-gray-200">
            {post.body}
          </p>
        </div>

        <div>
          {post.image && (
            <img src={post.image} alt="image" className="w-full" />
          )}
        </div>

        <div className="flex space-x-4 flex-shrink text-gray-500 mt-2 mb:justify-between">
          <div className="postButtons" onClick={goToComments}>
            <ChatAltOutline className="h-6 w-6" />
            <p className="mb:text-xs">{post.comments.length} Comments</p>
          </div>
          <div className="postButtons mb:hidden">
            <GiftOutline className="max-h-6 max-w-6" />
            <p className="hidden sm:inline">Award</p>
          </div>
          <div className="postButtons mb:hidden">
            <ShareOutline className="max-h-6 max-w-6" />
            <p className="hidden sm:inline">Share</p>
          </div>
          <div className="postButtons mb:hidden">
            <BookmarkOutline className="max-h-6 max-w-6" />
            <p className="hidden sm:inline">Save</p>
          </div>
          <div className="postButtons">
            <DotsHorizontalOutline className="h-6 w-6" />
          </div>
        </div>
      </div>
    </article>
  ) : (
    <Link href={`/post/${post.id}`}>
      <article className="rounded-md overflow-hidden flex cursor-pointer border border-gray-200 bg-white shadow-sm hover:border-gray-600 dark:border-gray-850 dark:hover:border-gray-500">
        <div className="flex flex-col w-12 items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400 dark:bg-black-600">
          <ArrowUp
            onClick={() => upVote(true)}
            className={`voteButtons hover:text-orange-500 ${
              vote && 'text-orange-500'
            }`}
          />
          <span
            className={`text-black font-bold text-xs ${
              vote ? 'dark:text-orange-500' : 'dark:text-blue-400'
            }`}
          >
            {displayVotes(data)}
          </span>
          <ArrowDown
            onClick={() => upVote(false)}
            className={`voteButtons hover:text-blue-400 ${
              vote === false && 'text-blue-400'
            }`}
          />
        </div>

        <div className="flex-shrink-1 p-3 pb-1 w-full dark:bg-black-700">
          <header className="flex items-center space-x-2">
            <Avatar seed={post.subreddit[0]?.topic} />
            <p className="text-xs text-gray-400 w-full">
              <Link href={`/subreddit/${post.subreddit[0]?.topic}`}>
                <span className="font-bold text-black hover:underline dark:text-gray-100">
                  r/{post.subreddit[0]?.topic}
                </span>
              </Link>{' '}
              * Posted bt u/
              {post.username} <TimeAgo date={post.created_at} />
            </p>
          </header>

          <div className="py-4">
            <h2 className="text-xl font-semibold dark:text-gray-300">
              {post.title}
            </h2>
            <p className="mt-2 text-sm font-light dark:text-gray-200">
              {post.body}
            </p>
          </div>

          <div>
            {post.image && (
              <img src={post.image} alt="image" className="w-full" />
            )}
          </div>

          <div className="flex space-x-4 flex-shrink text-gray-400 mt-2 mb:justify-between">
            <div className="postButtons">
              <ChatAltOutline className="h-6 w-6" />
              <p className="mb:text-xs">{post.comments.length} Comments</p>
            </div>
            <div className="postButtons mb:hidden">
              <GiftOutline className="max-h-6 max-w-6" />
              <p className="hidden sm:inline">Award</p>
            </div>
            <div className="postButtons mb:hidden">
              <ShareOutline className="max-h-6 max-w-6" />
              <p className="hidden sm:inline">Share</p>
            </div>
            <div className="postButtons mb:hidden">
              <BookmarkOutline className="max-h-6 max-w-6" />
              <p className="hidden sm:inline">Save</p>
            </div>
            <div className="postButtons">
              <DotsHorizontalOutline className="h-6 w-6" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
