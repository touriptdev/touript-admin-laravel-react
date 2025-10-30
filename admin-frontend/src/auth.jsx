import { createContext, useContext, useState, useEffect } from 'react';
import api, { setAuthToken } from './api';
import axios from "axios";

const AuthCtx = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

//   useEffect(() => {
//     const t = localStorage.getItem('token');
//     if (t) {
//       setToken(t);
//       setAuthToken(t);
//       api
//         // .get('/me')
//         .then((r) => setUser(r.data))
//         .catch(() => logout());
//     }
//   }, []);

    async function login(email, password) {
    // return api.post('/admin/login', { email, password }).then((r) => {
    //   setToken(r.data.token);
    //   localStorage.setItem('token', r.data.token);
    //   setAuthToken(r.data.token);
    //   setUser(r.data.user);
    // });

      // IMPORTANT: return the axios promise (or await it and return)
        const res = await axios.post("/api/admin/login", { email, password }, {
            headers: { "Content-Type": "application/json" },
        });
        const { token } = res.data || {};
        if (!token) throw new Error("Token missing from /api/admin/login");
        localStorage.setItem("ra_token", token);   // keep the same key your AdminApp uses
        return true;
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
