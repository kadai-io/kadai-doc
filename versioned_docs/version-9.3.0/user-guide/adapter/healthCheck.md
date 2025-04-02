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
            "details": {
                "Last Run": "2025-02-03T10:20:36.174928Z"
            }
        }
    }
```
The above response shows the overall status and the individual health details
for each service. 

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
When healthy, it should return the last run timestamp of the job scheduler
- `"status": "UP"` means the scheduler is running properly
- `Last Run` shows the timestamp of the last successful scheduler execution


If any of the service is not running properly, the overall status and the corresponding 
service will be `DOWN` and the error will be shown in the `"details"`.