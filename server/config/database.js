const mongoose = require("mongoose");
const databaseConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Database is connected successfully");
    })
    .catch((err) => {
      console.log("Error while connecting database");
      console.log(err);
    });
};

module.exports = databaseConnection;
