import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Container, Row, Col, Badge } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import './RoomsPage.scss'

const RoomsPage = () => {
  const { t } = useTranslation()

  const rooms = [
    {
      id: 1,
      name: t('rooms.double'),
      description: t('rooms.doubleDesc'),
      image: '/img/double-room-1.jpg',
      images: ['/img/double-room-1.jpg', '/img/double-room-2.jpg', '/img/double-room-3.jpeg'],
      guests: 2,
      beds: '1 Çift Kişilik Yatak',
      price: '1.500',
      features: ['24s Sıcak Su', 'Dağ Manzarası', 'Çay/Kahve', 'WiFi'],
      popular: false
    },
    {
      id: 2,
      name: t('rooms.twin'),
      description: t('rooms.twinDesc'),
      image: '/img/twin-room-1.JPG',
      images: ['/img/twin-room-1.JPG', '/img/twin-room-2.JPG', '/img/twin-room-3.JPG'],
      guests: 2,
      beds: '2 Tek Kişilik Yatak',
      price: '1.500',
      features: ['24s Sıcak Su', 'Dağ Manzarası', 'Çay/Kahve', 'WiFi'],
      popular: true
    },
    {
      id: 3,
      name: t('rooms.triple'),
      description: t('rooms.tripleDesc'),
      image: '/img/triple-room.JPG',
      images: ['/img/triple-room.JPG', '/img/triple-room-1.jpeg', '/img/triple-room-2.jpeg'],
      guests: 3,
      beds: '3 Tek Kişilik Yatak',
      price: '2.000',
      features: ['24s Sıcak Su', 'Dağ Manzarası', 'Çay/Kahve', 'WiFi'],
      popular: false
    },
    {
      id: 4,
      name: t('rooms.family'),
      description: t('rooms.familyDesc'),
      image: '/img/gallery-27.jpeg',
      images: ['/img/gallery-27.jpeg', '/img/gallery-28.jpeg', '/img/gallery-29.jpeg'],
      guests: 5,
      beds: '1 Çift + 3 Tek Kişilik Yatak',
      price: '3.000',
      features: ['24s Sıcak Su', 'Dağ Manzarası', 'Çay/Kahve', 'WiFi', 'Geniş Alan'],
      popular: false,
      familyFriendly: true
    }
  ]

  return (
    <>
      <Helmet>
        <title>Odalarımız - Güneş Hotel | Nemrut Dağı</title>
        <meta 
          name="description" 
          content="Konforlu ve modern donanımlı odalarımızı keşfedin. Dağ manzaralı, sıcak sulu odalar." 
        />
        <link rel="canonical" href="https://guneshotel.com/rooms" />
      </Helmet>

      <div className="rooms-page">
        {/* Page Header */}
        <section className="page-header">
          <div className="page-header-overlay"></div>
          <Container>
            <div className="page-header-content" data-aos="fade-up">
              <h1>{t('rooms.title')}</h1>
              <p className="lead">{t('rooms.subtitle')}</p>
            </div>
          </Container>
        </section>

        {/* Rooms List */}
        <section className="section rooms-list">
          <Container>
            {rooms.map((room, index) => (
              <div 
                key={room.id} 
                className="room-item"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <Row className="align-items-center">
                  <Col lg={5}>
                    <div className="room-image-wrapper">
                      <img 
                        src={room.image} 
                        alt={room.name} 
                        className="img-fluid room-image"
                      />
                      {room.popular && (
                        <Badge bg="warning" className="room-badge">
                          {t('rooms.popular')}
                        </Badge>
                      )}
                      {room.familyFriendly && (
                        <Badge bg="success" className="room-badge">
                          {t('rooms.familyFriendly')}
                        </Badge>
                      )}
                    </div>
                  </Col>
                  <Col lg={7}>
                    <div className="room-details">
                      <h2>{room.name}</h2>
                      <p className="room-description">{room.description}</p>

                      <div className="room-info">
                        <div className="info-item">
                          <i className="fas fa-users"></i>
                          <span>{room.guests} {t('rooms.features.guests')}</span>
                        </div>
                        <div className="info-item">
                          <i className="fas fa-bed"></i>
                          <span>{room.beds}</span>
                        </div>
                      </div>

                      <div className="room-features">
                        <h5>Özellikler:</h5>
                        <ul>
                          {room.features.map((feature, idx) => (
                            <li key={idx}>
                              <i className="fas fa-check-circle"></i>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="room-footer">
                        <div className="room-price">
                          <span className="price-amount">₺{room.price}</span>
                          <span className="price-period">/ {t('rooms.perNight')}</span>
                        </div>
                        <Link to="/contact" className="btn btn-primary">
                          {t('hero.reservation')}
                        </Link>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            ))}
          </Container>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <Container>
            <div className="cta-content text-center" data-aos="zoom-in">
              <h2>Rezervasyon Yapmak İster misiniz?</h2>
              <p>Nemrut Dağı'nın büyüleyici atmosferinde unutulmaz bir konaklama deneyimi için bize ulaşın.</p>
              <Link to="/contact" className="btn btn-light btn-lg">
                İletişime Geçin
              </Link>
            </div>
          </Container>
        </section>
      </div>
    </>
  )
}

export default RoomsPage
