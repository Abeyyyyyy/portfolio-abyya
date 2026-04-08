import { forwardRef } from 'react'

const Education = forwardRef(({ t, data }, ref) => {
  return (
    <section id="education" ref={ref} style={{
      minHeight: '60vh', padding: '100px 64px',
      display: 'flex', alignItems: 'center',
      position: 'relative',
    }}>
      <div style={{ width: '100%', maxWidth: '900px' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ width: '32px', height: '1px', background: t.accent }} />
          <span style={{ fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: t.accent }}>Education</span>
        </div>

        <h2 style={{ fontSize: '48px', fontWeight: '700', letterSpacing: '-2px', marginBottom: '48px' }}>
          My <span style={{ color: t.accent }}>Background</span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }} className="edu-grid">
          {data.educations.length === 0 ? (
            <p style={{ color: t.textFaint, fontSize: '13px' }}>Belum ada data pendidikan.</p>
          ) : data.educations.map(edu => (
            <div key={edu.id} style={{
              background: t.bg2, border: `0.5px solid ${t.border}`,
              borderLeft: `3px solid ${edu.accent === 'pink' ? t.pink : t.accent}`,
              borderRadius: '12px', padding: '24px',
              transition: 'transform 0.2s, border-color 0.2s, background 0.4s',
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ fontSize: '15px', fontWeight: '600', color: t.text, marginBottom: '4px' }}>{edu.institution}</div>
              <div style={{ fontSize: '12px', color: t.textMuted, marginBottom: '8px' }}>{edu.major}</div>
              <div style={{ fontSize: '10px', color: t.textFaint, letterSpacing: '1px' }}>
                {edu.start_year} — {edu.end_year || 'Sekarang'}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
  @media (max-width: 768px) {
    .edu-grid { grid-template-columns: 1fr !important; }
  }
`}</style>
    </section>
  )
})

Education.displayName = 'Education'
export default Education