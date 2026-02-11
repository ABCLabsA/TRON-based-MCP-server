export function assertPositiveNumber(name, value) {
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) {
    throw new Error(`${name} must be a positive number`);
  }
  return n;
}

export function assertFeeBps(value = 0) {
  if (value === undefined || value === null) return 0;
  const n = Number(value);
  if (!Number.isInteger(n) || n < 0 || n > 5000) {
    throw new Error("feeBps must be an integer between 0 and 5000");
  }
  return n;
}

export function normalizeCurve(curve = {}) {
  const virtualBase = assertPositiveNumber("virtualBase", curve.virtualBase);
  const virtualToken = assertPositiveNumber("virtualToken", curve.virtualToken);
  const feeBps = assertFeeBps(curve.feeBps ?? 0);
  return { virtualBase, virtualToken, feeBps };
}

export function spotPrice(curve) {
  const c = normalizeCurve(curve);
  return c.virtualBase / c.virtualToken;
}

function round(num) {
  return Number(num.toFixed(12));
}

export function quoteBuy(curve, amountBaseIn) {
  const c = normalizeCurve(curve);
  const amountIn = assertPositiveNumber("amountBaseIn", amountBaseIn);

  const feeRate = c.feeBps / 10000;
  const amountInAfterFee = amountIn * (1 - feeRate);

  const x = c.virtualBase;
  const y = c.virtualToken;
  const k = x * y;

  const xAfter = x + amountInAfterFee;
  const yAfter = k / xAfter;
  const amountOut = y - yAfter;

  const spotPriceBefore = x / y;
  const spotPriceAfter = xAfter / yAfter;
  const avgPrice = amountIn / amountOut;
  const priceImpactPct = ((spotPriceAfter - spotPriceBefore) / spotPriceBefore) * 100;

  return {
    side: "buy",
    amountIn: round(amountIn),
    amountOut: round(amountOut),
    avgPrice: round(avgPrice),
    spotPriceBefore: round(spotPriceBefore),
    spotPriceAfter: round(spotPriceAfter),
    priceImpactPct: round(priceImpactPct),
    feePaid: round(amountIn * feeRate),
    nextCurve: {
      virtualBase: round(xAfter),
      virtualToken: round(yAfter),
      feeBps: c.feeBps
    }
  };
}

export function quoteSell(curve, amountTokenIn) {
  const c = normalizeCurve(curve);
  const amountIn = assertPositiveNumber("amountTokenIn", amountTokenIn);

  const feeRate = c.feeBps / 10000;
  const amountInAfterFee = amountIn * (1 - feeRate);

  const x = c.virtualBase;
  const y = c.virtualToken;
  const k = x * y;

  const yAfter = y + amountInAfterFee;
  const xAfter = k / yAfter;
  const amountOut = x - xAfter;

  const spotPriceBefore = x / y;
  const spotPriceAfter = xAfter / yAfter;
  const avgPrice = amountOut / amountIn;
  const priceImpactPct = ((spotPriceBefore - spotPriceAfter) / spotPriceBefore) * 100;

  return {
    side: "sell",
    amountIn: round(amountIn),
    amountOut: round(amountOut),
    avgPrice: round(avgPrice),
    spotPriceBefore: round(spotPriceBefore),
    spotPriceAfter: round(spotPriceAfter),
    priceImpactPct: round(priceImpactPct),
    feePaid: round(amountIn * feeRate),
    nextCurve: {
      virtualBase: round(xAfter),
      virtualToken: round(yAfter),
      feeBps: c.feeBps
    }
  };
}

export function quoteBySide(curve, side, amountIn) {
  if (side === "buy") return quoteBuy(curve, amountIn);
  if (side === "sell") return quoteSell(curve, amountIn);
  throw new Error("side must be 'buy' or 'sell'");
}

export function splitPlan(curve, side, totalAmountIn, parts) {
  const total = assertPositiveNumber("totalAmountIn", totalAmountIn);
  const p = Number(parts);
  if (!Number.isInteger(p) || p < 2 || p > 50) {
    throw new Error("parts must be an integer between 2 and 50");
  }

  const single = quoteBySide(curve, side, total);
  const each = total / p;

  let current = normalizeCurve(curve);
  const plan = [];
  let splitTotalOut = 0;
  let impactSum = 0;

  for (let i = 0; i < p; i += 1) {
    const q = quoteBySide(current, side, each);
    splitTotalOut += q.amountOut;
    impactSum += q.priceImpactPct;
    plan.push({
      index: i + 1,
      amountIn: q.amountIn,
      expectedOut: q.amountOut,
      expectedImpactPct: q.priceImpactPct,
      avgPrice: q.avgPrice
    });
    current = q.nextCurve;
  }

  return {
    single,
    plan,
    splitTotalOut: round(splitTotalOut),
    splitAvgImpactPct: round(impactSum / p)
  };
}
