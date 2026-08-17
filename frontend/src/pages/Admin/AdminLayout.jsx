import { NavLink, Outlet, useNavigate } from "react-router-dom";

function AdminLayout() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const links = [
    { name: "Dashboard", path: "/admin", icon: "🏠" },
    { name: "User Management", path: "/admin/users", icon: "👥" },
    { name: "Students", path: "/admin/students", icon: "🎓" },
    { name: "Recruiters", path: "/admin/recruiters", icon: "🏢" },
    { name: "Placement Officers", path: "/admin/officers", icon: "👨‍💼" },
    { name: "System Settings", path: "/admin/settings", icon: "⚙️" },
    { name: "Audit Logs", path: "/admin/logs", icon: "📜" },
    { name: "Notifications", path: "/admin/notifications", icon: "🔔" },
  ];

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">

      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">

        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold text-blue-400">
            Campus Portal
          </h1>

          <p className="text-xs text-slate-500 mt-1">
            Administration
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">

          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <span>{link.icon}</span>
              <span>{link.name}</span>
            </NavLink>
          ))}

        </nav>

        <div className="p-4 border-t border-slate-800">

          <div className="px-4 py-3 mb-3">
            <p className="text-sm font-medium">
              {user.name || "Administrator"}
            </p>

            <p className="text-xs text-slate-500 truncate">
              {user.email}
            </p>
          </div>

          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10"
          >
            🚪
            <span>Logout</span>
          </button>

        </div>

      </aside>

      <main className="flex-1">

        <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-8">
          <h2 className="font-semibold">
            Administration
          </h2>

          <span className="text-sm text-slate-400">
            Welcome, {user.name || "Admin"}
          </span>
        </header>

        <section className="p-8">
          <Outlet />
        </section>

      </main>

    </div>
  );
}

export default AdminLayout;