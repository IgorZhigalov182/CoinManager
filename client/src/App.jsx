import './styles/reset.scss';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import NavBar from './components/ui/navBar/NavBar';
import withRouter from './components/ui/hoc/withRouter';
import { useRoutes } from 'react-router-dom';
import routes from './routes';
import OperationLoader from './components/ui/hoc/operationLoader';
import { getIsLoggedIn } from './store/users/users.slice';
import './styles/index.scss';

function App() {
  const isLoggedIn = useSelector(getIsLoggedIn());
  const elements = useRoutes(routes(isLoggedIn));

  return (
    <>
      <OperationLoader>
        <NavBar />
        <div className="container">{elements}</div>
      </OperationLoader>
    </>
  );
}

const AppWithRouter = withRouter(App);

export default AppWithRouter;
