import { forwardRef } from 'react'

const About = forwardRef(({ t }, ref) => {
  return (
    <section
      id="about"
      ref={ref}
      style={{
        minHeight: '100vh',
        padding: '100px 64px',
        display: 'flex',
        alignItems: 'center',
        background: t.bg2,
        transition: 'background 0.4s',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '900px', width: '100%' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ width: '32px', height: '1px', background: t.accent }} />
          <span style={{ fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: t.accent }}>About Me</span>
        </div>

        <h2 style={{ fontSize: '48px', fontWeight: '700', letterSpacing: '-2px', lineHeight: 1.1, marginBottom: '48px' }}>
          Passion di bidang<br />
          <span style={{ color: t.accent }}>Web Development</span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px' }}>

          {/* Left */}
          <div>
            <p style={{ fontSize: '15px', color: t.textMuted, lineHeight: 2.0, marginBottom: '32px' }}>
              Siswa kelas XI RPL di SMKN 4 Bandung dengan minat kuat di bidang
              Fullstack Web Development. Berpengalaman membangun sistem berbasis
              CRUD, mengelola database MySQL, dan berkolaborasi dalam tim maupun mandiri.
            </p>
            <p style={{ fontSize: '15px', color: t.textFaint, lineHeight: 2.0, marginBottom: '40px' }}>
              Aktif di komunitas teknologi ORBIT dan terus berkembang lewat
              proyek nyata. Memiliki latar belakang pendidikan keagamaan dari
              Pondok Pesantren Al-Ihsan yang membentuk karakter disiplin dan integritas.
            </p>

            {/* Languages */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {[
                { lang: 'Indonesia', c: t.accent, bg: t.accentSoft },
                { lang: 'English', c: t.textMuted, bg: 'transparent' },
                { lang: '中文', c: t.pink, bg: t.pinkSoft },
              ].map((l, i) => (
                <span key={i} style={{
                  fontSize: '11px', padding: '7px 18px',
                  borderRadius: '20px', border: `1px solid ${l.c}`,
                  color: l.c, background: l.bg,
                  letterSpacing: '0.5px',
                }}>{l.lang}</span>
              ))}
            </div>
          </div>

          {/* Right */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { k: 'Nama', v: 'Abiyya Hamdan Nurwandha' },
              { k: 'Lokasi', v: 'Bandung, Indonesia' },
              { k: 'Email', v: 'hamdanabiyya@gmail.com' },
              { k: 'Sekolah', v: 'SMKN 4 Bandung' },
              { k: 'Jurusan', v: 'Rekayasa Perangkat Lunak' },
              { k: 'Status', v: 'Fresh Graduate · Tersedia PKL' },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center',
                padding: '14px 18px',
                background: t.bg,
                border: `0.5px solid ${t.border}`,
                borderRadius: '10px',
                transition: 'border-color 0.2s, background 0.4s',
                gap: '16px',
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = t.accent}
                onMouseLeave={e => e.currentTarget.style.borderColor = t.border}
              >
                <span style={{ fontSize: '9px', letterSpacing: '1.5px', textTransform: 'uppercase', color: t.textFaint, width: '72px', flexShrink: 0 }}>{item.k}</span>
                <span style={{ fontSize: '13px', color: t.textMuted }}>{item.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
})

About.displayName = 'About'
export default About