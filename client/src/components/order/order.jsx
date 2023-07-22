import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, deleteFromCart } from "./orderSlice";
import { BsCartDash, BsCartPlus } from "react-icons/bs";
import CartButton from "../button/cartButton/cartButton";
import Currency from "../utils/Currency";
import { toast } from "react-hot-toast";

const Order = () => {
  const dispatch = useDispatch();
  const { packagesList, cart } = useSelector((state) => state.order);
  const [selectedProductsList, setSelectedProductsList] = useState([]);
  const [quantityMap, setQuantityMap] = useState(
    packagesList.reduce((accum, value) => {
      let object = {};
      object[value.gallonSize] = 0;
      accum.push(object);
      return accum;
    }, [])
  );

  useEffect(() => {
    setSelectedProductsList(cart);
  }, [cart]);

  const addToCartHandler = ({ packages }) => {
    const clonedSelectedProductsList = JSON.parse(
      JSON.stringify(selectedProductsList)
    );
    let preSelectedProduct = clonedSelectedProductsList.find(
      (item) => item.gallonSize === packages.gallonSize
    );

    if (preSelectedProduct) {
      const quantity = preSelectedProduct.quantity + 1;
      preSelectedProduct.quantity = quantity;
      preSelectedProduct.price = parseFloat(
        (quantity * packages.price).toFixed(2)
      );
    } else {
      const quantity = 1;
      preSelectedProduct = {
        gallonSize: packages.gallonSize,
        quantity,
        price: parseFloat((packages.price * quantity).toFixed(2)),
        ...packages,
      };
      clonedSelectedProductsList.push(preSelectedProduct);
    }

    // setSelectedProductsList(clonedSelectedProductsList);

    dispatch(addToCart(clonedSelectedProductsList));
    toast.success(`${packages.description} added to cart`);
  };

  const removeFromCartHandler = ({ packages }) => {
    const clonedSelectedProductsList = JSON.parse(
      JSON.stringify(selectedProductsList)
    );
    let preSelectedProduct = clonedSelectedProductsList[packages.gallonSize];

    if (preSelectedProduct && preSelectedProduct.quantity > 1) {
      const quantity = preSelectedProduct.quantity - 1;
      preSelectedProduct = {
        ...preSelectedProduct,
        quantity: quantity,
        price: parseFloat((quantity * packages.price).toFixed(2)),
      };
      clonedSelectedProductsList[packages.gallonSize] = preSelectedProduct;
      //   setSelectedProductsList(clonedSelectedProductsList);
      dispatch(removeFromCart(clonedSelectedProductsList));
    } else {
      delete clonedSelectedProductsList[packages.gallonSize];
      //   setSelectedProductsList(clonedSelectedProductsList);
      dispatch(deleteFromCart(packages.gallonSize));
    }
  };

  return (
    <div className="bg-gray-300 mt-10 h-auto m-5 text-center ">
      <section className="text-gray-600">
        <div className="container px-5 py-5 mx-auto">
          <div className="flex flex-col text-center w-full mb-10">
            <h1 className="text-2xl font-medium title-font mb-4 text-gray-900 tracking-widest">
              <p className="font-extrabold text-xl">Purchase Water Bottles</p>
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Select the Water Storage size you want to purchase!!!
            </p>
          </div>
          <div className="flex flex-wrap">
            {packagesList &&
              packagesList.map((packages) => {
                return (
                  <div className="p-4 lg:w-1/2" key={packages.gallonSize}>
                    <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                      <img
                        className={
                          "flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4 w-56"
                        }
                        src={
                          [3, 5].includes(packages.gallonSize)
                            ? "/bottleSmall.png"
                            : "/bottleBig.png"
                        }
                      />
                      <div className="flex-grow sm:pl-8">
                        <h2 className="title-font font-medium text-lg text-gray-900 m-2">
                          {packages.description}
                        </h2>
                        <Currency price={packages.price} />
                        <p className="mb-4 cursor-pointer">
                          <CartButton
                            IconComponent={BsCartDash}
                            packages={packages}
                            onClickEventHandler={removeFromCartHandler}
                          />
                          <input
                            type="number"
                            min={1}
                            onChange={(e) => {
                              //onhold
                              //   const clonedQuantityMap = JSON.parse(
                              //     JSON.stringify(quantityMap)
                              //   );
                              //   debugger;
                              //   const updateQuantity = clonedQuantityMap.find(
                              //     (obj) => {
                              //       return !obj[packages.gallonSize];
                              //     }
                              //   );
                              //   updateQuantity[packages.gallonSize] =
                              //     e.target.value;
                              //   console.log(updateQuantity, clonedQuantityMap);
                              //   setQuantityMap(quantityMap);
                            }}
                            className="w-16 py-1 text-center border rounded-md m-2 focus:outline-none focus:ring focus:border-blue-300"
                          />
                          <CartButton
                            packages={packages}
                            IconComponent={BsCartPlus}
                            onClickEventHandler={addToCartHandler}
                          />
                        </p>
                        <span className="inline-flex">
                          <a className="text-gray-500"></a>
                          <a className="ml-2 text-gray-500"></a>
                          <a className="ml-2 text-gray-500"></a>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Order;
