const mongoose = require("mongoose");

require("dotenv").config();


exports.connectToMongo = async () => {
  await mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("DB Connected Successfully"))
    .catch((error) =>
      console.log(
        "something Went Wrong while Connecting With DB",
        error.message
      )
    );
};
