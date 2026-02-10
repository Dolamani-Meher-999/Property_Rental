// import { createContext, useContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   // Check if user is logged in on initial load
// useEffect(() => {
//   const checkAuth = async () => {
//     console.log('Checking authentication status...');
//     try {
//       const token = localStorage.getItem('token');
//       console.log('Token found in localStorage:', !!token);
      
//       if (token) {
//         axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//         const response = await axios.get('/api/auth/me');
//         console.log('User data received:', response.data);
//         setUser(response.data);
//       }
//     } catch (err) {
//       console.error('Auth check failed:', err);
//       localStorage.removeItem('token');
//       delete axios.defaults.headers.common['Authorization'];
//     } finally {
//       setLoading(false);
//     }
//   };

//   checkAuth();
// }, []);

//   // Login function
// //   const login = async (email, password) => {
// //     try {
// //       setError(null);
// //       const response = await axios.post('/api/auth/login', { email, password });
// //       const { token, user } = response.data;
      
// //       localStorage.setItem('token', token);
// //       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
// //       setUser(user);
// //       navigate('/');
      
// //       return { success: true };
// //     } catch (err) {
// //       const errorMessage = err.response?.data?.message || 'Login failed. Please try again.';
// //       setError(errorMessage);
// //       return { success: false, error: errorMessage };
// //     }
// //   };

//     // In AuthContext.jsx, update the login function to:
// const login = async (email, password) => {
//   console.log('Attempting login with:', { email });
//   try {
//     setError(null);
//     const response = await axios.post('/api/auth/login', { email, password });
//     const { token, ...userData } = response.data;
    
//     localStorage.setItem('token', token);
//     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//     setUser(userData);
//     navigate('/');
//     return { success: true };
//   } catch (err) {
//     console.error('Login error:', err);
//     const errorMessage = err.response?.data?.message || 'Login failed. Please check your credentials and try again.';
//     setError(errorMessage);
//     return { success: false, error: errorMessage };
//   }
// };

//   // Register function
//   const register = async (userData) => {
//     try {
//       setError(null);
//       const response = await axios.post('/api/auth/register', userData);
//       return { success: true, data: response.data };
//     } catch (err) {
//       const errorMessage = err.response?.data?.message || 'Registration failed. Please try again.';
//       setError(errorMessage);
//       return { success: false, error: errorMessage };
//     }
//   };

//   // Logout function
//   const logout = () => {
//     localStorage.removeItem('token');
//     delete axios.defaults.headers.common['Authorization'];
//     setUser(null);
//     navigate('/login');
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         loading,
//         error,
//         isAuthenticated: !!user,
//         login,
//         register,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export default AuthContext;
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check auth on load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const res = await axios.get('/api/auth/me');
          setUser(res.data);
        }
      } catch {
        sessionStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  // 🔥 FIXED LOGIN (no navigation here)
  const login = async (email, password) => {
    try {
      setError(null);
      const response = await axios.post('/api/auth/login', { email, password });

      const { token, user } = response.data;

      sessionStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);

      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed';
      setError(msg);
      return { success: false };
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      setError(null);
      setLoading(true);
      const response = await axios.post('/api/auth/register', userData);
      setLoading(false);
      return { success: true, data: response.data };
    } catch (err) {
      setLoading(false);
      const msg = err.response?.data?.message || 'Registration failed';
      setError(msg);
      return { success: false, error: msg };
    }
  };

  const logout = () => {
    sessionStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      error,
      isAuthenticated: !!user,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
