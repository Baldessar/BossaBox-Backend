import express from "express"
import * as toolManager from "./toolManager"
const router = express.Router();


router.get("/", async (req, res) => {
	try {
		const tag = req.query.tag
		const tools = await toolManager.getTools(tag)
		res.send(tools)
	} catch (error) {
		throw (error)
	}
})

router.post("/", async (req, res) => {
	try {
		const newTool = await toolManager.insertTool(req.body)
		res.json(newTool)
	} catch (error) {
		throw (error)
	}
})

router.delete("/:toolid", async (req, res) => {
	try {
		const deletedTool = toolManager.deleteTool(req.params.toolid)
		res.json(deletedTool)
	} catch (error) {
		throw error
	}
})
export default router