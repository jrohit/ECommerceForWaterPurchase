import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkoutAndPlaceOrder } from "../order/orderSlice";
import Loading from "../loading/Loading";
import OrderStatus from "../order/OrderStatus";

const Payments = ({ price }) => {
  const [cardNumber, setCardNumber] = useState("1234567891234567");
  const [cardHolderName, setCardHolder] = useState("Rohit Jain");
  const [email, setEmail] = useState("rohitjainlnct@gmail.com");
  const [expiryDate, setExpiryDate] = useState("12/23");
  const [cvv, setCVV] = useState("454");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { cart, loading, orderSubmissionDetails } = useSelector(
    (state) => state.order
  );

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\s/g, "");
    setCardNumber(value);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value.replace(/\s/g, "");
    setEmail(value);
  };

  const handleCardHolderChange = (e) => {
    setCardHolder(e.target.value);
  };

  const handleExpiryDateChange = (e) => {
    const value = e.target.value.replace(/\s/g, "");
    setExpiryDate(value);
  };

  const handleCVVChange = (e) => {
    const value = e.target.value.replace(/\s/g, "");
    setCVV(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!cardNumber) {
      errors.cardNumber = "Card number is required";
    } else if (!/^\d{16}$/.test(cardNumber)) {
      errors.cardNumber = "Invalid card number";
    }

    if (!cardHolderName) {
      errors.cardHolderName = "Card holder name is required";
    }

    if (!expiryDate) {
      errors.expiryDate = "Expiry date is required";
    } else if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
      errors.expiryDate = "Invalid expiry date (MM/YY)";
    }

    if (!cvv) {
      errors.cvv = "CVV is required";
    } else if (!/^\d{3}$/.test(cvv)) {
      errors.cvv = "Invalid CVV";
    }

    setErrors(errors);

    // If there are no errors, you can proceed with payment processing or any other action
    if (Object.keys(errors).length === 0) {
      dispatch(
        checkoutAndPlaceOrder({
          paymentDetails: {
            cardNumber,
            cardHolderName,
            expiryDate,
            cvv,
          },
          cartItems: cart,
          totalPrice: price,
        })
      );
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {orderSubmissionDetails ? (
            <>
              <OrderStatus
                success={orderSubmissionDetails.success}
                error={orderSubmissionDetails.error}
                orders={orderSubmissionDetails.data?.orders}
              />
            </>
          ) : (
            <div className="bg-white rounded-lg p-6 shadow-md max-w-md mx-auto">
              <h2 className="text-2xl font-semibold mb-4">
                Enter Credit Card Details
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    className={`mt-1 p-2 border rounded focus:outline-none focus:ring ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="cardNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    className={`mt-1 p-2 border rounded focus:outline-none focus:ring ${
                      errors.cardNumber ? "border-red-500" : "border-gray-300"
                    }`}
                    maxLength={16}
                    placeholder="Enter card number"
                  />
                  {errors.cardNumber && (
                    <p className="text-red-500 text-sm">{errors.cardNumber}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="cardHolderName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Card Holder
                    <sub> Will be used for name on the Order</sub>
                  </label>
                  <input
                    type="text"
                    id="cardHolderName"
                    value={cardHolderName}
                    onChange={handleCardHolderChange}
                    className={`mt-1 p-2 border rounded focus:outline-none focus:ring ${
                      errors.cardHolderName
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter card holder's name"
                  />
                  {errors.cardHolderName && (
                    <p className="text-red-500 text-sm">
                      {errors.cardHolderName}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="expiryDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    id="expiryDate"
                    value={expiryDate}
                    onChange={handleExpiryDateChange}
                    className={`mt-1 p-2 border rounded focus:outline-none focus:ring ${
                      errors.expiryDate ? "border-red-500" : "border-gray-300"
                    }`}
                    maxLength={5}
                    placeholder="MM/YY"
                  />
                  {errors.expiryDate && (
                    <p className="text-red-500 text-sm">{errors.expiryDate}</p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="cvv"
                    className="block text-sm font-medium text-gray-700"
                  >
                    CVV
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    value={cvv}
                    onChange={handleCVVChange}
                    className={`mt-1 p-2 border rounded focus:outline-none focus:ring ${
                      errors.cvv ? "border-red-500" : "border-gray-300"
                    }`}
                    maxLength={3}
                    placeholder="CVV"
                  />
                  {errors.cvv && (
                    <p className="text-red-500 text-sm">{errors.cvv}</p>
                  )}
                </div>
                {/* Add a submit button to handle the form submission */}
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
                >
                  Place Order
                </button>
              </form>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Payments;
