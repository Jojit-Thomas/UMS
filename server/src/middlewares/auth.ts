import { RequestHandler } from "express";
import jwt from "jsonwebtoken"
import path from "path";
import dotenv from "dotenv"
dotenv.config({ path: path.resolve(__dirname, "../.env") });
import { connectRedis } from "../config/redis";
import createHttpError from "http-errors";
const client = connectRedis();


export const verifyStudent: RequestHandler = (req, res, next) => {
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




export const verifyUniversity: RequestHandler = (req, res, next) => {
  try {
    if (!process.env.JWT_ADMIN_ACCESS_TOKEN) throw new Error("Jwt access token is not provided in env")
    const accessToken = req.cookies.adminAccessToken;
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



const refreshToken = async (cookies : ) => {
  if (!process.env.JWT_REFRESH_TOKEN) throw new Error("Jwt refresh token is not provided in env")
  if (!process.env.JWT_ACCESS_TOKEN) throw new Error("Jwt access token is not provided in env")
  let { refreshToken } = cookies;
  if (!refreshToken) throw createHttpError.Unauthorized();
  let user = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN)
  console.log("user : ", user)
  let refreshTokenDb = await client.GET(user.aud)
  console.log("refresh token : ", refreshTokenDb)
  // if  (refreshTokenDb === null) throw createHttpError.Unauthorized()

  if (refreshTokenDb === refreshToken) {
    let accessToken = jwt.sign({ name: user.name }, process.env.JWT_ACCESS_TOKEN, { expiresIn: "24h", audience: user.aud });
    let refreshToken = jwt.sign({ name: user.name }, process.env.JWT_REFRESH_TOKEN, { expiresIn: "180d", audience: user.aud });
    client.SET(user.aud, refreshToken, { EX: 180 * 24 * 60 * 60 })
    // res.status(200).json({ accessToken, refreshToken })

  } else {
    // (async () => await client.DEL(user.aud))()
  }
}