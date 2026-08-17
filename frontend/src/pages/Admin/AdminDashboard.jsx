function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          Welcome, {user.name || "Administrator"} 👋
        </h1>

        <p className="text-slate-400 mt-2">
          Manage the entire campus placement platform.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

        <Stat title="Total Users" value="0" icon="👥" />
        <Stat title="Students" value="0" icon="🎓" />
        <Stat title="Recruiters" value="0" icon="🏢" />
        <Stat title="Active Drives" value="0" icon="📢" />

      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

        <h2 className="text-xl font-semibold">
          System Overview
        </h2>

        <div className="text-center py-12 text-slate-500">
          No system activity yet.
        </div>

      </div>

    </div>
  );
}

function Stat({ title, value, icon }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">

      <div className="text-2xl mb-4">
        {icon}
      </div>

      <p className="text-sm text-slate-400">
        {title}
      </p>

      <h3 className="text-3xl font-bold mt-1">
        {value}
      </h3>

    </div>
  );
}

export default AdminDashboard;