const express = require("express");
const path = require("path");
require("dotenv").config();
const app = express();
const port = process.env.PORT;
require("./server/lib/dbConfig");
const orderRouter = require("./server/api/orderApi");
const waterRouter = require("./server/api/waterApi");
const loginRouter = require("./server/api/loginApi");

const cors = require("cors");

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5000", // Replace with your client's origin
  })
);

app.use("/water", waterRouter);
app.use("/order", orderRouter);
app.use("/login", loginRouter);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  // Serve index.html file if a route is not recognized
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
