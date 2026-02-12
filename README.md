# 🚀 RobinPump Trading Copilot (MCP + Web Console)

⭐ Pre-trade `quote` + slippage-aware `split plan` for bonding-curve tokens, with MCP tools and one-click Web Console demo.

## ✨ Why This Project
RobinPump trading often suffers from large one-shot slippage and unclear execution plans.
This project upgrades a TRON MCP server into a **DeFi Track trading copilot** that helps users decide **before** sending transactions.

## 🧩 Core Modules
### 1) Multi-dimensional Data Access (TRON)
- `get_network_status`
- `get_usdt_balance`
- `get_tx_status`
- `get_account_profile`
- `verify_unsigned_tx`
- `create_unsigned_transfer` (execution demo flow)

### 2) MCP Standard Packaging
- Supports `tools/list` and `tools/call`
- Exposed by HTTP bridge (`/tools`, `/call`, `/mcp`)
- Can be recognized by MCP-capable clients

### 3) Safety & Readability
- Address validation and Base58/Hex metadata output
- Structured summaries for human-readable interpretation

## 🧠 RobinPump Copilot Extensions
### `rp_quote`
- Simulates buy/sell on virtual-reserve bonding curve
- Outputs: `amountOut`, `avgPrice`, `spotPriceBefore/After`, `priceImpactPct`

### `rp_split_plan`
- Compares single-trade vs split-trade execution
- Outputs tranche plan and comparison fields:
  - `singleTradeImpactPct`
  - `splitAvgImpactPct`
  - `singleTotalOut`
  - `splitTotalOut`

## 🖥️ Web Console Demo (3–5 min)
1. Open the web console.
2. Enter **RobinPump Copilot** section.
3. Click `Preset A (Low Liquidity)`.
4. Click `Run rp_quote`.
5. Click `Run rp_split_plan`.
6. Show that split average impact is lower than single-trade impact.

## ⚡ Judge Quickstart (No UI Required)
Start server:

```powershell
cd server
npm install
npm run dev
```

### 1) List tools
```bash
curl -s http://localhost:8787/tools | jq .
```

### 2) Quote with preset A
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

### 3) Split plan with preset A
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

Expected:
- `/tools` contains `rp_quote` and `rp_split_plan`
- `comparison.singleTradeImpactPct > comparison.splitAvgImpactPct`
- `summary` clearly gives split-order recommendation

> If `jq` is not installed, remove `| jq .`.

## 📦 Local Run
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

Open: `http://localhost:5173`

## ☁️ Deployment
### Backend (Railway)
Required env:
- `TRONGRID_BASE`
- `TRONSCAN_BASE`
- `CORS_ORIGIN`

### Frontend (Vercel)
Required env:
- `VITE_API_BASE_URL=https://<your-railway-domain>`

## 🗂️ Submission Checklist
- Canva Slides: TODO
- Demo Video: TODO
- Screenshots: TODO
- Loom Walkthrough: TODO

Materials placeholder paths:
- `demo/prompts.md`
- `demo/screenshots/`

## 📁 Project Structure
```text
.
├─ README.md
├─ .env.example
├─ server/
├─ web/
├─ docs/
└─ demo/
```
