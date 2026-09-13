import { useState, useEffect, useRef } from "react";
import { Menu, X, ArrowUpRight, Mail, MapPin, User } from "lucide-react";

/* Looks for pic.jpg sitting next to this file (src/pic.jpg). If it isn't
   there yet, this stays an empty object and the fallback icon is used —
   no build error either way. Drop a pic.jpg into /src to swap it in. */
const picModules = import.meta.glob("./pic.jpg", { eager: true, import: "default" });
const PIC_URL = Object.values(picModules)[0] || null;

/* ------------------------------------------------------------------ */
/*  CONTENT — replace everything in this block with your own details  */
/* ------------------------------------------------------------------ */

const PROFILE = {
  name: "Aditya Anandika Putra",
  role: "Game Developer, Software Engineer",
  location: "Batam, Indonesia",
  status: "Currently open to new roles",
  stack: "React, TypeScript, Node.js, PostgreSQL, and Docker",
  bio:
    "I build web products end to end, from data models and APIs to the interfaces people actually touch. Six years in, I care most about the parts that don't show up in a demo: load times, error states, the code someone else has to read at 2am.",
  email: "alex.rivera@example.com",
  github: "https://github.com/",
  linkedin: "https://linkedin.com/",
};

const SKILLS = [
  { category: "Languages", items: "JavaScript, TypeScript, Python, and Go" },
  { category: "Frontend", items: "React, Next.js, Redux, and Tailwind CSS" },
  { category: "Backend", items: "Node.js, Express, PostgreSQL, and Redis" },
  { category: "Infrastructure", items: "Docker, AWS, GitHub Actions, and Terraform" },
];

const PROJECTS = [
  {
    title: "Ledger",
    description:
      "A shared expense tracker for small teams, built around real-time syncing, receipt scanning, and monthly settlement reports.",
    tags: "React, Node.js, PostgreSQL",
    tone: "#8A6A4D",
    liveUrl: "https://example.com",
    codeUrl: "https://github.com/",
  },
  {
    title: "Northwind CLI",
    description:
      "A command-line tool that turns OpenAPI specs into typed client libraries, cutting integration setup from a day to minutes.",
    tags: "Go, TypeScript",
    tone: "#5B6B5E",
    liveUrl: "https://example.com",
    codeUrl: "https://github.com/",
  },
  {
    title: "Fieldnote",
    description:
      "An offline-first notes app for researchers working without reliable internet. It syncs automatically, conflict-free, once they're back online.",
    tags: "React Native, SQLite",
    tone: "#6C5A6B",
    liveUrl: "https://example.com",
    codeUrl: "https://github.com/",
  },
];

const EXPERIENCE = [
  {
    range: "2023 — Now",
    role: "Senior Software Engineer",
    org: "Beacon Systems",
    points: [
      "Led the rebuild of the billing platform, cutting invoice-generation errors by 90%",
      "Mentored three junior engineers through their first production launches",
      "Introduced contract testing between five internal services",
    ],
  },
  {
    range: "2021 — 2023",
    role: "Software Engineer",
    org: "Harborline",
    points: [
      "Built the customer-facing analytics dashboard used by 12,000+ accounts",
      "Reduced average API response time from 800ms to 190ms",
    ],
  },
  {
    range: "2019 — 2021",
    role: "Software Engineer",
    org: "Fenwick & Rowe",
    points: [
      "Shipped the company's first mobile app from prototype to App Store",
      "Set up the CI/CD pipeline still in use across four teams today",
    ],
  },
];

const ACHIEVEMENTS = [
  { value: "90%", suffix: "", label: "fewer billing errors after the platform rebuild" },
  { value: "4.2", suffix: "x", label: "improvement in API throughput at Harborline" },
  { value: "12", suffix: "k+", label: "active accounts on a shipped analytics tool" },
  { value: "3", suffix: "", label: "engineers mentored into senior roles" },
];

