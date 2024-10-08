const mongoose = require("mongoose");

require("dotenv").config();

require("dotenv").config();

exports.connectToMongo = async () => {
  await mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("DB Connected Succesfully"))
    .catch((error) =>
      console.log(
        "something Went Wrong while Connecting With DB",
        error.message
      )
    );
};
