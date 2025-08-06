"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import Link from "next/link"

interface CookieConsent {
  essential: boolean
  analytics: boolean
  marketing: boolean
}

export default function GDPRCookieBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [consent, setConsent] = useState<CookieConsent>({
    essential: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false,
  })

  useEffect(() => {
    // Check if user has already made a choice
    const existingConsent = localStorage.getItem("cookie-consent")
    if (!existingConsent) {
      setShowBanner(true)
    }
  }, [])

  const handleAcceptAll = () => {
    const fullConsent = {
      essential: true,
      analytics: true,
      marketing: true,
    }
    setConsent(fullConsent)
    saveConsent(fullConsent)
    setShowBanner(false)
  }

  const handleAcceptSelected = () => {
    saveConsent(consent)
    setShowBanner(false)
  }

  const handleRejectAll = () => {
    const minimalConsent = {
      essential: true,
      analytics: false,
      marketing: false,
    }
    setConsent(minimalConsent)
    saveConsent(minimalConsent)
    setShowBanner(false)
  }

  const saveConsent = (consentData: CookieConsent) => {
    localStorage.setItem("cookie-consent", JSON.stringify(consentData))
    localStorage.setItem("cookie-consent-date", new Date().toISOString())
    
    // Trigger custom event for other components to listen to
    window.dispatchEvent(new CustomEvent("cookieConsentUpdated", {
      detail: consentData
    }))
  }

  if (!showBanner) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black bg-opacity-80 backdrop-blur-sm border-t border-gray-700 p-4 sm:p-6 w-full">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          {/* Content */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2">
              🍪 Souhlas s cookies
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Používáme cookies pro zlepšení vašeho zážitku na našich stránkách. 
              Některé cookies jsou nezbytné pro fungování stránky, jiné nám pomáhají 
              pochopit, jak stránku používáte. Více informací najdete v našich{" "}
              <Link href="/privacy-policy" className="text-[#ffde59] hover:underline">
                zásadách ochrany osobních údajů
              </Link>.
            </p>

            {/* Cookie Categories */}
            <div className="space-y-3 mb-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="essential"
                  checked={consent.essential}
                  disabled
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label htmlFor="essential" className="text-white font-medium">
                    Nezbytné cookies
                  </Label>
                  <p className="text-gray-400 text-xs">
                    Nutné pro základní fungování stránky. Nelze je vypnout.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="analytics"
                  checked={consent.analytics}
                  onCheckedChange={(checked) => 
                    setConsent(prev => ({ ...prev, analytics: checked as boolean }))
                  }
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label htmlFor="analytics" className="text-white font-medium">
                    Analytické cookies
                  </Label>
                  <p className="text-gray-400 text-xs">
                    Pomáhají nám pochopit, jak stránku používáte (Hotjar, Google Analytics).
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="marketing"
                  checked={consent.marketing}
                  onCheckedChange={(checked) => 
                    setConsent(prev => ({ ...prev, marketing: checked as boolean }))
                  }
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label htmlFor="marketing" className="text-white font-medium">
                    Marketingové cookies
                  </Label>
                  <p className="text-gray-400 text-xs">
                    Používáme je pro personalizaci reklam a obsah.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 lg:flex-col lg:min-w-[200px]">
            <Button
              onClick={handleAcceptAll}
              className="w-full sm:w-auto bg-[#ffde59] hover:bg-[#ffed4e] text-black font-medium"
            >
              Přijmout vše
            </Button>
            <Button
              onClick={handleAcceptSelected}
              className="w-full sm:w-auto bg-transparent border border-[#ffde59] text-[#ffde59] hover:bg-[#ffde59]/10"
            >
              Přijmout vybrané
            </Button>
            <Button
              onClick={handleRejectAll}
              variant="outline"
              className="w-full sm:w-auto border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Odmítnout vše
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 