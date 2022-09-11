import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/uiSlice';

import { ThemeProvider, createTheme } from '@mui/material';
import UsernameForm from '../UsernameForm';
import CatIcon from '../Icons/CatIcon';
import SunIcon from '../Icons/SunIcon';
import MoonIcon from '../Icons/MoonIcon';
import { createPortal } from 'react-dom';
import TodoNotifications from '../TodoNotifications';
import Modal from './Modal';

const Layout = ({ children }) => {
  const { isDarkMode } = useSelector(state => state.ui);
  const todos = useSelector(state => state.todos);

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
    },
  });

  const dispatch = useDispatch();
  const toggleDarkMode = () => dispatch(uiActions.changeTheme());

  useEffect(() => {
    const html = document.querySelector('html');

    if (isDarkMode) {
      html.dataset.theme = 'dark';
    } else {
      html.dataset.theme = '';
    }
  }, [isDarkMode]);

  const initialState = localStorage.getItem('username') || '';
  const [username, setUsername] = useState(initialState);

  return (
    <ThemeProvider theme={theme}>
      <div className="main-container">
        {/* Notification Modal(error & loading) */}
        {(todos.error || todos.loading) &&
          createPortal(
            <Modal todos={todos}>
              <TodoNotifications todos={todos} />
            </Modal>,
            document.body
          )}
        <header>
          {!username && (
            <UsernameForm username={username} setUsername={setUsername} />
          )}
          {!!username && <h1>{`Welcome ${username}`}</h1>}

          <button className="dark-mode-btn" onClick={toggleDarkMode}>
            {!isDarkMode ? <MoonIcon /> : <SunIcon />}
          </button>
        </header>
        <main>{children}</main>
        <footer>
          <p>
            {`<Designed by webcatdev`}
            <span className="ninja-cat">
              <a
                href="https://www.flaticon.com/free-icons/cat"
                target="_blank"
                rel="noopener noreferrer"
              >
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
