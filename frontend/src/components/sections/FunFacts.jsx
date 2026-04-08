import { forwardRef } from 'react'

const FunFacts = forwardRef(({ t, tr }, ref) => {
  const hobbies = [
    { icon: '💻', title: tr.hobby1_title, desc: tr.hobby1_desc },
    { icon: '🏀', title: tr.hobby2_title, desc: tr.hobby2_desc },
    { icon: '🌐', title: tr.hobby3_title, desc: tr.hobby3_desc },
    { icon: '🗣️', title: tr.hobby4_title, desc: tr.hobby4_desc },
  ]

  const learning = [
    { tech: 'React.js Advanced', desc: tr.learn1_desc, progress: 70 },
    { tech: 'React + Laravel', desc: tr.learn2_desc, progress: 65 },
    { tech: 'CyberSecurity', desc: tr.learn3_desc, progress: 35 },
    { tech: 'AI-Assisted Development', desc: tr.learn4_desc, progress: 80 },
  ]

  const facts = [
    { n: '2+', l: tr.fact1_label },
    { n: '3', l: tr.fact2_label },
    { n: '1+', l: tr.fact3_label },
    { n: '∞', l: tr.fact4_label },
  ]

  return (
    <section id="funfacts" ref={ref} style={{ minHeight: '100vh', padding: '100px 64px', display: 'flex', alignItems: 'center', background: t.bg2, transition: 'background 0.4s', position: 'relative' }}>
      <div style={{ width: '100%', maxWidth: '1000px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ width: '32px', height: '1px', background: t.accent }} />
          <span style={{ fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: t.accent }}>{tr.fun_subtitle}</span>
        </div>

        <h2 style={{ fontSize: '48px', fontWeight: '700', letterSpacing: '-2px', marginBottom: '56px' }}>
          {tr.fun_title_1} <span style={{ color: t.accent }}>{tr.fun_title_2}</span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '64px' }} className="facts-grid">
          {facts.map((f, i) => (
            <div key={i} style={{ background: t.bg, border: `0.5px solid ${t.border}`, borderRadius: '14px', padding: '24px', textAlign: 'center', transition: 'all 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = t.accent; e.currentTarget.style.transform = 'translateY(-4px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.transform = 'translateY(0)' }}>
              <div style={{ fontSize: '36px', fontWeight: '700', color: t.accent, marginBottom: '8px' }}>{f.n}</div>
              <div style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: t.textFaint }}>{f.l}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px' }} className="facts-bottom">
          <div>
            <div style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: t.textFaint, marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              {tr.fun_hobbies_label} <span style={{ flex: 1, height: '0.5px', background: t.border }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }} className="hobbies-grid">
              {hobbies.map((h, i) => (
                <div key={i} style={{ background: t.bg, border: `0.5px solid ${t.border}`, borderRadius: '12px', padding: '20px', transition: 'all 0.3s' }}>
                  <div style={{ fontSize: '28px', marginBottom: '10px' }}>{h.icon}</div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: t.text }}>{h.title}</div>
                  <div style={{ fontSize: '11px', color: t.textFaint }}>{h.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: t.textFaint, marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              {tr.fun_learning_label} <span style={{ flex: 1, height: '0.5px', background: t.border }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {learning.map((l, i) => (
                <div key={i} style={{ background: t.bg, border: `0.5px solid ${t.border}`, borderRadius: '12px', padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: t.text }}>{l.tech}</span>
                    <span style={{ fontSize: '11px', color: t.navy, fontWeight: '600' }}>{l.progress}%</span>
                  </div>
                  <div style={{ fontSize: '11px', color: t.textFaint, marginBottom: '12px' }}>{l.desc}</div>
                  <div style={{ height: '3px', background: t.border2, borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${l.progress}%`, background: `linear-gradient(90deg, ${t.navy}, ${t.accent})` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 1024px) { .facts-grid { grid-template-columns: 1fr 1fr !important; } .facts-bottom { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
})

FunFacts.displayName = 'FunFacts'
export default FunFacts