"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaBars, FaXmark, FaWhatsapp } from "react-icons/fa6";
import styles from "./navigation.module.css";

/* ===== Données (modifie ici) ===== */
const site = {
  name: "FlowFit",
  logo: "/LogoMarcial.png",
  logoFallback: "/logo-flowfit.svg", // utilisé si le PNG est introuvable
  whatsappNumber: "2250703059686", // même numéro que page.js
};

const navLinks = [
  { label: "Accueil", href: "#accueil" },
  { label: "Séances", href: "#seances" },
  { label: "Tarifs", href: "#tarifs" },
  { label: "Le coach", href: "#coach" },
  { label: "Méthode", href: "#methode" },
  { label: "FAQ", href: "#faq" },
];

const whatsappHref = `https://wa.me/${site.whatsappNumber}`;

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoSrc, setLogoSrc] = useState(site.logo);

  /* Fond plein dès qu'on a défilé */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Bloque le défilement de la page quand le menu mobile est ouvert */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* Ferme le menu avec Échap, et si on repasse en affichage desktop */
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 901px)");
    const onMq = (e) => e.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  return (
    <header className={`${styles.header} ${scrolled || open ? styles.solid : ""}`}>
      <div className={styles.inner}>
        <a href="#accueil" className={styles.logo} aria-label={site.name}>
          <Image
            src={logoSrc}
            alt={site.name}
            width={160}
            height={48}
            priority
            onError={() => {
              if (logoSrc !== site.logoFallback) setLogoSrc(site.logoFallback);
            }}
          />
        </a>

        <nav className={styles.nav} aria-label="Navigation principale">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={styles.cta}>
          <FaWhatsapp aria-hidden="true" />
          Nous contacter
        </a>

        <button
          type="button"
          className={styles.burger}
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          aria-controls="menu-mobile"
        >
          {open ? <FaXmark aria-hidden="true" /> : <FaBars aria-hidden="true" />}
        </button>
      </div>

      <div id="menu-mobile" className={`${styles.menu} ${open ? styles.menuOpen : ""}`} inert={!open}>
        {navLinks.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.menuCta}
          onClick={() => setOpen(false)}
        >
          Nous contacter sur WhatsApp
        </a>
      </div>
    </header>
  );
}