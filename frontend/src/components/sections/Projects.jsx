import { forwardRef, useState, useRef } from 'react'
import { useLang } from '../../context/LanguageContext'

const Projects = forwardRef(({ t, data }, ref) => {
  const { tr } = useLang()
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false, img: null })
  const containerRef = useRef(null)

  const handleMouseMove = (e, project) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    setCursor({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      visible: true,
      img: project.thumbnail || null,
      name: project.name,
    })
  }

  const handleMouseLeave = () => {
    setCursor(prev => ({ ...prev, visible: false }))
  }

  const statusColor = {
    done: '#4ade80',
    on_progress: t.pink,
    planned: t.textFaint,
  }

  return (
    <section id="projects" ref={ref} style={{
      minHeight: '100vh', padding: '100px 64px',
      display: 'flex', alignItems: 'center',
      background: t.bg2, transition: 'background 0.4s',
      position: 'relative',
    }}>
      <div style={{ width: '100%', maxWidth: '1100px' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ width: '32px', height: '1px', background: t.accent }} />
          <span style={{ fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: t.accent }}>
            {tr.projectsLabel || 'Projects'}
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '56px' }}>
          <h2 style={{ fontSize: '48px', fontWeight: '700', letterSpacing: '-2px' }}>
            {tr.projectsTitle || "What I've"} <span style={{ color: t.accent }}>{tr.projectsTitleAccent || 'Built'}</span>
          </h2>
          <span style={{ fontSize: '11px', color: t.textFaint, letterSpacing: '1px' }}>
            {data.projects.length} projects
          </span>
        </div>

        {/* Container dengan cursor tracking */}
        <div ref={containerRef} style={{ position: 'relative' }}>

          {/* Floating thumbnail */}
          {cursor.visible && (
            <div style={{
              position: 'absolute',
              left: cursor.x + 20,
              top: cursor.y - 80,
              width: '260px',
              height: '160px',
              borderRadius: '12px',
              overflow: 'hidden',
              border: `1px solid ${t.border2}`,
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              zIndex: 100,
              pointerEvents: 'none',
              transition: 'opacity 0.2s',
              background: t.bg,
            }}>
              {cursor.img ? (
                <img src={cursor.img} alt={cursor.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{
                  width: '100%', height: '100%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexDirection: 'column', gap: '8px',
                  background: `linear-gradient(135deg, ${t.bg2}, ${t.accentSoft})`,
                }}>
                  <div style={{ fontSize: '32px', opacity: 0.3 }}>◈</div>
                  <div style={{ fontSize: '11px', color: t.textFaint, letterSpacing: '1px', textTransform: 'uppercase' }}>
                    {cursor.name}
                  </div>
                </div>
              )}
              {/* Accent line */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                height: '2px',
                background: `linear-gradient(90deg, ${t.accent}, transparent)`,
              }} />
            </div>
          )}

          {/* Projects grid */}
          {data.projects.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: t.textFaint, fontSize: '14px' }}>
              Belum ada project. Tambahkan di admin panel!
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {data.projects.map((project, idx) => (
                <div
                  key={project.id}
                  onMouseMove={e => handleMouseMove(e, project)}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    padding: '28px 0',
                    borderBottom: `0.5px solid ${t.border}`,
                    borderTop: idx === 0 ? `0.5px solid ${t.border}` : 'none',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between', gap: '24px',
                    cursor: 'none', transition: 'padding 0.2s',
                    position: 'relative',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.paddingLeft = '16px'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.paddingLeft = '0'
                    handleMouseLeave()
                  }}
                >
                  {/* Left accent */}
                  <div style={{
                    position: 'absolute', left: 0, top: '50%',
                    transform: 'translateY(-50%)',
                    width: '3px', height: '0px',
                    background: t.accent, borderRadius: '2px',
                    transition: 'height 0.3s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.height = '40px'}
                  />

                  {/* Project info */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
                      <span style={{ fontSize: '20px', fontWeight: '600', color: t.text, letterSpacing: '-0.5px' }}>
                        {project.name}
                      </span>
                      {project.is_featured && (
                        <span style={{ fontSize: '8px', letterSpacing: '1.5px', textTransform: 'uppercase', color: t.accent, background: t.accentSoft, border: `0.5px solid ${t.accent}`, padding: '2px 10px', borderRadius: '20px' }}>
                          Featured
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: '13px', color: t.textFaint, lineHeight: 1.7, maxWidth: '600px', marginBottom: '10px' }}>
                      {project.description}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {Array.isArray(project.tech_stack) && project.tech_stack.map((tech, i) => (
                        <span key={i} style={{ fontSize: '9px', padding: '3px 10px', borderRadius: '20px', border: `0.5px solid ${t.border2}`, color: t.textFaint, letterSpacing: '0.5px' }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
                    <span style={{
                      fontSize: '9px', letterSpacing: '1px', padding: '4px 12px',
                      borderRadius: '20px', textTransform: 'uppercase',
                      color: statusColor[project.status],
                      border: `0.5px solid ${statusColor[project.status]}`,
                      background: `${statusColor[project.status]}15`,
                    }}>
                      {project.status === 'on_progress' ? 'In Progress' : project.status}
                    </span>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      {project.github_url && (
                        <a href={project.github_url} target="_blank" rel="noreferrer"
                          style={{ fontSize: '10px', letterSpacing: '1px', color: t.textFaint, textDecoration: 'none', textTransform: 'uppercase', transition: 'color 0.2s' }}
                          onMouseEnter={e => e.currentTarget.style.color = t.text}
                          onMouseLeave={e => e.currentTarget.style.color = t.textFaint}>
                          GitHub
                        </a>
                      )}
                      {project.demo_url && (
                        <a href={project.demo_url} target="_blank" rel="noreferrer"
                          style={{ fontSize: '10px', letterSpacing: '1px', color: t.accent, textDecoration: 'none', textTransform: 'uppercase' }}>
                          Live
                        </a>
                      )}
                    </div>
                    <div style={{ fontSize: '20px', color: t.textFaint }}>↗</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .projects-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
})

Projects.displayName = 'Projects'
export default Projects