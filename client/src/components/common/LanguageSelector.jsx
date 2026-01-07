import React, { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './LanguageSelector.scss'

const languages = {
  tr: { flag: '🇹🇷', name: 'Türkçe', code: 'TR' },
  en: { flag: '🇬🇧', name: 'English', code: 'EN' },
  it: { flag: '🇮🇹', name: 'Italiano', code: 'IT' }
}

const LanguageSelector = () => {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const currentLang = languages[i18n.language] || languages.tr

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const changeLanguage = async (lang) => {
    try {
      await i18n.changeLanguage(lang)
      localStorage.setItem('selectedLanguage', lang)
      setIsOpen(false)
    } catch (error) {
      console.error('Dil değiştirme hatası:', error)
    }
  }

  return (
    <div className="language-selector" ref={dropdownRef}>
      <button
        className="current-lang"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Dil seçimi"
        aria-expanded={isOpen}
      >
        <span className="flag">{currentLang.flag}</span>
        <span className="code">{currentLang.code}</span>
        <i className={`fas fa-chevron-down ${isOpen ? 'rotate' : ''}`}></i>
      </button>

      {isOpen && (
        <div className="lang-dropdown">
          {Object.entries(languages).map(([code, lang]) => (
            <button
              key={code}
              className={`lang-option ${i18n.language === code ? 'active' : ''}`}
              onClick={() => changeLanguage(code)}
            >
              <span className="flag">{lang.flag}</span>
              <span className="name">{lang.name}</span>
              {i18n.language === code && (
                <i className="fas fa-check"></i>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LanguageSelector
