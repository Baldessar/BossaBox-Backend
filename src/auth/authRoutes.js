import express from "express"
import * as authManager from "../auth/authManager"
import * as authValidator from "../validations/authValidator"
const router = express.Router()

router.post("/register", authValidator.auth, async (req, res) => {
  try {
    const ok = await authManager.register(req.validData)
    res.json({ error: !ok })
  } catch (error) {
    throw error
  }
})

router.post("/login", authValidator.auth, async (req, res) => {
  try {
    const token = await authManager.login(req.validData)
    res.json({ token })
  } catch (error) {
    throw error
  }
})

export default router
