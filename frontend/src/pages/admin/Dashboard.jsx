import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import AdminProjects from "./Projects";
import AdminSkills from "./Skills";
import AdminExperiences from "./Experiences";
import AdminEducations from "./Educations";
import AdminCertificates from "./Certificates";
import AdminContacts from "./Contacts";
import AdminTestimonials from './Testimonials'
import AdminBlogs from './Blogs'
import AdminCvDownloads from './CvDownloads'

function AdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [stats, setStats] = useState({ projects: 0, skills: 0, contacts: 0 });

  useEffect(() => {
    Promise.all([
      api.get("/projects"),
      api.get("/skills"),
      api.get("/contacts"),
    ]).then(([projects, skills, contacts]) => {
      setStats({
        projects: projects.data.length,
        skills: skills.data.length,
        contacts: contacts.data.length,
      });
    });
  }, []);

  useEffect(() => {
    api
      .get("/me")
      .then((res) => setUser(res.data))
      .catch(() => navigate("/admin/login"));
  }, []);

  const handleLogout = async () => {
    await api.post("/logout");
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  const theme = {
    dark: {
      bg: "#0D0D0D",
      bg2: "#1F2A44",
      bg3: "#5A3E36",
      border: "rgba(245,233,226,0.07)",
      border2: "rgba(245,233,226,0.14)",
      text: "#F5E9E2",
      textMuted: "rgba(245,233,226,0.45)",
      textFaint: "rgba(245,233,226,0.2)",
      accent: "#7B1E2B",
      accentSoft: "rgba(123,30,43,0.15)",
      pink: "#D8A7B1",
      pinkSoft: "rgba(216,167,177,0.12)",
      gray: "#BFB7B2",
    },
    light: {
      bg: "#F5E9E2",
      bg2: "#EDE0D8",
      bg3: "#E5D5CB",
      border: "rgba(13,13,13,0.08)",
      border2: "rgba(13,13,13,0.15)",
      text: "#0D0D0D",
      textMuted: "rgba(13,13,13,0.5)",
      textFaint: "rgba(13,13,13,0.25)",
      accent: "#7B1E2B",
      accentSoft: "rgba(123,30,43,0.1)",
      pink: "#5A3E36",
      pinkSoft: "rgba(90,62,54,0.08)",
      gray: "#BFB7B2",
    },
  };

  const t = isDark ? theme.dark : theme.light;

  const menus = [
    { id: 'dashboard', label: 'Dashboard', icon: '⊞' },
    { id: 'projects', label: 'Projects', icon: '◈' },
    { id: 'skills', label: 'Skills', icon: '◉' },
    { id: 'experiences', label: 'Experience', icon: '◎' },
    { id: 'educations', label: 'Education', icon: '◍' },
    { id: 'certificates', label: 'Certificates', icon: '◌' },
    { id: 'testimonials', label: 'Testimonials', icon: '◯' },
    { id: 'blogs', label: 'Blog', icon: '✦' },
    { id: 'contacts', label: 'Messages', icon: '◈' },
    { id: 'cv_downloads', label: 'CV Logs', icon: '📄' },
  ]

  const s = {
    wrap: {
      minHeight: "100vh",
      background: t.bg,
      display: "flex",
      fontFamily: "sans-serif",
      transition: "background 0.4s",
    },
    sidebar: {
      width: sidebarOpen ? "192px" : "56px",
      background: t.bg2,
      borderRight: `0.5px solid ${t.border}`,
      display: "flex",
      flexDirection: "column",
      flexShrink: 0,
      transition: "width 0.3s cubic-bezier(0.4,0,0.2,1)",
      overflow: "hidden",
    },
    toggleBtn: {
      width: "32px",
      height: "32px",
      margin: "20px auto 0",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "4px",
      border: `0.5px solid ${t.border2}`,
      borderRadius: "8px",
      background: "transparent",
      cursor: "pointer",
      flexShrink: 0,
    },
    hbar: {
      width: "13px",
      height: "1px",
      background: t.textMuted,
      borderRadius: "1px",
    },
    logo: {
      textAlign: "center",
      margin: "16px 12px 20px",
      fontSize: "11px",
      letterSpacing: "2.5px",
      color: t.textMuted,
      whiteSpace: "nowrap",
      overflow: "hidden",
    },
    divider: { height: "0.5px", background: t.border, margin: "0 12px 16px" },
    nav: {
      display: "flex",
      flexDirection: "column",
      gap: "2px",
      padding: "0 8px",
      flex: 1,
    },
    menuItem: (active) => ({
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: "9px 10px",
      borderRadius: "8px",
      cursor: "pointer",
      border: "none",
      textAlign: "left",
      background: active ? t.accentSoft : "transparent",
      color: active ? t.accent : t.textFaint,
      transition: "all 0.2s",
      whiteSpace: "nowrap",
      overflow: "hidden",
    }),
    menuIcon: { fontSize: "14px", flexShrink: 0 },
    menuLabel: {
      fontSize: "10px",
      letterSpacing: "1.2px",
      textTransform: "uppercase",
    },
    bottomSection: {
      padding: "8px",
      borderTop: `0.5px solid ${t.border}`,
      marginTop: "8px",
    },
    avatarRow: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "8px 10px",
      overflow: "hidden",
    },
    avatarCircle: {
      width: "26px",
      height: "26px",
      borderRadius: "50%",
      background: t.pinkSoft,
      border: `0.5px solid ${t.pink}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "9px",
      fontWeight: "500",
      color: t.pink,
      flexShrink: 0,
    },
    main: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    },
    topbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 24px",
      borderBottom: `0.5px solid ${t.border}`,
    },
    modeBtn: {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      background: t.bg2,
      border: `0.5px solid ${t.border2}`,
      borderRadius: "20px",
      padding: "5px 12px",
      cursor: "pointer",
      fontSize: "10px",
      color: t.textMuted,
      letterSpacing: "1px",
      textTransform: "uppercase",
    },
    content: { flex: 1, padding: "24px", overflowY: "auto" },
    statCard: {
      background: t.bg2,
      border: `0.5px solid ${t.border}`,
      borderRadius: "10px",
      padding: "20px",
      transition: "background 0.4s",
    },
  };

  return (
    <div style={s.wrap}>
      {/* SIDEBAR */}
      <aside style={s.sidebar}>
        <button
          style={s.toggleBtn}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <span style={s.hbar}></span>
          <span style={s.hbar}></span>
          <span style={s.hbar}></span>
        </button>

        <div style={s.logo}>{sidebarOpen ? "ABIYYA · HN" : "AHN"}</div>

        <div style={s.divider}></div>

        <nav style={s.nav}>
          {menus.map((menu) => (
            <button
              key={menu.id}
              style={s.menuItem(activeMenu === menu.id)}
              onClick={() => setActiveMenu(menu.id)}
            >
              <span style={s.menuIcon}>{menu.icon}</span>
              {sidebarOpen && <span style={s.menuLabel}>{menu.label}</span>}
            </button>
          ))}
        </nav>

        <div style={s.bottomSection}>
          {sidebarOpen && (
            <div style={s.avatarRow}>
              <div style={s.avatarCircle}>AH</div>
              <div style={{ overflow: "hidden" }}>
                <div
                  style={{
                    fontSize: "10px",
                    fontWeight: "500",
                    color: t.text,
                    whiteSpace: "nowrap",
                  }}
                >
                  Abiyya HN
                </div>
                <div
                  style={{
                    fontSize: "9px",
                    color: t.textFaint,
                    whiteSpace: "nowrap",
                  }}
                >
                  RPL · SMKN 4
                </div>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            style={{
              ...s.menuItem(false),
              color: "#7B1E2B",
              width: "100%",
              marginTop: "4px",
            }}
          >
            <span style={s.menuIcon}>⊗</span>
            {sidebarOpen && <span style={s.menuLabel}>Logout</span>}
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main style={s.main}>
        {/* TOPBAR */}
        <div style={s.topbar}>
          <div
            style={{
              fontSize: "10px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: t.textMuted,
            }}
          >
            {activeMenu}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ fontSize: "11px", color: t.textFaint }}>
              {user?.name}
            </div>
            <button style={s.modeBtn} onClick={() => setIsDark(!isDark)}>
              {isDark ? "☀ Light" : "☾ Dark"}
            </button>
          </div>
        </div>

        {/* CONTENT */}
        <div style={s.content}>
          {activeMenu === "dashboard" && (
            <div>
              <div
                style={{
                  fontSize: "13px",
                  color: t.textMuted,
                  marginBottom: "24px",
                }}
              >
                Selamat datang,{" "}
                <span style={{ color: t.accent, fontWeight: "500" }}>
                  {user?.name}
                </span>{" "}
                👋
              </div>

              {/* STATS */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "12px",
                  marginBottom: "24px",
                }}
              >
                {[
                  { label: "Projects", color: t.accent, value: stats.projects },
                  { label: "Skills", color: t.pink, value: stats.skills },
                  { label: "Messages", color: t.accent, value: stats.contacts },
                ].map((stat, i) => (
                  <div key={i} style={s.statCard}>
                    <div
                      style={{
                        fontSize: "24px",
                        fontWeight: "500",
                        color: stat.color,
                        marginBottom: "4px",
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      style={{
                        fontSize: "9px",
                        letterSpacing: "1.5px",
                        textTransform: "uppercase",
                        color: t.textFaint,
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* QUICK ACCESS */}
              <div
                style={{
                  fontSize: "9px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: t.textFaint,
                  marginBottom: "12px",
                }}
              >
                Quick Access
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "8px",
                }}
              >
                {menus.slice(1).map((menu) => (
                  <button
                    key={menu.id}
                    onClick={() => setActiveMenu(menu.id)}
                    style={{
                      background: t.bg2,
                      border: `0.5px solid ${t.border}`,
                      borderRadius: "10px",
                      padding: "14px 16px",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      cursor: "pointer",
                      transition: "border-color 0.2s",
                      textAlign: "left",
                    }}
                  >
                    <span style={{ fontSize: "16px" }}>{menu.icon}</span>
                    <span
                      style={{
                        fontSize: "11px",
                        color: t.textMuted,
                        letterSpacing: "0.5px",
                      }}
                    >
                      {menu.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeMenu === "projects" && <AdminProjects t={t} />}
          {activeMenu === "skills" && <AdminSkills t={t} />}
          {activeMenu === "experiences" && <AdminExperiences t={t} />}
          {activeMenu === "educations" && <AdminEducations t={t} />}
          {activeMenu === "certificates" && <AdminCertificates t={t} />}
          {activeMenu === "contacts" && <AdminContacts t={t} />}
          {activeMenu === 'testimonials' && <AdminTestimonials t={t} />}
          {activeMenu === 'blogs' && <AdminBlogs t={t} />}
          {activeMenu === 'cv_downloads' && <AdminCvDownloads t={t} />}

          {![
            "dashboard",
            "projects",
            "skills",
            "experiences",
            "educations",
            "certificates",
            "contacts",
            "cv_downloads",
          ].includes(activeMenu) && (
            <div style={{ color: t.textFaint, fontSize: "13px" }}>
              Halaman <span style={{ color: t.accent }}>{activeMenu}</span> —
              coming soon! 🚧
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
