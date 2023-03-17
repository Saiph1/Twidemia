import Head from 'next/head'
import Image from 'next/image'

import Sidebar from '@/components/Sidebar'
import Feed from '@/components/Feed'
import Widgets from '@/components/Widgets'
import ProfileContainer from '@/components/ProfileContainer'

import Slider from '@mui/material/Slider';

export default function Home() {
  return (
    <>
      <Head>
        <title>Twidemia</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Twidemia-logo.png" />
      </Head>

      
      <main className="flex min-h-screen max-w-7xl mx-auto">

        {/* Sidebar */}
        <Sidebar />
        <ProfileContainer/>
        <Widgets/>

      </main>

      
      
      
    </>
  )
}
