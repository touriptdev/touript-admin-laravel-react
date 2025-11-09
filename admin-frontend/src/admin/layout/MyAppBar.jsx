import * as React from "react";
import { AppBar, TitlePortal, ToggleThemeButton, UserMenu } from "react-admin";
import { Box, Typography } from "@mui/material";

const MyAppBar = (props) => (
  <AppBar {...props}>
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, px: 2 }}>
      <img src="/logo192.png" alt="logo" width={28} height={28} style={{ borderRadius: 8 }} />
      <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: 0.2 }}>
        Touript Admin
      </Typography>
      <TitlePortal />
    </Box>
    <Box sx={{ flex: 1 }} />
    <ToggleThemeButton />
    <UserMenu />
  </AppBar>
);

export default MyAppBar;
