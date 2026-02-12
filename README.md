# 🚀 RobinPump Trading Copilot（TRON MCP + Web Console）

> Pre-trade quote + slippage + split-order plan for bonding-curve tokens, making RobinPump trading more efficient.

## ✅ Submission Requirements 对照

| 要求 | 状态 | 说明 |
| --- | --- | --- |
| 1. 使用相关区块链技术 | 已满足 | TRON + TronGrid + TronScan + TronLink |
| 2. 开源可用 | 已满足 | 仓库公开 + `LICENSE` |
| 3. 短摘要（<150 chars） | 已满足 | 本文顶部 summary |
| 4. 完整描述（问题/方案/实现） | 已满足 | `Problem` / `Solution` / `How It Works` |
| 5. 技术描述（SDK + sponsor tech） | 已满足 | `Technical Stack` |
| 6. Canva Slides 链接 | 待补 | `Submission Assets` |
| 7a. Demo 视频 | 待补 | `Submission Assets` |
| 7b. UI 截图 | 待补 | `demo/screenshots/` |
| 7c. 区块链交互说明 | 已满足 | `How It Works with TRON` |
| 7d. Loom（带语音讲解） | 待补 | `Submission Assets` |

## 🧠 Problem
- bonding curve 场景单笔大单滑点高
- 下单前缺少可解释预演
- 缺少可执行的拆单建议

## 🛠 Solution
- `rp_quote`：交易前报价与冲击预演
- `rp_split_plan`：生成拆单方案并对比 single vs split
- 保留 TRON 原能力：网络状态、余额、交易状态、账户画像、未签名交易验证与创建

## ⚙️ Technical Stack
- Node.js (ESM)
- `@modelcontextprotocol/sdk`
- TronGrid API / TronScan API
- React + Vite
- TronLink（签名广播）

## 🔗 How It Works with TRON
1. 客户端调用 `/tools` 获取工具目录。
2. 通过 `/call` 调用 `rp_quote` / `rp_split_plan`。
3. 服务端请求 TronGrid/TronScan 返回结构化结果。
4. 执行闭环时，服务端生成 unsigned tx，前端用 TronLink 签名并广播。

## 🧩 Tool Catalog
### RobinPump Copilot
- `rp_quote`
- `rp_split_plan`

### TRON Core
- `get_network_status`
- `get_usdt_balance`
- `get_tx_status`
- `get_account_profile`
- `verify_unsigned_tx`
- `create_unsigned_transfer`

## ⚡ Judge Quickstart
```powershell
cd server
npm install
npm run dev
```

```bash
curl -s http://localhost:8787/tools | jq .
curl -X POST http://localhost:8787/call -H "Content-Type: application/json" -d '{"tool":"rp_quote","args":{"preset":"A","side":"buy","amountIn":100}}' | jq .
curl -X POST http://localhost:8787/call -H "Content-Type: application/json" -d '{"tool":"rp_split_plan","args":{"preset":"A","side":"buy","totalAmountIn":100,"parts":4,"maxSlippageBps":300}}' | jq .
```

Expected:
- 工具列表包含 `rp_quote` / `rp_split_plan`
- `singleTradeImpactPct > splitAvgImpactPct`
- `summary` 给出拆单建议

## 🎬 Submission Assets
- Canva Slides: `https://www.canva.com/design/TODO_REPLACE`
- Demo Video: `https://youtu.be/TODO_REPLACE`
- Loom Walkthrough: `https://www.loom.com/share/TODO_REPLACE`

### UI Screenshots
- `demo/screenshots/web-console-main.png`
- `demo/screenshots/mcp-call-result.png`
- `demo/screenshots/terminal-curl.png`

## 📁 Repo Structure
```text
.
├─ README.md
├─ LICENSE
├─ server/
├─ web/
├─ docs/
└─ demo/
```
