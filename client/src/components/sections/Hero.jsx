import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Slider from 'react-slick'
import './Hero.scss'

// Custom Arrow Components - Modern ve şık oklar
const PrevArrow = ({ onClick }) => (
  <button 
    type="button" 
    className="slick-prev slick-arrow" 
    aria-label="Önceki Slayt"
    onClick={onClick}
  >
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
  </button>
)

const NextArrow = ({ onClick }) => (
  <button 
    type="button" 
    className="slick-next slick-arrow" 
    aria-label="Sonraki Slayt"
    onClick={onClick}
  >
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  </button>
)

const Hero = () => {
  const { t } = useTranslation()
  const [activeSlide, setActiveSlide] = useState(0)

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    pauseOnHover: false,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    lazyLoad: 'progressive',
    afterChange: (index) => setActiveSlide(index)
  }

  const slides = [
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
      image: '/img/gallery-4.webp',
      titleKey: 'hero.title3',
      subtitleKey: 'hero.subtitle3',
      buttons: [
        { textKey: 'nav.about', link: '/about', primary: true },
        { textKey: 'hero.reservation', link: '/contact', primary: false }
      ]
    }
  ]

  return (
    <section id="home" className="hero" role="banner">
      <Slider {...sliderSettings} className="hero-slider">
        {slides.map((slide, index) => (
          <div key={index} className="slide">
            {/* LCP Optimization: İlk slide'ı eager yükle */}
            <img 
              src={slide.image}
              alt={t(slide.titleKey)}
              className="slide-bg-img"
              loading={index === 0 ? 'eager' : 'lazy'}
              fetchpriority={index === 0 ? 'high' : 'low'}
              decoding={index === 0 ? 'auto' : 'async'}
              width="1920"
              height="1080"
            />
            <div className="slide-overlay"></div>
            <div className="slide-content">
              <div className="container">
                <div className="content-wrapper" data-aos="fade-up">
                  <h1>{t(slide.titleKey)}</h1>
                  <p>{t(slide.subtitleKey)}</p>
                  <div className="hero-buttons">
                    {slide.buttons.map((button, btnIndex) => (
                      <Link 
                        key={btnIndex}
                        to={button.link} 
                        className={`btn ${button.primary ? 'btn-primary' : 'btn-outline'}`}
                        aria-label={t(button.textKey)}
                        tabIndex={index === activeSlide ? 0 : -1}
                      >
                        {t(button.textKey)}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Scroll Down Indicator */}
      <div className="scroll-indicator" aria-hidden="true">
        <a href="#about" aria-label={t('hero.scrollDown')}>
          <i className="fas fa-chevron-down"></i>
        </a>
      </div>
    </section>
  )
}

export default Hero