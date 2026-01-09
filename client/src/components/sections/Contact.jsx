import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { useErrorHandler } from '@hooks'
import { contactAPI } from '@services/api'
import { validationRules } from '@utils/formValidation'
import './Contact.scss'

const Contact = () => {
  const { t } = useTranslation()
  const { handleSuccess, withErrorHandling } = useErrorHandler()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      message: ''
    }
  })

  const onSubmit = async (data) => {
    const { success } = await withErrorHandling(
      () => contactAPI.send(data),
      t('contact.quickContact.error')
    )

    if (success) {
      handleSuccess(t('contact.quickContact.success'))
      reset()
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

              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="text"
                        {...register('fullName', validationRules.fullName)}
                        placeholder={t('contact.quickContact.fullNamePlaceholder')}
                        isInvalid={!!errors.fullName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.fullName?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="email"
                        {...register('email', validationRules.email)}
                        placeholder={t('contact.quickContact.emailPlaceholder')}
                        isInvalid={!!errors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Control
                    type="tel"
                    {...register('phone', validationRules.phone)}
                    placeholder={t('contact.quickContact.phonePlaceholder')}
                    isInvalid={!!errors.phone}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phone?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Control
                    as="textarea"
                    rows={4}
                    {...register('message', validationRules.message)}
                    placeholder={t('contact.quickContact.messagePlaceholder')}
                    isInvalid={!!errors.message}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.message?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="form-actions">
                  <Button 
                    type="submit" 
                    className="btn-submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
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
