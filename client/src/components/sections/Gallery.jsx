import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import './Gallery.scss'

const Gallery = () => {
  const { t } = useTranslation()
  const [showModal, setShowModal] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)
  const [imageErrors, setImageErrors] = useState({})

  const galleryImages = [
    { src: '/img/gallery-1.JPG', alt: 'Otel Dış Görünüm' },
    { src: '/img/gallery-2.JPG', alt: 'Resepsiyon Alanı' },
    { src: '/img/gallery-3.JPG', alt: 'Restoran' },
    { src: '/img/gallery-4.JPG', alt: 'Nemrut Dağı Manzarası' },
    { src: '/img/gallery-5.JPG', alt: 'Gün Doğumu' },
    { src: '/img/gallery-6.jpeg', alt: 'Çevre Manzarası' },
    { src: '/img/gallery-7.jpeg', alt: 'Oda İç Görünüm' },
    { src: '/img/gallery-8.JPG', alt: 'Gün Batımı' }
  ]

  const handleImageError = (index, e) => {
    setImageErrors(prev => ({ ...prev, [index]: true }))
    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="16"%3EGaleri Görseli%3C/text%3E%3C/svg%3E'
  }

  const openModal = (index) => {
    if (!imageErrors[index]) {
      setCurrentImage(index)
      setShowModal(true)
    }
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % galleryImages.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  return (
    <section id="gallery" className="section gallery-section">
      <Container>
        <div className="section-title" data-aos="fade-up">
          <h2>{t('gallery.title')}</h2>
          <p>{t('gallery.subtitle')}</p>
        </div>

        <Row className="gallery-grid">
          {galleryImages.map((image, index) => (
            <Col 
              key={index} 
              lg={3} 
              md={4} 
              sm={6} 
              className="gallery-item"
              data-aos="zoom-in"
              data-aos-delay={index * 50}
            >
              <div 
                className={`gallery-card ${imageErrors[index] ? 'error' : ''}`}
                onClick={() => openModal(index)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === 'Enter' && openModal(index)}
                aria-label={`${image.alt} görselini büyüt`}
              >
                <img 
                  src={image.src}
                  alt={image.alt}
                  className="img-fluid"
                  loading="lazy"
                  onError={(e) => handleImageError(index, e)}
                />
                {imageErrors[index] && (
                  <div className="image-error-badge">
                    <i className="fas fa-exclamation-triangle"></i>
                  </div>
                )}
                <div className="gallery-overlay">
                  <i className="fas fa-search-plus"></i>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        <div className="text-center mt-4" data-aos="fade-up">
          <Link to="/gallery" className="btn btn-primary btn-lg">
            Tüm Galeriyi Görüntüle
          </Link>
        </div>
      </Container>

      {/* Lightbox Modal */}
      <Modal 
        show={showModal} 
        onHide={closeModal}
        size="xl"
        centered
        className="gallery-modal"
      >
        <Modal.Body>
          <button 
            className="modal-close" 
            onClick={closeModal} 
            aria-label="Kapat"
          >
            <i className="fas fa-times"></i>
          </button>
          <button 
            className="modal-prev" 
            onClick={prevImage} 
            aria-label="Önceki"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button 
            className="modal-next" 
            onClick={nextImage} 
            aria-label="Sonraki"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
          <img 
            src={galleryImages[currentImage]?.src} 
            alt={galleryImages[currentImage]?.alt}
            className="modal-image"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect fill="%23333" width="800" height="600"/%3E%3Ctext fill="%23fff" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="24"%3EGörsel Yüklenemedi%3C/text%3E%3C/svg%3E'
            }}
          />
          <div className="modal-caption">
            <p>{galleryImages[currentImage]?.alt}</p>
            <span className="image-counter">
              {currentImage + 1} / {galleryImages.length}
            </span>
          </div>
        </Modal.Body>
      </Modal>
    </section>
  )
}

export default Gallery