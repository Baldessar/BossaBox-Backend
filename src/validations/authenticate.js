import jwt from "jsonwebtoken"

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    await jwt.verify(token, "bossaBox")
    next()
  } catch (error) {
    error.reason = error.message
    throw error
  }
}

export default authenticateUser
