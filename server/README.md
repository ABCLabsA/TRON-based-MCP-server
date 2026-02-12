# 🚀 RobinPump 服务端文档（MCP / HTTP）

## ✨ 服务能力
- HTTP Bridge：`/health`、`/tools`、`/call`、`/mcp`
- MCP stdio：可接入 Claude Desktop 等 MCP 客户端
- 工具能力：TRON 查询 + `rp_quote` + `rp_split_plan`

## ⚡ 启动方式
```powershell
cd server
npm install
npm run dev
```

默认端口：`8787`

## 🧪 快速验证
```bash
curl -s http://localhost:8787/tools | jq .
curl -X POST http://localhost:8787/call -H "Content-Type: application/json" -d '{"tool":"rp_quote","args":{"preset":"A","side":"buy","amountIn":100}}' | jq .
curl -X POST http://localhost:8787/call -H "Content-Type: application/json" -d '{"tool":"rp_split_plan","args":{"preset":"A","side":"buy","totalAmountIn":100,"parts":4,"maxSlippageBps":300}}' | jq .
```

## 🧠 MCP stdio 模式
```powershell
cd server
npm run mcp:stdio
```

## 🌐 环境变量（Nile 推荐）
- `TRONGRID_BASE=https://nile.trongrid.io`
- `TRONSCAN_BASE=https://nileapi.tronscan.org`
- `TRONGRID_API_KEY`（可选）
- `CORS_ORIGIN`
