/* eslint-disable no-undef */
import React from 'react'
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

interface PostProps {
  post: Post
}

export default function Post({ post }: PostProps) {
  return (
    <Link href={`/post/${post.id}`}>
      <article className="rounded-md flex cursor-pointer border border-gray-300 bg-white shadow-sm hover:border hover:border-gray-600">
        {/* Votes */}
        <div className="flex flex-col w-12 items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400">
          <ArrowUp className="voteButtons hover:text-red-400" />
          <span className="text-black font-bold text-xs">0</span>
          <ArrowDown className="voteButtons hover:text-blue-400" />
        </div>

        <div className="p-3 pb-1">
          {/* Header */}
          <header className="flex items-center space-x-2">
            <Avatar seed={post.subreddit[0]?.topic} />
            <p className="text-xs text-gray-400 ">
              <Link href={`/subreddit/${post.subreddit[0]?.topic}`}>
                <span className="font-bold text-black hover:text-blue-400 hover:underline">
                  r/{post.subreddit[0]?.topic}
                </span>
              </Link>{' '}
              * Posted bt u/
              {post.username} <TimeAgo date={post.created_at} />
            </p>
          </header>

          <div className="py-4">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="mt-2 text-sm font-light">{post.body}</p>
          </div>

          <div>
            {post.image && (
              <img src={post.image} alt="image" className="w-full" />
            )}
          </div>

          <div className="flex space-x-4 text-gray-400 mt-2">
            <div className="postButtons">
              <ChatAltOutline className="h-6 w-6" />
              <p>{post.comments.length} Comments</p>
            </div>
            <div className="postButtons">
              <GiftOutline className="h-6 w-6" />
              <p className="hidden sm:inline">{post.comments.length} Award</p>
            </div>
            <div className="postButtons">
              <ShareOutline className="h-6 w-6" />
              <p className="hidden sm:inline">{post.comments.length} Share</p>
            </div>
            <div className="postButtons">
              <BookmarkOutline className="h-6 w-6" />
              <p className="hidden sm:inline">{post.comments.length} Save</p>
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
