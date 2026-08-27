import { useEffect, useMemo, useState } from "react";
import api from "../../api/axios";

const roles = [
  { value: "STUDENT", label: "Student", icon: "🎓" },
  { value: "RECRUITER", label: "Recruiter", icon: "🏢" },
  {
    value: "PLACEMENT_OFFICER",
    label: "Placement Officer",
    icon: "👨‍💼",
  },
];

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "STUDENT",
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);

      const response = await api.get(
        "/api/admin/users"
      );

      setUsers(response.data || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load users."
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {

      const searchText = search
        .toLowerCase()
        .trim();

      const matchesSearch =
        !searchText ||
        user.name
          ?.toLowerCase()
          .includes(searchText) ||
        user.email
          ?.toLowerCase()
          .includes(searchText);

      const matchesRole =
        roleFilter === "ALL" ||
        user.role === roleFilter;

      const matchesStatus =
        statusFilter === "ALL" ||
        (statusFilter === "ACTIVE" && user.enabled) ||
        (statusFilter === "DISABLED" && !user.enabled);

      return (
        matchesSearch &&
        matchesRole &&
        matchesStatus
      );
    });
  }, [
    users,
    search,
    roleFilter,
    statusFilter,
  ]);

  const handleCreate = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.role
    ) {
      setError("Please fill all fields.");
      return;
    }

    if (form.password.length < 6) {
      setError(
        "Password must contain at least 6 characters."
      );
      return;
    }

    try {
      setCreating(true);

      await api.post(
        "/api/admin/users",
        form
      );

      setMessage(
        `${getRoleLabel(form.role)} account created successfully.`
      );

      setForm({
        name: "",
        email: "",
        password: "",
        role: "STUDENT",
      });

      setShowModal(false);

      await loadUsers();

    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data ||
          "Unable to create account."
      );
    } finally {
      setCreating(false);
    }
  };

  const toggleStatus = async (user) => {
    try {
      setError("");
      setMessage("");

      await api.put(
        `/api/admin/users/${user.id}/status`,
        null,
        {
          params: {
            enabled: !user.enabled,
          },
        }
      );

      setMessage(
        `${user.name}'s account is now ${
          !user.enabled
            ? "active"
            : "disabled"
        }.`
      );

      await loadUsers();

    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to update account status."
      );
    }
  };

  const deleteUser = async (user) => {
    const confirmed = window.confirm(
      `Delete ${user.name}'s account?\n\nThis action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      setError("");
      setMessage("");

      await api.delete(
        `/api/admin/users/${user.id}`
      );

      setMessage(
        "User deleted successfully."
      );

      await loadUsers();

    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data ||
          "Unable to delete user."
      );
    }
  };

  const total = users.length;

  const students = users.filter(
    (u) => u.role === "STUDENT"
  ).length;

  const recruiters = users.filter(
    (u) => u.role === "RECRUITER"
  ).length;

  const officers = users.filter(
    (u) => u.role === "PLACEMENT_OFFICER"
  ).length;

  return (
    <div className="space-y-7">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">

        <div>
          <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">
            ADMINISTRATION
          </p>

          <h1 className="text-3xl md:text-4xl font-bold">
            User Management
          </h1>

          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Create and manage student, recruiter and placement officer accounts.
          </p>
        </div>

        <button
          onClick={() => {
            setError("");
            setShowModal(true);
          }}
          className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg"
        >
          + Create User
        </button>

      </div>

      {/* MESSAGES */}
      {message && (
        <div className="px-5 py-4 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400">
          ✓ {message}
        </div>
      )}

      {error && (
        <div className="px-5 py-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-700 dark:text-red-400">
          {error}
        </div>
      )}

      {/* STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        <Stat
          title="Total Users"
          value={total}
          icon="👥"
        />

        <Stat
          title="Students"
          value={students}
          icon="🎓"
        />

        <Stat
          title="Recruiters"
          value={recruiters}
          icon="🏢"
        />

        <Stat
          title="Placement Officers"
          value={officers}
          icon="👨‍💼"
        />

      </div>

      {/* FILTERS */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4">

        <div className="grid md:grid-cols-3 gap-3">

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search by name or email..."
            className="px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:border-blue-500"
          />

          <select
            value={roleFilter}
            onChange={(e) =>
              setRoleFilter(e.target.value)
            }
            className="px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
          >
            <option value="ALL">
              All Roles
            </option>

            {roles.map((role) => (
              <option
                key={role.value}
                value={role.value}
              >
                {role.label}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
          >
            <option value="ALL">
              All Status
            </option>

            <option value="ACTIVE">
              Active
            </option>

            <option value="DISABLED">
              Disabled
            </option>
          </select>

        </div>

      </div>

      {/* TABLE */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">

        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800">
          <h2 className="font-bold text-lg">
            Platform Users
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {filteredUsers.length} user
            {filteredUsers.length !== 1
              ? "s"
              : ""}{" "}
            found
          </p>
        </div>

        {loading ? (
          <div className="p-8 space-y-4">
            {[1, 2, 3, 4].map(
              (item) => (
                <div
                  key={item}
                  className="h-16 rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse"
                />
              )
            )}
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="py-16 text-center">

            <div className="text-5xl mb-4">
              👥
            </div>

            <h3 className="text-lg font-bold">
              No users found
            </h3>

            <p className="text-sm text-slate-500 mt-2">
              Try changing your filters or create a new account.
            </p>

          </div>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-slate-500 bg-slate-50 dark:bg-slate-800/50">

                  <th className="px-6 py-4">
                    User
                  </th>

                  <th className="px-6 py-4">
                    Role
                  </th>

                  <th className="px-6 py-4">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right">
                    Actions
                  </th>

                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">

                {filteredUsers.map(
                  (user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition"
                    >

                      <td className="px-6 py-4">

                        <div className="flex items-center gap-3">

                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold">
                            {user.name
                              ?.charAt(0)
                              ?.toUpperCase() ||
                              "U"}
                          </div>

                          <div>
                            <p className="font-semibold">
                              {user.name}
                            </p>

                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              {user.email}
                            </p>
                          </div>

                        </div>

                      </td>

                      <td className="px-6 py-4">
                        <RoleBadge
                          role={user.role}
                        />
                      </td>

                      <td className="px-6 py-4">
                        <StatusBadge
                          enabled={user.enabled}
                        />
                      </td>

                      <td className="px-6 py-4">

                        <div className="flex justify-end gap-2">

                          <button
                            onClick={() =>
                              toggleStatus(user)
                            }
                            className={`px-3 py-2 rounded-lg text-sm font-semibold ${
                              user.enabled
                                ? "text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-500/10"
                                : "text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-500/10"
                            }`}
                          >
                            {user.enabled
                              ? "Disable"
                              : "Enable"}
                          </button>

                          <button
                            onClick={() =>
                              deleteUser(user)
                            }
                            className="px-3 py-2 rounded-lg text-sm font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10"
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>
        )}

      </div>

      {/* CREATE MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800">

            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">

              <div>
                <h2 className="text-xl font-bold">
                  Create User Account
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Create credentials for a platform user.
                </p>
              </div>

              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="w-9 h-9 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                ✕
              </button>

            </div>

            <form
              onSubmit={handleCreate}
              className="p-6 space-y-5"
            >

              <Field
                label="Full Name"
                value={form.name}
                onChange={(value) =>
                  setForm({
                    ...form,
                    name: value,
                  })
                }
                placeholder="Enter full name"
              />

              <Field
                label="Email Address"
                type="email"
                value={form.email}
                onChange={(value) =>
                  setForm({
                    ...form,
                    email: value,
                  })
                }
                placeholder="user@campus.com"
              />

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Role
                </label>

                <select
                  value={form.role}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      role: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:border-blue-500"
                >
                  {roles.map((role) => (
                    <option
                      key={role.value}
                      value={role.value}
                    >
                      {role.label}
                    </option>
                  ))}
                </select>
              </div>

              <Field
                label="Temporary Password"
                type="password"
                value={form.password}
                onChange={(value) =>
                  setForm({
                    ...form,
                    password: value,
                  })
                }
                placeholder="Minimum 6 characters"
              />

              <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-sm text-blue-700 dark:text-blue-300">
                💡 Give these login credentials to the user after creating the account.
              </div>

              <div className="flex gap-3 pt-2">

                <button
                  type="button"
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={creating}
                  className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold disabled:opacity-50"
                >
                  {creating
                    ? "Creating..."
                    : "Create Account"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:border-blue-500"
      />
    </div>
  );
}

function Stat({ title, value, icon }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">

      <div className="text-2xl">
        {icon}
      </div>

      <p className="text-sm text-slate-500 dark:text-slate-400 mt-3">
        {title}
      </p>

      <p className="text-2xl font-bold mt-1">
        {value}
      </p>

    </div>
  );
}

function RoleBadge({ role }) {
  const data = {
    STUDENT: {
      label: "Student",
      className:
        "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
    },

    RECRUITER: {
      label: "Recruiter",
      className:
        "bg-violet-100 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400",
    },

    PLACEMENT_OFFICER: {
      label: "Placement Officer",
      className:
        "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
    },
  };

  const item = data[role] || {
    label: role,
    className:
      "bg-slate-100 text-slate-600",
  };

  return (
    <span
      className={`px-3 py-1.5 rounded-full text-xs font-semibold ${item.className}`}
    >
      {item.label}
    </span>
  );
}

function StatusBadge({ enabled }) {
  return (
    <span
      className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
        enabled
          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
          : "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400"
      }`}
    >
      {enabled ? "● Active" : "● Disabled"}
    </span>
  );
}

function getRoleLabel(role) {
  return roles.find(
    (item) => item.value === role
  )?.label || role;
}

export default AdminUsers;