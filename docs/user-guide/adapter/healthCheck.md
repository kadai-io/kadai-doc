---
sidebar_position: 2
---

# HealthCheck

KadaiAdapter also provides a way to monitor its health - built on top of [SpringBoot Actuator](https://docs.spring.io/spring-boot/reference/actuator/index.html).

Assuming that the adapter application runs at `http://localhost:8082` you can request below URL for all health-information:
```
GET http://localhost:8082/actuator/health
```

The hierarchical nature allows to just request health information for specific sub-systems, e.g. all external services via:
```
GET http://localhost:8082/actuator/health/externalServices
```

When all the external services are healthy, it will respond with something similar to:

```json
{
  "status": "UP",
  "components": {
    "camunda": {
      "status": "UP",
      "details": {
        "camundaEngines": [
          {
            "name": "default"
          }
        ]
      }
    },
    "kadai": {
      "status": "UP",
      "details": {
        "kadaiVersion": "9.3.1-SNAPSHOT"
      }
    },
    "outbox": {
      "status": "UP",
      "details": {
        "outboxService": {
          "eventsCount": 0
        }
      }
    },
    "scheduler": {
      "status": "UP",
      "components": {
        "kadaiTaskStarter": {
          "status": "UP",
          "details": {
            "lastRun": "2025-05-26T11:41:09.205067300Z",
            "expectedNextRunBefore": "2025-05-26T11:41:29.222045900Z",
            "expectedRunTime": 16
          }
        },
        "kadaiTaskTerminator": {
          "status": "UP",
          "details": {
            "lastRun": "2025-05-26T11:41:09.205067300Z",
            "expectedNextRunBefore": "2025-05-26T11:41:29.222478500Z",
            "expectedRunTime": 17
          }
        },
        "referencedTaskClaimCanceler": {
          "status": "UP",
          "details": {
            "lastRun": "2025-05-26T11:41:09.218071700Z",
            "expectedNextRunBefore": "2025-05-26T11:41:29.244051Z",
            "expectedRunTime": 25
          }
        },
        "referencedTaskClaimer": {
          "status": "UP",
          "details": {
            "lastRun": "2025-05-26T11:41:09.218071700Z",
            "expectedNextRunBefore": "2025-05-26T11:41:29.243084700Z",
            "expectedRunTime": 25
          }
        },
        "referencedTaskCompleter": {
          "status": "UP",
          "details": {
            "lastRun": "2025-05-26T11:41:09.218071700Z",
            "expectedNextRunBefore": "2025-05-26T11:41:29.243084700Z",
            "expectedRunTime": 25
          }
        }
      }
    }
  }
}
```

## Response Structure
- `status`: Represents the overall health of the system. If all services are operational
it returns **"UP"**.
- `components`: Contains the health status and details of individual services within KadaiAdapter.

## Component Breakdown

### Camunda
When healthy, it should return a list of the available Camunda Engines
- `camundaEngines` lists the available Camunda engines by name.

### Kadai
When healthy, it should return the `KADAI` version being used
- `kadaiVersion` specifies the current running version of `KADAI`

### Outbox
When healthy, it should return the count of events in the outbox
- `eventsCount` represents the number of unprocessed events in the outbox

### Scheduler
Health-Composite, healthy if all Health-Contributors are healthy. 

Each Health-Contributor provides the following information:
  - `lastRun`: The last successfully reported run
  - `expectedNextRunBefore`: The latest point in time the next scheduled run is expected to have been reported successful
  - `expectedRunTime`: The expected run-time in milliseconds for a single run of the scheduled functionality, reported as lower median

If any of the services is not running properly, the overall status will be `DOWN` and the error will be shown in the `"details"`.

The `expectedNextRunBefore` can be configured by supplying an acceptance-multiplier for threshold.
It determines `expectedNextRunBefore = run-time-acceptance-multiplier * expectedRunTime + lastRun`. 
It can be set via:
```properties title="application.properties"
management.health.external-services.scheduler.run-time-acceptance-multiplier=42
```

## Disabling certain parts of the HealthCheck
You can either
- fully disable the `external-services`-HealthCheck by setting `management.health.external-services.enabled=false` or
- partially disable any of its contributors by setting either of
    - `management.health.external-services.camunda.enabled=false`
    - `management.health.external-services.kadai.enabled=false`
    - `management.health.external-services.outbox.enabled=false`
    - `management.health.external-services.scheduler.enabled=false`

This schema applies to all parts of the HealthCheck.