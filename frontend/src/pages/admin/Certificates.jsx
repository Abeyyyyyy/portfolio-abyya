import { useEffect, useState } from 'react'
import api from '../../services/api'

function AdminCertificates({ t }) {
  const [certificates, setCertificates] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editData, setEditData] = useState(null)
  const [form, setForm] = useState({
    name: '', issuer: '', date: '', credential_url: '',
  })

  useEffect(() => { fetchCertificates() }, [])

  const fetchCertificates = async () => {
    setLoading(true)
    const res = await api.get('/certificates')
    setCertificates(res.data)
    setLoading(false)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editData) {
      await api.put(`/certificates/${editData.id}`, form)
    } else {
      await api.post('/certificates', form)
    }
    resetForm()
    fetchCertificates()
  }

  const handleEdit = (cert) => {
    setEditData(cert)
    setForm({
      name: cert.name, issuer: cert.issuer,
      date: cert.date, credential_url: cert.credential_url || '',
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Hapus certificate ini?')) return
    await api.delete(`/certificates/${id}`)
    fetchCertificates()
  }

  const resetForm = () => {
    setForm({ name: '', issuer: '', date: '', credential_url: '' })
    setEditData(null)
    setShowForm(false)
  }

  const inputStyle = {
    width: '100%', background: t.bg,
    border: `0.5px solid ${t.border2}`,
    borderRadius: '8px', padding: '10px 14px',
    fontSize: '12px', color: t.text,
    outline: 'none', fontFamily: 'sans-serif',
  }

  const labelStyle = {
    fontSize: '9px', letterSpacing: '1.5px',
    textTransform: 'uppercase', color: t.textFaint,
    marginBottom: '6px', display: 'block',
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: t.textFaint }}>{certificates.length} Certificates</div>
        <button onClick={() => { resetForm(); setShowForm(true) }} style={{ background: t.accent, color: '#F5E9E2', border: 'none', borderRadius: '8px', padding: '8px 18px', fontSize: '10px', letterSpacing: '1.2px', textTransform: 'uppercase', cursor: 'pointer' }}>
          + Add Certificate
        </button>
      </div>

      {showForm && (
        <div style={{ background: t.bg2, border: `0.5px solid ${t.border}`, borderRadius: '12px', padding: '24px', marginBottom: '20px', borderLeft: `2px solid ${t.accent}` }}>
          <div style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: t.accent, marginBottom: '18px' }}>
            {editData ? 'Edit Certificate' : 'Add Certificate'}
          </div>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <div>
                <label style={labelStyle}>Nama Sertifikat</label>
                <input style={inputStyle} name="name" value={form.name} onChange={handleChange} placeholder="Web Development Bootcamp" required />
              </div>
              <div>
                <label style={labelStyle}>Penerbit</label>
                <input style={inputStyle} name="issuer" value={form.issuer} onChange={handleChange} placeholder="Dicoding / Udemy" required />
              </div>
              <div>
                <label style={labelStyle}>Tanggal</label>
                <input style={inputStyle} name="date" value={form.date} onChange={handleChange} placeholder="Maret 2025" required />
              </div>
              <div>
                <label style={labelStyle}>Credential URL</label>
                <input style={inputStyle} name="credential_url" value={form.credential_url} onChange={handleChange} placeholder="https://..." />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button type="submit" style={{ background: t.accent, color: '#F5E9E2', border: 'none', borderRadius: '8px', padding: '10px 22px', fontSize: '10px', letterSpacing: '1.2px', textTransform: 'uppercase', cursor: 'pointer' }}>
                {editData ? 'Update' : 'Simpan'}
              </button>
              <button type="button" onClick={resetForm} style={{ background: 'transparent', color: t.textMuted, border: `0.5px solid ${t.border2}`, borderRadius: '8px', padding: '10px 22px', fontSize: '10px', letterSpacing: '1.2px', textTransform: 'uppercase', cursor: 'pointer' }}>
                Batal
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div style={{ color: t.textFaint, fontSize: '12px' }}>Loading...</div>
      ) : certificates.length === 0 ? (
        <div style={{ color: t.textFaint, fontSize: '12px', textAlign: 'center', padding: '40px 0' }}>Belum ada certificate. 🚀</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {certificates.map(cert => (
            <div key={cert.id} style={{ background: t.bg2, border: `0.5px solid ${t.border}`, borderRadius: '10px', padding: '16px 18px' }}>
              <div style={{ fontSize: '13px', fontWeight: '500', color: t.text, marginBottom: '3px' }}>{cert.name}</div>
              <div style={{ fontSize: '11px', color: t.accent, marginBottom: '3px' }}>{cert.issuer}</div>
              <div style={{ fontSize: '10px', color: t.textFaint, marginBottom: '12px' }}>{cert.date}</div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button onClick={() => handleEdit(cert)} style={{ background: t.accentSoft, border: `0.5px solid ${t.accent}`, color: t.accent, borderRadius: '6px', padding: '5px 12px', fontSize: '9px', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer' }}>Edit</button>
                <button onClick={() => handleDelete(cert.id)} style={{ background: 'rgba(123,30,43,0.1)', border: '0.5px solid #7B1E2B', color: '#7B1E2B', borderRadius: '6px', padding: '5px 12px', fontSize: '9px', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer' }}>Hapus</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminCertificates