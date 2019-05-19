import express from "express"
import "../mongoose/tool"
import mongoose from "mongoose"

const router = express.Router();
const Tool = mongoose.model('tools');


router.post("/tools", async (req, res) => {
	try {
		const newTool = new Tool(req.body)
		const tool = await newTool.save()
		console.log(tool)
	} catch (error) {
		throw error
	}
	res.end()
})

export default router