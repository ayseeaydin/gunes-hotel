import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import './NotFound.scss'

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 - Sayfa Bulunamadı | Güneş Hotel</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="not-found-page">
        <Container>
          <div className="not-found-content">
            <div className="error-code" data-aos="zoom-in">404</div>
            <h1 data-aos="fade-up" data-aos-delay="100">Sayfa Bulunamadı</h1>
            <p data-aos="fade-up" data-aos-delay="200">
              Aradığınız sayfa mevcut değil veya taşınmış olabilir.
            </p>
            <div className="not-found-actions" data-aos="fade-up" data-aos-delay="300">
              <Link to="/" className="btn btn-primary">
                <i className="fas fa-home"></i> Ana Sayfaya Dön
              </Link>
              <Link to="/contact" className="btn btn-outline">
                <i className="fas fa-envelope"></i> İletişime Geç
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}

export default NotFound
