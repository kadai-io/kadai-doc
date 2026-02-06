---
sidebar_position: 6
---

# User Task Configuration in Camunda 7 vs Camunda 8

## Summary
- Kadai Adapters for Camunda populate a task with metadata, either dynamically from the process and/or from the BPMN
todo: are these two points needed?
- Camunda 7 (C7) prefers user\-task extension properties or user task properties and falls back to process variables (accepted prefixes: `kadai.`, `kadai-`, `taskana.`, `taskana-`).
- Camunda 8 (C8) reads configuration from process variables (underscored names, e.g. `kadai_classification_key`). C8 also reads certain User Task Properties (follow\-up date, due date, assignee) from the activated user task/job.

Common fields (present in both adapters, find more details in the respective sections below):
- `name`
- `assignee`
- `created`
- `due`
- `planned`
- `priority` / `manualPriority`
- `classificationKey`
- `domain`
- `workbasketKey`
- `customInt1` … `customInt8`
- `variables` (serialized map of selected process variables) todo: are these not called attributes?
- `systemUrl` / `system engine identifier` (C8 sets `systemUrl`; C7 writes engine name to outbox row) -> from the config
todo: is this list complete?

## Kadai attributes

Kadai attributes can be defined to synchronize additional, custom process variables into Kadai.
todo: add in C7 and C8 how they are defined
todo: prefix
todo: how are they synchronized back to Camunda from Kadai?

## What is necessary to load a task into Kadai (minimal required)
Recommended minimal attributes to ensure proper creation and routing in Kadai:
- `classificationKey`
- `domain`
- `workbasketKey`

Notes:
- Listeners may not throw if missing, but Kadai typically needs these to route/create tasks correctly.
- `manualPriority` defaults to `-1` when not provided.


## Camunda 7 (C7) — attributes and sources
C7 prioritizes user\-task extension properties on the userTask, then process model properties, then process variables. Accepted prefixes for property/variable names: `kadai.`, `kadai-`, `taskana.`, `taskana-`. C7 also makes use of standard User Task properties from the BPMN (e.g. task name, description, assignee, due/followUp dates) and uses the BPMN user task name as the ReferencedTask name when present.

| Attribute | C7 source(s) / key name(s) | Notes |
|---|---:|---|
| `id` | `delegateTask.getId()` | Camunda user task id |
| `name` | BPMN user task name / `delegateTask.getName()` | C7 uses BPMN name by default |
| `description` | `delegateTask.getDescription()` | |
| `owner` | `delegateTask.getOwner()` | |
| `assignee` | `delegateTask.getAssignee()` | also available via variables/extensions |
| `created` | `delegateTask.getCreateTime()` | ISO format |
| `due` | `delegateTask.getDueDate()` | ISO format |
| `planned` | `delegateTask.getFollowUpDate()` | ISO format |
| `priority` / `manualPriority` | user task/process/variable: `manual-priority` (prefixed) | default `-1` if missing |
| `taskDefinitionKey` | `delegateTask.getTaskDefinitionKey()` | |
| `businessProcessId` | `processInstanceId` | |
| `classificationKey` | user-task extension or process model property `classification-key` (prefixed), fallback process variable with same names | accepts hyphen/dot/alternate prefixes |
| `domain` | variable `domain` (prefixed) OR user-task extension property (prefixed) OR process model property (prefixed) | lookup order: variable → userTask extension → process model |
| `workbasketKey` | variable/extension `workbasket-key` (prefixed) | |
| `customInt1`…`customInt8` | variables `custom-int-1`… (prefixed) | numeric values as strings |
| `attributes` | user-task extension or process model property `attributes` (comma separated) | names of variables to include in `variables` map |
| `variables` map | each name from `attributes` is read typed via API and serialized with type info | non\-primitives include `valueInfo` |

C7 configuration examples (user task extension):
insert example snippet here

