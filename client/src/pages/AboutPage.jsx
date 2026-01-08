import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import StructuredData from '@components/common/StructuredData'
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
        <link rel="canonical" href="https://www.nemrutgunesmotel.com/about" />
      </Helmet>
      <StructuredData type="hotel" page="about" />

      <div className="about-page">
        {/* Page Header */}
        <section className="page-header">
          <div className="page-header-overlay"></div>
          <Container>
            <div className="page-header-content">
              <h1>{t('nav.about')}</h1>
              <p className="lead">{t('about.subtitle')}</p>
            </div>
          </Container>
        </section>

        {/* About Content */}
        <section className="section about-content">
          <Container>
            <Row className="align-items-center mb-5">
              <Col lg={6}>
                <div className="about-image">
                  <img 
                    src="/img/motel.webp" 
                    alt="Güneş Hotel" 
                    className="img-fluid rounded shadow"
                  />
                </div>
              </Col>
              <Col lg={6}>
                <div className="about-text">
                  <h2 className="mb-4">{t('about.heading')}</h2>
                  <div className="text-content">
                    {t('about.detailedDescription').split('\n\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </Col>
            </Row>

            {/* Features */}
            <Row className="mt-5">
              <Col md={6} lg={3} className="mb-4" data-aos-delay="100">
                <div className="feature-card text-center">
                  <div className="feature-icon">
                    <i className="fas fa-mountain"></i>
                  </div>
                  <h4>2 km Mesafe</h4>
                  <p>Nemrut Dağı'na en yakın otel</p>
                </div>
              </Col>
              <Col md={6} lg={3} className="mb-4" data-aos-delay="200">
                <div className="feature-card text-center">
                  <div className="feature-icon">
                    <i className="fas fa-home"></i>
                  </div>
                  <h4>Aile İşletmesi</h4>
                  <p>1980'lerden beri hizmetinizdeyiz</p>
                </div>
              </Col>
              <Col md={6} lg={3} className="mb-4" data-aos-delay="300">
                <div className="feature-card text-center">
                  <div className="feature-icon">
                    <i className="fas fa-heart"></i>
                  </div>
                  <h4>Samimi Ortam</h4>
                  <p>Kendinizi evinizde hissedin</p>
                </div>
              </Col>
              <Col md={6} lg={3} className="mb-4" data-aos-delay="400">
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
              <Col lg={12}>
                <div className="section-title text-center mb-5">
                  <h2>Çevredeki Tarihi Yerler</h2>
                  <p>Otelimizden kolayca ulaşabileceğiniz tarihi mekanlar</p>
                </div>
              </Col>
            </Row>

            <Row>
              <Col md={6} lg={4} className="mb-4">
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

              <Col md={6} lg={4} className="mb-4" data-aos-delay="100">
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

              <Col md={6} lg={4} className="mb-4" data-aos-delay="200">
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

              <Col md={6} lg={4} className="mb-4" data-aos-delay="300">
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

              <Col md={6} lg={4} className="mb-4" data-aos-delay="400">
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

              <Col md={6} lg={4} className="mb-4" data-aos-delay="500">
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
              
                <Col md={6} lg={4} className="mb-4" data-aos-delay="600">
                  <div className="place-card">
                    <div className="place-image">
                      <img src="/img/gallery-27.webp" alt="Somuncu Baba Külliyesi" className="img-fluid" />
                    </div>
                    <div className="place-content">
                      <h4>Somuncu Baba Külliyesi (Darende)</h4>
                      <p>Somuncu Baba'ya ait külliye; camisi, türbesi ve huzurlu çevresiyle manevi bir ziyaret noktasıdır.</p>
                      <span className="distance">
                        <i className="fas fa-map-marker-alt"></i> 80 km
                      </span>
                    </div>
                  </div>
                </Col>

                <Col md={6} lg={4} className="mb-4" data-aos-delay="700">
                  <div className="place-card">
                    <div className="place-image">
                      <img src="/img/gallery-28.webp" alt="Günpınar Şelalesi" className="img-fluid" />
                    </div>
                    <div className="place-content">
                      <h4>Günpınar (Gürpınar) Şelalesi</h4>
                      <p>Turkuaz rengi suları ve doğal yapısıyla fotoğraf ve doğa yürüyüşleri için ideal şelale.</p>
                      <span className="distance">
                        <i className="fas fa-map-marker-alt"></i> 85 km
                      </span>
                    </div>
                  </div>
                </Col>

                <Col md={6} lg={4} className="mb-4" data-aos-delay="800">
                  <div className="place-card">
                    <div className="place-image">
                      <img src="/img/gallery-29.webp" alt="Tohma Kanyonu" className="img-fluid" />
                    </div>
                    <div className="place-content">
                      <h4>Tohma Kanyonu</h4>
                      <p>Dik kayalıkları ve yürüyüş rotalarıyla doğaseverlerin ilgisini çeken kanyon.</p>
                      <span className="distance">
                        <i className="fas fa-map-marker-alt"></i> 85 km
                      </span>
                    </div>
                  </div>
                </Col>

                <Col md={6} lg={4} className="mb-4" data-aos-delay="900">
                  <div className="place-card">
                    <div className="place-image">
                      <img src="/img/gallery-30.webp" alt="Levent Vadisi" className="img-fluid" />
                    </div>
                    <div className="place-content">
                      <h4>Levent Vadisi</h4>
                      <p>Kanyon manzaraları, yürüyüş rotaları ve gün batımı seyir teraslarıyla ünlü doğal alan.</p>
                      <span className="distance">
                        <i className="fas fa-map-marker-alt"></i> 95 km
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
