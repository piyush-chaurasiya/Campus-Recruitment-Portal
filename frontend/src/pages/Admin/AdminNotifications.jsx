function AdminNotifications() {
  const notifications = [
    {
      icon: "🎓",
      title: "Academic Verification",
      text: "New academic verification requests may require review.",
      time: "System",
    },
    {
      icon: "💼",
      title: "Job Verification",
      text: "Placement opportunities submitted by recruiters require verification.",
      time: "System",
    },
    {
      icon: "👥",
      title: "User Management",
      text: "Administrators can create and manage all platform accounts.",
      time: "System",
    },
  ];

  return (
    <div className="space-y-7">

      <div>

        <p className="text-sm font-bold text-blue-600 dark:text-blue-400">
          SYSTEM
        </p>

        <h1 className="text-3xl md:text-4xl font-bold mt-1">
          Notifications
        </h1>

        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Important events and system information.
        </p>

      </div>

      <div className="space-y-3">

        {notifications.map(
          (notification, index) => (

            <div
              key={index}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex gap-4 hover:-translate-y-0.5 hover:shadow-lg transition"
            >

              <div className="w-12 h-12 shrink-0 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-2xl">
                {notification.icon}
              </div>

              <div className="flex-1">

                <div className="flex flex-col sm:flex-row sm:justify-between gap-2">

                  <h3 className="font-bold">
                    {notification.title}
                  </h3>

                  <span className="text-xs text-slate-400">
                    {notification.time}
                  </span>

                </div>

                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                  {notification.text}
                </p>

              </div>

            </div>

          )
        )}

      </div>

    </div>
  );
}

export default AdminNotifications;