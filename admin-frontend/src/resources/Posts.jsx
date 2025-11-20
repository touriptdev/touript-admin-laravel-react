import {
  List, Datagrid, TextField, DateField, Edit, SimpleForm, TextInput,
  Create, Show, SimpleShowLayout, TopToolbar, CreateButton, ExportButton,
  EditButton, ImageInput, ImageField, DeleteButton
} from "react-admin";
import { Grid } from "@mui/material";
import { listFilters } from "./commonFilters";

// ----------------------
// LIST PAGE
// ----------------------
const ListActions = () => (
  <TopToolbar>
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

export const PostList = () => (
  <List perPage={25} filters={listFilters} actions={<ListActions />}>
    <Datagrid rowClick="edit" bulkActionButtons={false} size="small">
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="slug" />
      <TextField source="content" />

       {/* Image column */}
      <ImageField
        source="cover_image_url"   // or "cover_image" if that's your URL field
        label="Cover"
        sx={{
          "& img": {
            maxWidth: 80,
            maxHeight: 50,
            objectFit: "cover",
            borderRadius: 4,
          },
        }}
      />

      <DateField source="created_at" />
      <DateField source="updated_at" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

// ----------------------
// CREATE PAGE
// ----------------------
export const PostCreate = () => (
  <Create sx={{ "& .RaCreate-main": { maxWidth: "100%", margin: 0 } }}>
    <SimpleForm>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <TextInput source="title" fullWidth required />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="slug" fullWidth required />
        </Grid>
        <Grid item xs={12}>
          <TextInput
            source="content"
            fullWidth
            multiline
            minRows={6}
            required
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <ImageInput source="cover_image" label="Cover Image" accept="image/*">
            <ImageField source="src" title="title" />
          </ImageInput>
        </Grid>
      </Grid>
    </SimpleForm>
  </Create>
);

// ----------------------
// EDIT PAGE (REQUESTED)
// ----------------------
export const PostEdit = () => (
  <Edit
    sx={{ "& .RaEdit-main": { maxWidth: "100%", margin: 0 } }}
    mutationMode="pessimistic"
  >
    <SimpleForm>

      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <TextInput source="title" fullWidth required />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextInput source="slug" fullWidth required />
        </Grid>

        <Grid item xs={12}>
          <TextInput
            source="content"
            fullWidth
            multiline
            minRows={6}
            required
          />
        </Grid>

        {/* Show existing image */}
        <Grid item xs={12} md={6}>
          <ImageField source="cover_image_url" label="Current Image" />

          <ImageInput
            source="cover_image"
            label="Replace Image"
            accept="image/*"
          >
            <ImageField source="src" title="title" />
          </ImageInput>
        </Grid>
      </Grid>

    </SimpleForm>
  </Edit>
);

