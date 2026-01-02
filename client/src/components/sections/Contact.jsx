import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import './Contact.scss'

const Contact = () => {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
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
      const response = await axios.post('/api/contact', formData)
      
      setAlert({
        show: true,
        type: 'success',
        message: 'Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapılacaktır.'
      })

      setFormData({
        fullName: '',
        email: '',
        phone: '',
        message: ''
      })
    } catch (error) {
      setAlert({
        show: true,
        type: 'danger',
        message: 'Bir hata oluştu. Lütfen tekrar deneyin.'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="section contact-section">
      <Container>
        <div className="section-title" data-aos="fade-up">
          <h2>{t('contact.title')}</h2>
          <p>{t('contact.subtitle')}</p>
        </div>

        <Row>
          {/* Contact Info Cards */}
          <Col lg={4} className="mb-4" data-aos="fade-right">
            <div className="contact-info-card">
              <div className="info-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <h4>{t('contact.address')}</h4>
              <p>{t('contact.addressText')}</p>
            </div>
          </Col>

          <Col lg={4} className="mb-4" data-aos="fade-up">
            <div className="contact-info-card">
              <div className="info-icon">
                <i className="fas fa-phone"></i>
              </div>
              <h4>{t('contact.phone')}</h4>
              <p>
                <a href="tel:+905555555555">+90 555 555 55 55</a>
              </p>
            </div>
          </Col>

          <Col lg={4} className="mb-4" data-aos="fade-left">
            <div className="contact-info-card">
              <div className="info-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <h4>{t('contact.email')}</h4>
              <p>
                <a href="mailto:info@guneshotel.com">info@guneshotel.com</a>
              </p>
            </div>
          </Col>
        </Row>

        {/* Quick Contact Form */}
        <Row className="mt-5">
          <Col lg={8} className="mx-auto" data-aos="fade-up">
            <div className="quick-contact-form">
              <h3>Hızlı İletişim</h3>
              <p className="text-muted mb-4">
                Sorularınız için bize mesaj gönderin veya detaylı rezervasyon için sayfamızı ziyaret edin.
              </p>

              {alert.show && (
                <Alert variant={alert.type} onClose={() => setAlert({ ...alert, show: false })} dismissible>
                  {alert.message}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Ad Soyad *"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="E-posta *"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Telefon *"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Mesajınız *"
                    required
                  />
                </Form.Group>

                <div className="form-actions">
                  <Button 
                    type="submit" 
                    className="btn-submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Gönderiliyor...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane me-2"></i>
                        Mesaj Gönder
                      </>
                    )}
                  </Button>

                  <Link to="/contact" className="btn btn-outline ms-3">
                    <i className="fas fa-calendar-alt me-2"></i>
                    Rezervasyon Yap
                  </Link>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Contact
