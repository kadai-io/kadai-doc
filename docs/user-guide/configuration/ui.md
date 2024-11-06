---
sidebar_position: 9
---

# UI

## Environment Configuration

The environment information defined below can be configured
using the JSON file `/environments/data-sources/environment-information.json`.
The file can, for example,
be placed in the sources of the frontend of your KADAI application or placed into the resources/static folder of your REST application.
It will be loaded on initial request.

The environment-information.json contains two parameters:

| Property       | Description                                                      |
|----------------|------------------------------------------------------------------|
| kadaiRestUrl   | The root path of the REST Service. It has to end with "/api"     |
| kadaiLogoutUrl | The location a user is redirected to when a logout is triggered. |

Here is an example:

```
{
	"kadaiRestUrl": "http://localhost:8080/kadai/api",
	"kadaiLogoutUrl": "http://localhost:8080/kadai"
}
```

In this case, KADAI is deployed on localhost, port 8080 using the context root `/kadai`.
The default environment-information.json file can be found in our GitHub repository [here](https://github.com/kadai-io/kadai/blob/master/web/src/environments/data-sources/environment-information.json).

## UI Customization

Some KADAI UI elements, such as custom properties,
can be configured in the JSON file `/environments/data-sources/kadai-customization.json`.
The file can, for example,
be placed in the sources of the frontend of your KADAI application or placed into the resources/static folder of your REST application.
They will be loaded on initial request.

The default kadai-customization.json will be found in our GitHub repository. 

If you have any questions regarding the UI Customization, please don’t hesitate to [contact us](../../contact-us/contactUs.md).
