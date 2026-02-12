# 🚀 RobinPump Trading Copilot · Server（MCP/HTTP）

⭐ 本文档是服务端运行与验证手册，风格与根目录 `README.md` 保持一致。

## ✨ 服务端能力
- 提供 HTTP Bridge：`/health`、`/tools`、`/call`、`/mcp`
- 提供 MCP stdio 模式（可接入 Claude Desktop / 其他 MCP 客户端）
- 支持 RobinPump Copilot 工具：`rp_quote`、`rp_split_plan`
- 支持原有 TRON 查询与交易辅助工具

## 📦 快速启动（HTTP 模式）
```powershell
cd server
npm install
npm run dev
```

默认端口：`8787`

验证：
```bash
curl -s http://localhost:8787/health
curl -s http://localhost:8787/tools | jq .
```

自定义端口（Windows）：
```powershell
set PORT=8790
npm run dev
```

## 🧠 MCP stdio 模式
仅启动 MCP stdio（不启 HTTP 监听）：
```powershell
cd server
npm run mcp:stdio
```

如果需要在 stdio 模式下同时暴露 HTTP 端口：
```powershell
set MCP_HTTP_PORT=8790
npm run mcp:stdio
```

## ⚡ Quick Verification（Judge / Dev）
### 1) 工具列表
```bash
curl -s http://localhost:8787/tools | jq .
```

### 2) `rp_quote`（Preset A）
```bash
curl -X POST http://localhost:8787/call \
  -H "Content-Type: application/json" \
  -d '{
    "tool":"rp_quote",
    "args":{
      "preset":"A",
      "side":"buy",
      "amountIn":100
    }
  }' | jq .
```

### 3) `rp_split_plan`（Preset A）
```bash
curl -X POST http://localhost:8787/call \
  -H "Content-Type: application/json" \
  -d '{
    "tool":"rp_split_plan",
    "args":{
      "preset":"A",
      "side":"buy",
      "totalAmountIn":100,
      "parts":4,
      "maxSlippageBps":300
    }
  }' | jq .
```

预期结果：
- `tools` 中能看到 `rp_quote`、`rp_split_plan`
- `singleTradeImpactPct > splitAvgImpactPct`
- `summary` 有明确拆单建议

## 🧪 MCP 测试脚本
stdio 冒烟测试：
```powershell
cd server
npm run mcp:test
```

HTTP MCP 冒烟测试：
```powershell
cd server
npm run mcp:http-test
```

## 🔌 Claude Desktop 接入（可选）
1. 以 `server/mcp.json` 为模板。
2. 将脚本路径指向本地 `server/src/index.js`。
3. 如需更高配额，可在 `env` 增加 `TRONGRID_API_KEY`。
4. 将 `mcpServers` 段落粘贴到 Claude Desktop 配置文件。

Windows 配置文件位置：
```text
%APPDATA%\Claude\claude_desktop_config.json
```

## ☁️ 环境变量
常用变量：
- `PORT`
- `MCP_HTTP_PORT`
- `TRONGRID_BASE`
- `TRONSCAN_BASE`
- `TRONGRID_API_KEY`（可选）

Nile 测试网建议：
- `TRONGRID_BASE=https://nile.trongrid.io`
- `TRONSCAN_BASE=https://nileapi.tronscan.org`

## 📁 相关文件
- `server/src/index.js`：工具注册与调用入口
- `server/src/robinpump/curve.js`：bonding curve 计算模块
- `server/scripts/mcp-smoke-test.js`：stdio 测试脚本
- `server/scripts/http-mcp-smoke-test.js`：HTTP MCP 测试脚本
