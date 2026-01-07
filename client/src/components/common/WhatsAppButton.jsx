import React from 'react'
import './WhatsAppButton.scss'

const WhatsAppButton = () => {
  const phoneNumber = '905362870639' // +90 536 287 0639
  const message = 'Merhaba, Güneş Hotel hakkında bilgi almak istiyorum.'
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="WhatsApp ile iletişime geç"
      title="WhatsApp ile iletişime geç"
    >
      <i className="fab fa-whatsapp" aria-hidden="true"></i>
    </a>
  )
}

export default WhatsAppButton
