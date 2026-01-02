import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import LanguageSelector from '@components/common/LanguageSelector'
import './Header.scss'

const Header = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = () => {
    setExpanded(false)
  }

  const isActive = (path) => {
    return location.pathname === path ? 'active' : ''
  }

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <Navbar expand="lg" expanded={expanded} onToggle={setExpanded}>
        <Container>
          <Navbar.Brand as={Link} to="/" className="logo">
            <img 
              src="/img/logo.png" 
              alt="Güneş Hotel Logo" 
              className="logo-img"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
            <div className="logo-text">
              <span className="logo-main">GÜNEŞ</span>
              <span className="logo-sub">HOTEL</span>
            </div>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar-nav" />

          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto align-items-lg-center">
              <Nav.Link 
                as={Link} 
                to="/" 
                className={isActive('/')}
                onClick={handleNavClick}
              >
                {t('nav.home')}
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="/about" 
                className={isActive('/about')}
                onClick={handleNavClick}
              >
                {t('nav.about')}
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="/rooms" 
                className={isActive('/rooms')}
                onClick={handleNavClick}
              >
                {t('nav.rooms')}
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="/gallery" 
                className={isActive('/gallery')}
                onClick={handleNavClick}
              >
                {t('nav.gallery')}
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="/contact" 
                className={isActive('/contact')}
                onClick={handleNavClick}
              >
                {t('nav.contact')}
              </Nav.Link>
              
              <div className="nav-divider d-none d-lg-block"></div>
              
              <LanguageSelector />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
