import React from 'react'
import { useSession } from 'next-auth/react'
import Avatar from '../Avatar'

export default function PostBox() {
  const { data: session } = useSession()

  return (
    <form>
      <div className="flex items-center space-x-3">
        <Avatar />

        <input
          className="bg-gray-50 p-2 pl-5 outline-none flex-1"
          disabled={!session}
          type="text"
          placeholder={
            session ? `Create a post by entering a title!` : `Sign in to post`
          }
        />
      </div>
    </form>
  )
}
