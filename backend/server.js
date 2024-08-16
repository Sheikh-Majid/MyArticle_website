import express ,{urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import BlogRoute from "./routes/BlogRoutes.js";
import path from "path"

dotenv.config();

const app = express();

const __dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: process.env.URL,
  credentials: true,
};

app.use(cors(corsOptions));
connectDB();

// Routes
app.use("/api/v1/newblog", BlogRoute);

app.use(express.static(path.join(__dirname, "/frontend/out")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "out", "index.html"));
});


app.get("/", (req, res) => {
  res.send("Testing from the Backend...");
});

// Server
const PORT = parseInt(process.env.PORT, 10) || 5000;
// const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
  if (err) {
    console.error("Error starting server:", err);
  } else {
    console.log(`Server running on port ${PORT}`);
  }
});
