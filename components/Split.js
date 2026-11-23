"use client";
// Word-split text that animates in on scroll.
//  mode="mask"  → each word slides up out of a mask when the heading enters view
//  mode="scrub" → words light up one by one, tied directly to scroll position
// Markup: *red words*   |  = line break.   b → also gets an agent selection box.
import { useLayoutEffect, useRef } from "react";
import { gsap } from "./gsap";

function tokens(text) {
  const out = [];
  let red = false;
  text.split(/(\*|\|)/).forEach((p) => {
    if (p === "*") red = !red;
    else if (p === "|") out.push({ br: true });
    else p.split(" ").filter(Boolean).forEach((w) => out.push({ w, red }));
  });
  return out;
}

export default function Split({ text, as: T = "div", mode = "mask", className = "", start = "top 90%", b }) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const words = ref.current.querySelectorAll(".wi");
      if (mode === "mask") {
        gsap.from(words, {
          yPercent: 118, rotate: 3, duration: 1.05, ease: "power4.out", stagger: 0.055,
          scrollTrigger: { trigger: ref.current, start },
        });
      } else {
        gsap.fromTo(words, { opacity: 0.1 }, {
          opacity: 1, stagger: 0.5, ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top 88%", end: "bottom 52%", scrub: true },
        });
      }
    }, ref);
    return () => ctx.revert();
  }, [mode, start]);

  return (
    <T ref={ref} className={className} {...(b ? { "data-b": b, "data-nr": "" } : {})}>
      {tokens(text).map((k, i) =>
        k.br ? <br key={i} /> : (
          <span key={i}>
            <span className="w"><span className={"wi" + (k.red ? " red" : "")}>{k.w}</span></span>{" "}
          </span>
        )
      )}
    </T>
  );
}
