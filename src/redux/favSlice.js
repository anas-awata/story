/*import { createSlice } from '@reduxjs/toolkit';
const favSlice = createSlice({
  name: 'fav',
  initialState: {
    fav: [],
  },
  reducers: {
    addToFav: (state, action) => {
      const itemInFav = state.fav.find((item) => item.id === action.payload.id);
      if (!itemInFav) {
        state.fav.push({ ...action.payload});
        console.log(state.fav);
      }
    },
    removeFav: (state, action) => {
      const removeFav = state.fav.filter((item) => item.id !== action.payload);
      console.log(action.payload)
      state.fav = removeFav;
      console.log(state.fav)
    },
  },
});
export const favReducer = favSlice.reducer;
export const {
  addToFav,
  removeFav,
} = favSlice.actions;*/
