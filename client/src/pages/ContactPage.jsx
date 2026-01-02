import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import './ContactPage.scss'

const ContactPage = () => {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    roomType: '',
    guests: '',
    specialRequests: ''
  })
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState({ show: false, type: '', message: '' })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setAlert({ show: false, type: '', message: '' })

    try {
      const response = await axios.post('/api/reservations', formData)
      
      setAlert({
        show: true,
        type: 'success',
        message: t('contact.form.success')
      })

      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        checkIn: '',
        checkOut: '',
        roomType: '',
        guests: '',
        specialRequests: ''
      })
    } catch (error) {
      setAlert({
        show: true,
        type: 'danger',
        message: t('contact.form.error')
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>İletişim & Rezervasyon - Güneş Hotel | Nemrut Dağı</title>
        <meta 
          name="description" 
          content="Güneş Hotel ile iletişime geçin ve rezervasyon yapın. Telefon, email ve adres bilgilerimiz." 
        />
        <link rel="canonical" href="https://guneshotel.com/contact" />
      </Helmet>

      <div className="contact-page">
        {/* Page Header */}
        <section className="page-header">
          <div className="page-header-overlay"></div>
          <Container>
            <div className="page-header-content" data-aos="fade-up">
              <h1>{t('contact.title')}</h1>
              <p className="lead">{t('contact.subtitle')}</p>
            </div>
          </Container>
        </section>

        {/* Contact Section */}
        <section className="section contact-section">
          <Container>
            <Row>
              {/* Contact Info */}
              <Col lg={4} className="mb-4 mb-lg-0">
                <div className="contact-info" data-aos="fade-right">
                  <div className="info-card">
                    <div className="info-icon">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <h4>{t('contact.address')}</h4>
                    <p>{t('contact.addressText')}</p>
                  </div>

                  <div className="info-card">
                    <div className="info-icon">
                      <i className="fas fa-phone"></i>
                    </div>
                    <h4>{t('contact.phone')}</h4>
                    <p>
                      <a href="tel:+905555555555">+90 555 555 55 55</a>
                    </p>
                  </div>

                  <div className="info-card">
                    <div className="info-icon">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <h4>{t('contact.email')}</h4>
                    <p>
                      <a href="mailto:info@guneshotel.com">info@guneshotel.com</a>
                    </p>
                  </div>

                  <div className="info-card">
                    <div className="info-icon">
                      <i className="fas fa-clock"></i>
                    </div>
                    <h4>{t('contact.workingHours')}</h4>
                    <p>{t('contact.open247')}</p>
                  </div>

                  {/* Social Links */}
                  <div className="social-links">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="https://wa.me/905555555555" target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-whatsapp"></i>
                    </a>
                  </div>
                </div>
              </Col>

              {/* Reservation Form */}
              <Col lg={8}>
                <div className="reservation-form" data-aos="fade-left">
                  <h3 className="form-title">{t('contact.form.title')}</h3>

                  {alert.show && (
                    <Alert variant={alert.type} onClose={() => setAlert({ ...alert, show: false })} dismissible>
                      {alert.message}
                    </Alert>
                  )}

                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>{t('contact.form.fullName')} *</Form.Label>
                          <Form.Control
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            placeholder="Ad Soyad"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>{t('contact.email')} *</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="ornek@email.com"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>{t('contact.phone')} *</Form.Label>
                          <Form.Control
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            placeholder="+90 555 555 55 55"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>{t('contact.form.guests')} *</Form.Label>
                          <Form.Select
                            name="guests"
                            value={formData.guests}
                            onChange={handleChange}
                            required
                          >
                            <option value="">{t('contact.form.selectGuests')}</option>
                            <option value="1">1 Kişi</option>
                            <option value="2">2 Kişi</option>
                            <option value="3">3 Kişi</option>
                            <option value="4">4 Kişi</option>
                            <option value="5">5 Kişi</option>
                            <option value="6+">6+ Kişi</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>{t('contact.form.checkIn')} *</Form.Label>
                          <Form.Control
                            type="date"
                            name="checkIn"
                            value={formData.checkIn}
                            onChange={handleChange}
                            required
                            min={new Date().toISOString().split('T')[0]}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>{t('contact.form.checkOut')} *</Form.Label>
                          <Form.Control
                            type="date"
                            name="checkOut"
                            value={formData.checkOut}
                            onChange={handleChange}
                            required
                            min={formData.checkIn || new Date().toISOString().split('T')[0]}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label>{t('contact.form.roomType')} *</Form.Label>
                      <Form.Select
                        name="roomType"
                        value={formData.roomType}
                        onChange={handleChange}
                        required
                      >
                        <option value="">{t('contact.form.selectRoom')}</option>
                        <option value="double">Standart 2 Kişilik Oda</option>
                        <option value="twin">Çift Kişilik Oda</option>
                        <option value="triple">3 Kişilik Oda</option>
                        <option value="family">5 Kişilik Aile Odası</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>{t('contact.form.specialRequests')}</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleChange}
                        placeholder="Özel isteklerinizi buraya yazabilirsiniz..."
                      />
                    </Form.Group>

                    <Button 
                      type="submit" 
                      className="btn-submit"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          {t('contact.form.sending')}
                        </>
                      ) : (
                        t('contact.form.submit')
                      )}
                    </Button>
                  </Form>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Map Section */}
        <section className="map-section">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d38.7414!3d37.9808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDU4JzUxLjAiTiAzOMKwNDQnMjkuMCJF!5e0!3m2!1str!2str!4v1234567890"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Güneş Hotel Konum"
          ></iframe>
        </section>
      </div>
    </>
  )
}

export default ContactPage
