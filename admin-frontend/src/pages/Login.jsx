/*
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
*/
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

/*
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
*/

import * as React from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link as MuiLink,
  Paper,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useAuth } from "../auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = React.useState("admin@example.com"); // default demo
  const [password, setPassword] = React.useState("secret123");   // default demo
  const [showPassword, setShowPassword] = React.useState(false);
  const [remember, setRemember] = React.useState(true);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      // Simple front-end validation
      if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        throw new Error("Please enter a valid email address.");
      }
      if (!password) {
        throw new Error("Please enter your password.");
      }

      await login(email, password);
      // Optionally persist email if "remember me" checked
      if (remember) localStorage.setItem("admin_last_email", email);
      else localStorage.removeItem("admin_last_email");

      navigate("/", { replace: true });
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Login failed. Please try again.";
      setError(msg);
      console.error("Login error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  React.useEffect(() => {
    const last = localStorage.getItem("admin_last_email");
    if (last) setEmail(last);
  }, []);

  return (
    <Container component="main" maxWidth="xs" sx={{ minHeight: "100dvh", display: "grid", placeItems: "center" }}>
      <Paper elevation={6} sx={{ p: 4, width: "100%", borderRadius: 3 }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ fontWeight: 700 }}>
            Admin Sign In
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Use your administrator credentials
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3, display: "grid", gap: 2 }}>
          <TextField
            label="Email"
            type="email"
            value={email}
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
          />

          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((s) => !s)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
            }
            label="Remember me"
          />

          {error ? (
            <Typography variant="body2" color="error" sx={{ mt: 0.5 }}>
              {error}
            </Typography>
          ) : null}

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={submitting}
            sx={{ mt: 1, py: 1.2, borderRadius: 2 }}
            fullWidth
          >
            {submitting ? (
              <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}>
                <CircularProgress size={20} thickness={5} />
                Signing in…
              </Box>
            ) : (
              "Sign In"
            )}
          </Button>

          {/* Optional links */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 1,
            }}
          >
            <MuiLink href="#" variant="body2" underline="hover" onClick={(e) => e.preventDefault()}>
              Forgot password?
            </MuiLink>
            <MuiLink href="/" variant="body2" underline="hover">
              Back to site
            </MuiLink>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
