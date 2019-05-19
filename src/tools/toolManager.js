import mongoose from "mongoose"
import "../mongoose/tool"

const Tool = mongoose.model('tools');


export const getTools = async (tag) => {
    const filter = tag ? { tags: tag } : undefined
    const tools = await Tool.find(filter)
    return tools
}

export const insertTool = async ({ title, link, description, tags }) => {
    const newTool = new Tool({ title, link, description, tags })
    const tool = await newTool.save()
    return { title: tool.title, id: tool._id, description: tool.description, tags: tool.tags, link: tool.link }
}

export const deleteTool = async (toolId) => {
    const oldTool = await Tool.findByIdAndDelete(toolId)
    return oldTool
}