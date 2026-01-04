import React, { useState, useEffect } from 'react'

/**
 * Görsel yükleme sorunlarını debug etmek için yardımcı component
 * Sadece development'ta kullanın
 */
const ImageDebugger = ({ images = [] }) => {
  const [imageStatuses, setImageStatuses] = useState({})
  const [isMinimized, setIsMinimized] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const checkImages = async () => {
      const statuses = {}
      
      for (const img of images) {
        try {
          const response = await fetch(img.src, { method: 'HEAD' })
          statuses[img.src] = {
            exists: response.ok,
            status: response.status,
            contentType: response.headers.get('content-type'),
            component: img.component
          }
        } catch (error) {
          statuses[img.src] = {
            exists: false,
            error: error.message,
            component: img.component
          }
        }
      }
      
      setImageStatuses(statuses)
    }

    if (import.meta.env.DEV && images.length > 0) {
      checkImages()
    }
  }, [images])

  // Production'da hiçbir şey gösterme
  if (import.meta.env.PROD) {
    return null
  }

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          background: '#c18c30',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          fontSize: '24px',
          cursor: 'pointer',
          zIndex: 9999,
          boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
        }}
        title="Show Image Debugger"
      >
        🖼️
      </button>
    )
  }

  const totalImages = Object.keys(imageStatuses).length
  const loadedImages = Object.values(imageStatuses).filter(s => s.exists).length
  const failedImages = totalImages - loadedImages

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'rgba(0,0,0,0.95)',
      color: 'white',
      zIndex: 9999,
      fontFamily: 'monospace',
      boxShadow: '0 -4px 20px rgba(0,0,0,0.5)',
      transition: 'all 0.3s ease'
    }}>
      {/* Header */}
      <div style={{
        background: '#c18c30',
        padding: '0.75rem 1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'pointer'
      }} onClick={() => setIsMinimized(!isMinimized)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '20px' }}>🖼️</span>
          <strong>Image Debug Info</strong>
          <span style={{ 
            fontSize: '12px', 
            opacity: 0.9,
            background: 'rgba(0,0,0,0.3)',
            padding: '4px 8px',
            borderRadius: '4px'
          }}>
            {loadedImages}/{totalImages} loaded
            {failedImages > 0 && (
              <span style={{ color: '#ff6b6b', marginLeft: '8px' }}>
                | {failedImages} failed
              </span>
            )}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={(e) => {
              e.stopPropagation()
              setIsMinimized(!isMinimized)
            }}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              color: 'white',
              padding: '4px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            {isMinimized ? '▲' : '▼'}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              setIsVisible(false)
            }}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              color: 'white',
              padding: '4px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Content */}
      {!isMinimized && (
        <div style={{
          padding: '1rem',
          maxHeight: '300px',
          overflow: 'auto',
          fontSize: '12px'
        }}>
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            {Object.entries(imageStatuses).map(([src, status]) => (
              <div key={src} style={{
                padding: '0.75rem',
                background: status.exists ? 'rgba(0,255,0,0.08)' : 'rgba(255,0,0,0.08)',
                borderLeft: `4px solid ${status.exists ? '#4ade80' : '#f87171'}`,
                borderRadius: '4px',
                transition: 'all 0.2s ease'
              }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start',
                  gap: '1rem'
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '4px' }}>
                      <span style={{ 
                        fontSize: '16px',
                        color: status.exists ? '#4ade80' : '#f87171'
                      }}>
                        {status.exists ? '✓' : '✗'}
                      </span>
                      <span style={{ 
                        fontSize: '11px',
                        color: '#c18c30',
                        background: 'rgba(193,140,48,0.2)',
                        padding: '2px 6px',
                        borderRadius: '3px'
                      }}>
                        {status.component}
                      </span>
                    </div>
                    <div style={{ 
                      wordBreak: 'break-all',
                      fontSize: '12px',
                      color: status.exists ? '#a3e635' : '#fca5a5',
                      fontWeight: status.exists ? 'normal' : 'bold'
                    }}>
                      {src}
                    </div>
                    {status.contentType && (
                      <div style={{ 
                        fontSize: '10px', 
                        color: '#94a3b8', 
                        marginTop: '6px',
                        display: 'flex',
                        gap: '1rem'
                      }}>
                        <span>Type: {status.contentType}</span>
                        <span>Status: {status.status}</span>
                      </div>
                    )}
                    {status.error && (
                      <div style={{ 
                        fontSize: '11px', 
                        color: '#fca5a5', 
                        marginTop: '6px',
                        background: 'rgba(248,113,113,0.1)',
                        padding: '4px 8px',
                        borderRadius: '3px'
                      }}>
                        ⚠️ {status.error}
                      </div>
                    )}
                  </div>
                  <span style={{ 
                    padding: '4px 10px',
                    background: status.exists ? '#4ade80' : '#f87171',
                    color: 'black',
                    borderRadius: '4px',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap'
                  }}>
                    {status.status || 'ERROR'}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Tips Section */}
          <div style={{ 
            marginTop: '1.5rem', 
            padding: '1rem',
            background: 'rgba(193,140,48,0.1)',
            borderRadius: '6px',
            borderLeft: '4px solid #c18c30'
          }}>
            <div style={{ 
              fontSize: '13px', 
              fontWeight: 'bold',
              color: '#c18c30',
              marginBottom: '0.75rem'
            }}>
              💡 Troubleshooting Tips
            </div>
            <ul style={{ 
              margin: 0, 
              paddingLeft: '1.5rem',
              fontSize: '11px',
              color: '#cbd5e1',
              lineHeight: '1.8'
            }}>
              <li>Görseller <code style={{ 
                background: 'rgba(0,0,0,0.3)', 
                padding: '2px 6px', 
                borderRadius: '3px',
                color: '#fbbf24'
              }}>client/public/img/</code> klasöründe olmalı</li>
              <li>Dosya isimleri <strong>case-sensitive</strong> (büyük/küçük harf duyarlı)</li>
              <li>Dev server'ı yeniden başlatın: <code style={{ 
                background: 'rgba(0,0,0,0.3)', 
                padding: '2px 6px', 
                borderRadius: '3px',
                color: '#fbbf24'
              }}>Ctrl+C</code> → <code style={{ 
                background: 'rgba(0,0,0,0.3)', 
                padding: '2px 6px', 
                borderRadius: '3px',
                color: '#fbbf24'
              }}>npm run dev</code></li>
              <li>Browser cache temizle: <code style={{ 
                background: 'rgba(0,0,0,0.3)', 
                padding: '2px 6px', 
                borderRadius: '3px',
                color: '#fbbf24'
              }}>Ctrl+Shift+R</code> veya <code style={{ 
                background: 'rgba(0,0,0,0.3)', 
                padding: '2px 6px', 
                borderRadius: '3px',
                color: '#fbbf24'
              }}>Cmd+Shift+R</code></li>
              <li>Konsolu kontrol et (<code style={{ 
                background: 'rgba(0,0,0,0.3)', 
                padding: '2px 6px', 
                borderRadius: '3px',
                color: '#fbbf24'
              }}>F12</code>) - 404 hataları için</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default ImageDebugger