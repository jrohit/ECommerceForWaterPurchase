const mongoose = require("mongoose");
const constants = require("../lib/constants");

const orderSchema = new mongoose.Schema({
  orderId: {
    type: Number,
    // required: true,
    unique: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  orderCustomerName: {
    type: String,
    required: true,
  },
  orderDetails: {
    type: Array,
    required: true,
  },
  orderTotal: {
    type: Number,
    required: true,
  },
  orderStatus: {
    type: String,
    default: "Pending",
    enum: constants.orderStatusEnum,
  },
});

// Auto-increment orderId using a pre-save hook
orderSchema.pre("save", async function (next) {
  const self = this;
  try {
    const lastOrder = await mongoose
      .model("ordercollections", orderSchema)
      .findOne({}, {}, { sort: { orderId: -1 } });
    self.set({ orderId: lastOrder ? lastOrder.orderId + 1 : 1 });
    next();
  } catch (error) {
    next(err);
  }
});

module.exports = mongoose.model("ordercollections", orderSchema);
