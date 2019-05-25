import mongoose from "mongoose"
import "../mongoose/tools"

const Tools = mongoose.model('tools');


export const getTools = async ({ tag }) => {
    try {
        const filter = tag ? { tags: tag } : undefined
        const tools = await Tools.find(filter)
        return tools
    } catch (error) {
        throw error
    }
}

export const insertTool = async ({ title, link, description, tags }) => {
    try {
        const newTool = new Tools({ title, link, description, tags })
        const tool = await newTool.save()
        return tool.toObject()
    } catch (error) {
        throw error
    }
}

export const deleteTool = async (toolid) => {
    try {
        const oldTool = await Tools.findByIdAndDelete(toolid)
        return oldTool
    } catch (error) {
        throw error
    }
}

export const findById = async (toolId) => {
    try {
        const selectedTool = await Tools.findById(toolId)
        return selectedTool.toObject()
    } catch (error) {
        throw error
    }
}