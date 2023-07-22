import React, { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteFromCart, removeFromCart } from "../order/orderSlice";
import Currency from "../utils/Currency";
import Payments from "../payments/Payment";
import { toast } from "react-hot-toast";

const Cart = () => {
  const { cart: cartItems, shippingPrice } = useSelector(
    (state) => state.order
  );
  const [displayPayments, setDisplayPayments] = useState(false);
  const dispatch = useDispatch();

  const priceTotal = useMemo(() => {
    let price = 0;
    for (let items of cartItems) {
      price = price + parseFloat(items.price);
    }
    return price;
  }, [cartItems]);

  return (
    <>
      <div className=" bg-gray-100 pt-5">
        <h1 className="mb-5 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          {!displayPayments ? (
            <div className="rounded-lg md:w-2/3">
              {cartItems &&
                cartItems.map((item) => {
                  return (
                    <div
                      key={item.gallonSize}
                      className="ml-2 justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                    >
                      <img
                        src={
                          [3, 5].includes(item.gallonSize)
                            ? "/bottleSmall.png"
                            : "/bottleBig.png"
                        }
                        alt="product-image"
                        className="w-full rounded-lg sm:w-40"
                      />
                      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                        <div className="mt-5 sm:mt-0">
                          <h2 className="text-lg font-bold text-gray-900">
                            {item.description}
                          </h2>
                          <p className="mt-1 text-xs text-gray-700">
                            Price - {item.price}
                          </p>

                          <p className="mt-1 text-xs text-gray-700">
                            Quantity - {item.quantity}
                          </p>
                        </div>
                        <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                          <div className="flex items-center border-gray-100"></div>
                          <div className="flex items-center space-x-4">
                            <button
                              className="text-xs cursor-pointer hover:bg-gray-100"
                              onClick={() => {
                                dispatch(deleteFromCart(item.gallonSize));
                                toast.success(
                                  `${item.description} removed to cart`
                                );
                              }}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <>
              <div className="rounded-lg md:w-2/3">
                <Payments price={(priceTotal + shippingPrice).toFixed(2)} />
              </div>
            </>
          )}
          <div className="mt-6 rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Subtotal</p>
              <div className="text-gray-700">
                <Currency price={priceTotal.toFixed(2)} />
              </div>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Shipping</p>
              <Currency price={shippingPrice.toFixed(2)} />
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div className="mb-1 text-lg font-bold">
                <Currency price={(priceTotal + shippingPrice).toFixed(2)} />
              </div>
            </div>
            {!displayPayments && (
              <button
                disabled={priceTotal < 1}
                onClick={() => {
                  setDisplayPayments(true);
                }}
                className="mt-6 w-full rounded-md bg-blue-500 disabled:opacity-25 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
              >
                Place Order
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
