import { createSlice } from '@reduxjs/toolkit';
import httpService from '../../services/http.services';
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
    },
    categoriesRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});
const { reducer: categoriesReducer, actions } = categoriesSlice;
const { categoriesRequested, categoriesReceived, categoriesRequestFailed } = actions;

export const loadCategoriesList = () => async (dispatch) => {
  dispatch(categoriesRequested());
  try {
    const { content } = await categoryService.fetchAll();
    console.log(content);
    dispatch(categoriesReceived(content));
  } catch (error) {
    dispatch(categoriesRequestFailed(error.message));
  }
};

export default categoriesReducer;
// 34.47 минута
