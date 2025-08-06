import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-[rgb(var(--obsidian))] text-[rgb(var(--pearl))] py-16 px-4 border-t border-[rgb(var(--velvet-gray))]">
      <div className="max-w-5xl mx-auto text-center">
        {/* Copyright */}
        <div className="mb-8">
          <p className="text-[rgb(var(--muted-foreground))] text-sm">© 2025 Martin Svarc. All rights reserved.</p>
        </div>

        {/* Legal Disclaimers */}
        <div className="text-sm leading-relaxed space-y-6 text-[rgb(var(--muted-foreground))] mb-8">
          {/* Czech Legal Information - Subtle Integration */}
          <div className="mt-8 max-w-4xl mx-auto">
            <div className="space-y-1 text-xs text-neutral-500">
              <p><strong>Zaměstnavatel:</strong> <span className="hover:underline cursor-pointer">Martin Svarc</span> ICO: <span className="hover:underline cursor-pointer">09468757</span></p>
              <p><strong>Typ pracovní pozice:</strong> Práce na fakturu - musíte být OSVČ</p>
              <p><strong>Prohlášení:</strong> Tato společnost je zaměstnavatelem poskytujícím rovné příležitosti.</p>
              <p><strong>Poznámka:</strong> Výše uvedené výdělky jsou orientační a závisí na výkonu a výsledcích.</p>
            </div>
          </div>

          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[rgb(var(--sunset-gold))]/30 to-transparent mx-auto"></div>

          <p className="max-w-4xl mx-auto">
            This site is owned and operated by Martin Svarc. By using it, you agree to our Terms of Service and Privacy Policy.
          </p>

          <div className="w-24 h-px bg-gradient-to-r from-transparent via-[rgb(var(--sunset-gold))]/30 to-transparent mx-auto"></div>

          <p className="max-w-4xl mx-auto">
            Martin Svarc provides elite systems, consulting, and training in marketing and communication. We do not offer business opportunities, quick-rich schemes, or guaranteed income. Our job is to deliver tools, strategies, and support — your results depend on your execution.
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
            We may reference third-party tools or services. These are for context only. Occasionally, we may collaborate with partners — some of which may share ownership or interests with Martin Svarc.
          </p>
        </div>

        {/* Legal Links */}
        <div className="mt-8 pt-4 border-t border-[rgb(var(--velvet-gray))]">
          <div className="flex justify-center items-center space-x-8 text-sm">
            <Link
              href="/privacy-policy"
              className="text-[rgb(var(--sunset-gold))] hover:text-[rgb(var(--neon-orchid))] transition-colors duration-300 underline underline-offset-4"
            >
              Privacy Policy
            </Link>
            <span className="text-[rgb(var(--velvet-gray))]">|</span>
            <Link
              href="/terms-of-service"
              className="text-[rgb(var(--sunset-gold))] hover:text-[rgb(var(--neon-orchid))] transition-colors duration-300 underline underline-offset-4"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
