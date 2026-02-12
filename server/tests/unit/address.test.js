import test from "node:test";
import assert from "node:assert/strict";
import { base58CheckDecode, toHexAddress } from "../../src/providers/trongrid.js";

test("toHexAddress converts base58 to hex with checksum validation", () => {
  const address = "TDsUeaXFJHx7AabwWwkWvtQiSL7vfkxYav";
  const hex = toHexAddress(address);
  assert.equal(hex, "412acb119875a36b97e1eeb2b50bb42a676bf26202");
});

test("base58CheckDecode rejects invalid checksum", () => {
  const bad = "TDsUeaXFJHx7AabwWwkWvtQiSL7vfkxYax";
  assert.throws(() => base58CheckDecode(bad), /checksum/i);
});
