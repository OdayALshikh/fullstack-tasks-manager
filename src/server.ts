import dotenv from "dotenv";
import connectDB from "./config/db";
import app from "./app";

dotenv.config();

//erhlten PortNumber von der env Datei oder 5000
const PORT = process.env.PORT || 5001;

// dataBank verbindinen
connectDB()
  .then(() => {
    console.log("MongoDB connected ✅");

    // server starten
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} 🚀`);
    });
  })

  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  });
