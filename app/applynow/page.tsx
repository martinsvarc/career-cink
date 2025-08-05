"use client"

import { Button } from "@/components/ui/button"
import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import Head from "next/head"
import { useUTMTracking } from "../hooks/use-utm-tracking"
import { FormHealthMonitor } from "../components/form-health-monitor"
import { trackApplicationCompletion } from "../utils/track-application-completion"
import ApplicationExitTracker from "../components/application-exit-tracker"
import { autoFillUserData, storeUserData } from "../utils/auto-fill-user-data"
import { ChevronRight, Upload, FileVideo } from "lucide-react"
import UrgencyBanner from "../components/urgency-banner"
// Import the tracking functions
import {
  trackContinueClick,
  trackFormSubmission,
  resetQuestionTimer,
  startFormTracking,
} from "../utils/form-interaction-tracker"

// Define the webhook URL
const WEBHOOK_URL = "https://n8n.automatedsolarbiz.com/webhook/0ed3686d-9ac5-49d3-bea9-b9887021f3a4"

// Czech phone number formatting function
const formatCzechPhoneNumber = (value: string) => {
  // Remove all non-digits
  const digits = value.replace(/\D/g, "")
  // Limit to exactly 9 digits
  const limitedDigits = digits.slice(0, 9)
  
  // Return unformatted for storage (exactly 9 digits)
  if (limitedDigits.length === 9) {
    return limitedDigits
  }
  
  // Return formatted for display (with spaces)
  if (limitedDigits.length <= 3) {
    return limitedDigits
  } else if (limitedDigits.length <= 6) {
    return `${limitedDigits.slice(0, 3)} ${limitedDigits.slice(3)}`
  } else {
    return `${limitedDigits.slice(0, 3)} ${limitedDigits.slice(3, 6)} ${limitedDigits.slice(6, 9)}`
  }
}

// Function to format phone number for display only
const formatPhoneForDisplay = (value: string) => {
  const digits = value.replace(/\D/g, "")
  const limitedDigits = digits.slice(0, 9)
  
  if (limitedDigits.length <= 3) {
    return limitedDigits
  } else if (limitedDigits.length <= 6) {
    return `${limitedDigits.slice(0, 3)} ${limitedDigits.slice(3)}`
  } else {
    return `${limitedDigits.slice(0, 3)} ${limitedDigits.slice(3, 6)} ${limitedDigits.slice(6, 9)}`
  }
}

