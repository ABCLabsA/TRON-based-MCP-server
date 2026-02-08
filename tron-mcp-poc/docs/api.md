# API 文档

## 基础信息
- Base URL: `http://localhost:8787`
- 返回格式：
```
{
  "ok": true/false,
  "tool": "...",
  "chain": "TRON",
  "data": {...},
  "summary": { "zh": "..." },
  "meta": { "ts": number, "source": "...", "requestId": "..." }
}
```

## GET /tools
返回工具列表。

示例：
```
curl http://localhost:8787/tools
```

## POST /call
请求体：
```
{ "tool": "<tool_name>", "args": { ... } }
```

### get_network_status
```
{ "tool": "get_network_status", "args": {} }
```

### get_usdt_balance
```
{ "tool": "get_usdt_balance", "args": { "address": "T..." } }
```

### get_tx_status
```
{ "tool": "get_tx_status", "args": { "txid": "<64-hex>" } }
```

## 校验规则
- address：以 `T` 开头，长度 30~40
- txid：64 位 hex

## 错误码
- `INVALID_REQUEST`
- `TOOL_NOT_FOUND`
- `INVALID_ADDRESS`
- `INVALID_TXID`
- `MISSING_API_KEY`
- `UPSTREAM_ERROR`
