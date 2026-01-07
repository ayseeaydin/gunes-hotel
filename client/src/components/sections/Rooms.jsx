import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Badge } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import './Rooms.scss'

const Rooms = () => {
  const { t } = useTranslation()
  const [imageErrors, setImageErrors] = useState({})

  const rooms = [
    {
      id: 1,
      name: t('rooms.double'),
      description: t('rooms.doubleDesc'),
      image: '/img/double-room-1.webp',
      guests: 2,
      price: '1.500',
      features: [
        { icon: 'fa-users', text: `2 ${t('rooms.features.guests')}` },
        { icon: 'fa-tint', text: t('rooms.features.hotWater') },
        { icon: 'fa-mountain', text: t('rooms.features.mountainView') },
        { icon: 'fa-coffee', text: t('rooms.features.teaCoffee') }
      ],
      popular: false
    },
    {
      id: 2,
      name: t('rooms.twin'),
      description: t('rooms.twinDesc'),
      image: '/img/twin-room-1.webp',
      guests: 2,
      price: '1.500',
      features: [
        { icon: 'fa-users', text: `2 ${t('rooms.features.guests')}` },
        { icon: 'fa-tint', text: t('rooms.features.hotWater') },
        { icon: 'fa-mountain', text: t('rooms.features.mountainView') },
        { icon: 'fa-coffee', text: t('rooms.features.teaCoffee') }
      ],
      popular: true
    },
    {
      id: 3,
      name: t('rooms.triple'),
      description: t('rooms.tripleDesc'),
      image: '/img/triple-room.webp',
      guests: 3,
      price: '2.000',
      features: [
        { icon: 'fa-users', text: `3 ${t('rooms.features.guests')}` },
        { icon: 'fa-tint', text: t('rooms.features.hotWater') },
        { icon: 'fa-mountain', text: t('rooms.features.mountainView') },
        { icon: 'fa-coffee', text: t('rooms.features.teaCoffee') }
      ],
      popular: false
    },
    {
      id: 4,
      name: t('rooms.family'),
      description: t('rooms.familyDesc'),
      image: '/img/family-room.webp',
      guests: 5,
      price: '3.000',
      features: [
        { icon: 'fa-users', text: `5 ${t('rooms.features.guests')}` },
        { icon: 'fa-tint', text: t('rooms.features.hotWater') },
        { icon: 'fa-mountain', text: t('rooms.features.mountainView') },
        { icon: 'fa-coffee', text: t('rooms.features.teaCoffee') }
      ],
      popular: false,
      familyFriendly: true
    }
  ]

  const handleImageError = (roomId, e) => {
    setImageErrors(prev => ({ ...prev, [roomId]: true }))
    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="400"%3E%3Crect fill="%23f0f0f0" width="600" height="400"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="18"%3EOda Görseli%3C/text%3E%3C/svg%3E'
  }

  return (
    <section id="rooms" className="section rooms-section" aria-labelledby="rooms-heading">
      <Container>
        <div className="section-title" data-aos="fade-up">
          <h2 id="rooms-heading">{t('rooms.title')}</h2>
          <p>{t('rooms.subtitle')}</p>
        </div>

        <Row>
          {rooms.map((room, index) => (
            <Col 
              key={room.id} 
              lg={6} 
              className="mb-4"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <article className="room-card" itemScope itemType="https://schema.org/HotelRoom">
                {room.popular && (
                  <Badge bg="warning" className="room-badge popular-badge">
                    <i className="fas fa-star" aria-hidden="true"></i> {t('rooms.popular')}
                  </Badge>
                )}
                {room.familyFriendly && (
                  <Badge bg="success" className="room-badge family-badge">
                    <i className="fas fa-home" aria-hidden="true"></i> {t('rooms.familyFriendly')}
                  </Badge>
                )}

                <div className="room-image">
                  <img 
                    src={room.image}
                    alt={`${room.name} - ${room.description}`}
                    className="img-fluid"
                    loading="lazy"
                    width="600"
                    height="400"
                    decoding="async"
                    importance="low"
                    onError={(e) => handleImageError(room.id, e)}
                  />
                  {imageErrors[room.id] && (
                    <div className="image-error-overlay">
                      <p>Oda görseli yüklenemedi</p>
                    </div>
                  )}
                  <div className="room-overlay">
                    <Link 
                      to="/rooms" 
                      className="btn btn-light"
                      aria-label={`${room.name} detaylarını görüntüle`}
                    >
                      {t('rooms.viewDetails')}
                    </Link>
                  </div>
                </div>

                <div className="room-content">
                  <h3 itemProp="name">{room.name}</h3>
                  <p className="room-description" itemProp="description">{room.description}</p>

                  <div className="room-features" role="list">
                    {room.features.map((feature, idx) => (
                      <div key={idx} className="feature" role="listitem">
                        <i className={`fas ${feature.icon}`} aria-hidden="true"></i>
                        <span>{feature.text}</span>
                      </div>
                    ))}
                  </div>

                  <div className="room-footer">
                    <div className="room-price" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                      <span className="price-label">{t('rooms.startingFrom')}</span>
                      <span className="price-amount" itemProp="price" content={room.price}>₺{room.price}</span>
                      <meta itemProp="priceCurrency" content="TRY" />
                      <span className="price-period">/ {t('rooms.perNight')}</span>
                    </div>
                    <Link 
                      to="/contact" 
                      className="btn btn-primary"
                      aria-label={`${room.name} için rezervasyon yap`}
                    >
                      {t('hero.reservation')}
                    </Link>
                  </div>
                </div>
              </article>
            </Col>
          ))}
        </Row>

        <div className="text-center mt-4" data-aos="fade-up">
          <Link 
            to="/rooms" 
            className="btn btn-outline btn-lg"
            aria-label="Tüm odaları görüntüle"
          >
            {t('rooms.viewAll')}
          </Link>
        </div>
      </Container>
    </section>
  )
}

export default Rooms