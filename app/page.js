"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  FaPlay, FaBolt, FaCalendarCheck, FaCheck, FaQuoteLeft, FaPlus, FaMinus,
  FaWhatsapp,
  FaHouse, FaVideo, FaTrophy, FaDumbbell, FaFire, FaHeartPulse, FaBullseye,
  FaPersonRunning, FaChartLine, FaLightbulb, FaClipboardList, FaUserCheck, FaClock,
} from "react-icons/fa6";
import { GiWeightLiftingUp, GiRunningShoe } from "react-icons/gi";
import { FaRunning } from "react-icons/fa";

import styles from "./page.module.css";

/* ==========================================================
   DONNÉES — modifie les valeurs ici
   (numéros et réseaux sociaux : uniquement dans le footer)
========================================================== */

const site = {
  name: "FlowFit",
  coach: "Coach Marcial",
  logo: "/LogoMarcial.png", // mets ton logo dans /public (si absent, seul le nom s'affiche)
  whatsappNumber: "2250703059686", // format international, sans + ni espaces (jamais affiché)
};

const waLink = (text) =>
  `https://wa.me/${site.whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

const hero = {
  titleLines: ["Ton objectif,", "notre mission"],
  subtitle: "Avec Coach Marcial",
  text: "Des séances à domicile, en ligne, en salle ou en plein air, construites autour de ton objectif et de ton rythme. Entraîne-toi où tu veux, quand tu veux.",
  cta: "Commencer maintenant",
  secondary: "Voir la méthode",
  pills: [
    { icon: FaHouse, label: "Séances à domicile" },
    { icon: FaVideo, label: "Séances vidéo en ligne" },
    { icon: GiWeightLiftingUp, label: "Séances en salle" },
    { icon: FaRunning, label: "Séances en plein air" },
    { icon: FaTrophy, label: "Résultats concrets" },
  ],
  image: "/main.jpg",
  imageAlt: "Coach Marcial en séance d'entraînement",
};

const ticker = ["Cardio", "Abdos", "Perte de poids", "Prise de masse", "À domicile", "En ligne", "En salle", "En plein air"];

/* ⚠️ Chiffres d'exemple : remplace par les vrais */
const stats = [
  { value: 150, prefix: "+", suffix: "", label: "Clients accompagnés" },
  { value: 5, prefix: "", suffix: " ans", label: "D'expérience" },
  { value: 98, prefix: "", suffix: "%", label: "Clients satisfaits" },
];

const perks = [
  { icon: FaClipboardList, title: "Programmes personnalisés", text: "Adaptés à tes objectifs" },
  { icon: FaUserCheck, title: "Suivi du coach", text: "Motivation et conseils" },
  { icon: FaClock, title: "Flexible", text: "À ton rythme, où tu veux" },
  { icon: FaTrophy, title: "Résultats concrets", text: "Avec de la régularité" },
];

/* Les 4 programmes de l'affiche (id = valeur envoyée dans le formulaire) */
const programs = [
  {
    id: "Cardio", icon: FaHeartPulse, image: "/cardio.png", duration: "30 min",
    tagline: "Brûle les calories, booste ton énergie",
    why: ["Améliore ton endurance", "Brûle un maximum de calories", "Booste ton énergie et ton moral"],
    exercises: [
      { name: "Jumping jacks", dose: "3 × 45 s" },
      { name: "Course sur place", dose: "3 × 1 min" },
      { name: "Montées de genoux", dose: "3 × 45 s" },
      { name: "Burpees", dose: "3 × 30 s" },
    ],
    tip: "Garde un rythme soutenu et hydrate-toi bien.",
  },
  {
    id: "Abdos", icon: FaBullseye, image: "/abdos.png", duration: "20 min",
    tagline: "Un ventre plat et un corps plus fort",
    why: ["Renforce la sangle abdominale", "Améliore ta posture", "Protège ton dos"],
    exercises: [
      { name: "Crunch classique", dose: "3 × 20" },
      { name: "Relevé de jambes", dose: "3 × 15" },
      { name: "Gainage", dose: "3 × 45 s" },
      { name: "Russian twist", dose: "3 × 20" },
    ],
    tip: "Contracte bien tes abdos et garde le dos au sol.",
  },
  {
    id: "Perte de poids", icon: FaFire, image: "/perte-de-poids.png", duration: "45 min",
    tagline: "Élimine les graisses, retrouve ta forme",
    why: ["Augmente la dépense calorique", "Affine ta silhouette", "Améliore ta condition physique"],
    exercises: [
      { name: "Jumping jacks", dose: "5 × 45 s" },
      { name: "Squats", dose: "4 × 15" },
      { name: "Fentes", dose: "4 × 12 / jambe" },
      { name: "Mountain climbers", dose: "4 × 45 s" },
    ],
    tip: "Sois régulier, mange équilibré et bois beaucoup d'eau.",
  },
  {
    id: "Prise de masse", icon: FaDumbbell, image: "/prise-de-masse.png", duration: "45 min",
    tagline: "Gagne en muscle et en force",
    why: ["Développe la masse musculaire", "Augmente ta force", "Améliore ta silhouette et ta confiance"],
    exercises: [
      { name: "Développé couché", dose: "4 × 10" },
      { name: "Squats avec haltères", dose: "4 × 12" },
      { name: "Tractions (ou tirage)", dose: "4 × 8" },
      { name: "Curl biceps", dose: "4 × 12" },
    ],
    tip: "Augmente progressivement les charges et mange assez de protéines. Des haltères ou une bande élastique suffisent pour démarrer.",
  },
];

/* Tarifs en FCFA. period : ex. " / mois" ou " / séance" (vide = rien d'affiché) */
const pricing = { currency: "FCFA", period: "" };

const plans = [
  {
    name: "Simple", icon: FaVideo, tag: "Vidéos de séances", price: "30 000",
    features: ["Séances en vidéo, prêtes à suivre", "À ton rythme, où tu veux", "Un programme adapté à ton objectif"],
  },
  {
    name: "Accompagnement", icon: FaUserCheck, tag: "Séances en appel vidéo", price: "50 000",
    features: ["Séances en direct avec Coach Marcial", "Suivi, motivation et conseils", "Programme ajusté selon tes progrès"],
  },
  {
    name: "Performance", icon: GiWeightLiftingUp, tag: "Séances en plein air et en salle", price: "60 000",
    features: ["Séances en plein air et en salle avec Coach Marcial", "Suivi personnalisé et conseils", "Programme ajusté selon tes progrès"],
  },
  {
    name: "Premium", icon: FaHouse, tag: "Coaching à domicile", price: "100 000",
    features: ["Je viens chez toi, zéro trajet", "Matériel nécessaire apporté", "Coaching 100 % personnalisé"],
  },
];

const about = {
  title: "Coach Marcial",
  image: "/main1.jpg",
  paragraphs: [
    "Je t'accompagne, quel que soit ton niveau, vers des résultats qui durent.",
    "Chaque programme est adapté à ton corps, ton emploi du temps et tes objectifs.",
  ],
  specialties: ["Perte de poids", "Prise de masse", "Cardio et abdos", "Remise en forme"],
};

const steps = [
  { title: "Premier message", icon: FaWhatsapp, text: "Tu m'écris sur WhatsApp et on parle de ton objectif." },
  { title: "Séance découverte", icon: FaCalendarCheck, text: "On fait le point sur ton niveau et on fixe un plan." },
  { title: "Entraînement", icon: FaPersonRunning, text: "À domicile, en ligne, en salle ou en plein air, des séances adaptées à ton rythme." },
  { title: "Résultats", icon: FaChartLine, text: "On mesure tes progrès et on ajuste le programme." },
];

/* ⚠️ Témoignages d'exemple : remplace par ceux de vrais clients */
const testimonials = [
  { text: "En trois mois, j'ai perdu 8 kg et repris confiance en moi.", author: "Aïcha, 29 ans" },
  { text: "Des séances variées et un vrai suivi. Je recommande à 100 %.", author: "Koffi, 34 ans" },
  { text: "Je n'avais jamais fait de sport. Aujourd'hui, je ne m'en passe plus.", author: "Mariam, 41 ans" },
];

const gallery = [
  { label: "Cardio", src: "/cardioIMG.jpg" },
  { label: "Abdos", src: "/abdosPIC.jpg" },
  { label: "Force", src: "/forceIMG.jpg" },
  { label: "En ligne", src: "/onlineIMG.jpg" },
];

const faq = [
  { q: "Je n'ai jamais fait de sport, est-ce pour moi ?", a: "Oui. Chaque programme part de ton niveau actuel, quel qu'il soit." },
  { q: "Faut-il du matériel ?", a: "Pas pour le cardio et les abdos. Pour la prise de masse, des haltères ou une bande élastique suffisent pour commencer." },
  { q: "Comment se passent les séances en ligne ?", a: "Avec la formule Simple, tu suis des vidéos de séances à ton rythme. Avec Accompagnement, on fait la séance ensemble en appel vidéo." },
  { q: "Quelle formule choisir ?", a: "Simple si tu t'entraînes en autonomie, Accompagnement ou Pro pour un suivi en direct, Performance pour t'entraîner en salle et en plein air, Premium si tu veux que je vienne chez toi." },
  { q: "Combien de séances par semaine ?", a: "En général 2 à 3, selon ton objectif et ta disponibilité." },
  { q: "Comment réserver ?", a: "Remplis le formulaire : ta demande arrive directement sur mon WhatsApp." },
];

const bookingForm = {
  title: "Réserve ta séance",
  text: "Remplis le formulaire, WhatsApp s'ouvre avec ta demande prête à envoyer.",
  submitLabel: "Envoyer sur WhatsApp",
  objectives: programs.map((p) => p.id),
  plans: plans.map((p) => p.name),
  slots: ["Matin", "Après-midi", "Soir", "Week-end"],
};

/* ==========================================================
   COMPOSANTS
========================================================== */

/* Écran d'intro façon application : logo + « GO GO GO » */
function Splash() {
  const [phase, setPhase] = useState("in"); // in -> out -> gone
  const [logoOk, setLogoOk] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const t1 = setTimeout(() => setPhase("out"), 2600);
    const t2 = setTimeout(() => {
      setPhase("gone");
      document.body.style.overflow = "";
    }, 3200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      className={`${styles.splash} ${phase === "out" ? styles.splashOut : ""}`}
      aria-hidden="true"
    >
      <div className={styles.splashLogo}>
        {logoOk && (
          <Image
            src={site.logo}
            alt=""
            width={130}
            height={130}
            priority
            onError={() => setLogoOk(false)}
          />
        )}
        <span className={styles.splashName}>{site.name}</span>
      </div>
      <p className={styles.splashGo}>
        <span>GO</span>
        <span>GO</span>
        <span>GO</span>
      </p>
    </div>
  );
}

/* Image optimisée (mode fill) : le parent doit être en position: relative + hauteur.
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
    if (!el) return;
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

/* ==========================================================
   PAGE
========================================================== */

export default function Home() {
  const [openFaq, setOpenFaq] = useState(0);
  const [form, setForm] = useState({ name: "", objective: "", plan: "", slot: "", message: "" });
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
    if (!form.objective) err.objective = "Choisis un programme.";
    if (!form.plan) err.plan = "Choisis une formule.";
    setErrors(err);
    if (Object.keys(err).length) return;

    const lines = [
      `Bonjour ${site.coach}, je souhaite réserver une séance.`,
      "",
      `Prénom : ${form.name.trim()}`,
      `Programme : ${form.objective}`,
      `Formule : ${form.plan} (${plans.find((p) => p.name === form.plan)?.price} ${pricing.currency})`,
      form.slot ? `Disponibilité : ${form.slot}` : null,
      form.message.trim() ? `Message : ${form.message.trim()}` : null,
    ].filter((l) => l !== null);

    window.open(waLink(lines.join("\n")), "_blank", "noopener");
    setSent(true);
  };

  return (
    <main className={styles.page}>
      <Splash />

      {/* ===== Accueil ===== */}
      <section id="accueil" className={styles.hero}>
        <div className={`${styles.wrap} ${styles.heroGrid}`}>
          <div className={styles.heroText}>
            <p className={styles.heroBrand}>
              {site.name} <span>{hero.subtitle}</span>
            </p>
            <h1 className={styles.heroTitle}>
              {hero.titleLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h1>
            <p className={styles.heroLead}>{hero.text}</p>
            <ul className={styles.pills}>
              {hero.pills.map(({ icon: Icon, label }) => (
                <li key={label}>
                  <Icon aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>
            <div className={styles.heroActions}>
              <a
                href={waLink(`Bonjour ${site.coach}, je veux commencer avec ${site.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btn}
              >
                <FaWhatsapp aria-hidden="true" />
                {hero.cta}
              </a>
              <a href="#methode" className={styles.play}>
                <span className={styles.playIcon}>
                  <FaPlay aria-hidden="true" />
                </span>
                {hero.secondary}
              </a>
            </div>
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

      {/* ===== Atouts ===== */}
      <section className={styles.perks} aria-label="Nos atouts">
        <ul className={`${styles.wrap} ${styles.perksGrid}`}>
          {perks.map(({ icon: Icon, title, text }) => (
            <li key={title} className={styles.perk}>
              <span className={styles.perkIcon}>
                <Icon aria-hidden="true" />
              </span>
              <div>
                <strong>{title}</strong>
                <span>{text}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ===== Séances (4 programmes) ===== */}
      <section id="seances" className={styles.section}>
        <div className={styles.wrap}>
          <h2 className={styles.title}>Choisis ton objectif</h2>
          <p className={styles.intro}>
            Des programmes adaptés à tes besoins, avec des explications claires pour chaque exercice.
          </p>
          <div className={styles.programs}>
            {programs.map((p) => {
              const Icon = p.icon;
              return (
                <article key={p.id} className={styles.program}>
                  <div className={styles.programHead}>
                    <Photo
                      src={p.image}
                      className={styles.programImg}
                      sizes="(max-width: 600px) 100vw, (max-width: 1100px) 50vw, 25vw"
                    />
                    <span className={styles.programIcon}>
                      <Icon aria-hidden="true" />
                    </span>
                    <h3 className={styles.programTitle}>{p.id}</h3>
                    <span className={styles.programTime}>Séance type · {p.duration}</span>
                  </div>
                  <div className={styles.programBody}>
                    <p className={styles.programTag}>{p.tagline}</p>
                    <h4 className={styles.programLabel}>Pourquoi ?</h4>
                    <ul className={styles.why}>
                      {p.why.map((w) => (
                        <li key={w}>
                          <FaCheck aria-hidden="true" />
                          {w}
                        </li>
                      ))}
                    </ul>
                    <h4 className={styles.programLabel}>Exemple de séance</h4>
                    <ol className={styles.exos}>
                      {p.exercises.map((x) => (
                        <li key={x.name}>
                          <span>{x.name}</span>
                          <em>{x.dose}</em>
                        </li>
                      ))}
                    </ol>
                    <p className={styles.tip}>
                      <FaLightbulb aria-hidden="true" />
                      <span>
                        <strong>Conseil du coach</strong>
                        {p.tip}
                      </span>
                    </p>
                    <a
                      href="#reservation"
                      className={`${styles.btn} ${styles.programBtn}`}
                      onClick={() => setField("objective", p.id)}
                    >
                      Choisir ce programme
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Tarifs ===== */}
      <section id="tarifs" className={`${styles.section} ${styles.deep}`}>
        <div className={styles.wrap}>
          <h2 className={styles.title}>Choisis ta formule</h2>
          <p className={styles.intro}>De l&apos;entraînement en autonomie au coaching à domicile.</p>
          <div className={styles.plans}>
            {plans.map((p) => {
              const Icon = p.icon;
              return (
                <article key={p.name} className={styles.plan}>
                  <span className={styles.planIcon}>
                    <Icon aria-hidden="true" />
                  </span>
                  <h3 className={styles.planName}>{p.name}</h3>
                  <p className={styles.planTag}>{p.tag}</p>
                  <p className={styles.planPrice}>
                    <strong>{p.price}</strong>
                    <span>
                      {pricing.currency}
                      {pricing.period}
                    </span>
                  </p>
                  <ul className={styles.planList}>
                    {p.features.map((f) => (
                      <li key={f}>
                        <FaCheck aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#reservation"
                    className={`${styles.btn} ${styles.planBtn}`}
                    onClick={() => setField("plan", p.name)}
                  >
                    Choisir {p.name}
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Le coach ===== */}
      <section id="coach" className={styles.section}>
        <div className={`${styles.wrap} ${styles.aboutGrid}`}>
          <div className={styles.aboutVisual}>
            <span className={styles.aboutBrush} aria-hidden="true" />
            <Photo
              src={about.image}
              alt={about.title}
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

      {/* ===== Méthode (rounds) ===== */}
      <section id="methode" className={`${styles.section} ${styles.deep}`}>
        <div className={styles.wrap}>
          <h2 className={styles.title}>Comment ça se passe ?</h2>
          <p className={styles.intro}>
            Tu n'as jamais travaillé avec un coach ? Voici les quatre rounds, du premier message aux résultats.
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
              <Photo src={g.src} className={styles.shotImg} sizes="(max-width: 600px) 50vw, 25vw" />
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
            <p className={styles.intro}>
              Une question ? Mes contacts sont en bas de page :{" "}
              <a href="#contact">voir les contacts</a>.
            </p>
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
              legend="Ton programme"
              options={bookingForm.objectives}
              value={form.objective}
              onChange={(v) => setField("objective", v)}
              error={errors.objective}
            />
            <ChipGroup
              legend="Ta formule"
              options={bookingForm.plans}
              value={form.plan}
              onChange={(v) => setField("plan", v)}
              error={errors.plan}
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