import { forwardRef, useEffect, useState, useRef } from 'react'

const lines = [
  { text: "Be careful making wishes in the dark", delay: 0 },
  { text: "Can't be sure when they've hit their mark", delay: 3000 },
  { text: "And besides… I'm just dreaming of tearing you apart", delay: 6000 },
  { text: "I'm in the deep details with the devil", delay: 9000 },
  { text: "So now the world can never get me on my level", delay: 12000 },
  { text: "I just got to get you out of the cage", delay: 15000 },
  { text: "I'm a young lover's rage", delay: 17000 },
  { text: "Gonna need a spark to ignite", delay: 19000 },
]

const LyricsSection = forwardRef(({ t }, ref) => {
  const [visibleLines, setVisibleLines] = useState([])
  const [phase, setPhase] = useState('idle')
  const [fadeOut, setFadeOut] = useState(false)
  const sectionRef = useRef(null)
  const animRef = useRef(null)
  const hasPlayed = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !hasPlayed.current) {
          hasPlayed.current = true
          startAnimation()
        }
      },
      { threshold: 0.5 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const startAnimation = () => {
    setPhase('typing')
    setVisibleLines([])
    setFadeOut(false)

    lines.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, { text: '', fullText: line.text, index: i }])
        typeText(line.text, i)
      }, line.delay)
    })

    // Fade out after all lines shown
    setTimeout(() => {
      setFadeOut(true)
      setTimeout(() => setPhase('done'), 1200)
    }, 20000)
  }

  const typeText = (text, lineIndex) => {
    let ci = 0
    const interval = setInterval(() => {
      ci++
      setVisibleLines(prev => prev.map((l, i) =>
        i === lineIndex ? { ...l, text: text.slice(0, ci) } : l
      ))
      if (ci >= text.length) clearInterval(interval)
    }, 50)
  }

  if (phase === 'done') return null

  return (
    <section
      id="lyrics"
      ref={el => {
        sectionRef.current = el
        if (typeof ref === 'function') ref(el)
        else if (ref) ref.current = el
      }}
      style={{
        minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#0a0a0a',
        position: 'relative', overflow: 'hidden',
        transition: 'opacity 1.2s ease',
        opacity: fadeOut ? 0 : 1,
      }}
    >
      {/* Grain texture */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.04,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundSize: '200px 200px', pointerEvents: 'none',
      }} />

      {/* Glow center */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(123,30,43,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Lines */}
      <div style={{
        textAlign: 'center', padding: '0 48px',
        maxWidth: '800px', position: 'relative', zIndex: 1,
      }}>
        {visibleLines.map((line, i) => (
          <div key={i} style={{
            marginBottom: i === visibleLines.length - 1 ? '0' : '20px',
            animation: 'fadeInUp 0.8s ease forwards',
            opacity: 0,
            animationDelay: '0s',
            animationFillMode: 'forwards',
          }}>
            <span style={{
              fontSize: i === 6 ? '52px' : i >= 4 ? '28px' : '22px',
              fontWeight: i === 6 ? '700' : i >= 4 ? '500' : '300',
              color: i === 6 ? '#7B1E2B'
                : i >= 4 ? 'rgba(242,232,223,0.85)'
                : 'rgba(242,232,223,0.45)',
              letterSpacing: i === 6 ? '-1px' : '0.5px',
              lineHeight: 1.4,
              fontFamily: "'Inter', sans-serif",
              transition: 'all 0.3s',
            }}>
              {line.text}
              {/* Blinking cursor on last active line */}
              {i === visibleLines.length - 1 && (
                <span style={{
                  display: 'inline-block', width: '2px', height: i === 6 ? '40px' : '18px',
                  background: '#7B1E2B', marginLeft: '4px',
                  verticalAlign: 'middle',
                  animation: 'blink 1s step-end infinite',
                }} />
              )}
            </span>
          </div>
        ))}

        {/* Author tag */}
        {visibleLines.length === lines.length && (
          <div style={{
            marginTop: '48px',
            fontSize: '11px', letterSpacing: '3px',
            textTransform: 'uppercase',
            color: 'rgba(242,232,223,0.2)',
            animation: 'fadeInUp 1s ease forwards',
          }}>
            — Abiyya Hamdan Nurwandha
          </div>
        )}
      </div>

      {/* Scroll hint */}
      {visibleLines.length >= 3 && (
        <div style={{
          position: 'absolute', bottom: '40px', left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '8px',
          animation: 'fadeInUp 1s ease forwards',
        }}>
          <span style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(242,232,223,0.2)' }}>
            scroll
          </span>
          <div style={{
            width: '1px', height: '40px',
            background: 'linear-gradient(to bottom, rgba(123,30,43,0.6), transparent)',
            animation: 'scrollPulse 2s ease-in-out infinite',
          }} />
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes scrollPulse {
          0%,100% { opacity: 0.3; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.1); }
        }
      `}</style>
    </section>
  )
})

LyricsSection.displayName = 'LyricsSection'
export default LyricsSection