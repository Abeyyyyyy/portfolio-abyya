import { useEffect, useState } from 'react'

function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [trail, setTrail] = useState({ x: 0, y: 0 })
  const [clicked, setClicked] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY })
    const down = () => setClicked(true)
    const up = () => setClicked(false)

    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)

    const links = document.querySelectorAll('a, button, [data-hover]')
    links.forEach(el => {
      el.addEventListener('mouseenter', () => setHovered(true))
      el.addEventListener('mouseleave', () => setHovered(false))
    })

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
    }
  }, [])

  useEffect(() => {
    let animId
    const animate = () => {
      setTrail(prev => ({
        x: prev.x + (pos.x - prev.x) * 0.12,
        y: prev.y + (pos.y - prev.y) * 0.12,
      }))
      animId = requestAnimationFrame(animate)
    }
    animId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animId)
  }, [pos])

  return (
    <>
      {/* Dot */}
      <div style={{
        position: 'fixed',
        left: pos.x - 4, top: pos.y - 4,
        width: '8px', height: '8px',
        borderRadius: '50%',
        background: '#7B1E2B',
        pointerEvents: 'none', zIndex: 99999,
        transition: 'transform 0.1s',
        transform: clicked ? 'scale(0.5)' : 'scale(1)',
        mixBlendMode: 'multiply',
      }}></div>

      {/* Ring */}
      <div style={{
        position: 'fixed',
        left: trail.x - (hovered ? 24 : 16),
        top: trail.y - (hovered ? 24 : 16),
        width: hovered ? '48px' : '32px',
        height: hovered ? '48px' : '32px',
        borderRadius: '50%',
        border: '0.5px solid #7B1E2B',
        pointerEvents: 'none', zIndex: 99998,
        transition: 'width 0.3s, height 0.3s, left 0.05s, top 0.05s',
        opacity: 0.5,
        mixBlendMode: 'multiply',
      }}></div>
    </>
  )
}

export default CustomCursor