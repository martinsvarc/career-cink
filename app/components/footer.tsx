export default function Footer() {
  return (
    <footer className="bg-[rgb(var(--obsidian))] text-[rgb(var(--pearl))] py-16 px-4 border-t border-[rgb(var(--velvet-gray))]">
      <div className="max-w-5xl mx-auto text-center">
        {/* Copyright */}
        <div className="mb-8">
          <p className="text-[rgb(var(--muted-foreground))] text-sm">© 2025 Cink™. All rights reserved.</p>
        </div>

        {/* Disclaimer Content */}
        <div className="text-sm leading-relaxed space-y-6 text-[rgb(var(--muted-foreground))]">
          <p className="max-w-4xl mx-auto">
            This site is owned and operated by Cink™. By using it, you agree to our Terms of Service and Privacy Policy.
          </p>

          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[rgb(var(--sunset-gold))]/30 to-transparent mx-auto"></div>

          <p className="max-w-4xl mx-auto">
            Cink™ provides elite systems, consulting, and training in marketing and communication. We do not offer business opportunities, quick-rich schemes, or guaranteed income. Our job is to deliver tools, strategies, and support — your results depend on your execution.
          </p>

          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[rgb(var(--sunset-gold))]/30 to-transparent mx-auto"></div>

          <p className="max-w-4xl mx-auto">
            We make no claims about specific earnings or outcomes. Every business carries risk. You may lose time, money, or both. What we teach works — but only for those who work.
          </p>

          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[rgb(var(--sunset-gold))]/30 to-transparent mx-auto"></div>

          <p className="max-w-4xl mx-auto">
            Testimonials and results shown are individual experiences. They're not typical or promised. We don't track earnings. We measure success by system rollout, client feedback, and execution quality.
          </p>

          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[rgb(var(--sunset-gold))]/30 to-transparent mx-auto"></div>

          <p className="max-w-4xl mx-auto">
            All content on this site is protected intellectual property. Any unauthorized use, sharing, or duplication is strictly prohibited.
          </p>

          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[rgb(var(--sunset-gold))]/30 to-transparent mx-auto"></div>

          <p className="max-w-4xl mx-auto">
            We may reference third-party tools or services. These are for context only. Occasionally, we may collaborate with partners — some of which may share ownership or interests with Cink™.
          </p>

          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[rgb(var(--sunset-gold))]/30 to-transparent mx-auto"></div>

          {/* Legal Links */}
          <div className="mt-8 pt-4">
            <div className="flex justify-center items-center space-x-8 text-sm">
              <a
                href="/privacy-policy"
                className="text-[rgb(var(--sunset-gold))] hover:text-[rgb(var(--neon-orchid))] transition-colors duration-300 underline underline-offset-4"
              >
                Privacy Policy
              </a>
              <span className="text-[rgb(var(--velvet-gray))]">|</span>
              <a
                href="/terms-of-service"
                className="text-[rgb(var(--sunset-gold))] hover:text-[rgb(var(--neon-orchid))] transition-colors duration-300 underline underline-offset-4"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
