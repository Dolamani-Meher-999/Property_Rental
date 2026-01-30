// import { Routes, Route, Navigate } from 'react-router-dom';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import { useState, useEffect } from 'react';
// import { ErrorBoundary } from 'react-error-boundary';

// // Error Fallback Component
// function ErrorFallback({ error, resetErrorBoundary }) {
//   return (
//     <div role="alert" style={{
//       display: 'flex',
//       flexDirection: 'column',
//       justifyContent: 'center',
//       alignItems: 'center',
//       height: '100vh',
//       padding: '20px',
//       textAlign: 'center',
//       backgroundColor: '#ffebee',
//       color: '#d32f2f'
//     }}>
//       <h2>Something went wrong</h2>
//       <pre style={{ color: '#d32f2f', whiteSpace: 'pre-wrap' }}>{error.message}</pre>
//       <button 
//         onClick={resetErrorBoundary}
//         style={{
//           marginTop: '20px',
//           padding: '10px 20px',
//           backgroundColor: '#1976d2',
//           color: 'white',
//           border: 'none',
//           borderRadius: '4px',
//           cursor: 'pointer'
//         }}
//       >
//         Try again
//       </button>
//     </div>
//   );
// }

// // Pages
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Landing from "./pages/Landing";
// import TenantDashboard from "./pages/tenant/Dashboard/Dashboard";

// // Context
// import { AuthProvider, useAuth } from "./context/AuthContext";

// // Theme
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#1976d2',
//     },
//     secondary: {
//       main: '#dc004e',
//     },
//     background: {
//       default: '#f5f5f5',
//     },
//   },
//   typography: {
//     fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
//   },
// });

// // Protected Route Component
// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated, loading, user } = useAuth();
//   const [showContent, setShowContent] = useState(false);

//   useEffect(() => {
//     console.log('ProtectedRoute - Auth state:', { isAuthenticated, loading });
//     const timer = setTimeout(() => {
//       setShowContent(true);
//     }, 100);
//     return () => clearTimeout(timer);
//   }, [isAuthenticated, loading]);

//   if (loading || !showContent) {
//     return (
//       <div style={{
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: '100vh',
//         width: '100vw',
//         backgroundColor: '#f5f5f5'
//       }}>
//         <div style={{ 
//           width: '50px', 
//           height: '50px', 
//           border: '5px solid #f3f3f3',
//           borderTop: '5px solid #3498db',
//           borderRadius: '50%',
//           animation: 'spin 1s linear infinite',
//           marginBottom: '20px'
//         }}></div>
//         <style>
//           {`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}
//         </style>
//         <p>Loading your dashboard...</p>
//       </div>
//     );
//   }

//   if (!isAuthenticated) {
//     console.log('User not authenticated, redirecting to landing');
//     return <Navigate to="/landing" replace />;
//   }

//   console.log('Rendering protected content for user:', user?.role);
//   return children;
// };

// // Public Route Component
// const PublicRoute = ({ children }) => {
//   const { isAuthenticated } = useAuth();
  
//   if (isAuthenticated) {
//     return <Navigate to="/" replace />;
//   }
  
//   return children;
// };

// function App() {
//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <AuthProvider>
//         <ErrorBoundary
//           FallbackComponent={ErrorFallback}
//           onReset={() => window.location.reload()}
//         >
//           <Routes>
//             <Route path="/login" element={
//               <PublicRoute>
//                 <Login />
//               </PublicRoute>
//             } />
//             <Route path="/register" element={
//               <PublicRoute>
//                 <Register />
//               </PublicRoute>
//             } />
//             <Route path="/landing" element={<Landing />} />
//             <Route path="/" element={
//               <ProtectedRoute>
//                 <TenantDashboard />
//               </ProtectedRoute>
//             }>
//               <Route index element={<Navigate to="/dashboard" replace />} />
//               <Route path="dashboard" element={<TenantDashboard />} />
              
//               {/* Tenant Routes */}
//               <Route path="properties" element={<div>Properties List</div>} />
//               <Route path="my-rentals" element={<div>My Rentals</div>} />
//               <Route path="favorites" element={<div>Favorites</div>} />
              
//               {/* Owner Routes */}
//               <Route path="my-properties" element={<div>My Properties</div>} />
//               <Route path="add-property" element={<div>Add Property</div>} />
//               <Route path="rental-requests" element={<div>Rental Requests</div>} />
              
//               {/* Admin Routes */}
//               <Route path="admin/properties" element={<div>Admin Properties</div>} />
//               <Route path="admin/users" element={<div>User Management</div>} />
//               <Route path="admin/approvals" element={<div>Pending Approvals</div>} />
              
//               {/* Common Routes */}
//               <Route path="profile" element={<div>Profile</div>} />
//               <Route path="settings" element={<div>Settings</div>} />
//             </Route>
//             <Route path="*" element={<Navigate to="/landing" replace />} />
//           </Routes>
//         </ErrorBoundary>
//       </AuthProvider>
//     </ThemeProvider>
//   );
// }

// export default App;
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
                <div>Admin Dashboard</div>
              </ProtectedRoute>
            } />

            <Route path="*" element={<Navigate to="/landing" replace />} />

          </Routes>
        </ErrorBoundary>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
