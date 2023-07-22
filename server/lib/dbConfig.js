const mongoose = require("mongoose");
const mongoURI = process.env.MONGODB_URI;

let connection = null;

const connectMongoDb = async () => {
  // Connect to MongoDB
  try {
    if (!connection)
      connection = await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }

  return connection;
};

module.exports = connectMongoDb();
