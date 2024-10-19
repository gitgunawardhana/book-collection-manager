import { useRoutes } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import Login from "../pages/Login";
import PrivateRouteInverse from "../components/PrivateRouteInverse";
import Register from "../pages/Register";
import BookList from "../components/BookList";
import AddBook from "../pages/AddBook";
import Home from "../pages/Home";

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
