# 架构文档

## 总览
- MCP Server: 提供 stdio 工具协议
- HTTP Bridge: 为 Web/脚本提供 REST 接口
- Web Console: 便于演示与调试

## 组件
- `server/src/index.js`: 入口，提供 HTTP 与 MCP stdio
- `server/src/providers/`: 上游 API 封装
- `web/src/App.jsx`: Demo 控制台

## 数据流
1) 用户在 Web 或 MCP 工具中发起请求
2) HTTP Bridge / MCP Handler 统一调用 `handleToolCall`
3) Provider 调用 TronGrid / TronScan
4) 返回统一结构化结果

## 关键设计
- 统一输出格式，便于工具编排
- 超时 8 秒 + 429 退避重试
- Nile 测试网默认配置
