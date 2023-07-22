const mongoose = require("mongoose");
const constants = require("../lib/constants");

const paymentDetailsSchema = new mongoose.Schema({
  orderId: {
    type: Number,
    required: true,
    unique: true,
  },
  cardNumber: {
    type: String,
    required: true,
  },
  cardHolderName: {
    type: String,
    required: true,
  },
  expiryDate: {
    type: String,
    required: true,
  },
  cvv: {
    type: String,
    required: true,
  },
  transactionStatus: {
    type: String,
    required: true,
    default: "Processed",
    enum: constants.transactionStatusEnum,
  },
  transactionId: {
    type: String,
    required: true,
  },
});

const PaymentDetails = mongoose.model(
  "paymentscollection",
  paymentDetailsSchema
);

module.exports = PaymentDetails;
