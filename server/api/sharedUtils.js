const express = require("express");
const waterCollection = require("../models/waterModel");

const fetchWaterStorageCapacity = async () => {
  const recentWaterTotalCapacity = await waterCollection
    .findOne()
    .sort({ _id: -1 });
  return recentWaterTotalCapacity;
};

const updateWaterStorageCurrentCapacity = async (model) => {
  const data = await new waterCollection(model).save();
  return data;
};

const updateWaterStorageCapacity = async (waterQuantityToUpdate) => {
  const { currentCapacity, totalCapacity } = await fetchWaterStorageCapacity();
  if (currentCapacity - waterQuantityToUpdate > currentCapacity) {
    throw new Error("Order Quantites more than Water storage capacity");
  } else {
    const model = {
      currentCapacity: currentCapacity - waterQuantityToUpdate,
      totalCapacity,
    };

    return await updateWaterStorageCurrentCapacity(model);
  }
};

module.exports = {
  fetchWaterStorageCapacity,
  updateWaterStorageCurrentCapacity,
  updateWaterStorageCapacity,
};
