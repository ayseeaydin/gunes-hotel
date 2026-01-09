import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { reservationAPI } from '@services/api'
import StructuredData from '@components/common/StructuredData'
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
        await reservationAPI.create(formData)
      
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
        <link rel="canonical" href="https://www.nemrutgunesmotel.com/contact" />
      </Helmet>
      <StructuredData type="hotel" page="contact" />

      <div className="contact-page">
        {/* Page Header */}
        <section className="page-header">
          <div className="page-header-overlay"></div>
          <Container>
            <div className="page-header-content">
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
                <div className="contact-info">
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
                      <a href="tel:+905438767271">+90 543 876 7271</a><br/>
                      <a href="tel:+905362870639">+90 536 287 0639</a>
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
                    <a href="https://www.instagram.com/mount_nemrut_tour?igsh=MTBsZDJmN3Zva24xZA==" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </div>
                </div>
              </Col>

              {/* Reservation Form */}
              <Col lg={8}>
                <div className="reservation-form">
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
                            placeholder={t('contact.form.fullNamePlaceholder')}
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
                            placeholder={t('contact.form.emailPlaceholder')}
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
                            placeholder={t('contact.form.phonePlaceholder')}
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
                            <option value="1">{t('contact.form.guestOptions.1')}</option>
                            <option value="2">{t('contact.form.guestOptions.2')}</option>
                            <option value="3">{t('contact.form.guestOptions.3')}</option>
                            <option value="4">{t('contact.form.guestOptions.4')}</option>
                            <option value="5">{t('contact.form.guestOptions.5')}</option>
                            <option value="6+">{t('contact.form.guestOptions.6plus')}</option>
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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23107.224466176427!2d38.74809860815096!3d37.991781659336155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4075fee789c631c5%3A0xc60c5c6d8b427183!2zR8O8bmXFnyBNb3RlbA!5e0!3m2!1str!2str!4v1767785234481!5m2!1str!2str"
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
