import { MongoMemoryServer } from "mongodb-memory-server"
import mongoose from "mongoose"
import "../mongoose/models/tools"
import * as teste from "../tools/toolManager"

let mongodb
const Tools = mongoose.model("tools")
beforeAll(async () => {
  mongodb = new MongoMemoryServer()
  const uri = await mongodb.getConnectionString()
  mongoose.connect(uri, { useNewUrlParser: true })
})

afterEach(async () => {
  await Tools.deleteMany({})
})

test("Insert tool", async () => {
  try {
    const newtool = await teste.insertTool({
      title: "hotel",
      link: "https://github.com/typicode/hotel",
      description:
        "Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.",
      tags: ["organizing", "webapps", "domain", "developer", "https", "proxy", "rosa", "node"],
    })
    const expected = await teste.findById(newtool._id)
    expect(expected).toEqual(newtool)
  } catch (error) {
    throw error
  }
})

test("Insert tool with invalid field", async () => {
  try {
    await teste.insertTool({
      wrongField: "hotel",
      link: "https://github.com/typicode/hotel",
      description:
        "Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.",
      tags: ["organizing", "webapps", "domain", "developer", "https", "proxy", "rosa", "node"],
    })
  } catch (error) {
    expect(error.message).toBe("tools validation failed: title: Path `title` is required.")
  }
})

test("Insert tool with invalid data", async () => {
  try {
    await teste.insertTool({
      title: "hotel",
      link: "https://github.com/typicode/hotel",
      description:
        "Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.",
      tags: {},
    })
  } catch (error) {
    expect(error.message).toBe(`tools validation failed: tags: Cast to Array failed for value "{}" at path "tags"`)
  }
})

test("get tools", async () => {
  const expect1 = await teste.insertTool({
    title: "test1",
    link: "test1",
    description: "test1",
    tags: ["test1"],
  })
  const expect2 = await teste.insertTool({
    title: "test2",
    link: "test2",
    description: "test2",
    tags: ["test2"],
  })

  const tools = await teste.getTools({})
  expect(expect1).toEqual(tools[0].toObject())
  expect(expect2).toEqual(tools[1].toObject())
})

test("get tools by tag", async () => {
  const expect1 = await teste.insertTool({
    title: "test1",
    link: "test1",
    description: "test1",
    tags: ["test1"],
  })
  await teste.insertTool({
    title: "test2",
    link: "test2",
    description: "test2",
    tags: ["test2"],
  })

  const tools = await teste.getTools({ tag: "test1" })
  expect(expect1).toEqual(tools[0].toObject())
  expect(tools.length).toBe(1)
})

test("delete by id", async () => {
  const expect1 = await teste.insertTool({
    title: "test1",
    link: "test1",
    description: "test1",
    tags: ["test1"],
  })
  await teste.deleteTool(expect1._id)
  const tools = await teste.getTools({})
  expect(tools.length).toBe(0)
})
