"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const department_model_1 = require("../models/department_model");
const createDepartment = (body) => {
    return new Promise((resolve, reject) => {
        department_model_1.departmentModel.create(body).then(() => resolve()).catch(err => {
            console.log(err);
            reject(http_errors_1.default.InternalServerError());
        });
    });
};
exports.default = { createDepartment };
