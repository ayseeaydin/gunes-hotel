import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import Hero from '@components/sections/Hero'
import About from '@components/sections/About'
import Rooms from '@components/sections/Rooms'
import Gallery from '@components/sections/Gallery'
import Contact from '@components/sections/Contact'

const Home = () => {
  const { t } = useTranslation()

  // Debug için kontrol edilecek görseller
  const debugImages = import.meta.env.DEV ? [
    { src: '/img/motel.webp', component: 'About' },
    { src: '/img/double-room-1.webp', component: 'Rooms' },
    { src: '/img/twin-room-1.webp', component: 'Rooms' },
    { src: '/img/triple-room.webp', component: 'Rooms' },
    { src: '/img/gallery-27.webp', component: 'Rooms' },
    { src: '/img/gallery-1.webp', component: 'Gallery' },
    { src: '/img/gallery-2.webp', component: 'Gallery' },
    { src: '/img/gallery-3.webp', component: 'Gallery' },
    { src: '/img/gallery-4.webp', component: 'Gallery' },
    { src: '/img/gallery-5.webp', component: 'Gallery' },
    { src: '/img/gallery-6.webp', component: 'Gallery' },
    { src: '/img/gallery-7.webp', component: 'Gallery' },
    { src: '/img/gallery-8.webp', component: 'Gallery' },
    { src: '/img/slide-1.webp', component: 'Hero' },
    { src: '/img/slide-2.webp', component: 'Hero' }
  ] : []

  return (
    <>
      <Helmet>
        <title>Güneş Hotel - Nemrut Dağı | Ana Sayfa</title>
        <meta
          name="description"
          content="UNESCO Dünya Mirası Nemrut Dağı'na en yakın otel. Konforlu konaklama, muhteşem manzara ve sıcak misafirperverlik."
        />
        <meta
          name="keywords"
          content="Nemrut Dağı, otel, konaklama, Kahta, Adıyaman, gün doğumu, gün batımı, UNESCO"
        />
        <link rel="canonical" href="https://guneshotel.com/" />
      </Helmet>

      <Hero />
      <About />
      <Rooms />
      <Gallery />
      <Contact />
    </>
  )
}

export default Home