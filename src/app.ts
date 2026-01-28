import cors from "cors";
import express, { Response, Request, Application } from "express";

//Middlewars
const app: Application = express();

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req: Request, res: Response) => {
  res.send("API is running 🚀");
});

export default app;
