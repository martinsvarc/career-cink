"use client"

import { useRouter, useSearchParams } from "next/navigation"
import Head from "next/head"
import PageExitTracker from "../components/page-exit-tracker"
import Footer from "../components/footer"
import Script from "next/script"
import { useEffect, useState } from "react"
import { trackApplyNowClick } from "../utils/form-interaction-tracker"
// Variant 1 of the HomePage component
export default function HomePageVariant1() {
  // Add this hook at the top of the component after other hooks
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)
  const [isFullyMounted, setIsFullyMounted] = useState(false)
  const [wistiaLoaded, setWistiaLoaded] = useState(false)

  const firstName = searchParams?.get("firstName") || "there"

  // Trigger animations after component mounts
  useEffect(() => {
    // Set initial state to prevent flash
    setIsFullyMounted(true)

    // Small delay to ensure DOM is ready before starting animations
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 150) // Slightly longer delay to ensure everything is ready

    return () => clearTimeout(timer)
  }, [])

  // Load Wistia scripts
  useEffect(() => {
    // Load Wistia player script
    const loadWistiaScript = () => {
      const script = document.createElement('script')
      script.src = 'https://fast.wistia.com/player.js'
      script.async = true
      script.onload = () => {
        // Load the specific video embed script
        const embedScript = document.createElement('script')
        embedScript.src = 'https://fast.wistia.com/embed/a17g5esmgo.js'
        embedScript.async = true
        embedScript.type = 'module'
        embedScript.onload = () => {
          setWistiaLoaded(true)
        }
        document.head.appendChild(embedScript)
      }
      document.head.appendChild(script)
    }

    // Check if Wistia is already loaded
    if (typeof window !== 'undefined' && !window.Wistia) {
      loadWistiaScript()
    } else {
      setWistiaLoaded(true)
    }
  }, [])

  // If not fully mounted, show nothing to prevent flash
  if (!isFullyMounted) {
    return null
  }

  return (
    <>
      <PageExitTracker />
      <Head>
        <title>Solar Boss Automations - Launch Your Remote Solar Business</title>
        <meta
          name="description"
          content="Watch our exclusive video to learn how to launch your first 6-7 figure remote solar business while our team builds everything for you."
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "VideoObject",
              name: "Launch Your Remote Solar Business",
              description:
                "Learn how to launch your first 6-7 figure remote solar business while our team builds everything for you.",
              thumbnailUrl: "https://solarbossautomations.com/video-thumbnail.jpg",
              uploadDate: "2025-01-01",
              duration: "PT15M",
              contentUrl: "https://fast.wistia.net/embed/iframe/a17g5esmgo",
              embedUrl: "https://fast.wistia.net/embed/iframe/a17g5esmgo",
            }),
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              wistia-player[media-id='a17g5esmgo']:not(:defined) {
                background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/a17g5esmgo/swatch');
                display: block;
                filter: blur(5px);
                padding-top:56.25%;
              }
            `,
          }}
        />
      </Head>
      <div
        className="min-h-screen"
        style={{
          opacity: isFullyMounted ? 1 : 0,
          transition: "opacity 0.3s ease-in-out",
        }}
      >


        <main className="w-full py-4">
          {/* Hero Section with reserved space */}
          <div className="container mx-auto px-4">
            <div className="text-center mb-0 min-h-[100px] sm:min-h-[120px] md:min-h-[140px] flex flex-col justify-center">
              <div
                className={`transition-all duration-600 ease-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: "100ms" }}
              >
                {/* Modified headline for variant 1 */}
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 leading-tight px-1 max-w-5xl mx-auto">
                  <span className="block text-center">
                    Máš hezkej obličej, dobrej vibe a nebojíš se mluvit? <span className="text-gradient-gold">Hledáme tě jako tvář AI modelky!</span>
                  </span>
                </h1>
              </div>
            </div>
          </div>

          {/* Subtitle with reserved space */}
          <div className="container mx-auto px-4">
            <div className="min-h-[50px] sm:min-h-[40px] flex items-center justify-center mb-4 px-2">
              <div
                className={`transition-all duration-600 ease-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: "200ms" }}
              >
                <p className="text-sm xs:text-base sm:text-lg text-center max-w-4xl mx-auto leading-relaxed px-2">
                  20–50k měsíčně. 3h denně. Fix + bonusy. <span className="text-gradient-gold">Žádné focení, žádný tlak, všechno tě naučíme.</span>
                </p>
              </div>
            </div>
          </div>

          {/* Video Player with reserved space */}
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto mb-4">
              <div
                className={`transition-all duration-600 ease-out ${isLoaded ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"}`}
                style={{ transitionDelay: "300ms" }}
              >
                <div className="glow-card rounded-lg overflow-hidden">
                  <div
                    className="wistia_responsive_padding"
                    style={{
                      padding: "56.25% 0 0 0",
                      position: "relative",
                    }}
                  >
                    <div
                      className="wistia_responsive_wrapper"
                      style={{
                        height: "100%",
                        left: 0,
                        position: "absolute",
                        top: 0,
                        width: "100%",
                      }}
                    >
                      {wistiaLoaded ? (
                        <wistia-player media-id="a17g5esmgo" aspect="1.7777777777777777"></wistia-player>
                      ) : (
                        <div 
                          style={{
                            background: "center / contain no-repeat url('https://fast.wistia.com/embed/medias/a17g5esmgo/swatch')",
                            display: "block",
                            filter: "blur(5px)",
                            paddingTop: "56.25%",
                            width: "100%",
                            height: "100%"
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action with reserved space */}
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto mb-4 text-center min-h-[120px] sm:min-h-[140px] flex flex-col justify-center">
              <div
                className={`transition-all duration-600 ease-out ${isLoaded ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"}`}
                style={{ transitionDelay: "400ms" }}
              >
                <button
                  onClick={() => {
                    // Track the Apply Now button click
                    trackApplyNowClick()

                    // Get current URL parameters (including UTMs)
                    const currentParams = new URLSearchParams(window.location.search)
                    const applynowUrl = `/applynow?${currentParams.toString()}`

                    console.log("Navigating to applynow with UTMs:", applynowUrl)
                    router.push(applynowUrl)
                  }}
                  className="btn-primary flex items-center justify-center w-full text-lg sm:text-2xl md:text-3xl font-bold py-4 sm:py-6 px-3 sm:px-8 rounded-xl gap-2 sm:gap-4 shadow-2xl transform hover:scale-[1.02]"
                  style={{
                    minHeight: "64px",
                  }}
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    style={{
                      width: "24px",
                      height: "24px",
                    }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  <span className="leading-tight">👠 Udělej První Krok</span>
                </button>
              </div>
            </div>
          </div>



          {/* FAQ Section with reserved space */}
          <div className="container mx-auto px-4">
            <div className="mt-12 md:mt-16 lg:mt-20 mb-12 min-h-[400px] md:min-h-[300px]">
              <div
                className={`transition-all duration-600 ease-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{ transitionDelay: "500ms" }}
              >
                <div className="text-center mb-8">
                  <p className="text-gradient-gold text-sm sm:text-base md:text-lg font-medium">
                    CO MŮŽEŠ OČEKÁVAT
                  </p>
                </div>

                {/* Trust Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto mb-12">
                  {/* 💸 20–50k Měsíčně Z Pohodlí Domova */}
                  <div
                    className={`stats-card-primary p-6 text-center hover:border-[rgb(var(--neon-orchid))]/50 transition-all duration-300 hover:shadow-lg ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                    style={{ transitionDelay: "600ms", minHeight: "180px" }}
                  >
                    <div className="w-12 h-12 bg-[rgb(var(--neon-orchid))]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">💸</span>
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">20–50k Měsíčně Z Pohodlí Domova</h3>
                    <p className="text-gray-400 text-xs mt-2">Fixní základ + provize. Vydělávej anonymně z počítače — bez složitostí.</p>
                  </div>

                  {/* 👑 Parta, Co Tě Nakopne */}
                  <div
                    className={`stats-card-gold p-6 text-center hover:border-[rgb(var(--sunset-gold))]/50 transition-all duration-300 hover:shadow-lg ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                    style={{ transitionDelay: "700ms", minHeight: "180px" }}
                  >
                    <div className="w-12 h-12 bg-[rgb(var(--sunset-gold))]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">👑</span>
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">Parta, Co Tě Nakopne</h3>
                    <p className="text-gray-400 text-xs mt-2">Mladí, chytří, ambiciózní. Makáme online, bavíme se offline. Ne agentura – team.</p>
                  </div>

                  {/* 🎭 Tvoje Identita = V Bezpečí */}
                  <div
                    className={`stats-card-crimson p-6 text-center hover:border-[rgb(var(--crimson))]/50 transition-all duration-300 hover:shadow-lg ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                    style={{ transitionDelay: "800ms", minHeight: "180px" }}
                  >
                    <div className="w-12 h-12 bg-[rgb(var(--crimson))]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🎭</span>
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">Tvoje Identita = V Bezpečí</h3>
                    <p className="text-gray-400 text-xs mt-2">Využíváme AI – ty jsi hlas a vibe. Není potřeba nic natáčet ani ukazovat. Vždy anonymní. Vždy s podporou.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer - now controlled by the same loading state */}
        <div
          className={`transition-all duration-600 ease-out ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionDelay: "900ms" }}
        >
          <Footer />
        </div>


      </div>
    </>
  )
}


