import * as React from "react";
import { TextInput } from "react-admin";
import { Chip } from "@mui/material";

const QuickFilter = ({ label }) => <Chip sx={{ my: 0.5 }} size="small" label={label} />;

export const listFilters = [
  <TextInput source="q" label="Search" alwaysOn resettable />,
  // <TextInput source="status" label="Status" />,
  // <QuickFilter label="Published" source="status" defaultValue="published" />
];
