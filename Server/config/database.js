const mongoose = require("mongoose");

require("dotenv").config();

exports.connectToMongo = () => {
  const mongoose = require("mongoose");

  require("dotenv").config();

  exports.connectToMongo = () => {
    mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 60000,
      poolSize: 10,
    });
  };
};
