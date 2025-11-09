/*
import * as React from "react";
import { Admin, Resource } from "react-admin";
import { createTheme } from "@mui/material/styles";
import dataProvider from "./dataProvider";
import authProvider from "./authProvider";
import { PostList, PostEdit, PostCreate, PostShow } from "../resources/Posts";
import { UserList, UserEdit, UserCreate } from "../resources/Users";
import ArticleIcon from "@mui/icons-material/Article";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

const theme = createTheme({ palette: { mode: "light" } });

export default function AdminApp() {
  return (
    <Admin
      basename="/admin-app"
      theme={theme}
      dataProvider={dataProvider}
      authProvider={authProvider}
    >
      <Resource
        name="posts"
        list={PostList}
        edit={PostEdit}
        show={PostShow}
        create={PostCreate}
        icon={ArticleIcon}
        recordRepresentation="title"
      />
      <Resource
        name="users"
        list={UserList}
        edit={UserEdit}
        create={UserCreate}
        icon={PeopleAltIcon}
        recordRepresentation="email"
      />
    </Admin>
  );
}
*/
import * as React from "react";
import { Admin, Resource } from "react-admin";
import dataProvider from "./dataProvider";
import authProvider from "./authProvider";
import { lightTheme, darkTheme } from "./Theme";
import MyLayout from "./layout";
import Dashboard from "./Dashboard";
import { PostList, PostEdit, PostCreate, PostShow } from "../resources/Posts";
import { UserList, UserEdit, UserCreate } from "../resources/users";
import ArticleIcon from "@mui/icons-material/Article";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

export default function AdminApp() {
  return (
    <Admin
      basename="/admin-app"
      dataProvider={dataProvider}
      authProvider={authProvider}
      layout={MyLayout}
      theme={lightTheme}
      darkTheme={darkTheme}
      dashboard={Dashboard}
    >
      <Resource
        name="posts"
        list={PostList}
        edit={PostEdit}
        create={PostCreate}
        show={PostShow}
        icon={ArticleIcon}
        recordRepresentation="title"
      />
      <Resource
        name="users"
        list={UserList}
        edit={UserEdit}
        create={UserCreate}
        icon={PeopleAltIcon}
        recordRepresentation="email"
      />
    </Admin>
  );
}
