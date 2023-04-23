import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    id: '702943f8-ea77-4101-ab5a-d451952fbe9a',
    name: 'Продукты',
    color: 'rgba(255, 99, 132, 1)',
    icon: '',
    idUser: '0',
  },
  {
    id: '448226cd-1c1e-4ef3-9185-b871e775996d',
    name: 'Одежда',
    color: 'rgba(54, 162, 235, 1)',
    icon: '',
    idUser: '0',
  },
  {
    id: '87693ba7-5040-4657-8f19-add0402713d4',
    name: 'Спорт',
    color: 'rgba(255, 206, 86, 1)',
    icon: '',
    idUser: '0',
  },
];

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategories: (state, { payload: category }) => {
      const isExist = state.some((cat) => cat.id === category.id);

      if (isExist) return;

      state.push(category);
    },
  },
});

export const { actions, reducer } = categoriesSlice;

// 34.47 минута
