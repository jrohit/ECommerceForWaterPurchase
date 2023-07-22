import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    totalCapacity: 0,
    currentCapacity: 0,
  },
  loading: false,
  error: null,
};

const waterSlice = createSlice({
  name: "water",
  initialState,
  reducers: {
    setIsLoading(state, action) {
      state.loading = action.payload;
    },
    fetchTotalWaterCapacity(state) {
      state.data.totalCapacity = 0;
      state.data.currentCapacity = 0;
    },
    // Add your slice reducers here
    setWaterCurrentCapacity(state, action) {
      state.data.currentCapacity = action.payload;
      state.loading = false;
    },
    setErrorOccurredWhileWaterOperation(state, action) {
      state.loading = false;
      state.error = action.payload || "Error O";
    },
    updateWaterStorageCapacity(state, action) {
      state.data.totalCapacity = 0;
      state.data.currentCapacity = 0;
    },
    setWaterStorageData(state, action) {
      const {
        data: { totalCapacity, currentCapacity },
      } = action.payload;
      state.data.totalCapacity = totalCapacity;
      state.data.currentCapacity = currentCapacity;
      state.loading = false;
    },
    resetWaterState(state, action) {
      state = { ...initialState };
    },
  },
});

export const {
  setIsLoading,
  fetchTotalWaterCapacity,
  setErrorOccurredWhileWaterOperation,
  updateWaterStorageCapacity,
  setWaterStorageData,
  resetWaterState,
} = waterSlice.actions;

export default waterSlice.reducer;
