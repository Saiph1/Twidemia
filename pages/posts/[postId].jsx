import Feed from '@/components/Feed'
import Sidebar from '@/components/Sidebar'
import Widgets from '@/components/Widgets'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import TweetData from '../../components/tweetHub'
import CommentData from '../../components/commentHub'

const PostsDetail = () => {
    
    const router = useRouter()
    const { postId } = router.query

    const [tweetOwnerInfo, setTweetOwnerInfo] = useState()

    const tweetInfo = TweetData.filter(tweet => {
      return tweet.tweetID === postId
    })[0]
    
    const commentsOfTweet = CommentData.filter(comment => {
      return comment.tweetID === postId
    })

  return (
    <main className="flex min-h-screen max-w-7xl w-full mx-auto">

    <Sidebar />
    
    <div className="xl:ml-[300px] border-l border-r border-gray-200 xl:min-w-[700px] sm:ml-[73px] flex-grow max-w-xl">

      {/* tweet owner and tweet info */}
      <div className='flex items-center gap-1 border-b py-4 px-3'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        <h4 className='font-semibold'>Tweet</h4>
      </div>
      
      <div className="py-4 px-3 border-b flex gap-4">
        {/* icon */}
        <div className='max-w-[3rem]'>
          <img src={tweetInfo.iconURL} className='rounded-full w-full object-cover aspect-square'/>
        </div>

        <div >
          <div className='flex justify-between items-center mb-2'>
            <div className='inline-flex gap-2 items-center'>
              <p className='font-semibold'>{tweetInfo.userName}</p>
              <p className='text-gray-500 text-sm font-light'>@{tweetInfo.userCustomizeID}</p>
            </div>
            <p className='text-gray-500 text-xs font-light'>{tweetInfo.postDateTime}</p>
          </div>

          <div className='mb-2'>
            {tweetInfo.tweetContent}
          </div>

          <div className='flex justify-between items-center w-3/10'>
              <label className='cursor-pointer inline-flex gap-1 items-center text-gray-400 hover:text-blue-500 rounded-lg hover:bg-blue-100 pl-0 pr-1 px-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.75" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                </svg>
                <span className="text-[14px] ">{commentsOfTweet.numOfComments}</span>
              </label>
              <label className='cursor-pointer inline-flex gap-1 items-center text-gray-400 hover:text-red-400 rounded-lg hover:bg-red-100 py-1 px-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 ">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
                <span className='text-[14px] '>{commentsOfTweet.numOfLikes}</span>
              </label>
          </div>
        </div>
      </div>

      {commentsOfTweet.length > 0 && commentsOfTweet?.map(comment => {
        return <div key={comment._id} className='border-b py-4 px-3 flex gap-4 hover:bg-gray-100'>
          <div className='max-w-[3rem]'>
            <img src='data:image/jpeg;base64,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' className='rounded-full w-full object-cover aspect-square'/>
          </div>

          <div>
            <div className='flex justify-between items-center mb-2'>
              <div className='inline-flex gap-2 items-center'>
                <p className='font-semibold'>{comment.author}</p>
                <p className='text-gray-500 text-sm font-light'>@ user_id</p>
              </div>
              <p className='text-gray-500 text-xs font-light'>{comment.postDateTime}</p>
            </div>

            <div className='mb-2'>
              {comment.content}
            </div>
          </div>
        </div>
      })}
      

    </div>

    <Widgets />

    {/* Model */}
  </main>
  )
}

export default PostsDetail