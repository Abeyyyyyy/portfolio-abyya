import { forwardRef } from 'react'

const Testimonials = forwardRef(({ t, tr, data }, ref) => {
  // ✅ Safe fallback (biar gak undefined)
  const safeT = t || {}
  const safeTr = tr || {}
  const safeData = data || {}

  // ✅ Placeholder fallback
  const placeholders = [
    { name: safeTr.testi1_name, role: safeTr.testi1_role, text: safeTr.testi1_text, initials: 'GR' },
    { name: safeTr.testi2_name, role: safeTr.testi2_role, text: safeTr.testi2_text, initials: 'TS' },
    { name: safeTr.testi3_name, role: safeTr.testi3_role, text: safeTr.testi3_text, initials: 'MO' },
    { name: safeTr.testi4_name, role: safeTr.testi4_role, text: safeTr.testi4_text, initials: 'GT' },
  ]

  // ✅ Data utama / fallback ke placeholder
  const testimonials =
    safeData?.testimonials?.length > 0
      ? safeData.testimonials
      : placeholders

  const doubled = [...testimonials, ...testimonials]

  return (
    <section
      id="testimonials"
      ref={ref}
      className="testi-section"
      style={{
        minHeight: '60vh',
        padding: '100px 0',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Header */}
      <div style={{ width: '100%', maxWidth: '1100px', margin: '0 0 56px', padding: '0 64px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ width: '32px', height: '1px', background: safeT.accent }} />
          <span style={{ fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: safeT.accent }}>
            {safeTr.testi_subtitle}
          </span>
        </div>

        <h2 style={{ fontSize: '48px', fontWeight: '700', letterSpacing: '-2px', marginBottom: '56px' }}>
          {safeTr.testi_title_1}{' '}
          <span style={{ color: safeT.accent }}>{safeTr.testi_title_2}</span>
        </h2>
      </div>

      {/* Slider */}
      <div style={{ width: '100%', overflow: 'hidden', position: 'relative' }}>
        {/* Gradient kiri */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '120px',
            zIndex: 2,
            pointerEvents: 'none',
            background: `linear-gradient(to right, ${safeT.bg}, transparent)`,
          }}
        />

        {/* Gradient kanan */}
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: '120px',
            zIndex: 2,
            pointerEvents: 'none',
            background: `linear-gradient(to left, ${safeT.bg}, transparent)`,
          }}
        />

        {/* Marquee */}
        <div
          style={{
            display: 'flex',
            gap: '20px',
            animation: 'marquee 30s linear infinite',
            width: 'max-content',
            padding: '8px 0',
          }}
        >
          {doubled.map((item, i) => (
            <div
              key={i}
              style={{
                background: safeT.bg2,
                border: `0.5px solid ${safeT.border}`,
                borderRadius: '16px',
                padding: '28px 32px',
                width: '380px',
                flexShrink: 0,
                transition: 'border-color 0.3s, background 0.4s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = safeT.accent
                e.currentTarget.parentElement.style.animationPlayState = 'paused'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = safeT.border
                e.currentTarget.parentElement.style.animationPlayState = 'running'
              }}
            >
              <div
                style={{
                  fontSize: '40px',
                  color: safeT.accent,
                  opacity: 0.2,
                  lineHeight: 1,
                  marginBottom: '14px',
                  fontFamily: 'Georgia, serif',
                }}
              >
                "
              </div>

              <p
                style={{
                  fontSize: '13px',
                  color: safeT.textMuted,
                  lineHeight: 1.9,
                  marginBottom: '24px',
                  fontStyle: 'italic',
                }}
              >
                {item?.text}
              </p>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  paddingTop: '18px',
                  borderTop: `0.5px solid ${safeT.border}`,
                }}
              >
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: safeT.accentSoft,
                    border: `1px solid ${safeT.accent}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: safeT.accent,
                    flexShrink: 0,
                  }}
                >
                  {item?.initials}
                </div>

                <div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: safeT.text }}>
                    {item?.name}
                  </div>
                  <div style={{ fontSize: '11px', color: safeT.textFaint }}>
                    {item?.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Animation */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @media (max-width: 768px) {
          .testi-section {
            padding: 60px 0 !important;
          }
        }
      `}</style>
    </section>
  )
})

Testimonials.displayName = 'Testimonials'
export default Testimonials