import {
  List, Datagrid, TextField, DateField, Edit, SimpleForm, TextInput,
  Create, Show, SimpleShowLayout, TopToolbar, CreateButton, ExportButton, EditButton
} from "react-admin";
import { listFilters } from "./commonFilters";
import { Grid } from "@mui/material";

const ListActions = () => (
  <TopToolbar>
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

export const PostList = () => (
  <List perPage={25} filters={listFilters} actions={<ListActions />}>
    <Datagrid rowClick="edit" bulkActionButtons={false} size="small" sx={{
      "& .RaDatagrid-headerCell": { fontWeight: 700 },
    }}>
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="status" />
      <DateField source="created_at" />
      <DateField source="updated_at" />
      <EditButton />
    </Datagrid>
  </List>
);

export const PostEdit = () => (
  <Edit>
    <SimpleForm>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}><TextInput source="title" fullWidth /></Grid>
        <Grid item xs={12} md={4}><TextInput source="slug" fullWidth /></Grid>
        <Grid item xs={12} md={4}><TextInput source="status" fullWidth /></Grid>
        <Grid item xs={12}><TextInput source="body" fullWidth multiline minRows={6} /></Grid>
      </Grid>
    </SimpleForm>
  </Edit>
);

export const PostCreate = () => (
  <Create>
    <SimpleForm>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}><TextInput source="title" fullWidth /></Grid>
        <Grid item xs={12} md={4}><TextInput source="slug" fullWidth /></Grid>
        <Grid item xs={12} md={4}><TextInput source="status" fullWidth /></Grid>
        <Grid item xs={12}><TextInput source="body" fullWidth multiline minRows={6} /></Grid>
      </Grid>
    </SimpleForm>
  </Create>
);

export const PostShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="slug" />
      <TextField source="status" />
      <TextField source="body" />
      <DateField source="created_at" />
      <DateField source="updated_at" />
    </SimpleShowLayout>
  </Show>
);
