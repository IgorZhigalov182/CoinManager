import { createSlice } from '@reduxjs/toolkit';
import categoryService from '../../services/category.services';

// const initialState = [
//   {
//     id: '702943f8-ea77-4101-ab5a-d451952fbe9a',
//     name: 'Продукты',
//     color: 'rgba(255, 99, 132, 1)',
//     icon: '',
//     idUser: '0',
//   },
//   {
//     id: '448226cd-1c1e-4ef3-9185-b871e775996d',
//     name: 'Одежда',
// color: 'rgba(54, 162, 235, 1)',
//     icon: '',
//     idUser: '0',
//   },
//   {
//     id: '87693ba7-5040-4657-8f19-add0402713d4',
//     name: 'Спорт',
//     color: 'rgba(255, 206, 86, 1)',
//     icon: '',
//     idUser: '0',
//   },
// ];

export const categoriesSlice = createSlice({
  name: 'categories',
  //   initialState,
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null,
  },

  reducers: {
    //   addCategories: (state, { payload: category }) => {
    //     const isExist = state.some((cat) => cat.id === category.id);

    //     if (isExist) return;

    //     state.push(category);
    //   },
    categoriesRequested: (state) => {
      state.isLoading = true;
    },
    categoriesReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
      state.lastFetch = Date.now();
    },
    categoriesRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});
const { reducer: categoriesReducer, actions } = categoriesSlice;
const { categoriesRequested, categoriesReceived, categoriesRequestFailed } = actions;

// Функция для получения актуальных данных с сервера
// например, при длительном бездействии пользователя на странице
function isOutdated(date) {
  if (Date.now() - date > 10 * 60 * 1000) {
    return true;
  }
  return false;
}

export const loadCategoriesList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().categories;
  if (isOutdated(lastFetch)) {
    dispatch(categoriesRequested());
    try {
      const { content } = await categoryService.fetchAll();
      dispatch(categoriesReceived(content));
    } catch (error) {
      dispatch(categoriesRequestFailed(error.message));
    }
  }
};

export const getCategories = () => (state) => state.categories.entities;
export const getCategoriesLoadingStatus = () => (state) => state.categories.isLoading;

export default categoriesReducer;
// 34.47 минута
