import { forwardRef, useEffect, useRef } from 'react'

const Testimonials = forwardRef(({ t, data }, ref) => {
  const placeholders = [
    { name: 'Guru RPL', role: 'SMKN 4 Bandung', text: 'Abiyya adalah siswa yang sangat rajin dan memiliki kemampuan problem solving yang baik. Potensinya di bidang web development sangat menjanjikan.', initials: 'GR' },
    { name: 'Teman Sekelas', role: 'RPL III · SMKN 4', text: 'Orangnya asik, kalau ada yang gak ngerti coding dia selalu siap bantu. Skillnya emang udah di atas rata-rata.', initials: 'TS' },
    { name: 'Mentor ORBIT', role: 'Komunitas ORBIT', text: 'Aktif dan antusias di setiap kegiatan. Abiyya selalu ingin belajar hal baru dan tidak takut mencoba hal yang challenging.', initials: 'MO' },
    { name: 'Guru TIK', role: 'SMKN 4 Bandung', text: 'Hard skill dan soft skill-nya seimbang. Bisa kerja tim dengan baik dan punya inisiatif tinggi dalam mengerjakan proyek.', initials: 'GT' },
  ]

  const testimonials = data.testimonials?.length > 0 ? data.testimonials : placeholders
  const doubled = [...testimonials, ...testimonials]

  return (
    <section id="testimonials" ref={ref} style={{
      minHeight: '60vh', padding: '100px 0',
      display: 'flex', alignItems: 'center',
      flexDirection: 'column', justifyContent: 'center',
      overflow: 'hidden', position: 'relative',
    }}>

      {/* Header */}
      <div style={{ width: '100%', maxWidth: '1100px', margin: '0 auto 56px', padding: '0 64px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ width: '32px', height: '1px', background: t.accent }} />
          <span style={{ fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: t.accent }}>Testimonials</span>
        </div>
        <h2 style={{ fontSize: '48px', fontWeight: '700', letterSpacing: '-2px' }}>
          What They <span style={{ color: t.accent }}>Say</span>
        </h2>
      </div>

      {/* Marquee */}
      <div style={{ width: '100%', overflow: 'hidden', position: 'relative' }}>
        {/* Fade left */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width: '120px', zIndex: 2, pointerEvents: 'none',
          background: `linear-gradient(to right, ${t.bg}, transparent)`,
        }} />
        {/* Fade right */}
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0,
          width: '120px', zIndex: 2, pointerEvents: 'none',
          background: `linear-gradient(to left, ${t.bg}, transparent)`,
        }} />

        <div style={{
          display: 'flex', gap: '20px',
          animation: 'marquee 30s linear infinite',
          width: 'max-content', padding: '8px 0',
        }}>
          {doubled.map((item, i) => (
            <div key={i} style={{
              background: t.bg2, border: `0.5px solid ${t.border}`,
              borderRadius: '16px', padding: '28px 32px',
              width: '380px', flexShrink: 0,
              transition: 'border-color 0.3s, background 0.4s',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = t.accent
                e.currentTarget.parentElement.style.animationPlayState = 'paused'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = t.border
                e.currentTarget.parentElement.style.animationPlayState = 'running'
              }}
            >
              <div style={{
                fontSize: '40px', color: t.accent,
                opacity: 0.2, lineHeight: 1,
                marginBottom: '14px',
                fontFamily: 'Georgia, serif',
              }}>"</div>
              <p style={{
                fontSize: '13px', color: t.textMuted,
                lineHeight: 1.9, marginBottom: '24px',
                fontStyle: 'italic',
              }}>
                {item.text}
              </p>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                paddingTop: '18px', borderTop: `0.5px solid ${t.border}`,
              }}>
                <div style={{
                  width: '38px', height: '38px', borderRadius: '50%',
                  background: t.accentSoft, border: `1px solid ${t.accent}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '12px', fontWeight: '600', color: t.accent, flexShrink: 0,
                }}>
                  {item.initials}
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: t.text }}>{item.name}</div>
                  <div style={{ fontSize: '11px', color: t.textFaint }}>{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (max-width: 768px) {
          .testi-section { padding: 60px 0 !important; }
        }
      `}</style>
    </section>
  )
})

Testimonials.displayName = 'Testimonials'
export default Testimonials