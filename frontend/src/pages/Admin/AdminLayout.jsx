import {
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";

import { useTheme } from "../../context/ThemeContext";

function AdminLayout() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const links = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: "🏠",
    },
    {
      name: "User Management",
      path: "/admin/users",
      icon: "👥",
    },
    {
      name: "Students",
      path: "/admin/students",
      icon: "🎓",
    },
    {
      name: "Recruiters",
      path: "/admin/recruiters",
      icon: "🏢",
    },
    {
      name: "Placement Officers",
      path: "/admin/officers",
      icon: "👨‍💼",
    },
    {
      name: "Academic Verification",
      path: "/admin/academic-verification",
      icon: "📚",
    },
    {
      name: "Job Verification",
      path: "/admin/job-verification",
      icon: "💼",
    },
    {
      name: "Notifications",
      path: "/admin/notifications",
      icon: "🔔",
    },
    {
      name: "Audit Logs",
      path: "/admin/logs",
      icon: "📜",
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: "⚙️",
    },
  ];

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white transition-colors duration-300">

      {/* SIDEBAR */}

      <aside className="hidden lg:flex w-72 shrink-0 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">

        {/* BRAND */}

        <div className="px-6 py-6 border-b border-slate-200 dark:border-slate-800">

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xl shadow-lg shadow-blue-500/20">
              🎓
            </div>

            <div>
              <h1 className="text-lg font-bold">
                Campus Portal
              </h1>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Administration
              </p>
            </div>

          </div>

        </div>

        {/* NAVIGATION */}

        <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-1">

          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/admin"}
              className={({ isActive }) =>
                [
                  "group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-950 dark:hover:text-white",
                ].join(" ")
              }
            >

              <span className="text-lg w-6 text-center">
                {link.icon}
              </span>

              <span className="text-sm font-medium">
                {link.name}
              </span>

            </NavLink>
          ))}

        </nav>

        {/* USER */}

        <div className="p-4 border-t border-slate-200 dark:border-slate-800">

          <div className="flex items-center gap-3 px-3 py-3 mb-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">

            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold">
              {user.name
                ?.charAt(0)
                ?.toUpperCase() || "A"}
            </div>

            <div className="min-w-0">

              <p className="text-sm font-semibold truncate">
                {user.name || "Administrator"}
              </p>

              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                {user.email || "admin@campus.com"}
              </p>

            </div>

          </div>

          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition"
          >
            🚪
            <span className="text-sm font-semibold">
              Logout
            </span>
          </button>

        </div>

      </aside>

      {/* MAIN */}

      <main className="flex-1 min-w-0">

        {/* HEADER */}

        <header className="sticky top-0 z-30 h-16 border-b border-slate-200 bg-white/90 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/90">

          <div className="h-full px-4 md:px-8 flex items-center justify-between">

            <div>

              <h2 className="font-bold">
                Administration
              </h2>

              <p className="hidden sm:block text-xs text-slate-500 dark:text-slate-400">
                Campus Placement Management System
              </p>

            </div>

            <div className="flex items-center gap-3">

              {/* THEME */}

              <button
                onClick={toggleTheme}
                title="Toggle theme"
                className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
              >
                {theme === "dark"
                  ? "☀️"
                  : "🌙"}
              </button>

              {/* USER */}

              <div className="hidden sm:flex items-center gap-2">

                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                  {user.name
                    ?.charAt(0)
                    ?.toUpperCase() || "A"}
                </div>

                <span className="text-sm font-medium">
                  {user.name || "Admin"}
                </span>

              </div>

            </div>

          </div>

        </header>

        {/* PAGE */}

        <section className="p-4 md:p-8 max-w-[1600px] mx-auto">
          <Outlet />
        </section>

      </main>

    </div>
  );
}

export default AdminLayout;