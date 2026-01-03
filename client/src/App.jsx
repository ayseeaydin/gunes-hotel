import React, { useEffect, lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import AOS from 'aos'
import Layout from '@components/layout/Layout'

// Lazy Loading - Sayfalar sadece gerektiğinde yüklenecek
const Home = lazy(() => import('@pages/Home'))
const AboutPage = lazy(() => import('@pages/AboutPage'))
const RoomsPage = lazy(() => import('@pages/RoomsPage'))
const GalleryPage = lazy(() => import('@pages/GalleryPage'))
const ContactPage = lazy(() => import('@pages/ContactPage'))
const NotFound = lazy(() => import('@pages/NotFound'))

// Loading Component - Sayfa yüklenirken gösterilecek
const PageLoader = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh',
    flexDirection: 'column',
    gap: '1rem'
  }}>
    <div 
      style={{
        width: '50px',
        height: '50px',
        border: '4px solid #f3f3f3',
        borderTop: '4px solid #d4af37',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}
    />
    <p style={{ color: '#666', fontSize: '14px' }}>Yükleniyor...</p>
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
)

// Error Boundary Component - Hata durumunda gösterilecek
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
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
        }}>
          <h2 style={{ color: '#d4af37' }}>Bir şeyler ters gitti 😔</h2>
          <p style={{ color: '#666' }}>Sayfa yüklenirken bir hata oluştu.</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px',
              backgroundColor: '#d4af37',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
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
    // Initialize AOS - Sadece bir kez çalışacak
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      offset: 100,
      disable: 'mobile' // Mobilde animasyonları kapat (performans için)
    })

    // Cleanup
    return () => {
      AOS.refresh()
    }
  }, [])

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'smooth' })
    
    // AOS refresh - Yeni sayfa için animasyonları güncelle
    setTimeout(() => {
      AOS.refresh()
    }, 100)
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