import { MongoMemoryServer } from "mongodb-memory-server"
import mongoose from "mongoose"
import * as authManager from "../auth/authManager"
import "../mongoose/models/users"
import jwt from "jsonwebtoken"

let mongodb
const Users = mongoose.model("user")
beforeAll(async () => {
  mongodb = new MongoMemoryServer()
  const uri = await mongodb.getConnectionString()
  mongoose.connect(uri, { useNewUrlParser: true })
})

afterEach(async () => {
  await Users.deleteMany({})
})

test("Register User", async () => {
  try {
    await authManager.register({ login: "bossa", password: "box" })
    const expected = await Users.countDocuments()
    expect(expected).toBe(1)
  } catch (error) {
    throw error
  }
})

test("login User", async () => {
  try {
    await authManager.register({ login: "bossa", password: "box" })
    const token = await authManager.login({ login: "bossa", password: "box" })
    const expected = await Users.findOne({ login: "bossa" })
    expect(jwt.verify(token, "bossaBox")).toBeTruthy()
    expect(expected.login).toBe("bossa")
  } catch (error) {
    throw error
  }
})

test("login User", async () => {
  try {
    await authManager.register({ login: "bossa", password: "box" })
    const token = await authManager.login({ login: "bossa", password: "box" })
    const expected = await Users.findOne({ login: "bossa" })
    expect(jwt.verify(token, "bossaBox")).toBeTruthy()
    expect(expected.login).toBe("bossa")
  } catch (error) {
    throw error
  }
})

test("login User with wrong data", async () => {
  try {
    await authManager.register({ login: "bossa", password: "box" })
    await authManager.login({ login: "bossa", password: "wrongPassword" })
  } catch (error) {
    expect(error.reason).toBe("Wrong login or password")
  }
})
