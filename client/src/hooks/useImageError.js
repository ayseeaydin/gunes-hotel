import { useState, useCallback } from 'react'

/**
 * Custom hook to handle image loading errors with fallback
 * @param {string} fallbackSvg - Optional custom fallback SVG data URL
 * @returns {Object} { imageErrors, handleImageError } - State and handler for image errors
 */
export const useImageError = (fallbackSvg) => {
  const [imageErrors, setImageErrors] = useState({})

  const defaultFallback = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="400"%3E%3Crect fill="%23f0f0f0" width="600" height="400"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle" font-family="Arial" font-size="18"%3EImage%3C/text%3E%3C/svg%3E'

  const handleImageError = useCallback((id, e) => {
    setImageErrors(prev => ({ ...prev, [id]: true }))
    e.target.src = fallbackSvg || defaultFallback
  }, [fallbackSvg])

  return { imageErrors, handleImageError }
}
