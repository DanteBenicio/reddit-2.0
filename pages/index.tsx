/* eslint-disable no-undef */
import { useQuery } from '@apollo/client'
import type { NextPage } from 'next'
import Head from 'next/head'
import Feed from '../components/Feed'
import PostBox from '../components/PostBox'
import SubredditRow from '../components/SubredditRow'
import { GET_SUBREDDITS_WITH_LIMIT } from '../graphql/queries'

const Home: NextPage = () => {
  const { data } = useQuery(GET_SUBREDDITS_WITH_LIMIT, {
    variables: {
      limit: 10,
    },
  })

  const subreddits: Subreddit[] = data?.getSubredditListLimit

  return (
    <div className="pt-5 mx-auto px-6 pb-5 max-w-[100vw] mb:px-4 mb:pb-4 dark:bg-[#000]">
      <Head>
        <title>Reddit 2.0 Clone</title>
      </Head>
      <PostBox />

      <div className="flex">
        <Feed />

        <div className="top-40 ml-5 mt-5 hidden h-fit min-w-[300px] rounded-md border border-gray-200 bg-white lg:inline dark:bg-gray-900 dark:border-gray-850">
          <p className="text-md mb-1 p-4 pb-3 font-medium dark:text-gray-100 tracking-wide">
            Top Communities
          </p>

          <div>
            {subreddits?.map((subreddit, index) => (
              <SubredditRow
                key={subreddit.id}
                topic={subreddit.topic}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
