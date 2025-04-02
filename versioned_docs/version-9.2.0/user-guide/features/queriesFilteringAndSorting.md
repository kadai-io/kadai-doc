---
sidebar_position: 7
---

# Queries: Filtering and Sorting

You can get a list of Tasks, Workbaskets, Classifications,
Users and other resources using KADAI queries.
They allow filtering and sorting according to different criteria, e.g., priority,
owner, etc. Queries can be executed using the REST-API or the Java-API. 

## Query usage in the REST-API
KADAI provides a REST-API described [here](../core-concepts/restApi).
You should use HTTP GET method to execute a query.
Query parameters for filtering and sorting are specified in the HTTP request after "?".
For example, the following request will return all Tasks that are owned by *user-1-1* or *user-1-2*:
```
GET http://localhost:8080/kadai/api/v1/tasks?owner=user-1-1&owner=user-1-2
```

Here is an example of the query from our [REST-API doc](../core-concepts/restApi):
```json
{
  "tasks": [
    {
      "taskId": "TKI:000000000000000000000000000000000000",
      "externalId": "ETI:000000000000000000000000000000000000",
      "created": "2025-02-17T16:16:51.910Z",
      "claimed": "2025-02-18T16:16:51.910Z",
      "completed": null,
      "modified": "2025-02-18T16:16:51.910Z",
      "planned": "2025-02-17T16:16:51.910Z",
      "received": "2025-02-18T16:16:51.910Z",
      "due": "2025-02-18T16:16:51.910Z",
      "name": "Task99",
      "creator": "creator_user_id",
      "note": "Some custom Note",
      "description": "Lorem ipsum dolor sit amet.",
      "priority": 1,
      "manualPriority": -1,
      "state": "CLAIMED",
      "numberOfComments": 3,
      "classificationSummary": {
        "classificationId": "CLI:100000000000000000000000000000000016",
        "key": "T2000",
        "applicationEntryPoint": "z",
        "category": "MANUAL",
        "domain": "DOMAIN_A",
        "name": "T-Vertragstermin",
        "parentId": "",
        "parentKey": "",
        ...
      },
      ...
    },
    ...
  ]
}
```

More about queries using the REST-API can be found in the [REST-API Documentation](https://kadai-io.azurewebsites.net/kadai/swagger-ui/index.html).

# Query in JAVA-API
You can also execute queries using the [JAVA-API](../core-concepts/javaApiUsage.md) of KADAI. To do that, create a query using the service of the relevant entity. Then, add filtering and sorting parameters to your query and execute it. When querying for Tasks, you need to use ``TaskService.createTaskQuery()``. You can find the query filter and sorting parameters under ``io.kadai.TaskQuery.api``.
Here is an example of a query that returns Tasks owned by *user-1-1* or *user-1-2* sorted by the business process id of the Task:
```java
List<TaskSummary> tasks = taskService.createTaskQuery()
    .ownerIn("user-1-1","user-1-2")
    .orderByBusinessProcessId(SortDirection.ASCENDING)
    .list();
```
