import { Layout } from "react-admin";
import MyAppBar from "./MyAppBar";
import MyMenu from "./MyMenu";

export default function MyLayout(props) {
  return <Layout {...props} appBar={MyAppBar} menu={MyMenu} />;
}
