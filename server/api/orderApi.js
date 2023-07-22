const express = require("express");
const orderCollection = require("../models/orderModel");
const paymentsCollection = require("../models/paymentsModel");
const router = express.Router();
const constants = require("../lib/constants");
const {
  fetchWaterStorageCapacity,
  updateWaterStorageCurrentCapacity,
  updateWaterStorageCapacity,
} = require("./sharedUtils");

router.get("/fetchAllOrders", async (req, res) => {
  try {
    const data = await orderCollection.find().sort({ orderId: -1 });
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

router.post("/submitOrder", async (req, res) => {
  const { cartItems, paymentDetails, totalPrice } = req.body;
  if (!cartItems || !paymentDetails) {
    res.status(500).json({
      success: false,
      error: "Invalid Input",
    });
  } else {
    try {
      const orderData = {
        orderDate: new Date(),
        orderCustomerName: paymentDetails.cardHolderName,
        orderDetails: cartItems,
        orderTotal: parseFloat(totalPrice),
        orderStatus: constants.orderStatusEnum[0],
      };

      const newOrder = new orderCollection(orderData);
      const savedOrder = await newOrder.save();

      const orderId = savedOrder.orderId;

      const paymentTransactionId = constants.paymentTxnIdGenerator;

      const paymentModel = {
        ...paymentDetails,
        orderId,
        transactionStatus: constants.transactionStatusEnum[0],
        transactionId: paymentTransactionId,
      };

      const newPaymentDetails = new paymentsCollection(paymentModel);
      await newPaymentDetails.save();

      res.status(200).json({
        success: true,
        data: { orders: savedOrder, paymentTransactionId },
      });
    } catch (error) {
      res.status(500).json({ success: false, error });
    }
  }
});

router.post("/updateOrder", async (req, res) => {
  const { order, orderStatus } = req.body;
  if (!order || !orderStatus) {
    res.status(500).json({
      success: false,
      error: "Invalid Input",
    });
  } else {
    try {
      const newOrder = await orderCollection.findOneAndUpdate(
        { orderId: order.orderId },
        { orderStatus: orderStatus.value },
        {
          new: true,
        }
      );

      if (newOrder && orderStatus.value === constants.orderStatusEnum[2]) {
        let totalWaterGallonsPurchased = 0;
        newOrder.orderDetails.forEach((od) => {
          totalWaterGallonsPurchased =
            totalWaterGallonsPurchased + od.gallonSize * od.quantity;
        });
        const data = await updateWaterStorageCapacity(
          -totalWaterGallonsPurchased
        );
        res.status(200).json({
          success: true,
          data: {
            data,
            newOrder,
          },
        });
      } else {
        res.status(200).json({ success: true, data: newOrder });
      }
    } catch (error) {
      res.status(500).json({ success: false, error });
    }
  }
});

router.post("/deleteOrder", async (req, res) => {
  const { order } = req.body;
  if (!order) {
    res.status(500).json({
      success: false,
      error: "Invalid Input",
    });
  } else {
    try {
      await orderCollection.deleteOne({ orderId: order.orderId });
      await paymentsCollection.deleteOne({ orderId: order.orderId });

      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, error });
    }
  }
});

router.post(
  "/updateWaterCurrentCapacityAfterOrderSubmission",
  async (req, res) => {
    const { waterQuantityToReduce } = req.body;
    try {
      const data = await updateWaterStorageCapacity(waterQuantityToReduce);
      res.status(200).json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, error });
    }
  }
);

router.post("/updateWaterCurrentCapacity", async (req, res) => {
  try {
    const completedOrders = await orderCollection
      .find({
        orderStatus: constants.orderStatusEnum.find((it) => it === "Completed"),
      })
      .sort({ orderId: -1 });

    if (completedOrders) {
      let totalWaterGallonsPurchased = 0;
      completedOrders.map((order) => {
        order.orderDetails.forEach((od) => {
          totalWaterGallonsPurchased =
            totalWaterGallonsPurchased + od.gallonSize * od.quantity;
        });
      });
      const { currentCapacity, totalCapacity } =
        await fetchWaterStorageCapacity();
      if (totalWaterGallonsPurchased > currentCapacity) {
        res.status(500).json({
          success: false,
          message: "Order Quantites more than Water storage capacity",
        });
      } else {
        const model = {
          currentCapacity: currentCapacity - totalWaterGallonsPurchased,
          totalCapacity,
        };

        const data = await updateWaterStorageCurrentCapacity(model);
        res.status(200).json({ success: true, data });
      }
    }
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

module.exports = router;
