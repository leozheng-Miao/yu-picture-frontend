import { generateService } from '@umijs/openapi'

generateService({
  requestLibPath: "import request from '@/request'", // 使用某一个请求库
  schemaPath: 'http://localhost:8123/api/v2/api-docs',
  serversPath: './src',
})
