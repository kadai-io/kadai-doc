---
sidebar_position: 6
---

# User Task Configuration in Camunda

## General behavior

Kadai Adapters for Camunda populate a task with metadata, either dynamically from the process and/or
from the BPMN.
The Kadai fields that are set by the Adapter are:

- `name` if not provided, `taskDefinitionKey` is used
- `description`
- `owner`
- `due`
- `planned`
- `manualPriority` if not set, defaults to `-1` (lowest priority)
- `classificationKey`
- `domain`
- `workbasketKey`
- `customInt1`…`customInt8`
- `customAttributes`, find more information in [this section](#custom-attributes)

Additionally, the following fields are set by the adapter but cannot be directly influenced by the
user:

- `created`
- `systemUrl`
- `externalId`
- `callbackInfo`
- `businessProcessId`

### Minimal required attributes

Recommended minimal attributes to ensure proper creation and routing in Kadai:

- `classificationKey`
- `domain`
- `workbasketKey`

## Custom attributes

Custom attributes let you synchronize extra variables into Kadai. To enable this, provide a
comma-separated list of variable names in the `attributes` field.
The adapter will:

- Read each named variable from the process instance.
- Prefix the attribute name with `camunda:` and add it (with the value information) to the Kadai
  task's `customAttributes` map.

When the Kadai task is synchronized back to Camunda (for example on completion), the corresponding
variables in Camunda are updated with the values from Kadai.

## Camunda 7 (C7) — attributes and sources

The C7 plugin uses extension properties as well as variables. Both of these must have
one of the accepted prefixes to be recognized by the adapter, for example `kadai.classificationKey`
or `taskana-classificationKey`. Accepted prefixes are: `kadai.`, `kadai-`, `taskana.`,`taskana-`.
The C7 plugin also makes use of standard user task properties from the BPMN.

| Kadai Attribute           | C7 source(s)                                                                                    | Notes                                                                                                               |
|---------------------------|-------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------|
| `name`                    | BPMN task name                                                                                  |                                                                                                                     |
| `description`             | BPMN Element documentation                                                                      |                                                                                                                     |
| `owner`                   | BPMN User assignment → Assignee                                                                 |                                                                                                                     |
| `due`                     | BPMN User assignment → Due Date                                                                 | ISO8601 format                                                                                                      |
| `planned`                 | BPMN User assignment → Follow Up Date                                                           | ISO8601 format                                                                                                      |
| `manualPriority`          | Variable `manual-priority` (prefixed)                                                           | Default `-1` if missing                                                                                             |
| `classificationKey`       | User task extension property `classification-key` (prefixed)                                    |                                                                                                                     |
| `domain`                  | Variable / user task extension property / process model extension property  `domain` (prefixed) | Lookup order: variable → userTask extension → process model extension                                               |
| `workbasketKey`           | Variable `workbasket-key` (prefixed)                                                            |                                                                                                                     |
| `customInt1`…`customInt8` | Variables `custom-int-1`… (prefixed)                                                            |                                                                                                                     |
| `customAttributes`        | User task extension property / process model extension property `attributes` (prefixed)         | Names of variables to include in `customAttributes` map; Lookup order: userTask extension → process model extension |

C7 UserTask example:

import C7ExampleProcess from '../static/adapter/c7/exampleProcess.png';
import C7ExampleUserTask from '../static/adapter/c7/exampleUserTask.png';

<img src={C7ExampleProcess} alt="C7 Example Process" style={{width: 500}} />
<img src={C7ExampleUserTask} alt="C7 Example User Task" style={{width: 500}} />

## Camunda 8 (C8) — attributes and sources

The C8 plugin reads from variables with prefix `kadai_`. Additionally, the C8 plugin uses user task
properties.

| Attribute                 | C8 source                                          | Notes                                                                                                                                         |
|---------------------------|----------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| `name`                    | Variable `kadai_name`                              | Currently, we are not able to read out the BPMN name in our UserTaskListener. If the variable is not given, the `domain` is used as fallback. |
| `description`             | -                                                  | Currently not synchronized from Camunda                                                                                                       |
| `owner`                   | BPMN Assignment → Assignee                         |                                                                                                                                               |
| `due`                     | BPMN Assignment → Due date                         |                                                                                                                                               |
| `planned`                 | BPMN Assignment → Follow up date                   |                                                                                                                                               |
| `manualPriority`          | Variable `kadai_manual_priority`                   | The priority in the BPMN Assignment is not used                                                                                               |
| `classificationKey`       | Variable `kadai_classification_key`                |                                                                                                                                               |
| `domain`                  | Variable `kadai_domain`                            |                                                                                                                                               |
| `workbasketKey`           | Variable `kadai_workbasket_key`                    |                                                                                                                                               |
| `customInt1`…`customInt8` | Variable `kadai_custom_int_1`…`kadai_custom_int_8` |                                                                                                                                               |
| `customAttributes`        | Variable `kadai_attributes`                        | Names of variables to include in `customAttributes` map                                                                                       |

C8 UserTask example:

import C8ExampleUserTask from '../static/adapter/c8/exampleUserTask.png';

<img src={C8ExampleUserTask} alt="C8 Example user task" style={{width: 500}} />

Note that the variables can
have [different scopes](https://docs.camunda.io/docs/components/concepts/variables/#variable-scopes).
In the example above, the variables are set in the user task scope, but they could also be set in
the process instance scope or other scopes. The adapter will synchronize the variables in all
scopes.