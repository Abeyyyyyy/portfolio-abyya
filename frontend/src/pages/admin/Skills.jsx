import { useEffect, useState } from 'react'
import api from '../../services/api'

function AdminSkills({ t }) {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editData, setEditData] = useState(null)
  const [form, setForm] = useState({
    name: '', category: 'frontend', percentage: 0,
  })

  useEffect(() => { fetchSkills() }, [])

  const fetchSkills = async () => {
    setLoading(true)
    const res = await api.get('/skills')
    setSkills(res.data)
    setLoading(false)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editData) {
      await api.put(`/skills/${editData.id}`, form)
    } else {
      await api.post('/skills', form)
    }
    resetForm()
    fetchSkills()
  }

  const handleEdit = (skill) => {
    setEditData(skill)
    setForm({ name: skill.name, category: skill.category, percentage: skill.percentage })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Hapus skill ini?')) return
    await api.delete(`/skills/${id}`)
    fetchSkills()
  }

  const resetForm = () => {
    setForm({ name: '', category: 'frontend', percentage: 0 })
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

  const categories = ['frontend', 'backend', 'tools', 'soft_skill']

  return (
    <div>
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: t.textFaint }}>
          {skills.length} Skills
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true) }}
          style={{ background: t.accent, color: '#F5E9E2', border: 'none', borderRadius: '8px', padding: '8px 18px', fontSize: '10px', letterSpacing: '1.2px', textTransform: 'uppercase', cursor: 'pointer' }}
        >
          + Add Skill
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <div style={{ background: t.bg2, border: `0.5px solid ${t.border}`, borderRadius: '12px', padding: '24px', marginBottom: '20px', borderLeft: `2px solid ${t.accent}` }}>
          <div style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: t.accent, marginBottom: '18px' }}>
            {editData ? 'Edit Skill' : 'Add Skill'}
          </div>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <div>
                <label style={labelStyle}>Nama Skill</label>
                <input style={inputStyle} name="name" value={form.name} onChange={handleChange} placeholder="React.js" required />
              </div>
              <div>
                <label style={labelStyle}>Kategori</label>
                <select style={inputStyle} name="category" value={form.category} onChange={handleChange}>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Persentase ({form.percentage}%)</label>
                <input style={inputStyle} type="range" name="percentage" min="0" max="100" value={form.percentage} onChange={handleChange} />
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

      {/* LIST */}
      {loading ? (
        <div style={{ color: t.textFaint, fontSize: '12px' }}>Loading...</div>
      ) : skills.length === 0 ? (
        <div style={{ color: t.textFaint, fontSize: '12px', textAlign: 'center', padding: '40px 0' }}>Belum ada skill. 🚀</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {skills.map(skill => (
            <div key={skill.id} style={{ background: t.bg2, border: `0.5px solid ${t.border}`, borderRadius: '10px', padding: '16px 18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '500', color: t.text }}>{skill.name}</div>
                  <div style={{ fontSize: '9px', letterSpacing: '1px', textTransform: 'uppercase', color: t.textFaint, marginTop: '2px' }}>{skill.category}</div>
                </div>
                <div style={{ fontSize: '16px', fontWeight: '500', color: t.accent }}>{skill.percentage}%</div>
              </div>
              {/* Progress bar */}
              <div style={{ height: '3px', background: t.border2, borderRadius: '2px', marginBottom: '12px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${skill.percentage}%`, background: t.accent, borderRadius: '2px', transition: 'width 0.6s' }}></div>
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button onClick={() => handleEdit(skill)} style={{ background: t.accentSoft, border: `0.5px solid ${t.accent}`, color: t.accent, borderRadius: '6px', padding: '5px 12px', fontSize: '9px', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer' }}>Edit</button>
                <button onClick={() => handleDelete(skill.id)} style={{ background: 'rgba(123,30,43,0.1)', border: '0.5px solid #7B1E2B', color: '#7B1E2B', borderRadius: '6px', padding: '5px 12px', fontSize: '9px', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer' }}>Hapus</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminSkills