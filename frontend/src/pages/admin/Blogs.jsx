import { useEffect, useState } from 'react'
import api from '../../services/api'

function AdminBlogs({ t }) {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editData, setEditData] = useState(null)
  const [form, setForm] = useState({
    title: '', tag: '', excerpt: '',
    content: '', read_time: '5 min', status: 'draft',
  })

  useEffect(() => { fetchData() }, [])

  const fetchData = async () => {
    setLoading(true)
    const res = await api.get('/blogs')
    setBlogs(res.data)
    setLoading(false)
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editData) { await api.put(`/blogs/${editData.id}`, form) }
    else { await api.post('/blogs', form) }
    resetForm(); fetchData()
  }

  const handleEdit = (item) => {
    setEditData(item)
    setForm({ title: item.title, tag: item.tag, excerpt: item.excerpt, content: item.content || '', read_time: item.read_time, status: item.status })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Hapus blog ini?')) return
    await api.delete(`/blogs/${id}`)
    fetchData()
  }

  const resetForm = () => {
    setForm({ title: '', tag: '', excerpt: '', content: '', read_time: '5 min', status: 'draft' })
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

  const statusColor = { published: '#4ade80', draft: t.textFaint }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: t.textFaint }}>{blogs.length} Articles</div>
        <button onClick={() => { resetForm(); setShowForm(true) }}
          style={{ background: t.accent, color: '#F5E9E2', border: 'none', borderRadius: '8px', padding: '8px 18px', fontSize: '10px', letterSpacing: '1.2px', textTransform: 'uppercase', cursor: 'pointer' }}>
          + Add Article
        </button>
      </div>

      {showForm && (
        <div style={{ background: t.bg2, border: `0.5px solid ${t.border}`, borderLeft: `2px solid ${t.accent}`, borderRadius: '12px', padding: '24px', marginBottom: '20px' }}>
          <div style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: t.accent, marginBottom: '18px' }}>
            {editData ? 'Edit' : 'Add'} Article
          </div>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '12px' }}>
              <label style={lbl}>Judul Artikel</label>
              <input style={inp} name="title" value={form.title} onChange={handleChange} placeholder="Judul artikel..." required />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <div>
                <label style={lbl}>Tag / Kategori</label>
                <input style={inp} name="tag" value={form.tag} onChange={handleChange} placeholder="Laravel, React, Tips" required />
              </div>
              <div>
                <label style={lbl}>Read Time</label>
                <input style={inp} name="read_time" value={form.read_time} onChange={handleChange} placeholder="5 min" />
              </div>
              <div>
                <label style={lbl}>Status</label>
                <select style={inp} name="status" value={form.status} onChange={handleChange}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={lbl}>Excerpt (ringkasan)</label>
              <textarea style={{ ...inp, height: '70px', resize: 'none' }} name="excerpt" value={form.excerpt} onChange={handleChange} placeholder="Ringkasan singkat artikel..." required />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={lbl}>Konten Lengkap (opsional)</label>
              <textarea style={{ ...inp, height: '120px', resize: 'none' }} name="content" value={form.content} onChange={handleChange} placeholder="Tulis konten lengkap di sini..." />
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
        : blogs.length === 0 ? <div style={{ color: t.textFaint, fontSize: '12px', textAlign: 'center', padding: '40px 0' }}>Belum ada artikel. ✍️</div>
        : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {blogs.map(item => (
              <div key={item.id} style={{ background: t.bg2, border: `0.5px solid ${t.border}`, borderRadius: '10px', padding: '16px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <div style={{ fontSize: '13px', fontWeight: '500', color: t.text }}>{item.title}</div>
                    <span style={{ fontSize: '8px', letterSpacing: '1px', padding: '2px 8px', borderRadius: '20px', color: statusColor[item.status], border: `0.5px solid ${statusColor[item.status]}`, background: `${statusColor[item.status]}15`, textTransform: 'uppercase' }}>
                      {item.status}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <span style={{ fontSize: '10px', color: t.accent }}>{item.tag}</span>
                    <span style={{ fontSize: '10px', color: t.textFaint }}>{item.read_time}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                  <button onClick={() => handleEdit(item)} style={{ background: t.accentSoft, border: `0.5px solid ${t.accent}`, color: t.accent, borderRadius: '6px', padding: '6px 14px', fontSize: '9px', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer' }}>Edit</button>
                  <button onClick={() => handleDelete(item.id)} style={{ background: 'rgba(123,30,43,0.1)', border: '0.5px solid #7B1E2B', color: '#7B1E2B', borderRadius: '6px', padding: '6px 14px', fontSize: '9px', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer' }}>Hapus</button>
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
  )
}

export default AdminBlogs