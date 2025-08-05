"use client"

import { useEffect, useState } from "react"

export default function UrgencyBanner() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Auto-hide after 60 seconds
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 60000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className="w-full flex justify-center mb-6">
      <div className="relative group">
        {/* Main banner container */}
        <div className="relative overflow-hidden rounded-full px-6 py-3 bg-gradient-to-r from-[#ffde59]/20 via-[#ffd700]/20 to-[#ffed4e]/20 border border-[#ffde59]/30 shadow-lg backdrop-blur-sm">
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#ffde59]/10 via-[#ffd700]/10 to-[#ffed4e]/10 animate-pulse"></div>
          
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
          
          {/* Content */}
          <div className="relative z-10 flex items-center justify-center space-x-2 min-w-full">
            <span className="text-base sm:text-lg animate-pulse flex-shrink-0">🔒</span>
            <span 
              className="text-white font-semibold text-xs sm:text-sm md:text-base urgency-banner-text flex-shrink-0"
              style={{
                minWidth: 0,
                flex: '1 1 auto'
              }}
            >
              Zbývá 1 místo
            </span>
          </div>
          
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#ffde59]/20 via-[#ffd700]/20 to-[#ffed4e]/20 blur-sm animate-pulse"></div>
        </div>
        
        {/* Additional glow rings */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#ffde59]/10 via-[#ffd700]/10 to-[#ffed4e]/10 blur-md animate-pulse" style={{ animationDelay: "0.5s" }}></div>
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#ffde59]/5 via-[#ffd700]/5 to-[#ffed4e]/5 blur-lg animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>
    </div>
  )
} 