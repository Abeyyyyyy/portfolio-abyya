import { useState, useEffect, forwardRef } from 'react'

const Hero = forwardRef(({ t, data, navigateTo }, ref) => {
  const [typed, setTyped] = useState('')

  useEffect(() => {
    const phrases = [
      'Fullstack Web Developer',
      'React.js Enthusiast',
      'Laravel Developer',
      'Fresh Graduate RPL',
    ]
    let pi = 0, ci = 0, del = false
    const id = setInterval(() => {
      const cur = phrases[pi]
      if (!del) {
        ci++; setTyped(cur.slice(0, ci))
        if (ci === cur.length) del = true
      } else {
        ci--; setTyped(cur.slice(0, ci))
        if (ci === 0) { del = false; pi = (pi + 1) % phrases.length }
      }
    }, 80)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="hero" ref={ref} style={{
      minHeight: '100vh',
      padding: '0 64px',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
    }} className="hero-section">

      {/* Background blobs */}
      <div style={{ position: 'absolute', top: '5%', right: '5%', width: '480px', height: '480px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(123,30,43,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '20%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(31,42,68,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* MAIN GRID */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: '80px',
        alignItems: 'center',
        width: '100%',
        maxWidth: '1100px',
      }} className="hero-grid">

        {/* ── LEFT ── */}
        <div>

          {/* Photo mobile */}
          <div style={{ display: 'none' }} className="hero-photo-mobile">
            <div style={{
              width: '100px', height: '100px',
              borderRadius: '50%', overflow: 'hidden',
              border: `2px solid ${t.border2}`,
              margin: '0 0 24px 0',
            }}>
              <img src="/images/profile.jpg" alt="Abiyya"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={e => {
                  e.target.style.display = 'none'
                  e.target.parentElement.style.background = `linear-gradient(135deg, ${t.bg2}, ${t.navy})`
                  e.target.parentElement.innerHTML += `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:700;color:rgba(123,30,43,0.4)">AHN</div>`
                }}
              />
            </div>
          </div>

          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
            <div style={{ width: '32px', height: '1px', background: t.accent, flexShrink: 0 }} />
            <span style={{ fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: t.textFaint }} className="hero-eyebrow">
              Fresh Graduate · RPL · SMKN 4 Bandung
            </span>
          </div>

          {/* Name */}
          <h1 style={{ fontSize: '72px', fontWeight: '700', lineHeight: 1.0, letterSpacing: '-3px', marginBottom: '0' }}>
            <span style={{ display: 'block', color: t.text }} className="hero-name">Abiyya</span>
            <span style={{ display: 'block', color: t.accent }} className="hero-name">Hamdan</span>
            <span style={{ display: 'block', color: t.textFaint, fontWeight: '300', fontSize: '58px' }} className="hero-name-sub">Nurwandha</span>
          </h1>

          {/* Typing */}
          <div style={{ height: '28px', display: 'flex', alignItems: 'center', gap: '4px', margin: '24px 0 28px' }}>
            <span style={{ fontSize: '17px', color: t.textMuted }}>{typed}</span>
            <span style={{ display: 'inline-block', width: '2px', height: '20px', background: t.accent, animation: 'blink 1s step-end infinite' }} />
          </div>

          {/* Description */}
          <p style={{ fontSize: '15px', color: t.textFaint, lineHeight: 1.9, maxWidth: '460px', marginBottom: '48px' }} className="hero-desc">
            Membangun solusi digital yang bersih dan terstruktur
            menggunakan Laravel dan React.js. Aktif di komunitas
            ORBIT dan terus berkembang lewat proyek nyata.
          </p>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }} className="hero-buttons">
            <button
              onClick={() => navigateTo('projects')}
              style={{ background: t.accent, color: '#F2E8DF', border: 'none', borderRadius: '8px', padding: '15px 36px', fontSize: '11px', fontWeight: '600', letterSpacing: '2.5px', textTransform: 'uppercase', cursor: 'none', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 8px 24px rgba(123,30,43,0.25)' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(123,30,43,0.35)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(123,30,43,0.25)' }}>
              View Work
            </button>

            <a href="/cv-abiyya.pdf" download
              style={{ background: t.navySoft, color: t.navy, border: `1px solid ${t.navy}`, borderRadius: '8px', padding: '15px 36px', fontSize: '11px', fontWeight: '600', letterSpacing: '2.5px', textTransform: 'uppercase', cursor: 'none', transition: 'all 0.2s', textDecoration: 'none', display: 'inline-block' }}
              onMouseEnter={e => { e.currentTarget.style.background = t.navy; e.currentTarget.style.color = '#F2E8DF'; e.currentTarget.style.transform = 'translateY(-3px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = t.navySoft; e.currentTarget.style.color = t.navy; e.currentTarget.style.transform = 'translateY(0)' }}>
              Download CV
            </a>

            <button
              onClick={() => navigateTo('contact')}
              style={{ background: 'transparent', color: t.textMuted, border: `1px solid ${t.border2}`, borderRadius: '8px', padding: '15px 36px', fontSize: '11px', letterSpacing: '2.5px', textTransform: 'uppercase', cursor: 'none', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = t.accent; e.currentTarget.style.color = t.accent; e.currentTarget.style.transform = 'translateY(-3px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = t.border2; e.currentTarget.style.color = t.textMuted; e.currentTarget.style.transform = 'translateY(0)' }}>
              Contact Me
            </button>
          </div>

          {/* Stats mobile */}
          <div style={{ display: 'none', gap: '32px', marginTop: '32px' }} className="hero-stats-mobile">
            {[
              { n: `${data.projects.length}+`, l: 'Projects' },
              { n: '3', l: 'Languages' },
              { n: `${data.skills.length}`, l: 'Skills' },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: '28px', fontWeight: '700', color: t.accent, lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: t.textFaint, marginTop: '4px' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT — Slide Photos ── */}
        <div style={{ position: 'relative', flexShrink: 0, width: '300px', height: '420px' }} className="hero-photo">

          {/* Photo frame */}
          <div style={{
            position: 'relative',
            width: '260px', height: '320px',
            overflow: 'hidden',
            borderRadius: '120px 120px 120px 40px',
            border: `2px solid ${t.border2}`,
          }}>
            {/* Photo 1 — formal */}
            <div style={{ position: 'absolute', inset: 0, animation: 'slidePhoto1 6s ease-in-out infinite' }}>
              <img src="/images/profile.jpg" alt="Abiyya formal"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={e => {
                  e.target.style.display = 'none'
                  e.target.parentElement.style.background = `linear-gradient(135deg, ${t.bg2}, ${t.navy})`
                  e.target.parentElement.innerHTML += `<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:48px;font-weight:700;color:rgba(123,30,43,0.2)">AHN</div>`
                }} />
              <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, rgba(123,30,43,0.15), transparent 60%)` }} />
            </div>

            {/* Photo 2 — casual */}
            <div style={{ position: 'absolute', inset: 0, animation: 'slidePhoto2 6s ease-in-out infinite' }}>
              <img src="/images/profile-casual.jpg" alt="Abiyya casual"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={e => {
                  e.target.style.display = 'none'
                  e.target.parentElement.style.background = `linear-gradient(135deg, ${t.navy}, #2d3f6b)`
                }} />
              <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, rgba(31,42,68,0.3), transparent 60%)` }} />
            </div>
          </div>

          {/* Label bawah */}
          <div style={{ position: 'absolute', bottom: '0px', left: '0px', zIndex: 10, width: '280px' }}>
            <div style={{
              background: t.bg,
              border: `1px solid ${t.border2}`,
              borderRadius: '12px',
              padding: '14px 18px',
              marginBottom: '10px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
            }}>
              <div style={{ fontSize: '13px', fontWeight: '600', color: t.accent, fontStyle: 'italic', lineHeight: 1.6 }}>
                "Code is poetry,<br />build it with heart."
              </div>
              <div style={{ fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', color: t.textFaint, marginTop: '6px' }}>
                — Abiyya Hamdan Nurwandha
              </div>
            </div>

            {/* Status badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: t.bg, border: `1px solid ${t.border2}`,
              borderRadius: '40px', padding: '6px 14px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
            }}>
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#4ade80', animation: 'pulse 2s ease-in-out infinite' }} />
              <span style={{ fontSize: '10px', color: t.textMuted, letterSpacing: '0.5px' }}>Available for PKL</span>
            </div>
          </div>

          {/* Decorations */}
          <div style={{ position: 'absolute', bottom: '80px', left: '-16px', width: '56px', height: '56px', borderRadius: '14px', background: t.accent, opacity: 0.1 }} />
          <div style={{ position: 'absolute', top: '-12px', right: '0px', width: '36px', height: '36px', borderRadius: '10px', background: t.navy, opacity: 0.15 }} />
        </div>
      </div>

      {/* Stats desktop */}
      <div style={{
        position: 'absolute', bottom: '48px', right: '64px',
        display: 'flex', gap: '48px',
      }} className="hero-stats">
        {[
          { n: `${data.projects.length}+`, l: 'Projects' },
          { n: '3', l: 'Languages' },
          { n: `${data.skills.length}`, l: 'Skills' },
        ].map((s, i) => (
          <div key={i} style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '32px', fontWeight: '700', color: t.accent, lineHeight: 1, letterSpacing: '-1px' }}>{s.n}</div>
            <div style={{ fontSize: '9px', letterSpacing: '2.5px', textTransform: 'uppercase', color: t.textFaint, marginTop: '6px' }}>{s.l}</div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }

        @keyframes slidePhoto1 {
          0%, 35%  { opacity: 1; transform: translateX(0) scale(1); }
          45%, 90% { opacity: 0; transform: translateX(-40px) scale(0.95); }
          100%     { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes slidePhoto2 {
          0%, 35%  { opacity: 0; transform: translateX(40px) scale(0.95); }
          45%, 90% { opacity: 1; transform: translateX(0) scale(1); }
          100%     { opacity: 0; transform: translateX(40px) scale(0.95); }
        }

        @media (max-width: 1024px) {
          .hero-section { padding: 60px 40px 120px !important; }
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .hero-photo { display: none !important; }
          .hero-photo-mobile { display: block !important; }
          .hero-stats { bottom: 24px !important; right: 40px !important; gap: 24px !important; }
        }
        @media (max-width: 768px) {
          .hero-section { padding: 40px 24px 60px !important; }
          .hero-name { font-size: 52px !important; letter-spacing: -2px !important; }
          .hero-name-sub { font-size: 42px !important; }
          .hero-desc { font-size: 14px !important; max-width: 100% !important; margin-bottom: 32px !important; }
          .hero-buttons { flex-direction: column !important; gap: 10px !important; }
          .hero-buttons button, .hero-buttons a { width: 100% !important; text-align: center !important; }
          .hero-stats { display: none !important; }
          .hero-stats-mobile { display: flex !important; }
          .hero-eyebrow { font-size: 9px !important; letter-spacing: 2px !important; }
        }
        @media (max-width: 380px) {
          .hero-name { font-size: 40px !important; }
          .hero-name-sub { font-size: 32px !important; }
        }
      `}</style>
    </section>
  )
})

Hero.displayName = 'Hero'
export default Hero