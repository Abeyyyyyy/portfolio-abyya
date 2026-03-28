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
      minHeight: '100vh', padding: '0 64px',
      display: 'flex', alignItems: 'center',
      position: 'relative', overflow: 'hidden',
    }} className="hero-section">

      {/* Background blobs */}
      <div style={{ position: 'absolute', top: '5%', right: '5%', width: '480px', height: '480px', borderRadius: '50%', background: `radial-gradient(circle, rgba(123,30,43,0.08) 0%, transparent 70%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '20%', width: '300px', height: '300px', borderRadius: '50%', background: `radial-gradient(circle, rgba(31,42,68,0.08) 0%, transparent 70%)`, pointerEvents: 'none' }} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '80px', alignItems: 'center', width: '100%', maxWidth: '1100px' }} className="hero-grid">

        {/* Left */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
            <div style={{ width: '32px', height: '1px', background: t.accent }} />
            <span style={{ fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: t.textFaint }}>
              Fresh Graduate · RPL · SMKN 4 Bandung
            </span>
          </div>

          <h1 style={{ fontSize: '72px', fontWeight: '700', lineHeight: 1.0, letterSpacing: '-3px', marginBottom: '0' }}>
            <span style={{ display: 'block', color: t.text }}>Abiyya</span>
            <span style={{ display: 'block', color: t.accent }}>Hamdan</span>
            <span style={{ display: 'block', color: t.textFaint, fontWeight: '300', fontSize: '58px' }}>Nurwandha</span>
          </h1>

          <div style={{ height: '28px', display: 'flex', alignItems: 'center', gap: '4px', margin: '24px 0 28px' }}>
            <span style={{ fontSize: '17px', color: t.textMuted }}>{typed}</span>
            <span style={{ display: 'inline-block', width: '2px', height: '20px', background: t.accent, animation: 'blink 1s step-end infinite' }} />
          </div>

          <p style={{ fontSize: '15px', color: t.textFaint, lineHeight: 1.9, maxWidth: '460px', marginBottom: '48px' }}>
            Membangun solusi digital yang bersih dan terstruktur
            menggunakan Laravel dan React.js. Aktif di komunitas
            ORBIT dan terus berkembang lewat proyek nyata.
          </p>

          <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => navigateTo('projects')}
              style={{ background: t.accent, color: '#F2E8DF', border: 'none', borderRadius: '8px', padding: '15px 36px', fontSize: '11px', fontWeight: '600', letterSpacing: '2.5px', textTransform: 'uppercase', cursor: 'none', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: `0 8px 24px rgba(123,30,43,0.25)` }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 12px 32px rgba(123,30,43,0.35)` }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 8px 24px rgba(123,30,43,0.25)` }}>
              View Work
            </button>

            <a href="/cv-abiyya.pdf" download
              style={{ background: t.navySoft, color: t.navy, border: `1px solid ${t.navy}`, borderRadius: '8px', padding: '15px 36px', fontSize: '11px', fontWeight: '600', letterSpacing: '2.5px', textTransform: 'uppercase', cursor: 'none', transition: 'all 0.2s', textDecoration: 'none', display: 'inline-block' }}
              onMouseEnter={e => { e.currentTarget.style.background = t.navy; e.currentTarget.style.color = '#F2E8DF'; e.currentTarget.style.transform = 'translateY(-3px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = t.navySoft; e.currentTarget.style.color = t.navy; e.currentTarget.style.transform = 'translateY(0)' }}>
              Download CV
            </a>

            <button onClick={() => navigateTo('contact')}
              style={{ background: 'transparent', color: t.textMuted, border: `1px solid ${t.border2}`, borderRadius: '8px', padding: '15px 36px', fontSize: '11px', letterSpacing: '2.5px', textTransform: 'uppercase', cursor: 'none', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = t.accent; e.currentTarget.style.color = t.accent; e.currentTarget.style.transform = 'translateY(-3px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = t.border2; e.currentTarget.style.color = t.textMuted; e.currentTarget.style.transform = 'translateY(0)' }}>
              Contact Me
            </button>
          </div>
        </div>

        {/* Right — Profile Photo */}
        <div style={{ position: 'relative', flexShrink: 0 }} className="hero-photo">
          <div style={{
            width: '280px', height: '340px',
            borderRadius: '120px 120px 120px 40px',
            overflow: 'hidden', position: 'relative',
            border: `2px solid ${t.border2}`,
          }}>
            <img
              src="/images/profile.jpg"
              alt="Abiyya Hamdan Nurwandha"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={e => {
                e.target.style.display = 'none'
                e.target.parentElement.style.background = `linear-gradient(135deg, ${t.bg2}, ${t.navy})`
                e.target.parentElement.innerHTML += `<div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px"><div style="font-size:64px;font-weight:700;color:rgba(242,232,223,0.2);letter-spacing:-2px">AHN</div><div style="font-size:11px;letter-spacing:3px;color:rgba(242,232,223,0.2);text-transform:uppercase">Photo Soon</div></div>`
              }}
            />
            <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${t.accent}22, transparent 60%)` }} />
          </div>

          {/* Accent corner */}
          <div style={{ position: 'absolute', bottom: '-12px', left: '-12px', width: '80px', height: '80px', borderRadius: '20px', background: t.accent, opacity: 0.15 }} />
          <div style={{ position: 'absolute', top: '-12px', right: '-12px', width: '48px', height: '48px', borderRadius: '12px', background: t.navy, opacity: 0.2 }} />

          {/* Status badge */}
          <div style={{
            position: 'absolute', bottom: '24px', left: '-24px',
            background: t.bg, border: `1px solid ${t.border2}`,
            borderRadius: '40px', padding: '10px 18px',
            display: 'flex', alignItems: 'center', gap: '8px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
          }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80', animation: 'pulse 2s ease-in-out infinite' }} />
            <span style={{ fontSize: '11px', color: t.textMuted, letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>Available for PKL</span>
          </div>
        </div>
      </div>

      {/* Stats bottom */}
      <div style={{ position: 'absolute', bottom: '48px', right: '64px', display: 'flex', gap: '48px' }} className="hero-stats">
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
      @media (max-width: 1024px) {
        .hero-section { padding: 80px 40px !important; }
        .hero-grid { grid-template-columns: 1fr !important; }
        .hero-photo { display: none !important; }
        .hero-title { font-size: 52px !important; }
        .hero-stats { bottom: 24px !important; right: 40px !important; gap: 24px !important; }
      }
      @media (max-width: 768px) {
        .hero-section { padding: 40px 24px 80px !important; }
        .hero-title { font-size: 40px !important; letter-spacing: -1px !important; }
        .hero-stats { position: static !important; margin-top: 40px; justify-content: flex-start; }
        .hero-buttons { flex-wrap: wrap !important; }
        .scroll-hint { display: none !important; }
      }
    `}</style>
    </section>
  )
})

Hero.displayName = 'Hero'
export default Hero