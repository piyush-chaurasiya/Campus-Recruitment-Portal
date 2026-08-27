import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

function AdminDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const response = await api.get(
        "/api/admin/dashboard"
      );

      setData(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load dashboard."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">

        <div className="h-10 w-72 rounded-xl bg-slate-200 dark:bg-slate-800" />

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-32 rounded-2xl bg-slate-200 dark:bg-slate-800"
            />
          ))}
        </div>

      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 rounded-2xl bg-red-50 dark:bg-red-500/10 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* HERO */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 p-8 text-white">

        <div className="relative z-10">

          <p className="text-sm font-semibold text-blue-100">
            ADMIN CONTROL CENTER
          </p>

          <h1 className="text-3xl md:text-4xl font-bold mt-2">
            Welcome back, {user.name || "Administrator"} 👋
          </h1>

          <p className="text-blue-100 mt-3 max-w-2xl">
            Monitor users, placement opportunities and academic verification from one place.
          </p>

        </div>

        <div className="absolute -right-10 -bottom-20 text-[180px] opacity-10">
          ⚙️
        </div>

      </div>

      {/* USER STATS */}
      <section>

        <div className="flex items-center justify-between mb-4">

          <div>
            <h2 className="text-xl font-bold">
              Platform Overview
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Current system statistics
            </p>
          </div>

        </div>

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">

          <Stat
            icon="👥"
            title="Total Users"
            value={data.totalUsers}
          />

          <Stat
            icon="🎓"
            title="Students"
            value={data.students}
          />

          <Stat
            icon="🏢"
            title="Recruiters"
            value={data.recruiters}
          />

          <Stat
            icon="👨‍💼"
            title="Placement Officers"
            value={data.placementOfficers}
          />

        </div>

      </section>

      {/* PLACEMENT */}
      <section>

        <h2 className="text-xl font-bold mb-4">
          Placement Activity
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          <ActionStat
            icon="⏳"
            title="Pending Jobs"
            value={data.pendingJobs}
            description="Waiting for admin review"
            onClick={() =>
              navigate("/admin/job-verification")
            }
          />

          <ActionStat
            icon="✅"
            title="Approved Jobs"
            value={data.approvedJobs}
            description="Currently published opportunities"
            onClick={() =>
              navigate("/admin/job-verification")
            }
          />

          <ActionStat
            icon="🎓"
            title="Academic Reviews"
            value={data.pendingAcademic}
            description="Students waiting for verification"
            onClick={() =>
              navigate("/admin/academic-verification")
            }
          />

        </div>

      </section>

      {/* QUICK ACTIONS */}
      <section>

        <h2 className="text-xl font-bold mb-4">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          <QuickAction
            icon="👤"
            title="Create User"
            description="Create Student, Recruiter or TPO account."
            onClick={() =>
              navigate("/admin/users")
            }
          />

          <QuickAction
            icon="🎓"
            title="Review Academics"
            description="Verify pending student academic requests."
            onClick={() =>
              navigate("/admin/academic-verification")
            }
          />

          <QuickAction
            icon="💼"
            title="Review Jobs"
            description="Approve or reject placement opportunities."
            onClick={() =>
              navigate("/admin/job-verification")
            }
          />

        </div>

      </section>

    </div>
  );
}

function Stat({
  icon,
  title,
  value,
}) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:-translate-y-1 hover:shadow-lg transition">

      <div className="text-3xl">
        {icon}
      </div>

      <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
        {title}
      </p>

      <p className="text-3xl font-bold mt-1">
        {value ?? 0}
      </p>

    </div>
  );
}

function ActionStat({
  icon,
  title,
  value,
  description,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="text-left bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-xl transition"
    >

      <div className="flex justify-between">

        <span className="text-3xl">
          {icon}
        </span>

        <span className="text-2xl font-bold">
          {value ?? 0}
        </span>

      </div>

      <h3 className="font-bold mt-5">
        {title}
      </h3>

      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
        {description}
      </p>

    </button>
  );
}

function QuickAction({
  icon,
  title,
  description,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="text-left p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-400 hover:shadow-lg transition"
    >

      <div className="text-3xl">
        {icon}
      </div>

      <h3 className="font-bold mt-4">
        {title}
      </h3>

      <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
        {description}
      </p>

      <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mt-4">
        Open →
      </p>

    </button>
  );
}

export default AdminDashboard;