import React, { useEffect } from 'react';
import { loadCategoriesList } from './store/categories/categories.slice';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './components/ui/NavBar';
import withRouter from './components/ui/hoc/withRouter';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import routes from './routes';
import OperationLoader from './components/ui/hoc/operationLoader';
import { loadBankAccountList } from './store/bankAccounts/bankAccounts.slice';
import { getIsLoggedIn } from './store/users/users.slice';
import { loadOperationList } from './store/operations/operations.slice';

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn());
  const elements = useRoutes(routes(isLoggedIn));

  // if (isLoggedIn) {
  //   dispatch(loadCategoriesList());
  //   dispatch(loadBankAccountList());
  //   dispatch(loadOperationList());
  // }

  // useEffect(() => {
  //   dispatch(loadCategoriesList());
  //   dispatch(loadBankAccountList());
  //   dispatch(loadOperationList());
  // }, []);

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
