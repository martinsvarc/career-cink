"use client"

import { useEffect, useState } from "react"

export default function HotjarScript() {
  const [hasConsent, setHasConsent] = useState(false)

  useEffect(() => {
    // Check for existing consent
    const checkConsent = () => {
      try {
        const consentData = localStorage.getItem("cookie-consent")
        if (consentData) {
          const consent = JSON.parse(consentData)
          return consent.analytics === true
        }
        return false
      } catch (error) {
        console.warn("Error checking cookie consent:", error)
        return false
      }
    }

    // Set initial consent state
    setHasConsent(checkConsent())

    // Listen for consent updates
    const handleConsentUpdate = (event: CustomEvent) => {
      setHasConsent(event.detail.analytics === true)
    }

    window.addEventListener("cookieConsentUpdated", handleConsentUpdate as EventListener)

    return () => {
      window.removeEventListener("cookieConsentUpdated", handleConsentUpdate as EventListener)
    }
  }, [])

  useEffect(() => {
    // Only load Hotjar if user has given consent for analytics
    if (!hasConsent || typeof window === "undefined") {
      return
    }

    // Hotjar Tracking Code - only loads after consent
    ;((h: any, o: any, t: any, j: any, a?: any, r?: any) => {
      h.hj =
        h.hj ||
        (() => {
          ;(h.hj.q = h.hj.q || []).push(arguments)
        })
      h._hjSettings = { hjid: 6423264, hjsv: 6 }
      a = o.getElementsByTagName("head")[0]
      r = o.createElement("script")
      r.async = 1
      r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv
      a.appendChild(r)
    })(window, document, "https://static.hotjar.com/c/hotjar-", ".js?sv=")

    console.log("✅ Hotjar loaded after user consent")
  }, [hasConsent]) // Re-run when consent changes

  // Return null as this component doesn't render anything visible
  return null
}
