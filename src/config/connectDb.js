/**
 *  Copyright 2023 Shadowcast
 *  Project Name - sheepdogTherapeutics
 *  Engineer - Vijayant Jha
 *  modified by - Vijayant Jha
 */
require('dotenv').config();

const mongoose = require("mongoose");
mongoose.set('strictQuery', false); // Set strictQuery to false to follow the Mongoose 7 behavior

mongoose
  .connect(process.env.mongodbUrl, {})
  .then((res) => console.log("DB Connected"))
  .catch((err) => console.log("DB Connection ERROR ::", err));



module.exports = mongoose;
