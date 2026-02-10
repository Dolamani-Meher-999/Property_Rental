import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useState, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

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



// Context
import { AuthProvider, useAuth } from "./context/AuthContext";

// Error Fallback Component
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert" style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      padding: '20px',
      textAlign: 'center',
      backgroundColor: '#ffebee',
      color: '#d32f2f'
    }}>
      <h2>Something went wrong</h2>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

// Theme
const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
    background: { default: '#f5f5f5' },
  },
});

// Protected Route
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, user } = useAuth();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 100);
    return () => clearTimeout(timer);
  }, [isAuthenticated, loading]);

  if (loading || !showContent) {
    return <p style={{ textAlign: "center", marginTop: "40vh" }}>Loading...</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/landing" replace />;
  }

  return children;
};

// 🔥 ROLE BASED REDIRECT (NEW)
const RoleRedirect = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  if (user.role === "owner") {
    return <Navigate to="/owner/dashboard" replace />;
  }

  if (user.role === "tenant") {
    return <Navigate to="/tenant/dashboard" replace />;
  }

  if (user.role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Navigate to="/landing" replace />;
};

// Public Route
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/" replace />;
  return children;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Routes>

            <Route path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />

            <Route path="/register" element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            } />

            <Route path="/landing" element={<Landing />} />

            {/* SMART ROOT ROUTE */}
            <Route path="/" element={
              <ProtectedRoute>
                <RoleRedirect />
              </ProtectedRoute>
            } />

            {/* TENANT */}
            <Route path="/tenant/dashboard" element={
              <ProtectedRoute>
                <TenantDashboard />
              </ProtectedRoute>
            } />

            {/* OWNER */}
            <Route path="/owner/dashboard" element={
              <ProtectedRoute>
                <OwnerDashboard />
              </ProtectedRoute>
            } />

            {/* ADMIN */}
            <Route path="/admin/dashboard" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />

            <Route path="*" element={<Navigate to="/landing" replace />} />
            <Route path="/admin/properties" element={<AdminAllProperties />} />
            <Route path="/admin/pending" element={<AdminPending />} />
            <Route path="/admin/owners" element={<AdminOwners />} />
            <Route path="/admin/messages" element={<AdminMessages />} />



          </Routes>
        </ErrorBoundary>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
