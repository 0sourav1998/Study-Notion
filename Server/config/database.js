const mongoose = require("mongoose");

require("dotenv").config();

exports.connectToMongo = () => {
  const mongoose = require("mongoose");

  require("dotenv").config();

  exports.connectToMongo = () => {
    mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      poolSize: 10,
    });
  };
};
