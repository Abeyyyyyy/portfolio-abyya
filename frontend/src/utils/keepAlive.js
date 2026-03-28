const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

export function startKeepAlive() {
  const ping = () => {
    fetch(`${API_URL}/projects`, { method: 'GET' })
      .catch(() => {})
  }
  ping()
  setInterval(ping, 4 * 60 * 1000)
}