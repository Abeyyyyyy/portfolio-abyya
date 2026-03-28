import { forwardRef } from 'react'

const FunFacts = forwardRef(({ t }, ref) => {
  const hobbies = [
    { icon: '💻', title: 'Coding', desc: 'Passionate membangun web apps dari nol sampai jadi.' },
    { icon: '🏀', title: 'Basketball', desc: 'Main basket bareng teman — teamwork on and off court.' },
    { icon: '🌐', title: 'ORBIT', desc: 'Aktif berorganisasi di komunitas teknologi ORBIT.' },
    { icon: '🗣️', title: 'Language', desc: 'Belajar bahasa baru — Indonesia, English, dan Chinese.' },
  ]

  const learning = [
    { tech: 'React.js', desc: 'Memperdalam hooks, state management, dan best practices.', progress: 70 },
    { tech: 'React + Laravel', desc: 'Fullstack integration — REST API + SPA architecture.', progress: 65 },
    { tech: 'CyberSecurity', desc: 'Belajar dasar-dasar keamanan web dan ethical hacking.', progress: 30 },
  ]

  const facts = [
    { n: '2+', l: 'Projects Built' },
    { n: '3', l: 'Languages Spoken' },
    { n: '1+', l: 'Year Coding' },
    { n: '∞', l: 'Willingness to Learn' },
  ]

  return (
    <section id="funfacts" ref={ref} style={{
      minHeight: '100vh', padding: '100px 64px',
      display: 'flex', alignItems: 'center',
      background: t.bg2, transition: 'background 0.4s',
      position: 'relative',
    }}>
      <div style={{ width: '100%', maxWidth: '1000px' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ width: '32px', height: '1px', background: t.accent }} />
          <span style={{ fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: t.accent }}>Fun Facts</span>
        </div>

        <h2 style={{ fontSize: '48px', fontWeight: '700', letterSpacing: '-2px', marginBottom: '56px' }}>
          Beyond <span style={{ color: t.accent }}>The Code</span>
        </h2>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '64px' }} className="facts-grid">
          {facts.map((f, i) => (
            <div key={i} style={{ background: t.bg, border: `0.5px solid ${t.border}`, borderRadius: '14px', padding: '24px', textAlign: 'center', transition: 'all 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = t.accent; e.currentTarget.style.transform = 'translateY(-4px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <div style={{ fontSize: '36px', fontWeight: '700', color: t.accent, letterSpacing: '-1px', marginBottom: '8px' }}>{f.n}</div>
              <div style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: t.textFaint }}>{f.l}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px' }} className="facts-bottom">

          {/* Hobbies */}
          <div>
            <div style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: t.textFaint, marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              Hobbies & Interests
              <span style={{ flex: 1, height: '0.5px', background: t.border }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }} className="hobbies-grid">
              {hobbies.map((h, i) => (
                <div key={i} style={{ background: t.bg, border: `0.5px solid ${t.border}`, borderRadius: '12px', padding: '20px', transition: 'all 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = t.accent; e.currentTarget.style.transform = 'translateY(-3px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <div style={{ fontSize: '28px', marginBottom: '10px' }}>{h.icon}</div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: t.text, marginBottom: '6px' }}>{h.title}</div>
                  <div style={{ fontSize: '11px', color: t.textFaint, lineHeight: 1.7 }}>{h.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Currently Learning */}
          <div>
            <div style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: t.textFaint, marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              Currently Learning
              <span style={{ flex: 1, height: '0.5px', background: t.border }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {learning.map((l, i) => (
                <div key={i} style={{ background: t.bg, border: `0.5px solid ${t.border}`, borderRadius: '12px', padding: '20px', transition: 'border-color 0.3s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = t.navy}
                  onMouseLeave={e => e.currentTarget.style.borderColor = t.border}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: t.text }}>{l.tech}</span>
                    <span style={{ fontSize: '11px', color: t.navy, fontWeight: '600' }}>{l.progress}%</span>
                  </div>
                  <div style={{ fontSize: '11px', color: t.textFaint, lineHeight: 1.7, marginBottom: '12px' }}>{l.desc}</div>
                  <div style={{ height: '3px', background: t.border2, borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${l.progress}%`, background: `linear-gradient(90deg, ${t.navy}, ${t.accent})`, borderRadius: '2px', transition: 'width 1.2s' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
  @media (max-width: 1024px) {
    .facts-grid { grid-template-columns: 1fr 1fr !important; }
    .facts-bottom { grid-template-columns: 1fr !important; }
  }
  @media (max-width: 768px) {
    .facts-grid { grid-template-columns: 1fr 1fr !important; }
    .hobbies-grid { grid-template-columns: 1fr 1fr !important; }
  }
`}</style>
    </section>
  )
})

FunFacts.displayName = 'FunFacts'
export default FunFacts