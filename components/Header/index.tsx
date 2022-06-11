/* eslint-disable import/no-absolute-path */
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
  UserCircleOutline,
  EyeOutline,
  GlobeAltOutline,
  ExclamationOutline,
  StarOutline,
  CurrencyDollarOutline,
  ChatAltOutline,
  LightningBoltOutline,
  DocumentSearchOutline,
  QuestionMarkCircleOutline,
  DocumentTextOutline,
  BackspaceOutline,
} from 'heroicons-react'
import Logo from '../RedditLogo/Logo'
import KarmaIcon from '/public/karma-icon.png'
import Robot from '../RedditLogo/Robot'

import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import SwitchButton from '../SwitchButton'
import { useClickOutside } from '../../hooks/useClickOutside'
import { useRouter } from 'next/router'

export default function Header() {
  const { data: session } = useSession()
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const [onlineStatus, setOnlineStatus] = useState<boolean>()
  const [themeMode, setThemeMode] = useState<string>('')
  const inputFormRef = useRef<HTMLInputElement | null>(null)
  const menuSessionRef = useRef<HTMLDivElement | null>(null)
  const { push } = useRouter()

  useClickOutside(() => {
    setShowMenu(false)
  }, menuSessionRef!)

  useEffect(() => {
    if (!themeMode && !onlineStatus) {
      setThemeMode(localStorage.getItem('theme') || 'light')
      setOnlineStatus(Boolean(localStorage.getItem('isOnline')) || false)
      return
    }

    if (!themeMode) {
      setThemeMode(localStorage.getItem('theme') || 'light')
      return
    }

    if (themeMode === 'light') {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    }

    if (onlineStatus) {
      localStorage.setItem('isOnline', 'true')
    } else {
      localStorage.setItem('isOnline', '')
    }
  }, [themeMode, onlineStatus])

  return (
    <header className="sticky flex items-center bg-white top-0 z-50 py-[6px] px-4 shadow-sm border-b-[1px] dark:border-b-gray-850 dark:bg-black-700">
      <div
        className="relative h-10 max-w-32 cursor-pointer"
        onClick={() => push('/')}
      >
        <Logo fillColor={themeMode === 'dark' ? '' : '#2A2A2A'} />
      </div>

      <div className="flex items-center mx-7 p-[0.375rem] xl:min-w-[250px] mb:hidden rounded-md cursor-pointer border border-[1px] border-transparent hover:border-gray-200 dark:hover:border-gray-800">
        <Home
          className="h-7 w-7"
          color={themeMode === 'light' ? '' : '#C8CBCD'}
        />
        <p className="flex-1 ml-2 hidden lg:inline dark:text-gray-500">Home</p>
        <ChevronDown
          className="h-5 w-5"
          color={themeMode === 'light' ? '' : '#C8CBCD'}
        />
      </div>
      <form onClick={() => inputFormRef.current?.focus()} className="form">
        <Search className="w-6 h-6 fill-gray-400" />
        <input
          ref={inputFormRef}
          className="flex-1 bg-transparent outline-none w-full mb:ml-4 "
          type="text"
          placeholder="Search Reddit"
        />
        <button type="submit"></button>
      </form>

      <div className="mx-5 hidden items-center space-x-2 text-gray-500 lg:inline-flex">
        <SparklesOutline className="icon" />
        <GlobeOutline className="icon" />
        <VideoCameraOutline className="icon" />
        <hr className="h-10 border border-gray-100 dark:border-gray-800" />
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
          ref={menuSessionRef}
          className="relative z-50 hidden lg:flex cursor-pointer border border-gray-100 dark:border-transparent dark:hover:border-gray-800"
        >
          <div
            onClick={() => setShowMenu(!showMenu)}
            className="flex space-x-2 items-center p-2"
          >
            <div className="relative h-5 w-5 flex-shrink-0 p-3 bg-gray-100 rounded-md">
              <Image
                src="https://links.papareact.com/23l"
                layout="fill"
                objectFit="contain"
                alt=""
              />
              {onlineStatus && (
                <span className="absolute w-3 h-3 bg-green-500 rounded-full bottom-[-2px] right-[-2px] border-white border-2 dark:border-black-800" />
              )}
            </div>

            <div className="flex text-xs flex-col">
              <p className="truncate text-gray-300 font-medium text-sm">
                {session.user?.name}
              </p>
              <p className="flex gap-[0.2rem] text-gray-400 font-medium text-[0.8125rem]">
                <div className="w-4 h-4">
                  <Image src={KarmaIcon} layout="responsive" />
                </div>
                1 karma
              </p>
            </div>

            <ChevronDown className="h-5 flex-shrink-0 text-gray-400" />
          </div>

          {showMenu && (
            <div className="absolute -bottom-[528px] right-0 z-50 w-[280px] h-[520px] bg-white pt-5 overflow-y-scroll rounded-lg dark:bg-black-700">
              <div className="flex w-full items-center gap-5 pl-[1.375rem] mb-2">
                <UserCircleOutline size={25} color="#818384" />
                <span className="text-[#818384] ">My Stuff</span>
              </div>
              <div
                onClick={() => setOnlineStatus(!onlineStatus)}
                className="flex items-center pl-[4.25rem] w-full py-3 hover:bg-gray-100 dark:hover:bg-gray-900"
              >
                <span className="text-black-700 dark:text-gray-300 ">
                  Online Status
                </span>
                <SwitchButton state={onlineStatus!} />
              </div>
              <div className="flex items-center w-full pl-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-900">
                <span className="text-black-700 ml-11 dark:text-gray-300 ">
                  Profile
                </span>
              </div>
              <div className="flex items-center w-full pl-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-900">
                <span className="text-black-700 ml-11 dark:text-gray-300 ">
                  Create Avatar
                </span>
              </div>
              <div className="flex items-center w-full pl-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-900">
                <span className="text-black-700 ml-11 dark:text-gray-300 ">
                  User Settings
                </span>
              </div>

              <div className="w-full border-t-[1px] border-t-gray-200 py-4 dark:border-t-gray-800">
                <div className="flex w-full items-center gap-5 pl-[1.375rem] mb-2">
                  <EyeOutline size={25} color="#818384" />
                  <span className="text-[#818384]">View Options</span>
                </div>
                <div
                  onClick={() =>
                    setThemeMode(themeMode === 'dark' ? 'light' : 'dark')
                  }
                  className="flex items-center w-full pl-[4.25rem] py-3 hover:bg-gray-100 dark:hover:bg-gray-900"
                >
                  <span className="text-black-700 dark:text-gray-300 ">
                    Dark Mode
                  </span>
                  <SwitchButton state={themeMode} />
                </div>
              </div>

              <div className="w-full py-4 border-t-[1px] border-t-gray-200 dark:border-t-gray-800">
                <div className="flex w-full items-center gap-5 py-3 pl-[1.375rem] hover:bg-gray-100 dark:hover:bg-gray-900">
                  <GlobeAltOutline
                    size={26}
                    color={themeMode === 'dark' ? '#C8CBCD' : ''}
                  />
                  <span className="text-black-700 dark:text-gray-300 ">
                    Create a Community
                  </span>
                </div>
                <div className="flex w-full items-center gap-5 py-3 pl-[1.375rem] hover:bg-gray-100 dark:hover:bg-gray-900">
                  <ExclamationOutline
                    size={26}
                    color={themeMode === 'dark' ? '#C8CBCD' : ''}
                  />
                  <span className="text-black-700 dark:text-gray-300 ">
                    Advertise on Reddit
                  </span>
                </div>
                <div className="flex w-full items-center gap-5 py-3 pl-[1.375rem] hover:bg-gray-100 dark:hover:bg-gray-900">
                  <CurrencyDollarOutline
                    size={26}
                    color={themeMode === 'dark' ? '#C8CBCD' : ''}
                  />
                  <span className="text-black-700 dark:text-gray-300 ">
                    Coins
                  </span>
                </div>
                <div className="flex w-full items-center gap-5 py-3 pl-[1.375rem] hover:bg-gray-100 dark:hover:bg-gray-900">
                  <StarOutline
                    size={26}
                    color={themeMode === 'dark' ? '#C8CBCD' : ''}
                  />
                  <span className="text-black-700 dark:text-gray-300 ">
                    Premium
                  </span>
                </div>
                <div className="flex w-full items-center gap-5 py-3 pl-[1.375rem] hover:bg-gray-100 dark:hover:bg-gray-900">
                  <div className="w-[1.625rem] h-[1.625rem]">
                    <LightningBoltOutline
                      size={26}
                      color={themeMode === 'dark' ? '#C8CBCD' : ''}
                    />
                  </div>
                  <span className="text-black-700 dark:text-gray-300 ">
                    Powerups
                  </span>
                </div>
                <div className="flex w-full items-center gap-5 py-3 pl-[1.375rem] hover:bg-gray-100 dark:hover:bg-gray-900">
                  <div className="w-[1.625rem] h-[1.625rem]">
                    <ChatAltOutline
                      size={26}
                      color={themeMode === 'dark' ? '#C8CBCD' : ''}
                    />
                  </div>
                  <span className="text-black-700 dark:text-gray-300 ">
                    Talk
                  </span>
                </div>
                <div className="flex w-full items-center gap-5 py-3 pl-[1.375rem] hover:bg-gray-100 dark:hover:bg-gray-900">
                  <div className="w-[1.625rem] h-[1.625rem]">
                    <DocumentSearchOutline
                      size={26}
                      color={themeMode === 'dark' ? '#C8CBCD' : ''}
                    />
                  </div>
                  <span className="text-black-700 dark:text-gray-300 ">
                    Explore
                  </span>
                </div>
                <div className="flex w-full items-center gap-5 py-3 pl-[1.375rem] hover:bg-gray-100 dark:hover:bg-gray-900">
                  <div className="w-[1.625rem] h-[1.625rem]">
                    <QuestionMarkCircleOutline
                      size={26}
                      color={themeMode === 'dark' ? '#C8CBCD' : ''}
                    />
                  </div>
                  <span className="text-black-700 dark:text-gray-300 ">
                    Help Center
                  </span>
                </div>
                <div className="flex w-full items-center gap-5 py-3 pl-[1.375rem] hover:bg-gray-100 dark:hover:bg-gray-900">
                  <PlusOutline
                    size={26}
                    color={themeMode === 'dark' ? '#C8CBCD' : ''}
                  />
                  <span className="text-black-700 dark:text-gray-300 ">
                    More
                  </span>
                </div>
                <div className="flex w-full items-center gap-5 py-3 pl-[1.375rem] hover:bg-gray-100 dark:hover:bg-gray-900">
                  <div className="w-[1.625rem] h-[1.625rem]">
                    <DocumentTextOutline
                      size={26}
                      color={themeMode === 'dark' ? '#C8CBCD' : ''}
                    />
                  </div>
                  <span className="text-black-700 dark:text-gray-300 ">
                    Terms & Polices
                  </span>
                </div>
                <div className="flex w-full items-center gap-5 py-3 pl-[1.375rem] hover:bg-gray-100 dark:hover:bg-gray-900">
                  <span className="text-black-700 ml-12 dark:text-gray-300 ">
                    User Agreement
                  </span>
                </div>
                <div className="flex w-full items-center gap-5 py-3 pl-[1.375rem] hover:bg-gray-100 dark:hover:bg-gray-900">
                  <span className="text-black-700 ml-12 dark:text-gray-300 ">
                    Privacy Policy
                  </span>
                </div>
                <div className="flex w-full items-center gap-5 py-3 pl-[1.375rem] hover:bg-gray-100 dark:hover:bg-gray-900">
                  <span className="text-black-700 ml-12 dark:text-gray-300 ">
                    Content Policy
                  </span>
                </div>
                <div className="flex w-full items-center gap-5 py-3 pl-[1.375rem] hover:bg-gray-100 dark:hover:bg-gray-900">
                  <span className="text-black-700 ml-12 dark:text-gray-300 ">
                    Moderator Guidelines
                  </span>
                </div>
              </div>

              <div className="w-full py-4 border-t-[1px] border-t-gray-200 dark:border-t-gray-800">
                <div
                  onClick={() => signOut()}
                  className="flex w-full items-center gap-5 py-3 pl-[1.375rem] hover:bg-gray-100 dark:hover:bg-gray-900"
                >
                  <div className="w-[1.625rem] h-[1.625rem]">
                    <BackspaceOutline
                      size={26}
                      color={themeMode === 'dark' ? '#C8CBCD' : ''}
                    />
                  </div>
                  <span className="text-black-700 dark:text-gray-300 ">
                    Log Out
                  </span>
                </div>
                <p className="text-[0.875rem] text-gray-300 pl-[1.375rem] my-4">
                  &copy; {new Date().getFullYear()} Reddit, Inc. All rights
                  <br />
                  reserved
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div
          onClick={() => signIn()}
          className="hidden lg:flex items-center space-x-2 cursor-pointer border rounded-md border-gray-200 p-2"
        >
          <div className="relative h-5 w-5 flex-shrink-0">
            <Robot
              fillColor={themeMode === 'dark' ? '#FFF' : '#000000'}
              size={22}
            />
          </div>
          <span className="text-gray-300">Sign In</span>
        </div>
      )}
    </header>
  )
}
