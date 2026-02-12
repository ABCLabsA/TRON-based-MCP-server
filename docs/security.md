# Security Notes

## Key Principles
- Never collect or log private keys, seed phrases, or signed raw transactions.
- Treat all user inputs as untrusted and validate early.
- Keep signing outside the MCP server. Only accept unsigned payloads for verification.

## Input Validation
- Address format: Base58Check validation before any upstream call.
- Txid format: strict 64-hex validation.
- Raw data hex: even-length hex only.

## Transport & Logging
- Only log upstream metadata in non-production mode.
- Redact or avoid logging user-provided transaction payloads.

## Unsigned Transaction Handling
- `verify_unsigned_tx` only validates and derives `txid`.
- No signing is performed server-side.

## Rate Limiting / Abuse
- Upstream providers enforce rate limits.
- Retry with exponential backoff on HTTP 429.
