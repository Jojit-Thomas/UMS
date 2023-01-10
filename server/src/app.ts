import cors from "cors";
import path from "path";
import logger from "morgan";
import mongoose from "mongoose";
import createError from "http-errors";
import cookieParser from "cookie-parser";
import express, { ErrorRequestHandler } from "express";
import authRouter from "./routes/auth";
import studentRouter from "./routes/student";
import collegeRouter from "./routes/college";
import teacherRouter from "./routes/teacher";
import unviersityRouter from "./routes/university";
import {initScheduledJobs} from "./services/allotment";
import { connectRedis } from './config/redis'
const client = connectRedis();

initScheduledJobs();

import dotenv from "dotenv"
dotenv.config({ path: path.resolve(__dirname, "../.env") });


mongoose.connect(`mongodb+srv://UMS:${process.env.MONGO_PASSWORD}@cluster0.yzsgttr.mongodb.net/?retryWrites=true&w=majority`, { dbName: "UMS" });

mongoose.connection.on("connecting", () => {
  console.log("Connecting to Database");
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose Connected to Database");
});

mongoose.connection.on("error", (err) => {
  console.error(err.message);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose Connection is Disconnected.");
});

process.on("SIGINT", () => {
  client.quit()
  mongoose.connection.close()
})


const app = express();


app.use(cors({origin: "http://localhost:3303"}));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/student", studentRouter);
app.use("/api/auth", authRouter);
app.use("/api/college", collegeRouter);
app.use("/api/university", unviersityRouter);
app.use("/api/teacher", teacherRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

const errorHandler: ErrorRequestHandler = function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  console.error("``Err : ``", err.status, err.message);
  // render the error page
  res.status(err.status || 500).json(err.message || "Internal Server Error");
  // res.render("error");
};
// error handler
app.use(errorHandler);

module.exports = app;
