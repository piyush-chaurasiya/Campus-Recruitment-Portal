import { Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

import StudentDashboard from "./pages/student/StudentDashboard";
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import PlacementDashboard from "./pages/placement/PlacementDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";

import StudentLayout from "./pages/student/StudentLayout";
import RecruiterLayout from "./pages/recruiter/RecruiterLayout";
import PlacementLayout from "./pages/placement/PlacementLayout";
import AdminLayout from "./pages/admin/AdminLayout";
import StudentJobs from "./pages/student/StudentJobs";
import StudentJobDetails from "./pages/student/StudentJobDetails";
import StudentApplications from "./pages/student/StudentApplications";
import StudentResume from "./pages/student/StudentResume";
import StudentInterviews from "./pages/student/StudentInterviews";
import StudentNotifications from "./pages/student/StudentNotifications";
import StudentSettings from "./pages/student/StudentSettings";

import AdminAcademicVerification from "./pages/admin/AdminAcademicVerification";
import AdminJobVerification from "./pages/admin/AdminJobVerification";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminNotifications from "./pages/admin/AdminNotifications";
import AdminAuditLogs from "./pages/admin/AdminAuditLogs";
import Profile from "./pages/student/Profile";


function Unauthorized() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold">403</h1>

        <p className="text-slate-400 mt-3">
          You are not authorized to access this page.
        </p>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>

      {/* LOGIN */}
      <Route path="/login" element={<Login />} />

      {/* STUDENT */}
      <Route
          path="/student"
          element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <StudentLayout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={<StudentDashboard />}
          />

          <Route
            path="profile"
            element={<Profile />}
          />

          <Route
            path="jobs"
            element={<StudentJobs />}
          />

          <Route
            path="jobs/:id"
            element={<StudentJobDetails />}
          />

          <Route
            path="applications"
            element={<StudentApplications />}
          />

          <Route
            path="resume"
            element={<StudentResume />}
          />

          <Route
            path="interviews"
            element={<StudentInterviews />}
          />

          <Route
            path="notifications"
            element={<StudentNotifications />}
          />

          <Route
            path="settings"
            element={<StudentSettings />}
          />
        </Route>

      {/* RECRUITER */}
      <Route
        path="/recruiter"
        element={
          <ProtectedRoute allowedRoles={["RECRUITER"]}>
            <RecruiterLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<RecruiterDashboard />} />
      </Route>

      {/* PLACEMENT OFFICER */}
      <Route
        path="/placement"
        element={
          <ProtectedRoute allowedRoles={["PLACEMENT_OFFICER"]}>
            <PlacementLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<PlacementDashboard />} />
      </Route>

      {/* ADMIN */}    
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route
          index
          element={<AdminDashboard />}
        />

        <Route
          path="users"
          element={<AdminUsers />}
        />

        <Route
          path="students"
          element={
            <AdminUsers defaultRole="STUDENT" />
          }
        />

        <Route
          path="recruiters"
          element={
            <AdminUsers defaultRole="RECRUITER" />
          }
        />

        <Route
          path="officers"
          element={
            <AdminUsers
              defaultRole="PLACEMENT_OFFICER"
            />
          }
        />

        <Route
          path="academic-verification"
          element={<AdminAcademicVerification />}
        />

        <Route
          path="job-verification"
          element={<AdminJobVerification />}
        />

        <Route
          path="notifications"
          element={<AdminNotifications />}
        />

        <Route
          path="logs"
          element={<AdminAuditLogs />}
        />

        <Route
          path="settings"
          element={<AdminSettings />}
        />
      </Route>

      {/* UNAUTHORIZED */}
      <Route
        path="/unauthorized"
        element={<Unauthorized />}
      />

      {/* UNKNOWN URL */}
      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />

    </Routes>
  );
}

export default App;