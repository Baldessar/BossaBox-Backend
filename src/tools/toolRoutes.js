import express from "express"
import * as toolManager from "./toolManager"
import * as toolValidator from "../validations/toolsValidator"
import authenticate from "../validations/authenticate"
const router = express.Router()

router.get("/", authenticate, toolValidator.getTools, async (req, res) => {
  try {
    const tools = await toolManager.getTools(req.validData)
    res.send(tools)
  } catch (error) {
    throw error
  }
})

router.post("/", authenticate, toolValidator.insertTool, async (req, res) => {
  try {
    const newTool = await toolManager.insertTool(req.validData)
    res.json(newTool)
  } catch (error) {
    throw error
  }
})

router.delete("/:toolid", authenticate, toolValidator.deleteTool, async (req, res) => {
  try {
    /**
     * TODO validate mongoose ID
     */
    await toolManager.deleteTool(req.validData.toolid)
    res.json({})
  } catch (error) {
    throw error
  }
})
export default router
