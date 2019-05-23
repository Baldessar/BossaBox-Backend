import struct from "./structs"


export const insertTool = (req, res, next) => {
    const schema = struct({
        title: "string",
        link: "string",
        description: "string",
        tags: ["string"]
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

export const deleteTool = (req, res, next) => {
    const schema = struct({
        toolid: 'string'
    })

    try {
        req.validData = {
            ...req.validData,
            ...schema(req.params),
        }
        next()
    } catch (error) {
        error.reason = error.message
        error.status = 400
        throw error
    }
}

export const getTools = (req, res, next) => {
    const schema = struct({
        tag: 'string?'
    })

    try {
        req.validData = {
            ...req.validData,
            ...schema(req.query),
        }
        next()
    } catch (error) {
        error.reason = error.message
        error.status = 400
        throw error
    }
}
