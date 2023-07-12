import { createSlice } from '@reduxjs/toolkit';
import categoryService from '../../services/category.services';

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null,
  },

  reducers: {
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
        return category._id === action.payload._id;
      });

      state.entities[index] = action.payload;
    },
    categoriesDeleted: (state, action) => {
      state.entities = state.entities.filter((category) => {
        return category._id !== action.payload;
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

export const createCategory = (data) => async (dispatch) => {
  try {
    const content = await categoryService.createCategory(data);
    dispatch(categoriesCreated(content));
    return content;
  } catch (error) {
    dispatch(categoriesRequestFailed(error.message));
  }
};

export const loadCategoriesList = (userId) => async (dispatch, getState) => {
  dispatch(categoriesRequested());
  try {
    const categories = await categoryService.getCategories(userId);
    dispatch(categoriesReceived(categories));
  } catch (error) {
    dispatch(categoriesRequestFailed(error.message));
  }
};

export const getCategoryById = (id) => (state) => {
  let name = '';
  if (state.categories.entities) {
    state.categories.entities.filter((category) => {
      return category;
    });
  }
  return name;
};

export const getCategoryDisplayNameById = (id) => (state) => {
  let name = '';
  if (state.categories.entities) {
    state.categories.entities.filter((category) => {
      if (category._id === id) {
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
      if (category._id == id) {
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
    await categoryService.removeCategory(id);
    dispatch(categoriesDeleted(id));
  } catch (error) {
    dispatch(categoriesRequestFailed(error.message));
  }
};

export const getCategories = () => (state) => state.categories.entities;

export const updateCategoryById = (data) => async (dispatch) => {
  try {
    await categoryService.updateCategory(data);
    dispatch(categoryUpdated(data));
  } catch (error) {
    dispatch(categoriesRequestFailed(error.message));
  }
};

export const getCategoriesLoadingStatus = () => (state) => state.categories.isLoading;

export default categoriesReducer;
