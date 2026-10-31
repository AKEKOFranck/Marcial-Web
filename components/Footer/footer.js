import Image from "next/image";
import {
  FaPhone,
  FaMobileScreenButton,
  FaWhatsapp,
  FaInstagram,
  FaTiktok,
  FaFacebook,
} from "react-icons/fa6";
import styles from "./footer.module.css";

/* ===== Données (modifie ici) ===== */
const site = {
  name: "Coach Marcial",
  role: "Coach sportif",
  logo: "/LogoMarcial.svg",
  whatsappNumber: "2250703059686", // format international, sans + ni espaces
  year: new Date().getFullYear(),
};

/* external: true = s'ouvre dans un nouvel onglet (les liens tel: restent dans la page) */
const contacts = [
  {
    label: "Appeler le coach (ligne 1)",
    icon: FaPhone,
    href: "tel:+2250703059686",
    external: false,
  },
  {
    label: "Appeler le coach (ligne 2)",
    icon: FaMobileScreenButton,
    href: "tel:+2250759513028",
    external: false,
  },
  {
    label: "WhatsApp",
    icon: FaWhatsapp,
    href: `https://wa.me/${site.whatsappNumber}`,
    external: true,
  },
  {
    label: "Instagram",
    icon: FaInstagram,
    href: "https://www.instagram.com/invites/contact/?utm_content=z9cvx0d&psln=yankkfv1tlzh",
    external: true,
  },
  {
    label: "TikTok",
    icon: FaTiktok,
    href: "https://www.tiktok.com/@coachmarcial1",
    external: true,
  },
  {
    label: "Facebook",
    icon: FaFacebook,
    href: "https://www.facebook.com/Coachmarcial1/",
    external: true,
  },
];

const navLinks = [
  { label: "Séances", href: "/#seances" },
  { label: "Tarifs", href: "/#tarifs" },
  { label: "Le coach", href: "/#coach" },
  { label: "FAQ", href: "/#faq" },
  { label: "Réserver", href: "/#reservation" },
];

export default function Footer() {
  const items = contacts.filter((c) => c.href); // href vide = masqué

  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Image
            src={site.logo}
            alt={site.name}
            width={160}
            height={46}
            className={styles.logo}
          />
          <p>
            {site.role} : séances à domicile, en salle et en plein air, pensées
            pour tes objectifs.
          </p>
        </div>

        <nav aria-label="Pied de page">
          <p className={styles.contactTitle}>Navigation</p>
          <ul className={styles.navList}>
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.contact}>
          <p className={styles.contactTitle}>Contacte-moi</p>
          <ul className={styles.socials}>
            {items.map(({ label, icon: Icon, href, external }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  title={label}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  <Icon aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>
          © {site.year} {site.name}. Tous droits réservés.
        </p>
        <a href="#accueil">Retour en haut</a>
      </div>
    </footer>
  );
}