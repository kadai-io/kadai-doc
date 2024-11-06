---
sidebar_position: 2
---

# List of provided SPIs

Please read [general SPI information](howToUseServiceProviderInterfaces.md) to understand SPIs in KADAI in general. 

Currently, KADAI provides the following SPIs:

- **io.kadai.spi.history.api.KadaiHistory** : Look up the history of KADAI. You can read more use cases for HistoryService [here](./kadaiHistorySPI.md).
- **io.kadai.spi.priority.api.PriorityServiceProvider** : Add rules for the calculation of Task priority.
- **io.kadai.spi.routing.api.TaskRoutingProvider** : Add rules for automated Workbasket assignment for some of the new Tasks.
- **io.kadai.spi.task.api.AfterRequestChangesProvider** : Add actions on Task that are executed after changes on reviewed Task have been requested (See more about Task Lifecycle [here](../core-concepts/taskLifecycle.md)).
- **io.kadai.spi.task.api.AfterRequestReviewProvider** : Add actions on Task that are executed after a review on a claimed Task has been requested (See more about Task Lifecycle [here](../core-concepts/taskLifecycle.md)).
- **io.kadai.spi.task.api.BeforeRequestChangesProvider** : Add actions on Task that are executed before changes on a reviewed Task have been requested (See more about Task Lifecycle [here](../core-concepts/taskLifecycle.md)).
- **io.kadai.spi.task.api.BeforeRequestReviewProvider** : Add actions on Task that are executed before a review on a claimed Task has been requested (See more about Task Lifecycle [here](../core-concepts/taskLifecycle.md)).
- **io.kadai.spi.task.api.CreateTaskPreprocessor** : Add actions on Task that are executed before a new one is created.
- **io.kadai.spi.task.api.ReviewRequiredProvider** : Add actions on Task that are executed after changes on reviewed Task have been requested (See more about Task Lifecycle [here](../core-concepts/taskLifecycle.md)).
- **io.kadai.spi.user.api.RefreshUserPostprocessor** : Add actions on User that are executed each time after the User is refreshed.
