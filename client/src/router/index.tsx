import { useRoutes } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import Login from "../pages/Login/Login";
import PrivateRouteInverse from "../components/PrivateRouteInverse/PrivateRouteInverse";
import Register from "../pages/Register/Register";
import AddBook from "../pages/AddBook/AddBook";
import Home from "../pages/Home/Home";

function Router() {
  const routes = [
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/add-book",
          element: <AddBook />,
        },
      ],
    },
    {
      element: <PrivateRouteInverse />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/*",
          element: <Login />,
        },
      ],
    },
  ];
  return useRoutes(routes);
}

export default Router;
