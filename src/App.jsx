import React, { useEffect } from 'react';
import { loadCategoriesList } from './store/categories/categories.slice';
import { useDispatch } from 'react-redux';
import NavBar from './components/ui/NavBar';
import withRouter from './components/ui/hoc/withRouter';
import { useRoutes } from 'react-router-dom';
import routes from './routes';
import OperationLoader from './components/ui/hoc/operationLoader';

function App() {
  const elements = useRoutes(routes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCategoriesList());
  }, []);

  return (
    <>
      <OperationLoader>
        <NavBar />
        {elements}
      </OperationLoader>
    </>
  );
}

const AppWithRouter = withRouter(App);

export default AppWithRouter;
