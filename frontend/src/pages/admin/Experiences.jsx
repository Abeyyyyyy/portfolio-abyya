import { useEffect, useState } from 'react'
import api from '../../services/api'

function AdminExperiences({ t }) {
  const [experiences, setExperiences] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editData, setEditData] = useState(null)
  const [form, setForm] = useState({
    company: '', role: '', description: '',
    tags: '', start_date: '', end_date: '',
    status: 'active', type: 'work',
  })

  useEffect(() => { fetchExperiences() }, [])

  const fetchExperiences = async () => {
    setLoading(true)
    const res = await api.get('/experiences')
    setExperiences(res.data)
    setLoading(false)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = {
      ...form,
      tags: form.tags.split(',').map(s => s.trim()).filter(Boolean),
    }
    if (editData) {
      await api.put(`/experiences/${editData.id}`, payload)
    } else {
      await api.post('/experiences', payload)
    }
    resetForm()
    fetchExperiences()
  }

  const handleEdit = (exp) => {
    setEditData(exp)
    setForm({
      company: exp.company, role: exp.role,
      description: exp.description || '',
      tags: Array.isArray(exp.tags) ? exp.tags.join(', ') : '',
      start_date: exp.start_date, end_date: exp.end_date || '',
      status: exp.status, type: exp.type,
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Hapus experience ini?')) return
    await api.delete(`/experiences/${id}`)
    fetchExperiences()
  }

  const resetForm = () => {
    setForm({ company: '', role: '', description: '', tags: '', start_date: '', end_date: '', status: 'active', type: 'work' })
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

  const statusColor = { active: '#4ade80', done: t.gray, upcoming: t.pink }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: t.textFaint }}>{experiences.length} Experiences</div>
        <button onClick={() => { resetForm(); setShowForm(true) }} style={{ background: t.accent, color: '#F5E9E2', border: 'none', borderRadius: '8px', padding: '8px 18px', fontSize: '10px', letterSpacing: '1.2px', textTransform: 'uppercase', cursor: 'pointer' }}>
          + Add Experience
        </button>
      </div>

      {showForm && (
        <div style={{ background: t.bg2, border: `0.5px solid ${t.border}`, borderRadius: '12px', padding: '24px', marginBottom: '20px', borderLeft: `2px solid ${t.accent}` }}>
          <div style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: t.accent, marginBottom: '18px' }}>
            {editData ? 'Edit Experience' : 'Add Experience'}
          </div>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <div>
                <label style={labelStyle}>Perusahaan / Organisasi</label>
                <input style={inputStyle} name="company" value={form.company} onChange={handleChange} placeholder="PT. Neuronworks" required />
              </div>
              <div>
                <label style={labelStyle}>Role</label>
                <input style={inputStyle} name="role" value={form.role} onChange={handleChange} placeholder="Web Developer Intern" required />
              </div>
              <div>
                <label style={labelStyle}>Tipe</label>
                <select style={inputStyle} name="type" value={form.type} onChange={handleChange}>
                  <option value="work">Work</option>
                  <option value="organization">Organization</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Status</label>
                <select style={inputStyle} name="status" value={form.status} onChange={handleChange}>
                  <option value="active">Active</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="done">Done</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Start Date</label>
                <input style={inputStyle} name="start_date" value={form.start_date} onChange={handleChange} placeholder="Juni 2025" required />
              </div>
              <div>
                <label style={labelStyle}>End Date</label>
                <input style={inputStyle} name="end_date" value={form.end_date} onChange={handleChange} placeholder="Sept 2025 (kosongkan jika masih aktif)" />
              </div>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={labelStyle}>Deskripsi</label>
              <textarea style={{ ...inputStyle, height: '70px', resize: 'none' }} name="description" value={form.description} onChange={handleChange} placeholder="Deskripsi singkat..." />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Tags (pisah koma)</label>
              <input style={inputStyle} name="tags" value={form.tags} onChange={handleChange} placeholder="Laravel, React.js, MySQL" />
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
      ) : experiences.length === 0 ? (
        <div style={{ color: t.textFaint, fontSize: '12px', textAlign: 'center', padding: '40px 0' }}>Belum ada experience. 🚀</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {experiences.map(exp => (
            <div key={exp.id} style={{ background: t.bg2, border: `0.5px solid ${t.border}`, borderRadius: '10px', padding: '16px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                  <div style={{ fontSize: '13px', fontWeight: '500', color: t.text }}>{exp.company}</div>
                  <span style={{ fontSize: '8px', padding: '2px 8px', borderRadius: '20px', color: statusColor[exp.status], border: `0.5px solid ${statusColor[exp.status]}`, background: `${statusColor[exp.status]}15` }}>{exp.status}</span>
                  <span style={{ fontSize: '8px', padding: '2px 8px', borderRadius: '20px', color: t.textFaint, border: `0.5px solid ${t.border2}` }}>{exp.type}</span>
                </div>
                <div style={{ fontSize: '11px', color: t.accent, marginBottom: '3px' }}>{exp.role}</div>
                <div style={{ fontSize: '10px', color: t.textFaint }}>{exp.start_date}{exp.end_date ? ` — ${exp.end_date}` : ' — Sekarang'}</div>
              </div>
              <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                <button onClick={() => handleEdit(exp)} style={{ background: t.accentSoft, border: `0.5px solid ${t.accent}`, color: t.accent, borderRadius: '6px', padding: '6px 14px', fontSize: '9px', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer' }}>Edit</button>
                <button onClick={() => handleDelete(exp.id)} style={{ background: 'rgba(123,30,43,0.1)', border: '0.5px solid #7B1E2B', color: '#7B1E2B', borderRadius: '6px', padding: '6px 14px', fontSize: '9px', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer' }}>Hapus</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminExperiences