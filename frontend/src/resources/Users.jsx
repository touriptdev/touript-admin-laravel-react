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
