import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import Hero from '@components/sections/Hero'
import About from '@components/sections/About'
import Rooms from '@components/sections/Rooms'
import Gallery from '@components/sections/Gallery'
import Contact from '@components/sections/Contact'
import StructuredData from '@components/common/StructuredData'

const Home = () => {
  const { t } = useTranslation()

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
        <link rel="canonical" href="https://www.nemrutgunesmotel.com/" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
      </Helmet>
      <StructuredData type="hotel" page="home" />

      <Hero />
      <About />
      <Rooms />
      <Gallery />
      <Contact />
    </>
  )
}

export default Home