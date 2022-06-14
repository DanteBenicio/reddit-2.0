import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import Header from '../components/Header'
import { ApolloProvider } from '@apollo/client'
import { client } from '../apollo-client'
import { Toaster } from 'react-hot-toast'
import { ContextProvider } from '../context'
import SidebarMenu from '../components/SidebarMenu'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={session}>
        <Toaster />
        <ContextProvider>
          <SidebarMenu />
          <Header />
          <Component {...pageProps} />
        </ContextProvider>
      </SessionProvider>
    </ApolloProvider>
  )
}

export default MyApp
