// Generated "screenshots" for each project (swap for real images any time: <img src=... />).
const bars = [40, 65, 35, 80, 55, 90, 60, 75];

export default function Shot({ k }) {
  switch (k) {
    case 0: // dashboard
      return (
        <div className="shot s0">
          <aside>{[1, 2, 3, 4, 5].map((i) => <i key={i} />)}</aside>
          <main>
            <div className="kpis"><b>$48.2k</b><b>31.4%</b><b>−12%</b></div>
            <svg viewBox="0 0 200 70" preserveAspectRatio="none"><polyline fill="none" stroke="#ff2a3f" strokeWidth="2" points="0,55 25,40 50,48 75,25 100,34 125,14 150,28 175,10 200,18" /><polyline fill="rgba(255,42,63,.15)" stroke="none" points="0,55 25,40 50,48 75,25 100,34 125,14 150,28 175,10 200,18 200,70 0,70" /></svg>
            <div className="bars">{bars.map((h, i) => <i key={i} style={{ height: h + "%" }} />)}</div>
          </main>
        </div>
      );
    case 1: // invoice OCR
      return (
        <div className="shot s1">
          <div className="paper">{[100, 60, 90, 70, 100, 50, 80].map((w, i) => <i key={i} style={{ width: w + "%" }} />)}</div>
          <div className="tbl">
            {["SYSCO · 42 items", "units standardized", "catalog matched", "cost / case ✓"].map((t, i) => <span key={i} className={i === 3 ? "hl" : ""}>{t}</span>)}
          </div>
          <div className="scan" />
        </div>
      );
    case 2: // matcher
      return (
        <div className="shot s2">
          {[["EXACT MATCH", "61%"], ["FUZZY · RAPIDFUZZ", "18%"], ["SEMANTIC · EMBEDDINGS", "6%"]].map(([a, b], i) => (
            <div key={i} style={{ marginLeft: i * 16 }}><span>{a}</span><b>{b}</b></div>
          ))}
          <h4>85%+ <small>no AI call</small></h4>
        </div>
      );
    case 3: // focusguard
      return (
        <div className="shot s3">
          <div className="cam"><div className="box"><span>phone 0.92</span></div></div>
          <div className="orb" />
          <small>● DISTRACTED — 00:07</small>
        </div>
      );
    case 4: // video gen
      return (
        <div className="shot s4">
          <h4>VEO<em>3</em></h4>
          <div className="tl">{[30, 18, 26, 14, 22].map((w, i) => <i key={i} style={{ flex: w }} />)}</div>
          <small>85% automated</small>
        </div>
      );
    default: // chatbot
      return (
        <div className="shot s5">
          <p className="l">What's on the menu today?</p>
          <p className="r">Three specials, plus the chef's tasting plate…</p>
          <span className="mic">🎙</span>
        </div>
      );
  }
}
