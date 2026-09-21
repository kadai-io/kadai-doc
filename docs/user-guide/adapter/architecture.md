---
sidebar_position: 3
---

# Architecture

import Drawio from '@theme/Drawio'
import highLevelArch from '!!raw-loader!../static/adapter/high-level-arch.drawio';
import inboundSequence from '!!raw-loader!../static/adapter/InboundSequence.drawio';
import outboundSequence from '!!raw-loader!../static/adapter/OutboundSequence.drawio';

## System-level Architecture

### Overview

The KadaiAdapter makes use of
the [Microkernel](https://theswissbay.ch/pdf/Books/Computer%20science/O%27Reilly/software-architecture-patterns.pdf#%5B%7B%22num%22%3A164%2C%22gen%22%3A0%7D%2C%7B%22name%22%3A%22XYZ%22%7D%2Cnull%2C576%2Cnull%5D)
architecture.
A core component - the kernel - is extended with components adding custom functionality.
These extensions are plugged into the kernel - hence why these components are often referred to as
_plug-ins_.

<Drawio content={highLevelArch} />
<br />

We do provide ready-to-use plugins for [Camunda 7](https://camunda.com/en/platform-7/)
and [Camunda 8](https://docs.camunda.io/).
The Kadai-Adapter is **not limited** to those - you can add **any systems** and connect them via
**custom plugins** as you wish!

### Typical Flow

Let us take a look at the exemplary flow of the Camunda8-Plugin.

#### Outbound-Flow

<Drawio content={outboundSequence} />
<br />

The Kernel of the KadaiAdapter periodically polls Kadai to detect new or changed tasks.
It then passes all of those retrieved to every Plugin.
The Camunda8-Plugin in this case then forwards the changes to Camunda.
Each step waits for the response.

This entire process is **synchronous**.

#### Inbound-Flow

<Drawio content={inboundSequence} />
<br />

Camunda notifies a Job-Worker living in the Camunda8-Plugin of the Kadai-Adapter.
This Job-Worker then delegates - in this example - the creation of a task to the
Kadai-Adapter-Kernel,
which then creates the task in Kadai.
Each step waits for the response.

This entire process is **synchronous** as well.

## Application-level Architecture

### Implementing Plugins

Implementing and connecting plugins goes two ways.
The `InboundSystemConnector` specifies the flow from the external system to Kadai.
The `OutboundSystemConnector` specifies the flow from Kadai to the external system.

Both directions _can_ be implemented via
an [SPI](https://docs.oracle.com/javase/tutorial/sound/SPI-intro.html).
Declaring the SPI in the Kadai-Adapters META-INF directory of the application automatically _plugs_
your plugin _in_.

#### Inbound task context

The inbound SPI separates the task data needed by the KADAI-Adapter core from
connector-specific processing and acknowledgement context.

`ReferencedTask` represents the core-relevant properties of a task in the external system.
It is the task model operated on by the KADAI-Adapter kernel and must not contain
connector-specific transport or delivery metadata. For example, a connector-specific event ID
does not belong on `ReferencedTask`. Its `id` remains the connector-defined opaque identifier for
the external task; the core uses it without interpreting its format.

`InboundReferencedTask` represents a retrieved inbound task together with any
connector-specific processing or acknowledgement context. The methods
`InboundSystemConnector.retrieveNewStartedReferencedTasks()` and
`InboundSystemConnector.retrieveFinishedReferencedTasks()` return these values. The kernel reads
the external task through `referencedTask()` and treats any additional context as opaque. A
connector can retain the state it needs later for acknowledgement, retry, cleanup, or unlocking.
When no additional context is needed, use `SimpleInboundReferencedTask`.

For example, a connector can keep its delivery identifier next to the core task data:

```java
public final class MyInboundReferencedTask implements InboundReferencedTask {

  private final ReferencedTask referencedTask;
  private final String deliveryId;

  public MyInboundReferencedTask(ReferencedTask referencedTask, String deliveryId) {
    this.referencedTask = referencedTask;
    this.deliveryId = deliveryId;
  }

  @Override
  public ReferencedTask referencedTask() {
    return referencedTask;
  }
}
```

#### Inbound acknowledgement and failures

The kernel reports whether processing succeeded or failed. The inbound connector owns the
corresponding acknowledgement, retry, unlock, and cleanup behavior for its delivery mechanism.

- `kadaiTasksHaveBeenCreatedForNewReferencedTasks(...)` receives the corresponding
  `InboundReferencedTask` values after their KADAI tasks have been created successfully. The
  connector may acknowledge or clean up its inbound deliveries.
- `kadaiTaskFailedToBeCreatedForNewReferencedTask(...)` receives the same connector-owned
  `InboundReferencedTask` together with the exception. The connector owns retry bookkeeping,
  error persistence, unlocking or releasing the delivery, and related failure handling.
- `kadaiTasksHaveBeenTerminatedForFinishedReferencedTasks(...)` receives only inbound tasks whose
  corresponding KADAI termination or completion handling succeeded. Only successfully processed
  inbound tasks are acknowledged as successful.
- `kadaiTaskFailedToBeTerminatedForFinishedReferencedTask(...)` receives the failed inbound task
  together with the exception. The connector decides how to make its inbound delivery retryable
  or otherwise handle the failure.

The Camunda 7 plugin e.g. uses this separation by keeping the outbox event ID in its own inbound-task
implementation rather than in the core `ReferencedTask`. After successful processing it cleans the
corresponding outbox event. If KADAI task creation fails, it records or decrements the Camunda 7
retry information and unlocks the event. If termination fails, it unlocks the event without
acknowledging it as successful, so the event remains in the outbox for retry.

As you saw in the example-flow for the Camunda8-Plugin, we only made use of the
`OutboundSystemConnector`.
We also implemented the inbound-direction, but did not do this via the `InboundSystemConnector`.
Instead, we gave a completely custom implementation via Camunda8 Job-Workers.

Therefore, it's worth noting that you neither need to necessarily implement both directions nor
adhere to the recommended interfaces.

### Health-Check

The Microkernel architecture is also applied for application health-checks. Check out
our [docs](healthCheck.md) on configuring them for your plugins.
