// import { createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

// export const sendData = createAsyncThunk('data/sendData', async (data) => {
//   try {
//     // Отправить данные на сервер
//     const response = await axios.post('URL_СЕРВЕРА', data);
//     return response.data;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// });

// const dataSlice = createSlice({
//   name: 'data',
//   initialState: {
//     data: null,
//     error: null,
//     loading: false,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(sendData.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(sendData.fulfilled, (state, action) => {
//         state.loading = false;
//         state.data = action.payload;
//       })
//       .addCase(sendData.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// const { reducer: operationReducer, actions } = operationsSlice;

// export default dataSlice.reducer;