export default function ApplyNowPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const initRef = useRef(false)
  
  const [formData, setFormData] = useState({
    // Updated Czech form fields
    fullName: "",
    age: "",
    email: "",
    phone: "",
    city: "",
    socialMedia: "",
    hasNotebook: "",
    canWorkEvenings: "",

    // Hidden tracking fields
    userAgent: "",
    ip: "",
    ab_variant: "",
  })

  const [currentStep, setCurrentStep] = useState(1)

  const [isInitialized, setIsInitialized] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const [lastError, setLastError] = useState<string | null>(null)
  const [formEntryTime] = useState(new Date())
  const [phoneDisplayValue, setPhoneDisplayValue] = useState("")

  // Add UTM tracking
  const { utmParams } = useUTMTracking()

  // Remove any unwanted embedded scripts or iframes on mount
  useEffect(() => {
    const scripts = document.querySelectorAll('script[src*="vusercontent.net"]')
    scripts.forEach((script) => script.remove())

    const iframes = document.querySelectorAll('iframe[src*="vusercontent.net"]')
    iframes.forEach((iframe) => iframe.remove())
  }, [])

  // Load Wistia scripts
  useEffect(() => {
    // Load Wistia player script
    const playerScript = document.createElement('script')
    playerScript.src = 'https://fast.wistia.com/player.js'
    playerScript.async = true
    document.head.appendChild(playerScript)

    // Load Wistia embed script
    const embedScript = document.createElement('script')
    embedScript.src = 'https://fast.wistia.com/embed/10qc7ohpni.js'
    embedScript.async = true
    embedScript.type = 'module'
    document.head.appendChild(embedScript)

    // Add Wistia styles
    const wistiaStyle = document.createElement('style')
    wistiaStyle.textContent = `wistia-player[media-id='10qc7ohpni']:not(:defined) { background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/10qc7ohpni/swatch'); display: block; filter: blur(5px); padding-top:56.25%; }`
    document.head.appendChild(wistiaStyle)

    return () => {
      // Cleanup scripts when component unmounts
      if (playerScript.parentNode) playerScript.parentNode.removeChild(playerScript)
      if (embedScript.parentNode) embedScript.parentNode.removeChild(embedScript)
      if (wistiaStyle.parentNode) wistiaStyle.parentNode.removeChild(wistiaStyle)
    }
  }, [])

  // Enhanced initialization with error recovery
  useEffect(() => {
    const initializeForm = async () => {
      try {
        if (initRef.current) return
        initRef.current = true

        // Initialize form tracking
        startFormTracking()

        // Add a small delay to ensure DOM is ready
        await new Promise((resolve) => setTimeout(resolve, 100))

        // Validate that we're in a browser environment
        if (typeof window === "undefined") {
          throw new Error("Form must be initialized in browser environment")
        }

        // Get URL parameters safely
        let urlSearchParams: URLSearchParams
        try {
          urlSearchParams = new URLSearchParams(window.location.search)
        } catch (error) {
          console.warn("Failed to parse URL parameters, using empty params:", error)
          urlSearchParams = new URLSearchParams()
        }

        const firstNameParam = urlSearchParams.get("firstName") || ""
        const lastNameParam = urlSearchParams.get("lastName") || ""
        const fullNameParam = urlSearchParams.get("fullName") || ""
        const emailParam = urlSearchParams.get("email") || ""
        const phoneParam = urlSearchParams.get("phone") || ""

        // Safely get data from localStorage
        let storedData = null
        let initialFormData = null

        try {
          const storedDataStr = localStorage.getItem("questionnaireData")
          if (storedDataStr && storedDataStr !== "undefined" && storedDataStr !== "null") {
            storedData = JSON.parse(storedDataStr)
            if (typeof storedData !== "object" || storedData === null) {
              console.warn("Invalid stored data format, clearing...")
              localStorage.removeItem("questionnaireData")
              storedData = null
            }
          }
        } catch (error) {
          console.warn("Error parsing stored questionnaire data, clearing:", error)
          try {
            localStorage.removeItem("questionnaireData")
          } catch (clearError) {
            console.error("Failed to clear corrupted localStorage:", clearError)
          }
        }

        try {
          const initialFormDataStr = localStorage.getItem("initialFormData")
          if (initialFormDataStr && initialFormDataStr !== "undefined" && initialFormDataStr !== "null") {
            initialFormData = JSON.parse(initialFormDataStr)
            if (typeof initialFormData !== "object" || initialFormData === null) {
              console.warn("Invalid initial form data format, clearing...")
              localStorage.removeItem("initialFormData")
              initialFormData = null
            }
          }
        } catch (error) {
          console.warn("Error parsing initial form data, clearing:", error)
          try {
            localStorage.removeItem("initialFormData")
          } catch (clearError) {
            console.error("Failed to clear corrupted initial form data:", clearError)
          }
        }

        // Safely determine names
        let firstName = firstNameParam || storedData?.firstName || ""
        let lastName = lastNameParam || storedData?.lastName || ""

        // Safe name splitting
        if ((!firstName || !lastName) && initialFormData?.fullName) {
          try {
            const nameParts = String(initialFormData.fullName).trim().split(" ")
            if (nameParts.length >= 2) {
              firstName = firstName || nameParts[0]
              lastName = lastName || nameParts.slice(1).join(" ")
            } else if (nameParts.length === 1) {
              firstName = firstName || nameParts[0]
            }
          } catch (nameError) {
            console.warn("Error processing full name:", nameError)
          }
        }

        // Safely determine email and phone
        const email = emailParam || storedData?.email || initialFormData?.email || ""
        const phone = phoneParam || storedData?.phone || initialFormData?.phone || ""

        // Create safe merged form data
        const mergedFormData = {
          fullName: String(storedData?.fullName || `${firstName} ${lastName}`.trim()),
          age: String(storedData?.age || ""),
          email: String(email || ""),
          phone: String(phone || ""),
          city: String(storedData?.city || ""),
          socialMedia: String(storedData?.socialMedia || ""),
          hasNotebook: String(storedData?.hasNotebook || ""),
          canWorkEvenings: String(storedData?.canWorkEvenings || ""),
          userAgent: String(storedData?.userAgent || ""),
          ip: String(storedData?.ip || ""),
          ab_variant: String(storedData?.ab_variant || ""),
        }

        // Set form data
        setFormData(mergedFormData)

        // Attempt to auto-fill user data
        try {
          const autoFilledData = await autoFillUserData()

          if (autoFilledData.firstName || autoFilledData.email) {
            console.log("Auto-filled user data found:", autoFilledData)

            // Merge auto-filled data with existing data (don't overwrite if we already have data)
            const enhancedFormData = {
              ...mergedFormData,
              fullName: mergedFormData.fullName || `${autoFilledData.firstName || ""} ${autoFilledData.lastName || ""}`.trim(),
              phone: mergedFormData.phone || autoFilledData.phone || "",
            }

            setFormData(enhancedFormData)

            // Store this data for future use
            storeUserData(autoFilledData)
          }
        } catch (error) {
          console.warn("Error auto-filling user data:", error)
        }

        setIsInitialized(true)
        setHasError(false)
        setLastError(null)

        console.log("Form initialized successfully:", {
          hasStoredData: !!storedData,
          hasInitialData: !!initialFormData,
          phone: mergedFormData.phone ? "present" : "missing",
        })
      } catch (error) {
        console.error("Critical error in form initialization:", error)
        setHasError(true)
        setLastError(error instanceof Error ? error.message : "Unknown initialization error")

        // Fallback: Set safe defaults
        setFormData({
          fullName: "",
          age: "",
          email: "",
          phone: "",
          city: "",
          socialMedia: "",
          hasNotebook: "",
          canWorkEvenings: "",
          userAgent: "",
          ip: "",
          ab_variant: "",
        })
        setIsInitialized(true)

        // Try to clear potentially corrupted localStorage
        try {
          localStorage.removeItem("questionnaireData")
          localStorage.removeItem("initialFormData")
        } catch (clearError) {
          console.error("Failed to clear localStorage after error:", clearError)
        }
      }
    }

    initializeForm()
  }, [])

  // Enhanced tracking data collection
  useEffect(() => {
    if (!isInitialized) return

    const populateTrackingData = async () => {
      try {
        // Set user agent
        const userAgent = navigator.userAgent
        setFormData((prev) => ({ ...prev, userAgent }))

        // Fetch public IP
        try {
          const response = await fetch("https://api.ipify.org?format=json")
          const data = await response.json()
          if (data.ip) {
            setFormData((prev) => ({ ...prev, ip: data.ip }))
          }
        } catch (ipError) {
          console.warn("Failed to fetch IP address:", ipError)
        }
      } catch (error) {
        console.warn("Error populating tracking data:", error)
      }
    }

    populateTrackingData()
  }, [isInitialized])

  // Error recovery mechanism
  const handleErrorRecovery = () => {
    try {
      // Clear all localStorage
      localStorage.removeItem("questionnaireData")
      localStorage.removeItem("initialFormData")

      // Reset form state
      setFormData({
        fullName: "",
        age: "",
        email: "",
        phone: "",
        city: "",
        socialMedia: "",
        hasNotebook: "",
        canWorkEvenings: "",
        userAgent: "",
        ip: "",
        ab_variant: "",
      })
      setHasError(false)
      setLastError(null)
      setRetryCount((prev) => prev + 1)

      console.log("Form reset successfully")
    } catch (error) {
      console.error("Error during recovery:", error)
      // If recovery fails, redirect to homepage
      window.location.href = "/"
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    // Special handling for phone formatting
    if (name === "phone") {
      const formattedValue = formatCzechPhoneNumber(value)
      const displayValue = formatPhoneForDisplay(value)
              setFormData((prev: any) => ({ ...prev, [name]: formattedValue }))
        setPhoneDisplayValue(displayValue)
      } else {
        setFormData((prev: any) => ({ ...prev, [name]: value }))
      }
  }

  const handleSingleOptionChange = (name: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }))
    
    // Auto-progress to next step after a short delay
    setTimeout(() => {
      if (validateCurrentStep()) {
        nextStep()
      }
    }, 500) // 500ms delay for better UX
  }

  // Checkbox/Radio component for consistent styling
  const SelectionBox = ({
    selected,
    onChange,
    children,
  }: {
    selected: boolean
    onChange: () => void
    children: React.ReactNode
  }) => {
    return (
      <div
        className={`p-4 sm:p-5 md:p-6 rounded-lg border cursor-pointer transition-all hover:border-[rgb(var(--neon-orchid))]/70 active:scale-[0.99] ${
          selected ? "border-[rgb(var(--neon-orchid))] bg-[rgb(var(--neon-orchid))]/10" : "border-[rgb(var(--velvet-gray))]"
        }`}
        onClick={onChange}
      >
        <div className="flex items-start sm:items-center">
          <div
            className={`min-w-[20px] h-5 w-5 rounded mr-3 sm:mr-4 flex items-center justify-center ${
              selected ? "bg-[rgb(var(--neon-orchid))] text-white" : "border border-[rgb(var(--velvet-gray))]"
            }`}
          >
            {selected && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3.5 h-3.5"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            )}
          </div>
          <div className="text-sm sm:text-base mobile-text-wrap">{children}</div>
        </div>
      </div>
    )
  }

  // Enhanced localStorage saving with error handling
  useEffect(() => {
    if (!isInitialized) return

    const timeoutId = setTimeout(() => {
      try {
        // Validate formData before saving
        if (typeof formData === "object" && formData !== null) {
          const dataToSave = { ...formData } // Don't save file to localStorage
          const dataToSaveStr = JSON.stringify(dataToSave)
          // Check if JSON is valid and not too large (5MB limit)
          if (dataToSaveStr.length < 5 * 1024 * 1024) {
            localStorage.setItem("questionnaireData", dataToSaveStr)
          } else {
            console.warn("Form data too large to save to localStorage")
          }
        }
      } catch (error) {
        console.warn("Error saving to localStorage:", error)
        // Don't block the user if localStorage fails
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [formData, isInitialized])

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1: // Full Name
        return !!formData.fullName.trim()
      case 2: // Age
        return !!formData.age && parseInt(formData.age) >= 18
      case 3: // Email
        return !!formData.email.trim() && isValidEmail(formData.email)
      case 4: // Phone
        const phoneDigits = formData.phone.replace(/\D/g, "")
        return phoneDigits.length === 9
      case 5: // City
        return !!formData.city.trim()
      case 6: // Social Media
        return !!formData.socialMedia.trim()
      case 7: // Has Notebook
        return !!formData.hasNotebook
      case 8: // Can Work Evenings
        return !!formData.canWorkEvenings
      default:
        return false
    }
  }

  const nextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep((prev: number) => Math.min(prev + 1, 8))
        window.scrollTo(0, 0)
    }
  }

  const prevStep = () => {
    setCurrentStep((prev: number) => Math.max(1, prev - 1))
    window.scrollTo(0, 0)
  }

  // Validate email format
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  // Update the handleSubmit function to track form submission
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      if (validateCurrentStep()) {
        nextStep()
      }
    }
  }

  // Separate form submission function
  const submitFormData = async (): Promise<void> => {
    return new Promise((resolve, reject) => {
      const formDataToSubmit = new FormData()
      formDataToSubmit.append("fullName", formData.fullName)
      formDataToSubmit.append("age", formData.age)
      formDataToSubmit.append("email", formData.email)
      formDataToSubmit.append("phone", formData.phone)
      formDataToSubmit.append("city", formData.city)
      formDataToSubmit.append("socialMedia", formData.socialMedia)
      formDataToSubmit.append("hasNotebook", formData.hasNotebook)
      formDataToSubmit.append("canWorkEvenings", formData.canWorkEvenings)
      
      // Add tracking data
      formDataToSubmit.append("userAgent", formData.userAgent || "")
      formDataToSubmit.append("ip", formData.ip || "")
      formDataToSubmit.append("ab_variant", formData.ab_variant || "")

      // Add UTM parameters
      formDataToSubmit.append("utm_source", utmParams.utm_source || "")
      formDataToSubmit.append("utm_campaign", utmParams.utm_campaign || "")
      formDataToSubmit.append("utm_medium", utmParams.utm_medium || "")
      formDataToSubmit.append("utm_content", utmParams.utm_content || "")
      formDataToSubmit.append("utm_term", utmParams.utm_term || "")

      const xhr = new XMLHttpRequest()
      
      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          console.log("Form submission completed successfully")
          resolve()
        } else {
          reject(new Error(`Form submission failed with status: ${xhr.status}`))
        }
      })

      xhr.addEventListener('error', () => {
        reject(new Error("Network error during form submission"))
      })

      xhr.open('POST', WEBHOOK_URL)
      xhr.send(formDataToSubmit)
    })
  }

  // Main form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateCurrentStep()) {
      toast({
        title: "Chyba při odesílání",
        description: "Prosím vyplňte všechna povinná pole",
        variant: "destructive",
      })
      return
    }

    // Track form submission
    trackFormSubmission(formData)

    try {
      console.log("=== FORM SUBMISSION STARTED ===")
      console.log("Form Data being sent:", {
        fullName: formData.fullName,
        age: formData.age,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        socialMedia: formData.socialMedia,
        hasNotebook: formData.hasNotebook,
        canWorkEvenings: formData.canWorkEvenings,
      })

      // Submit form data
      setIsProcessing(true)
      
      try {
        console.log("Starting form submission...")
        await submitFormData()
        console.log("Form submission completed successfully")
        
        // Clear localStorage since we've processed the data
        try {
          localStorage.removeItem("questionnaireData")
          console.log("✅ localStorage cleared")
        } catch (storageError) {
          console.error("❌ Failed to clear localStorage:", storageError)
        }

        // Track application completion
        trackApplicationCompletion({
          firstName: formData.fullName.split(" ")[0] || "",
          lastName: formData.fullName.split(" ").slice(1).join(" ") || "",
          email: formData.email,
          phone: formData.phone,
        })

        // Redirect to success page
        router.push("/weappreciateyoupage")
        
      } catch (submitError) {
        console.error("Form submission failed:", submitError)
        throw new Error("Odesílání formuláře se nezdařilo. Zkuste to prosím znovu.")
      } finally {
        setIsProcessing(false)
      }

    } catch (error) {
      console.error("=== CRITICAL ERROR IN FORM SUBMISSION ===")
      console.error("Critical error during form submission:", error)

      toast({
        title: "Chyba při odesílání",
        description: error instanceof Error ? error.message : "Došlo k chybě při odesílání formuláře. Zkuste to prosím znovu.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Show loading state while initializing
  if (!isInitialized) {
    return (
             <div className="min-h-screen bg-black text-white flex items-center justify-center">
         <div className="text-center">
           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ffde59] mx-auto mb-4"></div>
           <p className="text-white/80">Načítání formuláře...</p>
         </div>
       </div>
    )
  }

  return (
          <div className="min-h-screen relative" style={{
        background: "linear-gradient(135deg, rgba(18, 18, 18, 0.7) 0%, rgba(30, 30, 32, 0.6) 100%)"
      }}>
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{
            backgroundImage: "url('https://res.cloudinary.com/dmbzcxhjn/image/upload/v1754323322/Hled%C3%A1me_sympatick%C3%BD_holky_ide%C3%A1ln%C4%9B_studentky_fajyk8.png')"
          }}
        />
        
        {/* Content Overlay */}
        <div className="relative z-10">
      <FormHealthMonitor />
      <ApplicationExitTracker />
      


      <main className="w-full max-w-5xl mx-auto py-4 sm:py-6 md:py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
        {/* Enhanced error state display */}
        {hasError && (
          <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-500/50 rounded-xl p-6 mb-6 text-center backdrop-blur-sm">
            <div className="flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              <h3 className="text-red-400 font-bold text-xl">Opravujeme rychlý problém</h3>
            </div>
                         <p className="text-white/90 mb-4 text-lg">
               Neboj se! Detekovali jsme a vyřešili jsme technický problém. Tvůj postup je v bezpečí.
             </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleErrorRecovery}
                className="px-6 py-3 bg-gradient-to-r from-[#ffde59] to-[#ffd700] hover:from-[#ffed4e] hover:to-[#ffed4e] text-white rounded-lg font-semibold transition-all duration-300"
              >
                Pokračovat bezpečně
              </button>
              <button
                onClick={() => (window.location.href = "/")}
                className="px-6 py-3 bg-transparent border border-white/30 text-white hover:bg-white/10 rounded-lg font-semibold transition-all duration-300"
              >
                Začít znovu
              </button>
            </div>
                         {retryCount > 0 && (
               <p className="text-white/60 text-sm mt-3">Pokus o obnovu #{retryCount} - Tvoje data jsou chráněna</p>
             )}
          </div>
        )}

        <div className="mb-8 sm:mb-10 md:mb-12">
          <div className="flex flex-col items-center text-center space-y-2 sm:space-y-3">
                         <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight font-bold">
               VYDĚLEJ 20–50K Z DOMOVA
             </h1>
             <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white/80 leading-tight mt-2">
               (IDEÁLNÍ KE ŠKOLE)
             </h2>
          </div>
        </div>

        <div className="glow-card mb-8 mx-auto max-w-4xl">
          <div className="p-4 sm:p-6 md:p-8 lg:p-10">
            <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
              {/* Hidden tracking fields */}
              <input type="hidden" name="userAgent" value={formData.userAgent} />
              <input type="hidden" name="ip" value={formData.ip} />

              {/* Step 1: Full Name */}
              {currentStep === 1 && (
                <div className="space-y-5 sm:space-y-6 animate-fadeIn">
                  {/* Wistia Video */}
                  <div className="w-full max-w-2xl mx-auto mb-6">
                    <div className="bg-black/20 p-4 rounded-lg border border-[#ffde59]/30">
                      <div 
                        dangerouslySetInnerHTML={{
                          __html: '<wistia-player media-id="10qc7ohpni" aspect="1.7777777777777777" style="width: 100%; height: auto; min-height: 200px;"></wistia-player>'
                        }}
                      />
                    </div>
                  </div>
                  
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#ffde59] mb-4 sm:mb-6 p-3 sm:p-4 border border-[#ffde59]/30 bg-[#ffde59]/10 rounded-lg shadow-inner animate-typewriter">
                    1️⃣ Jméno a příjmení
                  </h3>
                  <p className="text-sm text-[#ffde59]/80 mb-4">
                    Ať víme, jak ti máme říkat a připravit smlouvu, pokud se domluvíme.
                  </p>

                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Zadej své jméno a příjmení"
                    className="w-full bg-[rgb(var(--charcoal))] border border-[rgb(var(--velvet-gray))] focus:border-[rgb(var(--neon-orchid))] focus:ring-[rgb(var(--neon-orchid))] text-white h-12 text-base px-4 rounded-lg"
                  />

                  <div className="flex justify-end mt-6 sm:mt-8">
                    <Button
                      type="button"
                      onClick={nextStep}
                      disabled={!validateCurrentStep()}
                      className="w-full sm:w-auto px-5 py-2.5 sm:px-6 sm:py-2.5 bg-gradient-to-r from-[#ffde59] to-[#ffd700] hover:from-[#ffed4e] hover:to-[#ffed4e] text-white rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-base"
                    >
                      Pokračovat
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Age */}
              {currentStep === 2 && (
                <div className="space-y-5 sm:space-y-6 animate-fadeIn">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#ffde59] mb-4 sm:mb-6 p-3 sm:p-4 border border-[#ffde59]/30 bg-[#ffde59]/10 rounded-lg shadow-inner animate-typewriter">
                    2️⃣ Věk
                  </h3>
                  <p className="text-sm text-[#ffde59]/80 mb-4">
                    Práce je pouze pro lidi starší 18 let.
                  </p>

                  <input
                    id="age"
                    name="age"
                    type="number"
                    min="18"
                    max="100"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Zadej svůj věk"
                    className="w-full bg-[rgb(var(--charcoal))] border border-[rgb(var(--velvet-gray))] focus:border-[rgb(var(--neon-orchid))] focus:ring-[rgb(var(--neon-orchid))] text-white h-12 text-base px-4 rounded-lg"
                  />

                  <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 mt-6 sm:mt-8">
                    <Button
                      type="button"
                      onClick={prevStep}
                      className="w-full sm:w-auto px-5 py-2.5 sm:px-6 sm:py-2.5 bg-transparent border border-white/30 text-white hover:bg-white/10 rounded-lg transition-all duration-300 text-base"
                    >
                      Zpět
                    </Button>
                    <Button
                      type="button"
                      onClick={nextStep}
                      disabled={!validateCurrentStep()}
                      className="w-full sm:w-auto px-5 py-2.5 sm:px-6 sm:py-2.5 bg-gradient-to-r from-[#ffde59] to-[#ffd700] hover:from-[#ffed4e] hover:to-[#ffed4e] text-white rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-base"
                    >
                      Pokračovat
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Email */}
              {currentStep === 3 && (
                <div className="space-y-5 sm:space-y-6 animate-fadeIn">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#ffde59] mb-4 sm:mb-6 p-3 sm:p-4 border border-[#ffde59]/30 bg-[#ffde59]/10 rounded-lg shadow-inner animate-typewriter">
                    3️⃣ E‑mail
                  </h3>
                  <p className="text-sm text-[#ffde59]/80 mb-4">
                    Sem ti pošleme informace, pokud projdeš do dalšího kola.
                  </p>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tvuj@email.cz"
                    className="w-full bg-[rgb(var(--charcoal))] border border-[rgb(var(--velvet-gray))] focus:border-[rgb(var(--neon-orchid))] focus:ring-[rgb(var(--neon-orchid))] text-white h-12 text-base px-4 rounded-lg"
                  />

                  <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 mt-6 sm:mt-8">
                    <Button
                      type="button"
                      onClick={prevStep}
                      className="w-full sm:w-auto px-5 py-2.5 sm:px-6 sm:py-2.5 bg-transparent border border-white/30 text-white hover:bg-white/10 rounded-lg transition-all duration-300 text-base"
                    >
                      Zpět
                    </Button>
                    <Button
                      type="button"
                      onClick={nextStep}
                      disabled={!validateCurrentStep()}
                      className="w-full sm:w-auto px-5 py-2.5 sm:px-6 sm:py-2.5 bg-gradient-to-r from-[#ffde59] to-[#ffd700] hover:from-[#ffed4e] hover:to-[#ffed4e] text-white rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-base"
                    >
                      Pokračovat
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 4: Phone */}
              {currentStep === 4 && (
                <div className="space-y-5 sm:space-y-6 animate-fadeIn">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#ffde59] mb-4 sm:mb-6 p-3 sm:p-4 border border-[#ffde59]/30 bg-[#ffde59]/10 rounded-lg shadow-inner animate-typewriter">
                    4️⃣ Telefonní číslo
                  </h3>
                  <p className="text-sm text-[#ffde59]/80 mb-4">
                    Rychlejší domluva, když bude potřeba něco upřesnit.
                  </p>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={phoneDisplayValue || formData.phone}
                    onChange={handleChange}
                    placeholder="777 123 456"
                    maxLength={11}
                    className="w-full bg-[rgb(var(--charcoal))] border border-[rgb(var(--velvet-gray))] focus:border-[rgb(var(--neon-orchid))] focus:ring-[rgb(var(--neon-orchid))] text-white h-12 text-base px-4 rounded-lg"
                  />
                  <p className="text-xs text-[#ffde59]/60 mt-2">
                    Zadej 9místné číslo bez mezer (např. 777123456)
                  </p>

                  <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 mt-6 sm:mt-8">
                    <Button
                      type="button"
                      onClick={prevStep}
                      className="w-full sm:w-auto px-5 py-2.5 sm:px-6 sm:py-2.5 bg-transparent border border-white/30 text-white hover:bg-white/10 rounded-lg transition-all duration-300 text-base"
                    >
                      Zpět
                    </Button>
                    <Button
                      type="button"
                      onClick={nextStep}
                      disabled={!validateCurrentStep()}
                      className="w-full sm:w-auto px-5 py-2.5 sm:px-6 sm:py-2.5 bg-gradient-to-r from-[#ffde59] to-[#ffd700] hover:from-[#ffed4e] hover:to-[#ffed4e] text-white rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-base"
                    >
                      Pokračovat
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 5: City */}
              {currentStep === 5 && (
                <div className="space-y-5 sm:space-y-6 animate-fadeIn">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#ffde59] mb-4 sm:mb-6 p-3 sm:p-4 border border-[#ffde59]/30 bg-[#ffde59]/10 rounded-lg shadow-inner animate-typewriter">
                    5️⃣ Město, kde bydlíš
                  </h3>
                  <p className="text-sm text-[#ffde59]/80 mb-4">
                    Jen orientačně – práce je 100% z domova.
                  </p>

                  <input
                    id="city"
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Praha, Brno, Ostrava..."
                    className="w-full bg-[rgb(var(--charcoal))] border border-[rgb(var(--velvet-gray))] focus:border-[rgb(var(--neon-orchid))] focus:ring-[rgb(var(--neon-orchid))] text-white h-12 text-base px-4 rounded-lg"
                  />

                  <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 mt-6 sm:mt-8">
                    <Button
                      type="button"
                      onClick={prevStep}
                      className="w-full sm:w-auto px-5 py-2.5 sm:px-6 sm:py-2.5 bg-transparent border border-white/30 text-white hover:bg-white/10 rounded-lg transition-all duration-300 text-base"
                    >
                      Zpět
                    </Button>
                    <Button
                      type="button"
                      onClick={nextStep}
                      disabled={!validateCurrentStep()}
                      className="w-full sm:w-auto px-5 py-2.5 sm:px-6 sm:py-2.5 bg-gradient-to-r from-[#ffde59] to-[#ffd700] hover:from-[#ffed4e] hover:to-[#ffed4e] text-white rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-base"
                    >
                      Pokračovat
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 6: Social Media */}
              {currentStep === 6 && (
                <div className="space-y-5 sm:space-y-6 animate-fadeIn">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#ffde59] mb-4 sm:mb-6 p-3 sm:p-4 border border-[#ffde59]/30 bg-[#ffde59]/10 rounded-lg shadow-inner animate-typewriter">
                    6️⃣ Tvůj Instagram nebo Facebook profil
                  </h3>
                  <p className="text-sm text-[#ffde59]/80 mb-4">
                    Pro rychlejší ověření uchazečů – odkaz nebo uživatelské jméno.
                  </p>

                  <input
                    id="socialMedia"
                    name="socialMedia"
                    type="text"
                    value={formData.socialMedia}
                    onChange={handleChange}
                    placeholder="@tvuj_instagram nebo odkaz na Facebook"
                    className="w-full bg-[rgb(var(--charcoal))] border border-[rgb(var(--velvet-gray))] focus:border-[rgb(var(--neon-orchid))] focus:ring-[rgb(var(--neon-orchid))] text-white h-12 text-base px-4 rounded-lg"
                  />

                  <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 mt-6 sm:mt-8">
                    <Button
                      type="button"
                      onClick={prevStep}
                      className="w-full sm:w-auto px-5 py-2.5 sm:px-6 sm:py-2.5 bg-transparent border border-white/30 text-white hover:bg-white/10 rounded-lg transition-all duration-300 text-base"
                    >
                      Zpět
                    </Button>
                    <Button
                      type="button"
                      onClick={nextStep}
                      disabled={!validateCurrentStep()}
                      className="w-full sm:w-auto px-5 py-2.5 sm:px-6 sm:py-2.5 bg-gradient-to-r from-[#ffde59] to-[#ffd700] hover:from-[#ffed4e] hover:to-[#ffed4e] text-white rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-base"
                    >
                      Pokračovat
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 7: Has Notebook */}
              {currentStep === 7 && (
                <div className="space-y-5 sm:space-y-6 animate-fadeIn">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#ffde59] mb-4 sm:mb-6 p-3 sm:p-4 border border-[#ffde59]/30 bg-[#ffde59]/10 rounded-lg shadow-inner animate-typewriter">
                    7️⃣ Máš vlastní notebook a stabilní internet?
                  </h3>
                  <p className="text-sm text-[#ffde59]/80 mb-4">
                    Bez toho se bohužel pracovat nedá.
                  </p>

                  <div className="space-y-3 sm:space-y-4">
                    <div className="grid grid-cols-1 gap-3 sm:gap-4">
                      <SelectionBox
                        selected={formData.hasNotebook === "Ano, mám"}
                        onChange={() => handleSingleOptionChange("hasNotebook", "Ano, mám")}
                      >
                        <div className="flex items-center">
                          <span className="text-green-500 mr-2">✅</span>Ano, mám
                        </div>
                      </SelectionBox>
                      <SelectionBox
                        selected={formData.hasNotebook === "Ne, nemám"}
                        onChange={() => handleSingleOptionChange("hasNotebook", "Ne, nemám")}
                      >
                        <div className="flex items-center">
                          <span className="text-red-500 mr-2">❌</span>Ne, nemám
                        </div>
                      </SelectionBox>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 mt-6 sm:mt-8">
                    <Button
                      type="button"
                      onClick={prevStep}
                      className="w-full sm:w-auto px-5 py-2.5 sm:px-6 sm:py-2.5 bg-transparent border border-white/30 text-white hover:bg-white/10 rounded-lg transition-all duration-300 text-base"
                    >
                      Zpět
                    </Button>
                    <Button
                      type="button"
                      onClick={nextStep}
                      disabled={!validateCurrentStep()}
                      className="w-full sm:w-auto px-5 py-2.5 sm:px-6 sm:py-2.5 bg-gradient-to-r from-[#ffde59] to-[#ffd700] hover:from-[#ffed4e] hover:to-[#ffed4e] text-white rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-base"
                    >
                      Pokračovat
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 8: Can Work Evenings */}
              {currentStep === 8 && (
                <div className="space-y-5 sm:space-y-6 animate-fadeIn">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#ffde59] mb-4 sm:mb-6 p-3 sm:p-4 border border-[#ffde59]/30 bg-[#ffde59]/10 rounded-lg shadow-inner animate-typewriter">
                    8️⃣ Můžeš pracovat minimálně 5 dní v týdnu od 17:00 do 00:00?
                  </h3>
                  <p className="text-sm text-[#ffde59]/80 mb-4">
                    Hledáme lidi, kteří zvládnou držet pravidelný večerní režim.
                  </p>

                  <div className="space-y-3 sm:space-y-4">
                    <div className="grid grid-cols-1 gap-3 sm:gap-4">
                      <SelectionBox
                        selected={formData.canWorkEvenings === "Ano, můžu"}
                        onChange={() => handleSingleOptionChange("canWorkEvenings", "Ano, můžu")}
                      >
                        <div className="flex items-center">
                          <span className="text-green-500 mr-2">✅</span>Ano, můžu
                        </div>
                      </SelectionBox>
                      <SelectionBox
                        selected={formData.canWorkEvenings === "Ne, nemůžu"}
                        onChange={() => handleSingleOptionChange("canWorkEvenings", "Ne, nemůžu")}
                      >
                        <div className="flex items-center">
                          <span className="text-red-500 mr-2">❌</span>Ne, nemůžu
                        </div>
                      </SelectionBox>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 mt-6 sm:mt-8">
                    <Button
                      type="button"
                      onClick={prevStep}
                      className="w-full sm:w-auto px-5 py-2.5 sm:px-6 sm:py-2.5 bg-transparent border border-white/30 text-white hover:bg-white/10 rounded-lg transition-all duration-300 text-base"
                    >
                      Zpět
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting || isProcessing || !validateCurrentStep()}
                      className="w-full sm:w-auto px-5 py-2.5 sm:px-6 sm:py-2.5 bg-gradient-to-r from-[#ffde59] to-[#ffd700] hover:from-[#ffed4e] hover:to-[#ffed4e] text-white rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-base relative"
                    >
                      {isProcessing ? (
                        <>
                          <span className="flex items-center">
                            <svg 
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" 
                              xmlns="http://www.w3.org/2000/svg" 
                              fill="none" 
                              viewBox="0 0 24 24"
                            >
                              <circle 
                                className="opacity-25" 
                                cx="12" 
                                cy="12" 
                                r="10" 
                                stroke="currentColor" 
                                strokeWidth="4"
                              ></circle>
                              <path 
                                className="opacity-75" 
                                fill="currentColor" 
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Odesílá se...
                          </span>
                        </>
                      ) : (
                        <>
                          Odeslat
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                  
                  {isProcessing && (
                    <div className="mt-4 sm:mt-6 p-4 sm:p-5 bg-gradient-to-r from-[#ffde59]/10 to-[#ffd700]/10 border border-[#ffde59]/30 rounded-lg backdrop-blur-sm animate-fadeIn">
                      <div className="flex items-center justify-center space-x-3">
                        <svg 
                          className="animate-spin h-5 w-5 text-[#ffde59]" 
                          xmlns="http://www.w3.org/2000/svg" 
                          fill="none" 
                          viewBox="0 0 24 24"
                        >
                          <circle 
                            className="opacity-25" 
                            cx="12" 
                            cy="12" 
                            r="10" 
                            stroke="currentColor" 
                            strokeWidth="4"
                          ></circle>
                          <path 
                            className="opacity-75" 
                            fill="currentColor" 
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        <span className="text-[#ffde59] font-medium text-center text-sm sm:text-base">
                          Odesíláme tvůj formulář... nezavírej stránku 💜
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Urgency Banner - Outside the card */}
        {currentStep === 1 && <UrgencyBanner />}
      </main>
        </div>
      </div>
    )
  }
