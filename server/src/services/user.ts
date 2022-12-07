import createHttpError from "http-errors"
import { user_model, user_type } from "../models/student_model"

const fetchAllUsers = (): Promise<user_type> => {
  return new Promise((resolve, reject) => {
    user_model.find().then((users) => {
      resolve(users)
    })
  })
}

const blockUser = (email : String, isBlocked: boolean):Promise<void> => {
  return new Promise ((resolve, reject) => {
    user_model.updateOne({email : email}, {isBlocked: !isBlocked}).then(() => resolve())
  })
}

const getUserByEmail =  (email: String) => {
  return new Promise((resolve, reject) => {
    user_model.findOne({email : email}).then((user: any) => {
      user ? resolve(user) : reject(createHttpError.NotFound("User not found"))
    })
  })
},

export default {fetchAllUsers, blockUser, getUserByEmail}