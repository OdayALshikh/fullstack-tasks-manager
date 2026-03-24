import cors from "cors";
import express, { Response, Request, Application } from "express";
import { errorMiddleware } from "../src/middleware/error.middleware";
import { languageMiddleware } from "../src/middleware/languageMiddleware";
import { unknownEndpoint } from "../src/middleware/unknownEndpoint";

import authRoutes from "./routes/auth.routes";
import AdminRoutes from "./routes/Admin.routes";
import cookieParser from "cookie-parser";

//Middlewars
const app: Application = express();

// Enable CORS to allow cross-origin requests

app.use(cors());
// Middleware to parse incoming JSON requests

app.use(express.json());
app.use(cookieParser());
app.use(languageMiddleware);

// Test route to check if the API is running
app.get("/", (req: Request, res: Response) => {
  res.send("API is running 🚀");
});

// All routes defined in authRoutes will now be prefixed with "/api/auth"

app.use("/api/auth", authRoutes);
app.use("/api/Admin", AdminRoutes);
// 4️⃣ Unknown endpoint (بعد كل routes)
app.use(unknownEndpoint);
// Error handling middleware
app.use(errorMiddleware);

export default app;
