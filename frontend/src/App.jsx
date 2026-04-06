import { Routes, Route } from 'react-router-dom'

// Public pages
import Home from './pages/Home'

// Admin pages
import AdminLogin from './pages/admin/Login'
import AdminDashboard from './pages/admin/Dashboard'
import BlogDetail from './pages/BlogDetail'

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />

      {/* Admin */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/blog/:id" element={<BlogDetail />} />
    </Routes>
  )
}

export default App