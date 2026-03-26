import { forwardRef } from 'react'

const Testimonials = forwardRef(({ t, data }, ref) => {
  const placeholders = [
    {
      name: 'Guru / Mentor',
      role: 'SMKN 4 Bandung',
      text: 'Testimoni akan ditampilkan di sini setelah dikumpulkan dari guru dan teman.',
      initials: 'GM',
    },
  ]

  const testimonials = data.testimonials?.length > 0 ? data.testimonials : placeholders

  return (
    <section id="testimonials" ref={ref} style={{
      minHeight: '80vh', padding: '100px 64px',
      display: 'flex', alignItems: 'center',
      position: 'relative',
    }}>
      <div style={{ width: '100%', maxWidth: '1000px' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ width: '32px', height: '1px', background: t.accent }} />
          <span style={{ fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: t.accent }}>Testimonials</span>
        </div>

        <h2 style={{ fontSize: '48px', fontWeight: '700', letterSpacing: '-2px', marginBottom: '56px' }}>
          What They <span style={{ color: t.accent }}>Say</span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
          {testimonials.map((t2, i) => (
            <div key={i} style={{
              background: t.bg2, border: `0.5px solid ${t.border}`,
              borderRadius: '16px', padding: '32px',
              transition: 'border-color 0.3s, background 0.4s',
              position: 'relative',
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = t.accent}
              onMouseLeave={e => e.currentTarget.style.borderColor = t.border}
            >
              <div style={{ fontSize: '48px', color: t.accentSoft, fontFamily: 'Georgia, serif', lineHeight: 1, marginBottom: '16px', color: t.accent, opacity: 0.3 }}>"</div>
              <p style={{ fontSize: '14px', color: t.textMuted, lineHeight: 1.9, marginBottom: '24px', fontStyle: 'italic' }}>
                {t2.text}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '20px', borderTop: `0.5px solid ${t.border}` }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: t.accentSoft, border: `1px solid ${t.accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '600', color: t.accent, flexShrink: 0 }}>
                  {t2.initials}
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: t.text }}>{t2.name}</div>
                  <div style={{ fontSize: '11px', color: t.textFaint }}>{t2.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
})

Testimonials.displayName = 'Testimonials'
export default Testimonials