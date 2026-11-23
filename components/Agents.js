"use client";
// The "agents rebuild the page" layer from the reference video:
//  • a swarm of pastel agent cursors roaming the screen
//  • blue selection boxes (handles + size chip) drawn around every [data-b] element as it
//    enters view, while an agent cursor flies to it and the element is "built" (revealed)
//  • a bottom HUD (agents · layers built · Touring) with an auto-scrolling tour
//  • at the end, "Rebuilt by N agents in T s" + Replay, and the cursors flock together
// Disable the tour with ?notour
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "./gsap";

const PASTEL = ["#ff9ab3", "#7fe6ff", "#ffe08a", "#c9a7ff", "#9affc4", "#ffb48a", "#8fb4ff"];
const KINDS = [...Array(14).fill("arrow"), ...Array(4).fill("plus"), ...Array(2).fill("ibeam")];
const SPEEDS = [1, 2, 0.5];
const PX_PER_SEC = 85; // ≈ 40s tour on a 1280px-wide page, like the reference

const Glyph = ({ kind, c }) =>
  kind === "arrow" ? (
    <svg width="16" height="16" viewBox="0 0 18 18"><path d="M2 1l13 7-5.5 1.8L7.5 16z" fill={c} stroke="#000" strokeOpacity=".5" strokeWidth=".7" /></svg>
  ) : kind === "plus" ? (
    <svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 1v12M1 7h12" stroke="#fff" strokeOpacity=".75" strokeWidth="1.4" /></svg>
  ) : (
    <svg width="10" height="16" viewBox="0 0 10 16"><path d="M2 1h6M5 1v14M2 15h6" stroke="#6fa8ff" strokeWidth="1.3" fill="none" /></svg>
  );

