import { useState, useEffect, useRef } from 'react'
import LoadingScreen from '../components/LoadingScreen'
import DataLoader from '../components/DataLoader'
import CustomCursor from '../components/CustomCursor'
import Sidebar from '../components/Sidebar'
import Hero from '../components/sections/Hero'
import LyricsSection from '../components/sections/LyricsSection'
import About from '../components/sections/About'
import Skills from '../components/sections/Skills'
import Projects from '../components/sections/Projects'
import Experience from '../components/sections/Experience'
import Education from '../components/sections/Education'
import Certificates from '../components/sections/Certificates'
import Testimonials from '../components/sections/Testimonials'
import FunFacts from '../components/sections/FunFacts'
import Blog from '../components/sections/Blog'
import Contact from '../components/sections/Contact'
import api from '../services/api'
import { startKeepAlive } from '../utils/keepAlive'

function Home() {
  const [introLoading, setIntroLoading] = useState(true)
  const [dataLoading, setDataLoading] = useState(true)
  const [isDark, setIsDark] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [data, setData] = useState({
    projects: [], skills: [], experiences: [],
    certificates: [], testimonials: [], blogs: [], educations: [],
  })

  const refs = {
    hero: useRef(null),
    about: useRef(null),
    skills: useRef(null),
    projects: useRef(null),
    experience: useRef(null),
    education: useRef(null),
    certificates: useRef(null),
    testimonials: useRef(null),
    funfacts: useRef(null),
    blog: useRef(null),
    contact: useRef(null),
    lyrics: useRef(null),
  }

  const t = {
    bg: isDark ? '#0D0D0D' : '#F2E8DF',
    bg2: isDark ? '#111827' : '#EDE0D8',
    border: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(13,13,13,0.08)',
    border2: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(13,13,13,0.18)',
    text: isDark ? '#F0EDE8' : '#0D0D0D',
    textMuted: isDark ? 'rgba(240,237,232,0.6)' : 'rgba(13,13,13,0.6)',
    textFaint: isDark ? 'rgba(240,237,232,0.3)' : 'rgba(13,13,13,0.3)',
    accent: '#7B1E2B',
    accentSoft: 'rgba(123,30,43,0.12)',
    pink: isDark ? '#D8A7B1' : '#5A3E36',
    pinkSoft: isDark ? 'rgba(216,167,177,0.1)' : 'rgba(90,62,54,0.08)',
    navy: '#1F2A44',
    navySoft: 'rgba(31,42,68,0.12)',
    cream: '#F2E8DF',
    grid: isDark ? 'rgba(31,42,68,0.25)' : 'rgba(196,122,138,0.15)',
  }

  useEffect(() => {
    if (sessionStorage.getItem('portfolioVisited')) {
      setIntroLoading(false)
    }
    sessionStorage.setItem('portfolioVisited', 'true')

    startKeepAlive()
    Promise.all([
      api.get('/projects'),
      api.get('/skills'),
      api.get('/experiences'),
      api.get('/certificates'),
      api.get('/testimonials'),
      api.get('/blogs'),
      api.get('/educations'),
    ]).then(([p, s, e, c, t2, b, edu]) => {
      setData({
        projects: p.data,
        skills: s.data,
        experiences: e.data,
        certificates: c.data,
        testimonials: t2.data,
        blogs: b.data,
        educations: edu.data,
      })
      setDataLoading(false)
    }).catch(() => setDataLoading(false))
  }, [])

  useEffect(() => {
    if (introLoading || dataLoading) return
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) setActiveSection(e.target.id)
      }),
      { threshold: 0.35 }
    )
    Object.values(refs).forEach(r => {
      if (r.current) observer.observe(r.current)
    })
    return () => observer.disconnect()
  }, [introLoading, dataLoading])

  const navigateTo = (id) =>
    refs[id]?.current?.scrollIntoView({ behavior: 'smooth' })

  if (introLoading) return <LoadingScreen onComplete={() => setIntroLoading(false)} />
  if (dataLoading) return <DataLoader isDark={isDark} />

  return (
    <div style={{
      background: t.bg, color: t.text,
      transition: 'background 0.4s, color 0.4s',
      cursor: 'none', fontFamily: "'Inter', sans-serif",
    }}>
      <CustomCursor isDark={isDark} />

      <div style={{
        position: 'fixed', top: 0, left: 0,
        width: '100vw', height: '100vh',
        zIndex: 0, pointerEvents: 'none',
        backgroundImage: `linear-gradient(${t.grid} 1px, transparent 1px), linear-gradient(90deg, ${t.grid} 1px, transparent 1px)`,
        backgroundSize: '48px 48px',
      }} />

      <Sidebar
        activeSection={activeSection}
        onNavigate={navigateTo}
        isDark={isDark}
        onToggleMode={() => setIsDark(!isDark)}
      />

      <main style={{
        marginLeft: '52px', position: 'relative',
        zIndex: 1, minHeight: '100vh',
      }} id="main-content">
        <Hero ref={refs.hero} t={t} data={data} navigateTo={navigateTo} />
        <LyricsSection ref={refs.lyrics} t={t} />
        <About ref={refs.about} t={t} />
        <Skills ref={refs.skills} t={t} data={data} activeSection={activeSection} />
        <Projects ref={refs.projects} t={t} data={data} />
        <Experience ref={refs.experience} t={t} data={data} />
        <Education ref={refs.education} t={t} data={data} />
        <Certificates ref={refs.certificates} t={t} data={data} />
        <Testimonials ref={refs.testimonials} t={t} data={data} />
        <FunFacts ref={refs.funfacts} t={t} />
        <Blog ref={refs.blog} t={t} data={data} />
        <Contact ref={refs.contact} t={t} />
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        * { cursor: none !important; box-sizing: border-box; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #7B1E2B; border-radius: 2px; }
        @media (max-width: 768px) {
          #main-content { margin-left: 0 !important; padding-top: 53px; }
          * { cursor: auto !important; }
        }
      `}</style>
    </div>
  )
}

export default Home