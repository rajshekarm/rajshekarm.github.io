---
title: The Roofline Model for AI Hardware
date: 2026-11-22
summary: Arithmetic intensity provides a simple way to reason about whether an AI kernel is limited by computation or memory bandwidth.
tags: AI Hardware, Performance, Computer Architecture
---

Accelerators can contain enormous compute capacity, but a kernel can use that capacity only if data arrives quickly enough. The roofline model gives a compact way to visualize this tradeoff.

## Arithmetic intensity

Arithmetic intensity is the number of operations performed per byte transferred from memory:

```text
arithmetic intensity = operations / bytes moved
```

A low-intensity kernel performs relatively little computation for each byte it moves. It is more likely to be memory-bound. A high-intensity kernel has more computation available to hide the cost of data movement and may become compute-bound.

## The two performance ceilings

The roofline is shaped by two limits:

1. Peak compute throughput.
2. Peak memory bandwidth multiplied by arithmetic intensity.

The lower of these ceilings limits achievable performance. Improving a kernel therefore depends on identifying which ceiling is active.

## How optimization changes the position

Tiling and reuse can reduce bytes moved. Fusion can avoid intermediate writes. Better layouts can improve coalescing. On the compute side, vectorization, occupancy, and specialized instructions can increase useful throughput.

## What to record in an experiment

Record the hardware, precision, problem size, operation count, bytes transferred, achieved bandwidth, achieved throughput, and launch configuration. Without these details, a speedup is difficult to interpret or reproduce.

**Takeaway:** The roofline model turns “the kernel is slow” into a measurable question about bandwidth, computation, and data reuse.