Serialization & dates in C7:
Dates formatted as yyyy-MM-dd'T'HH:mm:ss.SSSZ.
Variables: typed extraction — primitives as values; non-primitives serialized with serializationDataFormat and objectTypeName.

Camunda 8 (C8) — attributes and sources
C8 reads from process variables (underscored names) in the job activation payload or instance variables. Additionally, C8 uses User Task Properties available on the activated job for follow-up date, due date and assignee. Important differences and precedence:
Name: C8 does not use the BPMN user task name for the Kadai task. Instead, provide kadai_name as a process variable to set the ReferencedTask name in Kadai.
Dates & assignee: followUp (planned) and due (due) and assignee can be read from the User Task Properties available at activation (job/user task properties) and used by the adapter.
Priority: user task priority property is not used. Priority is taken from kadai_manual_priority process variable only.
Attribute
C8 process variable name / source
Notes
id
composed: c8sysid-<systemId>-utk-<userTaskKey>-eik-<elementInstanceKey>
helper parsing available
name
kadai_name (process variable)
BPMN user task name is not used in C8
assignee
user task/job property or kadai_assignee if provided
job user task property preferred
created
not always available on job; not set by default

due
user task/job property (due date) or kadai_due
ISO format
planned
user task/job property (followUp date) or kadai_planned
ISO format
taskDefinitionKey
job.getElementId()

businessProcessId
job.getProcessInstanceKey()

classificationKey
kadai_classification_key
process variable
domain
kadai_domain
process variable
workbasketKey
kadai_workbasket_key
process variable
manualPriority
kadai_manual_priority
numeric variable; takes precedence for priority
customInt1…customInt8
kadai_custom_int_1…kadai_custom_int_8

attributes
kadai_attributes (comma separated)
names of variables to include in variables map
variables map
variables listed in kadai_attributes read from process variables and serialized to JSON
primitives remain primitives; non-primitives serialized as JSON
systemUrl
Camunda8System REST address
used to construct systemUrl
C8 example variables payload:
{
"kadai_classification_key": "MY_CLASS",
"kadai_domain": "DOMAIN_A",
"kadai_workbasket_key": "WB-01",
"kadai_manual_priority": 100,
"kadai_attributes": "customerId,amount",
"kadai_name": "Review Order",
"customerId": "C-123",
"amount": 42.5
}
Serialization & dates in C8:
Dates formatted as yyyy-MM-dd'T'HH:mm:ss.SSSZ.
Variables: read from job variables map; assembled into a JSON object via Jackson (primitives as native JSON types; non-primitives also serialized to JSON).
Task id format:
C7: delegateTask.getId() (Camunda user task id).
C8: c8sysid-<systemId>-utk-<userTaskKey>-eik-<elementInstanceKey> — helper functions available to compose/parse.

Quick checklist before deploy
Provide classificationKey, domain, workbasketKey.
Populate kadai_attributes / kadai.attributes with comma separated variable names to copy into Kadai's variables map.
C7: prefer model-driven config via user task extension properties; use process variables for runtime assignment. C7 also uses the BPMN user task name and standard user task properties.
C8: prefer underscored kadai_... process variables. For name use kadai_name. For due/planned/assignee you can rely on User Task Properties available at activation; do not rely on task priority property — use kadai_manual_priority.
Verify date formats and custom-int mappings.
Debugging tips
If a task is not created or routed correctly: check variable/property names and prefixes, confirm kadai_attributes / kadai.attributes exists and contains the expected variable names, and verify classificationKey/domain/workbasketKey values.
For C7: check user task extension properties and model-level properties (listener falls back across sources).
For C8: confirm variables are present on the job activation payload and correctly named; verify kadai_name is provided if you expect a custom task name.



Kadai attributes
What is necessary to load them into Kadai?

## Camunda 7

Extension Properties. 
Process Variables?


## Camunda 8

User Task Attributes that will be loaded into Kadai:
Variables 
What is necessary to load them into Kadai?

Link to Variable Scopes in Camunda 8