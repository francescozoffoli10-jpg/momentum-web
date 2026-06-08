'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
const STORAGE_KEY = 'momentum-cookie-consent'

export default function GoogleAnalytics() {
  const [consented, setConsented] = useState(false)

  useEffect(() => {
    function check() {
      try {
        setConsented(localStorage.getItem(STORAGE_KEY) === 'accepted')
      } catch {
        setConsented(false)
      }
    }
    check()
    // React to the user accepting/rejecting in the cookie banner without a refresh.
    function onConsent(e: Event) {
      const value = (e as CustomEvent).detail
      setConsented(value === 'accepted')
    }
    window.addEventListener('momentum-consent', onConsent)
    return () => window.removeEventListener('momentum-consent', onConsent)
  }, [])

  if (!GA_ID || !consented) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  )
}
