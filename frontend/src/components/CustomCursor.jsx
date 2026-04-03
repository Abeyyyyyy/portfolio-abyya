import { useEffect, useState } from 'react'

function CustomCursor({ isDark }) {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [trail, setTrail] = useState({ x: 0, y: 0 })
  const [clicked, setClicked] = useState(false)
  const [hovered, setHovered] = useState(false)

  const dotColor = isDark ? '#F2E8DF' : '#7B1E2B'
  const ringColor = isDark ? 'rgba(242,232,223,0.5)' : 'rgba(123,30,43,0.5)'

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY })
    const down = () => setClicked(true)
    const up = () => setClicked(false)
    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
    }
  }, [])

  useEffect(() => {
    const links = document.querySelectorAll('a, button, [data-hover]')
    const enter = () => setHovered(true)
    const leave = () => setHovered(false)
    links.forEach(el => {
      el.addEventListener('mouseenter', enter)
      el.addEventListener('mouseleave', leave)
    })
    return () => {
      links.forEach(el => {
        el.removeEventListener('mouseenter', enter)
        el.removeEventListener('mouseleave', leave)
      })
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
      <div style={{
        position: 'fixed',
        left: pos.x - 4, top: pos.y - 4,
        width: '8px', height: '8px',
        borderRadius: '50%',
        background: dotColor,
        pointerEvents: 'none', zIndex: 99999,
        transform: clicked ? 'scale(0.5)' : 'scale(1)',
        transition: 'transform 0.1s, background 0.3s',
      }} />
      <div style={{
        position: 'fixed',
        left: trail.x - (hovered ? 24 : 16),
        top: trail.y - (hovered ? 24 : 16),
        width: hovered ? '48px' : '32px',
        height: hovered ? '48px' : '32px',
        borderRadius: '50%',
        border: `1px solid ${ringColor}`,
        pointerEvents: 'none', zIndex: 99998,
        transition: 'width 0.3s, height 0.3s, border-color 0.3s',
      }} />
    </>
  )
}

export default CustomCursor