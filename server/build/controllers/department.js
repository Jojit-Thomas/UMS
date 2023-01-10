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
const department_1 = __importDefault(require("../services/department"));
const validation_1 = __importDefault(require("../services/validation"));
const createDepartment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("create department");
        yield validation_1.default.isDepartmentSchemaValid(req.body);
        yield department_1.default.createDepartment(req.body);
        res.sendStatus(204);
    }
    catch (err) {
        res.status(err.status || 500).json(err.message || "Internal Server Error");
    }
});
const allDepartments = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let departments = yield department_1.default.fetchAllDepartment();
        res.status(200).json(departments);
    }
    catch (err) {
        res.status(err.status || 500).json(err.message || "Internal Server Error");
    }
});
exports.default = { createDepartment, allDepartments };
