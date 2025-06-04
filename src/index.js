/**
 *  Copyright 2023 Shadowcast
 *  Project Name - Sheepdog-therapeutics
 *  Engineer - Vijayant Jha
 */


const connectDB = require('./config/connectDb');
const app = require("./app");

// MongoDB connection

// connectDB();  added multiple db connection so it is not needed

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  try {
    console.log(`Model service is running on port: ${PORT}`);
  } catch (error) {
    console.error('Model service error:', error);
  }
});
