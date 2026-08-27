import { useEffect, useState } from "react";
import api from "../../api/axios";

function AdminAcademicVerification() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selected, setSelected] = useState(null);
  const [showReject, setShowReject] = useState(false);
  const [reason, setReason] = useState("");

  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        "/api/admin/academic/verifications"
      );

      setRequests(response.data || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data ||
          "Unable to load verification requests."
      );
    } finally {
      setLoading(false);
    }
  };

  const approve = async (request) => {
    const confirmed = window.confirm(
      `Approve academic verification for ${request.studentName}?`
    );

    if (!confirmed) return;

    try {
      setProcessing(true);
      setError("");
      setMessage("");

      await api.put(
        `/api/admin/academic/verifications/${request.requestId}/approve`
      );

      setMessage(
        `${request.studentName}'s academic details have been approved.`
      );

      setSelected(null);

      await loadRequests();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data ||
          "Unable to approve request."
      );
    } finally {
      setProcessing(false);
    }
  };

  const openReject = (request) => {
    setSelected(request);
    setReason("");
    setError("");
    setMessage("");
    setShowReject(true);
  };

  const reject = async (e) => {
    e.preventDefault();

    if (!reason.trim()) {
      setError("Please provide a rejection reason.");
      return;
    }

    if (!selected) return;

    try {
      setProcessing(true);
      setError("");
      setMessage("");

      await api.put(
        `/api/admin/academic/verifications/${selected.requestId}/reject`,
        {
          reason: reason.trim(),
        }
      );

      setMessage(
        `${selected.studentName}'s verification has been rejected.`
      );

      setShowReject(false);
      setSelected(null);
      setReason("");

      await loadRequests();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data ||
          "Unable to reject request."
      );
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-7">

      {/* HEADER */}
      <div>
        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">
          ACADEMIC CONTROL
        </p>

        <h1 className="text-3xl md:text-4xl font-bold">
          Academic Verification
        </h1>

        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Review and verify student academic information submitted for placement eligibility.
        </p>
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

      {/* SUMMARY */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        <SummaryCard
          icon="⏳"
          title="Pending Requests"
          value={requests.length}
        />

        <SummaryCard
          icon="🎓"
          title="Students Awaiting Review"
          value={requests.length}
        />

        <SummaryCard
          icon="🔎"
          title="Review Queue"
          value={requests.length > 0 ? "Active" : "Clear"}
        />

      </div>

      {/* REQUESTS */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden">

        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">

          <div>
            <h2 className="text-xl font-bold">
              Pending Academic Requests
            </h2>

            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Verify the submitted marks before approving.
            </p>
          </div>

          <button
            onClick={loadRequests}
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold text-sm"
          >
            ↻ Refresh
          </button>

        </div>

        {loading ? (
          <div className="p-6 space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-40 rounded-2xl bg-slate-100 dark:bg-slate-800 animate-pulse"
              />
            ))}
          </div>
        ) : requests.length === 0 ? (
          <div className="py-20 text-center">

            <div className="text-5xl mb-4">
              ✅
            </div>

            <h3 className="text-xl font-bold">
              No pending verifications
            </h3>

            <p className="text-slate-500 dark:text-slate-400 mt-2">
              All academic verification requests have been reviewed.
            </p>

          </div>
        ) : (
          <div className="p-6 space-y-5">

            {requests.map((request) => (
              <VerificationCard
                key={request.requestId}
                request={request}
                onApprove={approve}
                onReject={openReject}
                processing={processing}
              />
            ))}

          </div>
        )}

      </div>

      {/* REJECT MODAL */}
      {showReject && selected && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800">

            <div className="p-6 border-b border-slate-200 dark:border-slate-800">

              <h2 className="text-xl font-bold">
                Reject Academic Verification
              </h2>

              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                Provide a clear reason for rejecting{" "}
                <span className="font-semibold">
                  {selected.studentName}
                </span>
                's request.
              </p>

            </div>

            <form
              onSubmit={reject}
              className="p-6 space-y-5"
            >

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Rejection Reason
                </label>

                <textarea
                  rows="5"
                  value={reason}
                  onChange={(e) =>
                    setReason(e.target.value)
                  }
                  placeholder="Example: Submitted marksheet does not match the provided academic details."
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:border-red-500 resize-none"
                />
              </div>

              <div className="flex gap-3">

                <button
                  type="button"
                  onClick={() => {
                    setShowReject(false);
                    setSelected(null);
                  }}
                  className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={processing}
                  className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold disabled:opacity-50"
                >
                  {processing
                    ? "Rejecting..."
                    : "Reject Request"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

function VerificationCard({
  request,
  onApprove,
  onReject,
  processing,
}) {
  return (
    <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:border-blue-300 dark:hover:border-blue-500/30 transition">

      {/* STUDENT */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

        <div className="flex items-center gap-4">

          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-lg">
            {request.studentName
              ?.charAt(0)
              ?.toUpperCase() || "S"}
          </div>

          <div>
            <h3 className="font-bold text-lg">
              {request.studentName}
            </h3>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              {request.studentEmail}
            </p>

            <p className="text-xs text-slate-400 mt-1">
              Request #{request.requestId}
            </p>
          </div>

        </div>

        <span className="w-fit px-3 py-1.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 text-xs font-semibold">
          ● PENDING REVIEW
        </span>

      </div>

      {/* ACADEMIC DATA */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 mt-6">

        <AcademicItem
          label="10th"
          value={request.tenthPercentage}
          suffix="%"
        />

        <AcademicItem
          label="10th Math"
          value={request.tenthMathPercentage}
          suffix="%"
        />

        <AcademicItem
          label="12th"
          value={request.twelfthPercentage}
          suffix="%"
        />

        <AcademicItem
          label="12th Math"
          value={request.twelfthMathPercentage}
          suffix="%"
        />

        <AcademicItem
          label="CGPA"
          value={request.cgpa}
        />

        <AcademicItem
          label="Backlogs"
          value={request.backlogs}
        />

      </div>

      {/* SUBMITTED */}
      {request.submittedAt && (
        <p className="text-xs text-slate-400 mt-5">
          Submitted:{" "}
          {new Date(
            request.submittedAt
          ).toLocaleString()}
        </p>
      )}

      {/* ACTIONS */}
      <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6 pt-5 border-t border-slate-200 dark:border-slate-800">

        <button
          onClick={() => onReject(request)}
          disabled={processing}
          className="px-5 py-2.5 rounded-xl border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 font-semibold hover:bg-red-50 dark:hover:bg-red-500/10 disabled:opacity-50"
        >
          Reject
        </button>

        <button
          onClick={() => onApprove(request)}
          disabled={processing}
          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold disabled:opacity-50"
        >
          ✓ Approve Academic Data
        </button>

      </div>

    </div>
  );
}

function AcademicItem({
  label,
  value,
  suffix = "",
}) {
  return (
    <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-4">

      <p className="text-xs text-slate-500 dark:text-slate-400">
        {label}
      </p>

      <p className="text-xl font-bold mt-1">
        {value ?? "—"}
        {value !== null &&
          value !== undefined &&
          suffix}
      </p>

    </div>
  );
}

function SummaryCard({
  icon,
  title,
  value,
}) {
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

export default AdminAcademicVerification;