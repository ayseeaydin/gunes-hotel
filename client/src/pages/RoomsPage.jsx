import React, { useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { Container, Row, Col, Badge } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { getRoomsData } from '@data/rooms'
import StructuredData from '@components/common/StructuredData'
import './RoomsPage.scss'

const RoomsPage = () => {
  const { t } = useTranslation()

  const rooms = useMemo(() => {
    return getRoomsData(t).map(room => ({
      ...room,
      name: t(room.nameKey),
      description: t(room.descKey),
      features: room.features.map(feature => 
        feature.text || t(feature.textKey)
      )
    }))
  }, [t])

  return (
    <>
      <Helmet>
        <title>Odalarımız - Güneş Hotel | Nemrut Dağı</title>
        <meta 
          name="description" 
          content="Konforlu ve modern donanımlı odalarımızı keşfedin. Dağ manzaralı, sıcak sulu odalar." 
        />
        <link rel="canonical" href="https://www.nemrutgunesmotel.com/rooms" />
      </Helmet>
      <StructuredData type="hotel" page="rooms" />

      <div className="rooms-page">
        {/* Page Header */}
        <section className="page-header">
          <div className="page-header-overlay"></div>
          <Container>
            <div className="page-header-content">
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
                        <h5>{t('rooms.featuresLabel')}</h5>
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
            <div className="cta-content text-center">
              <h2>{t('rooms.cta.title')}</h2>
              <p>{t('rooms.cta.description')}</p>
              <Link to="/contact" className="btn btn-light btn-lg">
                {t('rooms.cta.button')}
              </Link>
            </div>
          </Container>
        </section>
      </div>
    </>
  )
}

export default RoomsPage
