import { takeLatest, put, call, delay } from "redux-saga/effects";

import updateWaterStorageCapacity, {
  getWaterTotalCapacity,
} from "./waterApiRoutes";
import {
  setErrorOccurredWhileWaterOperation,
  setIsLoading,
  setWaterStorageData,
} from "./waterSlice";

function* fetchTotalWaterCapacitySaga() {
  try {
    yield put(setIsLoading(true));

    const { data } = yield call(getWaterTotalCapacity);
    yield delay(1000);
    yield put(setWaterStorageData(data));
  } catch (error) {
    yield put(setErrorOccurredWhileWaterOperation(error.message));
  }
}

function* updateWaterStorageCapacitySaga({ payload }) {
  try {
    yield put(setIsLoading(true));

    const { data } = yield call(updateWaterStorageCapacity, payload);
    yield delay(1000);
    yield put(setWaterStorageData(data));
  } catch (error) {}
}

function* waterSaga() {
  yield takeLatest(
    "water/fetchTotalWaterCapacity",
    fetchTotalWaterCapacitySaga
  );
  yield takeLatest(
    "water/updateWaterStorageCapacity",
    updateWaterStorageCapacitySaga
  );
}

export default waterSaga;
