"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FiArrowUpRight, FiArrowRight, FiMail, FiPhone, FiLinkedin, FiGithub, FiGlobe, FiMapPin, FiSearch, FiPlay } from "react-icons/fi";
import { SiReact, SiNextdotjs, SiNodedotjs, SiMongodb, SiExpress, SiGooglegemini, SiPython, SiExpo, SiGooglecloud } from "react-icons/si";
import { gsap, ScrollTrigger } from "../components/gsap";
import Smooth from "../components/Smooth";
import Split from "../components/Split";
import Agents from "../components/Agents";
import Compare from "../components/Compare";
import Shot from "../components/Shots";
import { me, heroStats, tabs, projects, steps, learning, toolkit, journey, shipped, contact } from "../data";

const ICONS = { mail: FiMail, phone: FiPhone, linkedin: FiLinkedin, github: FiGithub, globe: FiGlobe, pin: FiMapPin };
const TOOLS = [SiReact, SiNextdotjs, SiNodedotjs, SiMongodb, SiExpress, SiGooglegemini, SiPython, SiExpo, SiGooglecloud];

const go = (e, id) => {
  e.preventDefault();
  window.__lenis?.scrollTo(id, { offset: -10, duration: 1.4 });
};

function Portrait() {
  // Drop a transparent PNG cut-out at /public/me.png — until then a lit silhouette shows.
  const [ok, setOk] = useState(true);
  const img = useRef(null);
  useEffect(() => { if (img.current?.complete && img.current.naturalWidth === 0) setOk(false); }, []);
  return ok ? (
    <img ref={img} src="/me.png" alt={me.full} onError={() => setOk(false)} />
  ) : (
    <svg viewBox="0 0 400 560" className="sil">
      <defs>
        <linearGradient id="skin" x1="0" x2="1"><stop offset="0" stopColor="#5fe9ff" /><stop offset=".35" stopColor="#3a6cc4" /><stop offset=".62" stopColor="#7a1730" /><stop offset="1" stopColor="#ff1f3d" /></linearGradient>
        <linearGradient id="body" x1="0" x2="1"><stop offset="0" stopColor="#14184a" /><stop offset=".5" stopColor="#2a1450" /><stop offset="1" stopColor="#ff1f3d" /></linearGradient>
      </defs>
      <path d="M0 560 C20 470 90 430 150 415 L150 372 L262 372 L262 415 C322 430 385 470 400 560Z" fill="url(#body)" />
      <path d="M262 380 C300 330 312 250 286 195 C266 140 215 110 160 115 C125 120 100 150 98 190 L82 235 L62 262 L90 270 L92 290 L86 305 L96 322 C110 355 150 375 180 378 L262 380Z" fill="url(#skin)" />
      <path d="M286 200 C278 128 226 92 160 100 C112 106 92 142 98 192 C132 150 200 142 242 168 C270 184 282 204 286 226Z" fill="#150810" />
    </svg>
  );
}

