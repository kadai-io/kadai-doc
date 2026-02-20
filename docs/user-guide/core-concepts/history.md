---
sidebar_position: 6
---

import Drawio from '@theme/Drawio'
import historyOverview from '!!raw-loader!../static/core-concepts/history_overview.drawio';
import historyProducer from '!!raw-loader!../static/core-concepts/history_producer.drawio';
import historyConsumer from '!!raw-loader!../static/core-concepts/history_consumer.drawio';

# Audit, History & Event-Management

Kadai allows auditing every change regarding Tasks, Workbaskets and Classifications.
This is implemented via a custom event-management-system.

All components are fully **synchronous** and therefore blocking.

Below we will go through the core concepts and how to register custom Event-Listeners via SPIs.

## Core-Concepts

Here is an overview about all the central components in Kadai's event-management.

<Drawio content={historyOverview} />
<br />

### `KadaiInitializable` and `Reifiable`

`KadaiInitializable` is a helper-interface giving access to the `KadaiEngine`. It can be used in
non-bean `KadaiEventConsumer`s to interact with the `KadaiEngine`.
`Reifiable` is a helper-interface aiding in type-safety for event-routing in the `KadaiEventBroker`.
Its implementation is trivial as Java's type-system only allows returning _this_ implementing class.

### `KadaiEvent`

`KadaiEvent` is the common and most high-level interface for all Kadai-Events.

### `KadaiEventConsumer`

`KadaiEventConsumer` is a sink for _certain_ `KadaiEvent`s. It's consumed events can be specified
via the type-arg.
The `KadaiEventBroker` will then only route events of this type or those extending it to that
consumer.

### `KadaiEventPublisher`

A mediator between producer and broker.
The default implementation `SimpleKadaiEventPublisher` forwards the event to the broker.
It's used to scope access to publishing events inside producers.

### `KadaiEventBroker`

`KadaiEventBroker` manages event-producers and -consumers.
It takes care of routing events to all eligible consumers.
When constructed, it **reads all consumers** declared via **SPI**.
At runtime, more consumers can be registered via the Java-API.

## Concrete Example for `Task`

### Task-Producer & -Publisher

<Drawio content={historyProducer} />

### Task-Event & -Consumer

<Drawio content={historyConsumer} />

## Registering custom Consumers

Custom consumers are plain Java-Classes implementing `KadaiEventConsumer<T>` for a specific `T`
extending `KadaiEvent`.

Here is the task-consumer from earlier (it's also just a class loaded via SPI):

```java title="src/main/java/META-INF.services/io.kadai.simplehistory.task.internal.TaskHistoryEventPersister"
package io.kadai.simplehistory.task.internal;

import io.kadai.common.api.KadaiEngine;
import io.kadai.spi.history.api.KadaiEventConsumer;
import io.kadai.spi.history.api.events.task.TaskHistoryEvent;

public class TaskHistoryEventPersister implements KadaiEventConsumer<TaskHistoryEvent> {

  private TaskHistoryServiceImpl taskHistoryService;

  // Actual consumer-logic
  @Override
  public void consume(TaskHistoryEvent event) {
    taskHistoryService.createTaskHistoryEvent(event);
  }

  // Java-Boilerplate aiding in type-safety for event-routing
  @Override
  public Class<TaskHistoryEvent> reify() {
    return TaskHistoryEvent.class;
  }

  // Helper allowing access to the KadaiEngine
  @Override
  public void initialize(KadaiEngine kadaiEngine) {
    this.taskHistoryService = new TaskHistoryServiceImpl();
    taskHistoryService.initialize(kadaiEngine);
  }
}
```

Now place the fully-qualified class-name of your custom consumer into the meta-inf services-file for
the interface:

```properties title="resources/META-INF.services/io.kadai.spi.history.api.KadaiEventConsumer"
io.kadai.simplehistory.task.internal.TaskHistoryEventPersister
# your custom consumers ...
```

For more information on Java-SPIs check out
our [SPI-Guide](../features/howToUseServiceProviderInterfaces.md).