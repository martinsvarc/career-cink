import Link from "next/link"

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">


      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        <div className="premium-card rounded-xl p-6 md:p-8">
          <div className="prose prose-invert max-w-none">
            <h2 className="text-xl md:text-2xl font-bold premium-text mb-4">Úvod</h2>
            <p>
              Martin Svarc ("my", "nás", nebo "naše společnost") respektuje vaše soukromí. Tyto zásady ochrany osobních údajů vysvětlují, jak shromažďujeme, používáme, ukládáme a sdílíme informace, které nám poskytujete při používání našich webových stránek a služeb.
            </p>

            <h2 className="text-xl md:text-2xl font-bold premium-text mt-8 mb-4">Právní základ zpracování (článek 6 GDPR)</h2>
            <p>Vaše osobní údaje zpracováváme na základě:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Plný souhlas (čl. 6 odst. 1 písm. a) GDPR):</strong> Pro marketingové účely a analytické cookies
              </li>
              <li>
                <strong>Plnění smlouvy (čl. 6 odst. 1 písm. b) GDPR):</strong> Pro zpracování vaší přihlášky na pracovní pozici
              </li>
              <li>
                <strong>Oprávněný zájem (čl. 6 odst. 1 písm. f) GDPR):</strong> Pro zlepšení našich služeb a bezpečnost
              </li>
            </ul>

            <h2 className="text-xl md:text-2xl font-bold premium-text mt-8 mb-4">Jaké údaje shromažďujeme</h2>
            <p>Můžeme shromažďovat následující typy informací:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Osobní identifikátory:</strong> Jméno, email, telefonní číslo nebo jiné kontaktní údaje, které poskytnete
              </li>
              <li>
                <strong>Technická data:</strong> IP adresa, typ zařízení, prohlížeč, lokalizace a chování při procházení
              </li>
              <li>
                <strong>Data o používání:</strong> Interakce s našimi webovými stránkami včetně kliknutí, zobrazení stránek a navigačních cest
              </li>
              <li>
                <strong>Data třetích stran:</strong> Informace přijaté od nástrojů, platforem nebo partnerů, které používáme pro marketing nebo analýzu
              </li>
            </ul>

            <h2 className="text-xl md:text-2xl font-bold premium-text mt-8 mb-4">Jak je shromažďujeme</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Přímo od vás:</strong> Když vyplníte formuláře, kontaktujete nás nebo se přihlásíte k odběru</li>
              <li><strong>Automaticky:</strong> Prostřednictvím cookies, sledovacích nástrojů a dat o relaci</li>
              <li><strong>Prostřednictvím partnerů:</strong> Z reklamních platforem, CRM nástrojů nebo integrací</li>
            </ul>

            <h2 className="text-xl md:text-2xl font-bold premium-text mt-8 mb-4">Jak je používáme</h2>
            <p>Vaše data nám pomáhají:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Poskytovat a zlepšovat naše služby</li>
              <li>Reagovat na vaše dotazy nebo požadavky</li>
              <li>Odesílat transakční nebo marketingové komunikace</li>
              <li>Plnit právní povinnosti nebo vymáhat naše podmínky</li>
              <li>Optimalizovat uživatelskou zkušenost a měřit výkonnost</li>
            </ul>

            <h2 className="text-xl md:text-2xl font-bold premium-text mt-8 mb-4">Sdílení vašich informací</h2>
            <p>Můžeme sdílet data s:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Důvěryhodnými poskytovateli služeb (hosting, email, analýza)</li>
              <li>Našimi pobočkami nebo dceřinými společnostmi</li>
              <li>Kupci nebo partnery v případě prodeje nebo fúze podniku</li>
              <li>Podle zákona nebo k ochraně našich práv</li>
            </ul>
            <p className="mt-4">
              <strong>Nikdy neprodáváme vaše osobní údaje.</strong>
            </p>

            <h2 className="text-xl md:text-2xl font-bold premium-text mt-8 mb-4">Vaše práva (články 15-22 GDPR)</h2>
            <p>Máte právo:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Právo na přístup (čl. 15):</strong> Získat informace o tom, jaké údaje o vás zpracováváme</li>
              <li><strong>Právo na opravu (čl. 16):</strong> Opravit nepřesné nebo neúplné údaje</li>
              <li><strong>Právo na výmaz (čl. 17):</strong> Požádat o smazání vašich údajů ("právo být zapomenut")</li>
              <li><strong>Právo na omezení zpracování (čl. 18):</strong> Omezit způsob, jakým zpracováváme vaše údaje</li>
              <li><strong>Právo na přenositelnost (čl. 20):</strong> Získat vaše údaje ve strukturovaném formátu</li>
              <li><strong>Právo vznést námitku (čl. 21):</strong> Namítnout proti zpracování vašich údajů</li>
              <li><strong>Právo odvolat souhlas (čl. 7):</strong> Odvolat souhlas kdykoliv</li>
            </ul>

            <h2 className="text-xl md:text-2xl font-bold premium-text mt-8 mb-4">Doba uchovávání údajů</h2>
            <p>Vaše osobní údaje uchováváme pouze po dobu nezbytně nutnou:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Přihlášky na pracovní pozice:</strong> 2 roky od data přihlášky</li>
              <li><strong>Marketingové údaje:</strong> Do odvolání souhlasu nebo 3 roky</li>
              <li><strong>Analytická data:</strong> 26 měsíců</li>
              <li><strong>Technické logy:</strong> 12 měsíců</li>
            </ul>

            <h2 className="text-xl md:text-2xl font-bold premium-text mt-8 mb-4">Bezpečnost údajů</h2>
            <p>
              Chráníme vaše údaje moderními bezpečnostními opatřeními včetně šifrování, firewallů a bezpečnostních přístupových kontrol.
            </p>
            <p className="mt-4">
              Nicméně žádný internetový přenos není 100% bezpečný. Odesílání informací je na vaše vlastní riziko.
            </p>

            <h2 className="text-xl md:text-2xl font-bold premium-text mt-8 mb-4">Aktualizace zásad</h2>
            <p>
              Tyto zásady můžeme podle potřeby aktualizovat. Pokud dojde k významným změnám, upozorníme vás na těchto stránkách. Prosím, pravidelně je kontrolujte.
            </p>

            <h2 className="text-xl md:text-2xl font-bold premium-text mt-8 mb-4">Kontakt</h2>
            <p>
              Otázky? Napište nám na{" "}
              <span className="premium-text font-semibold">martinsvarcbus@gmail.com</span>
            </p>

            <h2 className="text-xl md:text-2xl font-bold premium-text mt-8 mb-4">Registrace zpracování údajů</h2>
            <p className="mt-2">
              <strong>Číslo registrace zpracování údajů:</strong> P1234567 (nahraďte skutečným číslem, pokud existuje)
            </p>

            <h2 className="text-xl md:text-2xl font-bold premium-text mt-8 mb-4">Pověřenec pro ochranu osobních údajů (DPO)</h2>
            <p>
              Pro otázky týkající se ochrany osobních údajů můžete kontaktovat našeho pověřence pro ochranu osobních údajů:
            </p>
            <p className="mt-2">
              Email: <span className="premium-text font-semibold">martinsvarcbus@gmail.com</span><br />
              Adresa: Stachy 230, 384 73<br />
              Telefon: +420722356856
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
