---
sidebar_position: 2
---

# HealthCheck

KadaiAdapter also provides a way to monitor the health of the `Adapter`, 
`Camunda Engine`, `Outbox`, and the `Job Scheduler`. This can be done by sending a request to 
the following endpoint:

```
GET http://localhost:8082/actuator/health/external-services
```
assuming that the adapter application runs at `http://localhost:8082`.

When all of the services are healthy, it will give the following response:

```json
{
    "status": "UP",
    "components": {
        "Camunda Health": {
            "status": "UP",
            "details": {
                "Camunda Engines": [
                    {
                        "name": "default"
                    }
                ]
            }
        },
        "Kadai Health": {
            "status": "UP",
            "details": {
                "Kadai Version": "9.2.0"
            }
        },
        "Outbox Health": {
            "status": "UP",
            "details": {
                "Outbox Service": {
                    "eventsCount": 0
                }
            }
        },
        "Scheduler Health": {
            "status": "UP",
          "components": {
            "Kadai Task Starter": {
              "status": "UP",
              "details": {
                "Last Run": "2025-04-16T12:08:43.405902Z"
              }
            },
            "Kadai Task Terminator": {
              "status": "UP",
              "details": {
                "Last Run": "2025-04-16T12:08:43.391904800Z"
              }
            },
            "Referenced Task Claim Canceler": {
              "status": "UP",
              "details": {
                "Last Run": "2025-04-16T12:08:43.414898400Z"
              }
            },
            "Referenced Task Claimer": {
              "status": "UP",
              "details": {
                "Last Run": "2025-04-16T12:08:43.415899600Z"
              }
            },
            "Referenced Task Completer": {
              "status": "UP",
              "details": {
                "Last Run": "2025-04-16T12:08:43.414898400Z"
              }
            }
          }
        }
    }
```
The above response shows the overall status and the individual health details
for each service. For the scheduler health, the health of each individual scheduled job is shown. 

## Response Structure
- `status`: Represents the overall health of the system. If all services are operational
it returns **"UP"**.
- `components`: Contains the health status and details of individual services within KadaiAdapter.

## Component Breakdown

### Camunda Health
When healthy, it should return a list of the available Camunda Engines
- `"status": "UP"` means the engine is running properly.
- `"Camunda Engines"` lists the available Camunda engines by name.

### Kadai Health
When healthy, it should return the `KADAI` version being used
- `"status": "UP"` means the `KADAI` service is running properly.
- `Kadai Version` specifies the current running version of `KADAI`

### Outbox Health
When healthy, it should return the count of events in the outbox
- `"status": "UP"` means the `Outbox` service is running properly.
- `"eventsCount"` represents the number of unprocessed events in the outbox

### Scheduler Health
The **Scheduler Health** component monitors the health of individual scheduled jobs in the system. It is a **composite health check**, meaning it aggregates the status of multiple scheduler components.
- `"status": "UP"` at the top level means all scheduled jobs are running as expected.
- `"components"` contains the health details of each individual scheduler job.
  - `"status": "UP"` indicates that the specific scheduled job is running as expected.
  - `"Last Run"` shows the timestamp of the last successful execution of that specific job.


If any of the service is not running properly, the overall status and the corresponding 
service will be `DOWN` and the error will be shown in the `"details"`.