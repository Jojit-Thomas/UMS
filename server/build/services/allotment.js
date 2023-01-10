"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLatestAllotment = exports.createAllotmentDoc = exports.initScheduledJobs = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const allotment_model_1 = require("../models/allotment_model");
const http_errors_1 = __importDefault(require("http-errors"));
const moment_1 = __importDefault(require("moment"));
const student_1 = __importDefault(require("../controllers/student"));
const initScheduledJobs = () => __awaiter(void 0, void 0, void 0, function* () {
    let last = yield (0, exports.getLatestAllotment)();
    if (last) {
        let lastYear = (0, moment_1.default)(last.date).year();
        let thisYear = (0, moment_1.default)(new Date).year();
        if (lastYear < thisYear) {
            console.log("call allotment 1");
            student_1.default.allotment();
        }
        else {
            console.log("allotment already took place this year");
        }
    }
    else {
        student_1.default.allotment();
        console.log("call allotment 2");
    }
    const scheduledJobFunction = node_cron_1.default.schedule("* * 1 1 *", () => {
        console.log("I'm executed on a schedule!");
        // Add your custom logic here
    });
    scheduledJobFunction.start();
});
exports.initScheduledJobs = initScheduledJobs;
const createAllotmentDoc = (selectedStudent) => {
    return new Promise((resolve, reject) => {
        allotment_model_1.allotmentModel.create({ selectedSutdents: selectedStudent }).then(() => resolve()).catch(err => {
            console.log(err);
            reject(http_errors_1.default.InternalServerError());
        });
    });
};
exports.createAllotmentDoc = createAllotmentDoc;
const getLatestAllotment = () => {
    return new Promise((resolve, reject) => {
        allotment_model_1.allotmentModel.find({}).sort({ date: 1 }).then((res) => {
            if (res.length > 0) {
                resolve(res[0]);
            }
            else {
                //@ts-ignore
                resolve();
            }
        }).catch(err => {
            console.log(err);
            reject(http_errors_1.default.InternalServerError());
        });
    });
};
exports.getLatestAllotment = getLatestAllotment;
