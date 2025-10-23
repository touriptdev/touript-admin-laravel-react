import { createContext, useContext, useState, useEffect } from 'react';
import api, { setAuthToken } from './api';

const AuthCtx = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const t = localStorage.getItem('token');
    if (t) {
      setToken(t);
      setAuthToken(t);
      api
        .get('/me')
        .then((r) => setUser(r.data))
        .catch(() => logout());
    }
  }, []);

  function login(email, password) {
    return api.post('/login', { email, password }).then((r) => {
      setToken(r.data.token);
      localStorage.setItem('token', r.data.token);
      setAuthToken(r.data.token);
      setUser(r.data.user);
    });
  }

  function logout() {
    localStorage.removeItem('token');
    setAuthToken(null);
    setUser(null);
    setToken(null);
  }

  return (
    <AuthCtx.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}

export const useAuth = () => useContext(AuthCtx);
