import { createRoute, z } from "@hono/zod-openapi"
import * as HttpStatusCodes from "stoker/http-status-codes"
import { insertTasksSchema, patchTasksSchema, selectTasksSchema } from "@/db/schema"
import { notFoundSchema } from "@/lib/constants"
import { jsonResponse } from "@/lib/openapi/helpers"
import { createErrorSchema, IdParamsSchema } from "@/lib/openapi/schemas"

const tags = ["Tasks"]

export const list = createRoute({
  path: "/tasks",
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonResponse(z.array(selectTasksSchema), "The list of tasks"),
  },
})

export const create = createRoute({
  path: "/tasks",
  method: "post",
  request: {
    body: jsonResponse(insertTasksSchema, "The task to create", true),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonResponse(selectTasksSchema, "The created task"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonResponse(
      createErrorSchema(insertTasksSchema),
      "The validation error(s)"
    ),
  },
})

export const getOne = createRoute({
  path: "/tasks/{id}",
  method: "get",
  request: {
    params: IdParamsSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonResponse(selectTasksSchema, "The requested task"),
    [HttpStatusCodes.NOT_FOUND]: jsonResponse(notFoundSchema, "Task not found"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonResponse(
      createErrorSchema(IdParamsSchema),
      "Invalid id error"
    ),
  },
})

export const patch = createRoute({
  path: "/tasks/{id}",
  method: "patch",
  request: {
    params: IdParamsSchema,
    body: jsonResponse(patchTasksSchema, "The task updates", true),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonResponse(selectTasksSchema, "The updated task"),
    [HttpStatusCodes.NOT_FOUND]: jsonResponse(notFoundSchema, "Task not found"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonResponse(
      createErrorSchema(patchTasksSchema).or(createErrorSchema(IdParamsSchema)),
      "The validation error(s)"
    ),
  },
})

export const remove = createRoute({
  path: "/tasks/{id}",
  method: "delete",
  request: {
    params: IdParamsSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.NO_CONTENT]: {
      description: "Task deleted",
    },
    [HttpStatusCodes.NOT_FOUND]: jsonResponse(notFoundSchema, "Task not found"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonResponse(
      createErrorSchema(IdParamsSchema),
      "Invalid id error"
    ),
  },
})

export type ListRoute = typeof list
export type CreateRoute = typeof create
export type GetOneRoute = typeof getOne
export type PatchRoute = typeof patch
export type RemoveRoute = typeof remove
