---
sidebar_position: 3
---

# HealthCheck

KadaiAdapter also provides a way to monitor its health - built on top
of [SpringBoot Actuator](https://docs.spring.io/spring-boot/reference/actuator/index.html).

Assuming that the adapter application runs at `http://localhost:8082` you can request below URL for
all health-information:

```
GET http://localhost:8082/actuator/health
```

## Kernel

The hierarchical nature allows to just request health information for specific sub-systems, e.g. all
kernel-components:

```json title="GET http://localhost:8082/actuator/health/kadaiAdapter/kernel"
{
  "status": "UP",
  "components": {
    "kadai": {
      "status": "UP",
      "details": {
        "kadaiVersion": "11.0.1-SNAPSHOT"
      }
    },
    "scheduler": {
      "status": "UP",
      "components": {
        "kadaiTaskStarter": {
          "status": "UP",
          "details": {
            "lastRun": "2025-10-07T10:39:18.036280700Z",
            "expectedNextRunBefore": "2025-10-07T10:39:38.185300900Z",
            "expectedRunTime": 149
          }
        },
        "kadaiTaskTerminator": {
          "status": "UP",
          "details": {
            "lastRun": "2025-10-07T10:39:18.045281300Z",
            "expectedNextRunBefore": "2025-10-07T10:39:38.064082400Z",
            "expectedRunTime": 18
          }
        },
        "referencedTaskClaimCanceler": {
          "status": "UP",
          "details": {
            "lastRun": "2025-10-07T10:39:18.065285700Z",
            "expectedNextRunBefore": "2025-10-07T10:39:38.103276500Z",
            "expectedRunTime": 37
          }
        },
        "referencedTaskClaimer": {
          "status": "UP",
          "details": {
            "lastRun": "2025-10-07T10:39:18.065285700Z",
            "expectedNextRunBefore": "2025-10-07T10:39:38.103276500Z",
            "expectedRunTime": 37
          }
        },
        "referencedTaskCompleter": {
          "status": "UP",
          "details": {
            "lastRun": "2025-10-07T10:39:18.065285700Z",
            "expectedNextRunBefore": "2025-10-07T10:39:38.103276500Z",
            "expectedRunTime": 37
          }
        }
      }
    }
  }
}
```

### Kadai

When healthy, it should return the `KADAI` version being used

- `kadaiVersion` specifies the current running version of `KADAI`

### Scheduler

Health-Composite, healthy if all Health-Contributors are healthy.

Each Health-Contributor provides the following information:

- `lastRun`: The last successfully reported run
- `expectedNextRunBefore`: The latest point in time the next scheduled run is expected to have been
  reported successful
- `expectedRunTime`: The expected run-time in milliseconds for a single run of the scheduled
  functionality, reported as lower median

If any of the services is not running properly, the overall status will be `DOWN` and the error will
be shown in the `"details"`.

The `expectedNextRunBefore` can be configured by supplying an acceptance-multiplier for threshold.
It determines `expectedNextRunBefore = run-time-acceptance-multiplier * expectedRunTime + lastRun`.
It can be set via:

```properties title="application.properties"
management.health.kadai-adapter.kernel.scheduler.run-time-acceptance-multiplier=42
```

## Plugins

### Camunda 7

The URLs for the Camunda7-Systems are derived from the property
`kadai-system-connector-camundaSystemURLs`.

#### Example-Response

```json title="http://localhost:8082/actuator/health/kadaiAdapter/plugin/camunda7"
{
  "status": "UP",
  "components": {
    "camundaSystem1": {
      "status": "UP",
      "components": {
        "camunda": {
          "status": "UP",
          "details": {
            "camundaEngines": [
              {
                "name": "default"
              }
            ],
            "baseUrl": "http://localhost:8081/example-context-root/engine-rest/engine"
          }
        },
        "outbox": {
          "status": "UP",
          "details": {
            "outboxService": {
              "eventsCount": 0
            },
            "baseUrl": "http://localhost:8081/example-context-root/outbox-rest"
          }
        }
      }
    }
  }
}
```

#### Camunda Systems

- `camunda7` contains a composite of Camunda7-Systems

#### Camunda System

- `camundaSystem[i]` contains the health of the i-th Camunda- and Outbox-Component

#### Camunda

When healthy, it should return a list of the available Camunda Engines

- `camundaEngines` lists the available Camunda engines by name.
- `baseUrl` shows the base URL for the Camunda REST

#### Outbox

When healthy, it should return the count of events in the outbox

- `outboxService.eventsCount` represents the number of unprocessed events in the outbox
- `baseUrl` shows the base URL for the Outbox REST

## Partially disabling Health-Indicators

**By default**, all kernel- as well as all found plugin-health-composites and -indicators are
**enabled**.

The KadaiAdapter-Health is a Rose-Tree where the root is `kadaiAdapter` - the composite of all
Health-indicators related to the KadaiAdapter.
Branches are [
`Health-Composites`](https://docs.spring.io/spring-boot/api/java/org/springframework/boot/actuate/health/CompositeHealthContributor.html) -
themselves composed of Health-Trees.
Leafs are [
`Health-Indicators`](https://docs.spring.io/spring-boot/api/java/org/springframework/boot/actuate/health/HealthIndicator.html).
In this tree you can
- fully disable any branch `branch` (composite) and it's children by setting
  `management.health.kadai-adapter.branch.enabled=false`, e.g.:
    - `management.health.kadai-adapter.kernel.enabled=false`
    - `management.health.kadai-adapter.plugin.enabled=false`
    - `management.health.kadai-adapter.plugin.camunda7.enabled=false`
- partially disable any of a composites contributors `contributor` by setting
  `management.health.kadai-adapter.branch.contributor.enabled=false`, e.g.:
    - `management.health.kadai-adapter.kernel.kadai.enabled=false`
    - `management.health.kadai-adapter.kernel.kadai.scheduler=false`
    - `management.health.kadai-adapter.plugin.camunda7.outbox.enabled=false`
    - `management.health.kadai-adapter.kernel.scheduler.kadai-task-terminator.enabled=false`

This schema applies to all parts of the KadaiAdapter-HealthCheck.
