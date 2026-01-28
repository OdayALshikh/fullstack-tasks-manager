import mongoose from "mongoose";

const connectDB = async () => {
  const MongoUrl = process.env.MONGODB_URI || "";
  await mongoose.connect(MongoUrl);
};
export default connectDB;
