import { all, fork } from "redux-saga/effects";
import waterSaga from "../components/water/waterSaga";
import orderSaga from "../components/order/orderSaga";
import loginSaga from "../components/login/loginSaga";

function* rootSaga() {
  yield all([fork(waterSaga), fork(orderSaga), fork(loginSaga)]);
}

export default rootSaga;
