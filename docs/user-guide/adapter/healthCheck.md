---
sidebar_position: 5
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

### Camunda 8

Unlike Camunda7 we do not include the health of the Camunda8-instance itself in here.
You can inspect that separately with the Health-Endpoints provided by Camunda,
see [Orchestration-Cluster/Zeebee/Health](https://docs.camunda.io/docs/self-managed/components/orchestration-cluster/zeebe/operations/health/).

#### Example-Response

```json title="http://localhost:8082/actuator/health/kadaiAdapter/plugin/camunda8"
{
  "status": "UP",
  "components": {
    "jobWorker": {
      "status": "UP",
      "components": {
        "complete": {
          "status": "UNKNOWN",
          "details": {
            "lastRun": null,
            "expectedRunTime": 0
          }
        },
        "create": {
          "status": "UP",
          "details": {
            "lastRun": "2025-10-16T08:55:19.287769500Z",
            "expectedRunTime": 55
          }
        },
        "cancel": {
          "status": "UP",
          "details": {
            "lastRun": "2025-10-16T08:55:20.474158400Z",
            "expectedRunTime": 74
          }
        }
      }
    }
  }
}
```

#### Job-Worker

The health-composite of all job-workers.

#### Create (Job-Worker)

The health-indicator for the job-worker responsible for reacting to user-tasks being created.

#### Complete (Job-Worker)

The health-indicator for the job-worker responsible for reacting to user-tasks being completed.

#### Cancel (Job-Worker)

The health-indicator for the job-worker responsible for reacting to user-tasks being cancelled.

### Register a Health-Indicator for your own plugin

The starting-point for registering health-indicators for your own plugins is interface
`PluginHealthContributorFactory`.

```java title="io.kadai.adapter.monitoring.PluginHealthContributorFactory"
/**
 * Instantiated factory for KadaiAdapter-specific plugin-health-contributors.
 *
 * <p>Implement this interface for any contributing Health-Indicators.
 *
 * <p>Implementations of this interface will be picked up by {@link KadaiAdapterHealth} via
 * <b>classpath-scanning</b> in a SpringBoot-Application. Therefore, you <b>need to</b> lift your
 * implementation into the Spring-Context, e.g. by annotating it as {@code @Component}.
 */
public interface PluginHealthContributorFactory {

  /**
   * Returns the name of the plugin.
   *
   * <p>This name will be used as an <b>identifier</b> for Health-Contributors created by
   * <i>this</i> factory. It will further be used as JSON-Field in the actuators' health-response.
   *
   * @return name of the plugin
   */
  String getPluginName();

  /**
   * Returns an optional instance of the Health-Contributor created by <i>this factory</i>.
   *
   * <p>It may return {@link Optional#empty()}, e.g. to control activation of this plugin through
   * extra properties.
   *
   * @return an optional instance of the Health-Contributor
   */
  Optional<HealthContributor> newInstance();
}
```

Implement it and make sure your implementing class can be picked-up by Spring, e.g. by annotating it
with `@Component`.
That's it! The KadaiAdapter will now automatically pick up your implementation and expose it via
actuator.
It may then look like this:

```java title="my.org.kadai.adapter.plugin.monitoring.MyPluginHealthContributorFactory"

@Component
public class MyPluginHealthContributorFactory implements PluginHealthContributorFactory {

  @Override
  public String getPluginName() {
    return "my-plugin";
  }

  @Override
  public Optional<HealthContributor> newInstance() {
    final MyHealthContributor myHealthContributor = new MyHealthContributor();
    return Optional.of(myHealthContributor); // HealthComposite or -Indicator - whatever you wish!
  }
}
```

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
