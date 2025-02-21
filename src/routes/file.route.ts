import { createRoute } from "@hono/zod-openapi"
import * as HttpStatusCodes from "stoker/http-status-codes"
import { jsonContent } from "stoker/openapi/helpers"
import { createMessageObjectSchema } from "stoker/openapi/schemas"

import { createRouter } from "@/lib/create-app"
import { z } from "@hono/zod-openapi"

const uploadSchema = z.object({
  file: z.any().openapi({
    type: "string",
    format: "binary",
    description: "The file to upload",
  }),
})

const router = createRouter().openapi(
  createRoute({
    tags: ["Upload"],
    method: "post",
    path: "/upload",
    request: {
      body: {
        content: {
          "multipart/form-data": {
            schema: uploadSchema,
          },
        },
      },
    },
    responses: {
      [HttpStatusCodes.OK]: {
        description: "The uploaded file",
      },
    },
  }),
  async (c) => {
    const body = await c.req.parseBody()
    return c.json({ message: "File uploaded" })
  }
)

export default router
