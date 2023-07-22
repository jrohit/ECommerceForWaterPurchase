import React from "react";
import { BsCurrencyRupee } from "react-icons/bs";

const Currency = ({ price }) => {
  return (
    <>
      <div className="flex items-center font-xs text-lg text-gray-900 text-xs">
        <BsCurrencyRupee className="text-xs ml-2" />
        <p className="text-xs">{price}</p>
      </div>
    </>
  );
};
export default Currency;
