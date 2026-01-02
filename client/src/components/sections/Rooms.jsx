import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Badge } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import './Rooms.scss'

const Rooms = () => {
  const { t } = useTranslation()

  const rooms = [
    {
      id: 1,
      name: t('rooms.double'),
      description: t('rooms.doubleDesc'),
      image: '/img/double-room-1.jpg',
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
      image: '/img/twin-room-1.JPG',
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
      image: '/img/triple-room.JPG',
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
      image: '/img/gallery-27.jpeg',
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

  return (
    <section id="rooms" className="section rooms-section">
      <Container>
        <div className="section-title" data-aos="fade-up">
          <h2>{t('rooms.title')}</h2>
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
              <div className="room-card">
                {room.popular && (
                  <Badge bg="warning" className="room-badge popular-badge">
                    <i className="fas fa-star"></i> {t('rooms.popular')}
                  </Badge>
                )}
                {room.familyFriendly && (
                  <Badge bg="success" className="room-badge family-badge">
                    <i className="fas fa-home"></i> {t('rooms.familyFriendly')}
                  </Badge>
                )}

                <div className="room-image">
                  <img src={room.image} alt={room.name} />
                  <div className="room-overlay">
                    <Link to="/rooms" className="btn btn-light">
                      Detayları Gör
                    </Link>
                  </div>
                </div>

                <div className="room-content">
                  <h3>{room.name}</h3>
                  <p className="room-description">{room.description}</p>

                  <div className="room-features">
                    {room.features.map((feature, idx) => (
                      <div key={idx} className="feature">
                        <i className={`fas ${feature.icon}`}></i>
                        <span>{feature.text}</span>
                      </div>
                    ))}
                  </div>

                  <div className="room-footer">
                    <div className="room-price">
                      <span className="price-label">Başlangıç</span>
                      <span className="price-amount">₺{room.price}</span>
                      <span className="price-period">/ {t('rooms.perNight')}</span>
                    </div>
                    <Link to="/contact" className="btn btn-primary">
                      {t('hero.reservation')}
                    </Link>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        <div className="text-center mt-4" data-aos="fade-up">
          <Link to="/rooms" className="btn btn-outline btn-lg">
            Tüm Odaları Görüntüle
          </Link>
        </div>
      </Container>
    </section>
  )
}

export default Rooms
