/*
import {
  List, Datagrid, TextField, DateField,
  Edit, SimpleForm, TextInput, Create,
} from "react-admin";

export const UserList = () => (
  <List perPage={25}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="email" />
      <TextField source="role" />
      <DateField source="created_at" />
    </Datagrid>
  </List>
);

export const UserEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="email" />
      <TextInput source="role" />
    </SimpleForm>
  </Edit>
);

export const UserCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="email" />
      <TextInput source="password" type="password" />
      <TextInput source="role" />
    </SimpleForm>
  </Create>
);
*/

import {
  List, Datagrid, TextField, DateField, Edit, SimpleForm, TextInput, Create, EditButton,
} from "react-admin";
import { listFilters } from "./commonFilters";
import { Grid } from "@mui/material";

export const UserList = () => (
  <List perPage={25} filters={listFilters}>
    <Datagrid rowClick="edit" bulkActionButtons={false} size="small">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="email" />
      <TextField source="role" />
      <DateField source="created_at" />
      <EditButton />
    </Datagrid>
  </List>
);

export const UserEdit = () => (
  <Edit>
    <SimpleForm>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}><TextInput source="name" fullWidth /></Grid>
        <Grid item xs={12} md={6}><TextInput source="email" fullWidth /></Grid>
        <Grid item xs={12} md={6}><TextInput source="role" fullWidth /></Grid>
        {/* leave password blank unless updating */}
        <Grid item xs={12} md={6}><TextInput source="password" type="password" fullWidth /></Grid>
      </Grid>
    </SimpleForm>
  </Edit>
);

export const UserCreate = () => (
  <Create>
    <SimpleForm>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}><TextInput source="name" fullWidth /></Grid>
        <Grid item xs={12} md={6}><TextInput source="email" fullWidth /></Grid>
        <Grid item xs={12} md={6}><TextInput source="role" fullWidth /></Grid>
        <Grid item xs={12} md={6}><TextInput source="password" type="password" fullWidth /></Grid>
      </Grid>
    </SimpleForm>
  </Create>
);
