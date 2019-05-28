import mongoose from "mongoose"
import "../mongoose/models/user"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userModel = mongoose.model("user")
export const register = async ({ login, password }) => {
  const hashPassword = bcrypt.hashSync(password, 12)
  const newUser = new userModel({ login, password: hashPassword })
  const ok = await newUser.save()
  return Boolean(ok)
}
export const login = async ({ login, password }) => {
  const user = await userModel.findOne({ login })
  if (!user) return "user not registered"
  const correctPassword = bcrypt.compareSync(password, user.password)
  if (correctPassword) {
    return jwt.sign({ login, exp: 600 }, "bossaBox")
  }
}
