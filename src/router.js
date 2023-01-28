import { createBrowserRouter } from "react-router-dom";

import AddData from "./pages/AddData";
import Search from "./pages/Search";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";

const router = createBrowserRouter([
  { path: "/", element: <Dashboard />, errorElement: <Error /> },
  { path: "/data/newdata", element: <AddData />, errorElement: <Error /> },
  { path: "/data", element: <Search />, errorElement: <Error /> },
]);

export default router;
