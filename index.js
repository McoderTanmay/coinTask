import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { CreateAndUpdate } from "./services/backgroundJob.js";
import cron from "node-cron";


dotenv.config();

const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//routers 
import COIN from './routers/index.js';
// import TEST from './routers/test.js';

// app.use("/api/test", TEST);
app.use("/api/coin", COIN);

const uri = process.env.MONGODBURI;
//Database connecting
const connect = async () => {
  try {
    await mongoose.connect(`${uri}`);
    console.log("Connected to database");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};

connect();

cron.schedule("0 */2 * * *", () => {
  console.log("Running scheduled job...");
  CreateAndUpdate();
});

app.listen(5000, () => {
  console.log("App is running on port 5000");
});
