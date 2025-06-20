const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(
      `✅ Connected to MongoDB: ${mongoose.connection.host}`.bgMagenta.white
    );
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`.bgRed.white);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
