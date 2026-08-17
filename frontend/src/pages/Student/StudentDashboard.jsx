function StudentDashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className="space-y-8">

      {/* WELCOME */}
      <div>
        <h1 className="text-3xl font-bold">
          Welcome back, {user.name || "Student"} 👋
        </h1>

        <p className="text-slate-400 mt-2">
          Here's an overview of your placement activities.
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

        <StatCard
          icon="💼"
          title="Available Jobs"
          value="0"
        />

        <StatCard
          icon="📋"
          title="Applications"
          value="0"
        />

        <StatCard
          icon="📅"
          title="Upcoming Interviews"
          value="0"
        />

        <StatCard
          icon="🎯"
          title="Offers"
          value="0"
        />

      </div>

      {/* QUICK ACTIONS */}
      <div>

        <h2 className="text-xl font-semibold mb-4">
          Quick Actions
        </h2>

        <div className="grid md:grid-cols-3 gap-5">

          <ActionCard
            icon="👤"
            title="Complete Profile"
            description="Update your personal and academic information."
          />

          <ActionCard
            icon="📄"
            title="Upload Resume"
            description="Keep your latest resume ready for applications."
          />

          <ActionCard
            icon="💼"
            title="Browse Jobs"
            description="Explore current placement opportunities."
          />

        </div>

      </div>

      {/* RECENT ACTIVITY */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

        <h2 className="text-xl font-semibold mb-5">
          Recent Activity
        </h2>

        <div className="text-center py-10 text-slate-500">
          No recent activity.
        </div>

      </div>

    </div>
  );
}

function StatCard({ icon, title, value }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">

      <div className="text-2xl mb-4">
        {icon}
      </div>

      <p className="text-slate-400 text-sm">
        {title}
      </p>

      <h3 className="text-3xl font-bold mt-1">
        {value}
      </h3>

    </div>
  );
}

function ActionCard({ icon, title, description }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500 transition">

      <div className="text-3xl mb-4">
        {icon}
      </div>

      <h3 className="font-semibold text-lg">
        {title}
      </h3>

      <p className="text-slate-400 text-sm mt-2">
        {description}
      </p>

    </div>
  );
}

export default StudentDashboard;