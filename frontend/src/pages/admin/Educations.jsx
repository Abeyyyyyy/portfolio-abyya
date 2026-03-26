import { useEffect, useState } from 'react'
import api from '../../services/api'

function AdminEducations({ t }) {
  const [educations, setEducations] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editData, setEditData] = useState(null)
  const [form, setForm] = useState({
    institution: '', major: '',
    start_year: '', end_year: '', accent: 'blue',
  })

  useEffect(() => { fetchEducations() }, [])

  const fetchEducations = async () => {
    setLoading(true)
    const res = await api.get('/educations')
    setEducations(res.data)
    setLoading(false)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editData) {
      await api.put(`/educations/${editData.id}`, form)
    } else {
      await api.post('/educations', form)
    }
    resetForm()
    fetchEducations()
  }

  const handleEdit = (edu) => {
    setEditData(edu)
    setForm({
      institution: edu.institution, major: edu.major,
      start_year: edu.start_year, end_year: edu.end_year || '',
      accent: edu.accent,
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Hapus education ini?')) return
    await api.delete(`/educations/${id}`)
    fetchEducations()
  }

  const resetForm = () => {
    setForm({ institution: '', major: '', start_year: '', end_year: '', accent: 'blue' })
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
        <div style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: t.textFaint }}>{educations.length} Educations</div>
        <button onClick={() => { resetForm(); setShowForm(true) }} style={{ background: t.accent, color: '#F5E9E2', border: 'none', borderRadius: '8px', padding: '8px 18px', fontSize: '10px', letterSpacing: '1.2px', textTransform: 'uppercase', cursor: 'pointer' }}>
          + Add Education
        </button>
      </div>

      {showForm && (
        <div style={{ background: t.bg2, border: `0.5px solid ${t.border}`, borderRadius: '12px', padding: '24px', marginBottom: '20px', borderLeft: `2px solid ${t.accent}` }}>
          <div style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: t.accent, marginBottom: '18px' }}>
            {editData ? 'Edit Education' : 'Add Education'}
          </div>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <div>
                <label style={labelStyle}>Institusi</label>
                <input style={inputStyle} name="institution" value={form.institution} onChange={handleChange} placeholder="SMKN 4 Bandung" required />
              </div>
              <div>
                <label style={labelStyle}>Jurusan</label>
                <input style={inputStyle} name="major" value={form.major} onChange={handleChange} placeholder="Rekayasa Perangkat Lunak" required />
              </div>
              <div>
                <label style={labelStyle}>Tahun Mulai</label>
                <input style={inputStyle} name="start_year" value={form.start_year} onChange={handleChange} placeholder="2024" required />
              </div>
              <div>
                <label style={labelStyle}>Tahun Selesai</label>
                <input style={inputStyle} name="end_year" value={form.end_year} onChange={handleChange} placeholder="2027 (kosongkan jika masih)" />
              </div>
              <div>
                <label style={labelStyle}>Warna Accent</label>
                <select style={inputStyle} name="accent" value={form.accent} onChange={handleChange}>
                  <option value="blue">Blue</option>
                  <option value="pink">Pink</option>
                </select>
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
      ) : educations.length === 0 ? (
        <div style={{ color: t.textFaint, fontSize: '12px', textAlign: 'center', padding: '40px 0' }}>Belum ada education. 🚀</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {educations.map(edu => (
            <div key={edu.id} style={{ background: t.bg2, border: `0.5px solid ${t.border}`, borderLeft: `2px solid ${edu.accent === 'blue' ? t.accent : t.pink}`, borderRadius: '10px', padding: '16px 18px' }}>
              <div style={{ fontSize: '13px', fontWeight: '500', color: t.text, marginBottom: '3px' }}>{edu.institution}</div>
              <div style={{ fontSize: '11px', color: t.textMuted, marginBottom: '4px' }}>{edu.major}</div>
              <div style={{ fontSize: '10px', color: t.textFaint, marginBottom: '12px' }}>{edu.start_year} — {edu.end_year || 'Sekarang'}</div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button onClick={() => handleEdit(edu)} style={{ background: t.accentSoft, border: `0.5px solid ${t.accent}`, color: t.accent, borderRadius: '6px', padding: '5px 12px', fontSize: '9px', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer' }}>Edit</button>
                <button onClick={() => handleDelete(edu.id)} style={{ background: 'rgba(123,30,43,0.1)', border: '0.5px solid #7B1E2B', color: '#7B1E2B', borderRadius: '6px', padding: '5px 12px', fontSize: '9px', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer' }}>Hapus</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminEducations