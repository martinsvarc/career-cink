import Link from "next/link"

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">


      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        <div className="premium-card rounded-xl p-6 md:p-8">
          <div className="prose prose-invert max-w-none">
            <h2 className="text-xl md:text-2xl font-bold premium-text mb-4">Introduction</h2>
            <p>
              Cink™ ("we", "us", or "our") respects your privacy. This Privacy Policy explains how we collect, use, store, and share information you provide while using our website and services.
            </p>

            <h2 className="text-xl md:text-2xl font-bold premium-text mt-8 mb-4">What We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Personal Identifiers:</strong> Name, email, phone number, or any contact details you provide
              </li>
              <li>
                <strong>Technical Data:</strong> IP address, device type, browser, location, and browsing behavior
              </li>
              <li>
                <strong>Usage Data:</strong> Interactions with our website, including clicks, page views, and navigation paths
              </li>
              <li>
                <strong>Third-Party Data:</strong> Information received from tools, platforms, or partners we use for marketing or analytics
              </li>
            </ul>

            <h2 className="text-xl md:text-2xl font-bold premium-text mt-8 mb-4">How We Collect It</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Directly from you:</strong> When you fill out forms, contact us, or subscribe</li>
              <li><strong>Automatically:</strong> Through cookies, tracking tools, and session data</li>
              <li><strong>Via partners:</strong> From advertising platforms, CRM tools, or integrations</li>
            </ul>

            <h2 className="text-xl md:text-2xl font-bold premium-text mt-8 mb-4">How We Use It</h2>
            <p>Your data helps us:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide and improve our services</li>
              <li>Respond to your inquiries or requests</li>
              <li>Send transactional or marketing communications</li>
              <li>Comply with legal obligations or enforce our Terms</li>
              <li>Optimize user experience and measure performance</li>
            </ul>

            <h2 className="text-xl md:text-2xl font-bold premium-text mt-8 mb-4">Sharing Your Info</h2>
            <p>We may share data with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Trusted service providers (hosting, email, analytics)</li>
              <li>Our affiliates or subsidiaries</li>
              <li>Buyers or partners in the event of a business sale or merger</li>
              <li>As required by law or to protect our rights</li>
            </ul>
            <p className="mt-4">
              <strong>We never sell your personal data.</strong>
            </p>

            <h2 className="text-xl md:text-2xl font-bold premium-text mt-8 mb-4">Data Security</h2>
            <p>
              We protect your data with modern security measures, including encryption, firewalls, and secure access controls.
            </p>
            <p className="mt-4">
              However, no internet transmission is 100% secure. Submitting information is at your own risk.
            </p>

            <h2 className="text-xl md:text-2xl font-bold premium-text mt-8 mb-4">Policy Updates</h2>
            <p>
              We may update this policy as needed. If material changes occur, we'll notify you on this site. Please review it periodically.
            </p>

            <h2 className="text-xl md:text-2xl font-bold premium-text mt-8 mb-4">Contact</h2>
            <p>
              Questions? Email us at{" "}
              <span className="premium-text font-semibold">privacy@cinktm.com</span>
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
          <p className="text-sm md:text-base text-black">Copyright 2025 Cink™</p>
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
