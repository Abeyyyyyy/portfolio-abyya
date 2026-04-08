import { forwardRef } from 'react'

const Projects = forwardRef(({ t = {}, tr = {}, data = {} }, ref) => {
  const projects = data?.projects || []

  if (!t || !tr) return null

  return (
    <section
      id="projects"
      ref={ref}
      style={{
        minHeight: '100vh',
        padding: '100px 64px',
        display: 'flex',
        alignItems: 'center',
        background: t?.bg2,
        transition: 'background 0.4s',
        position: 'relative'
      }}
    >
      <div style={{ width: '100%', maxWidth: '1000px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ width: '32px', height: '1px', background: t?.accent }} />
          <span style={{ fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: t?.accent }}>
            {tr?.projects_subtitle || 'Projects'}
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '56px' }}>
          <h2 style={{ fontSize: '48px', fontWeight: '700', letterSpacing: '-2px' }}>
            {tr?.projects_title_1 || 'My'}{' '}
            <span style={{ color: t?.accent }}>
              {tr?.projects_title_2 || 'Projects'}
            </span>
          </h2>
          <span style={{ fontSize: '11px', color: t?.textFaint, letterSpacing: '1px' }}>
            {projects.length} {tr?.projects_count_label || 'Projects'}
          </span>
        </div>

        {projects.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: t?.textFaint, fontSize: '14px' }}>
            {tr?.projects_empty || 'No projects yet'}
          </div>
        ) : (
          <div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}
            className="projects-grid"
          >
            {projects.map((project, idx) => (
              <div
                key={project?.id || idx}
                style={{
                  background: t?.bg,
                  border: `0.5px solid ${t?.border}`,
                  borderRadius: '14px',
                  padding: '28px',
                  transition: 'border-color 0.3s, transform 0.3s, background 0.4s',
                  position: 'relative',
                  overflow: 'hidden',
                  gridColumn: project?.is_featured && idx === 0 ? 'span 2' : 'span 1'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = t?.accent
                  e.currentTarget.style.transform = 'translateY(-6px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = t?.border
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                {project?.is_featured && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: `linear-gradient(90deg, ${t?.accent}, ${t?.pink})`
                    }}
                  />
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                  <div>
                    <div style={{ fontSize: '17px', fontWeight: '600', color: t?.text, marginBottom: '4px' }}>
                      {project?.name}
                    </div>
                    {project?.is_featured && (
                      <span style={{ fontSize: '8px', letterSpacing: '1.5px', textTransform: 'uppercase', color: t?.accent }}>
                        {tr?.project_featured || 'Featured'}
                      </span>
                    )}
                  </div>

                  <span
                    style={{
                      fontSize: '8px',
                      letterSpacing: '1px',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      textTransform: 'uppercase',
                      color:
                        project?.status === 'done'
                          ? '#4ade80'
                          : project?.status === 'on_progress'
                          ? t?.pink
                          : t?.textFaint,
                      border: `0.5px solid ${
                        project?.status === 'done'
                          ? '#4ade80'
                          : project?.status === 'on_progress'
                          ? t?.pink
                          : t?.textFaint
                      }`,
                      background:
                        project?.status === 'done'
                          ? 'rgba(74,222,128,0.08)'
                          : project?.status === 'on_progress'
                          ? t?.pinkSoft
                          : 'transparent'
                    }}
                  >
                    {project?.status === 'on_progress'
                      ? tr?.project_status_progress || 'On Progress'
                      : project?.status}
                  </span>
                </div>

                <p style={{ fontSize: '13px', color: t?.textFaint, lineHeight: 1.85, marginBottom: '18px' }}>
                  {project?.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                  {Array.isArray(project?.tech_stack) &&
                    project.tech_stack.map((tech, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: '10px',
                          padding: '4px 12px',
                          borderRadius: '20px',
                          border: `0.5px solid ${t?.border2}`,
                          color: t?.textFaint
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                </div>

                <div style={{ display: 'flex', gap: '16px', paddingTop: '16px', borderTop: `0.5px solid ${t?.border}` }}>
                  {project?.github_url && (
                    <a href={project.github_url} target="_blank" rel="noreferrer" style={{ fontSize: '10px', letterSpacing: '1.5px', color: t?.textFaint, textDecoration: 'none', textTransform: 'uppercase' }}>
                      GitHub
                    </a>
                  )}
                  {project?.demo_url && (
                    <a href={project.demo_url} target="_blank" rel="noreferrer" style={{ fontSize: '10px', letterSpacing: '1.5px', color: t?.accent, textDecoration: 'none', textTransform: 'uppercase' }}>
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .projects-grid { grid-template-columns: 1fr !important; }
          .projects-grid > div { grid-column: span 1 !important; }
        }
      `}</style>
    </section>
  )
})

Projects.displayName = 'Projects'
export default Projects