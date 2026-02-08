# 测试报告（简要）

## 手工测试
- `/health` 返回 `ok:true`
- `/tools` 返回 3 个工具
- `get_network_status` 返回最新区块
- `get_usdt_balance` 返回 USDT 与 TRX 余额
- `get_tx_status` 返回交易状态

## MCP stdio 冒烟测试
```
cd tron-mcp-poc\server
npm run mcp:test
```

预期：
- 输出工具列表
- 依次调用 3 个工具
