import "./globals.css";
import { Inter, Anton, Orbitron } from "next/font/google";
import Navigation from "@/components/Navigation/navigation";
import Footer from "@/components/Footer/footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton", display: "swap" });
// Police large et géométrique, proche de celle de la maquette
const orbitron = Orbitron({ subsets: ["latin"], weight: ["500", "700", "800"], variable: "--font-orbitron", display: "swap" });

// ⚠️ Remplace par ton vrai nom de domaine (idéalement via une variable d'environnement)
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.coachmarcial.com";
const SITE_NAME = "Coach Marcial";
const SITE_TITLE = "Coach Marcial | Coach sportif & Personal Trainer à Abidjan";
const SITE_DESCRIPTION =
  "Coach Marcial t'accompagne dans tes objectifs sportifs à Abidjan : coaching personnalisé à domicile, en salle et en plein air. Perte de poids, prise de muscle, remise en forme.";

export const metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "Coach Marcial",
    "coach sportif",
    "coach sportif Abidjan",
    "personal trainer",
    "personal trainer Abidjan",
    "coaching à domicile",
    "coaching sportif Côte d'Ivoire",
    "fitness",
    "musculation",
    "perte de poids",
    "prise de masse",
    "remise en forme",
    "Abidjan",
  ],
  authors: [{ name: "Coach Marcial", url: SITE_URL }],
  creator: "Coach Marcial",
  publisher: "Coach Marcial",
  category: "sports",

  alternates: {
    canonical: "/",
    languages: { "fr-CI": "/", fr: "/" },
  },

  // Icônes (favicon, onglet, iOS, raccourcis)
  icons: {
    icon: [
      { url: "/LogoMarcial.svg", type: "image/svg+xml" },
      { url: "/LogoMarcial.png", type: "image/png", sizes: "any" },
    ],
    shortcut: "/LogoMarcial.png",
    apple: [{ url: "/LogoMarcial.png", type: "image/png" }],
  },

  // Open Graph (Facebook, WhatsApp, LinkedIn...)
  openGraph: {
    type: "website",
    locale: "fr_CI",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/LogoMarcial.png",
        alt: "Logo Coach Marcial",
      },
    ],
  },

  // Twitter / X
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/LogoMarcial.png"],
  },

  // Indexation
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  // Vérification Google Search Console (décommente et ajoute ton code)
  // verification: {
  //   google: "TON_CODE_GOOGLE",
  // },

  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#171a26",
  colorScheme: "dark",
};

// Données structurées (JSON-LD) pour le SEO local
const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["SportsActivityLocation", "LocalBusiness"],
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  logo: `${SITE_URL}/LogoMarcial.png`,
  image: `${SITE_URL}/LogoMarcial.png`,
  areaServed: {
    "@type": "City",
    name: "Abidjan",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Abidjan",
    addressCountry: "CI",
  },
  priceRange: "$$",
   telephone: "+2250703059686",
   sameAs: [
     "https://www.instagram.com/invites/contact/?utm_content=z9cvx0d&psln=yankkfv1tlzh",
    "https://www.facebook.com/Coachmarcial1/",
    "https://www.tiktok.com/@coachmarcial1",
   ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${anton.variable} ${orbitron.variable}`}>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}