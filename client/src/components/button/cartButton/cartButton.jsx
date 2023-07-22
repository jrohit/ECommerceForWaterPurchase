import React from "react";

const CartButton = ({ IconComponent, onClickEventHandler, packages }) => {
  return (
    <>
      <button
        className="p-1 border rounded-md bg-gray-200 hover:bg-gray-300 focus:outline-none w-15"
        onClick={() => {
          onClickEventHandler({ packages });
        }}
      >
        <IconComponent />
      </button>
    </>
  );
};

export default CartButton;
