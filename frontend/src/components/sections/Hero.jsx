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
      marginTop: 0,
    }} className="hero-section">

      {/* Background blobs */}
      <div style={{ position: 'absolute', top: '5%', right: '5%', width: '480px', height: '480px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(123,30,43,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '20%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(31,42,68,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '80px', alignItems: 'center', width: '100%', maxWidth: '1100px' }} className="hero-grid">

        {/* LEFT */}
        <div>
          <div style={{ display: 'none' }} className="hero-photo-mobile">
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden', border: `2px solid ${t.border2}`, margin: '0 0 24px 0' }}>
              <img src="/images/profile.jpg" alt="Abiyya"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
            <div style={{ width: '32px', height: '1px', background: t.accent }} />
            <span style={{ fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: t.textFaint }}>
              Fresh Graduate · RPL · SMKN 4 Bandung
            </span>
          </div>

          <h1 style={{ fontSize: '72px', fontWeight: '700', lineHeight: 1.0, letterSpacing: '-3px' }}>
            <span style={{ display: 'block', color: t.text }}>Abiyya</span>
            <span style={{ display: 'block', color: t.accent }}>Hamdan</span>
            <span style={{ display: 'block', color: t.textFaint, fontWeight: '300', fontSize: '58px' }}>Nurwandha</span>
          </h1>

          <div style={{ height: '28px', display: 'flex', alignItems: 'center', gap: '4px', margin: '24px 0 28px' }}>
            <span style={{ fontSize: '17px', color: t.textMuted }}>{typed}</span>
            <span style={{ width: '2px', height: '20px', background: t.accent, animation: 'blink 1s step-end infinite' }} />
          </div>

          <p style={{ fontSize: '15px', color: t.textFaint, lineHeight: 1.9, maxWidth: '460px', marginBottom: '48px' }}>
            Membangun solusi digital yang bersih dan terstruktur
            menggunakan Laravel dan React.js. Aktif di komunitas
            ORBIT dan terus berkembang lewat proyek nyata.
          </p>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <button onClick={() => navigateTo('projects')}>View Work</button>
            <a href="/cv-abiyya.pdf" download>Download CV</a>
            <button onClick={() => navigateTo('contact')}>Contact Me</button>
          </div>
        </div>

        {/* RIGHT — Morph Slide Photos */}
        <div style={{ position: 'relative', flexShrink: 0, width: '300px', height: '420px' }} className="hero-photo">

          <div style={{ position: 'relative', width: '260px', height: '320px', overflow: 'hidden', borderRadius: '120px 120px 120px 40px', border: `2px solid ${t.border2}` }}>

            {/* Photo 1 */}
            <div style={{
              position: 'absolute', inset: 0,
              animation: 'slidePhoto1 6s ease-in-out infinite',
            }}>
              <img src="/images/profile.jpg" alt="formal"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Photo 2 */}
            <div style={{
              position: 'absolute', inset: 0,
              animation: 'slidePhoto2 6s ease-in-out infinite',
            }}>
              <img src="/images/profile-casual.jpg" alt="casual"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>

          {/* Label */}
          <div style={{ position: 'absolute', bottom: '0px', left: '0px', width: '280px' }}>
            <div style={{ background: t.bg, border: `1px solid ${t.border2}`, borderRadius: '12px', padding: '14px 18px' }}>
              <div style={{ fontSize: '13px', color: t.accent, fontStyle: 'italic' }}>
                "Code is poetry,
              </div>
              <div style={{ fontSize: '13px', color: t.accent, fontStyle: 'italic' }}>
                build it with heart."
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }

        @keyframes slidePhoto1 {
          0%, 35% { opacity: 1; transform: translateX(0) scale(1); }
          45%, 90% { opacity: 0; transform: translateX(-40px) scale(0.95); }
          100% { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes slidePhoto2 {
          0%, 35% { opacity: 0; transform: translateX(40px) scale(0.95); }
          45%, 90% { opacity: 1; transform: translateX(0) scale(1); }
          100% { opacity: 0; transform: translateX(40px) scale(0.95); }
        }
      `}</style>
    </section>
  )
})

Hero.displayName = 'Hero'
export default Hero