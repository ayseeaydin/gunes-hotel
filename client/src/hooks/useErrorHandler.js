import { useCallback } from 'react'
import { showErrorToast, showSuccessToast, getErrorMessage } from '@utils/errorHandler'

/**
 * Custom hook for consistent error handling with toast notifications
 * @returns {Object} Error handling functions
 */
export const useErrorHandler = () => {
  const handleError = useCallback((error, customMessage) => {
    console.error('Error caught by useErrorHandler:', error)
    showErrorToast(error, customMessage)
    return getErrorMessage(error)
  }, [])

  const handleSuccess = useCallback((message) => {
    showSuccessToast(message)
  }, [])

  const withErrorHandling = useCallback(async (asyncFn, errorMessage) => {
    try {
      const result = await asyncFn()
      return { success: true, data: result }
    } catch (error) {
      handleError(error, errorMessage)
      return { success: false, error }
    }
  }, [handleError])

  return {
    handleError,
    handleSuccess,
    withErrorHandling
  }
}
