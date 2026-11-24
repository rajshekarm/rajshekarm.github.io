---
title: CompletionStage vs CompletableFuture in Trading Systems
date: 2026-11-24
summary: Choosing the right asynchronous abstraction for maintainable Java services and concurrent trading workflows.
tags: Java, Concurrency, Distributed Systems, Trading Systems
---

In a trading platform, different components communicate asynchronously. Consider a market-data service responsible for retrieving the latest price of a financial instrument. The service might fetch data from an exchange feed, an internal cache, or an external provider, so the response may not be immediately available.

How should this asynchronous operation be exposed to other components? Should the service return `CompletableFuture<MarketPrice>` or `CompletionStage<MarketPrice>`?

Although these types are closely related, understanding their responsibilities is important when designing maintainable Java applications. Both were introduced in Java 8 under `java.util.concurrent`.

## Contract versus implementation

`CompletionStage<T>` is an interface that defines operations for composing asynchronous computations. `CompletableFuture<T>` is a concrete implementation that provides mechanisms to create, execute, and explicitly complete asynchronous computations.

```java
public class CompletableFuture<T>
        implements Future<T>, CompletionStage<T> {
}
```

The important distinction is abstraction versus implementation.

Imagine the trading engine needs access to market prices. The market-data service should expose an asynchronous contract without exposing unnecessary implementation details.

```java
public interface MarketDataService {

    CompletionStage<MarketPrice> getLatestPrice(
        String symbol
    );
}
```

The trading engine only needs to consume the asynchronous result. It does not need to know:

- How the asynchronous operation is created.
- Which executor is used.
- How the underlying computation is completed.
- Whether the implementation uses `CompletableFuture` internally.

This reduces coupling between application components. The interface defines the capability, not the implementation strategy.

## Use CompletableFuture internally

Now consider the actual implementation. The market-data service retrieves the latest price from a repository.

![ExecutorService work queue, thread pool, and completion flow](/images/execution-service.jpg)

*An ExecutorService accepts submitted tasks, schedules them through a worker pool, and produces completed results for downstream stages.*

```java
public class MarketDataServiceImpl
        implements MarketDataService {

    private final MarketDataRepository repository;
    private final Executor marketDataExecutor;

    @Override
    public CompletableFuture<MarketPrice> getLatestPrice(
            String symbol) {

        return CompletableFuture.supplyAsync(
            () -> repository.fetchLatestPrice(symbol),
            marketDataExecutor
        );
    }
}
```

Here, `CompletableFuture` provides the implementation. It is responsible for creating asynchronous computations, completing them with results, completing them exceptionally, scheduling tasks, and supporting dependent computation chains.

The implementation can return `CompletableFuture` even though the interface declares `CompletionStage`. This works because `CompletableFuture` implements `CompletionStage`.

## Composing a trading workflow

When a trading engine receives an order, it may need to retrieve the latest market price and validate the order against risk limits. These operations can execute independently. Once both complete, the execution engine can proceed.

```java
public CompletionStage<TradeResult> executeTrade(
        TradeOrder order) {

    CompletionStage<MarketPrice> price =
        marketDataService.getLatestPrice(
            order.getSymbol()
        );

    CompletionStage<RiskAssessment> risk =
        riskService.validate(order);

    return price.thenCombine(
        risk,
        TradeContext::new
    ).thenCompose(context -> {

        if (!context.isApproved()) {
            return CompletableFuture.completedFuture(
                TradeResult.rejected()
            );
        }

        return executionService.submit(
            context.getOrder(),
            context.getMarketPrice()
        );
    });
}
```

The responsibilities remain separated:

- `CompletionStage` exposes the asynchronous contract.
- `CompletableFuture.completedFuture()` creates an already-completed result.
- `thenCombine()` coordinates independent operations.
- `thenCompose()` chains the dependent execution operation.

The trading engine does not need to manage threads or manually wait for each service response.

## Why not expose CompletableFuture everywhere?

Consider this interface:

```java
public interface MarketDataService {

    CompletableFuture<MarketPrice> getLatestPrice(
        String symbol
    );
}
```

This exposes the concrete implementation type to every consumer. Consumers now depend directly on `CompletableFuture`. That is not inherently incorrect, but it introduces implementation coupling when consumers only need the `CompletionStage` contract.

A consumer can call the asynchronous API without controlling its implementation:

```java
marketDataService.getLatestPrice("AAPL")
    .thenApply(MarketPrice::getPrice);
```

It does not need access to explicit completion methods such as `complete()` or `completeExceptionally()`.

There is an important nuance: returning `CompletionStage` does not guarantee that the underlying future cannot be completed or cancelled through another reference. It provides a narrower declared API, which is useful for communicating intended responsibility.

## Design guidance

Returning `CompletionStage` allows the implementation to evolve without requiring consumers to depend on a specific future implementation. Both types support exceptional completion handling through the `CompletionStage` API, while `CompletableFuture` also allows explicit executor selection through methods such as `supplyAsync()` and `thenApplyAsync()`.

Expose only the asynchronous capabilities required by consumers. If a consumer genuinely requires explicit completion or cancellation controls, a different API contract may be appropriate.

## Conclusion

`CompletionStage` and `CompletableFuture` are not competing technologies. They solve different aspects of asynchronous programming.

`CompletionStage` defines the contract for composing asynchronous operations, while `CompletableFuture` provides a concrete mechanism for creating and controlling those operations.

In enterprise Java applications, a common design is to expose `CompletionStage` through service interfaces and use `CompletableFuture` internally.

**Takeaway:** Program against the abstraction when exposing capabilities, and use the implementation when you need to manage the actual asynchronous computation.

## References

- [Java CompletionStage API](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/CompletionStage.html)
- [Java CompletableFuture API](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/CompletableFuture.html)
- [Java Concurrency Package](https://docs.oracle.com/en/java/javase/26/docs/api/java.base/java/util/concurrent/package-summary.html)
