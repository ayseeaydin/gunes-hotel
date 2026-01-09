import React, { useEffect, lazy, Suspense, memo } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import AOS from 'aos'
import { Toaster } from 'react-hot-toast'
import Layout from '@components/layout/Layout'
import ErrorBoundary from '@components/common/ErrorBoundary'

// Lazy Loading - Sayfalar sadece gerektiğinde yüklenecek
const Home = lazy(() => import(/* webpackChunkName: "home" */ '@pages/Home'))
const AboutPage = lazy(() => import(/* webpackChunkName: "about" */ '@pages/AboutPage'))
const RoomsPage = lazy(() => import(/* webpackChunkName: "rooms" */ '@pages/RoomsPage'))
const GalleryPage = lazy(() => import(/* webpackChunkName: "gallery" */ '@pages/GalleryPage'))
const ContactPage = lazy(() => import(/* webpackChunkName: "contact" */ '@pages/ContactPage'))
const NotFound = lazy(() => import(/* webpackChunkName: "notfound" */ '@pages/NotFound'))

// Loading Component - Memoized for performance
const PageLoader = memo(() => (
  <div 
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '60vh',
      flexDirection: 'column',
      gap: '1rem'
    }}
    role="status"
    aria-live="polite"
    aria-label="Sayfa yükleniyor"
  >
    <div 
      style={{
        width: '50px',
        height: '50px',
        border: '4px solid #f3f3f3',
        borderTop: '4px solid #c18c30',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}
      aria-hidden="true"
    />
    <p style={{ color: '#666', fontSize: '14px' }}>Yükleniyor...</p>
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
))

PageLoader.displayName = 'PageLoader'

// Error Boundary Component - Hata durumunda gösterilecek
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console in development
    if (import.meta.env.DEV) {
      console.error('Error caught by boundary:', error, errorInfo)
    }
    
    this.setState({ errorInfo })
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
          flexDirection: 'column',
          gap: '1rem',
          padding: '2rem',
          textAlign: 'center'
        }}
        role="alert"
        aria-live="assertive"
        >
          <h2 style={{ color: '#c18c30' }}>Bir şeyler ters gitti 😔</h2>
          <p style={{ color: '#666' }}>Sayfa yüklenirken bir hata oluştu.</p>
          {import.meta.env.DEV && this.state.error && (
            <details style={{ 
              marginTop: '1rem', 
              textAlign: 'left',
              maxWidth: '600px',
              width: '100%'
            }}>
              <summary style={{ cursor: 'pointer', marginBottom: '0.5rem' }}>
                Hata Detayları
              </summary>
              <pre style={{ 
                background: '#f5f5f5', 
                padding: '1rem',
                borderRadius: '4px',
                overflow: 'auto',
                fontSize: '12px'
              }}>
                {this.state.error.toString()}
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
          <button
            onClick={this.handleReload}
            style={{
              padding: '10px 20px',
              backgroundColor: '#c18c30',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600'
            }}
            aria-label="Sayfayı yeniden yükle"
          >
            Sayfayı Yenile
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

function App() {
  const location = useLocation()

  useEffect(() => {
    // Initialize AOS - Performans odaklı ayarlar
    const isMobile = window.innerWidth < 768
    
    AOS.init({
      duration: isMobile ? 600 : 800,
      easing: 'ease-out',
      once: true,
      offset: isMobile ? 50 : 80,
      delay: 0,
      disable: 'mobile', // Mobilde animasyonları tamamen kapat
      startEvent: 'load',
      throttleDelay: 99,
      debounceDelay: 50,
      anchorPlacement: 'top-bottom'
    })

    return () => {
      AOS.refresh()
    }
  }, [])

  useEffect(() => {
    // Scroll to top on route change - native scrollTo for better performance
    window.scrollTo(0, 0)
    
    // AOS refresh with requestIdleCallback for better performance
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => AOS.refresh())
    } else {
      setTimeout(() => AOS.refresh(), 100)
    }
  }, [location.pathname])

  // Update document title and meta description based on route
  useEffect(() => {
    // This will be handled by Helmet in each page component
    // but we ensure the default title is set
    const defaultTitle = 'Güneş Hotel - Nemrut Dağı'
    if (!document.title || document.title === defaultTitle) {
      document.title = defaultTitle
    }
  }, [location.pathname])

  return (
    <ErrorBoundary>
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/rooms" element={<RoomsPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </ErrorBoundary>
  )
}

export default App