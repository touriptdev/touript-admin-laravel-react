import { useState } from 'react';
import { useAuth } from '../auth';
import { useNavigate } from 'react-router-dom';


export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('secret123');

 const submit = async (e) => {
  e.preventDefault();
  try {
    const res = await login(email, password);
    console.log("Login response:", res);
    navigate("/admin-app/");  // you can also use /admin-app/
  } catch (err) {
    const status = err?.response?.status ?? "network";
    const msg = err?.response?.data?.message || err.message || "Login failed";
    alert(`Login failed (${status}): ${msg}`);
    console.error("Login error:", err);
  }
};
/*
const submit = async (e) => {
  e.preventDefault();
  try {
    await login(email, password); // from your auth.js
    nav('/admin');
  } catch (err) {
    const msg =
      err?.response?.data?.message ||
      `Login failed (${err?.response?.status || 'network'}): ${err?.message}`;
    alert(msg);
    console.error('Login error:', err);
  }
};
*/
  /*
const submit = async (e) => {
  e.preventDefault();
  try {
    await login(email, password);   // uses api.post('/login', ...)
    nav('/admin');
  } catch (err) {
    const status = err?.response?.status ?? 'network';
    const msg = err?.response?.data?.message || err?.message || 'Unknown';
    alert(`Login failed (${status}): ${msg}`);
    console.error('Login error:', err);
  }
};
*/

  return (
    <form onSubmit={submit}>
      <h1>Login Admin</h1>

      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="EMail"
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />

      <button type="submit">Login</button>
    </form>
  );
}
