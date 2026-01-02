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
    prevArrow: <button className="slick-prev"><i className="fas fa-chevron-left"></i></button>,
    nextArrow: <button className="slick-next"><i className="fas fa-chevron-right"></i></button>
  }

  const slides = [
    {
      image: '/img/slide-1.jpg',
      title: t('hero.title1'),
      subtitle: t('hero.subtitle1'),
      buttons: [
        { text: t('hero.viewRooms'), link: '/rooms', primary: true },
        { text: t('hero.reservation'), link: '/contact', primary: false }
      ]
    },
    {
      image: '/img/slide-2.jpg',
      title: t('hero.title2'),
      subtitle: t('hero.subtitle2'),
      buttons: [
        { text: t('hero.viewGallery'), link: '/gallery', primary: true },
        { text: t('hero.reservation'), link: '/contact', primary: false }
      ]
    },
    {
      image: '/img/gallery-4.JPG',
      title: 'Nemrut Dağı',
      subtitle: 'UNESCO Dünya Mirası',
      buttons: [
        { text: t('nav.about'), link: '/about', primary: true },
        { text: t('hero.reservation'), link: '/contact', primary: false }
      ]
    }
  ]

  return (
    <section id="home" className="hero">
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
                  <h1>{slide.title}</h1>
                  <p>{slide.subtitle}</p>
                  <div className="hero-buttons">
                    {slide.buttons.map((button, btnIndex) => (
                      <Link 
                        key={btnIndex}
                        to={button.link} 
                        className={`btn ${button.primary ? 'btn-primary' : 'btn-outline'}`}
                      >
                        {button.text}
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
      <div className="scroll-indicator">
        <a href="#about" aria-label="Aşağı kaydır">
          <i className="fas fa-chevron-down"></i>
        </a>
      </div>
    </section>
  )
}

export default Hero
