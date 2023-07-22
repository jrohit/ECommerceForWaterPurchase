import React, { useState } from "react";
import "./water.css";
import LoadingSpinner from "../loading/Loading";

import { useSelector, useDispatch } from "react-redux";
import {
  fetchTotalWaterCapacity,
  updateWaterStorageCapacity,
} from "./waterSlice";
import Order from "../order/order";
import { toast } from "react-hot-toast";

const WaterComponent = () => {
  const [waterQuantity, setWaterQuantity] = useState("");
  const dispatch = useDispatch();
  const waterState = useSelector((state) => state.water);

  const handleInputChange = (event) => {
    if (event.target.value <= 100000) {
      setWaterQuantity(event.target.value);
    } else {
      toast.error("Max Capacity 100000");
    }
  };

  const handleUpdate = () => {
    if (waterQuantity > 0 && waterQuantity <= 100000) {
      dispatch(updateWaterStorageCapacity({ waterQuantity }));
    } else {
      toast.error("Invalid Value");
    }
  };

  const fetchWaterCapacity = () => {
    dispatch(fetchTotalWaterCapacity());
  };

  return (
    <>
      <div className="flex justify-center items-center inline-block">
        <input
          type="number"
          min={0}
          value={waterQuantity}
          max={100000}
          maxLength={6}
          onChange={handleInputChange}
          placeholder="Update Water Storage"
          className="px-4 py-2 text-base border border-gray-300 rounded-md mr-4 w-56"
        />
        <button
          onClick={handleUpdate}
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Update
        </button>
        <br /> &nbsp;
        {waterState.loading ? (
          <LoadingSpinner />
        ) : (
          <button
            onClick={fetchWaterCapacity}
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Get Water Total Capacity
          </button>
        )}
      </div>
      <Order />
    </>
  );
};

export default WaterComponent;
