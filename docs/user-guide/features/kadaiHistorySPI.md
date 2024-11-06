---
sidebar_position: 3
---

# KadaiHistory SPI

To follow this article, please read [general SPI information](howToUseServiceProviderInterfaces.md) before proceeding.

The KadaiHistory can be used for different purposes.
In general, it tracks actions performed by KADAI,
like creation of Workbaskets, completion of Tasks, etc.
The HistoryService makes this information available for further usage.
KADAI already provides an implementation for the KadaiHistory described [here](#kadaihistory-implementation-and-the-corresponding-rest-service).
Below, you can see example business use cases for KadaiHistory.
## Use Cases for KadaiHistory
- History of one business process: (relevant for specialists working on a Task of that process)
    - Who worked on it before?
    - Who transferred it to me?
    - What happened in the process before it got assigned to the user?
- Auditing:
    - Is everything completed?
    - What happened to a specific document / process?
    - Who approved what?
   -  Who changed something?
- Reporting: (SLA/KPI)
    - How long did a process/Task take in average?
    - How long did it take until a new message from a customer is assigned to a specialist?
    - How often was required to change the Classification of the Task/document?
- Reporting:
    - How many Tasks of what Classification did we receive this day/week/month?
    - How many Tasks have been completed by team/location/etc.?


## KadaiHistory Implementation and the corresponding REST-Service

Additionally to the SPI, KADAI already provides an implementation at io.kadai.simplehistory.impl.SimpleHistoryServiceImpl. 
You can activate SimpleHistoryServiceImpl by adding the following dependency to your pom:

```
<dependency>
      <groupId>io.kadai.history</groupId>
      <artifactId>kadai-simplehistory-provider</artifactId>
      <version><put your KADAI version here></version>
</dependency>
```
KADAI also provides a REST service for SimpleHistoryServiceImpl documented [here](https://kadai-io.azurewebsites.net/kadai/docs/rest/simplehistory-rest-api.html). If you want to use the REST Service, you can add the following dependency to your pom:
```
<dependency>
      <groupId>io.kadai.history</groupId>
      <artifactId>kadai-simplehistory-rest-spring</artifactId>
      <version><put your KADAI version here></version>
</dependency>
```

