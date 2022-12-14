import { RequestHandler } from "express";
import jwt from "jsonwebtoken"
import path from "path";
import dotenv from "dotenv"
dotenv.config({ path: path.resolve(__dirname, "../.env") });
import { connectRedis } from "../config/redis";
import createHttpError from "http-errors";
const client = connectRedis();


const verifyStudent: RequestHandler = (req, res, next) => {
  try {
    if (!process.env.JWT_ACCESS_TOKEN) throw new Error("Jwt access token is not provided in env")
    if (!req.headers.authorization) throw ({ status: 401, message: "Unauthorized" })
    const accessToken = req.headers.authorization;
    console.log(accessToken)
    const user = jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN)
    console.log("```user``` : ", user)
    req.user = user;
    next()
  } catch (e: any) {
    console.table(e)
    if (e.name === 'TokenExpiredError' && e.message === 'jwt expired') {
      res.status(401).json(e)
    } else {
      res.status(e.status || 500).json(e.message);
    }
  }
}




const verifyUniversity: RequestHandler = (req, res, next) => {
  try {
    console.log("hey")
    if (!process.env.JWT_ADMIN_ACCESS_TOKEN) throw new Error("Jwt access token is not provided in env")
    const accessToken = req.headers.authorization;
    if (!accessToken) throw ({ status: 401, message: "Unauthorized" })
    const user = jwt.verify(accessToken, process.env.JWT_ADMIN_ACCESS_TOKEN)
    console.log("```user``` : ", user)
    req.universtiy = user;
    next()
  } catch (e: any) {
    console.table(e)
    if (e.name === 'TokenExpiredError' && e.message === 'jwt expired') {
      res.status(401).json(e)
      try {

      } catch (err) {

      }
    } else {
      res.status(e.status || 500).json(e.message);
    }
  }
}

export default { verifyStudent, verifyUniversity }
