import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const roles = [
  { value: "STUDENT", label: "Student", icon: "🎓" },
  { value: "RECRUITER", label: "Recruiter", icon: "🏢" },
  { value: "PLACEMENT_OFFICER", label: "Placement Officer", icon: "👨‍💼" },
  { value: "ADMIN", label: "Admin", icon: "⚙️" },
];

function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("STUDENT");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/api/auth/login", {
        email,
        password,
      });

      const user = response.data;

      if (user.role !== role) {
        setError(`This account is not registered as ${role}.`);
        return;
      }

      localStorage.setItem("token", user.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: user.name,
          email: user.email,
          role: user.role,
        })
      );

      const routes = {
        STUDENT: "/student",
        RECRUITER: "/recruiter",
        PLACEMENT_OFFICER: "/placement",
        ADMIN: "/admin",
      };

      navigate(routes[user.role], { replace: true });

    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4 py-8">

      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800">

        <div className="hidden md:flex flex-col justify-center p-12 bg-gradient-to-br from-blue-700 to-indigo-900">

          <div className="text-5xl mb-6">🎓</div>

          <h1 className="text-4xl font-bold mb-5">
            Campus Placement Portal
          </h1>

          <p className="text-blue-100 text-lg leading-relaxed mb-8">
            Your one-stop platform for managing campus placements,
            recruitment drives and career opportunities.
          </p>

          <div className="space-y-5 text-blue-50">
            <div className="flex gap-3">
              <span>✓</span>
              <span>Manage placement opportunities</span>
            </div>

            <div className="flex gap-3">
              <span>✓</span>
              <span>Connect students with recruiters</span>
            </div>

            <div className="flex gap-3">
              <span>✓</span>
              <span>Track applications and placements</span>
            </div>
          </div>

        </div>

        <div className="p-8 md:p-12">

          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">
              Welcome Back
            </h2>

            <p className="text-slate-400">
              Login to continue to your account
            </p>
          </div>

          <form onSubmit={handleLogin}>

            <label className="block text-sm font-medium mb-3">
              Select your role
            </label>

            <div className="grid grid-cols-2 gap-3 mb-6">

              {roles.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => {
                    setRole(item.value);
                    setError("");
                  }}
                  className={`p-3 rounded-xl border transition ${
                    role === item.value
                      ? "border-blue-500 bg-blue-600/20 text-blue-400"
                      : "border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-500"
                  }`}
                >
                  <div className="text-xl mb-1">
                    {item.icon}
                  </div>

                  <div className="text-sm font-medium">
                    {item.label}
                  </div>
                </button>
              ))}

            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium mb-2">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-2">
                Password
              </label>

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 pr-12 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-blue-500"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>

              </div>
            </div>

            <div className="flex justify-end mb-6">
              <button
                type="button"
                className="text-sm text-blue-400"
              >
                Forgot Password?
              </button>
            </div>

            {error && (
              <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 font-semibold"
            >
              {loading
                ? "Signing in..."
                : `Login as ${
                    roles.find((r) => r.value === role)?.label
                  }`}
            </button>

          </form>

          <p className="text-center text-slate-500 text-sm mt-8">
            Campus Placement Portal © 2026
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;