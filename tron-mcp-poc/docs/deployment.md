# 部署文档

## 环境要求
- Node.js 18+
- 可访问 Nile 测试网 API

## 环境变量
在 `server/.env` 中配置：
```
NODE_ENV=production
PORT=8787
TRONGRID_BASE=https://nile.trongrid.io
TRONSCAN_BASE=https://nileapi.tronscan.org
TRONGRID_API_KEY=
TRONSCAN_API_KEY=
```
说明：Nile 测试网无需 API key，单 IP QPS 50。

## 启动后端
```
cd tron-mcp-poc\server
npm install
npm run start
```

## 启动前端
```
cd tron-mcp-poc\web
npm install
npm run build
npm run preview
```

## 健康检查
```
curl http://localhost:8787/health
```

## 常见问题
- 若端口冲突，修改 `PORT` 或 `MCP_HTTP_PORT`
- 若访问失败，请检查防火墙或代理
