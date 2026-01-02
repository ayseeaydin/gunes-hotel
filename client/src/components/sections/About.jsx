import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import './About.scss'

const About = () => {
  const { t } = useTranslation()

  return (
    <section id="about" className="section about-section">
      <Container>
        <div className="section-title" data-aos="fade-up">
          <h2>{t('about.title')}</h2>
          <p>{t('about.subtitle')}</p>
        </div>

        <Row className="align-items-center">
          <Col lg={6} className="mb-4 mb-lg-0" data-aos="fade-right">
            <div className="about-image-wrapper">
              <img 
                src="/img/motel.jpg" 
                alt="Güneş Hotel" 
                className="img-fluid about-image"
              />
              <div className="about-badge">
                <div className="badge-content">
                  <i className="fas fa-mountain"></i>
                  <span className="badge-number">2</span>
                  <span className="badge-text">km</span>
                  <span className="badge-desc">Nemrut'a Mesafe</span>
                </div>
              </div>
            </div>
          </Col>

          <Col lg={6} data-aos="fade-left">
            <div className="about-content">
              <h3>{t('about.heading')}</h3>
              <div className="about-text">
                {t('about.description').split('\n\n').slice(0, 2).map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <div className="about-features">
                <div className="feature-item">
                  <div className="feature-icon">
                    <i className="fas fa-home"></i>
                  </div>
                  <div className="feature-text">
                    <h5>Aile İşletmesi</h5>
                    <p>1980'lerden beri</p>
                  </div>
                </div>

                <div className="feature-item">
                  <div className="feature-icon">
                    <i className="fas fa-heart"></i>
                  </div>
                  <div className="feature-text">
                    <h5>Samimi Ortam</h5>
                    <p>Sıcak misafirperverlik</p>
                  </div>
                </div>

                <div className="feature-item">
                  <div className="feature-icon">
                    <i className="fas fa-star"></i>
                  </div>
                  <div className="feature-text">
                    <h5>Eşsiz Konum</h5>
                    <p>Nemrut'a en yakın</p>
                  </div>
                </div>
              </div>

              <Link to="/about" className="btn btn-primary">
                Daha Fazla Bilgi
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default About
