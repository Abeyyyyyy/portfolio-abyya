import { useState } from 'react'

function Sidebar({ activeSection, onNavigate, isDark, onToggleMode }) {
  const [open, setOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const t = {
    bg: isDark ? '#111827' : '#EDE0D8',
    border: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(13,13,13,0.08)',
    text: isDark ? '#F0EDE8' : '#0D0D0D',
    muted: isDark ? 'rgba(240,237,232,0.4)' : 'rgba(13,13,13,0.4)',
    accent: '#7B1E2B',
    accentSoft: 'rgba(123,30,43,0.12)',
    navy: '#1F2A44',
  }

  const menus = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'funfacts', label: 'Fun Facts' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
  ]

  const handleNav = (id) => {
    onNavigate(id)
    setOpen(false)
    setMobileOpen(false)
  }

  return (
    <>
      {/* MOBILE TOPBAR */}
      <div style={{
        display: 'none',
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        background: t.bg, borderBottom: `0.5px solid ${t.border}`,
        padding: '14px 20px',
        alignItems: 'center', justifyContent: 'space-between',
      }} id="mobile-topbar">
        <span style={{ fontSize: '12px', letterSpacing: '3px', fontWeight: '600', color: t.text }}>AHN</span>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ background: 'transparent', border: `0.5px solid ${t.border}`, borderRadius: '8px', padding: '8px 10px', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}
        >
          {mobileOpen ? (
            <span style={{ fontSize: '14px', color: t.muted, lineHeight: 1 }}>✕</span>
          ) : (
            <>
              <span style={{ width: '16px', height: '1px', background: t.muted, display: 'block' }} />
              <span style={{ width: '16px', height: '1px', background: t.muted, display: 'block' }} />
              <span style={{ width: '16px', height: '1px', background: t.muted, display: 'block' }} />
            </>
          )}
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {mobileOpen && (
        <div style={{
          display: 'none',
          position: 'fixed', top: '53px', left: 0, right: 0, zIndex: 199,
          background: t.bg, borderBottom: `0.5px solid ${t.border}`,
          padding: '12px 0',
          flexDirection: 'column',
        }} id="mobile-menu">
          {menus.map(menu => (
            <button key={menu.id} onClick={() => handleNav(menu.id)}
              style={{
                padding: '12px 24px', background: activeSection === menu.id ? t.accentSoft : 'transparent',
                border: 'none', textAlign: 'left', cursor: 'pointer',
                fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase',
                color: activeSection === menu.id ? t.accent : t.muted,
                transition: 'all 0.2s',
              }}>
              {menu.label}
            </button>
          ))}
          <div style={{ padding: '12px 24px', borderTop: `0.5px solid ${t.border}`, marginTop: '8px' }}>
            <button onClick={onToggleMode}
              style={{ background: 'transparent', border: `0.5px solid ${t.border}`, borderRadius: '8px', padding: '8px 16px', cursor: 'pointer', fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase', color: t.muted }}>
              {isDark ? '☀ Light Mode' : '☾ Dark Mode'}
            </button>
          </div>
        </div>
      )}

      {/* DESKTOP SIDEBAR */}
      <aside style={{
        position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 100,
        width: open ? '180px' : '52px',
        background: t.bg,
        borderRight: `0.5px solid ${t.border}`,
        display: 'flex', flexDirection: 'column',
        transition: 'width 0.35s cubic-bezier(0.4,0,0.2,1)',
        overflow: 'hidden',
      }} id="desktop-sidebar">

        <button onClick={() => setOpen(!open)}
          style={{ width: '32px', height: '32px', margin: '18px auto 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px', border: `0.5px solid ${t.border}`, borderRadius: '8px', background: 'transparent', cursor: 'pointer', flexShrink: 0 }}>
          <span style={{ width: '13px', height: '1px', background: t.muted, transition: 'all 0.3s', transform: open ? 'rotate(45deg) translate(3px, 3px)' : 'none' }} />
          <span style={{ width: '13px', height: '1px', background: t.muted, transition: 'all 0.3s', opacity: open ? 0 : 1 }} />
          <span style={{ width: '13px', height: '1px', background: t.muted, transition: 'all 0.3s', transform: open ? 'rotate(-45deg) translate(3px, -3px)' : 'none' }} />
        </button>

        <div style={{ textAlign: 'center', margin: '16px 12px 16px', fontSize: '11px', letterSpacing: '2.5px', color: t.muted, whiteSpace: 'nowrap', overflow: 'hidden' }}>
          {open ? 'ABIYYA · HN' : 'AHN'}
        </div>

        <div style={{ height: '0.5px', background: t.border, margin: '0 12px 12px' }} />

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1px', padding: '0 8px', flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
          {menus.map(menu => (
            <button key={menu.id} onClick={() => handleNav(menu.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '8px 10px', borderRadius: '8px',
                cursor: 'pointer', border: 'none', textAlign: 'left',
                background: activeSection === menu.id ? t.accentSoft : 'transparent',
                color: activeSection === menu.id ? t.accent : t.muted,
                transition: 'all 0.2s', whiteSpace: 'nowrap', overflow: 'hidden', width: '100%',
              }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: activeSection === menu.id ? t.accent : t.border, flexShrink: 0, transition: 'background 0.2s' }} />
              {open && <span style={{ fontSize: '10px', letterSpacing: '1.2px', textTransform: 'uppercase' }}>{menu.label}</span>}
            </button>
          ))}
        </nav>

        <div style={{ padding: '8px', borderTop: `0.5px solid ${t.border}` }}>
          <button onClick={onToggleMode}
            style={{ width: '100%', padding: '8px 10px', background: 'transparent', border: `0.5px solid ${t.border}`, borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', color: t.muted, fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase', whiteSpace: 'nowrap', overflow: 'hidden' }}>
            <span style={{ flexShrink: 0 }}>{isDark ? '☀' : '☾'}</span>
            {open && <span>{isDark ? 'Light' : 'Dark'}</span>}
          </button>
        </div>
      </aside>

      <style>{`
        @media (max-width: 768px) {
          #desktop-sidebar { display: none !important; }
          #mobile-topbar { display: flex !important; }
          #mobile-menu { display: flex !important; }
        }
      `}</style>
    </>
  )
}

export default Sidebar