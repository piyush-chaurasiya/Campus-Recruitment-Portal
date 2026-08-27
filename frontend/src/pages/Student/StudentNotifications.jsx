import { useState } from "react";

function StudentNotifications() {
  const [notifications, setNotifications] = useState([]);

  const unread = notifications.filter(
    (item) => !item.read
  ).length;

  const markAllRead = () => {
    setNotifications((items) =>
      items.map((item) => ({
        ...item,
        read: true,
      }))
    );
  };

  return (
    <div className="space-y-7">

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">

        <div>
          <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">
            UPDATES
          </p>

          <h1 className="text-3xl md:text-4xl font-bold">
            Notifications
          </h1>

          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Stay updated with applications, interviews and placement activities.
          </p>
        </div>

        {unread > 0 && (
          <button
            onClick={markAllRead}
            className="px-4 py-2.5 rounded-xl bg-blue-600 text-white font-semibold"
          >
            Mark all as read
          </button>
        )}

      </div>

      {notifications.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-20 text-center">

          <div className="text-5xl mb-4">
            🔔
          </div>

          <h2 className="text-xl font-bold">
            You're all caught up
          </h2>

          <p className="text-slate-500 dark:text-slate-400 mt-2">
            New placement updates will appear here.
          </p>

        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-5 rounded-2xl border ${
                notification.read
                  ? "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                  : "bg-blue-50 dark:bg-blue-500/5 border-blue-200 dark:border-blue-500/20"
              }`}
            >
              <div className="flex gap-4">

                <div className="text-2xl">
                  {notification.icon || "🔔"}
                </div>

                <div className="flex-1">
                  <h3 className="font-bold">
                    {notification.title}
                  </h3>

                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {notification.message}
                  </p>

                  <p className="text-xs text-slate-400 mt-3">
                    {notification.time}
                  </p>
                </div>

                {!notification.read && (
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 mt-2" />
                )}

              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default StudentNotifications;