const mongoose = require("mongoose");
const MONGOURI =
  process.env.MONGO_URI || "mongodb://localhost:27017/BlackCoffer";
const databaseConnection = () => {
  mongoose
    .connect(MONGOURI)
    .then(() => {
      console.log("Database is connected successfully");
    })
    .catch((err) => {
      console.log("Error while connecting database");
      console.log(err);
    });
};

module.exports = databaseConnection;
