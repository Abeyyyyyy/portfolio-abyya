import { useEffect, useState } from 'react'
import api from '../../services/api'

function AdminTestimonials({ t }) {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editData, setEditData] = useState(null)
  const [form, setForm] = useState({ name: '', role: '', initials: '', text: '' })

  useEffect(() => { fetchData() }, [])

  const fetchData = async () => {
    setLoading(true)
    const res = await api.get('/testimonials')
    setTestimonials(res.data)
    setLoading(false)
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editData) { await api.put(`/testimonials/${editData.id}`, form) }
    else { await api.post('/testimonials', form) }
    resetForm(); fetchData()
  }

  const handleEdit = (item) => {
    setEditData(item)
    setForm({ name: item.name, role: item.role, initials: item.initials, text: item.text })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Hapus testimoni ini?')) return
    await api.delete(`/testimonials/${id}`)
    fetchData()
  }

  const resetForm = () => {
    setForm({ name: '', role: '', initials: '', text: '' })
    setEditData(null); setShowForm(false)
  }

  const inp = {
    width: '100%', background: t.bg, border: `0.5px solid ${t.border2}`,
    borderRadius: '8px', padding: '10px 14px', fontSize: '12px',
    color: t.text, outline: 'none', fontFamily: 'sans-serif',
  }

  const lbl = {
    fontSize: '9px', letterSpacing: '1.5px', textTransform: 'uppercase',
    color: t.textFaint, marginBottom: '6px', display: 'block',
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: t.textFaint }}>{testimonials.length} Testimonials</div>
        <button onClick={() => { resetForm(); setShowForm(true) }}
          style={{ background: t.accent, color: '#F5E9E2', border: 'none', borderRadius: '8px', padding: '8px 18px', fontSize: '10px', letterSpacing: '1.2px', textTransform: 'uppercase', cursor: 'pointer' }}>
          + Add Testimonial
        </button>
      </div>

      {showForm && (
        <div style={{ background: t.bg2, border: `0.5px solid ${t.border}`, borderLeft: `2px solid ${t.accent}`, borderRadius: '12px', padding: '24px', marginBottom: '20px' }}>
          <div style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: t.accent, marginBottom: '18px' }}>
            {editData ? 'Edit' : 'Add'} Testimonial
          </div>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 80px', gap: '12px', marginBottom: '12px' }}>
              <div>
                <label style={lbl}>Nama</label>
                <input style={inp} name="name" value={form.name} onChange={handleChange} placeholder="Nama guru / teman" required />
              </div>
              <div>
                <label style={lbl}>Role / Jabatan</label>
                <input style={inp} name="role" value={form.role} onChange={handleChange} placeholder="Guru RPL · SMKN 4" required />
              </div>
              <div>
                <label style={lbl}>Inisial</label>
                <input style={inp} name="initials" value={form.initials} onChange={handleChange} placeholder="AB" maxLength={3} required />
              </div>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={lbl}>Testimoni</label>
              <textarea style={{ ...inp, height: '90px', resize: 'none' }} name="text" value={form.text} onChange={handleChange} placeholder="Tulis testimoni di sini..." required />
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

      {loading ? <div style={{ color: t.textFaint, fontSize: '12px' }}>Loading...</div>
        : testimonials.length === 0 ? <div style={{ color: t.textFaint, fontSize: '12px', textAlign: 'center', padding: '40px 0' }}>Belum ada testimoni. 🌟</div>
        : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {testimonials.map(item => (
              <div key={item.id} style={{ background: t.bg2, border: `0.5px solid ${t.border}`, borderRadius: '10px', padding: '18px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: t.accentSoft, border: `0.5px solid ${t.accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '600', color: t.accent }}>
                      {item.initials}
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: '500', color: t.text }}>{item.name}</div>
                      <div style={{ fontSize: '10px', color: t.textFaint }}>{item.role}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button onClick={() => handleEdit(item)} style={{ background: t.accentSoft, border: `0.5px solid ${t.accent}`, color: t.accent, borderRadius: '6px', padding: '5px 12px', fontSize: '9px', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer' }}>Edit</button>
                    <button onClick={() => handleDelete(item.id)} style={{ background: 'rgba(123,30,43,0.1)', border: '0.5px solid #7B1E2B', color: '#7B1E2B', borderRadius: '6px', padding: '5px 12px', fontSize: '9px', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer' }}>Hapus</button>
                  </div>
                </div>
                <p style={{ fontSize: '12px', color: t.textMuted, lineHeight: 1.8, fontStyle: 'italic' }}>"{item.text}"</p>
              </div>
            ))}
          </div>
        )}
    </div>
  )
}

export default AdminTestimonials