const TOKEN_KEY = "ra_token";

const authProvider = {
  login: async ({ username, password }) => {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: username, password }),
    });
    if (!res.ok) throw new Error("Invalid credentials");
    const { token } = await res.json();
    if (!token) throw new Error("Token missing");
    localStorage.setItem(TOKEN_KEY, token);
    return;
  },

  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
  },

  checkAuth: () => {
    return localStorage.getItem(TOKEN_KEY) ? Promise.resolve() : Promise.reject();
  },

  checkError: (error) => {
    const status = error?.status || error?.response?.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem(TOKEN_KEY);
      return Promise.reject();
    }
    return Promise.resolve();
  },

  getIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return {};
    const res = await fetch("/api/admin/me", { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) return {};
    const me = await res.json();
    return {
      id: me.id,
      fullName: me.name || me.email,
      avatar: me.avatar_url,
    };
  },

  getPermissions: async () => {
    // optional: you can return 'admin' or role from /me
    return "admin";
  },
};

export default authProvider;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
