import * as React from "react";
import { Menu, useSidebarState } from "react-admin";
import ArticleIcon from "@mui/icons-material/Article";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import EventIcon from "@mui/icons-material/Event";
import InfoIcon from "@mui/icons-material/Info";
import DashboardIcon from "@mui/icons-material/SpaceDashboard";
import Divider from "@mui/material/Divider";

const MyMenu = () => {
  const [open] = useSidebarState();
  return (
    <Menu>
      <Menu.Item to="/admin-app/" primaryText="Dashboard" leftIcon={<DashboardIcon />} />
      <Divider sx={{ my: 1, mx: open ? 2 : 1 }} />
      <Menu.ResourceItem name="posts" options={{ label: "Posts" }} leftIcon={<ArticleIcon />} />
      <Menu.ResourceItem name="users" options={{ label: "Users" }} leftIcon={<PeopleAltIcon />} />
      <Menu.Item to="/events" primaryText="Events" leftIcon={<EventIcon />} />
      <Menu.Item to="/about" primaryText="About" leftIcon={<InfoIcon />} />
    </Menu>
  );
};

export default MyMenu;
