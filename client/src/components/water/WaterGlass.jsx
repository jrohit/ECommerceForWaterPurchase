import React, { useEffect, useMemo, useState } from "react";
import "./water.css"; // Import the CSS file for styling
import { useSelector } from "react-redux";

const WaterGlass = () => {
  const [isFilled, setIsFilled] = useState(false);
  const {
    data: { totalCapacity, currentCapacity },
  } = useSelector((state) => state.water);
  const [waterHeight, setWaterHeight] = useState(currentCapacity || 0);

  useEffect(() => {
    fillWaterTank();
  }, [totalCapacity, currentCapacity]);

  const waterRatio = useMemo(() => {
    if (currentCapacity <= 0) {
      return 0;
    }
    return Math.ceil((currentCapacity / totalCapacity) * 30);
  }, [totalCapacity, currentCapacity]);

  const fillWaterTank = () => {
    setIsFilled(true);
    setWaterHeight(`${waterRatio}em`);
  };

  return (
    <div id="container">
      <div className="mb-10">
        <p>Total Water Storage Capacity - {totalCapacity}</p>
        <p>Current Water Storage Level - {currentCapacity}</p>
      </div>

      <div id="glass" className={isFilled ? "filled" : ""}>
        <div id="water" style={{ height: waterHeight }}></div>
      </div>
      <p className="font-semibold text-center">Tank</p>
    </div>
  );
};

export default WaterGlass;
