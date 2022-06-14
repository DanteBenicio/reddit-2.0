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
  XOutline,
} from 'heroicons-react'
import Logo from '../RedditLogo/Logo'
import KarmaIcon from '/public/karma-icon.png'
import Robot from '../RedditLogo/Robot'

import Image from 'next/image'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useClickOutside } from '../../hooks/useClickOutside'
import { useRouter } from 'next/router'
import SessionMenu from '../SessionMenu'
import { AppContext } from '../../context'

export default function Header() {
  const {
    setThemeMode,
    setShowSidebarMenu,
    showSidebarMenu,
    themeMode,
    onlineStatus,
    setOnlineStatus,
    ignoredElement,
  } = useContext(AppContext)
  const { data: session } = useSession()
  const inputFormRef = useRef<HTMLInputElement | null>(null)
  const menuSessionRef = useRef<HTMLDivElement | null>(null)
  const { push } = useRouter()

  const [showSessionMenu, setShowSessionMenu] = useState<boolean>(false)
  const [mobileScreen, setMobileScreen] = useState<boolean>(false)

  useEffect(() => {
    if (window.matchMedia('(max-width: 420px)').matches) {
      setMobileScreen(true)
    } else {
      setMobileScreen(false)
    }
  }, [])

  useClickOutside(() => {
    setShowSessionMenu(false)
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
    <header className="sticky flex items-center mb:justify-between mb:bg-[#1a2842] dark:mb:bg-[#1a2842] bg-white top-0 z-30 py-[6px] px-4 shadow-sm border-b-[1px] dark:border-b-gray-850 dark:bg-black-700">
      <div
        className="relative h-10 max-w-32 cursor-pointer"
        onClick={() => push('/')}
      >
        <Logo
          fillColor={
            mobileScreen ? '#FFF' : themeMode === 'dark' ? '' : '#2A2A2A'
          }
        />
      </div>

      <div className="hidden items-center mx-2 p-[0.375rem] lg:flex xl:min-w-[250px] rounded-md cursor-pointer border border-[1px] border-transparent hover:border-gray-200 dark:hover:border-gray-800">
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
      <form
        onClick={() => inputFormRef.current?.focus()}
        className="form z-50 ml-14 mb:hidden lg:ml-0"
      >
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

      <div
        ref={ignoredElement!}
        onClick={() => setShowSidebarMenu((state) => !state)}
        className="relative hidden items-center ml-5 p-1 mb:flex cursor-pointer rounded-sm lg:hover:bg-gray-100 dark:hover:bg-gray-800 dark:mb:hover:bg-transparent dark:mb:bg-transparent"
      >
        {showSidebarMenu ? (
          <XOutline
            className="icon w-8 pointer-events-none"
            color={
              mobileScreen ? '#D7DADC' : themeMode === 'dark' ? '#FFF' : ''
            }
          />
        ) : (
          <Menu
            className="icon w-8 pointer-events-none"
            color={
              mobileScreen ? '#D7DADC' : themeMode === 'dark' ? '#FFF' : ''
            }
          />
        )}
      </div>

      {session ? (
        <div
          ref={menuSessionRef}
          className="relative flex mb:hidden ml-4 border border-gray-100 dark:border-transparent dark:hover:border-gray-800"
        >
          <div
            onClick={() => setShowSessionMenu(!showSessionMenu)}
            className="flex space-x-2 items-center p-2 cursor-pointer"
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

          {showSessionMenu && (
            <SessionMenu
              onlineStatus={onlineStatus}
              setOnlineStatus={setOnlineStatus}
              themeMode={themeMode}
              setThemeMode={setThemeMode}
            />
          )}
        </div>
      ) : (
        <div
          onClick={() => signIn()}
          className="hidden ml-4 lg:ml-0 lg:flex md:flex items-center space-x-2 cursor-pointer border rounded-md border-gray-200 p-2"
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
