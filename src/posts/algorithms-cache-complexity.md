---
title: From Big-O to Cache Complexity
date: 2026-11-22
summary: Asymptotic complexity is essential, but real performance also depends on locality, memory traffic, and the machine hierarchy.
tags: Algorithms, Computer Architecture, Foundations
---

Big-O notation helps compare how an algorithm scales as input size grows. It does not, by itself, predict how efficiently the algorithm uses a real processor.

## The cost model is layered

Two algorithms can both be `O(n)` while having very different performance. One may scan contiguous memory, while another follows pointers across unrelated locations. The second algorithm can suffer more cache misses even though the asymptotic work is identical.

## Locality changes the practical cost

Temporal locality means recently used data may be used again. Spatial locality means nearby data is likely to be accessed soon. Cache lines exploit spatial locality by moving a block of adjacent bytes rather than a single value.

```text
for i in 0..n:
    total += values[i]
```

This sequential access pattern is usually easier for hardware to prefetch than a random access pattern.

## A more useful performance question

Instead of asking only “What is the Big-O complexity?”, ask:

- How many bytes are read and written?
- Are accesses contiguous or irregular?
- Can data be reused while it is in cache?
- Does the working set fit in the target memory level?
- How much parallelism is available?

## Research connection

Cache-aware and cache-oblivious algorithms connect theoretical analysis to hardware behavior. They provide a useful bridge between algorithm design, memory hierarchy research, and performance engineering.

**Takeaway:** Complexity describes growth; locality and data movement often explain the timing you actually observe.
