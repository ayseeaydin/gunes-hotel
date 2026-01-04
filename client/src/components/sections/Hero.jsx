import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Slider from 'react-slick'
import './Hero.scss'

const Hero = () => {
  const { t } = useTranslation()

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
    prevArrow: <button type="button" className="slick-prev" aria-label="Önceki Slayt"><i className="fas fa-chevron-left"></i></button>,
    nextArrow: <button type="button" className="slick-next" aria-label="Sonraki Slayt"><i className="fas fa-chevron-right"></i></button>,
    lazyLoad: 'progressive'
  }

  const slides = [
    {
      image: '/img/slide-1.jpg',
      titleKey: 'hero.title1',
      subtitleKey: 'hero.subtitle1',
      buttons: [
        { textKey: 'hero.viewRooms', link: '/rooms', primary: true },
        { textKey: 'hero.reservation', link: '/contact', primary: false }
      ]
    },
    {
      image: '/img/slide-2.jpg',
      titleKey: 'hero.title2',
      subtitleKey: 'hero.subtitle2',
      buttons: [
        { textKey: 'hero.viewGallery', link: '/gallery', primary: true },
        { textKey: 'hero.reservation', link: '/contact', primary: false }
      ]
    },
    {
      image: '/img/gallery-4.JPG',
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
            <div 
              className="slide-bg" 
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="slide-overlay"></div>
            </div>
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