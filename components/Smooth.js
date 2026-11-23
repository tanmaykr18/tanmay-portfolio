"use client";
// Lenis smooth scroll driven by GSAP's ticker so ScrollTrigger stays frame-perfect.
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";

export default function Smooth() {
  useEffect(() => {
    history.scrollRestoration = "manual";
    scrollTo(0, 0);
    const lenis = new Lenis({ lerp: 0.085 });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
  return null;
}
