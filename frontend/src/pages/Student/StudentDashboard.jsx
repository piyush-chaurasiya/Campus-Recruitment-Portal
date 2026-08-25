import { useNavigate } from "react-router-dom";

function StudentDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className="mx-auto max-w-7xl space-y-8">

      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 p-6 text-white shadow-xl shadow-indigo-500/10 sm:p-8">

        <div className="relative z-10 max-w-2xl">

          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium backdrop-blur">
            ✨ Your placement journey
          </span>

          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Welcome back, {user.name || "Student"} 👋
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-indigo-100 sm:text-base">
            Stay updated with opportunities, applications and interviews.
            Your next career opportunity could be closer than you think.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">

            <button
              onClick={() => navigate("/student/jobs")}
              className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-indigo-700 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              Explore Jobs →
            </button>

            <button
              onClick={() => navigate("/student/profile")}
              className="rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              Complete Profile
            </button>
          </div>
        </div>

        {/* Decorative circles */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-24 right-20 h-56 w-56 rounded-full bg-fuchsia-300/20 blur-3xl" />
      </section>

      {/* STATS */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">
              Your Overview
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Track your placement progress
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <StatCard
            icon="💼"
            title="Available Jobs"
            value="0"
            color="indigo"
            onClick={() => navigate("/student/jobs")}
          />

          <StatCard
            icon="📋"
            title="Applications"
            value="0"
            color="violet"
            onClick={() => navigate("/student/applications")}
          />

          <StatCard
            icon="📅"
            title="Interviews"
            value="0"
            color="emerald"
            onClick={() => navigate("/student/interviews")}
          />

          <StatCard
            icon="🎯"
            title="Offers"
            value="0"
            color="amber"
            onClick={() => navigate("/student/applications")}
          />
        </div>
      </section>

      {/* TWO COLUMN */}
      <section className="grid gap-6 xl:grid-cols-3">

        {/* QUICK ACTIONS */}
        <div className="xl:col-span-2">

          <h2 className="mb-4 text-xl font-bold">
            Quick Actions
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">

            <ActionCard
              icon="👤"
              title="Complete Profile"
              description="Add your personal, academic and professional details."
              button="Open Profile"
              onClick={() => navigate("/student/profile")}
              gradient="from-indigo-500 to-blue-500"
            />

            <ActionCard
              icon="📄"
              title="Update Resume"
              description="Keep your latest resume ready for recruiters."
              button="Manage Resume"
              onClick={() => navigate("/student/resume")}
              gradient="from-violet-500 to-fuchsia-500"
            />

            <ActionCard
              icon="💼"
              title="Find Opportunities"
              description="Explore jobs and internships matching your skills."
              button="Browse Jobs"
              onClick={() => navigate("/student/jobs")}
              gradient="from-cyan-500 to-blue-500"
            />

            <ActionCard
              icon="📊"
              title="Track Applications"
              description="Monitor the status of every application."
              button="View Applications"
              onClick={() => navigate("/student/applications")}
              gradient="from-emerald-500 to-teal-500"
            />
          </div>
        </div>

        {/* PROFILE COMPLETION */}
        <div>
          <h2 className="mb-4 text-xl font-bold">
            Profile Progress
          </h2>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Profile completion
                </p>

                <p className="mt-1 text-3xl font-bold">
                  35%
                </p>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50 text-lg font-bold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                35%
              </div>
            </div>

            <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div className="h-full w-[35%] rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" />
            </div>

            <p className="mt-4 text-sm leading-5 text-slate-500 dark:text-slate-400">
              Complete your profile to improve your chances of getting
              shortlisted.
            </p>

            <button
              onClick={() => navigate("/student/profile")}
              className="mt-5 w-full rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-300"
            >
              Complete Profile →
            </button>
          </div>
        </div>
      </section>

      {/* RECENT ACTIVITY */}
      <section>

        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">
              Recent Activity
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Your latest placement activities
            </p>
          </div>

          <button
            onClick={() => navigate("/student/notifications")}
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
          >
            View all
          </button>
        </div>

        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-slate-700 dark:bg-slate-900/40">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-2xl dark:bg-slate-800">
            🗂️
          </div>

          <h3 className="mt-4 font-semibold">
            No recent activity
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
            Once you start applying for jobs, attending interviews or
            receiving notifications, your activity will appear here.
          </p>

          <button
            onClick={() => navigate("/student/jobs")}
            className="mt-5 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Browse Opportunities
          </button>
        </div>
      </section>
    </div>
  );
}

function StatCard({
  icon,
  title,
  value,
  color,
  onClick,
}) {
  const colors = {
    indigo:
      "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400",
    violet:
      "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
    emerald:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
    amber:
      "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
  };

  return (
    <button
      onClick={onClick}
      className="group rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-slate-700"
    >
      <div className="flex items-start justify-between">

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl text-xl ${colors[color]}`}
        >
          {icon}
        </div>

        <span className="text-slate-300 transition group-hover:text-indigo-500 dark:text-slate-700">
          →
        </span>
      </div>

      <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">
        {title}
      </p>

      <h3 className="mt-1 text-3xl font-bold">
        {value}
      </h3>
    </button>
  );
}

function ActionCard({
  icon,
  title,
  description,
  button,
  onClick,
  gradient,
}) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/60">

      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-xl text-white shadow-lg`}
      >
        {icon}
      </div>

      <h3 className="mt-5 font-bold">
        {title}
      </h3>

      <p className="mt-2 min-h-[42px] text-sm leading-5 text-slate-500 dark:text-slate-400">
        {description}
      </p>

      <button
        onClick={onClick}
        className="mt-5 text-sm font-semibold text-indigo-600 transition group-hover:translate-x-1 dark:text-indigo-400"
      >
        {button} →
      </button>
    </div>
  );
}

export default StudentDashboard;