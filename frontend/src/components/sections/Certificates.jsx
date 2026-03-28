import { forwardRef } from 'react'

const Certificates = forwardRef(({ t, data }, ref) => {
  return (
    <section id="certificates" ref={ref} style={{
      minHeight: '100vh', padding: '100px 64px',
      display: 'flex', alignItems: 'center',
      background: t.bg2, transition: 'background 0.4s',
    }}>
      <div style={{ width: '100%', maxWidth: '1000px' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ width: '32px', height: '1px', background: t.accent }} />
          <span style={{ fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: t.accent }}>Certificates</span>
        </div>

        <h2 style={{ fontSize: '48px', fontWeight: '700', letterSpacing: '-2px', marginBottom: '56px' }}>
          My <span style={{ color: t.accent }}>Credentials</span>
        </h2>

        {data.certificates.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: t.textFaint, fontSize: '14px' }}>
            Belum ada sertifikat. Tambahkan di admin panel!
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px' }} className="cert-grid">
            {data.certificates.map(cert => (
              <div key={cert.id}
                style={{ background: t.bg, border: `0.5px solid ${t.border}`, borderRadius: '14px', padding: '24px', transition: 'all 0.3s', cursor: cert.credential_url ? 'none' : 'default', position: 'relative', overflow: 'hidden' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = t.accent; e.currentTarget.style.transform = 'translateY(-4px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${t.accent}, ${t.navy})` }} />

                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: t.accentSoft, border: `0.5px solid ${t.accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', fontSize: '20px' }}>
                  🏆
                </div>

                <div style={{ fontSize: '14px', fontWeight: '600', color: t.text, marginBottom: '6px', lineHeight: 1.4 }}>{cert.name}</div>
                <div style={{ fontSize: '12px', color: t.accent, marginBottom: '4px', fontWeight: '500' }}>{cert.issuer}</div>
                <div style={{ fontSize: '11px', color: t.textFaint, marginBottom: '16px' }}>{cert.date}</div>

                {cert.credential_url && (
                  <a href={cert.credential_url} target="_blank" rel="noreferrer"
                    style={{ fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', color: t.navy, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500' }}>
                    View Credential
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
})

Certificates.displayName = 'Certificates'
export default Certificates