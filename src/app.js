/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import mongoose from "mongoose"
import express from "express"
import "express-async-errors"
import morgan from "morgan"
import "./mongoose/connection"
import swaggerUi from "swagger-ui-express"
import swaggerDocument from "./swagger"
/* Routes */
import tools from "./tools/toolRoutes"
import auth from "./auth/authRoutes"
const app = express()

mongoose.connect("mongodb://localhost:27017/bossabox", {
  useNewUrlParser: true,
})

app.use(morgan("tiny")) // HTTP request logger (can be safely disabled if wanted)
app.use(express.json()) // Parses requests to JSON format

const port = 3000
app.use("/tools", tools)
app.use("/auth", auth)

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use((err, req, res, next) => {
  console.error(err)

  // Errors without a defined reason
  if (!err.status) {
    err.status = 500
  } else {
    res.status(err.status)
  }

  if (!err.reason) {
    return res.end()
  }

  // Errors with a defined reason

  return res.json({
    error: err.reason,
  })
})

app.listen(port, function() {
  console.log(`listening on port ${port}!`)
})
