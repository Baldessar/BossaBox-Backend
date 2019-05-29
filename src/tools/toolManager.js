import mongoose from "mongoose"
import "../mongoose/models/tools"

const Tools = mongoose.model("tools")

export const getTools = async ({ tag }) => {
  const filter = tag ? { tags: tag } : undefined
  const tools = await Tools.find(filter)
  return tools
}

export const insertTool = async ({ title, link, description, tags }) => {
  const newTool = new Tools({ title, link, description, tags })
  const tool = await newTool.save()
  return tool.toObject()
}

export const deleteTool = async toolid => {
  const oldTool = await Tools.findByIdAndDelete(toolid)
  return oldTool
}

export const findById = async toolId => {
  const selectedTool = await Tools.findById(toolId)
  return selectedTool.toObject()
}
