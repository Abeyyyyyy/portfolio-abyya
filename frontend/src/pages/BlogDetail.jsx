import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../services/api'

function BlogDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isDark, setIsDark] = useState(false)

 const handleBack = () => {
  navigate('/')
}

  const t = {
    bg: isDark ? '#0D0D0D' : '#F2E8DF',
    bg2: isDark ? '#111827' : '#EDE0D8',
    border: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(13,13,13,0.08)',
    border2: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(13,13,13,0.18)',
    text: isDark ? '#F0EDE8' : '#0D0D0D',
    textMuted: isDark ? 'rgba(240,237,232,0.6)' : 'rgba(13,13,13,0.6)',
    textFaint: isDark ? 'rgba(240,237,232,0.3)' : 'rgba(13,13,13,0.3)',
    accent: '#7B1E2B',
    accentSoft: 'rgba(123,30,43,0.12)',
    navy: '#1F2A44',
    grid: isDark ? 'rgba(255,255,255,0.018)' : 'rgba(13,13,13,0.04)',
  }

  useEffect(() => {
    api.get(`/blogs/${id}`)
      .then(res => { setBlog(res.data); setLoading(false) })
      .catch(() => { setLoading(false); navigate('/') })
  }, [id])

  if (loading) return (
    <div style={{ minHeight: '100vh', background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '32px', height: '32px', borderRadius: '50%', border: `2px solid ${t.border}`, borderTop: `2px solid ${t.accent}`, animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
    </div>
  )

  if (!blog) return null

  return (
    <div style={{ minHeight: '100vh', background: t.bg, color: t.text, transition: 'background 0.4s', fontFamily: "'Inter', sans-serif" }}>

      {/* Grid bg */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', backgroundImage: `linear-gradient(${t.grid} 1px, transparent 1px), linear-gradient(90deg, ${t.grid} 1px, transparent 1px)`, backgroundSize: '48px 48px' }} />

      {/* Topbar */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: t.bg, borderBottom: `0.5px solid ${t.border}`, padding: '16px 64px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={handleBack} style={{ background: 'transparent', border: 'none', color: t.textMuted, cursor: 'pointer', fontSize: '14px', padding: 0 }}>
          Back to Portfolio
        </button>

        <button onClick={() => setIsDark(!isDark)}
          style={{ background: 'transparent', border: `0.5px solid ${t.border}`, borderRadius: '8px', padding: '8px 16px', fontSize: '11px', color: t.textMuted, cursor: 'pointer' }}>
          {isDark ? '☀ Light' : '☾ Dark'}
        </button>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '120px 32px 80px', position: 'relative', zIndex: 1 }}>

        {/* Tag + Read time */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <span style={{ fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', color: t.accent, background: t.accentSoft, border: `0.5px solid ${t.accent}`, padding: '4px 14px', borderRadius: '20px' }}>
            {blog.tag}
          </span>
          <span style={{ fontSize: '11px', color: t.textFaint }}>{blog.read_time}</span>
          <span style={{ fontSize: '11px', color: t.textFaint }}>·</span>
          <span style={{ fontSize: '11px', color: t.textFaint }}>
            {new Date(blog.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
        </div>

        {/* Title */}
        <h1 style={{ fontSize: '42px', fontWeight: '700', lineHeight: 1.2, letterSpacing: '-1.5px', marginBottom: '16px', color: t.text }}>
          {blog.title}
        </h1>

        {/* Excerpt */}
        <p style={{ fontSize: '16px', color: t.textMuted, lineHeight: 1.8, marginBottom: '48px', paddingBottom: '48px', borderBottom: `0.5px solid ${t.border}` }}>
          {blog.excerpt}
        </p>

        {/* Content */}
        <div style={{ fontSize: '15px', color: t.textMuted, lineHeight: 2.0 }}>
          {blog.content ? blog.content.split('\n').map((line, i) => {
            if (line.startsWith('## ')) return (
              <h2 key={i} style={{ fontSize: '22px', fontWeight: '600', color: t.text, marginTop: '40px', marginBottom: '16px', letterSpacing: '-0.5px' }}>
                {line.replace('## ', '')}
              </h2>
            )
            if (line.startsWith('- ')) return (
              <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
                <span style={{ color: t.accent, flexShrink: 0, marginTop: '2px' }}>•</span>
                <span>{line.replace('- ', '')}</span>
              </div>
            )
            if (line === '') return <div key={i} style={{ height: '16px' }} />
            return <p key={i} style={{ marginBottom: '16px' }}>{line}</p>
          }) : (
            <p style={{ color: t.textFaint, fontStyle: 'italic' }}>Konten belum tersedia.</p>
          )}
        </div>

        {/* Footer */}
        <div style={{ marginTop: '64px', paddingTop: '32px', borderTop: `0.5px solid ${t.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '13px', color: t.textFaint }}>Ditulis oleh <span style={{ color: t.accent, fontWeight: '600' }}>Abiyya Hamdan Nurwandha</span></div>
          <button onClick={handleBack}
            style={{ background: t.accent, color: '#F2E8DF', border: 'none', borderRadius: '8px', padding: '10px 24px', fontSize: '11px', fontWeight: '600', letterSpacing: '1.5px', textTransform: 'uppercase', cursor: 'pointer' }}>
            Back
          </button>
        </div>
      </div>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');`}</style>
    </div>
  )
}

export default BlogDetail