import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/uiSlice";

import { ThemeProvider, createTheme } from "@mui/material";
import UsernameForm from "../UsernameForm";
import CatIcon from "../Icons/CatIcon";

const Layout = ({ children }) => {
  const { isDarkMode } = useSelector((state) => state.ui);
 console.log(isDarkMode);
  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
    },
  });

  const dispatch = useDispatch();
  const toggleDarkMode = () => dispatch(uiActions.changeTheme());

  useEffect(() => {
    const html = document.querySelector("html");

    if (isDarkMode) {
      html.dataset.theme = "dark";
    } else {
      html.dataset.theme = "";
    }
  }, [isDarkMode]);

const initialState = localStorage.getItem("username") || "";
const [username, setUsername] = useState(initialState);


  return (
    <ThemeProvider theme={theme}>
      <div className="main-container">
        <header>
          {!username && (
            <UsernameForm username={username} setUsername={setUsername} />
          )}
          {!!username && <h1>{`Welcome ${username}`}</h1>}
          
            <button className="dark-mode-btn" onClick={toggleDarkMode}>
              {!isDarkMode ? "🌙" : "🌞"}
            </button>
        </header>
        <main>{children}</main>
        <footer>
          <p>
            {`<Designed by webcatdev`}
            <span className="ninja-cat">
              <a href="https://www.flaticon.com/free-icons/cat" target="_blank" rel="noopener noreferrer">
                <CatIcon />
              </a>
            </span>
            {`/>`}
          </p>
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
