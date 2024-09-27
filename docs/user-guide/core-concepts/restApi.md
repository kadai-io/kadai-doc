---
sidebar_position: 4
---

# REST-API
import Drawio from '@theme/Drawio'

KADAI provides a REST-API to interact with the KADAI entities. For example, you can get metadata of Workbaskets, create new Tasks, update Tasks etc.. 
The path for all requests to KADAI starts with the following:
```
http://localhost:8080/kadai/api/v1/
```
You can make your request by specifying the correct path with the corresponding HTTP method. The entity that the request is working on can be specified as part of the path. For example, the following request returns the Task with the id *TKI:100000000000000000000000000000000000*:
```
GET http://localhost:8080/kadai/api/v1/tasks/TKI:100000000000000000000000000000000000
```
We can also add parameters for filtering or sorting to the request. Following example filters all Tasks that are READY and returns them sorted by the key of their Classification:
```
GET http://localhost:8080/kadai/api/v1/tasks?state=READY&sort-by=CLASSIFICATION_KEY
```

The full documentation of the REST-API can be found [here](https://kadai-io.azurewebsites.net/kadai/docs/rest/rest-api.html).
