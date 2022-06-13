import React from 'react'

import {
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
  PlusOutline,
} from 'heroicons-react'
import SwitchButton from '../SwitchButton'
import { signOut } from 'next-auth/react'

interface SessionMenuProps {
  setOnlineStatus: React.Dispatch<React.SetStateAction<boolean>>
  onlineStatus: boolean
  themeMode: 'dark' | 'light' | string
  setThemeMode: React.Dispatch<React.SetStateAction<'dark' | 'light' | string>>
}

export default function SessionMenu({
  onlineStatus,
  themeMode,
  setThemeMode,
  setOnlineStatus,
}: SessionMenuProps) {
  return (
    <div className="show_menu">
      <div className="flex w-full items-center gap-5 pl-[1.375rem] mb-2">
        <UserCircleOutline size={25} color="#818384" />
        <span className="text-[#818384] ">My Stuff</span>
      </div>
      <div
        onClick={() => setOnlineStatus(!onlineStatus)}
        className="flex items-center pl-[4.25rem] w-full py-3 hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer"
      >
        <span className="text-black-700 dark:text-gray-300 ">
          Online Status
        </span>
        <SwitchButton state={onlineStatus!} />
      </div>
      <div className="flex items-center w-full pl-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer">
        <span className="text-black-700 ml-11 dark:text-gray-300 ">
          Profile
        </span>
      </div>
      <div className="flex items-center w-full pl-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer">
        <span className="text-black-700 ml-11 dark:text-gray-300 ">
          Create Avatar
        </span>
      </div>
      <div className="flex items-center w-full pl-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer">
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
          onClick={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
          className="flex items-center w-full pl-[4.25rem] py-3 hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer"
        >
          <span className="text-black-700 dark:text-gray-300 ">Dark Mode</span>
          <SwitchButton state={themeMode} />
        </div>
      </div>

      <div className="w-full py-4 border-t-[1px] border-t-gray-200 dark:border-t-gray-800">
        <div className="flex w-full items-center gap-5 py-3 pl-[1.375rem] hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer">
          <GlobeAltOutline
            size={26}
            color={themeMode === 'dark' ? '#C8CBCD' : ''}
          />
          <span className="text-black-700 dark:text-gray-300 ">
            Create a Community
          </span>
        </div>
        <div className="flex w-full items-center gap-5 py-3 pl-[1.375rem] hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer">
          <ExclamationOutline
            size={26}
            color={themeMode === 'dark' ? '#C8CBCD' : ''}
          />
          <span className="text-black-700 dark:text-gray-300 ">
            Advertise on Reddit
          </span>
        </div>
        <div className="flex w-full items-center gap-5 py-3 pl-[1.375rem] hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer">
          <CurrencyDollarOutline
            size={26}
            color={themeMode === 'dark' ? '#C8CBCD' : ''}
          />
          <span className="text-black-700 dark:text-gray-300 ">Coins</span>
        </div>
        <div className="flex w-full items-center gap-5 py-3 pl-[1.375rem] hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer">
          <StarOutline
            size={26}
            color={themeMode === 'dark' ? '#C8CBCD' : ''}
          />
          <span className="text-black-700 dark:text-gray-300 ">Premium</span>
        </div>
        <div className="flex w-full items-center gap-5 py-3 pl-[1.375rem] hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer">
          <div className="w-[1.625rem] h-[1.625rem]">
            <LightningBoltOutline
              size={26}
              color={themeMode === 'dark' ? '#C8CBCD' : ''}
            />
          </div>
          <span className="text-black-700 dark:text-gray-300 ">Powerups</span>
        </div>
        <div className="flex w-full items-center gap-5 py-3 pl-[1.375rem] hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer">
          <div className="w-[1.625rem] h-[1.625rem]">
            <ChatAltOutline
              size={26}
              color={themeMode === 'dark' ? '#C8CBCD' : ''}
            />
          </div>
          <span className="text-black-700 dark:text-gray-300 ">Talk</span>
        </div>
        <div className="flex w-full items-center gap-5 py-3 pl-[1.375rem] hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer">
          <div className="w-[1.625rem] h-[1.625rem]">
            <DocumentSearchOutline
              size={26}
              color={themeMode === 'dark' ? '#C8CBCD' : ''}
            />
          </div>
          <span className="text-black-700 dark:text-gray-300 ">Explore</span>
        </div>
        <div className="flex w-full items-center gap-5 py-3 pl-[1.375rem] hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer">
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
        <div className="flex w-full items-center gap-5 py-3 pl-[1.375rem] hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer">
          <PlusOutline
            size={26}
            color={themeMode === 'dark' ? '#C8CBCD' : ''}
          />
          <span className="text-black-700 dark:text-gray-300 ">More</span>
        </div>
        <div className="flex w-full items-center gap-5 py-3 pl-[1.375rem] hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer">
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
        <div className="flex w-full items-center gap-5 py-3 pl-[1.375rem] hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer">
          <span className="text-black-700 ml-12 dark:text-gray-300 ">
            User Agreement
          </span>
        </div>
        <div className="flex w-full items-center gap-5 py-3 pl-[1.375rem] hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer">
          <span className="text-black-700 ml-12 dark:text-gray-300 ">
            Privacy Policy
          </span>
        </div>
        <div className="flex w-full items-center gap-5 py-3 pl-[1.375rem] hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer">
          <span className="text-black-700 ml-12 dark:text-gray-300 ">
            Content Policy
          </span>
        </div>
        <div className="flex w-full items-center gap-5 py-3 pl-[1.375rem] hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer">
          <span className="text-black-700 ml-12 dark:text-gray-300 ">
            Moderator Guidelines
          </span>
        </div>
      </div>

      <div className="w-full py-4 border-t-[1px] border-t-gray-200 dark:border-t-gray-800">
        <div
          onClick={() => signOut()}
          className="flex w-full items-center gap-5 py-3 pl-[1.375rem] hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer"
        >
          <div className="w-[1.625rem] h-[1.625rem]">
            <BackspaceOutline
              size={26}
              color={themeMode === 'dark' ? '#C8CBCD' : ''}
            />
          </div>
          <span className="text-black-700 dark:text-gray-300 ">Log Out</span>
        </div>
        <p className="text-[0.875rem] text-gray-300 pl-[1.375rem] my-4">
          &copy; {new Date().getFullYear()} Reddit, Inc. All rights
          <br />
          reserved
        </p>
      </div>
    </div>
  )
}
