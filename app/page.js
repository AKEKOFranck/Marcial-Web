"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  FaPlay, FaBolt, FaCalendarCheck, FaCheck, FaQuoteLeft,
  FaPlus, FaMinus, FaWhatsapp, FaPhone, FaInstagram, FaTiktok, FaFacebook,
  FaHouse, FaDumbbell, FaTree, FaFire, FaHeartPulse, FaPersonRunning, FaChartLine,
} from "react-icons/fa6";
import styles from "./page.module.css";

/* ==========================================================
   DONNÉES — modifie les valeurs ici (plus de dossier data)
========================================================== */

const site = {
  name: "Ton Coach",
  role: "Coach sportif",
  whatsappNumber: "2250700000000", // format international, sans + ni espaces
  phoneDisplay: "+225 07 00 00 00 00",
};

const socials = [
  { label: "WhatsApp", icon: FaWhatsapp, href: `https://wa.me/${site.whatsappNumber}` },
  { label: "Instagram", icon: FaInstagram, href: "" }, // vide = masqué
  { label: "TikTok", icon: FaTiktok, href: "" },
  { label: "Facebook", icon: FaFacebook, href: "" },
];

const hero = {
  titleLines: ["Dépasse", "tes limites"],
  subtitle: "Coaching sportif personnalisé",
  text: "Des séances à domicile, en salle ou en plein air, construites autour de ton objectif et de ton rythme.",
  cta: "Réserver une séance",
  secondary: "Voir la méthode",
  image: "/images/hero.jpg",
  imageAlt: "Le coach en séance d'entraînement",
};

const ticker = ["Perte de poids", "Prise de muscle", "Remise en forme", "Cardio", "Mobilité"];

const stats = [
  { value: 150, prefix: "+", suffix: "", label: "Clients accompagnés" },
  { value: 5, prefix: "", suffix: " ans", label: "D'expérience" },
  { value: 98, prefix: "", suffix: "%", label: "Clients satisfaits" },
];

const places = [
  { title: "À domicile", icon: FaHouse, image: "/images/domicile.jpg", text: "Je viens chez toi avec le matériel nécessaire. Zéro temps de trajet." },
  { title: "En salle", icon: FaDumbbell, image: "/images/salle.jpg", text: "Accès à des équipements complets pour progresser plus vite." },
  { title: "En plein air", icon: FaTree, image: "/images/plein-air.jpg", text: "Parc, plage, stade : on s'entraîne dehors, avec de l'énergie en plus." },
];

const about = {
  title: "Ton coach",
  image: "/images/coach.jpg",
  paragraphs: [
    "Coach sportif diplômé, j'accompagne des personnes de tous niveaux vers des résultats durables.",
    "Chaque programme est adapté à ton corps, ton emploi du temps et tes objectifs.",
  ],
  specialties: ["Perte de poids", "Musculation", "Préparation physique", "Remise en forme"],
};

const goals = [
  { title: "Perdre du poids", icon: FaFire, text: "Un programme progressif qui brûle les graisses sans te frustrer." },
  { title: "Prendre du muscle", icon: FaDumbbell, text: "Séances de force structurées pour construire une silhouette solide." },
  { title: "Retrouver la forme", icon: FaHeartPulse, text: "Reprends le sport en douceur et regagne en énergie." },
];

const steps = [
  { title: "Premier message", icon: FaWhatsapp, text: "Tu m'écris sur WhatsApp et on parle de ton objectif." },
  { title: "Séance découverte", icon: FaCalendarCheck, text: "On fait le point sur ton niveau et on fixe un plan." },
  { title: "Entraînement", icon: FaPersonRunning, text: "Des séances encadrées, adaptées à ton rythme." },
  { title: "Résultats", icon: FaChartLine, text: "On mesure tes progrès et on ajuste le programme." },
];

const testimonials = [
  { text: "En trois mois, j'ai perdu 8 kg et repris confiance en moi.", author: "Aïcha, 29 ans" },
  { text: "Des séances variées et un vrai suivi. Je recommande à 100 %.", author: "Koffi, 34 ans" },
  { text: "Je n'avais jamais fait de sport. Aujourd'hui je ne m'en passe plus.", author: "Mariam, 41 ans" },
];

