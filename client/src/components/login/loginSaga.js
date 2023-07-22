import { takeLatest, call, put } from "redux-saga/effects";
import { loginRequest, loginSuccess, loginFailure } from "./loginSlice";
import authenticateUser from "./loginApiRoutes";

function* authenticateUserSaga(action) {
  try {
    const { email, password } = action.payload;
    const { data } = yield call(authenticateUser, { email, password });
    yield put(loginSuccess(data));
  } catch (error) {
    yield put(loginFailure("Login failed. Please check your credentials."));
  }
}

// Saga watcher function
function* loginSaga() {
  // Take the latest dispatched action and call the worker function
  yield takeLatest("login/loginRequest", authenticateUserSaga);
}

export default loginSaga;
