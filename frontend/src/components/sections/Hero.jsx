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
      <div style={{ position: 'absolute', top: '5%', right: '5%', width: '480px', height: '480px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(123,30,43,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '20%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(31,42,68,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '80px', alignItems: 'center', width: '100%', maxWidth: '1100px' }} className="hero-grid">

        {/* LEFT */}
        <div>

          {/* Photo mobile */}
          <div style={{ display: 'none' }} className="hero-photo-mobile">
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden', border: `2px solid ${t.border2}`, margin: '0 0 24px 0' }}>
              <img src="/images/profile.jpg" alt="Abiyya"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={e => {
                  e.target.style.display = 'none'
                  e.target.parentElement.style.background = `linear-gradient(135deg, ${t.bg2}, ${t.navy})`
                  e.target.parentElement.innerHTML += `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:700;color:rgba(123,30,43,0.4)">AHN</div>`
                }} />
            </div>
          </div>

          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }} className="hero-eyebrow-wrap">
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

          {/* Desc */}
          <p style={{ fontSize: '15px', color: t.textFaint, lineHeight: 1.9, maxWidth: '460px', marginBottom: '48px' }} className="hero-desc">
            Membangun solusi digital yang bersih dan terstruktur
            menggunakan Laravel dan React.js. Aktif di komunitas
            ORBIT dan terus berkembang lewat proyek nyata.
          </p>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }} className="hero-buttons">
            <button onClick={() => navigateTo('projects')}
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

            <button onClick={() => navigateTo('contact')}
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

        {/* RIGHT — Flip Card */}
        <div style={{ position: 'relative', flexShrink: 0, width: '300px', height: '420px' }} className="hero-photo">

          <div style={{
            position: 'relative',
            width: '260px', height: '320px',
            perspective: '1000px',
          }}>
            <div style={{
              width: '100%', height: '100%',
              position: 'relative',
              transformStyle: 'preserve-3d',
              animation: 'flipCard 5s ease-in-out infinite',
            }}>
              {/* Front */}
              <div style={{
                position: 'absolute', inset: 0,
                borderRadius: '120px 120px 120px 40px',
                overflow: 'hidden',
                border: `2px solid ${t.border2}`,
                backfaceVisibility: 'hidden',
              }}>
                <img src="/images/profile.jpg" alt="formal"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              {/* Back */}
              <div style={{
                position: 'absolute', inset: 0,
                borderRadius: '120px 120px 120px 40px',
                overflow: 'hidden',
                border: `2px solid ${t.border2}`,
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}>
                <img src="/images/profile-casual.jpg" alt="casual"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          </div>

          {/* Label */}
          <div style={{ position: 'absolute', bottom: '0px', left: '0px', zIndex: 10, width: '280px' }}>
            <div style={{
              background: t.bg, border: `1px solid ${t.border2}`,
              borderRadius: '12px', padding: '14px 18px',
              marginBottom: '10px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
            }}>
              <div style={{
                fontSize: '13px', fontWeight: '600',
                color: t.accent, marginBottom: '4px',
                fontStyle: 'italic',
              }}>
                "Code is poetry,<br/>build it with heart."
              </div>
              <div style={{ fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', color: t.textFaint }}>
                — Abiyya Hamdan Nurwandha
              </div>
            </div>

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
      <div style={{ position: 'absolute', bottom: '48px', right: '64px', display: 'flex', gap: '48px' }} className="hero-stats">
        {[
          { n: `${data.projects.length}+`, l: 'Projects' },
          { n: '3', l: 'Languages' },
          { n: `${data.skills.length}`, l: 'Skills' },
        ].map((s, i) => (
          <div key={i} style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '32px', fontWeight: '700', color: t.accent }}>{s.n}</div>
            <div style={{ fontSize: '9px', letterSpacing: '2.5px', textTransform: 'uppercase', color: t.textFaint }}>{s.l}</div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes flipCard {
          0%, 40% { transform: rotateY(0deg); }
          50%, 90% { transform: rotateY(180deg); }
          100% { transform: rotateY(0deg); }
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
          .hero-name { font-size: 52px !important; }
          .hero-name-sub { font-size: 42px !important; }
          .hero-desc { font-size: 14px !important; }
          .hero-buttons { flex-direction: column !important; }
          .hero-stats { display: none !important; }
          .hero-stats-mobile { display: flex !important; }
        }
      `}</style>
    </section>
  )
})

Hero.displayName = 'Hero'
export default Hero