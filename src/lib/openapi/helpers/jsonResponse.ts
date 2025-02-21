import type { ZodSchema } from "./types.ts"

// 通用的 JSON 响应格式函数
const jsonResponse = <T extends ZodSchema>(
  schema: T,
  description: string,
  required: boolean = false // 可选的 `required` 参数，默认值为 false
) => ({
  content: {
    "application/json": {
      schema,
    },
  },
  description,
  ...(required ? { required: true } : {}), // 如果 `required` 为 true，动态添加
})

export default jsonResponse
