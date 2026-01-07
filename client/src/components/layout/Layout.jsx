import React from 'react'
import Header from './Header'
import Footer from './Footer'
import ScrollToTop from '@components/common/ScrollToTop'
import WhatsAppButton from '@components/common/WhatsAppButton'

const Layout = ({ children }) => {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Ana içeriğe geç
      </a>
      <Header />
      <main id="main-content">
        {children}
      </main>
      <Footer />
      <ScrollToTop />
      <WhatsAppButton />
    </>
  )
}

export default Layout
