const mongoose = require("mongoose");

const connectDB = () => {
  const url = process.env.DB_URL;
  mongoose
    .connect(url)
    .then(() => console.log("Database Connected Successfully..."))
    .catch((err) => console.log("Something wrong in connecting Mongo DB", err));
};

module.exports = connectDB;
