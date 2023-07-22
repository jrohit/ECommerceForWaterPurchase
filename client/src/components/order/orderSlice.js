import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Initial state here
  packagesList: [
    { gallonSize: 3, price: 249.99, description: "3 Gallon Water Bottle" },
    { gallonSize: 5, price: 499.99, description: "5 Gallon Water Bottle" },
    { gallonSize: 10, price: 749.99, description: "10 Gallon Water Bottle" },
    { gallonSize: 20, price: 999.99, description: "20 Gallon Water Bottle" },
    { gallonSize: 25, price: 1499.99, description: "25 Gallon Water Bottle" },
  ],
  orderList: [],
  cart: [],
  shippingPrice: 40,
  paymentsCCDetails: {},
  orderSubmissionDetails: null,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setIsLoading(state, action) {
      state.loading = action.payload;
    },
    addToCart: (state, action) => {
      const payload = action.payload;
      for (const [key, itemToAdd] of Object.entries(payload)) {
        let existingItem = state.cart.find(
          (item) => item.gallonSize === itemToAdd.gallonSize
        );
        if (existingItem) {
          existingItem.quantity = itemToAdd.quantity;
          existingItem.price = itemToAdd.price;
        } else {
          state.cart.push({
            ...itemToAdd,
          });
        }
      }
    },
    removeFromCart: (state, action) => {
      const payload = action.payload;
      for (const [key, itemToAdd] of Object.entries(payload)) {
        let existingItem = state.cart.find(
          (item) => item.gallonSize === itemToAdd.gallonSize
        );
        if (existingItem) {
          existingItem.quantity = itemToAdd.quantity;
          existingItem.price = itemToAdd.price;
        } else {
          state.cart.push({
            ...itemToAdd,
          });
        }
      }
    },
    deleteFromCart(state, action) {
      const payload = action.payload;
      const clonedCart = JSON.parse(JSON.stringify(state.cart));
      let existingItem = clonedCart.filter(
        (item) => item.gallonSize !== payload
      );
      state.cart = existingItem;
    },
    checkoutAndPlaceOrder(state, action) {
      state.paymentsCCDetails = action.payload;
    },
    setOrderSubmitComplete(state, action) {
      state.orderSubmissionDetails = action.payload;
    },
    setOrderSubmitError(state, action) {
      const { data } = action.payload;
      state.orderSubmissionDetails = data;
    },
    setOrderList(state, action) {
      const { data } = action.payload;
      state.orderList = data;
    },
    fetchAllOrders(state, action) {
      state.loading = true;
    },
    updateOrder(state, action) {
      state.loading = true;
    },
    deleteOrder(state, action) {
      state.loading = true;
    },
    resetOrderState(state, action) {
      state = { ...initialState };
    },
  },
});

export const {
  setIsLoading,
  addToCart,
  removeFromCart,
  deleteFromCart,
  checkoutAndPlaceOrder,
  setOrderSubmitComplete,
  setOrderSubmitError,
  setOrderList,
  fetchAllOrders,
  updateOrder,
  deleteOrder,
  resetOrderState,
} = orderSlice.actions;

export default orderSlice.reducer;