const NAV = [
  { id: "profile", label: "Profile" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Selected work" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

/* ------------------------------------------------------------------ */
/*  Hooks                                                               */
/* ------------------------------------------------------------------ */

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

function useRevealObserver(reduced) {
  useEffect(() => {
    if (reduced) return;
    const els = Array.from(document.querySelectorAll("[data-reveal]"));
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
      },
      { threshold: 0.12, rootMargin: "-6% 0px -6% 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [reduced]);
}

function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setFine(mq.matches);
    const handler = (e) => setFine(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return fine;
}

/* ------------------------------------------------------------------ */
/*  Icons (inline — lucide-react v1 dropped brand icons)               */
/* ------------------------------------------------------------------ */

function GithubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width={props.size || 16} height={props.size || 16} fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.72.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.34.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.6.23 2.77.11 3.06.74.81 1.19 1.83 1.19 3.09 0 4.43-2.7 5.4-5.27 5.69.42.36.78 1.07.78 2.16 0 1.56-.01 2.82-.01 3.2 0 .3.2.66.79.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width={props.size || 16} height={props.size || 16} fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.86 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Small building blocks                                              */
/* ------------------------------------------------------------------ */

function CursorFx({ enabled }) {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;
    let raf = null;
    let pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let ring = { ...pos };

    const onMove = (e) => { pos = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", onMove);

    const tick = () => {
      ring.x += (pos.x - ring.x) * 0.18;
      ring.y += (pos.y - ring.y) * 0.18;
      if (dotRef.current) dotRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
      if (ringRef.current) ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onOver = (e) => {
      if (e.target.closest && e.target.closest('[data-cursor="hover"]')) {
        ringRef.current?.classList.add("is-hover");
      }
    };
    const onOut = (e) => {
      if (e.target.closest && e.target.closest('[data-cursor="hover"]')) {
        ringRef.current?.classList.remove("is-hover");
      }
    };
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <span className="cursor-dot" ref={dotRef} aria-hidden="true" />
      <span className="cursor-ring" ref={ringRef} aria-hidden="true" />
    </>
  );
}

function ScrollProgress() {
  const fillRef = useRef(null);
  useEffect(() => {
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const pct = max > 0 ? Math.min(1, Math.max(0, scrolled / max)) : 0;
        if (fillRef.current) fillRef.current.style.width = `${pct * 100}%`;
        raf = null;
      });
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="scroll-progress" aria-hidden="true">
      <div className="scroll-progress-fill" ref={fillRef} />
    </div>
  );
}

function OverlayNav({ open, onClose }) {
  return (
    <div className={`overlay-nav ${open ? "open" : ""}`} aria-hidden={!open}>
      <div className="overlay-top">
        <span className="overlay-mark">{PROFILE.name}</span>
        <button className="icon-btn" onClick={onClose} aria-label="Close menu" data-cursor="hover">
          <X size={20} />
        </button>
      </div>
      <nav className="overlay-links">
        {NAV.map((item, i) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={onClose}
            style={{ transitionDelay: open ? `${0.06 + i * 0.05}s` : "0s" }}
            data-cursor="hover"
          >
            <span className="overlay-num mono">{String(i + 1).padStart(2, "0")}</span>
            {item.label}
          </a>
        ))}
      </nav>
      <div className="overlay-foot">
        <a href={`mailto:${PROFILE.email}`} data-cursor="hover">{PROFILE.email}</a>
        <div className="overlay-social">
          <a href={PROFILE.github} target="_blank" rel="noreferrer" data-cursor="hover"><GithubIcon size={17} /></a>
          <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" data-cursor="hover"><LinkedinIcon size={17} /></a>
        </div>
      </div>
    </div>
  );
}

function parseNum(value) {
  const n = parseFloat(value);
  const decimals = value.includes(".") ? value.split(".")[1].length : 0;
  return { n, decimals };
}

function StatRow({ value, suffix, label }) {
  const { n, decimals } = parseNum(value);
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const done = useRef(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { setDisplay(n); return; }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !done.current) {
            done.current = true;
            const start = performance.now();
            const duration = 900;
            const step = (t) => {
              const p = Math.min(1, (t - start) / duration);
              const eased = 1 - Math.pow(1 - p, 3);
              setDisplay(parseFloat((n * eased).toFixed(decimals)));
              if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [n, decimals]);

  return (
    <p className="stat-row reveal" data-reveal ref={ref}>
      <span className="stat-value">
        {decimals ? display.toFixed(decimals) : Math.round(display)}
        {suffix}
      </span>{" "}
      {label}
    </p>
  );
}

function SectionHeading({ children }) {
  return (
    <div className="section-heading">
      <h2>{children}</h2>
    </div>
  );
}

function WorkIndex({ enabled }) {
  const [hovered, setHovered] = useState(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled || hovered === null) return;
    let raf = null;
    const onMove = (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        setPos({ x: e.clientX, y: e.clientY });
        raf = null;
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [enabled, hovered]);

  const project = hovered !== null ? PROJECTS[hovered] : null;

  return (
    <div className="work-index">
      {PROJECTS.map((p, i) => (
        <article
          className="work-row reveal"
          data-reveal
          key={p.title}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
        >
          <div className="work-row-top">
            <span className="work-num mono">{String(i + 1).padStart(2, "0")}</span>
            <h3>{p.title}</h3>
            <div className="work-links">
              <a href={p.liveUrl} target="_blank" rel="noreferrer" data-cursor="hover" aria-label={`${p.title} live site`}>
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
          <p className="work-desc">{p.description}</p>
          <p className="work-tags mono">{p.tags}</p>
        </article>
      ))}

      {enabled && project && (
        <div
          className="work-preview"
          style={{ transform: `translate(${pos.x + 24}px, ${pos.y - 90}px)`, background: project.tone }}
        >
          <span>{project.title}</span>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reducedMotion = useReducedMotion();
  const finePointer = useFinePointer();
  const cursorEnabled = finePointer && !reducedMotion;

  useRevealObserver(reducedMotion);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <div className={`pf-root ${cursorEnabled ? "custom-cursor" : ""}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

        :root {
          --bg: #15130F;
          --bg-panel: #1D1A15;
          --ink: #F1EAE0;
          --ink-soft: #9C9186;
          --line: #322D26;
          --accent: #C08A4E;
        }

        /* Neutralizes leftover Vite starter CSS (centered #root, text-align:
           center, max-width) that otherwise fights with this layout. */
        html, body, #root {
          margin: 0;
          padding: 0;
          width: 100%;
          max-width: none;
          min-height: 100vh;
          display: block;
          place-items: unset;
          text-align: left;
          background: var(--bg);
          color-scheme: dark;
        }

        .pf-root {
          position: relative;
          background: var(--bg);
          color: var(--ink);
          font-family: 'Inter', sans-serif;
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }

        .pf-root * { box-sizing: border-box; }
        .pf-root a { color: inherit; text-decoration: none; }
        .pf-root .mono { font-family: 'IBM Plex Mono', monospace; }
        .pf-root :is(h1, h2, h3) { font-family: 'Cormorant Garamond', serif; font-weight: 500; margin: 0; }

        html { scroll-behavior: smooth; }

        .custom-cursor, .custom-cursor a, .custom-cursor button { cursor: none; }

        .pf-root a:focus-visible, .pf-root button:focus-visible {
          outline: 1px solid var(--accent);
          outline-offset: 3px;
        }

        .shell {
          max-width: 1160px;
          margin: 0 auto;
          padding-inline: clamp(1.25rem, 5vw, 3rem);
        }

        section { padding-block: clamp(3.5rem, 9vw, 6.5rem); border-top: 1px solid var(--line); }

        /* ---------- scroll reveal ---------- */

        .reveal {
          opacity: 0;
          transform: translateY(14px);
          filter: blur(3px);
          transition: opacity .55s ease, transform .55s ease, filter .55s ease;
          will-change: opacity, transform, filter;
        }
        .reveal.is-visible { opacity: 1; transform: translateY(0); filter: blur(0); }

        .section-heading { margin-bottom: clamp(2rem, 5vw, 3rem); }
        .section-heading h2 { font-size: clamp(1.5rem, 2.6vw, 2rem); font-style: italic; color: var(--ink); }

        /* ---------- cursor fx ---------- */

        .cursor-dot {
          position: fixed; top: 0; left: 0;
          width: 6px; height: 6px; margin: -3px 0 0 -3px;
          background: var(--ink); border-radius: 50%;
          pointer-events: none; z-index: 300;
        }
        .cursor-ring {
          position: fixed; top: 0; left: 0;
          width: 34px; height: 34px; margin: -17px 0 0 -17px;
          border: 1px solid var(--accent); border-radius: 50%;
          pointer-events: none; z-index: 300; mix-blend-mode: normal;
          transition: width .2s ease, height .2s ease, margin .2s ease, border-color .2s ease;
        }
        .cursor-ring.is-hover {
          width: 60px; height: 60px; margin: -30px 0 0 -30px;
          border-color: var(--ink); background: rgba(241,234,224,0.06);
        }

        /* ---------- scroll progress ---------- */

        .scroll-progress { position: fixed; top: 0; left: 0; width: 100%; height: 2px; z-index: 250; background: transparent; }
        .scroll-progress-fill { height: 100%; width: 0%; background: var(--accent); }

        /* ---------- top bar ---------- */

        .top-bar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 120;
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.4rem clamp(1.25rem, 5vw, 3rem);
          transition: background .3s ease, border-color .3s ease, backdrop-filter .3s ease;
          border-bottom: 1px solid transparent;
        }
        .top-bar.scrolled {
          background: rgba(21, 19, 15, 0.82);
          backdrop-filter: blur(8px);
          border-color: var(--line);
        }

        .top-mark { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; font-style: italic; }

        .icon-btn {
          background: none; border: 1px solid var(--line); color: var(--ink);
          width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;
          cursor: pointer; border-radius: 999px; transition: border-color .2s ease;
        }
        .icon-btn:hover { border-color: var(--accent); }

        /* ---------- overlay nav ---------- */

        .overlay-nav {
          position: fixed; inset: 0; z-index: 200; background: var(--bg);
          display: flex; flex-direction: column; justify-content: space-between;
          padding: clamp(1.5rem, 5vw, 3rem);
          opacity: 0; visibility: hidden; transition: opacity .35s ease, visibility .35s ease;
        }
        .overlay-nav.open { opacity: 1; visibility: visible; }

        .overlay-top { display: flex; align-items: center; justify-content: space-between; }
        .overlay-mark { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; font-style: italic; }

        .overlay-links { display: flex; flex-direction: column; gap: .1rem; }
        .overlay-links a {
          display: flex; align-items: baseline; gap: 1rem;
          font-size: clamp(2rem, 7vw, 4rem); font-style: italic; color: var(--ink-soft);
          padding: .25rem 0; opacity: 0; transform: translateY(16px);
          transition: opacity .5s ease, transform .5s ease, color .2s ease;
        }
        .overlay-nav.open .overlay-links a { opacity: 1; transform: translateY(0); }
        .overlay-links a:hover { color: var(--ink); }
        .overlay-num { font-family: 'IBM Plex Mono', monospace; font-size: .85rem; font-style: normal; color: var(--accent); }

        .overlay-foot { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; font-size: .95rem; color: var(--ink-soft); }
        .overlay-foot a:hover { color: var(--ink); }
        .overlay-social { display: flex; gap: 18px; }

        /* ---------- hero ---------- */

        .hero { padding-block: clamp(7rem, 16vw, 10rem) clamp(4rem, 9vw, 6rem); border-top: none; }

        .hero-grid { display: flex; gap: clamp(2rem, 6vw, 4rem); align-items: flex-end; flex-wrap: wrap; }
        .hero-copy { flex: 1 1 380px; }

        .hero-photo {
          flex: 0 0 auto;
          width: clamp(160px, 22vw, 240px);
          aspect-ratio: 3 / 4;
          border: 1px solid var(--line);
          background: var(--bg-panel);
          overflow: hidden;
          opacity: 0;
          transform: scale(0.96);
          animation: heroPhotoIn 0.8s ease forwards;
          animation-delay: 0.15s;
        }
        .hero-photo-inner {
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
          color: var(--ink-soft);
          transition: transform 0.5s ease;
        }
        .hero-photo-inner img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .hero-photo:hover .hero-photo-inner { transform: scale(1.06); }

        @keyframes heroPhotoIn { to { opacity: 1; transform: scale(1); } }

        @media (prefers-reduced-motion: reduce) {
          .hero-photo { animation: none; opacity: 1; transform: none; }
          .hero-photo-inner { transition: none; }
        }
        .hero-name {
          font-size: clamp(2.6rem, 8vw, 5.6rem);
          line-height: 1.02;
          max-width: 16ch;
        }
        .hero-sub { margin-top: 1rem; font-size: clamp(1rem, 1.6vw, 1.15rem); color: var(--ink-soft); max-width: 40ch; }
        .hero-bio { margin-top: 1.75rem; font-size: 1.05rem; color: var(--ink-soft); max-width: 58ch; }

        .hero-link {
          display: inline-block; margin-top: 2.25rem; font-size: .95rem; position: relative; padding-bottom: 3px;
        }
        .hero-link::after {
          content: ""; position: absolute; left: 0; bottom: 0; height: 1px; width: 100%;
          background: var(--ink-soft); transition: background .2s ease;
        }
        .hero-link:hover::after { background: var(--accent); }

        /* ---------- profile ---------- */

        .profile-body { display: flex; flex-wrap: wrap; gap: 3rem 4rem; }
        .profile-copy { flex: 2 1 380px; max-width: 60ch; color: var(--ink-soft); font-size: 1.05rem; }
        .profile-copy strong { color: var(--ink); font-weight: 500; }
        .profile-meta { flex: 1 1 220px; display: flex; flex-direction: column; gap: .75rem; font-size: .95rem; color: var(--ink-soft); }
        .profile-meta .row { display: flex; align-items: center; gap: 10px; }

        /* ---------- skills ---------- */

        .skill-list { display: flex; flex-direction: column; }
        .skill-row { display: flex; flex-wrap: wrap; gap: .5rem 2rem; padding: 1.1rem 0; border-top: 1px solid var(--line); }
        .skill-row:first-child { border-top: none; }
        .skill-cat { flex: 0 0 160px; font-size: .95rem; color: var(--ink-soft); }
        .skill-items { flex: 1 1 320px; font-size: 1.05rem; }

        /* ---------- work index ---------- */

        .work-index { position: relative; display: flex; flex-direction: column; }

        .work-row { padding: 1.75rem 0; border-top: 1px solid var(--line); }
        .work-row:first-child { border-top: none; }

        .work-row-top { display: flex; align-items: baseline; gap: 1rem; flex-wrap: wrap; }
        .work-num { font-size: .85rem; color: var(--accent); }
        .work-row h3 { font-size: clamp(1.4rem, 3vw, 1.9rem); font-style: italic; flex: 1 1 auto; min-width: 160px; transition: color .2s ease; }
        .work-row:hover h3 { color: var(--accent); }
        .work-links a { display: inline-flex; color: var(--ink-soft); transition: color .2s ease; }
        .work-links a:hover { color: var(--accent); }

        .work-desc { margin-top: .6rem; color: var(--ink-soft); max-width: 62ch; font-size: 1rem; }
        .work-tags { margin-top: .75rem; font-size: .8rem; color: var(--ink-soft); opacity: .8; }

        .work-preview {
          position: fixed; top: 0; left: 0; z-index: 90;
          width: 220px; height: 150px; border-radius: 4px;
          display: flex; align-items: flex-end; padding: 14px;
          pointer-events: none; opacity: .92;
          font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 1.1rem; color: #fff;
        }

        /* ---------- experience ---------- */

        .exp-list { display: flex; flex-direction: column; }
        .exp-row { padding: 1.75rem 0; border-top: 1px solid var(--line); }
        .exp-row:first-child { border-top: none; }
        .exp-head { display: flex; align-items: baseline; gap: 1rem; flex-wrap: wrap; }
        .exp-range { font-size: .85rem; color: var(--accent); }
        .exp-role { font-size: clamp(1.2rem, 2.4vw, 1.5rem); font-style: italic; }
        .exp-org { font-size: .95rem; color: var(--ink-soft); }
        .exp-points { list-style: none; margin: .9rem 0 0; padding: 0; display: flex; flex-direction: column; gap: .5rem; }
        .exp-points li { position: relative; padding-left: 1.2rem; color: var(--ink-soft); font-size: .98rem; }
        .exp-points li::before { content: "–"; position: absolute; left: 0; color: var(--accent); }

        /* ---------- achievements ---------- */

        .stat-list { display: flex; flex-direction: column; }
        .stat-row { padding: 1rem 0; border-top: 1px solid var(--line); margin: 0; font-size: 1.05rem; color: var(--ink-soft); }
        .stat-row:first-child { border-top: none; }
        .stat-value { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 1.5rem; color: var(--accent); font-variant-numeric: tabular-nums; }

        /* ---------- contact ---------- */

        .contact-lead { font-size: clamp(1.6rem, 4vw, 2.4rem); font-style: italic; max-width: 18ch; }
        .contact-email {
          display: inline-block; margin-top: 1.5rem; font-size: clamp(1.3rem, 3vw, 1.8rem);
          font-family: 'Cormorant Garamond', serif; font-style: italic; position: relative; padding-bottom: 4px;
        }
        .contact-email::after {
          content: ""; position: absolute; left: 0; bottom: 0; height: 1px; width: 100%;
          background: var(--ink-soft); transition: background .2s ease;
        }
        .contact-email:hover::after { background: var(--accent); }
        .contact-note { margin-top: 1.1rem; color: var(--ink-soft); max-width: 46ch; font-size: .98rem; }
        .contact-social { display: flex; gap: 20px; margin-top: 2rem; }
        .contact-social a { color: var(--ink-soft); transition: color .2s ease; }
        .contact-social a:hover { color: var(--accent); }

        /* ---------- footer ---------- */

        footer {
          border-top: 1px solid var(--line); padding: 1.75rem clamp(1.25rem, 5vw, 3rem);
          display: flex; justify-content: space-between; flex-wrap: wrap; gap: .5rem;
          font-size: .82rem; color: var(--ink-soft);
        }

        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          .cursor-dot, .cursor-ring, .scroll-progress { display: none; }
          * { transition: none !important; }
        }

        @media (hover: none) {
          .cursor-dot, .cursor-ring, .work-preview { display: none !important; }
        }

        @media (max-width: 620px) {
          .skill-cat { flex-basis: 100%; }
          .overlay-links a { font-size: clamp(1.6rem, 9vw, 2.6rem); }
        }
      `}</style>

      <CursorFx enabled={cursorEnabled} />
      <ScrollProgress />

      <div className={`top-bar ${scrolled ? "scrolled" : ""}`}>
        <a href="#top" className="top-mark">{PROFILE.name}</a>
        <button className="icon-btn" onClick={() => setMenuOpen(true)} aria-label="Open menu" data-cursor="hover">
          <Menu size={18} />
        </button>
      </div>

      <OverlayNav open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div id="top" />

      {/* HERO */}
      <header className="hero shell">
        <div className="hero-grid">
          <div className="hero-copy">
            <h1 className="hero-name">{PROFILE.name}</h1>
            <p className="hero-sub reveal" data-reveal>{PROFILE.role}, based in {PROFILE.location}.</p>
            <p className="hero-bio reveal" data-reveal>{PROFILE.bio}</p>
            <a href="#work" className="hero-link reveal" data-reveal data-cursor="hover">Selected work</a>
          </div>
          <div className="hero-photo">
            <div className="hero-photo-inner">
              {PIC_URL ? (
                <img src={PIC_URL} alt={PROFILE.name} />
              ) : (
                <User size={40} strokeWidth={1.2} />
              )}
            </div>
          </div>
        </div>
      </header>

      {/* PROFILE */}
      <section id="profile">
        <div className="shell">
          <SectionHeading>Profile</SectionHeading>
          <div className="profile-body">
            <p className="profile-copy reveal" data-reveal>
              {PROFILE.bio} <strong>{PROFILE.status}.</strong> Day to day, that mostly means working in {PROFILE.stack}.
            </p>
            <div className="profile-meta">
              <div className="row reveal" data-reveal><MapPin size={15} /> {PROFILE.location}</div>
              <div className="row reveal" data-reveal><Mail size={15} /> {PROFILE.email}</div>
              <div className="row reveal" data-reveal><GithubIcon size={15} /> github.com/yourhandle</div>
              <div className="row reveal" data-reveal><LinkedinIcon size={15} /> linkedin.com/in/yourhandle</div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills">
        <div className="shell">
          <SectionHeading>Skills</SectionHeading>
          <div className="skill-list">
            {SKILLS.map((s) => (
              <div className="skill-row reveal" data-reveal key={s.category}>
                <div className="skill-cat">{s.category}</div>
                <div className="skill-items">{s.items}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work">
        <div className="shell">
          <SectionHeading>Selected work</SectionHeading>
          <WorkIndex enabled={cursorEnabled} />
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience">
        <div className="shell">
          <SectionHeading>Experience</SectionHeading>
          <div className="exp-list">
            {EXPERIENCE.map((e) => (
              <div className="exp-row reveal" data-reveal key={e.org}>
                <div className="exp-head">
                  <span className="exp-range mono">{e.range}</span>
                  <span className="exp-role">{e.role}</span>
                  <span className="exp-org">— {e.org}</span>
                </div>
                <ul className="exp-points">
                  {e.points.map((pt, i) => (
                    <li key={i}>{pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section id="achievements">
        <div className="shell">
          <SectionHeading>Achievements</SectionHeading>
          <div className="stat-list">
            {ACHIEVEMENTS.map((a) => (
              <StatRow key={a.label} value={a.value} suffix={a.suffix} label={a.label} />
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="shell">
          <p className="contact-lead reveal" data-reveal>Have a project in mind, or just want to talk shop?</p>
          <a className="contact-email reveal" data-reveal href={`mailto:${PROFILE.email}`} data-cursor="hover">{PROFILE.email}</a>
          <p className="contact-note reveal" data-reveal>I usually reply within a day. Please skip the recruiter-relayed job board messages; I'm only looking at direct roles and real projects.</p>
          <div className="contact-social reveal" data-reveal>
            <a href={PROFILE.github} target="_blank" rel="noreferrer" data-cursor="hover" aria-label="GitHub"><GithubIcon size={18} /></a>
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" data-cursor="hover" aria-label="LinkedIn"><LinkedinIcon size={18} /></a>
          </div>
        </div>
      </section>

      <footer>
        <span>© {new Date().getFullYear()} {PROFILE.name}</span>
        <span className="mono">Built with React</span>
      </footer>
    </div>
  );
}
