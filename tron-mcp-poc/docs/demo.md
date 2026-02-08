# Demo Steps

## 1) Start Server
```
cd tron-mcp-poc\server
npm install
npm run dev
```

## 2) Start Web Console
```
cd tron-mcp-poc\web
npm install
npm run dev
```
Open: `http://localhost:5173`

## 3) Web Demo Flow
1. Input a Nile address.
2. Click `Network Status` and show latest block.
3. Click `USDT Balance` and show balances + address meta.
4. Click `Tx Status` for a known txid.

## 4) Claude Desktop Flow
1. Configure `server/mcp.json`.
2. Start stdio server:
```
cd tron-mcp-poc\server
npm run mcp:stdio
```
3. Ask: "查询地址 ... 的 USDT 余额，并给出风险提示"。

## 5) Unsigned Tx Verify
```
curl -X POST http://localhost:8787/call -H "Content-Type: application/json" -d "{\"tool\":\"verify_unsigned_tx\",\"args\":{\"rawDataHex\":\"0a02cafe\"}}"
```
