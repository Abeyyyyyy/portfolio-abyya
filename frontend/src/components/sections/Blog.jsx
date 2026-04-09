import { forwardRef } from 'react'
import { useNavigate } from 'react-router-dom'

const Blog = forwardRef(({ t = {}, tr = {}, data = {} }, ref) => {
  const navigate = useNavigate()

  const placeholderPosts = [
    {
      id: null,
      title: tr?.blog_placeholder1_title || 'Coming Soon Article',
      excerpt: tr?.blog_placeholder1_excerpt || 'This article will be available soon.',
      date: tr?.blog_coming_soon || 'Coming Soon',
      tag: 'Laravel',
      read_time: '5 min',
    },
    {
      id: null,
      title: tr?.blog_placeholder2_title || 'Building Fullstack Apps',
      excerpt: tr?.blog_placeholder2_excerpt || 'Learn how to build fullstack apps.',
      date: tr?.blog_coming_soon || 'Coming Soon',
      tag: 'Laravel + React',
      read_time: '8 min',
    },
    {
      id: null,
      title: tr?.blog_placeholder3_title || 'Tips & Tricks',
      excerpt: tr?.blog_placeholder3_excerpt || 'Useful tips for developers.',
      date: tr?.blog_coming_soon || 'Coming Soon',
      tag: 'Tips',
      read_time: '4 min',
    },
  ]

  const posts = data?.blogs?.length > 0 ? data.blogs : placeholderPosts

  const handleReadMore = (post) => {
    if (post.id) {
      navigate(`/blog/${post.id}`)
    }
  }

  return (
    <section
      id="blog"
      ref={ref}
      style={{
        minHeight: '100vh',
        padding: '100px 64px',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <div style={{ width: '100%', maxWidth: '1100px' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ width: '32px', height: '1px', background: t?.accent }} />
          <span style={{ fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: t?.accent }}>
            {tr?.blog_subtitle || 'Blog'}
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '56px' }}>
          <h2 style={{ fontSize: '48px', fontWeight: '700', letterSpacing: '-2px' }}>
            {tr?.blog_title_1 || 'Latest'}{' '}
            <span style={{ color: t?.accent }}>
              {tr?.blog_title_2 || 'Articles'}
            </span>
          </h2>

          <span style={{ fontSize: '11px', color: t?.textFaint, letterSpacing: '1px' }}>
            {data?.blogs?.length > 0
              ? `${data.blogs.length} ${tr?.blog_count_label || 'Posts'}`
              : tr?.blog_coming_soon || 'Coming Soon'}
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }} className="blog-grid">
          {posts.map((post, i) => (
            <div
              key={i}
              onClick={() => handleReadMore(post)}
              style={{
                background: t?.bg2,
                border: `0.5px solid ${t?.border}`,
                borderRadius: '14px',
                padding: '28px',
                transition: 'all 0.3s',
                cursor: post?.id ? 'pointer' : 'default',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = t?.accent
                e.currentTarget.style.transform = 'translateY(-6px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = t?.border
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: `linear-gradient(90deg, ${t?.accent}, transparent)`,
                opacity: 0.5,
              }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                <span style={{
                  fontSize: '9px',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  color: t?.accent,
                  background: t?.accentSoft,
                  border: `0.5px solid ${t?.accent}`,
                  padding: '4px 12px',
                  borderRadius: '20px',
                }}>
                  {post?.tag}
                </span>

                <span style={{ fontSize: '10px', color: t?.textFaint }}>
                  {post?.read_time || post?.readTime}
                </span>
              </div>

              <h3 style={{
                fontSize: '15px',
                fontWeight: '600',
                color: t?.text,
                lineHeight: 1.5,
                marginBottom: '12px',
                flex: 1,
              }}>
                {post?.title}
              </h3>

              <p style={{
                fontSize: '12px',
                color: t?.textFaint,
                lineHeight: 1.8,
                marginBottom: '20px',
              }}>
                {post?.excerpt}
              </p>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '16px',
                borderTop: `0.5px solid ${t?.border}`,
              }}>
                <span style={{ fontSize: '10px', color: t?.textFaint }}>
                  {post?.created_at
                    ? new Date(post.created_at).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })
                    : post?.date}
                </span>

                <span style={{
                  fontSize: '10px',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  color: post?.id ? t?.accent : t?.textFaint,
                  opacity: post?.id ? 1 : 0.5,
                }}>
                  {post?.id
                    ? `${tr?.blog_read_more || 'Read More'} →`
                    : tr?.blog_coming_soon || 'Coming Soon'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .blog-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 768px) { .blog-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
})

Blog.displayName = 'Blog'
export default Blog