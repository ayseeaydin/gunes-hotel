import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Container, Row, Col, Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import './GalleryPage.scss'

const GalleryPage = () => {
  const { t } = useTranslation()
  const [showModal, setShowModal] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)

  const galleryImages = [
    { src: '/img/gallery-1.JPG', alt: 'Otel Dış Görünüm', category: 'hotel' },
    { src: '/img/gallery-2.JPG', alt: 'Resepsiyon Alanı', category: 'hotel' },
    { src: '/img/gallery-3.JPG', alt: 'Restoran', category: 'hotel' },
    { src: '/img/gallery-4.JPG', alt: 'Nemrut Dağı Manzarası', category: 'view' },
    { src: '/img/gallery-5.JPG', alt: 'Gün Doğumu', category: 'view' },
    { src: '/img/gallery-6.jpeg', alt: 'Çevre Manzarası', category: 'view' },
    { src: '/img/gallery-7.jpeg', alt: 'Oda İç Görünüm', category: 'rooms' },
    { src: '/img/gallery-8.JPG', alt: 'Gün Batımı', category: 'view' },
    { src: '/img/double-room-1.jpg', alt: 'Çift Kişilik Oda', category: 'rooms' },
    { src: '/img/double-room-2.jpg', alt: 'Oda Detayı', category: 'rooms' },
    { src: '/img/double-room-3.jpeg', alt: 'Yatak Odası', category: 'rooms' },
    { src: '/img/bathroom-1.jpg', alt: 'Banyo', category: 'rooms' },
    { src: '/img/bathroom-2.jpg', alt: 'Banyo Detayı', category: 'rooms' },
    { src: '/img/triple-room.JPG', alt: 'Üç Kişilik Oda', category: 'rooms' },
    { src: '/img/triple-room-1.jpeg', alt: 'Oda Görünümü', category: 'rooms' },
    { src: '/img/triple-room-2.jpeg', alt: 'Oda İçi', category: 'rooms' },
    { src: '/img/twin-room-1.JPG', alt: 'Twin Oda', category: 'rooms' },
    { src: '/img/twin-room-2.JPG', alt: 'Twin Oda Detay', category: 'rooms' },
    { src: '/img/twin-room-3.JPG', alt: 'Twin Oda Görünüm', category: 'rooms' },
    { src: '/img/gallery-9.JPG', alt: 'Lounge Alanı', category: 'hotel' },
    { src: '/img/gallery-10.JPG', alt: 'Tarihi Heykeller', category: 'view' },
    { src: '/img/gallery-11.JPG', alt: 'Bahçe Alanı', category: 'hotel' },
    { src: '/img/gallery-12.jpg', alt: 'Kahvaltı Salonu', category: 'hotel' },
    { src: '/img/gallery-13.jpg', alt: 'Yemek Alanı', category: 'hotel' },
    { src: '/img/gallery-14.jpg', alt: 'Restoran Detay', category: 'hotel' },
    { src: '/img/gallery-15.jpg', alt: 'Otel İçi', category: 'hotel' },
    { src: '/img/gallery-16.jpg', alt: 'Koridor', category: 'hotel' },
    { src: '/img/gallery-17.jpg', alt: 'Genel Alan', category: 'hotel' },
    { src: '/img/gallery-18.JPG', alt: 'Dış Mekan', category: 'hotel' },
    { src: '/img/gallery-19.jpg', alt: 'Giriş', category: 'hotel' },
    { src: '/img/gallery-20.jpg', alt: 'Teras', category: 'hotel' },
    { src: '/img/gallery-21.jpeg', alt: 'Manzara', category: 'view' },
    { src: '/img/gallery-22.jpeg', alt: 'Doğa', category: 'view' },
    { src: '/img/gallery-23.jpeg', alt: 'Çevre', category: 'view' },
    { src: '/img/winter.jpeg', alt: 'Kış Manzarası', category: 'view' },
    { src: '/img/gallery-24.jpeg', alt: 'Nemrut Zirvesi', category: 'view' },
    { src: '/img/gallery-25.jpeg', alt: 'Antik Kalıntılar', category: 'view' },
    { src: '/img/gallery-26.jpeg', alt: 'Panorama', category: 'view' },
    { src: '/img/gallery-27.jpeg', alt: 'Aile Odası', category: 'rooms' },
    { src: '/img/gallery-28.jpeg', alt: 'Konforlu Oda', category: 'rooms' },
    { src: '/img/gallery-29.jpeg', alt: 'Açık Hava', category: 'hotel' },
    { src: '/img/gallery-30.jpeg', alt: 'Yol Manzarası', category: 'view' }
  ]

  const [filter, setFilter] = useState('all')

  const filteredImages = filter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter)

  const openModal = (index) => {
    setCurrentImage(index)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % filteredImages.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + filteredImages.length) % filteredImages.length)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') nextImage()
    if (e.key === 'ArrowLeft') prevImage()
    if (e.key === 'Escape') closeModal()
  }

  return (
    <>
      <Helmet>
        <title>Galeri - Güneş Hotel | Nemrut Dağı</title>
        <meta 
          name="description" 
          content="Güneş Hotel ve Nemrut Dağı'ndan fotoğraflar. Odalarımız, manzaralarımız ve otelimizden kareler." 
        />
        <link rel="canonical" href="https://guneshotel.com/gallery" />
      </Helmet>

      <div className="gallery-page">
        {/* Page Header */}
        <section className="page-header">
          <div className="page-header-overlay"></div>
          <Container>
            <div className="page-header-content" data-aos="fade-up">
              <h1>{t('gallery.title')}</h1>
              <p className="lead">{t('gallery.subtitle')}</p>
            </div>
          </Container>
        </section>

        {/* Gallery Filters */}
        <section className="section gallery-section">
          <Container>
            <div className="gallery-filters" data-aos="fade-up">
              <button 
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                <i className="fas fa-th"></i> Tümü
              </button>
              <button 
                className={`filter-btn ${filter === 'hotel' ? 'active' : ''}`}
                onClick={() => setFilter('hotel')}
              >
                <i className="fas fa-hotel"></i> Otel
              </button>
              <button 
                className={`filter-btn ${filter === 'rooms' ? 'active' : ''}`}
                onClick={() => setFilter('rooms')}
              >
                <i className="fas fa-bed"></i> Odalar
              </button>
              <button 
                className={`filter-btn ${filter === 'view' ? 'active' : ''}`}
                onClick={() => setFilter('view')}
              >
                <i className="fas fa-mountain"></i> Manzara
              </button>
            </div>

            {/* Gallery Grid */}
            <Row className="gallery-grid">
              {filteredImages.map((image, index) => (
                <Col 
                  key={index} 
                  lg={4} 
                  md={6} 
                  className="gallery-item"
                  data-aos="zoom-in"
                  data-aos-delay={index * 50}
                >
                  <div 
                    className="gallery-card"
                    onClick={() => openModal(index)}
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) => e.key === 'Enter' && openModal(index)}
                  >
                    <img 
                      src={image.src} 
                      alt={image.alt}
                      loading="lazy"
                    />
                    <div className="gallery-overlay">
                      <i className="fas fa-search-plus"></i>
                      <p>{image.alt}</p>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        {/* Lightbox Modal */}
        <Modal 
          show={showModal} 
          onHide={closeModal}
          size="xl"
          centered
          className="gallery-modal"
          onKeyDown={handleKeyDown}
        >
          <Modal.Body>
            <button className="modal-close" onClick={closeModal} aria-label="Kapat">
              <i className="fas fa-times"></i>
            </button>
            <button className="modal-prev" onClick={prevImage} aria-label="Önceki">
              <i className="fas fa-chevron-left"></i>
            </button>
            <button className="modal-next" onClick={nextImage} aria-label="Sonraki">
              <i className="fas fa-chevron-right"></i>
            </button>
            <img 
              src={filteredImages[currentImage]?.src} 
              alt={filteredImages[currentImage]?.alt}
              className="modal-image"
            />
            <div className="modal-caption">
              <p>{filteredImages[currentImage]?.alt}</p>
              <span className="image-counter">
                {currentImage + 1} / {filteredImages.length}
              </span>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  )
}

export default GalleryPage
