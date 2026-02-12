# Demo Script（3分钟）

## 0:00 - 0:20  开场与痛点
- 讲解词：
  - 大家好，我们的项目叫 **tron-mcp-poc**，它把 TRON 链上数据能力封装成 MCP 工具，并提供 Web Demo 与 Claude Desktop 两种使用方式。
  - 传统区块链查询要在多个网站和 API 间切换，我们希望把常用查询变成“随问随答”的工具。

## 0:20 - 0:45  方案概览
- 讲解词：
  - 架构很清晰：一个 Node.js MCP Server，同时提供 HTTP Bridge 和 MCP stdio。
  - 上游数据来自 TronGrid（USDT/TRX 余额、网络状态）与 TronScan（交易状态）。
  - 前端 Web Console 方便现场演示与调试。

## 0:45 - 1:20  功能演示（Web）
- 画面：打开 `http://localhost:5173`
- 讲解词：
  - 我们先在 Web Console 输入地址和 txid。
  - 点击 **Network Status**，返回最新区块高度和时间戳。
  - 点击 **USDT Balance**，看到 USDT 与 TRX 余额，并处理 decimals。
  - 同时展示地址安全快照：Base58 校验结果、地址 Hex、风险提示。
  - 点击 **Tx Status**，返回交易状态与确认时间。
  - 最后演示 **Unsigned Tx Verify**：输入 `raw_data_hex` 或未签名交易对象，返回 `valid`、`txid` 与风险提示。

## 1:20 - 2:10  MCP 能力演示（Claude Desktop）
- 画面：Claude Desktop 调用工具
- 讲解词：
  - 同一套工具也可以在 Claude Desktop 里调用。
  - 通过 `mcp.json` 配置即可连接 stdio MCP Server。
  - Claude 直接调用 `get_usdt_balance`，返回结构化结果，便于自动化编排。
  - 展示“自然语言 -> MCP 调用 -> 结构化结果 -> 解释输出”的完整链路。

## 2:10 - 2:40  技术亮点
- 讲解词：
  - 统一的工具接口格式：ok/tool/chain/data/summary/meta。
  - 8 秒超时 + 429 退避重试，保证稳定性。
  - Base58 地址解析与风险提示，满足安全场景展示。

## 2:40 - 3:00  收尾与展望
- 讲解词：
  - 下一步可以扩展更多 TRON 工具，比如转账、合约调用、链上监控。
  - 也可以接入更多模型或工作流系统，实现更丰富的链上自动化。
