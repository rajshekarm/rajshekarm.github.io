---
title: What Actually Happens When a CUDA Kernel Runs?
date: 2026-11-22
summary: A concrete journey from a CUDA kernel launch to warps, threads, registers, scheduling, and memory transactions on the GPU.
tags: GPU Architecture, CUDA, Computer Architecture
---

When a CUDA program launches a kernel, the GPU does not execute one independent instruction stream per thread. It groups threads into warps and schedules those warps across streaming multiprocessors (SMs). That distinction explains many of the performance behaviors that are invisible in a simple kernel listing.

## From launch to execution

A kernel launch defines a grid of thread blocks. The GPU assigns blocks to available SMs. A block remains on one SM while it executes, and multiple blocks may share an SM if registers, shared memory, and thread capacity allow it.

Inside a block, threads are organized into warps, commonly groups of 32 threads. The hardware issues instructions for a warp together using a SIMT execution model: threads have separate state, but the instruction stream is shared.

## Registers and occupancy

Each thread uses registers for local values. If a kernel uses many registers, fewer blocks may fit on an SM. Shared memory usage has a similar effect. Occupancy describes how many active warps reside on an SM relative to its maximum capacity.

High occupancy is not automatically high performance. It can help hide memory latency, but reducing register use at the cost of extra instructions may make a kernel slower. The right question is whether the active warps provide enough latency hiding for the workload.

## Warp divergence

Consider a branch where half the threads take one path and half take another:

```cpp
if (threadIdx.x % 2 == 0) {
    even_path();
} else {
    odd_path();
}
```

The warp may execute both paths while masking inactive threads. The program remains correct, but useful instruction throughput falls because not all lanes are active for each instruction.

## Memory transactions

Global memory performance depends on how the lanes of a warp access addresses. Neighboring addresses can often be serviced efficiently through coalesced transactions. Strided or scattered accesses may require more transactions and waste bandwidth.

This is why two kernels with the same arithmetic can have very different performance. The instruction count is only part of the story; the access pattern determines how much data movement the hardware must perform.

## A practical investigation

Build three versions of a vector or matrix kernel:

1. Coalesced access with contiguous addresses.
2. Strided access with a controllable stride.
3. A branch-heavy version with different divergence patterns.

Measure execution time, achieved bandwidth, warp execution efficiency, branch efficiency, register usage, and occupancy with Nsight Compute. Record the GPU model, compiler flags, problem size, and launch configuration.

**Takeaway:** GPU performance becomes easier to reason about when a kernel is viewed as a conversation between warps, resources, schedulers, and memory transactions.
