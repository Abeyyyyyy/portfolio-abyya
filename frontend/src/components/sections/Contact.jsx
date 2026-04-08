import { forwardRef, useState } from 'react'
import api from '../../services/api'

const Contact = forwardRef(({ t, tr }, ref) => {
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
      alert(tr.form_error)
    } finally {
      setLoading(false)
    }
  }

  const inp = { width: '100%', background: t.bg, border: `0.5px solid ${t.border2}`, borderRadius: '10px', padding: '14px 18px', fontSize: '14px', color: t.text, outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }
  const lbl = { fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: t.textFaint, marginBottom: '8px', display: 'block' }

  return (
    <section id="contact" ref={ref} className="contact-section" style={{ minHeight: '100vh', padding: '100px 64px', display: 'flex', alignItems: 'center', background: t.bg2, transition: 'background 0.4s' }}>
      <div style={{ width: '100%', maxWidth: '900px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ width: '32px', height: '1px', background: t.accent }} />
          <span style={{ fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: t.accent }}>{tr.contact_subtitle}</span>
        </div>

        <h2 style={{ fontSize: '48px', fontWeight: '700', letterSpacing: '-2px', marginBottom: '16px' }}>
          {tr.contact_title_1} <span style={{ color: t.accent }}>{tr.contact_title_2}</span>
        </h2>
        <p style={{ fontSize: '15px', color: t.textMuted, lineHeight: 1.8, marginBottom: '56px', maxWidth: '500px' }}>{tr.contact_desc}</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px' }} className="contact-grid">
          <div>
            {sent ? (
              <div style={{ background: t.accentSoft, border: `1px solid ${t.accent}`, borderRadius: '14px', padding: '40px', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>✓</div>
                <div style={{ fontSize: '16px', color: t.accent, fontWeight: '600' }}>{tr.form_success_title}</div>
                <div style={{ fontSize: '13px', color: t.textMuted }}>{tr.form_success_desc}</div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                  <div>
                    <label style={lbl}>{tr.form_name}</label>
                    <input style={inp} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder={tr.form_name_placeholder} required />
                  </div>
                  <div>
                    <label style={lbl}>{tr.form_email}</label>
                    <input style={inp} type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="email@kamu.com" required />
                  </div>
                </div>
                <div style={{ marginBottom: '14px' }}>
                  <label style={lbl}>{tr.form_subject}</label>
                  <input style={inp} value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} placeholder={tr.form_subject_placeholder} required />
                </div>
                <div style={{ marginBottom: '24px' }}>
                  <label style={lbl}>{tr.form_message}</label>
                  <textarea style={{ ...inp, height: '120px', resize: 'none' }} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder={tr.form_message_placeholder} required />
                </div>
                <button type="submit" disabled={loading} style={{ width: '100%', background: t.accent, color: '#F5E9E2', border: 'none', borderRadius: '10px', padding: '16px', fontSize: '11px', fontWeight: '600', letterSpacing: '2.5px', textTransform: 'uppercase', opacity: loading ? 0.7 : 1 }}>
                  {loading ? tr.form_sending : tr.form_btn}
                </button>
              </form>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: t.textFaint, marginBottom: '24px' }}>Direct Contact</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '48px' }}>
                {[{ label: 'Email', value: 'hamdanabiyya@gmail.com', href: 'mailto:hamdanabiyya@gmail.com' }, { label: 'WhatsApp', value: '0882-0025-42889', href: 'https://wa.me/6288200254289' }, { label: tr.contact_location_label, value: 'Bandung, Jawa Barat', href: null }].map((item, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '9px', letterSpacing: '1.5px', textTransform: 'uppercase', color: t.textFaint }}>{item.label}</span>
                    <span style={{ fontSize: '14px', color: t.textMuted }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: t.accentSoft, border: `0.5px solid ${t.accent}`, borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80' }} />
              <div>
                <div style={{ fontSize: '12px', color: t.accent, fontWeight: '600' }}>{tr.availability_status}</div>
                <div style={{ fontSize: '11px', color: t.textFaint }}>{tr.availability_time}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

Contact.displayName = 'Contact'
export default Contact