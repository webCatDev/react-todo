import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/uiSlice";
const Layout = ({ children }) => {
    const dispatch = useDispatch();
    const {isDarkMode} = useSelector(state => state.ui)
    const toggleDarkMode = () => dispatch(uiActions.changeTheme());
    
    useEffect(() => {
        const html = document.querySelector('html')
        const { theme } = html.dataset
        html.dataset.theme = theme === 'dark' ? '' : 'dark'
    },[isDarkMode] )
  return (
    <div className="main-container">
      <header>
        <h1>Webcat Task Manager</h1>
        <div>
          <button onClick={toggleDarkMode}>{!isDarkMode ? 'Dark Mode' : 'Light Mode'}</button>
        </div>
      </header>
      <main>{children}</main>
      <footer></footer>
    </div>
  );
};

export default Layout;
