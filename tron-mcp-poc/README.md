# tron-mcp-poc

TRON Nile 测试网的 MCP 工具化示例，提供 HTTP Bridge + MCP stdio + Web Demo Console。面向评审快速验证“核心功能 + MCP 标准封装 + 安全可读化 + 交易闭环”。

## Highlights
- TronGrid + TronScan 双数据源，覆盖链上关键查询
- MCP 标准封装：`List Tools` / `Call Tool` 可被 MCP 客户端直接识别
- 安全可读化：Base58 校验、Hex 解析、风险提示
- 交易闭环：未签名交易生成 -> TronLink 本地签名 -> 广播
- Web Console 直观演示核心流程

## 对标挑战要求（已覆盖）
- 多维度数据连接：已集成 TronGrid + TronScan，工具数 >= 3
- MCP 标准封装：实现 `List Tools` / `Call Tool`
- 安全与规范：Base58 校验、Hex 地址解析、风险提示与自然语言可读化
- 可选扩展已实现：交易闭环、高级查询

## 可用工具（按模块）

### Core TRON 查询
| 工具 | 作用 | 数据源 | 备注 |
| --- | --- | --- | --- |
| `get_network_status` | 最新区块高度与时间戳 | TronGrid | 网络状态 |
| `get_usdt_balance(address)` | TRC20 USDT 余额（含 TRX） | TronScan | 基础资产查询 |
| `get_tx_status(txid)` | 交易确认状态与区块时间 | TronScan | 交易状态 |
| `get_account_profile(address)` | 账户画像与最近交易统计 | TronScan | 高级查询 |

### 交易闭环
| 工具 | 作用 | 数据源 | 备注 |
| --- | --- | --- | --- |
| `create_unsigned_transfer(from,to,amount)` | 生成未签名 TRX 转账交易 | TronGrid | 前端配合 TronLink |

### 安全与校验
| 工具 | 作用 | 数据源 | 备注 |
| --- | --- | --- | --- |
| `verify_unsigned_tx(unsignedTx)` | 未签名交易校验 | 本地 | txid 派生与过期检查 |

## 目录结构
- `tron-mcp-poc/server`：MCP Server + HTTP Bridge
- `tron-mcp-poc/web`：Web Demo Console
- `tron-mcp-poc/docs`：部署、API、架构、测试、性能、安全文档

## 快速开始（5分钟）

### 1) 安装依赖
```powershell
cd tron-mcp-poc\server
npm install
cd ..\web
npm install
```

### 2) 配置环境（Nile）
在 `tron-mcp-poc\server\.env` 中配置：
```env
NODE_ENV=development
TRONGRID_BASE=https://nile.trongrid.io
TRONSCAN_BASE=https://nileapi.tronscan.org
TRONGRID_API_KEY=
TRONSCAN_API_KEY=
```

### 3) 启动后端
```powershell
cd tron-mcp-poc\server
npm run dev
```

### 4) 启动前端
```powershell
cd tron-mcp-poc\web
npm run dev
```
打开：`http://localhost:5173`

## Web Console Demo Script（3-5分钟）
1. 打开 `/tools`，确认工具数 >= 3  
2. 依次演示 `Network Status`、`USDT Balance`、`Tx Status`  
3. 展示安全可读化输出（Base58/Hex/风险提示）  
4. TronLink 连接后演示交易闭环：`Create Unsigned Transfer` -> `Sign & Broadcast`  
5. `get_account_profile` 展示高级查询统计  

## MCP 兼容性验证

### stdio MCP
```powershell
cd tron-mcp-poc\server
npm run mcp:test
```

### HTTP MCP
```powershell
cd tron-mcp-poc\server
npm run mcp:http-test
```

预期输出包含：
- `initialize` 成功
- `tools/list` 返回工具
- `tools/call` 返回 `content/isError`

## HTTP Bridge 示例
```powershell
curl http://localhost:8787/tools
```
```powershell
curl -X POST http://localhost:8787/call -H "Content-Type: application/json" -d "{\"tool\":\"get_usdt_balance\",\"args\":{\"address\":\"TB3Ttmeh5bgesBmMSqRSjpSmBsufKNgjAN\"}}"
```

## 线上部署（Vercel + Railway）

### 后端 Railway
- 环境变量：`TRONGRID_BASE`、`TRONSCAN_BASE`、`CORS_ORIGIN`
- `CORS_ORIGIN` 建议填 Vercel 域名

### 前端 Vercel
- 环境变量：`VITE_API_BASE_URL=https://你的-railway-后端域名`
- 重新部署生效

## 配置说明
- `TRONGRID_BASE`：TronGrid API 地址（Nile: `https://nile.trongrid.io`）
- `TRONSCAN_BASE`：TronScan API 地址（Nile: `https://nileapi.tronscan.org`）
- `TRONGRID_API_KEY` / `TRONSCAN_API_KEY`：Nile 可留空，主网建议填写

## 常见问题
- `Non-JSON response`：请求打到了错误域名或后端未启动  
- `no OwnerAccount`：地址未激活或网络不一致  
- Tx 查询 404：txid 不在当前网络  

## 参赛提交材料
必须提交：
- 源代码：GitHub 公有仓库
- `README.md`
- 部署文档：`docs/deployment.md`
- API 文档：`docs/api.md`

推荐提交：
- 架构文档：`docs/architecture.md`
- 测试报告：`docs/test-report.md`
- 性能报告：`docs/perf_report.md`
- 安全说明：`docs/security.md`
- Demo 说明：`docs/demo.md`

## 截图占位
- Web Console 主界面（截图待补）
- MCP 调用结果（截图待补）
- 终端调用示例（截图待补）

## 对比 Tron-Copilot 的不足与改进建议

### 主要不足
- 工具覆盖广度不足：目前仅聚焦核心查询与交易闭环，缺少丰富的查询组合与批量分析
- 无 CLI Agent 与 LLM 编排：缺少交互式 CLI 与自动 tool-call 编排
- 缺少任务模块与通知：未提供 Telegram/审计日志/风控规则
- 缺少 TRC20 转账构建：仅支持 TRX 转账
- 缺少多场景扩展：如交易所适配、市场数据模块等

### 可执行改进
1. 增加高级查询工具  
新增最近交易列表、TRC20 转账列表、地址标签查询、双地址交易关系查询。  
2. 增加 TRC20 未签名转账  
新增 `create_unsigned_trc20_transfer`，与 TronLink 完成签名广播。  
3. 增加 CLI Agent 与 LLM 编排  
提供 CLI 界面与 `--debug` 模式，支持基础 tool-call 自动化。  
4. 增加通知与审计  
加入 Telegram 通知与交易审计日志，增强可运维性。  
5. 增加容错与缓存  
主备数据源切换，增加限流重试与短期缓存策略。  
