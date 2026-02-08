# 测试报告（简要）

## 手工测试
- `/health` 返回 `ok:true`
- `/tools` 返回 5 个工具（含 `get_account_profile`、`verify_unsigned_tx`）
- `get_network_status` 返回最新区块
- `get_usdt_balance` 返回 USDT 与 TRX 余额
- `get_tx_status` 返回交易状态
- `get_account_profile` 返回最近交易统计（recent/inbound/outbound/lastIso）
- `verify_unsigned_tx` 返回 `valid`、`txid`、`warnings`
- 错误路径：`get_tx_status` 传入非法 txid 返回 `INVALID_TXID`

## MCP stdio 冒烟测试
```
cd tron-mcp-poc\server
npm run mcp:test
```

预期：
- 输出工具列表
- 校验 5 个工具全部注册
- 依次调用 5 个工具
- 覆盖 1 个错误路径（非法 txid）
