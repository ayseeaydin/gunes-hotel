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
      await axios.post('/api/contact', formData)
      
      setAlert({
        show: true,
        type: 'success',
        message: t('contact.quickContact.success')
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
        message: t('contact.quickContact.error')
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="section contact-section">
      <Container>
        <div className="section-title">
          <h2>{t('contact.title')}</h2>
          <p>{t('contact.subtitle')}</p>
        </div>

        <Row>
          {/* Contact Info Cards */}
          <Col lg={4} className="mb-4">
            <div className="contact-info-card">
              <div className="info-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <h4>{t('contact.address')}</h4>
              <p>{t('contact.addressText')}</p>
            </div>
          </Col>

          <Col lg={4} className="mb-4">
            <div className="contact-info-card">
              <div className="info-icon">
                <i className="fas fa-phone"></i>
              </div>
              <h4>{t('contact.phone')}</h4>
              <p>
                <a href="tel:+905438767271">+90 543 876 7271</a><br/>
                <a href="tel:+905362870639">+90 536 287 0639</a>
              </p>
            </div>
          </Col>

          <Col lg={4} className="mb-4">
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
          <Col lg={8} className="mx-auto">
            <div className="quick-contact-form">
              <h3>{t('contact.quickContact.title')}</h3>
              <p className="text-muted mb-4">
                {t('contact.quickContact.description')}
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
                        placeholder={t('contact.quickContact.fullNamePlaceholder')}
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
                        placeholder={t('contact.quickContact.emailPlaceholder')}
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
                    placeholder={t('contact.quickContact.phonePlaceholder')}
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
                    placeholder={t('contact.quickContact.messagePlaceholder')}
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
                        {t('contact.quickContact.sending')}
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane me-2"></i>
                        {t('contact.quickContact.send')}
                      </>
                    )}
                  </Button>

                  <Link to="/contact" className="btn btn-outline ms-3">
                    <i className="fas fa-calendar-alt me-2"></i>
                    {t('contact.quickContact.makeReservation')}
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
