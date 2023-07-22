import React, { useEffect } from "react";

import { FcCheckmark } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { resetOrderState } from "./orderSlice";
import { resetWaterState } from "../water/waterSlice";

const OrderStatus = ({ success, error, orders }) => {
  return (
    <div className="flex items-center h-64 justify-center">
      <div className="p-6 bg-white rounded-md shadow-md ">
        {success ? (
          <>
            <div className="flex justify-center items-center">
              <div className="text-green-600 font-semibold text-lg text-center">
                <FcCheckmark
                  size={30}
                  className="inline-block align-middle mr-2"
                />
                Order placed successfully!
                <p>Order Id - {orders.orderId}</p>
              </div>
            </div>
          </>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-red-500 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <p className="text-red-600 font-semibold text-lg">
              Error occurred:{" "}
              {error &&
                Object.keys(error).map((key) => {
                  return (
                    <span className="whiteSpaceNoWrap" key={key}>
                      {key}
                    </span>
                  );
                })}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderStatus;
