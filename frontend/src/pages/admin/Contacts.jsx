import { useEffect, useState } from 'react'
import api from '../../services/api'

function AdminContacts({ t }) {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchContacts() }, [])

  const fetchContacts = async () => {
    setLoading(true)
    const res = await api.get('/contacts')
    setContacts(res.data)
    setLoading(false)
  }

  const handleRead = async (id) => {
    await api.patch(`/contacts/${id}/read`)
    fetchContacts()
  }

  const handleDelete = async (id) => {
    if (!confirm('Hapus pesan ini?')) return
    await api.delete(`/contacts/${id}`)
    fetchContacts()
  }

  const unread = contacts.filter(c => !c.is_read).length

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: t.textFaint }}>
          {contacts.length} Pesan
          {unread > 0 && (
            <span style={{ marginLeft: '8px', background: t.accent, color: '#F5E9E2', fontSize: '8px', padding: '2px 8px', borderRadius: '20px' }}>
              {unread} belum dibaca
            </span>
          )}
        </div>
      </div>

      {loading ? (
        <div style={{ color: t.textFaint, fontSize: '12px' }}>Loading...</div>
      ) : contacts.length === 0 ? (
        <div style={{ color: t.textFaint, fontSize: '12px', textAlign: 'center', padding: '40px 0' }}>Belum ada pesan masuk. 📭</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {contacts.map(contact => (
            <div key={contact.id} style={{
              background: t.bg2,
              border: `0.5px solid ${contact.is_read ? t.border : t.accent}`,
              borderLeft: `2px solid ${contact.is_read ? t.border2 : t.accent}`,
              borderRadius: '10px', padding: '16px 18px',
              opacity: contact.is_read ? 0.7 : 1,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                    <div style={{ fontSize: '13px', fontWeight: '500', color: t.text }}>{contact.name}</div>
                    {!contact.is_read && (
                      <span style={{ fontSize: '8px', padding: '2px 8px', borderRadius: '20px', background: t.accentSoft, border: `0.5px solid ${t.accent}`, color: t.accent }}>Baru</span>
                    )}
                  </div>
                  <div style={{ fontSize: '11px', color: t.textFaint }}>{contact.email}</div>
                </div>
                <div style={{ fontSize: '10px', color: t.textFaint }}>
                  {new Date(contact.created_at).toLocaleDateString('id-ID')}
                </div>
              </div>
              <div style={{ fontSize: '12px', fontWeight: '500', color: t.textMuted, marginBottom: '6px' }}>{contact.subject}</div>
              <div style={{ fontSize: '11px', color: t.textFaint, lineHeight: '1.7', marginBottom: '12px' }}>{contact.message}</div>
              <div style={{ display: 'flex', gap: '6px' }}>
                {!contact.is_read && (
                  <button onClick={() => handleRead(contact.id)} style={{ background: t.accentSoft, border: `0.5px solid ${t.accent}`, color: t.accent, borderRadius: '6px', padding: '5px 12px', fontSize: '9px', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer' }}>
                    Tandai Dibaca
                  </button>
                )}
                <button onClick={() => handleDelete(contact.id)} style={{ background: 'rgba(123,30,43,0.1)', border: '0.5px solid #7B1E2B', color: '#7B1E2B', borderRadius: '6px', padding: '5px 12px', fontSize: '9px', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer' }}>
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminContacts