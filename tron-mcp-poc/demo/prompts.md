# Demo Prompts

1. Quote demo (preset A)
请用 `rp_quote` 以 preset A 模拟一笔 buy 订单（amountIn=100），并解释 amountOut、avgPrice、priceImpactPct。

2. Split plan demo (preset A)
请调用 `rp_split_plan`（preset A, totalAmountIn=100, parts=4, maxSlippageBps=300），比较 singleTradeImpactPct 与 splitAvgImpactPct，并给出执行建议。

3. Efficiency summary
基于 quote + split plan 的结果，总结为什么拆单能提高执行效率，并给出面向评委的 3 句话结论。
