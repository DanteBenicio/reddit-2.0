import React, { createContext, ReactNode, useRef, useState } from 'react'

interface InitialContextValue {
  ignoredElement: React.MutableRefObject<HTMLDivElement | null> | null
  onlineStatus: boolean
  setOnlineStatus: React.Dispatch<React.SetStateAction<boolean>>
  showSidebarMenu: boolean
  setShowSidebarMenu: React.Dispatch<React.SetStateAction<boolean>>
  themeMode: 'light' | 'dark' | string
  setThemeMode: React.Dispatch<React.SetStateAction<'light' | 'dark' | string>>
}

export const AppContext = createContext<InitialContextValue>({
  ignoredElement: null,
  themeMode: '',
  showSidebarMenu: false,
  onlineStatus: false,
  setOnlineStatus: () => {},
  setShowSidebarMenu: () => {},
  setThemeMode: () => {},
})

export function ContextProvider({ children }: { children: ReactNode }) {
  const [themeMode, setThemeMode] = useState<'light' | 'dark' | string>('')
  const [showSidebarMenu, setShowSidebarMenu] = useState<boolean>(false)
  const [onlineStatus, setOnlineStatus] = useState<boolean>(false)
  const ignoredElement = useRef<HTMLDivElement | null>(null)

  return (
    <AppContext.Provider
      value={{
        themeMode,
        setThemeMode,
        showSidebarMenu,
        setShowSidebarMenu,
        onlineStatus,
        setOnlineStatus,
        ignoredElement,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
