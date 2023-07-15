import React from 'react';
import { useSelector } from 'react-redux';
import NavBar from './components/ui/NavBar';
import withRouter from './components/ui/hoc/withRouter';
import { useRoutes } from 'react-router-dom';
import routes from './routes';
import OperationLoader from './components/ui/hoc/operationLoader';
import { getIsLoggedIn } from './store/users/users.slice';
import { useTheme } from './hooks/useTheme';
import './styles/index.scss';
import Button from './components/ui/common/Button';

function App() {
  const isLoggedIn = useSelector(getIsLoggedIn());
  const elements = useRoutes(routes(isLoggedIn));
  const { theme, setTheme } = useTheme();

  const handleLightThemeClick = () => {
    setTheme('light');
  };

  const handleDarkThemeClick = () => {
    setTheme('dark');
  };

  return (
    <>
      <OperationLoader>
        <Button title={'Dark'} handler={handleDarkThemeClick} />
        <Button title={'light'} handler={handleLightThemeClick} />
        <NavBar theme={theme} setTheme={setTheme} />
        {elements}
      </OperationLoader>
    </>
  );
}

const AppWithRouter = withRouter(App);

export default AppWithRouter;
