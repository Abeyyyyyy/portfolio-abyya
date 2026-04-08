import { createContext, useContext, useState } from 'react'

const LanguageContext = createContext()

export const translations = {
  id: {
    eyebrow: 'Fresh Graduate · RPL · SMKN 4 Bandung',
    heroDesc: 'Membangun solusi digital yang bersih dan terstruktur menggunakan Laravel dan React.js. Aktif di komunitas ORBIT dan terus berkembang lewat proyek nyata.',
    viewWork: 'View Work', downloadCV: 'Download CV', contactMe: 'Contact Me',
    available: 'Tersedia untuk PKL', quote: '"Code is poetry, build it with heart."',
    home: 'Home', about: 'About', skills: 'Skills', projects: 'Projects',
    experience: 'Experience', education: 'Education', certificates: 'Certificates',
    testimonials: 'Testimonials', funfacts: 'Fun Facts', blog: 'Blog', contact: 'Contact',
    aboutLabel: 'About Me', aboutTitle: 'Passion di bidang', aboutTitleAccent: 'Web Development',
    aboutBio1: 'Siswa kelas XI RPL di SMKN 4 Bandung dengan minat kuat di bidang Fullstack Web Development. Berpengalaman membangun sistem berbasis CRUD, mengelola database MySQL, dan berkolaborasi dalam tim maupun mandiri.',
    aboutBio2: 'Aktif di komunitas teknologi ORBIT dan terus berkembang lewat proyek nyata. Memiliki latar belakang pendidikan keagamaan dari Pondok Pesantren Al-Ihsan yang membentuk karakter disiplin dan integritas.',
    nama: 'Nama', lokasi: 'Lokasi', email: 'Email', sekolah: 'Sekolah',
    jurusan: 'Jurusan', status: 'Status', statusVal: 'Fresh Graduate · Tersedia PKL',
    skillsLabel: 'Skills', skillsTitle: 'Tech', skillsTitleAccent: 'Stack',
    projectsLabel: 'Projects', projectsTitle: "What I've", projectsTitleAccent: 'Built',
    expLabel: 'Experience', expTitle: 'My', expTitleAccent: 'Journey',
    work: 'Work', org: 'Organization',
    contactLabel: 'Contact', contactTitle: 'Mari', contactTitleAccent: 'Terhubung!',
    contactDesc: 'Terbuka untuk kolaborasi, diskusi project, atau sekadar ngobrol soal tech!',
    sendMsg: 'Kirim Pesan', yourName: 'Nama kamu', yourEmail: 'email@kamu.com',
    subject: 'Tentang apa?', message: 'Hei Abiyya...', sending: 'Mengirim...',
    sent: 'Pesan Terkirim!', sentDesc: 'Terima kasih sudah menghubungi Abiyya',
  },
  en: {
    eyebrow: 'Fresh Graduate · Software Engineering · SMKN 4 Bandung',
    heroDesc: 'Building clean and structured digital solutions using Laravel and React.js. Active in the ORBIT tech community and continuously growing through real projects.',
    viewWork: 'View Work', downloadCV: 'Download CV', contactMe: 'Contact Me',
    available: 'Available for Internship', quote: '"Code is poetry, build it with heart."',
    home: 'Home', about: 'About', skills: 'Skills', projects: 'Projects',
    experience: 'Experience', education: 'Education', certificates: 'Certificates',
    testimonials: 'Testimonials', funfacts: 'Fun Facts', blog: 'Blog', contact: 'Contact',
    aboutLabel: 'About Me', aboutTitle: 'Passionate about', aboutTitleAccent: 'Web Development',
    aboutBio1: 'A grade XI Software Engineering student at SMKN 4 Bandung with a strong interest in Fullstack Web Development. Experienced in building CRUD-based systems, managing MySQL databases, and collaborating in teams.',
    aboutBio2: 'Active in the ORBIT tech community and continuously growing through real projects. Has a religious education background from Pondok Pesantren Al-Ihsan that shaped discipline and integrity.',
    nama: 'Name', lokasi: 'Location', email: 'Email', sekolah: 'School',
    jurusan: 'Major', status: 'Status', statusVal: 'Fresh Graduate · Available for Internship',
    skillsLabel: 'Skills', skillsTitle: 'Tech', skillsTitleAccent: 'Stack',
    projectsLabel: 'Projects', projectsTitle: "What I've", projectsTitleAccent: 'Built',
    expLabel: 'Experience', expTitle: 'My', expTitleAccent: 'Journey',
    work: 'Work', org: 'Organization',
    contactLabel: 'Contact', contactTitle: "Let's", contactTitleAccent: 'Connect!',
    contactDesc: 'Open for collaboration, project discussions, or just chatting about tech!',
    sendMsg: 'Send Message', yourName: 'Your name', yourEmail: 'email@you.com',
    subject: 'What is it about?', message: 'Hey Abiyya...', sending: 'Sending...',
    sent: 'Message Sent!', sentDesc: 'Thank you for reaching out to Abiyya',
  },
  zh: {
    eyebrow: 'Fresh Graduate · RPL · SMKN 4 Bandung',
    heroDesc: '使用 Laravel 和 React.js 构建简洁、结构化的数字解决方案。活跃于 ORBIT 技术社区，通过真实项目不断成长。',
    viewWork: '查看作品', downloadCV: '下载简历', contactMe: '联系我',
    available: '可参加实习', quote: '"代码是诗，用心创作。"',
    home: 'Home', about: 'About', skills: 'Skills', projects: 'Projects',
    experience: 'Experience', education: 'Education', certificates: 'Certificates',
    testimonials: 'Testimonials', funfacts: 'Fun Facts', blog: 'Blog', contact: 'Contact',
    aboutLabel: 'About Me', aboutTitle: 'Passionate about', aboutTitleAccent: 'Web Development',
    aboutBio1: 'A grade XI Software Engineering student at SMKN 4 Bandung with a strong interest in Fullstack Web Development.',
    aboutBio2: 'Active in the ORBIT tech community and continuously growing through real projects.',
    nama: 'Name', lokasi: 'Location', email: 'Email', sekolah: 'School',
    jurusan: 'Major', status: 'Status', statusVal: 'Fresh Graduate · Available for Internship',
    skillsLabel: 'Skills', skillsTitle: 'Tech', skillsTitleAccent: 'Stack',
    projectsLabel: 'Projects', projectsTitle: "What I've", projectsTitleAccent: 'Built',
    expLabel: 'Experience', expTitle: 'My', expTitleAccent: 'Journey',
    work: 'Work', org: 'Organization',
    contactLabel: 'Contact', contactTitle: "Let's", contactTitleAccent: 'Connect!',
    contactDesc: 'Open for collaboration, project discussions, or just chatting about tech!',
    sendMsg: 'Send Message', yourName: 'Your name', yourEmail: 'email@you.com',
    subject: 'What is it about?', message: 'Hey Abiyya...', sending: 'Sending...',
    sent: 'Message Sent!', sentDesc: 'Thank you for reaching out',
  }
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('id')
  const tr = translations[lang]
  return (
    <LanguageContext.Provider value={{ lang, setLang, tr }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  return useContext(LanguageContext)
}