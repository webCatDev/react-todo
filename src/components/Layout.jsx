import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/uiSlice";
import { createPortal } from "react-dom";

import { ThemeProvider, createTheme } from "@mui/material";


const Layout = ({ children }) => {
  const { isDarkMode } = useSelector((state) => state.ui);
  console.log(isDarkMode)
  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
    },
  });

  const dispatch = useDispatch();
  const toggleDarkMode = () => dispatch(uiActions.changeTheme());

  useEffect(() => {
    const html = document.querySelector("html");
    const { theme } = html.dataset;
    html.dataset.theme = theme === "dark" ? "" : "dark";
  }, [isDarkMode]);

  return (
    <ThemeProvider theme={theme}>
      <div className="main-container">
        <header>
          <h1>Webcat Task Manager</h1>
          {createPortal(
            <button className="dark-mode-btn" onClick={toggleDarkMode}>
              {!isDarkMode ? "🌙" : "🌞"}
            </button>,
            document.body
          )}
        </header>
        <main>{children}</main>
        <footer>
          <p>
            {`<Designed by webcatdev`}
            <span className="ninja-cat">🐱‍👤</span> {`/>`}
          </p>
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
