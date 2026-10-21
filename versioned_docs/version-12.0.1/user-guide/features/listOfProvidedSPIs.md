---
sidebar_position: 2
---

# List of provided SPIs

Read the [general SPI information](howToUseServiceProviderInterfaces.md) to understand SPIs in
KADAI.

KADAI provides the following SPIs:

| SPI | Description |
| --- | --- |
| `io.kadai.spi.history.api.KadaiEventConsumer` | Consume KADAI events for Task, Workbasket, and Classification changes. See the [history SPI](kadaiHistorySPI.md). |
| `io.kadai.spi.priority.api.PriorityServiceProvider` | Calculate a Task's priority when it is created or updated. |
| `io.kadai.spi.routing.api.TaskRoutingProvider` | Determine the Workbasket, and optionally the owner, for a Task created without a Workbasket. |
| `io.kadai.spi.task.api.AfterRequestChangesProvider` | Run custom behaviour after changes are requested for a Task. |
| `io.kadai.spi.task.api.AfterRequestReviewProvider` | Run custom behaviour after a review is requested for a Task. |
| `io.kadai.spi.task.api.BeforeRequestChangesProvider` | Run custom behaviour before changes are requested for a Task. |
| `io.kadai.spi.task.api.BeforeRequestReviewProvider` | Run custom behaviour before a review is requested for a Task. |
| `io.kadai.spi.task.api.BeforeTransferTaskProvider` | Validate a Task transfer before it is performed. |
| `io.kadai.spi.task.api.CreateTaskPreprocessor` | Run custom behaviour before a Task is created. |
| `io.kadai.spi.task.api.CreateTaskPostprocessor` | Run custom behaviour after a Task is created. |
| `io.kadai.spi.task.api.ReviewRequiredProvider` | Decide whether a Task requires review instead of completion. |
| `io.kadai.spi.task.api.TaskDistributionProvider` | Provide custom logic for distributing Tasks among Workbaskets. |
| `io.kadai.spi.task.api.TaskEndstatePreprocessor` | Run custom behaviour before a Task enters an end state (completed, cancelled, or terminated). |
| `io.kadai.spi.user.api.RefreshUserPostprocessor` | Run custom behaviour after a User is refreshed. |

For detailed information on the Task lifecycle, see the [Task lifecycle guide](../core-concepts/taskLifecycle.md).
