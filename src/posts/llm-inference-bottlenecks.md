---
title: Where LLM Inference Spends Its Time
date: 2026-08-14
summary: A systems-oriented introduction to prefill, token decoding, memory pressure, and the tradeoffs behind inference throughput.
tags: AI Systems, GPU, Performance
---

> **Demo article:** This is a conceptual overview. Add actual measurements and references when adapting it to your portfolio.

## Two phases, different bottlenecks

LLM inference is often discussed as one workload, but **prefill** and **decode** behave differently. Prefill processes the prompt in parallel, while decode generates tokens sequentially across steps.

## What changes with batching?

Larger batches can improve accelerator utilization, but they also increase memory requirements and may affect latency. The best batch size depends on the model, hardware, sequence lengths, and serving objectives.

## Questions worth profiling

- How does time to first token change with prompt length?
- What happens to tokens per second as batch size grows?
- How much memory is occupied by model weights and the KV cache?
- When does communication become the bottleneck across devices?

## A useful benchmark report

Record the exact model, precision, GPU type, serving engine, prompt and output lengths, warm-up procedure, and measurement methodology. Plot latency and throughput together to expose tradeoffs.

**Takeaway:** Inference optimization is a systems problem, not only a model problem.