export default function Agents() {
  const layer = useRef(null);
  const boxes = useRef(null);
  const api = useRef({});
  const [h, setH] = useState({ built: 0, total: 1, state: "idle", secs: "0.0", speed: 1, hidden: false });

  useEffect(() => {
    const noTour = new URLSearchParams(location.search).has("notour") || matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rnd = (a, b) => a + Math.random() * (b - a);
    const cursors = [...layer.current.children];
    let swarmOn = false;
    let alive = true;

    // ---- roaming cursors
    const swarmRect = () => {
      const r = document.querySelector(".c-rows")?.getBoundingClientRect();
      return r && { l: r.right - 160, r: r.right + 90, t: r.top + 30, b: r.bottom - 30 };
    };
    const wander = (el) => {
      if (!alive) return;
      const s = swarmOn && swarmRect();
      const x = s ? rnd(s.l, s.r) : rnd(30, innerWidth - 30);
      const y = s ? rnd(s.t, s.b) : rnd(90, innerHeight - 30);
      gsap.to(el, { x, y, duration: s ? rnd(0.5, 1.4) : rnd(2.4, 6), ease: "power3.inOut", onComplete: () => gsap.delayedCall(rnd(0, 1.2), () => wander(el)) });
    };
    cursors.forEach((el) => {
      gsap.set(el, { x: rnd(0, innerWidth), y: rnd(0, innerHeight), opacity: 0 });
      gsap.to(el, { opacity: 1, duration: 0.8, delay: rnd(0.2, 1.6) });
      wander(el);
    });

    // ---- build: selection box + flying cursor + reveal
    const total = document.querySelectorAll("[data-b]").length;
    let built = 0;
    setH((s) => ({ ...s, total }));
    const seen = new WeakSet();
    let ci = 0;
    const bump = () => setH((s) => ({ ...s, built: ++built, total }));
    const build = (el, delay = 0) => {
      if (seen.has(el)) return;
      seen.add(el);
      const red = el.dataset.b === "red";
      const box = document.createElement("div");
      box.className = "sel" + (red ? " redsel" : "");
      box.innerHTML = '<div class="in"><i class="hd a"></i><i class="hd b"></i><i class="hd c"></i><i class="hd d"></i></div><em></em>';
      boxes.current.appendChild(box);
      const inner = box.firstChild;
      const chip = box.lastChild;
      const place = () => {
        const r = el.getBoundingClientRect();
        // measure the un-translated box: ignore the hidden-state y offset
        box.style.cssText = `left:${r.left}px;top:${r.top}px;width:${r.width}px;height:${r.height}px`;
        chip.textContent = `${Math.round(r.width)} × ${Math.round(r.height)}`;
      };
      gsap.ticker.add(place);
      place();
      const tl = gsap.timeline({ delay });
      tl.fromTo(inner, { opacity: 0, scaleX: 0, scaleY: 0.15 }, { opacity: 1, scaleX: 1, scaleY: 1, duration: 0.45, ease: "power3.out", transformOrigin: "0 0" })
        .fromTo(chip, { opacity: 0 }, { opacity: 1, duration: 0.2 }, "<0.2")
        .add(() => {
          bump();
          if (!el.hasAttribute("data-nr")) gsap.to(el, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" });
        }, "-=0.1")
        .to([inner, chip], { opacity: 0, duration: 0.6 }, "+=0.7")
        .add(() => { gsap.ticker.remove(place); box.remove(); });
      // an agent cursor flies to the element's corner, then goes back to roaming
      const c = cursors[ci++ % cursors.length];
      const r = el.getBoundingClientRect();
      gsap.killTweensOf(c);
      gsap.to(c, { x: Math.min(r.right, innerWidth - 20), y: Math.min(r.bottom, innerHeight - 20), duration: 0.8, delay, ease: "power3.out", onComplete: () => gsap.delayedCall(1, () => wander(c)) });
    };
    const bt = ScrollTrigger.batch("[data-b]", {
      start: "top 92%", once: true,
      onEnter: (els) => els.forEach((e, i) => build(e, i * 0.2)),
      onLeave: (els) => els.forEach((e) => build(e)), // jumped past it via a nav link → still build it
    });

    // ---- auto tour
    const proxy = { y: 0 };
    let tween = null;
    let speed = 1;
    let t0 = 0;
    const stop = () => { tween?.kill(); tween = null; };
    const finish = () => {
      tween = null;
      swarmOn = true;
      setH((s) => ({ ...s, state: "done", secs: ((performance.now() - t0) / 1000).toFixed(1) }));
    };
    const start = () => {
      stop();
      swarmOn = false;
      const lenis = window.__lenis;
      if (!lenis) return;
      const max = document.documentElement.scrollHeight - innerHeight;
      proxy.y = lenis.scroll;
      t0 = performance.now();
      tween = gsap.to(proxy, {
        y: max, ease: "none", duration: Math.max(1, (max - proxy.y) / PX_PER_SEC),
        onUpdate: () => lenis.scrollTo(proxy.y, { immediate: true, force: true }),
        onComplete: finish,
      }).timeScale(speed);
      setH((s) => ({ ...s, state: "touring" }));
    };
    const interrupt = () => { if (tween) { stop(); setH((s) => ({ ...s, state: "paused" })); } };
    addEventListener("wheel", interrupt, { passive: true });
    addEventListener("touchstart", interrupt, { passive: true });
    addEventListener("keydown", interrupt);

    api.current = {
      toggle: () => (tween ? interrupt() : start()),
      speed: () => { speed = SPEEDS[(SPEEDS.indexOf(speed) + 1) % SPEEDS.length]; tween?.timeScale(speed); setH((s) => ({ ...s, speed })); },
      replay: () => { scrollTo(0, 0); location.reload(); },
      hide: () => { interrupt(); setH((s) => ({ ...s, hidden: true })); },
    };

    const kick = noTour ? null : setTimeout(start, 2600);
    return () => {
      alive = false;
      clearTimeout(kick); stop();
      bt.forEach((t) => t.kill());
      removeEventListener("wheel", interrupt); removeEventListener("touchstart", interrupt); removeEventListener("keydown", interrupt);
      gsap.killTweensOf(cursors);
    };
  }, []);

  const pct = Math.min(1, h.built / h.total);
  const agents = 18 + Math.round(pct * 11);
  return (
    <>
      <div ref={layer} className="agents" aria-hidden>
        {KINDS.map((k, i) => <div key={i} className="ag"><Glyph kind={k} c={PASTEL[i % PASTEL.length]} /></div>)}
      </div>
      <div ref={boxes} className="boxes" aria-hidden />
      {!h.hidden && (
        <div className="hud" role="status">
          {h.state === "done" ? (
            <>
              <span>Rebuilt by <b>{agents}</b> agents in <b>{h.secs}s</b></span>
              <div className="bar"><i style={{ width: "100%" }} /></div>
              <button className="blue" onClick={() => api.current.replay()}>Replay</button>
            </>
          ) : (
            <>
              <div className="dots">{PASTEL.slice(0, 5).map((c) => <i key={c} style={{ background: c }} />)}</div>
              <span><b>{agents}</b> agents</span>
              <span><b>{h.built}</b> / {h.total} layers</span>
              <div className="bar"><i style={{ width: pct * 100 + "%" }} /></div>
              <button className="blue" onClick={() => api.current.toggle()}>{h.state === "touring" ? "Touring" : "Tour"}</button>
              <button onClick={() => api.current.speed()}>{h.speed}x</button>
            </>
          )}
          <button onClick={() => api.current.hide()} aria-label="Close">✕</button>
        </div>
      )}
    </>
  );
}
