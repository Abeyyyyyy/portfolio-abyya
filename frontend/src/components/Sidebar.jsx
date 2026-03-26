import { useState } from 'react'

function Sidebar({ activeSection, onNavigate, isDark, onToggleMode }) {
  const [open, setOpen] = useState(false)

  const t = {
    bg: isDark ? '#1F2A44' : '#F5E9E2',
    border: isDark ? 'rgba(245,233,226,0.07)' : 'rgba(13,13,13,0.07)',
    text: isDark ? '#F5E9E2' : '#0D0D0D',
    muted: isDark ? 'rgba(245,233,226,0.3)' : 'rgba(13,13,13,0.3)',
    accent: '#7B1E2B',
    accentSoft: 'rgba(123,30,43,0.12)',
  }

  const menus = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'funfacts', label: 'Fun Facts' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
    { id: 'education', label: 'Education' },
  ]

  return (
    <aside style={{
      position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 100,
      width: open ? '180px' : '52px',
      background: t.bg,
      borderRight: `0.5px solid ${t.border}`,
      display: 'flex', flexDirection: 'column',
      transition: 'width 0.35s cubic-bezier(0.4,0,0.2,1)',
      overflow: 'hidden',
    }}>

      {/* Toggle */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '32px', height: '32px',
          margin: '18px auto 0',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: '4px', border: `0.5px solid ${t.border}`,
          borderRadius: '8px', background: 'transparent',
          cursor: 'pointer', flexShrink: 0,
        }}
      >
        {open ? (
          <>
            <span style={{ width: '13px', height: '1px', background: t.muted, transform: 'rotate(45deg) translate(3px, 3px)', transition: 'all 0.3s' }}></span>
            <span style={{ width: '13px', height: '1px', background: t.muted, opacity: 0, transition: 'all 0.3s' }}></span>
            <span style={{ width: '13px', height: '1px', background: t.muted, transform: 'rotate(-45deg) translate(3px, -3px)', transition: 'all 0.3s' }}></span>
          </>
        ) : (
          <>
            <span style={{ width: '13px', height: '1px', background: t.muted }}></span>
            <span style={{ width: '13px', height: '1px', background: t.muted }}></span>
            <span style={{ width: '13px', height: '1px', background: t.muted }}></span>
          </>
        )}
      </button>

      {/* Logo */}
      <div style={{
        textAlign: 'center', margin: '16px 12px 20px',
        fontSize: '11px', letterSpacing: '2.5px',
        color: t.muted, whiteSpace: 'nowrap', overflow: 'hidden',
      }}>
        {open ? 'ABIYYA · HN' : 'AHN'}
      </div>

      <div style={{ height: '0.5px', background: t.border, margin: '0 12px 16px' }}></div>

      {/* Nav */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px', padding: '0 8px', flex: 1 }}>
        {menus.map(menu => (
          <button
            key={menu.id}
            onClick={() => { onNavigate(menu.id); setOpen(false) }}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '9px 10px', borderRadius: '8px',
              cursor: 'pointer', border: 'none', textAlign: 'left',
              background: activeSection === menu.id ? t.accentSoft : 'transparent',
              color: activeSection === menu.id ? t.accent : t.muted,
              transition: 'all 0.2s', whiteSpace: 'nowrap', overflow: 'hidden',
              width: '100%',
            }}
          >
            <span style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: activeSection === menu.id ? t.accent : t.border,
              flexShrink: 0, transition: 'background 0.2s',
            }}></span>
            {open && (
              <span style={{ fontSize: '10px', letterSpacing: '1.2px', textTransform: 'uppercase' }}>
                {menu.label}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Mode toggle */}
      <div style={{ padding: '8px', borderTop: `0.5px solid ${t.border}` }}>
        <button
          onClick={onToggleMode}
          style={{
            width: '100%', padding: '8px 10px',
            background: 'transparent', border: `0.5px solid ${t.border}`,
            borderRadius: '8px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '10px',
            color: t.muted, fontSize: '10px',
            letterSpacing: '1px', textTransform: 'uppercase',
            whiteSpace: 'nowrap', overflow: 'hidden',
          }}
        >
          <span style={{ flexShrink: 0 }}>{isDark ? '☀' : '☾'}</span>
          {open && <span>{isDark ? 'Light' : 'Dark'}</span>}
        </button>
      </div>
    </aside>
  )
}

export default Sidebar