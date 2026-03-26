import { useEffect, useState } from 'react'
import api from '../../services/api'

function AdminProjects({ t }) {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editData, setEditData] = useState(null)
  const [form, setForm] = useState({
    name: '', description: '', tech_stack: '',
    github_url: '', demo_url: '',
    status: 'planned', is_featured: false,
  })

  useEffect(() => { fetchProjects() }, [])

  const fetchProjects = async () => {
    setLoading(true)
    const res = await api.get('/projects')
    setProjects(res.data)
    setLoading(false)
  }

  const handleChange = (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm({ ...form, [e.target.name]: val })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = {
      ...form,
      tech_stack: form.tech_stack.split(',').map(s => s.trim()).filter(Boolean),
    }
    if (editData) {
      await api.put(`/projects/${editData.id}`, payload)
    } else {
      await api.post('/projects', payload)
    }
    resetForm()
    fetchProjects()
  }

  const handleEdit = (project) => {
    setEditData(project)
    setForm({
      name: project.name,
      description: project.description,
      tech_stack: Array.isArray(project.tech_stack) ? project.tech_stack.join(', ') : '',
      github_url: project.github_url || '',
      demo_url: project.demo_url || '',
      status: project.status,
      is_featured: project.is_featured,
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Hapus project ini?')) return
    await api.delete(`/projects/${id}`)
    fetchProjects()
  }

  const resetForm = () => {
    setForm({ name: '', description: '', tech_stack: '', github_url: '', demo_url: '', status: 'planned', is_featured: false })
    setEditData(null)
    setShowForm(false)
  }

  const inputStyle = {
    width: '100%', background: t.bg,
    border: `0.5px solid ${t.border2}`,
    borderRadius: '8px', padding: '10px 14px',
    fontSize: '12px', color: t.text,
    outline: 'none', fontFamily: 'sans-serif',
    transition: 'border-color 0.2s',
  }

  const labelStyle = {
    fontSize: '9px', letterSpacing: '1.5px',
    textTransform: 'uppercase', color: t.textFaint,
    marginBottom: '6px', display: 'block',
  }

  const statusColor = {
    done: '#4ade80',
    on_progress: t.pink,
    planned: t.textFaint,
  }

  return (
    <div>

      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: t.textFaint }}>
          {projects.length} Projects
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true) }}
          style={{
            background: t.accent, color: '#F5E9E2',
            border: 'none', borderRadius: '8px',
            padding: '8px 18px', fontSize: '10px',
            letterSpacing: '1.2px', textTransform: 'uppercase',
            cursor: 'pointer',
          }}
        >
          + Add Project
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <div style={{
          background: t.bg2, border: `0.5px solid ${t.border}`,
          borderRadius: '12px', padding: '24px', marginBottom: '20px',
          borderLeft: `2px solid ${t.accent}`,
        }}>
          <div style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: t.accent, marginBottom: '18px' }}>
            {editData ? 'Edit Project' : 'Add Project'}
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <div>
                <label style={labelStyle}>Nama Project</label>
                <input style={inputStyle} name="name" value={form.name} onChange={handleChange} placeholder="E-Book System" required />
              </div>
              <div>
                <label style={labelStyle}>Status</label>
                <select style={inputStyle} name="status" value={form.status} onChange={handleChange}>
                  <option value="planned">Planned</option>
                  <option value="on_progress">On Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <label style={labelStyle}>Deskripsi</label>
              <textarea style={{ ...inputStyle, height: '80px', resize: 'none' }} name="description" value={form.description} onChange={handleChange} placeholder="Deskripsi project..." required />
            </div>

            <div style={{ marginBottom: '12px' }}>
              <label style={labelStyle}>Tech Stack (pisah dengan koma)</label>
              <input style={inputStyle} name="tech_stack" value={form.tech_stack} onChange={handleChange} placeholder="Laravel, React.js, MySQL" required />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <div>
                <label style={labelStyle}>GitHub URL</label>
                <input style={inputStyle} name="github_url" value={form.github_url} onChange={handleChange} placeholder="https://github.com/..." />
              </div>
              <div>
                <label style={labelStyle}>Demo URL</label>
                <input style={inputStyle} name="demo_url" value={form.demo_url} onChange={handleChange} placeholder="https://..." />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
              <input type="checkbox" name="is_featured" checked={form.is_featured} onChange={handleChange} id="featured" />
              <label htmlFor="featured" style={{ fontSize: '11px', color: t.textMuted, cursor: 'pointer' }}>Featured project</label>
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
      ) : projects.length === 0 ? (
        <div style={{ color: t.textFaint, fontSize: '12px', textAlign: 'center', padding: '40px 0' }}>
          Belum ada project. Tambahkan yang pertama! 🚀
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {projects.map(project => (
            <div key={project.id} style={{
              background: t.bg2, border: `0.5px solid ${t.border}`,
              borderRadius: '10px', padding: '16px 18px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              gap: '16px',
            }}>
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <div style={{ fontSize: '13px', fontWeight: '500', color: t.text }}>{project.name}</div>
                  {project.is_featured && (
                    <span style={{ fontSize: '8px', letterSpacing: '1px', padding: '2px 8px', borderRadius: '20px', background: t.accentSoft, border: `0.5px solid ${t.accent}`, color: t.accent }}>Featured</span>
                  )}
                  <span style={{ fontSize: '8px', letterSpacing: '1px', padding: '2px 8px', borderRadius: '20px', color: statusColor[project.status], border: `0.5px solid ${statusColor[project.status]}`, background: `${statusColor[project.status]}15` }}>
                    {project.status}
                  </span>
                </div>
                <div style={{ fontSize: '11px', color: t.textFaint, marginBottom: '8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {project.description}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {Array.isArray(project.tech_stack) && project.tech_stack.map((tech, i) => (
                    <span key={i} style={{ fontSize: '9px', padding: '2px 8px', borderRadius: '20px', border: `0.5px solid ${t.border2}`, color: t.textFaint }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                <button onClick={() => handleEdit(project)} style={{ background: t.accentSoft, border: `0.5px solid ${t.accent}`, color: t.accent, borderRadius: '6px', padding: '6px 14px', fontSize: '9px', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer' }}>
                  Edit
                </button>
                <button onClick={() => handleDelete(project.id)} style={{ background: 'rgba(123,30,43,0.1)', border: '0.5px solid #7B1E2B', color: '#7B1E2B', borderRadius: '6px', padding: '6px 14px', fontSize: '9px', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer' }}>
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminProjects