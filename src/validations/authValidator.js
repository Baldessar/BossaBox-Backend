import struct from "./structs"

export const auth = (req, res, next) => {
  const schema = struct({
    login: "string",
    password: "string",
  })

  try {
    req.validData = {
      ...req.validData,
      ...schema(req.body),
    }
    next()
  } catch (error) {
    error.reason = error.message
    error.status = 400
    throw error
  }
}
