"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaBars, FaXmark, FaCalendarCheck } from "react-icons/fa6";
import styles from "./navigation.module.css";

/* ===== Données (modifie ici) ===== */
const site = {
  name: "Ton Coach",
  logo: "/LogoMarcial.png",
  logoFallback: "/LogoMarcial.svg", // utilisé si le PNG est introuvable
};

const navLinks = [
  { label: "Accueil", href: "#accueil" },
  { label: "Lieux", href: "#lieux" },
  { label: "Le coach", href: "#coach" },
  { label: "Objectifs", href: "#objectifs" },
  { label: "Méthode", href: "#methode" },
  { label: "FAQ", href: "#faq" },
];

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

  /* Ferme le menu avec la touche Échap */
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
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

        <a href="#reservation" className={styles.cta}>
          <FaCalendarCheck aria-hidden="true" />
          Réserver
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

      <div id="menu-mobile" className={`${styles.menu} ${open ? styles.menuOpen : ""}`}>
        {navLinks.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
        <a href="#reservation" className={styles.menuCta} onClick={() => setOpen(false)}>
          Réserver une séance
        </a>
      </div>
    </header>
  );
}