import React from 'react'
import PropTypes from 'prop-types'
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

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
