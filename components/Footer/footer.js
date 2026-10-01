import Image from "next/image";
import { FaPhone, FaWhatsapp, FaInstagram, FaTiktok, FaFacebook } from "react-icons/fa6";
import styles from "./footer.module.css";

/* ===== Données (modifie ici) ===== */
const site = {
  name: "Ton Coach",
  role: "Coach sportif",
  logo: "/LogoMarcial.svg",
  whatsappNumber: "2250700000000", // format international, sans + ni espaces (jamais affiché)
  year: new Date().getFullYear(),
};

const socials = [
  { label: "WhatsApp", icon: FaWhatsapp, href: `https://wa.me/${site.whatsappNumber}` },
  { label: "Instagram", icon: FaInstagram, href: "" }, // vide = masqué
  { label: "TikTok", icon: FaTiktok, href: "" },
  { label: "Facebook", icon: FaFacebook, href: "" },
];

export default function Footer() {
  const links = socials.filter((s) => s.href);

  return (
    <footer className={styles.footer}>
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

        <div className={styles.contact}>
          <p className={styles.contactTitle}>Contacte-moi</p>
          <ul className={styles.socials}>
            <li>
              <a href={`tel:+${site.whatsappNumber}`} aria-label="Appeler le coach">
                <FaPhone aria-hidden="true" />
              </a>
            </li>
            {links.map(({ label, icon: Icon, href }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
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