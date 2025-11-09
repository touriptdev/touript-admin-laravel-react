import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#2563eb" },   // brand blue
    secondary: { main: "#14b8a6" }, // teal
    background: { default: "#f7f8fa", paper: "#ffffff" },
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: `'Inter', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial`,
    h5: { fontWeight: 700 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiPaper: { styleOverrides: { root: { boxShadow: "0 6px 20px rgba(0,0,0,0.06)" } } },
    MuiCard:  { styleOverrides: { root: { borderRadius: 18 } } },
    MuiTableCell: { styleOverrides: { root: { borderBottomColor: "#eef1f6" } } },
    MuiButton: { styleOverrides: { root: { borderRadius: 12, paddingInline: 16 } } },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#60a5fa" },
    secondary: { main: "#2dd4bf" },
    background: { default: "#0b1220", paper: "#0f172a" },
  },
  shape: { borderRadius: 14 },
  components: {
    MuiPaper: { styleOverrides: { root: { boxShadow: "0 6px 20px rgba(0,0,0,0.35)" } } },
    MuiTableCell: { styleOverrides: { root: { borderBottomColor: "rgba(255,255,255,0.08)" } } },
  },
});
