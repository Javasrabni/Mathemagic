import Head from 'next/head'
import ProfileClient from './profilclient'

const ProfilePage = () => {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://my.spline.design" />
        <link rel="dns-prefetch" href="https://my.spline.design" />
      </Head>
      <ProfileClient />
    </>
  )
}

export default ProfilePage
