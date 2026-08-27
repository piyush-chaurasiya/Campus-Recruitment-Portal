import { useMemo, useState } from "react";

function StudentInterviews() {
  const [filter, setFilter] = useState("ALL");

  const interviews = [];

  const filtered = useMemo(() => {
    if (filter === "ALL") return interviews;

    return interviews.filter(
      (item) => item.type === filter
    );
  }, [filter, interviews]);

  return (
    <div className="space-y-7">

      <div>
        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">
          INTERVIEW CENTER
        </p>

        <h1 className="text-3xl md:text-4xl font-bold">
          Interviews
        </h1>

        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Keep track of your upcoming and previous interviews.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        <Stat title="Upcoming" value="0" icon="📅" />
        <Stat title="Completed" value="0" icon="✅" />
        <Stat title="Pending" value="0" icon="⏳" />
        <Stat title="Cancelled" value="0" icon="❌" />

      </div>

      <div className="flex gap-2 flex-wrap">

        {[
          ["ALL", "All"],
          ["UPCOMING", "Upcoming"],
          ["COMPLETED", "Completed"],
          ["CANCELLED", "Cancelled"],
        ].map(([value, label]) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold ${
              filter === value
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
            }`}
          >
            {label}
          </button>
        ))}

      </div>

      {filtered.length === 0 && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-20 text-center">

          <div className="text-5xl mb-4">
            📅
          </div>

          <h2 className="text-xl font-bold">
            No interviews scheduled
          </h2>

          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Interview details will appear here once a company schedules one.
          </p>

        </div>
      )}

    </div>
  );
}

function Stat({ title, value, icon }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
      <div className="text-2xl">{icon}</div>
      <p className="text-sm text-slate-500 mt-3">{title}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}

export default StudentInterviews;