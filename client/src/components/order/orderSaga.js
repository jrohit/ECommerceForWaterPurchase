import { takeLatest, put, call } from "redux-saga/effects";
// Import your API functions or other asynchronous tasks here
// import { fetchDataApi } from "./api"; // Replace 'fetchDataApi' with your API function
import {
  setIsLoading,
  setOrderList,
  setOrderSubmitComplete,
  setOrderSubmitError,
} from "./orderSlice";
import submitOrder, {
  deleteOrder,
  fetchAllOrders,
  updateOrder,
  updateCapacityOnOrderSubmission,
} from "./orderApiRoutes";
import { setWaterStorageData } from "../water/waterSlice";

function* updateWaterCurrentCapacityAfterOrderSubmission({ data }) {
  let totalWaterGallonsPurchased = 0;
  data.orders.orderDetails.forEach((od) => {
    totalWaterGallonsPurchased =
      totalWaterGallonsPurchased + od.gallonSize * od.quantity;
  });

  const waterData = yield call(updateCapacityOnOrderSubmission, {
    waterQuantityToReduce: totalWaterGallonsPurchased,
  });

  yield put(setWaterStorageData(waterData.data));
}

// Saga worker function to handle async task
function* checkoutAndPlaceOrderSaga({ payload }) {
  try {
    // Dispatch an action to set loading state
    yield put(setIsLoading(true));
    const { data } = yield call(submitOrder, payload);

    yield call(updateWaterCurrentCapacityAfterOrderSubmission, data);
    yield put(setIsLoading(false));
    yield put(setOrderSubmitComplete(data));
  } catch (error) {
    // Dispatch an action to update state on failure
    yield put(setIsLoading(false));
    yield put(setOrderSubmitError({ ...error?.response }));
  }
}

function* fetchAllOrdersSaga() {
  try {
    // Dispatch an action to set loading state
    yield put(setIsLoading(true));
    const { data } = yield call(fetchAllOrders);
    yield put(setIsLoading(false));
    yield put(setOrderList(data));
  } catch (error) {
    // Dispatch an action to update state on failure
    yield put(setIsLoading(false));
    yield put(setOrderSubmitError({ ...error?.response }));
  }
}

function* updateOrderSaga({ payload }) {
  try {
    // Dispatch an action to set loading state
    yield put(setIsLoading(true));
    yield call(updateOrder, payload);
    const { data } = yield call(fetchAllOrders);
    yield put(setIsLoading(false));
    yield put(setOrderList(data));
  } catch (error) {
    // Dispatch an action to update state on failure
    yield put(setIsLoading(false));
    yield put(setOrderSubmitError({ ...error?.response }));
  }
}

function* deleteOrderSaga({ payload }) {
  try {
    // Dispatch an action to set loading state
    yield put(setIsLoading(true));
    yield call(deleteOrder, payload);
    const { data } = yield call(fetchAllOrders);
    yield put(setOrderList(data));
    yield put(setIsLoading(false));

    yield put(setOrderList(data));
  } catch (error) {
    // Dispatch an action to update state on failure
    yield put(setIsLoading(false));
    yield put(setOrderSubmitError({ ...error?.response }));
  }
}

// Saga watcher function
function* orderSaga() {
  // Take the latest dispatched action and call the worker function
  yield takeLatest("order/checkoutAndPlaceOrder", checkoutAndPlaceOrderSaga);
  yield takeLatest("order/fetchAllOrders", fetchAllOrdersSaga);
  yield takeLatest("order/updateOrder", updateOrderSaga);
  yield takeLatest("order/deleteOrder", deleteOrderSaga);
}

export default orderSaga;
