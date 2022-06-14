import React, { useContext, useRef, useState } from 'react'

import {
  EyeOutline,
  StarOutline,
  CurrencyDollarOutline,
  ChatAltOutline,
  LightningBoltOutline,
  DocumentSearchOutline,
  QuestionMarkCircleOutline,
  DocumentTextOutline,
  PlusOutline,
  SearchOutline,
  ChevronDownOutline,
} from 'heroicons-react'
import SwitchButton from '../SwitchButton'
import { signIn, signOut, useSession } from 'next-auth/react'
import { AppContext } from '../../context'
import { useClickOutside } from '../../hooks/useClickOutside'
import Avatar from '../Avatar'

export default function SidebarMenu() {
  const {
    themeMode,
    showSidebarMenu,
    setShowSidebarMenu,
    ignoredElement,
    setThemeMode,
  } = useContext(AppContext)
  const sidebarMenuRef = useRef<HTMLElement | null>(null)
  const { data: session } = useSession()
  const [showPreferences, setShowPreferences] = useState<boolean>(false)

  useClickOutside(
    () => {
      setShowSidebarMenu(false)
    },
    sidebarMenuRef!,
    ignoredElement!,
  )

  return showSidebarMenu ? (
    <aside ref={sidebarMenuRef} className="sidebar_menu">
      {session ? (
        <div className="flex items-center flex-col gap-5 justify-between dark:text-gray-200 p-6 py-4 text-white">
          <div className="relative mx-auto w-full rounded-2xl">
            <SearchOutline
              className="absolute left-3 top-2"
              size={20}
              color="#D7DADC"
            />
            <input
              className="w-full bg-[#74747444] pl-10 py-[6px] rounded-2xl"
              placeholder="Search in Reddit"
              type="text"
            />
          </div>
          <div className="flex items-center space-x-2 w-full">
            <div className="">
              <Avatar size="7" />
            </div>
            <p className="w-full text-sm font-medium">
              <strong className="ml-1">{session?.user?.name}</strong>
            </p>
          </div>
          <div className="flex items-center space-x-2 w-full">
            <CurrencyDollarOutline size={26} />
            <p>
              <strong>Coins</strong>
              {'\n'}
              <span className="block">0 coins</span>
            </p>
          </div>

          <div className="flex items-center space-x-2 w-full">
            <StarOutline size={26} />
            <p>
              <strong>Premium</strong>
            </p>
          </div>

          <div className="flex items-center space-x-2 w-full">
            <LightningBoltOutline size={26} />
            <p>
              <strong>Powerups</strong>
            </p>
          </div>

          <div className="flex items-center space-x-2 w-full">
            <ChatAltOutline size={26} />
            <p>
              <strong>Talk</strong>
            </p>
          </div>

          <div className="flex items-center space-x-2 w-full">
            <DocumentSearchOutline size={26} />
            <p>
              <strong>Explore</strong>
            </p>
          </div>

          <div className="flex items-center space-x-2 w-full">
            <QuestionMarkCircleOutline size={26} />
            <p>
              <strong>Help Center</strong>
            </p>
          </div>

          <div className="flex items-center space-x-2 w-full">
            <PlusOutline size={26} />
            <p>
              <strong>More</strong>
            </p>
          </div>

          <div className="flex items-center space-x-2 w-full">
            <DocumentTextOutline size={26} />
            <p>
              <strong>Terms & Polices</strong>
            </p>
          </div>
          <div
            onClick={() => setShowPreferences(!showPreferences)}
            className="w-full"
          >
            <div className="relative flex items-center space-x-2 w-full">
              <EyeOutline size={26} />
              <p>
                <strong>Preferences</strong>
              </p>
              <ChevronDownOutline
                className={`absolute right-0 transition-all ${
                  showPreferences ? 'rotate-180' : ''
                }`}
                size={22}
              />
            </div>
            {showPreferences && (
              <div className="w-full pt-6 pb-2 pl-9">
                <p
                  onClick={() =>
                    setThemeMode(themeMode === 'dark' ? 'light' : 'dark')
                  }
                  className="flex items-center justify-between"
                >
                  Dark Mode <SwitchButton state={themeMode} />
                </p>
              </div>
            )}
          </div>
          <button
            onClick={() => signOut()}
            className="w-full text-center mt-1 bg-blue-600 py-1 rounded-2xl text-gray-100"
          >
            <strong>Log out</strong>
          </button>
        </div>
      ) : (
        <div className="flex items-center flex-col gap-5 justify-between dark:text-gray-200 p-6 py-4 text-white">
          <div className="relative mx-auto w-full rounded-2xl">
            <SearchOutline className="absolute left-3 top-2" size={20} />
            <input
              className="w-full bg-[#74747444] pl-10 py-[6px] rounded-2xl"
              placeholder="Search in Reddit"
              type="text"
            />
          </div>
          <div className="flex items-center space-x-2 w-full">
            <CurrencyDollarOutline size={26} />
            <p>
              <strong>Coins</strong>
              {'\n'}
              <span className="block">0 coins</span>
            </p>
          </div>

          <div className="flex items-center space-x-2 w-full">
            <StarOutline size={26} />
            <p>
              <strong>Premium</strong>
            </p>
          </div>

          <div className="flex items-center space-x-2 w-full">
            <LightningBoltOutline size={26} />
            <p>
              <strong>Powerups</strong>
            </p>
          </div>

          <div className="flex items-center space-x-2 w-full">
            <ChatAltOutline size={26} />
            <p>
              <strong>Talk</strong>
            </p>
          </div>

          <div className="flex items-center space-x-2 w-full">
            <DocumentSearchOutline size={26} />
            <p>
              <strong>Explore</strong>
            </p>
          </div>

          <div className="flex items-center space-x-2 w-full">
            <QuestionMarkCircleOutline size={26} />
            <p>
              <strong>Help Center</strong>
            </p>
          </div>

          <div className="flex items-center space-x-2 w-full">
            <PlusOutline size={26} />
            <p>
              <strong>More</strong>
            </p>
          </div>

          <div className="flex items-center space-x-2 w-full">
            <DocumentTextOutline size={26} />
            <p>
              <strong>Terms & Polices</strong>
            </p>
          </div>
          <div
            onClick={() => setShowPreferences(!showPreferences)}
            className="w-full"
          >
            <div className="relative flex items-center space-x-2 w-full">
              <EyeOutline size={26} />
              <p>
                <strong>Preferences</strong>
              </p>
              <ChevronDownOutline
                className={`absolute right-0 transition-all ${
                  showPreferences ? 'rotate-180' : ''
                }`}
                size={22}
              />
            </div>
            {showPreferences && (
              <div className="w-full pt-6 pb-2 pl-9">
                <p
                  onClick={() =>
                    setThemeMode(themeMode === 'dark' ? 'light' : 'dark')
                  }
                  className="flex items-center justify-between"
                >
                  Dark Mode <SwitchButton state={themeMode} />
                </p>
              </div>
            )}
          </div>
          <button
            onClick={() => signIn()}
            className="w-full text-center mt-1 bg-blue-600 py-1 rounded-2xl text-gray-100"
          >
            <strong>Sign In / Log In</strong>
          </button>
        </div>
      )}
    </aside>
  ) : (
    <></>
  )
}
