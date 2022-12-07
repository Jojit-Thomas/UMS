import { RequestHandler } from "express";

import createHttpError from "http-errors";
import userDB from "../services/user"
import { connectRedis } from "../config/redis";
const client = connectRedis();

const allUsers: RequestHandler = async (req, res, next) => {
  let users = await userDB.fetchAllUsers()
  res.status(200).json(users)
}

const block_user: RequestHandler = async (req, res) => {
  try{
    if(!req.body.email) throw createHttpError.BadRequest("Email is Empty")
    const {email} = req.body;
    let user: any = await userDB.getUserByEmail(req.body.email);
    await userDB.blockUser(user.email, user.isBlocked)
    client.DEL(user.email)
    res.sendStatus(204)
  } catch(err) {
    res.status(err.status).json(err.message)
  }
}

export default {allUsers, block_user}