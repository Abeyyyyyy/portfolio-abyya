import { useEffect, useState } from 'react'

function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState('loading')

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setPhase('exit'), 200)
          setTimeout(() => onComplete(), 800)
          return 100
        }
        return prev + Math.random() * 12
      })
    }, 80)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#F5E9E2',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      transition: phase === 'exit' ? 'opacity 0.6s, transform 0.6s' : 'none',
      opacity: phase === 'exit' ? 0 : 1,
      transform: phase === 'exit' ? 'translateY(-20px)' : 'translateY(0)',
      pointerEvents: phase === 'exit' ? 'none' : 'all',
    }}>
      {/* Noise texture */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.04,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundSize: '200px 200px',
      }}></div>

      <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        {/* Name */}
        <div style={{
          fontSize: '11px', letterSpacing: '6px',
          textTransform: 'uppercase', color: '#BFB7B2',
          marginBottom: '24px',
          animation: 'fadeIn 0.6s ease forwards',
        }}>
          Portfolio
        </div>

        <div style={{
          fontSize: '42px', fontWeight: '600',
          color: '#0D0D0D', lineHeight: 1.1,
          marginBottom: '8px', letterSpacing: '-1px',
          animation: 'fadeIn 0.8s ease forwards',
        }}>
          Abiyya
        </div>
        <div style={{
          fontSize: '42px', fontWeight: '300',
          color: '#7B1E2B', lineHeight: 1.1,
          marginBottom: '48px', letterSpacing: '-1px',
          animation: 'fadeIn 1s ease forwards',
        }}>
          Hamdan
        </div>

        {/* Progress */}
        <div style={{ width: '200px', margin: '0 auto' }}>
          <div style={{
            height: '0.5px', background: '#BFB7B2',
            borderRadius: '1px', overflow: 'hidden',
            marginBottom: '12px',
          }}>
            <div style={{
              height: '100%',
              width: `${Math.min(progress, 100)}%`,
              background: '#7B1E2B',
              transition: 'width 0.1s ease',
            }}></div>
          </div>
          <div style={{
            fontSize: '10px', letterSpacing: '2px',
            color: '#BFB7B2', textAlign: 'right',
          }}>
            {Math.min(Math.round(progress), 100)}%
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

export default LoadingScreen