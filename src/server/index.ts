import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import ticketRoutes from "./routes/tickets";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

app.use("/api/tickets", ticketRoutes);

app.get("/", (req, res) => {
  res.send("Ticketing backend is running.");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
