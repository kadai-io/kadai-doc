---
sidebar_position: 3
---

# KADAI history SPI

To follow this article, first read the [general SPI information](howToUseServiceProviderInterfaces.md).

KADAI publishes events for changes to Tasks, Workbaskets, and Classifications. Implement the
`io.kadai.spi.history.api.KadaiEventConsumer` SPI to consume the event types that matter to your
application. A consumer declares the event class it accepts through `reify()` and receives matching
events through `consume()`.

History events can support use cases such as:

- Showing the history of a business process: who handled a Task, transferred it, or changed it.
- Auditing changes to Tasks, Workbaskets, and Classifications.
- Reporting on process durations, assignment times, classification changes, and Task volumes.

## Provided history implementations

KADAI provides two implementations of `KadaiEventConsumer`:

- `kadai-simplehistory-provider` persists Task, Workbasket, and Classification history events and
  provides query services for them.
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
