const mongoose = require("mongoose");

require("dotenv").config();

exports.connectToMongo = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("DB connected Successfully"))
    .catch((error) => console.log("Error while Connectig with DB"));
};
