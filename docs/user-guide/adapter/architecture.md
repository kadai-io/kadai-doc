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
The `OutoundSystemConnector` specifies the flow from Kadai to the external system.

Both directions _can_ be implemented via
an [SPI](https://docs.oracle.com/javase/tutorial/sound/SPI-intro.html).
Declaring the SPI in the Kadai-Adapters META-INF directory of the application automatically _plugs_
your plugin _in_.

As you saw in the example-flow for the Camunda8-Plugin, we only made use of the
`OutboundSystemConnector`.
We also implemented the inbound-direction, but did not do this via the `InboundSystemConnector`.
Instead, we gave a completely custom implementation via Camunda8 Job-Workers.

Therefore, it's worth noting that you neither need to necessarily implement both directions nor
adhere to the recommended interfaces.

### Health-Check

The Microkernel architecture is also applied for application health-checks. Check out
our [docs](healthCheck.md) on configuring them for your plugins.