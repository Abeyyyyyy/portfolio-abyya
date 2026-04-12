import { forwardRef, useEffect, useState, useRef, useCallback } from 'react'

const lines = [
  { text: "Be careful making wishes in the dark", size: 'md' },
  { text: "Can't be sure when they've hit their mark", size: 'md' },
  { text: "And besides…", size: 'sm' },
  { text: "I'm just dreaming of tearing you apart", size: 'lg' },
  { text: "I'm in the deep details with the devil", size: 'md' },
  { text: "So now the world can never get me on my level", size: 'md' },
  { text: "I just got to get you out of the cage", size: 'md' },
  { text: "I'm a young lover's rage", size: 'xl' },
  { text: "Gonna need a spark to ignite", size: 'lg' },
]

const fontSize = { sm: '18px', md: '24px', lg: '36px', xl: '56px' }
const fontWeight = { sm: '300', md: '300', lg: '500', xl: '700' }

const LyricsSection = forwardRef(({ t }, ref) => {
  const [currentLine, setCurrentLine] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [phase, setPhase] = useState('idle')
  const [speed, setSpeed] = useState(1)
  const sectionRef = useRef(null)
  const intervalRef = useRef(null)
  const lineTimeoutRef = useRef(null)
  const isVisible = useRef(false)
  const lastScrollY = useRef(0)
  const speedTimeout = useRef(null)

  const typeLine = useCallback((lineIndex, typeSpeed = 50) => {
    if (lineIndex >= lines.length) {
      setTimeout(() => {
        setCurrentLine(0)
        setDisplayText('')
        setPhase('idle')
        setTimeout(() => startSequence(), 1500)
      }, 2000)
      return
    }

    setCurrentLine(lineIndex)
    setDisplayText('')
    const text = lines[lineIndex].text
    let ci = 0

    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      ci++
      setDisplayText(text.slice(0, ci))
      if (ci >= text.length) {
        clearInterval(intervalRef.current)
        const pause = Math.max(400, 1800 / speed)
        lineTimeoutRef.current = setTimeout(() => {
          typeLine(lineIndex + 1, Math.max(20, 50 / speed))
        }, pause)
      }
    }, Math.max(20, typeSpeed / speed))
  }, [speed])

  const startSequence = useCallback(() => {
    setPhase('typing')
    typeLine(0, 50)
  }, [typeLine])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          isVisible.current = true
          if (phase === 'idle') startSequence()
        } else {
          isVisible.current = false
        }
      },
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [phase, startSequence])

  useEffect(() => {
    const handleScroll = () => {
      if (!isVisible.current) return
      const delta = Math.abs(window.scrollY - lastScrollY.current)
      lastScrollY.current = window.scrollY
      if (delta > 2) {
        setSpeed(prev => Math.min(prev + 0.5, 8))
        clearTimeout(speedTimeout.current)
        speedTimeout.current = setTimeout(() => setSpeed(1), 800)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current)
      clearTimeout(lineTimeoutRef.current)
      clearTimeout(speedTimeout.current)
    }
  }, [])

  const line = lines[currentLine] || lines[0]

  return (
    <section
      id="lyrics"
      ref={el => {
        sectionRef.current = el
        if (typeof ref === 'function') ref(el)
        else if (ref) ref.current = el
      }}
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#080808',
        position: 'relative',
        overflow: 'hidden',
        marginLeft: '-52px',
      }}
    >
      {/* Grain */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.05, pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: '200px 200px',
      }} />

      {/* Glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '700px', height: '700px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(123,30,43,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
        transition: 'opacity 0.5s',
      }} />

      {/* Horizontal line decoration */}
      <div style={{
        position: 'absolute', left: '64px', right: '64px',
        top: '50%', height: '0.5px',
        background: 'rgba(242,232,223,0.04)',
        pointerEvents: 'none',
      }} />

      {/* Main text */}
      <div style={{
        textAlign: 'center', padding: '0 64px',
        maxWidth: '900px', position: 'relative', zIndex: 1,
        width: '100%',
      }}>
        {/* Line number */}
        <div style={{
          fontSize: '10px', letterSpacing: '4px',
          textTransform: 'uppercase',
          color: 'rgba(242,232,223,0.12)',
          marginBottom: '32px',
          fontFamily: "'Inter', sans-serif",
        }}>
          {String(currentLine + 1).padStart(2, '0')} / {String(lines.length).padStart(2, '0')}
        </div>

        {/* Text */}
        <div style={{
          fontSize: fontSize[line.size],
          fontWeight: fontWeight[line.size],
          color: line.size === 'xl' ? '#7B1E2B'
            : line.size === 'lg' ? 'rgba(242,232,223,0.9)'
            : 'rgba(242,232,223,0.55)',
          letterSpacing: line.size === 'xl' ? '-2px' : line.size === 'lg' ? '-0.5px' : '0.5px',
          lineHeight: 1.3,
          fontFamily: "'Inter', sans-serif",
          minHeight: '80px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'font-size 0.3s, color 0.3s',
        }}>
          {displayText}
          <span style={{
            display: 'inline-block', width: '2px',
            height: line.size === 'xl' ? '48px' : line.size === 'lg' ? '32px' : '20px',
            background: '#7B1E2B', marginLeft: '4px',
            verticalAlign: 'middle',
            animation: 'blink 1s step-end infinite',
          }} />
        </div>

        {/* Speed indicator */}
        {speed > 1.5 && (
          <div style={{
            marginTop: '24px', fontSize: '10px',
            letterSpacing: '3px', textTransform: 'uppercase',
            color: 'rgba(123,30,43,0.6)',
            animation: 'fadeIn 0.3s ease',
          }}>
            {speed > 4 ? '⚡⚡ fast' : '⚡ faster'}
          </div>
        )}
      </div>

      {/* Author */}
      <div style={{
        position: 'absolute', bottom: '48px', left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '10px', letterSpacing: '3px',
        textTransform: 'uppercase',
        color: 'rgba(242,232,223,0.15)',
        fontFamily: "'Inter', sans-serif",
        whiteSpace: 'nowrap',
      }}>
        — TV Girl · Abiyya Hamdan Nurwandha
      </div>

      {/* Scroll hint */}
      <div style={{
        position: 'absolute', right: '40px', top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: '8px',
      }}>
        <div style={{
          width: '1px', height: '60px',
          background: 'linear-gradient(to bottom, transparent, rgba(123,30,43,0.4), transparent)',
          animation: 'scrollPulse 2s ease-in-out infinite',
        }} />
        <span style={{
          fontSize: '8px', letterSpacing: '3px',
          textTransform: 'uppercase',
          color: 'rgba(242,232,223,0.15)',
          writingMode: 'vertical-rl',
        }}>scroll</span>
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes scrollPulse {
          0%,100% { opacity:0.3; transform:scaleY(1); }
          50% { opacity:1; transform:scaleY(1.2); }
        }
        @media (max-width: 768px) {
          #lyrics { margin-left: 0 !important; }
        }
      `}</style>
    </section>
  )
})

LyricsSection.displayName = 'LyricsSection'
export default LyricsSection