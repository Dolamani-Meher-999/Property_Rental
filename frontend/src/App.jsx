import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ErrorBoundary } from "react-error-boundary";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";
import TenantDashboard from "./pages/tenant/Dashboard/Dashboard";
import OwnerDashboard from "./pages/owner/OwnerDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminAllProperties from "./pages/admin/AdminAllProperties";
import AdminPending from "./pages/admin/AdminPending";
import AdminOwners from "./pages/admin/AdminOwners";
import AdminMessages from "./pages/admin/AdminMessages";
import PropertyDetail from "./pages/tenant/PropertyDetail";
import ChatPage from "./pages/chat/ChatPage";

// Context
import { AuthProvider, useAuth } from "./context/AuthContext";

// Error fallback
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div style={{ padding: 40 }}>
      <h2>Something went wrong</h2>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

// Theme
const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    background: { default: "#f5f5f5" }
  }
});

// ✅ SAFE ProtectedRoute
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <p style={{ textAlign: "center", marginTop: "40vh" }}>Loading...</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// ✅ SAFE RoleRedirect
const RoleRedirect = () => {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) return <Navigate to="/login" replace />;

  if (user.role === "tenant") return <Navigate to="/tenant/dashboard" replace />;
  if (user.role === "owner") return <Navigate to="/owner/dashboard" replace />;
  if (user.role === "admin") return <Navigate to="/admin/dashboard" replace />;

  return <Navigate to="/landing" replace />;
};

// ✅ SAFE PublicRoute
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null;

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Routes>
            {/* PUBLIC */}
            <Route path="/landing" element={<Landing />} />

            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />

            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />

            {/* ROOT */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <RoleRedirect />
                </ProtectedRoute>
              }
            />

            {/* TENANT */}
            <Route
              path="/tenant/dashboard"
              element={
                <ProtectedRoute>
                  <TenantDashboard />
                </ProtectedRoute>
              }
            />

            <Route path="/chat" element={<ChatPage />} />

            {/* PROPERTY DETAIL */}
            <Route
              path="/property/:id"
              element={
                <ProtectedRoute>
                  <PropertyDetail />
                </ProtectedRoute>
              }
            />

            {/* OWNER */}
            <Route
              path="/owner/dashboard"
              element={
                <ProtectedRoute>
                  <OwnerDashboard />
                </ProtectedRoute>
              }
            />

            {/* ADMIN */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            <Route path="/admin/properties" element={<AdminAllProperties />} />
            <Route path="/admin/pending" element={<AdminPending />} />
            <Route path="/admin/owners" element={<AdminOwners />} />
            <Route path="/admin/messages" element={<AdminMessages />} />

            <Route path="*" element={<Navigate to="/landing" replace />} />
          </Routes>
        </ErrorBoundary>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

