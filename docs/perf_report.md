# Performance & Rate Limits

## Upstream Limits
- Nile testnet APIs commonly enforce IP-based QPS limits.
- TronGrid/TronScan behavior can vary; keys improve stability.

## Retry Strategy
- Exponential backoff on HTTP 429.
- Default: 2 retries with backoff 500ms, 1000ms.
- Timeout: 8s per request.

## Concurrency Notes
- Current implementation is stateless and can be scaled horizontally.
- For higher concurrency, add a simple in-process queue or limiter.

## Caching
- Short TTL caching is recommended for:
  - latest block height
  - chain parameters
  - account snapshots (5-10 seconds)
