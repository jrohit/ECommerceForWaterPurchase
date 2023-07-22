import React from "react";
import WaterComponent from "./WaterComponent";
import WaterGlass from "./WaterGlass";
import Footer from "../footer/footer";

const Water = () => {
  return (
    <>
      <div className="flex justify-between mx-5 max-h-full m-5 mb-0 mt-2">
        <div className="w-5/6 p-4 bg-gray-100 mt-5">
          <WaterComponent />
        </div>
        <div className="w-1/3 p-4 bg-gray-100 mt-5">
          <WaterGlass />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Water;
