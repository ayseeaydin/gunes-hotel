import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import './AboutPage.scss'

const AboutPage = () => {
  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title>Hakkımızda - Güneş Hotel | Nemrut Dağı</title>
        <meta 
          name="description" 
          content="Güneş Hotel hakkında bilgi edinin. 1980'lerden beri aile işletmesi olarak hizmet veriyoruz." 
        />
        <link rel="canonical" href="https://guneshotel.com/about" />
      </Helmet>

      <div className="about-page">
        {/* Page Header */}
        <section className="page-header">
          <div className="page-header-overlay"></div>
          <Container>
            <div className="page-header-content" data-aos="fade-up">
              <h1>{t('nav.about')}</h1>
              <p className="lead">{t('about.subtitle')}</p>
            </div>
          </Container>
        </section>

        {/* About Content */}
        <section className="section about-content">
          <Container>
            <Row className="align-items-center mb-5">
              <Col lg={6} data-aos="fade-right">
                <div className="about-image">
                  <img 
                    src="/img/motel.webp" 
                    alt="Güneş Hotel" 
                    className="img-fluid rounded shadow"
                  />
                </div>
              </Col>
              <Col lg={6} data-aos="fade-left">
                <div className="about-text">
                  <h2 className="mb-4">{t('about.heading')}</h2>
                  <div className="text-content">
                    {t('about.description').split('\n\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </Col>
            </Row>

            {/* Features */}
            <Row className="mt-5">
              <Col md={6} lg={3} className="mb-4" data-aos="fade-up" data-aos-delay="100">
                <div className="feature-card text-center">
                  <div className="feature-icon">
                    <i className="fas fa-mountain"></i>
                  </div>
                  <h4>2 km Mesafe</h4>
                  <p>Nemrut Dağı'na en yakın otel</p>
                </div>
              </Col>
              <Col md={6} lg={3} className="mb-4" data-aos="fade-up" data-aos-delay="200">
                <div className="feature-card text-center">
                  <div className="feature-icon">
                    <i className="fas fa-home"></i>
                  </div>
                  <h4>Aile İşletmesi</h4>
                  <p>1980'lerden beri hizmetinizdeyiz</p>
                </div>
              </Col>
              <Col md={6} lg={3} className="mb-4" data-aos="fade-up" data-aos-delay="300">
                <div className="feature-card text-center">
                  <div className="feature-icon">
                    <i className="fas fa-heart"></i>
                  </div>
                  <h4>Samimi Ortam</h4>
                  <p>Kendinizi evinizde hissedin</p>
                </div>
              </Col>
              <Col md={6} lg={3} className="mb-4" data-aos="fade-up" data-aos-delay="400">
                <div className="feature-card text-center">
                  <div className="feature-icon">
                    <i className="fas fa-landmark"></i>
                  </div>
                  <h4>Tarihi Mekanlar</h4>
                  <p>Kommagene mirasını keşfedin</p>
                </div>
              </Col>
            </Row>

            {/* Historical Places */}
            <Row className="mt-5">
              <Col lg={12} data-aos="fade-up">
                <div className="section-title text-center mb-5">
                  <h2>Çevredeki Tarihi Yerler</h2>
                  <p>Otelimizden kolayca ulaşabileceğiniz tarihi mekanlar</p>
                </div>
              </Col>
            </Row>

            <Row>
              <Col md={6} lg={4} className="mb-4" data-aos="fade-up">
                <div className="place-card">
                  <div className="place-image">
                    <img src="/img/gallery-10.webp" alt="Nemrut Dağı" className="img-fluid" />
                  </div>
                  <div className="place-content">
                    <h4>Nemrut Dağı</h4>
                    <p>UNESCO Dünya Mirası listesindeki muhteşem tümülüs ve dev heykeller.</p>
                    <span className="distance">
                      <i className="fas fa-map-marker-alt"></i> 2 km
                    </span>
                  </div>
                </div>
              </Col>

              <Col md={6} lg={4} className="mb-4" data-aos="fade-up" data-aos-delay="100">
                <div className="place-card">
                  <div className="place-image">
                    <img src="/img/gallery-4.webp" alt="Karakuş Tümülüsü" className="img-fluid" />
                  </div>
                  <div className="place-content">
                    <h4>Karakuş Tümülüsü</h4>
                    <p>Kommagene Krallığı'ndan kalma tarihi mezar anıtı.</p>
                    <span className="distance">
                      <i className="fas fa-map-marker-alt"></i> 15 km
                    </span>
                  </div>
                </div>
              </Col>

              <Col md={6} lg={4} className="mb-4" data-aos="fade-up" data-aos-delay="200">
                <div className="place-card">
                  <div className="place-image">
                    <img src="/img/gallery-5.webp" alt="Cendere Köprüsü" className="img-fluid" />
                  </div>
                  <div className="place-content">
                    <h4>Cendere Köprüsü</h4>
                    <p>Roma döneminden kalma hala kullanılan antik köprü.</p>
                    <span className="distance">
                      <i className="fas fa-map-marker-alt"></i> 20 km
                    </span>
                  </div>
                </div>
              </Col>

              <Col md={6} lg={4} className="mb-4" data-aos="fade-up" data-aos-delay="300">
                <div className="place-card">
                  <div className="place-image">
                    <img src="/img/gallery-24.webp" alt="Arsemia" className="img-fluid" />
                  </div>
                  <div className="place-content">
                    <h4>Arsemia Ören Yeri</h4>
                    <p>Kommagene Krallığı'nın yaz başkenti kalıntıları.</p>
                    <span className="distance">
                      <i className="fas fa-map-marker-alt"></i> 25 km
                    </span>
                  </div>
                </div>
              </Col>

              <Col md={6} lg={4} className="mb-4" data-aos="fade-up" data-aos-delay="400">
                <div className="place-card">
                  <div className="place-image">
                    <img src="/img/gallery-25.webp" alt="Kahta Kalesi" className="img-fluid" />
                  </div>
                  <div className="place-content">
                    <h4>Kahta Kalesi</h4>
                    <p>Memlük döneminden kalma tarihi kale.</p>
                    <span className="distance">
                      <i className="fas fa-map-marker-alt"></i> 30 km
                    </span>
                  </div>
                </div>
              </Col>

              <Col md={6} lg={4} className="mb-4" data-aos="fade-up" data-aos-delay="500">
                <div className="place-card">
                  <div className="place-image">
                    <img src="/img/gallery-26.webp" alt="Perre" className="img-fluid" />
                  </div>
                  <div className="place-content">
                    <h4>Perre Antik Kenti</h4>
                    <p>Kaya mezarları ve tarihi kalıntılarıyla ünlü antik kent.</p>
                    <span className="distance">
                      <i className="fas fa-map-marker-alt"></i> 50 km
                    </span>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    </>
  )
}

export default AboutPage
