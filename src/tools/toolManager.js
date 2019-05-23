import mongoose from "mongoose"
import "../mongoose/tool"

const Tools = mongoose.model('tools');


export const getTools = async ({ tag }) => {
    const filter = tag ? { tags: tag } : undefined
    const tools = await Tools.find(filter)
    return tools
}

export const insertTool = async ({ title, link, description, tags }) => {
    const newTool = new Tools({ title, link, description, tags })
    const tool = await newTool.save()
    return { title: tool.title, id: tool._id, description: tool.description, tags: tool.tags, link: tool.link }
}

export const deleteTool = async ({ toolid }) => {
    const oldTool = await Tools.findByIdAndDelete(toolid)
    return oldTool
}