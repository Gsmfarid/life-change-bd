import mongoose, { connection } from "mongoose";

export const connectDb = async () => {
  try {
    mongoose.connect(process.env.DB_URL!);
    // const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("🫀✅🫀 Database is Connected Successfully❗ ✅📦✅");
    });

    connection.on("error", (err) => {
      console.log("❌❗❌❗❌ Database connection failed❗ error:- " + err);
      process.exit();
    });
  } catch (error) {
    console.log("❌❗❌❗❌ Something goes wrong❗ Error:- " + error);
  }
};