const gallery = [
  { label: "Cardio", src: "/images/galerie-1.jpg" },
  { label: "Force", src: "/images/galerie-2.jpg" },
  { label: "Plein air", src: "/images/galerie-3.jpg" },
  { label: "Mobilité", src: "/images/galerie-4.jpg" },
];

const faq = [
  { q: "Je n'ai jamais fait de sport, est-ce pour moi ?", a: "Oui. Chaque programme part de ton niveau actuel, quel qu'il soit." },
  { q: "Faut-il du matériel ?", a: "Non. J'apporte l'essentiel pour les séances à domicile et en plein air." },
  { q: "Combien de séances par semaine ?", a: "En général 2 à 3, selon ton objectif et ta disponibilité." },
  { q: "Comment réserver ?", a: "Remplis le formulaire : ta demande arrive directement sur mon WhatsApp." },
];

const bookingForm = {
  title: "Réserve ta séance",
  text: "Remplis le formulaire, WhatsApp s'ouvre avec ta demande prête à envoyer.",
  submitLabel: "Envoyer sur WhatsApp",
  objectives: ["Perdre du poids", "Prendre du muscle", "Retrouver la forme"],
  places: ["À domicile", "En salle", "En plein air"],
  slots: ["Matin", "Après-midi", "Soir", "Week-end"],
};

/* Image optimisée (next/image, mode fill).
   Le parent doit être en position: relative et avoir une hauteur.
   Se masque proprement si le fichier n'existe pas encore. */
function Photo({ src, alt = "", className, priority = false, sizes = "100vw" }) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={className}
      onError={(e) => (e.currentTarget.style.visibility = "hidden")}
    />
  );
}

/* Chiffre animé quand il entre à l'écran */
function Counter({ value, prefix, suffix }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (t) => {
          const p = Math.min((t - start) / 1200, 1);
          setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {prefix}
      {n}
      {suffix}
    </span>
  );
}

/* Groupe de choix à puces (un seul choix possible) */
function ChipGroup({ legend, options, value, onChange, error }) {
  return (
    <fieldset className={styles.field}>
      <legend className={styles.label}>{legend}</legend>
      <div className={styles.chips}>
        {options.map((o) => (
          <button
            key={o}
            type="button"
            aria-pressed={value === o}
            className={`${styles.chip} ${value === o ? styles.chipOn : ""}`}
            onClick={() => onChange(o)}
          >
            {o}
          </button>
        ))}
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </fieldset>
  );
}

