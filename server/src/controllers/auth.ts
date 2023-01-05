import { NextFunction, Request, RequestHandler, Response } from "express"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import path from "path";
import dotenv from "dotenv"
dotenv.config({ path: path.resolve(__dirname, "../.env") });
import studentDB from "../services/student";
import createHttpError from "http-errors";
import { connectRedis } from "../config/redis";
import collegeDB from "../services/college";
import teacherDB from "../services/teacher";
const client = connectRedis();



const signRefreshToken = (payload: Object) => {

}

const studentLogin: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email || !password) throw createHttpError.BadRequest("Email and Password is required")
    let user: any = await studentDB.fetchAStudentDetails(email)
    let isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw createHttpError.Unauthorized("Email or Password is wrong")
    if (user.isBlocked) throw createHttpError.Unauthorized("You are blocked by the admin")
    let accessToken = jwt.sign({ name: user.name, course: user.course, classId: user.classId }, process.env.JWT_ACCESS_TOKEN!, { expiresIn: "24h", audience: user.email });
    let refreshToken = jwt.sign({ name: user.name, course: user.course, classId: user.classId }, process.env.JWT_REFRESH_TOKEN!, { expiresIn: "180d", audience: user.email });
    client.SET(user.email, refreshToken, { EX: 180 * 24 * 60 * 60 })
    res.status(200).json({ accessToken, refreshToken, user: { name: user.name, classId: user.classId, email : user.email } })
  } catch (err: any) {
    if (err.status >= 400 && err.status < 500) {
      res.status(err.status).json(err.message);
    }
    else next(err);
  }
}

const collegeLogin: RequestHandler = async (req, res, next) => {
  try {
    const { collegeId, password } = req.body
    if (!collegeId || !password) throw createHttpError.BadRequest("College Id and Password is required")
    let college = await collegeDB.fetchACollege(req.body.collegeId)
    let isPasswordValid = await bcrypt.compare(password, college.password)
    if (!isPasswordValid) throw createHttpError.Unauthorized("College Id or Password is wrong")
    let accessToken = jwt.sign({}, process.env.JWT_COLLEGE_ACCESS_TOKEN!, { expiresIn: "24h", audience: college.collegeId });
    res.status(200).json({ accessToken })
  } catch (err: any) {
    if (err.status >= 400 && err.status < 500) {
      res.status(err.status).json(err.message);
    }
    else next(err);
  }
}

const teacherLogin: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email || !password) throw createHttpError.BadRequest("Email and Password is required")
    console.log(email, password)
    let teacher = await teacherDB.fetchATeacher(email)
    console.log(teacher)
    let isPasswordValid = await bcrypt.compare(password, teacher.password)
    if (!isPasswordValid) throw createHttpError.Unauthorized("Email or Password is wrong")
    let accessToken = jwt.sign({ collegeId: teacher.collegeId, name: teacher.name }, process.env.JWT_TEACHER_ACCESS_TOKEN!, { expiresIn: "24h", audience: teacher.email });
    res.status(200).json({ accessToken })
  } catch (err: any) {
    if (err.status >= 400 && err.status < 500) {
      res.status(err.status).json(err.message);
    }
    else next(err);
  }

}

const refreshAccessToken: RequestHandler = async (req, res, next) => {
  try {
    if (!req.body.refreshToken || req.body.refreshToken === null) throw ({ status: 401, message: "Unauthorized" })
    let { refreshToken } = req.body;
    let user = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN!)
    console.log("user : ", user)
    let refreshTokenDb = await client.GET(user.aud)
    console.log("refresh token : ", refreshTokenDb)
    // if  (refreshTokenDb === null) throw createHttpError.Unauthorized()
    if (refreshTokenDb === refreshToken) {
      let accessToken = jwt.sign({ name: user.name }, process.env.JWT_ACCESS_TOKEN!, { expiresIn: "24h", audience: user.aud });
      let refreshToken = jwt.sign({ name: user.name }, process.env.JWT_REFRESH_TOKEN!, { expiresIn: "180d", audience: user.aud });
      client.SET(user.aud, refreshToken, { EX: 180 * 24 * 60 * 60 })
      res.status(200).json({ accessToken, refreshToken })
    } else {
      // (async () => await client.DEL(user.aud))()
      res.status(401).json("Unauthorized")
    }
  } catch (err: any) {
    console.table(err)
    if (err.name === "JsonWebTokenError") {
      res.status(401).json("Unauthroized")
    } else {
      res.status(500).json("Internal Server Error")
    }
  }
}

const logout: RequestHandler = (req, res) => {
  try {
    if (!req.body.refreshToken) throw ({ status: 401, message: "Unauthorized" })
    const { refreshToken } = req.body;
    let verifyRefreshToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN!);
    (async () => await client.DEL(verifyRefreshToken.aud))()
    res.sendStatus(204)
  } catch (err) {
    console.table(err)
  }
}

const universityLogin: RequestHandler = (req, res) => {
  try {
    if (req.body.email === process.env.ADMIN_EMAIL && req.body.password === process.env.ADMIN_PASSWORD) {
      const adminAccessToken = jwt.sign({}, process.env.JWT_ADMIN_ACCESS_TOKEN!, { expiresIn: "24h" })
      res.status(200).json({ adminAccessToken: adminAccessToken })
    } else {
      res.status(401).json("Email or Password is wrong")
    }
  } catch (err: any) {
    res.status(err.status || 500).json("Internal Server Error")
  }
}



export default { studentLogin, refreshAccessToken, logout, universityLogin, collegeLogin, teacherLogin };