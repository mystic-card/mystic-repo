import { createBrowserRouter } from "react-router-dom";
import { Login } from "./views/Login";
import { Register } from "./views/Register";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
