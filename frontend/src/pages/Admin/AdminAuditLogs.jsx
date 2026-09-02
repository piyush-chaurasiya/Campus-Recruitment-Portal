function AdminAuditLogs() {
  const logs = [
    {
      icon: "🔐",
      action: "Admin dashboard accessed",
      actor: "Administrator",
      time: "Current session",
    },
    {
      icon: "👥",
      action: "User Management available",
      actor: "Administrator",
      time: "System",
    },
    {
      icon: "🎓",
      action: "Academic verification workflow enabled",
      actor: "System",
      time: "System",
    },
    {
      icon: "💼",
      action: "Job verification workflow enabled",
      actor: "System",
      time: "System",
    },
  ];

  return (
    <div className="space-y-7">

      <div>

        <p className="text-sm font-bold text-blue-600 dark:text-blue-400">
          SECURITY
        </p>

        <h1 className="text-3xl md:text-4xl font-bold mt-1">
          Audit Logs
        </h1>

        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Administrative activity history.
        </p>

      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">

        {logs.map(
          (log, index) => (

            <div
              key={index}
              className="p-5 border-b last:border-b-0 border-slate-200 dark:border-slate-800 flex gap-4"
            >

              <div className="w-11 h-11 shrink-0 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                {log.icon}
              </div>

              <div className="flex-1">

                <p className="font-semibold">
                  {log.action}
                </p>

                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {log.actor}
                </p>

              </div>

              <span className="text-xs text-slate-400">
                {log.time}
              </span>

            </div>

          )
        )}

      </div>

    </div>
  );
}

export default AdminAuditLogs;