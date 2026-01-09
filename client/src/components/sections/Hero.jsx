import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useImagePreload } from '@hooks'
import './Hero.scss'

const Hero = () => {
  const { t } = useTranslation()
  const [activeSlide, setActiveSlide] = useState(0)

  const slides = useMemo(() => [
    {
      image: '/img/slide-1.webp',
      titleKey: 'hero.title1',
      subtitleKey: 'hero.subtitle1',
      buttons: [
        { textKey: 'hero.viewRooms', link: '/rooms', primary: true },
        { textKey: 'hero.reservation', link: '/contact', primary: false }
      ]
    },
    {
      image: '/img/slide-2.webp',
      titleKey: 'hero.title2',
      subtitleKey: 'hero.subtitle2',
      buttons: [
        { textKey: 'hero.viewGallery', link: '/gallery', primary: true },
        { textKey: 'hero.reservation', link: '/contact', primary: false }
      ]
    },
    {
      image: '/img/slide-3.webp',
      titleKey: 'hero.title3',
      subtitleKey: 'hero.subtitle3',
      buttons: [
        { textKey: 'nav.about', link: '/about', primary: true },
        { textKey: 'hero.reservation', link: '/contact', primary: false }
      ]
    },
    {
      image: '/img/slide-4.webp',
      titleKey: 'hero.title4',
      subtitleKey: 'hero.subtitle4',
      buttons: [
        { textKey: 'nav.about', link: '/about', primary: true },
        { textKey: 'hero.reservation', link: '/contact', primary: false }
      ]
    }
  ], [])

  // Preload all slider images for smooth transitions
  const imageSrcs = useMemo(() => slides.map(s => s.image), [slides])
  const { preloadImage } = useImagePreload(imageSrcs, { 
    preloadAll: typeof window !== 'undefined' && window.innerWidth >= 768,
    priority: true 
  })

  // Auto-play with performance optimization
  useEffect(() => {
    const isMobile = window.innerWidth < 768
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length)
    }, isMobile ? 8000 : 5000)
    return () => clearInterval(interval)
  }, [slides.length])

  // Preload next slide for smooth transition
  useEffect(() => {
    const nextIndex = (activeSlide + 1) % slides.length
    const nextImage = slides[nextIndex].image
    preloadImage(nextImage)
  }, [activeSlide, slides, preloadImage])

  const goToSlide = useCallback((index) => {
    setActiveSlide(index)
  }, [])

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  const prevSlide = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }, [slides.length])

  return (
    <section id="home" className="hero" role="region" aria-label="Ana banner">
      <div className="hero-slider-custom" role="group" aria-roledescription="Slayt gösterisi" aria-label="Otel görselleri">
        {slides.map((slide, index) => {
          const isActive = index === activeSlide
          
          return (
            <div 
              key={index} 
              className={`slide ${isActive ? 'active' : ''}`}
            >
              <img 
                src={slide.image}
                alt={`${t(slide.titleKey)} - ${t(slide.subtitleKey)}`}
                className="slide-bg-img"
                loading={index === 0 ? 'eager' : 'lazy'}
                fetchpriority={index === 0 ? 'high' : 'low'}
                decoding={index === 0 ? 'sync' : 'async'}
                width="1920"
                height="1080"
                style={{ 
                  objectFit: 'cover',
                  imageRendering: window.innerWidth < 768 ? 'auto' : 'auto'
                }}
              />
              <div className="slide-overlay"></div>
              <div className="slide-content" style={{ display: isActive ? 'flex' : 'none' }}>
                <div className="container">
                  <div className="content-wrapper">
                    <h1>{t(slide.titleKey)}</h1>
                    <p>{t(slide.subtitleKey)}</p>
                    <div className="hero-buttons">
                      {slide.buttons.map((button, btnIndex) => (
                        <Link 
                          key={btnIndex}
                          to={button.link} 
                          className={`btn ${button.primary ? 'btn-primary' : 'btn-outline'}`}
                        >
                          {t(button.textKey)}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        <button 
          className="nav-arrow nav-prev"
          onClick={prevSlide}
          aria-label={t('hero.previousSlide') || 'Önceki slayt'}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <button 
          className="nav-arrow nav-next"
          onClick={nextSlide}
          aria-label={t('hero.nextSlide') || 'Sonraki slayt'}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

        <div className="slider-dots" role="group" aria-label="Slayt navigasyonu">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === activeSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`${index + 1}. slayta git`}
              aria-current={index === activeSlide ? 'true' : 'false'}
            />
          ))}
        </div>
      </div>

      <div className="scroll-indicator">
        <a href="#about" aria-label={t('hero.scrollDown')}>
          <i className="fas fa-chevron-down"></i>
        </a>
      </div>
    </section>
  )
}

export default Hero