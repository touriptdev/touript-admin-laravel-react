import { BrowserRouter } from "react-router-dom";
import  PageRouter from "./routes/pageRouter";

export default function App() {
  return (
    <BrowserRouter>
      <PageRouter />
    </BrowserRouter>
  );
}
