import express, { Request, Response, Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app: Application = express();

//Middelware
app.use(cors());
app.use(express.json());

//TEST ROUTEING
app.get("/", (req: Request, res: Response) => {
  res.send("Backend with TypeScript is running ✅");
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
