import { useEffect, useState } from "react";
import api from "../../api/axios";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({});
  const [editing, setEditing] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [academic, setAcademic] = useState({
    tenthPercentage: "",
    tenthMathPercentage: "",
    twelfthPercentage: "",
    twelfthMathPercentage: "",
    cgpa: "",
    backlogs: "",
  });

  const [academicStatus, setAcademicStatus] = useState("PENDING");
  const [academicRequest, setAcademicRequest] = useState(null);
  const [submittingAcademic, setSubmittingAcademic] = useState(false);

  useEffect(() => {
    loadProfile();
    loadAcademicStatus();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);

      const response = await api.get("/api/student/profile");

      setProfile(response.data);
      setForm(response.data);

      setAcademic({
        tenthPercentage: response.data.tenthPercentage ?? "",
        tenthMathPercentage:
          response.data.tenthMathPercentage ?? "",
        twelfthPercentage:
          response.data.twelfthPercentage ?? "",
        twelfthMathPercentage:
          response.data.twelfthMathPercentage ?? "",
        cgpa: response.data.cgpa ?? "",
        backlogs: response.data.backlogs ?? "",
      });

      setAcademicStatus(
        response.data.academicStatus || "PENDING"
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load profile."
      );
    } finally {
      setLoading(false);
    }
  };

  const loadAcademicStatus = async () => {
    try {
      const response = await api.get(
        "/api/student/academic/verification"
      );

      setAcademicRequest(response.data);
      setAcademicStatus(
        response.data.status || "PENDING"
      );
    } catch (err) {
      if (err.response?.status !== 404) {
        console.error(err);
      }
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleAcademicChange = (e) => {
    setAcademic({
      ...academic,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setMessage("");

      const response = await api.put(
        "/api/student/profile",
        {
          phone: form.phone || null,
          dateOfBirth: form.dateOfBirth || null,
          gender: form.gender || null,
          address: form.address || null,
          city: form.city || null,
          state: form.state || null,
          pincode: form.pincode || null,
          branch: form.branch || null,
          course: form.course || null,
          passingYear: form.passingYear
            ? Number(form.passingYear)
            : null,
          skills: form.skills || null,
          githubUrl: form.githubUrl || null,
          linkedinUrl: form.linkedinUrl || null,
        }
      );

      setProfile(response.data);
      setForm(response.data);
      setEditing(false);

      setMessage("Profile updated successfully.");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  const submitAcademicVerification = async () => {
    try {
      setSubmittingAcademic(true);
      setError("");
      setMessage("");

      const payload = {
        tenthPercentage: Number(
          academic.tenthPercentage
        ),
        tenthMathPercentage: Number(
          academic.tenthMathPercentage
        ),
        twelfthPercentage: Number(
          academic.twelfthPercentage
        ),
        twelfthMathPercentage: Number(
          academic.twelfthMathPercentage
        ),
        cgpa: Number(academic.cgpa),
        backlogs: Number(academic.backlogs),
      };

      const response = await api.post(
        "/api/student/academic/verification",
        payload
      );

      setAcademicRequest(response.data);
      setAcademicStatus(
        response.data.status || "PENDING"
      );

      setMessage(
        "Academic verification request submitted successfully."
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to submit academic verification."
      );
    } finally {
      setSubmittingAcademic(false);
    }
  };

  const statusStyle = {
    APPROVED:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",

    PENDING:
      "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",

    REJECTED:
      "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400",
  };

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600 dark:border-slate-700 dark:border-t-indigo-400" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-7">

      {/* HEADER */}

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div>
          <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
            Student Profile
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            My Profile
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Manage your personal, academic and professional
            information.
          </p>
        </div>

        <button
          onClick={() => {
            setEditing(!editing);
            setMessage("");
            setError("");
          }}
          className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-700"
        >
          {editing ? "Cancel Editing" : "Edit Profile"}
        </button>
      </div>

      {/* ALERTS */}

      {message && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
          ✓ {message}
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400">
          ⚠ {error}
        </div>
      )}

      {/* BASIC PROFILE */}

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">

        <div className="mb-6 flex items-center gap-4">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-2xl font-bold text-white">
            {(profile?.name || "S")
              .charAt(0)
              .toUpperCase()}
          </div>

          <div>
            <h2 className="text-xl font-bold">
              {profile?.name || "Student"}
            </h2>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              {profile?.email}
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

          <Field
            label="Full Name"
            value={profile?.name}
            disabled
          />

          <Field
            label="Email"
            value={profile?.email}
            disabled
          />

          <Input
            label="Phone"
            name="phone"
            value={form.phone}
            editing={editing}
            onChange={handleChange}
          />

          <Input
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            value={form.dateOfBirth}
            editing={editing}
            onChange={handleChange}
          />

          <Select
            label="Gender"
            name="gender"
            value={form.gender}
            editing={editing}
            onChange={handleChange}
            options={[
              "Male",
              "Female",
              "Other",
              "Prefer not to say",
            ]}
          />

          <Input
            label="City"
            name="city"
            value={form.city}
            editing={editing}
            onChange={handleChange}
          />

          <Input
            label="State"
            name="state"
            value={form.state}
            editing={editing}
            onChange={handleChange}
          />

          <Input
            label="Pincode"
            name="pincode"
            value={form.pincode}
            editing={editing}
            onChange={handleChange}
          />

          <Input
            label="Course"
            name="course"
            value={form.course}
            editing={editing}
            onChange={handleChange}
          />

          <Input
            label="Branch"
            name="branch"
            value={form.branch}
            editing={editing}
            onChange={handleChange}
          />

          <Input
            label="Passing Year"
            name="passingYear"
            type="number"
            value={form.passingYear}
            editing={editing}
            onChange={handleChange}
          />
        </div>

        <div className="mt-5 grid gap-5">

          <Input
            label="Address"
            name="address"
            value={form.address}
            editing={editing}
            onChange={handleChange}
            textarea
          />

          <Input
            label="Skills"
            name="skills"
            value={form.skills}
            editing={editing}
            onChange={handleChange}
            textarea
            placeholder="Java, Spring Boot, React, SQL..."
          />
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">

          <Input
            label="GitHub URL"
            name="githubUrl"
            value={form.githubUrl}
            editing={editing}
            onChange={handleChange}
            placeholder="https://github.com/..."
          />

          <Input
            label="LinkedIn URL"
            name="linkedinUrl"
            value={form.linkedinUrl}
            editing={editing}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/..."
          />
        </div>

        {editing && (
          <div className="mt-6 flex justify-end">

            <button
              onClick={saveProfile}
              disabled={saving}
              className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-60"
            >
              {saving
                ? "Saving..."
                : "Save Profile Changes"}
            </button>

          </div>
        )}
      </section>

      {/* ACADEMIC */}

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">

        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">

          <div>
            <h2 className="text-xl font-bold">
              Academic Information
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Academic information must be verified before it
              becomes official.
            </p>
          </div>

          <span
            className={`rounded-full px-3 py-1.5 text-xs font-bold ${
              statusStyle[academicStatus] ||
              statusStyle.PENDING
            }`}
          >
            {academicStatus}
          </span>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          <AcademicInput
            label="10th Percentage"
            name="tenthPercentage"
            value={academic.tenthPercentage}
            onChange={handleAcademicChange}
          />

          <AcademicInput
            label="10th Maths Percentage"
            name="tenthMathPercentage"
            value={academic.tenthMathPercentage}
            onChange={handleAcademicChange}
          />

          <AcademicInput
            label="12th Percentage"
            name="twelfthPercentage"
            value={academic.twelfthPercentage}
            onChange={handleAcademicChange}
          />

          <AcademicInput
            label="12th Maths Percentage"
            name="twelfthMathPercentage"
            value={academic.twelfthMathPercentage}
            onChange={handleAcademicChange}
          />

          <AcademicInput
            label="CGPA"
            name="cgpa"
            value={academic.cgpa}
            onChange={handleAcademicChange}
            max="10"
          />

          <AcademicInput
            label="Backlogs"
            name="backlogs"
            value={academic.backlogs}
            onChange={handleAcademicChange}
            min="0"
          />
        </div>

        {academicRequest?.rejectionReason && (
          <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-500/20 dark:bg-red-500/10">
            <p className="text-sm font-semibold text-red-700 dark:text-red-400">
              Rejection Reason
            </p>

            <p className="mt-1 text-sm text-red-600 dark:text-red-300">
              {academicRequest.rejectionReason}
            </p>
          </div>
        )}

        {academicStatus !== "PENDING" && (
          <div className="mt-6 flex justify-end">

            <button
              onClick={submitAcademicVerification}
              disabled={submittingAcademic}
              className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-60"
            >
              {submittingAcademic
                ? "Submitting..."
                : "Submit New Verification Request"}
            </button>

          </div>
        )}

        {academicStatus === "PENDING" && (
          <div className="mt-6 rounded-xl bg-amber-50 p-4 text-sm text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
            ⏳ Your academic verification request is currently
            under review.
          </div>
        )}

      </section>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <div className="rounded-xl bg-slate-50 px-4 py-3 text-sm dark:bg-slate-800/70">
        {value || "Not provided"}
      </div>
    </div>
  );
}

function Input({
  label,
  name,
  value,
  editing,
  onChange,
  type = "text",
  textarea = false,
  placeholder,
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </label>

      {editing ? (
        textarea ? (
          <textarea
            name={name}
            value={value || ""}
            onChange={onChange}
            placeholder={placeholder}
            rows={3}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-800"
          />
        ) : (
          <input
            type={type}
            name={name}
            value={value || ""}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-800"
          />
        )
      ) : (
        <div className="rounded-xl bg-slate-50 px-4 py-3 text-sm dark:bg-slate-800/70">
          {value || "Not provided"}
        </div>
      )}
    </div>
  );
}

function Select({
  label,
  name,
  value,
  editing,
  onChange,
  options,
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </label>

      {editing ? (
        <select
          name={name}
          value={value || ""}
          onChange={onChange}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800"
        >
          <option value="">Select</option>

          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <div className="rounded-xl bg-slate-50 px-4 py-3 text-sm dark:bg-slate-800/70">
          {value || "Not provided"}
        </div>
      )}
    </div>
  );
}

function AcademicInput({
  label,
  name,
  value,
  onChange,
  min,
  max,
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </label>

      <input
        type="number"
        step="0.01"
        name={name}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-800"
      />
    </div>
  );
}

export default Profile;