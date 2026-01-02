import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import './Footer.scss'

const Footer = () => {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <Container>
        <Row className="footer-content">
          {/* About Section */}
          <Col lg={4} md={6} className="footer-section mb-4 mb-lg-0">
            <div className="footer-logo">
              <div className="logo-text">
                <span className="logo-main">GÜNEŞ</span>
                <span className="logo-sub">HOTEL</span>
              </div>
            </div>
            <p className="footer-description">
              {t('footer.description')}
            </p>
            <div className="social-links">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a 
                href="https://tripadvisor.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="TripAdvisor"
              >
                <i className="fab fa-tripadvisor"></i>
              </a>
            </div>
          </Col>

          {/* Quick Links */}
          <Col lg={2} md={6} className="footer-section mb-4 mb-lg-0">
            <h5 className="footer-title">{t('footer.quickLinks')}</h5>
            <ul className="footer-links">
              <li><Link to="/">{t('nav.home')}</Link></li>
              <li><Link to="/about">{t('nav.about')}</Link></li>
              <li><Link to="/rooms">{t('nav.rooms')}</Link></li>
              <li><Link to="/gallery">{t('nav.gallery')}</Link></li>
              <li><Link to="/contact">{t('nav.contact')}</Link></li>
            </ul>
          </Col>

          {/* Services */}
          <Col lg={3} md={6} className="footer-section mb-4 mb-lg-0">
            <h5 className="footer-title">{t('footer.services')}</h5>
            <ul className="footer-links">
              <li>
                <i className="fas fa-wifi"></i>
                {t('footer.service1')}
              </li>
              <li>
                <i className="fas fa-tint"></i>
                {t('footer.service2')}
              </li>
              <li>
                <i className="fas fa-mountain"></i>
                {t('footer.service3')}
              </li>
              <li>
                <i className="fas fa-coffee"></i>
                {t('footer.service4')}
              </li>
            </ul>
          </Col>

          {/* Contact Info */}
          <Col lg={3} md={6} className="footer-section">
            <h5 className="footer-title">{t('footer.contactInfo')}</h5>
            <ul className="footer-contact">
              <li>
                <i className="fas fa-map-marker-alt"></i>
                <span>Karadut Köyü, Nemrut Dağı Yolu<br />Kahta/Adıyaman</span>
              </li>
              <li>
                <i className="fas fa-phone"></i>
                <a href="tel:+905555555555">+90 555 555 55 55</a>
              </li>
              <li>
                <i className="fas fa-envelope"></i>
                <a href="mailto:info@guneshotel.com">info@guneshotel.com</a>
              </li>
            </ul>
          </Col>
        </Row>

        <div className="footer-bottom">
          <p className="copyright">
            {t('footer.copyright').replace('2024', currentYear)}
          </p>
          <div className="footer-bottom-links">
            <Link to="/privacy">Gizlilik Politikası</Link>
            <span className="separator">|</span>
            <Link to="/terms">Kullanım Koşulları</Link>
          </div>
        </div>
      </Container>

      {/* Font Awesome CDN */}
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
      />
    </footer>
  )
}

export default Footer
