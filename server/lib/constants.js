module.exports = {
  dateTimeOption: {
    location: "en-in",
    tzFormatOptions: {
      dateStyle: "full",
      timeStyle: "long",
      timeZone: "Asia/Kolkata",
    },
  },
  orderStatusEnum: ["Pending", "Completed", "Cancelled"],
  transactionStatusEnum: ["Processed", "Complete", "Order_Deleted"],
  paymentTxnIdGenerator:
    Math.random().toString(36).substring(2, 10) +
    Math.random().toString(10).substring(2, 10),
  jwtToken:
    Math.random().toString(10).substring(2, 10) +
    Math.random().toString(10).substring(2, 10),
};
