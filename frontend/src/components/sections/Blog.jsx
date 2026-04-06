import { forwardRef } from 'react'
import { useNavigate } from 'react-router-dom'

const Blog = forwardRef(({ t, data }, ref) => {
  const navigate = useNavigate()

  const placeholderPosts = [
    {
      id: null,
      title: 'Pengalaman Pertama Belajar Laravel',
      excerpt: 'Perjalanan belajar framework PHP yang powerful ini dari nol — apa yang susah, apa yang seru, dan tips untuk pemula.',
      date: 'Coming Soon',
      tag: 'Laravel',
      read_time: '5 min',
    },
    {
      id: null,
      title: 'Membangun REST API dengan Laravel Sanctum',
      excerpt: 'Cara membuat API yang aman menggunakan Laravel Sanctum untuk autentikasi token-based.',
      date: 'Coming Soon',
      tag: 'Laravel + React',
      read_time: '8 min',
    },
    {
      id: null,
      title: 'Tips Belajar Coding untuk Siswa SMK',
      excerpt: 'Pengalaman dan tips dari siswa RPL yang belajar coding sambil tetap produktif dan konsisten.',
      date: 'Coming Soon',
      tag: 'Tips',
      read_time: '4 min',
    },
  ]

  const posts = data.blogs?.length > 0 ? data.blogs : placeholderPosts

  const handleReadMore = (post) => {
    if (post.id) {
      navigate(`/blog/${post.id}`)
    }
  }

  return (
    <section id="blog" ref={ref} style={{
      minHeight: '100vh', padding: '100px 64px',
      display: 'flex', alignItems: 'center',
      position: 'relative',
    }}>
      <div style={{ width: '100%', maxWidth: '1100px' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ width: '32px', height: '1px', background: t.accent }} />
          <span style={{ fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: t.accent }}>Blog</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '56px' }}>
          <h2 style={{ fontSize: '48px', fontWeight: '700', letterSpacing: '-2px' }}>
            My <span style={{ color: t.accent }}>Writings</span>
          </h2>
          <span style={{ fontSize: '11px', color: t.textFaint, letterSpacing: '1px' }}>
            {data.blogs?.length > 0 ? `${data.blogs.length} artikel` : 'Coming soon'}
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }} className="blog-grid">
          {posts.map((post, i) => (
            <div key={i}
              onClick={() => handleReadMore(post)}
              style={{
                background: t.bg2, border: `0.5px solid ${t.border}`,
                borderRadius: '14px', padding: '28px',
                transition: 'all 0.3s',
                cursor: post.id ? 'none' : 'default',
                display: 'flex', flexDirection: 'column',
                position: 'relative', overflow: 'hidden',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = t.accent
                e.currentTarget.style.transform = 'translateY(-6px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = t.border
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {/* Top accent line */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0,
                height: '2px',
                background: `linear-gradient(90deg, ${t.accent}, transparent)`,
                opacity: 0.5,
              }} />

              {/* Tag + Read time */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                <span style={{
                  fontSize: '9px', letterSpacing: '1.5px', textTransform: 'uppercase',
                  color: t.accent, background: t.accentSoft,
                  border: `0.5px solid ${t.accent}`,
                  padding: '4px 12px', borderRadius: '20px',
                }}>
                  {post.tag}
                </span>
                <span style={{ fontSize: '10px', color: t.textFaint }}>
                  {post.read_time || post.readTime}
                </span>
              </div>

              {/* Title */}
              <h3 style={{
                fontSize: '15px', fontWeight: '600',
                color: t.text, lineHeight: 1.5,
                marginBottom: '12px', flex: 1,
              }}>
                {post.title}
              </h3>

              {/* Excerpt */}
              <p style={{
                fontSize: '12px', color: t.textFaint,
                lineHeight: 1.8, marginBottom: '20px',
              }}>
                {post.excerpt}
              </p>

              {/* Footer */}
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', paddingTop: '16px',
                borderTop: `0.5px solid ${t.border}`,
              }}>
                <span style={{ fontSize: '10px', color: t.textFaint }}>
                  {post.created_at
                    ? new Date(post.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
                    : post.date}
                </span>
                <span style={{
                  fontSize: '10px', letterSpacing: '1px',
                  textTransform: 'uppercase',
                  color: post.id ? t.accent : t.textFaint,
                  opacity: post.id ? 1 : 0.5,
                }}>
                  {post.id ? 'Read More →' : 'Coming Soon'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .blog-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 768px) {
          .blog-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
})

Blog.displayName = 'Blog'
export default Blog