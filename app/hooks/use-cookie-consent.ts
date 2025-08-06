"use client"

import { useState, useEffect } from "react"

interface CookieConsent {
  essential: boolean
  analytics: boolean
  marketing: boolean
}

export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Check for existing consent on mount
    const checkConsent = () => {
      try {
        const consentData = localStorage.getItem("cookie-consent")
        if (consentData) {
          const parsedConsent = JSON.parse(consentData)
          setConsent(parsedConsent)
        } else {
          setConsent(null)
        }
      } catch (error) {
        console.warn("Error parsing cookie consent:", error)
        setConsent(null)
      }
      setIsLoaded(true)
    }

    checkConsent()

    // Listen for consent updates
    const handleConsentUpdate = (event: CustomEvent) => {
      setConsent(event.detail)
    }

    window.addEventListener("cookieConsentUpdated", handleConsentUpdate as EventListener)

    return () => {
      window.removeEventListener("cookieConsentUpdated", handleConsentUpdate as EventListener)
    }
  }, [])

  const hasAnalyticsConsent = consent?.analytics === true
  const hasMarketingConsent = consent?.marketing === true
  const hasEssentialConsent = consent?.essential === true

  return {
    consent,
    isLoaded,
    hasAnalyticsConsent,
    hasMarketingConsent,
    hasEssentialConsent,
  }
} 