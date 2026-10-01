import "./globals.css";
import { Inter, Anton, Orbitron } from "next/font/google";
import Navigation from "@/components/Navigation/navigation";
import Footer from "@/components/Footer/footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton", display: "swap" });
// Police large et géométrique, proche de celle de la maquette
const orbitron = Orbitron({ subsets: ["latin"], weight: ["500", "700", "800"], variable: "--font-orbitron", display: "swap" });

export const metadata = {
  title: "Coach Marcial | Personal Trainer",
  description:
    "Coach Marcial t'accompagne dans tes objectifs sportifs à domicile, en salle et en plein air.",
  keywords: ["Coach Marcial", "coach sportif", "personal trainer", "coaching à domicile", "fitness", "Abidjan"],
  authors: [{ name: "Coach Marcial" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#171a26",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} ${anton.variable} ${orbitron.variable}`}>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}