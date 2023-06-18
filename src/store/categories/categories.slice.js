import { createSlice } from '@reduxjs/toolkit';
import categoryService from '../../services/category.services';

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
    categoriesCreate: (state, action) => {
      state.entities.push(action.payload);
    },
  },
});
const { reducer: categoriesReducer, actions } = categoriesSlice;
const { categoriesRequested, categoriesReceived, categoriesRequestFailed, categoriesCreate } =
  actions;

// Функция для получения актуальных данных с сервера
// например, при длительном бездействии пользователя на странице
function isOutdated(date) {
  if (Date.now() - date > 10 * 60 * 1000) {
    return true;
  }
  return false;
}

export const createCategory = (data) => async (dispatch) => {
  try {
    dispatch(categoriesCreate(data));
    await categoryService.createCategory(data);
  } catch (error) {
    console.log(error);
  }
};

export const loadCategoriesList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().categories;
  if (isOutdated(lastFetch)) {
    dispatch(categoriesRequested());
    try {
      // const { content } = await categoryService.fetchAll(); //firebase
      // const content = getCategoriesFromDB();
      const content = await categoryService.getCategoriesFromDB();
      // console.log(content);
      dispatch(categoriesReceived(content));
    } catch (error) {
      dispatch(categoriesRequestFailed(error.message));
    }
  }
};

export const getCategoryDisplayNameById = (id) => (state) => {
  let name = '';
  if (state.categories.entities) {
    state.categories.entities.filter((category) => {
      if (category.id == id) {
        name = category.name;
      }
    });
  }
  return name;
};

export const getCategories = () => (state) => state.categories.entities;
export const getCategoriesLoadingStatus = () => (state) => state.categories.isLoading;

export default categoriesReducer;
