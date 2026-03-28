import { useEffect, useState } from 'react'

function DataLoader({ isDark }) {
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState('Menghubungkan ke server...')

  const t = {
    bg: isDark ? '#0D0D0D' : '#F2E8DF',
    bg2: isDark ? '#111827' : '#EDE0D8',
    border: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(13,13,13,0.08)',
    text: isDark ? '#F0EDE8' : '#0D0D0D',
    textFaint: isDark ? 'rgba(240,237,232,0.3)' : 'rgba(13,13,13,0.3)',
    accent: '#7B1E2B',
  }

  const messages = [
    'Menghubungkan ke server...',
    'Memuat data portfolio...',
    'Menyiapkan tampilan...',
    'Hampir selesai...',
  ]

  useEffect(() => {
    let p = 0
    const interval = setInterval(() => {
      p += Math.random() * 8
      if (p > 90) p = 90
      setProgress(Math.round(p))
      if (p < 25) setMessage(messages[0])
      else if (p < 50) setMessage(messages[1])
      else if (p < 75) setMessage(messages[2])
      else setMessage(messages[3])
    }, 300)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: t.bg,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: '32px',
    }}>
      {/* Logo */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '10px', letterSpacing: '6px', textTransform: 'uppercase', color: t.textFaint, marginBottom: '16px' }}>
          Portfolio
        </div>
        <div style={{ fontSize: '48px', fontWeight: '700', color: t.text, letterSpacing: '-2px', lineHeight: 1 }}>
          Abiyya
        </div>
        <div style={{ fontSize: '48px', fontWeight: '700', color: t.accent, letterSpacing: '-2px', lineHeight: 1 }}>
          Hamdan
        </div>
      </div>

      {/* Spinner */}
      <div style={{ position: 'relative', width: '48px', height: '48px' }}>
        <div style={{
          width: '48px', height: '48px', borderRadius: '50%',
          border: `2px solid ${t.border}`,
          borderTop: `2px solid ${t.accent}`,
          animation: 'spin 0.8s linear infinite',
        }} />
      </div>

      {/* Progress */}
      <div style={{ width: '240px', textAlign: 'center' }}>
        <div style={{ height: '2px', background: t.border, borderRadius: '1px', overflow: 'hidden', marginBottom: '12px' }}>
          <div style={{
            height: '100%', borderRadius: '1px',
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${t.accent}, #c47a8a)`,
            transition: 'width 0.3s ease',
          }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '10px', color: t.textFaint, letterSpacing: '0.5px' }}>{message}</span>
          <span style={{ fontSize: '10px', color: t.accent, fontWeight: '600' }}>{progress}%</span>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}

export default DataLoader