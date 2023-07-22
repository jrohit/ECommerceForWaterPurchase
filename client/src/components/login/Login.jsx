import React, { useState } from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "./loginSlice";
import LoadingSpinner from "../loading/Loading";
import OrderDetails from "../order/OrderDetails";

const Login = () => {
  const [email, setEmail] = useState("rohit@waterpurchaseapp.in");
  const [password, setPassword] = useState("98765567989");
  const dispatch = useDispatch();
  const { jwtUserToken, loading } = useSelector((state) => state.login);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginRequest({ email, password }));
  };
  return (
    <>
      <Header displayLogin={jwtUserToken ? false : true} />
      <>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {jwtUserToken ? (
              <>
                <OrderDetails />
              </>
            ) : (
              <>
                <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
                  <div className="max-w-md w-full space-y-8">
                    <div>
                      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Log in to your account
                      </h2>
                    </div>
                    <form onSubmit={handleLogin} className="mt-8 space-y-6">
                      <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                          <label htmlFor="email-address" className="sr-only">
                            Email address
                          </label>
                          <input
                            id="email-address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Email address"
                          />
                        </div>
                        <div>
                          <label htmlFor="password" className="sr-only">
                            Password
                          </label>
                          <input
                            id="password"
                            name="password"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            value={password}
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Password"
                          />
                        </div>
                      </div>

                      <div>
                        <button
                          type="submit"
                          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Log in
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </>
            )}
          </>
        )}

        <Footer />
      </>
    </>
  );
};

export default Login;
