# 🚀 RobinPump Trading Copilot（MCP + Web Console）

⭐ 面向 RobinPump.fun 的交易前辅助系统：提供 `quote` 预演、滑点评估与拆单计划（split plan），帮助用户更高效执行交易。

## ✨ 项目定位
RobinPump 等 bonding curve 场景里，单笔大额交易常见问题是：
- 滑点过大
- 执行效率低
- 缺少下单前可解释的预演与建议

本项目在现有 TRON MCP Server 基础上做最小改造，升级为 **DeFi Track Trading Copilot**。

## 🧩 核心功能模块
### 1) 多维度链上数据连接（TRON）
- `get_network_status`
- `get_usdt_balance`
- `get_tx_status`
- `get_account_profile`
- `verify_unsigned_tx`
- `create_unsigned_transfer`（可作为执行链路示例）

### 2) MCP 标准封装
- 支持 `tools/list` 与 `tools/call`
- 提供 HTTP Bridge：`/tools`、`/call`、`/mcp`
- 可被支持 MCP 的客户端识别与调用

### 3) 安全与可读化
- 地址校验与 Base58/Hex 元数据输出
- 返回结构带摘要字段，便于人类与 AI Agent 理解

## 🧠 RobinPump Copilot 扩展工具
### `rp_quote`
用于买入/卖出预演（基于虚拟储备常数乘积模型），输出：
- `amountOut`
- `avgPrice`
- `spotPriceBefore` / `spotPriceAfter`
- `priceImpactPct`

### `rp_split_plan`
用于拆单建议与对比分析，输出：
- 分笔执行计划（plan）
- `singleTradeImpactPct` 与 `splitAvgImpactPct` 对比
- `singleTotalOut` 与 `splitTotalOut` 对比

## 🖥️ Web Console 演示（3–5 分钟）
1. 打开 Web Console。
2. 进入 **RobinPump Copilot** 区域。
3. 点击 `Preset A (Low Liquidity)`。
4. 点击 `Run rp_quote`。
5. 点击 `Run rp_split_plan`。
6. 展示 `single vs split` 对比，说明拆单收益。

## ⚡ Judge Quickstart（不打开 UI 也可验收）
先启动服务端：

```powershell
cd server
npm install
npm run dev
```

### 1) 查看工具列表
```bash
curl -s http://localhost:8787/tools | jq .
```

### 2) 运行 quote（Preset A）
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

### 3) 运行 split plan（Preset A）
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
- `/tools` 中能看到 `rp_quote` 和 `rp_split_plan`
- `comparison.singleTradeImpactPct > comparison.splitAvgImpactPct`
- `summary` 中能明确体现拆单建议

> 若本机未安装 `jq`，可去掉 `| jq .`，直接查看原始 JSON。

## 📦 本地运行
### Server
```powershell
cd server
npm install
npm run dev
```

### Web
```powershell
cd web
npm install
npm run dev
```

打开：`http://localhost:5173`

## ☁️ 部署说明
### Backend（Railway）
必需环境变量：
- `TRONGRID_BASE`
- `TRONSCAN_BASE`
- `CORS_ORIGIN`

### Frontend（Vercel）
必需环境变量：
- `VITE_API_BASE_URL=https://<your-railway-domain>`

## 🗂️ 提交材料清单（占位）
- Canva Slides: TODO
- Demo Video: TODO
- Screenshots: TODO
- Loom Walkthrough: TODO

材料目录：
- `demo/prompts.md`
- `demo/screenshots/`

## 📁 项目结构
```text
.
├─ README.md
├─ .env.example
├─ server/
├─ web/
├─ docs/
└─ demo/
```
