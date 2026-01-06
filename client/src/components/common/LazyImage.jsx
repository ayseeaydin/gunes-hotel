import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import './LazyImage.css'

const LazyImage = ({
  src,
  alt,
  placeholder,
  className = '',
  width,
  height,
  onLoad,
  onError,
  threshold = 0.1,
  rootMargin = '200px',
  fallbackSrc = '/images/placeholder.jpg',
  loading = 'lazy',
  fetchPriority = 'auto'
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const imgRef = useRef(null)
  const observerRef = useRef(null)

  useEffect(() => {
    // Modern browsers için native lazy loading kullan
    if ('loading' in HTMLImageElement.prototype) {
      setIsInView(true)
      return
    }

    // Fallback: Intersection Observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            if (observerRef.current && imgRef.current) {
              observerRef.current.unobserve(imgRef.current)
            }
          }
        })
      },
      {
        threshold,
        rootMargin
      }
    )

    // Observer'ı başlat
    if (imgRef.current) {
      observerRef.current.observe(imgRef.current)
    }

    // Cleanup
    return () => {
      if (observerRef.current && imgRef.current) {
        observerRef.current.unobserve(imgRef.current)
      }
    }
  }, [threshold, rootMargin])

  const handleLoad = () => {
    setIsLoaded(true)
    setHasError(false)
    if (onLoad) onLoad()
  }

  const handleError = () => {
    setHasError(true)
    if (onError) onError()
    
    // Retry mekanizması (max 3 deneme)
    if (retryCount < 3) {
      setTimeout(() => {
        setRetryCount(prev => prev + 1)
        setHasError(false)
      }, 1000 * (retryCount + 1))
    }
  }

  const handleRetry = () => {
    setRetryCount(0)
    setHasError(false)
    setIsInView(true)
  }

  return (
    <div
      ref={imgRef}
      className={`lazy-image-wrapper ${className}`}
      style={{ width, height }}
    >
      {/* Placeholder - Görsel yüklenmeden önce */}
      {!isLoaded && placeholder && (
        <img
          src={placeholder}
          alt={alt}
          className="lazy-image-placeholder"
          aria-hidden="true"
        />
      )}

      {/* Loading Spinner */}
      {isInView && !isLoaded && !hasError && (
        <div className="lazy-image-spinner">
          <div className="spinner"></div>
        </div>
      )}

      {/* Ana Görsel */}
      {isInView && !hasError && (
        <img
          src={src}
          alt={alt || ''}
          className={`lazy-image ${isLoaded ? 'lazy-image-loaded' : ''}`}
          onLoad={handleLoad}
          onError={handleError}
          loading={loading}
          fetchPriority={fetchPriority}
          width={width}
          height={height}
          decoding="async"
        />
      )}

      {/* Hata Durumu */}
      {hasError && retryCount >= 3 && (
        <div className="lazy-image-error">
          <img
            src={fallbackSrc}
            alt={alt || 'Fallback image'}
            className="lazy-image-fallback"
            loading="lazy"
          />
          <div className="lazy-image-error-overlay">
            <p>Görsel yüklenemedi</p>
            <button 
              onClick={handleRetry} 
              className="retry-button"
              aria-label="Görseli tekrar yükle"
            >
              Tekrar Dene
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

LazyImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onLoad: PropTypes.func,
  onError: PropTypes.func,
  threshold: PropTypes.number,
  rootMargin: PropTypes.string,
  fallbackSrc: PropTypes.string,
  loading: PropTypes.oneOf(['lazy', 'eager']),
  fetchPriority: PropTypes.oneOf(['high', 'low', 'auto'])
}

export default LazyImage
  threshold: PropTypes.number,
  rootMargin: PropTypes.string,
  fallbackSrc: PropTypes.string
}

export default LazyImage