export default function Home() {
  const [activePlace, setActivePlace] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [form, setForm] = useState({ name: "", objective: "", place: "", slot: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const setField = (key, val) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: undefined }));
    setSent(false);
  };

  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (!form.name.trim()) err.name = "Indique ton prénom.";
    if (!form.objective) err.objective = "Choisis un objectif.";
    if (!form.place) err.place = "Choisis un lieu.";
    setErrors(err);
    if (Object.keys(err).length) return;

    const lines = [
      `Bonjour ${site.name}, je souhaite réserver une séance.`,
      "",
      `Nom : ${form.name.trim()}`,
      `Objectif : ${form.objective}`,
      `Lieu : ${form.place}`,
      form.slot ? `Disponibilité : ${form.slot}` : null,
      form.message.trim() ? `Message : ${form.message.trim()}` : null,
    ].filter((l) => l !== null);

    const url = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener");
    setSent(true);
  };

  const socialLinks = socials.filter((s) => s.href);

  return (
    <main className={styles.page}>
      {/* ===== Accueil ===== */}
      <section id="accueil" className={styles.hero}>
        <div className={`${styles.wrap} ${styles.heroGrid}`}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>
              {hero.titleLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h1>
            <p className={styles.heroSub}>{hero.subtitle}</p>
            <p className={styles.heroLead}>{hero.text}</p>
            <div className={styles.heroActions}>
              <a href="#reservation" className={styles.btn}>
                <FaCalendarCheck aria-hidden="true" />
                {hero.cta}
              </a>
              <a href="#methode" className={styles.play}>
                <span className={styles.playIcon}>
                  <FaPlay aria-hidden="true" />
                </span>
                {hero.secondary}
              </a>
            </div>
            <ul className={styles.heroSocials}>
              {socialLinks.map(({ label, icon: Icon, href }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                    <Icon />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.brush} aria-hidden="true" />
            <Photo
              src={hero.image}
              alt={hero.imageAlt}
              className={styles.heroPhoto}
              priority
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* ===== Bandeau défilant ===== */}
      <div className={styles.ticker} aria-hidden="true">
        <div className={styles.track}>
          {[...ticker, ...ticker, ...ticker, ...ticker].map((t, i) => (
            <span key={i} className={styles.tickerItem}>
              {t}
              <FaBolt />
            </span>
          ))}
        </div>
      </div>

      {/* ===== Chiffres ===== */}
      <section className={styles.stats}>
        <div className={`${styles.wrap} ${styles.statsGrid}`}>
          {stats.map((s) => (
            <div key={s.label} className={styles.stat}>
              <strong className={styles.statValue}>
                <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </strong>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Lieux ===== */}
      <section id="lieux" className={styles.section}>
        <div className={styles.wrap}>
          <h2 className={styles.title}>Où veux-tu t&apos;entraîner ?</h2>
          <p className={styles.intro}>Trois formules, un même niveau d&apos;exigence.</p>
          <div className={styles.panels}>
            {places.map((p, i) => {
              const Icon = p.icon;
              return (
                <button
                  key={p.title}
                  type="button"
                  className={`${styles.panel} ${activePlace === i ? styles.panelOn : ""}`}
                  onMouseEnter={() => setActivePlace(i)}
                  onFocus={() => setActivePlace(i)}
                  onClick={() => setActivePlace(i)}
                  aria-expanded={activePlace === i}
                >
                  <Photo
                    src={p.image}
                    className={styles.panelImg}
                    sizes="(max-width: 900px) 100vw, 40vw"
                  />
                  <span className={styles.panelIcon}>
                    <Icon aria-hidden="true" />
                  </span>
                  <span className={styles.panelTitle}>{p.title}</span>
                  <span className={styles.panelText}>{p.text}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Le coach ===== */}
      <section id="coach" className={`${styles.section} ${styles.deep}`}>
        <div className={`${styles.wrap} ${styles.aboutGrid}`}>
          <div className={styles.aboutVisual}>
            <span className={styles.aboutBrush} aria-hidden="true" />
            <Photo
              src={about.image}
              alt={site.name}
              className={styles.aboutPhoto}
              sizes="(max-width: 900px) 100vw, 45vw"
            />
          </div>
          <div>
            <h2 className={styles.title}>{about.title}</h2>
            {about.paragraphs.map((p) => (
              <p key={p} className={styles.intro}>
                {p}
              </p>
            ))}
            <ul className={styles.specs}>
              {about.specialties.map((s) => (
                <li key={s}>
                  <FaCheck aria-hidden="true" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ===== Objectifs ===== */}
      <section id="objectifs" className={styles.section}>
        <div className={styles.wrap}>
          <h2 className={styles.title}>Ton objectif, ton programme</h2>
          <ul className={styles.goals}>
            {goals.map((g) => {
              const Icon = g.icon;
              return (
                <li key={g.title} className={styles.goal}>
                  <Icon className={styles.goalIcon} aria-hidden="true" />
                  <h3 className={styles.goalTitle}>{g.title}</h3>
                  <p className={styles.goalText}>{g.text}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ===== Méthode (rounds) ===== */}
      <section id="methode" className={`${styles.section} ${styles.deep}`}>
        <div className={styles.wrap}>
          <h2 className={styles.title}>Comment ça se passe ?</h2>
          <p className={styles.intro}>
            Jamais travaillé avec un coach ? Voici les quatre rounds, du premier message aux résultats.
          </p>
          <ol className={styles.rounds}>
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <li key={s.title} className={styles.round}>
                  <span className={styles.roundNum}>Round {i + 1}</span>
                  <Icon className={styles.roundIcon} aria-hidden="true" />
                  <h3 className={styles.roundTitle}>{s.title}</h3>
                  <p>{s.text}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ===== Témoignages ===== */}
      <section id="temoignages" className={styles.section}>
        <div className={styles.wrap}>
          <h2 className={styles.title}>Ils ont fait le premier pas</h2>
          <div className={styles.quotes}>
            {testimonials.map((t) => (
              <figure key={t.text} className={styles.quote}>
                <FaQuoteLeft className={styles.quoteIcon} aria-hidden="true" />
                <blockquote>{t.text}</blockquote>
                <figcaption>{t.author}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Galerie ===== */}
      <section className={styles.galleryWrap}>
        <div className={styles.gallery}>
          {gallery.map((g) => (
            <figure key={g.label} className={styles.shot}>
              <Photo
                src={g.src}
                className={styles.shotImg}
                sizes="(max-width: 600px) 50vw, 25vw"
              />
              <figcaption>{g.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className={styles.section}>
        <div className={`${styles.wrap} ${styles.faqWrap}`}>
          <h2 className={styles.title}>Questions fréquentes</h2>
          <div className={styles.faqList}>
            {faq.map((item, i) => {
              const open = openFaq === i;
              return (
                <div key={item.q} className={`${styles.faqItem} ${open ? styles.faqOpen : ""}`}>
                  <button
                    type="button"
                    className={styles.faqQ}
                    aria-expanded={open}
                    onClick={() => setOpenFaq(open ? -1 : i)}
                  >
                    {item.q}
                    {open ? <FaMinus aria-hidden="true" /> : <FaPlus aria-hidden="true" />}
                  </button>
                  <div className={styles.faqA}>
                    <p>{item.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Réservation ===== */}
      <section id="reservation" className={`${styles.section} ${styles.deep}`}>
        <div className={`${styles.wrap} ${styles.bookGrid}`}>
          <div>
            <h2 className={styles.title}>{bookingForm.title}</h2>
            <p className={styles.intro}>{bookingForm.text}</p>
            <ul className={styles.contactList}>
              <li>
                <a href={`https://wa.me/${site.whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp aria-hidden="true" /> WhatsApp
                </a>
              </li>
              <li>
                <a href={`tel:+${site.whatsappNumber}`}>
                  <FaPhone aria-hidden="true" /> {site.phoneDisplay}
                </a>
              </li>
              {socialLinks
                .filter((s) => s.label !== "WhatsApp")
                .map(({ label, icon: Icon, href }) => (
                  <li key={label}>
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      <Icon aria-hidden="true" /> {label}
                    </a>
                  </li>
                ))}
            </ul>
          </div>

          <form className={styles.card} onSubmit={submit} noValidate>
            <div className={styles.field}>
              <label htmlFor="name" className={styles.label}>
                Ton prénom
              </label>
              <input
                id="name"
                type="text"
                autoComplete="given-name"
                className={styles.input}
                value={form.name}
                onChange={(e) => setField("name", e.target.value)}
                aria-invalid={Boolean(errors.name)}
              />
              {errors.name && <p className={styles.error}>{errors.name}</p>}
            </div>

            <ChipGroup
              legend="Ton objectif"
              options={bookingForm.objectives}
              value={form.objective}
              onChange={(v) => setField("objective", v)}
              error={errors.objective}
            />
            <ChipGroup
              legend="Où t'entraîner ?"
              options={bookingForm.places}
              value={form.place}
              onChange={(v) => setField("place", v)}
              error={errors.place}
            />
            <ChipGroup
              legend="Quand es-tu disponible ? (facultatif)"
              options={bookingForm.slots}
              value={form.slot}
              onChange={(v) => setField("slot", v)}
            />

            <div className={styles.field}>
              <label htmlFor="message" className={styles.label}>
                Un mot pour le coach (facultatif)
              </label>
              <textarea
                id="message"
                rows={3}
                className={styles.input}
                value={form.message}
                onChange={(e) => setField("message", e.target.value)}
              />
            </div>

            <button type="submit" className={`${styles.btn} ${styles.submit}`}>
              <FaWhatsapp aria-hidden="true" />
              {bookingForm.submitLabel}
            </button>
            {sent && (
              <p className={styles.sent} role="status">
                WhatsApp s&apos;ouvre avec ta demande. Il ne reste qu&apos;à l&apos;envoyer.
              </p>
            )}
          </form>
        </div>
      </section>

      {/* Bouton fixe sur mobile */}
      <a href="#reservation" className={styles.mobileBar}>
        <FaCalendarCheck aria-hidden="true" />
        Réserver une séance
      </a>
    </main>
  );
}