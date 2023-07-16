import React from 'react';
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
        {elements}
      </OperationLoader>
      <h1 className="containerr" style={{ border: '1px solid black' }}>
        Text
      </h1>
    </>
  );
}

const AppWithRouter = withRouter(App);

export default AppWithRouter;
