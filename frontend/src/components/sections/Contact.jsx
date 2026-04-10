import { forwardRef, useState } from 'react'
import { useLang } from '../../context/LanguageContext'
import api from '../../services/api'

const Contact = forwardRef(({ t }, ref) => {
  const { tr } = useLang()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post('/contacts', form)
      setSent(true)
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      alert('Failed to send message. Please try again!')
    } finally {
      setLoading(false)
    }
  }

  const inp = {
    width: '100%', background: t.bg, border: `0.5px solid ${t.border2}`,
    borderRadius: '10px', padding: '14px 18px', fontSize: '14px',
    color: t.text, outline: 'none', fontFamily: 'inherit',
    transition: 'border-color 0.2s, background 0.4s', boxSizing: 'border-box',
  }

  const lbl = {
    fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase',
    color: t.textFaint, marginBottom: '8px', display: 'block',
  }

  return (
    <section id="contact" ref={ref} style={{
      minHeight: '100vh', padding: '100px 64px',
      display: 'flex', alignItems: 'center',
      background: t.bg2, transition: 'background 0.4s',
    }} className="contact-section">
      <div style={{ width: '100%', maxWidth: '1100px' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ width: '32px', height: '1px', background: t.accent }} />
          <span style={{ fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: t.accent }}>{tr.contactLabel}</span>
        </div>

        <h2 style={{ fontSize: '48px', fontWeight: '700', letterSpacing: '-2px', marginBottom: '16px' }}>
          {tr.contactTitle} <span style={{ color: t.accent }}>{tr.contactTitleAccent}</span>
        </h2>
        <p style={{ fontSize: '15px', color: t.textMuted, lineHeight: 1.8, marginBottom: '56px', maxWidth: '500px' }}>
          {tr.contactDesc}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px' }} className="contact-grid">

          {/* Form */}
          <div>
            {sent ? (
              <div style={{ background: t.accentSoft, border: `1px solid ${t.accent}`, borderRadius: '14px', padding: '40px', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>✓</div>
                <div style={{ fontSize: '16px', color: t.accent, fontWeight: '600', marginBottom: '8px' }}>{tr.sent}</div>
                <div style={{ fontSize: '13px', color: t.textMuted }}>{tr.sentDesc}</div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                  <div>
                    <label style={lbl}>{tr.nama || 'Name'}</label>
                    <input style={inp} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder={tr.yourName} required
                      onFocus={e => e.target.style.borderColor = t.accent} onBlur={e => e.target.style.borderColor = t.border2} />
                  </div>
                  <div>
                    <label style={lbl}>{tr.email || 'Email'}</label>
                    <input style={inp} type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder={tr.yourEmail} required
                      onFocus={e => e.target.style.borderColor = t.accent} onBlur={e => e.target.style.borderColor = t.border2} />
                  </div>
                </div>
                <div style={{ marginBottom: '14px' }}>
                  <label style={lbl}>{tr.subject || 'Subject'}</label>
                  <input style={inp} value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} placeholder={tr.subject} required
                    onFocus={e => e.target.style.borderColor = t.accent} onBlur={e => e.target.style.borderColor = t.border2} />
                </div>
                <div style={{ marginBottom: '24px' }}>
                  <label style={lbl}>{tr.message || 'Message'}</label>
                  <textarea style={{ ...inp, height: '120px', resize: 'none' }} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder={tr.message} required
                    onFocus={e => e.target.style.borderColor = t.accent} onBlur={e => e.target.style.borderColor = t.border2} />
                </div>
                <button type="submit" disabled={loading}
                  style={{ width: '100%', background: t.accent, color: '#F2E8DF', border: 'none', borderRadius: '10px', padding: '16px', fontSize: '11px', fontWeight: '600', letterSpacing: '2.5px', textTransform: 'uppercase', cursor: 'none', opacity: loading ? 0.7 : 1, transition: 'opacity 0.2s, transform 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                  {loading ? tr.sending : tr.sendMsg}
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: t.textFaint, marginBottom: '24px' }}>
                Direct Contact
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
                {[
                  { label: 'Email', value: 'hamdanabiyya@gmail.com', href: 'mailto:hamdanabiyya@gmail.com' },
                  { label: 'WhatsApp', value: '0882-0025-42889', href: 'https://wa.me/6288200254289' },
                  { label: tr.lokasi || 'Location', value: 'Bandung, Jawa Barat', href: null },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontSize: '9px', letterSpacing: '1.5px', textTransform: 'uppercase', color: t.textFaint }}>{item.label}</span>
                    {item.href ? (
                      <a href={item.href} style={{ fontSize: '14px', color: t.textMuted, textDecoration: 'none', transition: 'color 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.color = t.accent}
                        onMouseLeave={e => e.currentTarget.style.color = t.textMuted}>
                        {item.value}
                      </a>
                    ) : (
                      <span style={{ fontSize: '14px', color: t.textMuted }}>{item.value}</span>
                    )}
                  </div>
                ))}
              </div>

              <div style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: t.textFaint, marginBottom: '16px' }}>Social</div>
              <div style={{ display: 'flex', gap: '10px' }}>
                {[
                  { label: 'GitHub', href: 'https://github.com/Abeyyyyyy' },
                  { label: 'LinkedIn', href: 'https://linkedin.com/in/abiyya-hamdan-nurwandha-789760330' },
                ].map((link, i) => (
                  <a key={i} href={link.href} target="_blank" rel="noreferrer"
                    style={{ fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', color: t.textMuted, textDecoration: 'none', padding: '10px 20px', border: `0.5px solid ${t.border2}`, borderRadius: '8px', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = t.accent; e.currentTarget.style.color = t.accent }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = t.border2; e.currentTarget.style.color = t.textMuted }}>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div style={{ background: t.accentSoft, border: `0.5px solid ${t.accent}`, borderRadius: '12px', padding: '20px 22px', display: 'flex', alignItems: 'center', gap: '12px', marginTop: '32px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80', animation: 'pulse 2s ease-in-out infinite', flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '12px', color: t.accent, fontWeight: '600', marginBottom: '2px' }}>{tr.available}</div>
                <div style={{ fontSize: '11px', color: t.textFaint }}>Juni — September/Oktober 2025</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: '48px', paddingTop: '20px', borderTop: `0.5px solid ${t.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <span style={{ fontSize: '11px', color: t.textFaint, letterSpacing: '1px' }}>2025 Abiyya Hamdan Nurwandha</span>
          <span style={{ fontSize: '11px', color: t.textFaint, letterSpacing: '1px' }}>Built with React.js + Laravel</span>
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @media (max-width: 768px) {
          .contact-section { padding: 60px 24px !important; }
          .contact-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  )
})

Contact.displayName = 'Contact'
export default Contact