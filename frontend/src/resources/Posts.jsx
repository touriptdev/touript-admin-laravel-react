import {
  List, Datagrid, TextField, DateField,
  Edit, SimpleForm, TextInput, Create, Show, SimpleShowLayout,
} from "react-admin";

export const PostList = () => (
  <List perPage={25}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="status" />
      <DateField source="created_at" />
      <DateField source="updated_at" />
    </Datagrid>
  </List>
);

export const PostEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="title" fullWidth />
      <TextInput source="slug" fullWidth />
      <TextInput source="status" />
      <TextInput source="body" multiline fullWidth />
    </SimpleForm>
  </Edit>
);

export const PostCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="title" fullWidth />
      <TextInput source="slug" fullWidth />
      <TextInput source="status" />
      <TextInput source="body" multiline fullWidth />
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
