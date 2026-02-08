import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import { fetchJson } from "../../src/providers/http.js";

function startMockServer(handler) {
  const server = http.createServer(handler);
  return new Promise((resolve) => {
    server.listen(0, () => {
      const { port } = server.address();
      resolve({ server, port });
    });
  });
}

test("fetchJson retries on 429 and succeeds", async () => {
  let calls = 0;
  const { server, port } = await startMockServer((req, res) => {
    calls += 1;
    if (calls < 2) {
      res.writeHead(429, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "rate limited" }));
      return;
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: true }));
  });

  try {
    const data = await fetchJson(`http://127.0.0.1:${port}/`, { retries: 2, timeoutMs: 2000 });
    assert.deepEqual(data, { ok: true });
    assert.equal(calls, 2);
  } finally {
    server.close();
  }
});

test("fetchJson fails on non-JSON response", async () => {
  const { server, port } = await startMockServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("not json");
  });

  try {
    await assert.rejects(
      () => fetchJson(`http://127.0.0.1:${port}/`, { retries: 0, timeoutMs: 2000 }),
      /Non-JSON response/i
    );
  } finally {
    server.close();
  }
});
