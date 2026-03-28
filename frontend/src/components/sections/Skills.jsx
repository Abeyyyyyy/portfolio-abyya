import { forwardRef } from 'react'

const Skills = forwardRef(({ t, data, activeSection }, ref) => {
  const categories = [
    { key: 'frontend', label: 'Frontend' },
    { key: 'backend', label: 'Backend' },
    { key: 'tools', label: 'Tools & Design' },
  ]

  const softSkills = data.skills.filter(s => s.category === 'soft_skill')

  return (
    <section
      id="skills"
      ref={ref}
      style={{
        minHeight: '100vh',
        padding: '100px 64px',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <div style={{ width: '100%', maxWidth: '1000px' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ width: '32px', height: '1px', background: t.accent }} />
          <span style={{ fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: t.accent }}>Skills</span>
        </div>

        <h2 style={{ fontSize: '48px', fontWeight: '700', letterSpacing: '-2px', marginBottom: '64px' }}>
          Tech <span style={{ color: t.accent }}>Stack</span>
        </h2>

        {/* Tech skills */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '48px', marginBottom: '64px' }} className="skills-grid">
          {categories.map(cat => {
            const catSkills = data.skills.filter(s => s.category === cat.key)
            if (catSkills.length === 0) return null
            return (
              <div key={cat.key}>
                <div style={{
                  fontSize: '9px', letterSpacing: '3px',
                  textTransform: 'uppercase', color: t.textFaint,
                  marginBottom: '24px', display: 'flex',
                  alignItems: 'center', gap: '10px',
                }}>
                  {cat.label}
                  <span style={{ flex: 1, height: '0.5px', background: t.border }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {catSkills.map(skill => (
                    <div key={skill.id}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ fontSize: '13px', color: t.textMuted, fontWeight: '500' }}>{skill.name}</span>
                        <span style={{ fontSize: '11px', color: t.accent, fontWeight: '600' }}>{skill.percentage}%</span>
                      </div>
                      <div style={{ height: '3px', background: t.border2, borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{
                          height: '100%', borderRadius: '2px',
                          width: activeSection === 'skills' ? `${skill.percentage}%` : '0%',
                          background: `linear-gradient(90deg, ${t.accent}, ${t.pink})`,
                          transition: 'width 1.4s cubic-bezier(0.4,0,0.2,1)',
                        }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Soft skills */}
        {softSkills.length > 0 && (
          <div>
            <div style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: t.textFaint, marginBottom: '16px' }}>
              Soft Skills
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {softSkills.map(skill => (
                <span key={skill.id} style={{
                  fontSize: '12px', padding: '8px 20px',
                  borderRadius: '20px', border: `0.5px solid ${t.border2}`,
                  color: t.textMuted, transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = t.pink; e.currentTarget.style.color = t.pink }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = t.border2; e.currentTarget.style.color = t.textMuted }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
})

Skills.displayName = 'Skills'
export default Skills