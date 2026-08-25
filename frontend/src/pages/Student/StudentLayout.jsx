import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

function StudentLayout() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const toggleTheme = () => {
    const newTheme = !darkMode;

    setDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");

    document.documentElement.classList.toggle("dark", newTheme);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  const links = [
    {
      name: "Dashboard",
      path: "/student",
      icon: "⌂",
      end: true,
    },
    {
      name: "My Profile",
      path: "/student/profile",
      icon: "◉",
    },
    {
      name: "Resume",
      path: "/student/resume",
      icon: "▤",
    },
    {
      name: "Browse Jobs",
      path: "/student/jobs",
      icon: "▣",
    },
    {
      name: "Applications",
      path: "/student/applications",
      icon: "☷",
    },
    {
      name: "Interviews",
      path: "/student/interviews",
      icon: "◷",
    },
    {
      name: "Notifications",
      path: "/student/notifications",
      icon: "♢",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-[#080d1a] dark:text-slate-100">

      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-72 flex-col
          border-r border-slate-200 bg-white
          transition-transform duration-300
          dark:border-slate-800 dark:bg-[#0d1424]
          lg:translate-x-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >

        {/* BRAND */}
        <div className="flex h-20 items-center gap-3 border-b border-slate-200 px-6 dark:border-slate-800">

          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-xl font-bold text-white shadow-lg shadow-indigo-500/20">
            C
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-tight">
              Campus Portal
            </h1>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Student workspace
            </p>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 space-y-1.5 overflow-y-auto px-4 py-6">

          <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Workspace
          </p>

          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.end}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `
                group flex items-center gap-3 rounded-xl px-4 py-3
                text-sm font-medium transition-all duration-200
                ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700 shadow-sm dark:bg-indigo-500/15 dark:text-indigo-300"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/70 dark:hover:text-white"
                }
                `
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`
                      flex h-9 w-9 items-center justify-center rounded-lg
                      text-base transition
                      ${
                        isActive
                          ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                          : "bg-slate-100 text-slate-500 group-hover:bg-white dark:bg-slate-800 dark:text-slate-400"
                      }
                    `}
                  >
                    {link.icon}
                  </span>

                  <span>{link.name}</span>

                  {isActive && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                  )}
                </>
              )}
            </NavLink>
          ))}

          <p className="mb-3 mt-8 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Account
          </p>

          <NavLink
            to="/student/settings"
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `
              group flex items-center gap-3 rounded-xl px-4 py-3
              text-sm font-medium transition
              ${
                isActive
                  ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800/70"
              }
              `
            }
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800">
              ⚙
            </span>

            Settings
          </NavLink>
        </nav>

        {/* USER CARD */}
        <div className="border-t border-slate-200 p-4 dark:border-slate-800">

          <div className="mb-3 flex items-center gap-3 rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 font-semibold text-white">
              {(user.name || "S").charAt(0).toUpperCase()}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">
                {user.name || "Student"}
              </p>

              <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                {user.email || "student@campus.com"}
              </p>
            </div>
          </div>

          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
          >
            <span>↪</span>
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN AREA */}
      <div className="min-h-screen lg:pl-72">

        {/* HEADER */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200/80 bg-white/80 px-4 backdrop-blur-xl dark:border-slate-800 dark:bg-[#080d1a]/80 sm:px-6 lg:px-8">

          <div className="flex items-center gap-3">

            <button
              onClick={() => setMobileOpen(true)}
              className="rounded-xl border border-slate-200 p-2.5 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden"
            >
              ☰
            </button>

            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Student Portal
              </p>

              <h2 className="text-lg font-bold">
                My Workspace
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">

            {/* THEME */}
            <button
              onClick={toggleTheme}
              title="Toggle theme"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
            >
              {darkMode ? "☀" : "☾"}
            </button>

            {/* NOTIFICATION */}
            <button
              onClick={() => navigate("/student/notifications")}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
            >
              ♢
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
            </button>

            {/* USER */}
            <div className="hidden items-center gap-3 sm:flex">

              <div className="text-right">
                <p className="text-sm font-semibold">
                  {user.name || "Student"}
                </p>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Student
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 font-semibold text-white">
                {(user.name || "S").charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* PAGE */}
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default StudentLayout;