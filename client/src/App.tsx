import { BrowserRouter, Link } from "react-router-dom";
import Router from "./router";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "./features/auth/authSlice";
import useDarkMode from "./hooks/useDarkMode";
import { ToastContainer } from "react-toastify";

function App() {
  useDarkMode();

  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      dispatch(loadUser());
    }
  }, [dispatch]);
  return (
    <>
      <BrowserRouter>
      <ToastContainer />
        <Navbar />
        <Router />
      </BrowserRouter>
    </>
  );
}

export default App;
