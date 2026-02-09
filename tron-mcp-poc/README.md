# tron-mcp-poc

TRON Nile 测试网的 MCP 工具化示例，提供 HTTP Bridge + MCP stdio + Web Demo Console。适合赛事评审快速验证“核心功能 + MCP 标准封装 + 安全可读化 + 交易闭环”。

## 对标挑战要求（已完整覆盖）
- 多维度数据连接：已集成 TronGrid + TronScan，提供 >= 3 个链上功能点
- MCP 标准封装：支持 `List Tools` / `Call Tool`，可被 MCP 客户端直接识别调用
- 安全与规范：Base58 校验、Hex 解析、风险提示，并提供可读化输出
- 可选扩展已实现：
  - 交易闭环：生成未签名交易 -> TronLink 本地签名 -> 广播
  - 高级查询：账户画像与交易统计

## 项目简介
- 将 TRON 链上常用查询封装为 MCP 工具
- 同时提供 HTTP Bridge，方便 Web/脚本调用
- 提供 Web Console 作为可视化 Demo
- 支持 TronLink 交易闭环演示（生成未签名交易 -> 本地签名 -> 广播）

## 核心功能
- `get_network_status`：查询最新区块高度与时间戳
- `get_usdt_balance`：查询 TRC20 USDT 余额（含 TRX 余额）
- `get_tx_status`：查询交易状态与确认时间
- `get_account_profile`：账户画像（余额 + 最近交易统计）
- `verify_unsigned_tx`：未签名交易校验（txid 派生、地址格式、过期检查）
- `create_unsigned_transfer`：生成未签名 TRX 转账交易（配合 TronLink 签名与广播）
- 地址安全快照：Base58 校验、地址 Hex、风险提示

## 项目亮点
- 核心模块覆盖完整：网络状态、余额、交易状态、账户画像
- 双通道接入：MCP 标准协议 + HTTP Bridge
- 可读化安全解析：Hex/Base58 转换与风险提示直观展示
- 交易闭环：前端直接驱动 TronLink 完成本地签名与广播
- 高级查询：账户画像统计支持更高层分析场景

## 技术栈
- Node.js 18+（HTTP Bridge + MCP stdio）
- React + Vite（Web Demo Console）
- 上游 API：TronGrid / TronScan（Nile 测试网）

## 目录结构
- `tron-mcp-poc/server`：MCP Server 与 HTTP Bridge
- `tron-mcp-poc/web`：Web Console
- `tron-mcp-poc/docs`：部署、API、架构、测试、性能、安全等文档

## 快速开始（5分钟）

### 1) 安装依赖
```powershell
cd tron-mcp-poc\server
npm install
cd ..\web
npm install
```

### 2) 配置环境（Nile 测试网）
在 `tron-mcp-poc\server\.env` 中配置：
```env
NODE_ENV=development
TRONGRID_BASE=https://nile.trongrid.io
TRONSCAN_BASE=https://nileapi.tronscan.org
TRONGRID_API_KEY=
TRONSCAN_API_KEY=
```
说明：Nile 测试网可不填 API key，填写后可提升限额稳定性。

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

## Web Console 演示流程（3-5分钟 Demo Script）

### 0:00-0:20 开场
- 项目定位：TRON MCP Server，封装 TronGrid/TronScan 链上能力，提供 Web Console + MCP 调用能力

### 0:20-1:30 核心功能模块（Web Console）
1. 打开 `/tools` 列表，展示工具数 >= 3
2. `Network Status`：查询当前网络区块高度与 Gas 相关参数
3. `USDT Balance`：输入地址查询 TRC20 USDT，同时返回 TRX 余额
4. `Tx Status`：输入 txid 返回确认状态与区块时间

### 1:30-2:10 MCP 标准封装
- MCP 支持 `List Tools` / `Call Tool`，任意 MCP 客户端可识别调用

### 2:10-2:40 安全与规范（AI 可读化）
- 返回包含 Base58 校验、Hex 地址、风险提示
- 前端展示结构化数据到自然语言解释

### 2:40-3:40 可选扩展：交易闭环
1. 连接 TronLink
2. 输入接收地址与金额
3. 点击 `Create Unsigned Transfer`
4. 点击 `Sign & Broadcast`
5. 展示返回的 `txid`

### 3:40-4:30 可选扩展：高级查询
- `get_account_profile` 返回最近交易统计（入账/出账/最近时间），便于账户分析

### 4:30-5:00 收尾
- 核心功能 + MCP 标准封装 + 可读化安全解析已完整
- 支持交易闭环与高级查询扩展

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
- `TRONGRID_BASE`：TronGrid API 基础地址（Nile: `https://nile.trongrid.io`）
- `TRONSCAN_BASE`：TronScan API 基础地址（Nile: `https://nileapi.tronscan.org`）
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
