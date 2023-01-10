"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const http_errors_1 = __importDefault(require("http-errors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./routes/auth"));
const student_1 = __importDefault(require("./routes/student"));
const college_1 = __importDefault(require("./routes/college"));
const teacher_1 = __importDefault(require("./routes/teacher"));
const university_1 = __importDefault(require("./routes/university"));
const allotment_1 = require("./services/allotment");
const redis_1 = require("./config/redis");
const client = (0, redis_1.connectRedis)();
(0, allotment_1.initScheduledJobs)();
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../.env") });
mongoose_1.default.connect(`mongodb+srv://UMS:${process.env.MONGO_PASSWORD}@cluster0.yzsgttr.mongodb.net/?retryWrites=true&w=majority`, { dbName: "UMS" });
mongoose_1.default.connection.on("connecting", () => {
    console.log("Connecting to Database");
});
mongoose_1.default.connection.on("connected", () => {
    console.log("Mongoose Connected to Database");
});
mongoose_1.default.connection.on("error", (err) => {
    console.error(err.message);
});
mongoose_1.default.connection.on("disconnected", () => {
    console.log("Mongoose Connection is Disconnected.");
});
process.on("SIGINT", () => {
    client.quit();
    mongoose_1.default.connection.close();
});
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: "http://localhost:3303" }));
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use("/api/student", student_1.default);
app.use("/api/auth", auth_1.default);
app.use("/api/college", college_1.default);
app.use("/api/university", university_1.default);
app.use("/api/teacher", teacher_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
const errorHandler = function (err, req, res, next) {
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
