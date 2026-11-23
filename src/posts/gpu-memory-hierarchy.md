---
title: Understanding the GPU Memory Hierarchy
date: 2026-10-18
summary: A practical mental model for global memory, shared memory, caches, and why data movement often dominates kernel performance.
tags: GPU, Architecture, Performance
youtube: https://www.youtube.com/watch?v=HQejUtJtBlg
---
This note explains the GPU memory hierarchy and the performance tradeoffs that influence kernel design.

## Why memory matters

A GPU can execute enormous amounts of arithmetic, but its performance depends on getting operands to the compute units quickly enough. A useful first step is distinguishing **compute throughput** from **memory bandwidth**.

## A simplified hierarchy

| Memory | Scope | Typical tradeoff |
| --- | --- | --- |
| Registers | Per thread | Very fast, limited capacity |
| Shared memory | Per thread block | Programmer-managed, low latency |
| L1 / L2 cache | Hardware-managed | Helps reuse recently accessed data |
| Global memory | Device-wide | Large capacity, higher access cost |

## Think in terms of arithmetic intensity

Arithmetic intensity is the number of operations performed per byte transferred from memory. For many workloads, improving reuse can matter more than adding arithmetic units.

```cpp
// Contiguous memory access pattern.
// Performance depends on GPU architecture and launch configuration.
int i = blockIdx.x * blockDim.x + threadIdx.x;
if (i < n) output[i] = input[i] * scale;
```


## CUDA Memory Allocation

The following example allocates memory on the GPU.

```cpp
#include <cuda_runtime.h>
#include <iostream>

int main() {
    float* d_data = nullptr;
    size_t size = 1024 * sizeof(float);

    cudaMalloc((void**)&d_data, size);

    std::cout << "GPU memory allocated!" << std::endl;

    cudaFree(d_data);
    return 0;
}
```

The `cudaMalloc()` function allocates device memory,
while `cudaFree()` releases it.
  

## A reproducible experiment to try

1. Write a simple vector operation in CUDA.
2. Compare contiguous and strided memory accesses.
3. Profile memory throughput and kernel latency.
4. Record GPU model, compiler flags, input sizes, and measurements.

**Takeaway:** Treat memory traffic as a first-class part of performance engineering.
