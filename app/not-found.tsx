"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function NotFound() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to main landing page after a brief delay
    const timer = setTimeout(() => {
      router.push("/")
    }, 2000) // 2 second delay to show the 404 message briefly

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen" style={{
      background: "linear-gradient(135deg, rgb(var(--obsidian)) 0%, rgb(var(--charcoal)) 100%)"
    }}>
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-2xl mx-auto text-white">
          {/* 404 Icon */}
          <div className="mb-8 relative">
            <div className="text-[8rem] sm:text-[10rem] font-bold text-[#ffde59] opacity-20 leading-none">404</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-[#ffde59] text-6xl sm:text-8xl">🔍</div>
            </div>
          </div>

          {/* Content */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-[#ffde59]">
            Stránka nenalezena
          </h1>
          <p className="text-lg sm:text-xl text-white/80 mb-8">
            Stránka, kterou hledáš, neexistuje nebo byla přesunuta.
          </p>
          <p className="text-base text-white/60">
            Přesměrováváme tě na hlavní stránku...
          </p>
        </div>
      </main>
    </div>
  )
}
