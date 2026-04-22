import { useEffect, useState } from 'react'
import api from '../../services/api'

function AdminCvDownloads({ t }) {
  const [downloads, setDownloads] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchDownloads() }, [])

  const fetchDownloads = async () => {
    setLoading(true)
    try {
      const res = await api.get('/cv-downloads')
      setDownloads(res.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Hapus log ini?')) return
    await api.delete(`/cv-downloads/${id}`)
    fetchDownloads()
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: t.textFaint }}>
          {downloads.length} CV Download Logs
        </div>
      </div>

      {loading ? (
        <div style={{ color: t.textFaint, fontSize: '12px' }}>Loading...</div>
      ) : downloads.length === 0 ? (
        <div style={{ color: t.textFaint, fontSize: '12px', textAlign: 'center', padding: '40px 0' }}>Belum ada yang mendownload CV. 📄</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {downloads.map(log => (
            <div key={log.id} style={{
              background: t.bg2,
              border: `0.5px solid ${t.border}`,
              borderLeft: `2px solid ${t.accent}`,
              borderRadius: '10px', padding: '16px 18px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '500', color: t.text }}>{log.name}</div>
                  <div style={{ fontSize: '11px', color: t.textFaint }}>{log.email}</div>
                </div>
                <div style={{ fontSize: '10px', color: t.textFaint }}>
                  {new Date(log.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>
                <div>
                  <div style={{ fontSize: '9px', textTransform: 'uppercase', color: t.textFaint, marginBottom: '2px' }}>Status</div>
                  <div style={{ fontSize: '11px', color: t.textMuted }}>{log.status}</div>
                </div>
                <div>
                  <div style={{ fontSize: '9px', textTransform: 'uppercase', color: t.textFaint, marginBottom: '2px' }}>Company</div>
                  <div style={{ fontSize: '11px', color: t.textMuted }}>{log.company || '-'}</div>
                </div>
              </div>

              <div>
                <div style={{ fontSize: '9px', textTransform: 'uppercase', color: t.textFaint, marginBottom: '2px' }}>Reason</div>
                <div style={{ fontSize: '11px', color: t.textFaint, lineHeight: '1.7', background: t.bg, padding: '8px', borderRadius: '6px' }}>
                  {log.reason}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '6px', marginTop: '12px' }}>
                <button onClick={() => handleDelete(log.id)} style={{ background: 'rgba(123,30,43,0.1)', border: '0.5px solid #7B1E2B', color: '#7B1E2B', borderRadius: '6px', padding: '5px 12px', fontSize: '9px', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer' }}>
                  Hapus Log
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminCvDownloads
