"use client";
// "From wireframe to live": a grey wireframe that turns into the finished design.
// Scroll scrubs the divider; drag it by hand to take over.
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "./gsap";

export default function Compare() {
  const box = useRef(null);
  const [pos, setPos] = useState(100); // % of the width still showing the wireframe
  const drag = useRef(false);

  useEffect(() => {
    const o = { v: 100 };
    const t = gsap.to(o, {
      v: 6, ease: "none", onUpdate: () => !drag.current && setPos(o.v),
      scrollTrigger: { trigger: box.current, start: "top 78%", end: "bottom 38%", scrub: true },
    });
    return () => { t.scrollTrigger?.kill(); t.kill(); };
  }, []);

  const move = (e) => {
    if (!drag.current) return;
    const r = box.current.getBoundingClientRect();
    setPos(Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100)));
  };

  return (
    <div className="cmp" ref={box}
      onPointerDown={(e) => { drag.current = true; e.currentTarget.setPointerCapture(e.pointerId); move(e); }}
      onPointerMove={move} onPointerUp={() => (drag.current = false)}>
      {/* final design */}
      <div className="layer final">
        <div className="f-top">
          <div className="f-nav"><b>Beavertail</b><i /><i /><i /><i /></div>
          <div className="f-copy"><h4>Run Smarter.<br />Cut Costs.</h4><p>Invoices, inventory and recipes — one platform for restaurants.</p><span>Book a demo</span></div>
          <div className="f-bar" />
          <div className="f-rate"><b>4.9</b><small>★★★★★</small></div>
        </div>
        <div className="f-bot"><h5>Invoices, understood.<br />Built around you.</h5><div>{[100, 90, 96, 70].map((w, i) => <i key={i} style={{ width: w + "%" }} />)}</div></div>
      </div>
      {/* wireframe */}
      <div className="layer wire" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <div className="w-top"><i className="w1" /><i className="w2" /><i className="w3" /></div>
        <div className="w-mid"><i /><i /><i /></div>
        <div className="w-bot"><i /><i /><i /></div>
      </div>
      <div className="divider" style={{ left: pos + "%" }}><span>⇆</span></div>
      <em className="tg l">WIREFRAME</em><em className="tg r">FINAL DESIGN</em>
    </div>
  );
}
