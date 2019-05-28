import mongoose from "mongoose"
const Schema = mongoose.Schema

const userSchema = new Schema({
  login: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})
const user = mongoose.model("user", userSchema)

export default user
