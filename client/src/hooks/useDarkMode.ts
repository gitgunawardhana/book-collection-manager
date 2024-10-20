import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const useDarkMode = () => {
  const mode = useSelector((state: RootState) => state.theme.mode);

  useEffect(() => {
    if (mode) {
      document.body.classList.add("dark");
      document.documentElement.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);
};

export default useDarkMode;
