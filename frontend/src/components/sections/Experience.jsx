import { forwardRef } from 'react'

const Experience = forwardRef(({ t, data }, ref) => {
  return (
    <section
      id="experience"
      ref={ref}
      style={{
        minHeight: '100vh',
        padding: '100px 64px',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <div style={{ width: '100%', maxWidth: '900px' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ width: '32px', height: '1px', background: t.accent }} />
          <span style={{ fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: t.accent }}>Experience</span>
        </div>

        <h2 style={{ fontSize: '48px', fontWeight: '700', letterSpacing: '-2px', marginBottom: '64px' }}>
          My <span style={{ color: t.accent }}>Journey</span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }} className="exp-grid">

          {/* Work */}
          <div>
            <div style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: t.textFaint, marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              Work
              <span style={{ flex: 1, height: '0.5px', background: t.border }} />
            </div>
            <div style={{ position: 'relative', paddingLeft: '20px' }}>
              <div style={{ position: 'absolute', left: '4px', top: 0, bottom: 0, width: '0.5px', background: t.border2 }} />
              {data.experiences.filter(e => e.type === 'work').length === 0 ? (
                <p style={{ color: t.textFaint, fontSize: '13px' }}>Belum ada work experience.</p>
              ) : data.experiences.filter(e => e.type === 'work').map(exp => (
                <ExperienceCard key={exp.id} exp={exp} t={t} />
              ))}
            </div>
          </div>

          {/* Organization */}
          <div>
            <div style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: t.textFaint, marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              Organization
              <span style={{ flex: 1, height: '0.5px', background: t.border }} />
            </div>
            <div style={{ position: 'relative', paddingLeft: '20px' }}>
              <div style={{ position: 'absolute', left: '4px', top: 0, bottom: 0, width: '0.5px', background: t.border2 }} />
              {data.experiences.filter(e => e.type === 'organization').length === 0 ? (
                <p style={{ color: t.textFaint, fontSize: '13px' }}>Belum ada organisasi.</p>
              ) : data.experiences.filter(e => e.type === 'organization').map(exp => (
                <ExperienceCard key={exp.id} exp={exp} t={t} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
  @media (max-width: 768px) {
    .exp-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
  }
`}</style>
    </section>
  )
})

function ExperienceCard({ exp, t }) {
  const statusColor = {
    active: '#4ade80',
    upcoming: t.pink,
    done: t.textFaint,
  }

  return (
    <div style={{ position: 'relative', marginBottom: '24px' }}>
      <div style={{
        position: 'absolute', left: '-19px', top: '8px',
        width: '10px', height: '10px', borderRadius: '50%',
        border: `1.5px solid ${t.accent}`,
        background: exp.status === 'active' ? t.accent : t.bg,
        transition: 'background 0.4s',
      }} />
      <div style={{
        background: t.bg2, border: `0.5px solid ${t.border}`,
        borderRadius: '12px', padding: '18px 20px',
        transition: 'border-color 0.2s, background 0.4s',
      }}
        onMouseEnter={e => e.currentTarget.style.borderColor = t.accent}
        onMouseLeave={e => e.currentTarget.style.borderColor = t.border}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
          <div style={{ fontSize: '14px', fontWeight: '600', color: t.text }}>{exp.company}</div>
          <span style={{
            fontSize: '8px', padding: '3px 10px', borderRadius: '20px',
            color: statusColor[exp.status],
            border: `0.5px solid ${statusColor[exp.status]}`,
            background: `${statusColor[exp.status]}15`,
            letterSpacing: '1px', textTransform: 'uppercase',
          }}>{exp.status}</span>
        </div>
        <div style={{ fontSize: '12px', color: t.accent, marginBottom: '6px', fontWeight: '500' }}>{exp.role}</div>
        <div style={{ fontSize: '10px', color: t.textFaint, marginBottom: exp.description ? '10px' : '0', letterSpacing: '0.5px' }}>
          {exp.start_date}{exp.end_date ? ` — ${exp.end_date}` : ' — Sekarang'}
        </div>
        {exp.description && (
          <p style={{ fontSize: '12px', color: t.textFaint, lineHeight: 1.8, marginBottom: exp.tags?.length ? '10px' : '0' }}>
            {exp.description}
          </p>
        )}
        {Array.isArray(exp.tags) && exp.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {exp.tags.map((tag, i) => (
              <span key={i} style={{ fontSize: '9px', padding: '2px 8px', borderRadius: '20px', border: `0.5px solid ${t.border2}`, color: t.textFaint }}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

Experience.displayName = 'Experience'
export default Experience