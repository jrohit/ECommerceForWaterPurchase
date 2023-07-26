import { call, put } from "redux-saga/effects";
import { loginSaga } from "../../components/login/loginSaga";
import { loginSuccess, loginFailure } from "../../components/login/loginSlice";

describe("loginSaga", () => {
  it("dispatches loginSuccess action on successful login", () => {
    // Implement this test to check if the loginSuccess action is dispatched on successful login.
  });

  it("dispatches loginError action on login failure", () => {
    // Implement this test to check if the loginError action is dispatched on login failure.
  });
});
