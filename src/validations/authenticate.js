import jwt from "jsonwebtoken"

const authenticateUser = async (req, res, next) => {
  try {
    let token = req.headers.authorization
    if (/^bearer/i.test(token)) {
      token = token.split(" ")[1]
    }
    await jwt.verify(token, "bossaBox")
    next()
  } catch (error) {
    error.reason = error.message
    throw error
  }
}

export default authenticateUser
