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
    categoriesCreated: (state, action) => {
      state.entities.push(action.payload);
    },
    categoryUpdated: (state, action) => {
      const index = state.entities.findIndex((category) => {
        return category.id === action.payload.id;
      });

      state.entities[index] = action.payload;
    },
    categoriesDeleted: (state, action) => {
      state.entities = state.entities.filter((category) => {
        return category.id !== action.payload;
      });
    },
  },
});
const { reducer: categoriesReducer, actions } = categoriesSlice;
const {
  categoriesRequested,
  categoriesReceived,
  categoriesRequestFailed,
  categoriesCreated,
  categoriesDeleted,
  categoryUpdated,
} = actions;

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
    dispatch(categoriesCreated(data));
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
      const content = await categoryService.getCategoriesFromDB();
      // console.log(content);
      dispatch(categoriesReceived(content));
    } catch (error) {
      dispatch(categoriesRequestFailed(error.message));
    }
  }
};

export const getCategoriesForPieChart = () => (state) => {};

export const getCategoryById = (id) => (state) => {
  let name = '';
  if (state.categories.entities) {
    state.categories.entities.filter((category) => {
      return category;
      if (category.id == id) {
        name = category.name;
      }
    });
  }
  return name;
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

export const getCategoryColorById = (id) => (state) => {
  let name = '';
  if (state.categories.entities) {
    state.categories.entities.filter((category) => {
      if (category.id == id) {
        name = category.color;
      }
    });
  }
  if (name === '') {
    return 'rgba(169,83,211,1)';
  } else {
    return name;
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  try {
    await categoryService.deleteCategory(id);
    dispatch(categoriesDeleted(id));
  } catch (error) {
    console.log(error);
  }
};

export const getCategories = () => (state) => state.categories.entities;

export const updateCategoryById = (data) => async (dispatch) => {
  try {
    dispatch(categoryUpdated(data));
    categoryService.updateCategory(data);
  } catch (error) {
    console.log(error);
  }
};

export const getCategoriesLoadingStatus = () => (state) => state.categories.isLoading;

export default categoriesReducer;
