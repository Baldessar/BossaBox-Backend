const swaggerDocument = {
  swagger: "2.0",
  info: {
    version: "1.0.0",
    title: "Yet Another Node.js Blogg Application API",
    description: "Yet Another Node.js Blogg Application API",
    license: {
      name: "MIT",
      url: "https://opensource.org/licenses/MIT",
    },
  },
  host: "localhost:3000",
  basePath: "/api/v1",
  tags: [
    {
      name: "Tools",
      description: "API to handle tools in the system",
    },
  ],
  paths: {
    "/tools": {
      post: {
        tags: ["Tools"],
        description: "Create new Tool in system",
        parameters: [
          {
            name: "tool",
            in: "body",
            description: "Tool that we want to create",
            schema: {
              $ref: "#/definitions/Tool",
            },
          },
        ],
        produces: ["application/json"],
        responses: {
          "200": {
            description: "New Tool is created",
            schema: {
              $ref: "#/definitions/ToolResponse",
            },
          },
        },
      },
      get: {
        tags: ["Tools"],
        parameters: [
          {
            name: "tag",
            in: "Query",
            description: "desired tag to search",
          },
        ],
        summary: "Get all Tools in system that contains the tag (if none is provided return all tools)",
        responses: {
          "200": {
            description: "OK",
            schema: {
              $ref: "#/definitions/Tools",
            },
          },
        },
      },
    },
    "/Tools/{toolId}": {
      delete: {
        tags: ["Tools"],
        summary: "Delete user with given ID",
        parameters: [
          {
            name: "tag",
            in: "Query",
            description: "desired tag to search",
          },
        ],
        responses: {
          "200": {
            description: "User is deleted",
            schema: {},
          },
        },
      },
    },
  },
  definitions: {
    Tool: {
      required: ["title", "link", "description", "tags"],
      properties: {
        title: {
          type: "string",
          uniqueItems: true,
        },
        link: {
          type: "string",
        },
        description: {
          type: "string",
        },
        tags: {
          type: "array",
          items: {
            type: "string",
          },
        },
      },
    },
    ToolResponse: {
      properties: {
        _id: {
          type: "string",
        },
        title: {
          type: "string",
          uniqueItems: true,
        },
        link: {
          type: "string",
        },
        description: {
          type: "string",
        },
        tags: {
          type: "array",
          items: {
            type: "string",
          },
        },
      },
    },
    Tools: {
      type: "array",
      $ref: "#/definitions/ToolResponse",
    },
  },
}

export default swaggerDocument
