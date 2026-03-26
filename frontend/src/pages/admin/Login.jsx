import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'

function AdminLogin() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await api.post('/login', form)
      localStorage.setItem('token', res.data.token)
      navigate('/admin/dashboard')
    } catch (err) {
      setError('Email atau password salah!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0c0c0f] flex items-center justify-center">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-2xl font-semibold text-white tracking-widest mb-1">AHN</div>
          <div className="text-xs text-white/30 tracking-[3px] uppercase">Admin Panel</div>
        </div>

        {/* Card */}
        <div className="bg-[#13131a] border border-white/10 rounded-xl p-8">

          <div className="text-xs text-white/30 tracking-[2px] uppercase mb-6">
            Sign In
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-[10px] tracking-[1.5px] uppercase text-white/30 mb-2 block">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="hamdanabiyya@gmail.com"
                className="w-full bg-[#0c0c0f] border border-white/10 rounded-lg px-4 py-3 text-sm text-white/70 placeholder-white/20 focus:outline-none focus:border-[#3d6b9e] transition-colors"
                required
              />
            </div>

            <div>
              <label className="text-[10px] tracking-[1.5px] uppercase text-white/30 mb-2 block">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-[#0c0c0f] border border-white/10 rounded-lg px-4 py-3 text-sm text-white/70 placeholder-white/20 focus:outline-none focus:border-[#3d6b9e] transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#3d6b9e] hover:opacity-85 text-white text-xs font-medium tracking-[1.5px] uppercase py-3 rounded-lg transition-opacity mt-2 disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Sign In'}
            </button>
          </form>
        </div>

        <div className="text-center mt-6 text-[10px] text-white/20 tracking-[1px]">
          Portfolio · Abyya Hamdan Nurwandha
        </div>

      </div>
    </div>
  )
}

export default AdminLogin