export default function Page() {
  const root = useRef(null);
  const [tab, setTab] = useState("All");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(0);
  const list = projects.filter((p) => (tab === "All" || p.cat === tab) && (p.t + p.cat).toLowerCase().includes(q.toLowerCase()));

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // hero: giant letters rise out of masks, portrait lifts in
      gsap.from(".bw span", { yPercent: 125, duration: 1.4, stagger: 0.06, ease: "power4.out", delay: 0.9 });
      gsap.from(".portrait", { y: 90, opacity: 0, duration: 1.4, ease: "power3.out", delay: 1.3 });
      // hero scroll: giant word drifts, portrait lags, copy fades
      const hs = { trigger: "#hero", start: "top top", end: "bottom top", scrub: true };
      gsap.to(".big", { yPercent: -14, scale: 1.06, ease: "none", scrollTrigger: hs });
      gsap.to(".portrait", { yPercent: 10, ease: "none", scrollTrigger: hs });
      gsap.to(".h-left, .h-stats", { y: -50, opacity: 0.0, ease: "none", scrollTrigger: { ...hs, start: "25% top" } });

      // process steps light up as you scroll through them
      document.querySelectorAll(".step").forEach((s) =>
        ScrollTrigger.create({ trigger: s, start: "top 66%", end: "bottom 66%", toggleClass: { targets: s, className: "on" } })
      );
      // thumbnails settle in
      ScrollTrigger.batch(".card", {
        start: "top 94%",
        onEnter: (els) => gsap.fromTo(els, { y: 70, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.12, duration: 1, ease: "power3.out" }),
      });
      // contact rows draw their hairlines
      gsap.from(".c-rows .row", { scrollTrigger: { trigger: ".c-rows", start: "top 80%" }, opacity: 0, x: -24, stagger: 0.08, duration: 0.8, ease: "power3.out" });
    }, root);
    return () => ctx.revert();
  }, []);

  const first = useRef(true);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    gsap.fromTo(".card", { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.07, duration: 0.6, ease: "power3.out" });
    ScrollTrigger.refresh();
  }, [tab, q]);

  return (
    <div ref={root}>
      <Smooth />
      <Agents />

      <header className="nav">
        <a href="#hero" className="logo" onClick={(e) => go(e, "#hero")}>TANMAY<em>.</em></a>
        <nav>
          {[["Work", "#work"], ["About", "#craft"], ["Journey", "#journey"], ["Contact", "#contact"]].map(([l, h]) => (
            <a key={l} href={h} onClick={(e) => go(e, h)}>{l}</a>
          ))}
        </nav>
        <div className="n-right"><span><i />Available for work</span><a href="#contact" onClick={(e) => go(e, "#contact")}>Let&apos;s talk</a></div>
      </header>

      {/* ================= HERO ================= */}
      <section id="hero">
        <div className="hero-line" />
        <div className="tagline" data-b="red">FULL-STACK DEVELOPER<br />AI ENGINEER</div>
        <div className="big" aria-hidden data-b="red" data-nr>
          {"PORTFOLIO".split("").map((c, i) => <div key={i} className="bw"><span>{c}</span></div>)}
        </div>
        <div className="portrait" data-b data-nr><Portrait /></div>

        <div className="h-left">
          <div className="hello" data-b>Hello, I&apos;m</div>
          <h1 className="h-name" data-b="red">{me.name}</h1>
          <div className="h-role" data-b>DEVELOPER &amp;<br />AI ENGINEER</div>
          <p className="h-blurb" data-b>Building multi-tenant software and AI pipelines. <br />I turn messy manual work into fast systems restaurants actually rely on, from the first data model to launch day.</p>
          <a className="btn h-cta" data-b href="#work" onClick={(e) => go(e, "#work")}>See my work <FiArrowRight /></a>
          <div className="h-loc" data-b><FiMapPin /> {me.location.toUpperCase()}</div>
        </div>

        <div className="h-star" data-b><span>✺</span>Every query.<br />A purpose.</div>
        <ul className="h-stats">
          {heroStats.map(([n, a, b2]) => (
            <li key={n} data-b><b>{n}</b><small>{a}<br />{b2}</small></li>
          ))}
        </ul>

        <div className="h-bot">
          <a className="feat" href="#process" onClick={(e) => go(e, "#process")}><span><FiPlay /></span><b>VIEW FLAGSHIP BUILD</b><small>SAAS / AI</small></a>
          <div className="sc">SCROLL TO DISCOVER <i>↓</i></div>
          <small className="yrs">SELECTED WORK 2023 — 2026</small>
        </div>
      </section>

      {/* ================= WORK ================= */}
      <section id="work" className="sec">
        <div className="w-head">
          <div>
            <div className="kicker" data-b>01 / SELECTED WORK</div>
            <Split as="h2" className="h2" text="WORK THAT SPEAKS.*" b />
          </div>
          <a className="allwork" data-b href="#contact" onClick={(e) => go(e, "#contact")}>ALL WORK <FiArrowRight /></a>
        </div>
        <div className="w-bar" data-b>
          <div className="tabs">
            {tabs.map((t) => <button key={t} className={t === tab ? "on" : ""} onClick={() => setTab(t)}>{t}</button>)}
          </div>
          <label className="search"><FiSearch /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search  Title or category" /></label>
        </div>
        <div className="cards">
          {list.map((p, i) => (
            <article key={p.t} className="card">
              <div className="thumb"><Shot k={p.shot} /></div>
              <div className="cap">
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <div><b>{p.t.toUpperCase()}</b><small>{p.meta}</small></div>
                <FiArrowUpRight />
              </div>
            </article>
          ))}
        </div>

        <div className="built" data-b>
          <div className="b-l"><small>BUILT WITH</small><b>THE TOOLS I TRUST</b></div>
          <div className="b-icons">{TOOLS.map((I, i) => <I key={i} />)}</div>
          <div className="b-r"><small>SEE ALL (14)</small><i className="on" /><i /><i /><i /></div>
        </div>
      </section>

      {/* ================= PROCESS ================= */}
      <section id="process" className="sec proc">
        <div className="p-left">
          <div className="kicker" data-b>DESIGN UNDER THE HOOD</div>
          <Split as="h2" className="h2 xl" text="FROM|WIREFRAME.|*TO LIVE.*" b />
          <p className="tiny" data-b>One platform. Every layer of thinking.<br />Drag to see a grey-box wireframe become a finished, live interface.</p>
          <div className="meta" data-b>BEAVERTAIL PLATFORM / 2025<br />SAAS · AI · RESTAURANT OPS</div>
        </div>
        <div className="p-right" data-b="red" data-nr><Compare /><small className="drag">DRAG TO SEE THE PROCESS</small></div>
      </section>

      {/* ================= CRAFT ================= */}
      <section id="craft" className="sec">
        <div className="kicker" data-b>02 / BEHIND THE CRAFT</div>
        <div className="c-head">
          <Split as="h2" className="h2 md" text="MORE THAN CODE.|CRAFTING *EXPERIENCES.*" b />
          <Split as="p" mode="scrub" className="about"
            text="I'm Tanmay, a founding engineer at cactus.ai. I design and build multi-tenant restaurant software end to end: React and React Native frontends, Node.js microservices, MongoDB pipelines and Gemini-powered automation. I pair clean data models with fast interfaces so teams spend less time typing and more time running their business." />
        </div>
        <div className="c-grid">
          <div className="col1">
            <h3 data-b>EXPERTISE &amp; SKILLS</h3>
            <small className="rl" data-b>EDUCATION &amp; LEARNING</small>
            {learning.map(([a, b2, y]) => (
              <div className="edu" key={a} data-b><div><b>{a}</b><p>{b2}</p></div><u>{y}</u></div>
            ))}
            <small className="rl" data-b>CREATIVE &amp; TECH TOOLKIT</small>
            <div className="tags" data-b>{toolkit.map((t) => <span key={t}>{t}</span>)}</div>
            <div className="ticons" data-b>{TOOLS.slice(0, 6).map((I, i) => <I key={i} />)}</div>
          </div>
          <div className="col2">
            <h3 data-b>FROM CONCEPT TO LAUNCH</h3>
            {steps.map(([t, d], i) => (
              <div className="step" key={t} data-b>
                <u>{String(i + 1).padStart(2, "0")}</u><s />
                <div><b>{t}</b><p>{d}</p></div>
              </div>
            ))}
          </div>
          <div className="col3">
            <div className="red-card" data-b="red">
              <i>◉</i>
              <p>From concept<br />and live tenants,<br /><span>to production-ready<br />AI systems.</span></p>
              <em>Tanmay</em>
            </div>
          </div>
        </div>
      </section>

      {/* ================= JOURNEY ================= */}
      <section id="journey" className="sec">
        <div className="kicker" data-b>03 / THE JOURNEY</div>
        <Split as="h2" className="h2 sm" text="KEEP BUILDING. KEEP SHIPPING." b />
        <div className="j-grid">
          <div className="j-rows">
            {journey.map(([d, t, o, x], i) => (
              <div key={t} className={"jr" + (open === i ? " open" : "")} data-b onClick={() => setOpen(open === i ? -1 : i)}>
                <small className="red mono">{d}</small>
                <div className="jb"><b>{t}</b><small>{o}</small><div className="jx"><p>{x}</p></div></div>
                <span>{open === i ? "−" : "+"}</span>
              </div>
            ))}
          </div>
          <aside>
            <small className="mile" data-b>A FEW MILESTONES</small>
            <Split as="h3" className="h3" text="SHIPPED.|*LIVE. USED.*" b />
            {shipped.map(([t, m]) => (
              <div className="ship" key={t} data-b><i /><div><b>{t}</b><small>{m}</small></div><FiArrowUpRight /></div>
            ))}
          </aside>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section id="contact" className="sec">
        <div className="ct-grid">
          <div className="ct-l">
            <div className="kicker" data-b>04 / YOUR NEXT PROJECT</div>
            <Split as="h2" className="h2 lg" text="LET'S BUILD|TOGETHER.*" b />
            <p className="tiny" data-b>Got a product or an AI idea in mind?<br />Let&apos;s make something people love to use.</p>
            <a className="start" data-b href={`mailto:${me.email}`}><span><FiArrowUpRight /></span>START A CONVERSATION</a>
          </div>
          <div className="c-rows">
            {contact.map(([k, v, h, ic]) => {
              const I = ICONS[ic];
              return (
                <a className="row" key={k} href={h} target={h.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                  <span className="ic"><I /></span>
                  <div><small>{k}</small><b>{v}</b></div><FiArrowUpRight />
                </a>
              );
            })}
          </div>
          <div className="c-card" data-b="red">
            <div className="neon" />
            <span className="logo-s">BEAVERTAIL</span>
            <h3>BUILD<br /><em>SMARTER.</em></h3>
            <p>Run Smarter.<br />Cut Costs.</p>
            <span className="play"><FiPlay /></span>
          </div>
        </div>
        <label className="tell" data-b><input placeholder="Tell me about your project" onKeyDown={(e) => e.key === "Enter" && (location.href = `mailto:${me.email}?subject=Project&body=${encodeURIComponent(e.target.value)}`)} /></label>
        <footer>
          <span className="logo">TANMAY<em>.</em></span>
          <div className="soc">
            <a href={`https://${me.github}`} target="_blank" rel="noreferrer"><FiGithub /></a>
            <a href={`https://${me.linkedin}`} target="_blank" rel="noreferrer"><FiLinkedin /></a>
            <a href={`mailto:${me.email}`}><FiMail /></a>
            <a href={`https://${me.site}`} target="_blank" rel="noreferrer"><FiGlobe /></a>
          </div>
        </footer>
      </section>
    </div>
  );
}
