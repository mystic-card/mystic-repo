import { createBrowserRouter, redirect } from "react-router-dom";
import { Login } from "./views/Login";
import { Register } from "./views/Register";
import { Home } from "./views/Home";
import Battle from "./views/Battle"
import { WaitingRoom } from "./views/WaitingRoom";
import App from "./App";

function loginChecked() {
  if (!localStorage.access_token) {
    return redirect("/login");
  }

  return null;
}

function notLoginChecked() {
  if(localStorage.access_token) {
    return redirect("/")
  }

  return null
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
        loader: loginChecked,
      },
      {
        path: "login",
        element: <Login />,
        loader: notLoginChecked,
      },
      {
        path: "register",
        element: <Register />,
        loader: notLoginChecked,
      },
      {
        path: "room",
        element: <Battle />,
        loader: loginChecked
      },
      {
        path: "waiting",
        element: <WaitingRoom />
      }
    ]
  }
]);

export default router;
