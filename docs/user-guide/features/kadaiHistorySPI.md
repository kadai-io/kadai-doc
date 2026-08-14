---
sidebar_position: 3
---

# KADAI history SPI

To follow this article, first read the [general SPI information](howToUseServiceProviderInterfaces.md).

KADAI publishes events for changes to Tasks, Workbaskets, and Classifications. Implement the
`io.kadai.spi.history.api.KadaiEventConsumer` SPI to consume the event types that matter to your
application. A consumer declares the event class it accepts through `reify()` and receives matching
events through `consume()`.

## Batch event consumers

For bulk operations, implement `io.kadai.spi.history.api.BatchKadaiEventConsumer` when your
consumer can process several events together. KADAI then groups all matching events for that
consumer and calls `consumeAll(Collection<T> events)`. Event order within a batch is not
guaranteed.

`BatchKadaiEventConsumer` extends `KadaiEventConsumer`, so implement `consume()` as well. A
consumer that implements only `KadaiEventConsumer` continues to receive bulk-operation events one
at a time through `consume()`. Overriding `consumeAll()` on `KadaiEventConsumer` alone does not
enable batched dispatch.

```java
import io.kadai.spi.history.api.BatchKadaiEventConsumer;
import io.kadai.spi.history.api.events.task.TaskHistoryEvent;
import java.util.Collection;

public class TaskEventBatchConsumer
    implements BatchKadaiEventConsumer<TaskHistoryEvent> {

  @Override
  public void consume(TaskHistoryEvent event) {
    // Handle events that are dispatched individually.
  }

  @Override
  public void consumeAll(Collection<TaskHistoryEvent> events) {
    // Store or forward all matching events together.
  }

  @Override
  public Class<TaskHistoryEvent> reify() {
    return TaskHistoryEvent.class;
  }
}
```

History events can support use cases such as:

- Showing the history of a business process: who handled a Task, transferred it, or changed it.
- Auditing changes to Tasks, Workbaskets, and Classifications.
- Reporting on process durations, assignment times, classification changes, and Task volumes.

## Provided history implementations

KADAI provides two implementations of `KadaiEventConsumer`:

- `kadai-simplehistory-provider` persists Task, Workbasket, and Classification history events,
  provides query services for them, and processes Task history events in batches.
- `kadai-loghistory-provider` writes history events as JSON to an SLF4J logger.

Add the implementation you want to use to your application. For example, to persist history events:

```xml title="pom.xml"
<dependency>
  <groupId>io.kadai.history</groupId>
  <artifactId>kadai-simplehistory-provider</artifactId>
  <version>12.0.0</version>
</dependency>
```

To log history events instead:

```xml title="pom.xml"
<dependency>
  <groupId>io.kadai.history</groupId>
  <artifactId>kadai-loghistory-provider</artifactId>
  <version>12.0.0</version>
</dependency>
```

## Simple history REST API

KADAI also provides the `kadai-simplehistory-rest-spring` module. It includes the simple-history
provider and exposes a Spring REST API for Task history events at `/api/v1/task-history-event`.

```xml title="pom.xml"
<dependency>
  <groupId>io.kadai.history</groupId>
  <artifactId>kadai-simplehistory-rest-spring</artifactId>
  <version>12.0.0</version>
</dependency>
```
