import { createBrowserRouter, redirect } from "react-router-dom";
import { Login } from "./views/Login";
import { Register } from "./views/Register";
import { Home } from "./views/Home";
import Battle from "./views/Battle"

function loginChecked() {
  if (!localStorage.access_token) {
    return redirect("/login");
  }

  return null;
}

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <Home />,
    loader: loginChecked,
  },
  {
    path: "/room",
    element: <Battle />,
    loader: loginChecked
  }
]);

export default router;
