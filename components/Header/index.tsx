/* eslint-disable jsx-a11y/alt-text */
import {
  ChevronDown,
  Home,
  Search,
  SparklesOutline,
  GlobeOutline,
  VideoCameraOutline,
  ChatOutline,
  BellOutline,
  PlusOutline,
  SpeakerphoneOutline,
  Menu,
} from 'heroicons-react'
import Image from 'next/image'
import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

export default function Header() {
  const { data: session } = useSession()

  return (
    <header className="sticky flex bg-white top-0 z-50 px-4 py-2 shadow-sm">
      <div className="relative h-10 w-20 flex-shrink-0">
        <Image
          priority
          src="https://links.papareact.com/fqy"
          objectFit="contain"
          layout="fill"
        />
      </div>
      <div className="flex items-center mx-7 lg:bg-red-500 xl:min-w-[300px]">
        <Home className="h-5 w-5" />
        <p className="flex-1 ml-2 hidden lg:inline">Home</p>
        <ChevronDown className="h-5 w-5" />
      </div>
      <form className="flex flex-1 items-center space-x-2 rounded-sm border border-gray-200 bg-gray-100 px-3 py-1">
        <Search className="w-6 h-6 fill-gray-400" />
        <input
          className="flex-1 bg-transparent outline-none"
          type="text"
          placeholder="Search Reddit"
        />
        <button type="submit"></button>
      </form>

      <div className="mx-5 hidden items-center space-x-2 text-gray-500 lg:inline-flex">
        <SparklesOutline className="icon" />
        <GlobeOutline className="icon" />
        <VideoCameraOutline className="icon" />
        <hr className="h-10 border border-gray-100" />
        <ChatOutline className="icon" />
        <BellOutline className="icon" />
        <PlusOutline className="icon" />
        <SpeakerphoneOutline className="icon" />
      </div>

      <div className="ml-5 flex items-center lg:hidden">
        <Menu className="icon" />
      </div>

      {session ? (
        <div
          onClick={() => signOut()}
          className="hidden lg:flex items-center space-x-2 cursor-pointer border border-gray-100 p-2"
        >
          <div className="relative h-5 w-5 flex-shrink-0">
            <Image
              src="https://links.papareact.com/23l"
              layout="fill"
              objectFit="contain"
              alt=""
            />
          </div>

          <div className="flex text-xs flex-col">
            <p className="truncate">{session.user?.name}</p>
            <p className="text-gray-400">Sign Out</p>
          </div>

          <ChevronDown className="h-5 flex-shrink-0 text-gray-400" />
        </div>
      ) : (
        <div
          onClick={() => signIn()}
          className="hidden lg:flex items-center space-x-2 cursor-pointer border border-gray-100 p-2"
        >
          <div className="relative h-5 w-5 flex-shrink-0">
            <Image
              src="https://links.papareact.com/23l"
              layout="fill"
              objectFit="contain"
              alt=""
            />
          </div>
          <span className="text-gray-400">Sign In</span>
        </div>
      )}
    </header>
  )
}
