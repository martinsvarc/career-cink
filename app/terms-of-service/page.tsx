import Link from "next/link"

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">


      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        <div className="premium-card rounded-xl p-6 md:p-8">
          <div className="prose prose-invert max-w-none">
            <h2 className="text-xl md:text-2xl font-bold premium-text mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing or using the website operated by Martin Svarc ("we", "us", or "our"), you agree to these Terms of Service. If you do not accept these terms in full, you must not use this website or any associated services.
            </p>

            <h2 className="text-xl md:text-2xl font-bold premium-text mt-8 mb-4">2. Intellectual Property</h2>
            <p>
              All content on this site — including but not limited to code, design, visuals, video, audio, and brand marks — is the exclusive property of Martin Svarc or its licensors.
            </p>
            <p className="mt-4">
              You may not copy, distribute, reproduce, or use any part of the site for commercial purposes without written consent.
            </p>

            <h2 className="text-xl md:text-2xl font-bold premium-text mt-8 mb-4">3. User Commitments</h2>
            <p>By using our website or services, you confirm that:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You are at least 18 years old or the legal age of majority in your jurisdiction</li>
              <li>You are providing accurate, up-to-date information</li>
              <li>You will not use automation (bots/scripts) to access or manipulate our systems</li>
              <li>You will comply with all applicable laws</li>
            </ul>
            <p className="mt-4">
              We reserve the right to revoke access if misuse, fraud, or violation is suspected.
            </p>

            <h2 className="text-xl md:text-2xl font-bold premium-text mt-8 mb-4">4. User Accounts</h2>
            <p>
              If registration is required, you are responsible for keeping your login credentials confidential. We may revoke or change usernames we find inappropriate.
            </p>

            <h2 className="text-xl md:text-2xl font-bold premium-text mt-8 mb-4">5. Payments</h2>
                          <p>Martin Svarc accepts Visa, Mastercard, Amex, and Discover.</p>
            <p className="mt-4">
              By making a purchase, you agree to provide accurate billing info and update it when necessary. Charges are processed securely.
            </p>

            <h2 className="text-xl md:text-2xl font-bold premium-text mt-8 mb-4">6. Cancellations</h2>
            <p>
              Subscriptions may be canceled at any time via your account or by contacting martinsvarcbus@gmail.com.
            </p>
            <p className="mt-4">
              Cancellations take effect at the end of the billing period. No partial refunds unless otherwise specified.
            </p>

            <h2 className="text-xl md:text-2xl font-bold premium-text mt-8 mb-4">7. Prohibited Use</h2>
            <p>You may not use this platform to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Violate laws or regulations</li>
              <li>Infringe on intellectual property</li>
              <li>Reverse engineer, scrape, or clone our systems</li>
              <li>Engage in abusive, threatening, or harmful behavior</li>
            </ul>
            <p className="mt-4">
              We reserve the right to ban users without notice if violations occur.
            </p>

            <h2 className="text-xl md:text-2xl font-bold premium-text mt-8 mb-4">8. Disclaimers</h2>
            <p>
              All services and content are provided as-is, as-available.
            </p>
            <p className="mt-4">
              We do not guarantee uptime, earnings, or specific outcomes.
            </p>
            <p className="mt-4">
              Use is at your own risk.
            </p>

            <h2 className="text-xl md:text-2xl font-bold premium-text mt-8 mb-4">9. Limitation of Liability</h2>
            <p>
              Martin Svarc is not liable for indirect, incidental, or consequential damages — including loss of profit, data, or business — even if we were advised of the possibility.
            </p>

            <h2 className="text-xl md:text-2xl font-bold premium-text mt-8 mb-4">10. Indemnification</h2>
            <p>
              You agree to indemnify and hold Martin Svarc, its affiliates, team members, and partners harmless from any claims, damages, or legal fees arising from your use of the site or violation of these terms.
            </p>

            <h2 className="text-xl md:text-2xl font-bold premium-text mt-8 mb-4">11. Changes</h2>
            <p>
              We may update these Terms at any time. Material changes will be posted here. Continued use means continued agreement.
            </p>

            <h2 className="text-xl md:text-2xl font-bold premium-text mt-8 mb-4">12. Contact</h2>
            <p>
              For questions, disputes, or support:
            </p>
            <p className="mt-2">
              📧 <span className="premium-text font-semibold">martinsvarcbus@gmail.com</span>
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-[#7A5C2E]/30">
            <Link href="/" className="premium-text hover:text-[#e7c078] font-medium flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Return to Home
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="premium-gradient-subtle py-6 md:py-8">
        <div className="container mx-auto px-4 text-center max-w-6xl">
          <p className="text-sm md:text-base text-black">Copyright 2025 Martin Svarc</p>
          <div className="flex justify-center gap-4 md:gap-6 mt-2">
            <Link
              href="/privacy-policy"
              className="text-black/80 hover:text-black transition-colors text-xs md:text-sm font-medium"
            >
              Privacy Policy
            </Link>
            <span className="text-black/50">|</span>
            <Link
              href="/terms-of-service"
              className="text-black/80 hover:text-black transition-colors text-xs md:text-sm font-medium"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
