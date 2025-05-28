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
    "camundaSystems": {
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
        },
        "camundaSystem2": {
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
                "baseUrl": "http://localhost:8085/example-context-root/engine-rest/engine"
              }
            },
            "outbox": {
              "status": "UP",
              "details": {
                "outboxService": {
                  "eventsCount": 0
                },
                "baseUrl": "http://localhost:8085/example-context-root/outbox-rest"
              }
            }
          }
        }
      }
    },
    "kadai": {
      "status": "UP",
      "details": {
        "kadaiVersion": "10.0.1-SNAPSHOT"
      }
    },
    "scheduler": {
      "status": "UP",
      "components": {
        "kadaiTaskStarter": {
          "status": "UP",
          "details": {
            "lastRun": "2025-07-09T09:27:21.817394500Z",
            "expectedNextRunBefore": "2025-07-09T09:27:41.853121800Z",
            "expectedRunTime": 35
          }
        },
        "kadaiTaskTerminator": {
          "status": "UP",
          "details": {
            "lastRun": "2025-07-09T09:27:21.817394500Z",
            "expectedNextRunBefore": "2025-07-09T09:27:41.853041700Z",
            "expectedRunTime": 35
          }
        },
        "referencedTaskClaimCanceler": {
          "status": "UP",
          "details": {
            "lastRun": "2025-07-09T09:27:21.796450400Z",
            "expectedNextRunBefore": "2025-07-09T09:27:41.820492900Z",
            "expectedRunTime": 24
          }
        },
        "referencedTaskClaimer": {
          "status": "UP",
          "details": {
            "lastRun": "2025-07-09T09:27:21.797453900Z",
            "expectedNextRunBefore": "2025-07-09T09:27:41.824716600Z",
            "expectedRunTime": 27
          }
        },
        "referencedTaskCompleter": {
          "status": "UP",
          "details": {
            "lastRun": "2025-07-09T09:27:21.797453900Z",
            "expectedNextRunBefore": "2025-07-09T09:27:41.823103100Z",
            "expectedRunTime": 25
          }
        }
      }
    }
  }
}

```

The URLs for the Camunda Systems are derived from the property `kadai-system-connector-camundaSystemURLs`.

## Response Structure
- `status`: Represents the overall health of the system. If all services are operational
it returns **"UP"**.
- `components`: Contains the health status and details of individual services within KadaiAdapter.

## Component Breakdown

### Camunda Systems
- `camundaSystems` contains a composite of camunda systems

#### Camunda System
- `camundaSystem[i]` contains the health of the ith camunda and outbox component

##### Camunda
When healthy, it should return a list of the available Camunda Engines
- `camundaEngines` lists the available Camunda engines by name.
- `baseUrl` shows the base URL for the Camunda REST

##### Outbox
When healthy, it should return the count of events in the outbox
- `eventsCount` represents the number of unprocessed events in the outbox
- `baseUrl` shows the base URL for the Outbox REST

### Kadai
When healthy, it should return the `KADAI` version being used
- `kadaiVersion` specifies the current running version of `KADAI`

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
    - `management.health.external-services.camunda-system.camunda.enabled=false`
    - `management.health.external-services.camunda-system.outbox.enabled=false`
    - `management.health.external-services.kadai.enabled=false`
    - `management.health.external-services.scheduler.enabled=false`

This schema applies to all parts of the HealthCheck.
