# TRON MCP Project Context

## Project Goal

Build a Model Context Protocol (MCP) server for the TRON Nile Testnet.

## Tech Stack

- TypeScript (Node.js)
- @modelcontextprotocol/sdk
- tronweb (Official SDK)
- zod (Schema Validation)

## Coding Standards

1. **TronWeb Initialization**: ALWAYS use `https://nile.trongrid.io` for fullHost. Do NOT use Mainnet.
2. **Error Handling**: All tool executions must be wrapped in try-catch blocks. Return `isError: true` on failure.
3. **Data Formatting**:
   - Amounts from chain are in SUN (integer). Convert to TRX using `tronWeb.fromSun()` for display.
   - Addresses must be in Base58 format.
4. **Tool Definitions**: Descriptions must be concise and clear for the AI client to understand.

## Key Resources

- Nile Faucet: https://nileex.io/join/getJoinPage
- TronScan Nile: https://nile.tronscan.org/
