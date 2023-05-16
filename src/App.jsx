import React, { useEffect, useState } from 'react';
import AddCategory from './components/AddCategory';
import { loadCategoriesList } from './store/categories/categories.slice';
import { useDispatch } from 'react-redux';
import NavBar from './components/ui/NavBar';
import withRouter from './components/ui/hoc/withRouter';
import { useRoutes } from 'react-router-dom';
import routes from './routes';

function App() {
  const elements = useRoutes(routes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCategoriesList());
  }, []);

  return (
    <div className="App">
      <NavBar />
      {elements}
    </div>
  );
}

const AppWithRouter = withRouter(App);

export default AppWithRouter;
// export default App;
