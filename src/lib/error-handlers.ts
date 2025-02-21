// error-handlers.ts
import { Context } from "hono"
import * as HttpStatusCodes from "@/lib/http-status-codes"
import { ContentfulStatusCode } from "hono/utils/http-status"

// 1. 返回 Zod 风格错误的工具函数
export function zodErrorResponse(
  c: Context,
  message: string,
  code: string,
  httpStatus: ContentfulStatusCode | undefined
) {
  return c.json(
    {
      success: false,
      error: {
        issues: [
          {
            code,
            path: [],
            message,
          },
        ],
        name: "ZodError",
      },
    },
    httpStatus
  )
}

// 2. 返回简单错误信息的工具函数（比如 404 not found）
export function notFoundError(c: Context, message?: string) {
  return c.json(
    {
      message: message ?? "Not Found",
    },
    HttpStatusCodes.NOT_FOUND
  )
}

// 也可以根据需要扩展更多公共响应
