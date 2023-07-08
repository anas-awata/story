import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    //states for cart and favourite items and if cart modal is open
    cart: [],
    cartModal: false,
    fav: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
        console.log(action.payload);
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      item.quantity++;
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    removeItem: (state, action) => {
      const removeItem = state.cart.filter(
        (item) => item.id !== action.payload
      );
      state.cart = removeItem;
    },
    handleCartModal: (state) => {
      state.cartModal == false
        ? (state.cartModal = true)
        : (state.cartModal = false);
    },
    addToFav: (state, action) => {
      const itemInFav = state.fav.find((item) => item.id === action.payload.id);
      if (!itemInFav) {
        state.fav.push(action.payload);
        console.log(state.fav);
      }
    },
    removeFav: (state, action) => {
      const removeFav = state.fav.filter((item) => item.id !== action.payload);
      console.log(action.payload);
      state.fav = removeFav;
      console.log(state.fav);
    },
  },
});
export const cartReducer = cartSlice.reducer;
export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  handleCartModal,
  addToFav,
  removeFav,
} = cartSlice.actions;
