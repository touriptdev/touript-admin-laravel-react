import {
  List, Datagrid, TextField, DateField, Edit, SimpleForm, TextInput,
  Create, Show, SimpleShowLayout, TopToolbar, CreateButton, ExportButton, EditButton,
  ImageInput, ImageField
} from "react-admin";
import { Grid } from "@mui/material";
import { listFilters } from "./commonFilters";

const ListActions = () => (
  <TopToolbar>
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

export const PostList = () => (
  <List perPage={25} filters={listFilters} actions={<ListActions />}>
    <Datagrid rowClick="edit" bulkActionButtons={false} size="small"
      sx={{ "& .RaDatagrid-headerCell": { fontWeight: 700 } }}>
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="status" />
      <DateField source="created_at" />
      <DateField source="updated_at" />
      <EditButton />
    </Datagrid>
  </List>
);

export const PostCreate = () => (
<Create sx={{ "& .RaCreate-main": { maxWidth: "100%", margin: 0 } }}>
        <SimpleForm>
            <Grid container spacing={2}>
                <Grid item xs={12} md={8}><TextInput source="title" fullWidth /></Grid>
                <Grid item xs={12} md={4}><TextInput source="slug" fullWidth /></Grid>
                <Grid item xs={12}><TextInput source="content" fullWidth multiline minRows={6} /></Grid>
                <Grid item xs={12} md={6}>
                    <ImageInput source="cover_image" label="Cover Image" accept="image/*">
                        <ImageField source="src" title="title" />
                    </ImageInput>
                </Grid>
            </Grid>
        </SimpleForm>
    </Create>
);
