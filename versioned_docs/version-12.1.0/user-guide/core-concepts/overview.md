---
sidebar_position: 1
---

# Overview

import Drawio from '@theme/Drawio'
import entities from '!!raw-loader!../static/core-concepts/entities.drawio';
import architecture from '!!raw-loader!../static/core-concepts/architecture.drawio';

KADAI is an open source Task Management System. It includes defining and creating tasks and keeping track of their execution, as well as distributing them to their responsible users. KADAI also offers options for detailed descriptions of each task using attachments, object references, and many other properties. In the following article, the basic entities of KADAI and related concepts are explained. 

To provide its functionality, KADAI consists of different components.
They are shown in the diagram below.
As different components provide different features,
the description of relevant modules can be found [here](../reference/modules.md).
You can read more about the Java Library and its usage [here](./javaApiUsage). 

<Drawio content={architecture} />

## KADAI Entities
All KADAI Entities can be found in the Java API. You can read more about our Java API [here](./javaApiUsage.md). For better readability, entities are capitalized in the documentation. 

KADAI operates using Tasks, Classifications, and Workbaskets.
Additional entities are Attachments, ObjectReferences, and WorkbasketAccessIds.
The entities are stored in the [configured database](../configuration/database.md).
You can see the detailed data model [here](../reference/dataModel.md).

<Drawio content={entities} />


### Task

The Task entity represents a human task that should be worked on by one of the responsible users.
A Task is identified by unique id that cannot be changed after creation. 

Each Task has exactly one Classification and an arbitrary number of Attachments. Each Attachment also has a Classification. These Classifications categorize the Task and the Attachment. They also determine some of their properties. For example, you can prioritize Tasks differently by using different Classifications. To compute the priority of a Task, take the greatest priority of the Classification of the Task and the Classifications of its Attachments. 

The Task is assigned to exactly one Workbasket. A Workbasket describes the group of people who can work on this Task. This way, different users have access to different Tasks. 

A Task goes through different states during its existence.
The Task Lifecycle describes the states and their transitions.
You can read more about it [here](./taskLifecycle.md)

### ObjectReference
ObjectReference refers to a Task related document or any other real world object that the Task is about. The document is identified by the value field of ObjectReference. Each Task must have one primary ObjectReference. The primary ObjectReference defines the main involved document. A Task can have several secondary ObjectReferences that are also relevant for the Task.


### Attachment
Similar to ObjectReference, an Attachment describes a Task related document.
While an ObjectReference only refers to an object,
an Attachment describes it using different attributes.
That's why an Attachment has a Classification and an ObjectReference.
An example Attachment can describe a letter that leads to the Task creation.
In this case,
the ObjectReference of the Attachment will refer to the letter
 stored in a different system. 

### Classification

The Classification entity represents a category of Tasks.
The Tasks with the same Classification have some common attributes.
For example, the due date and priority of a Task is computed using its Classification.
A Classification can be identified by its id.
Alternatively, a Classification has a key which identifies it in a certain domain.
This way, the Classification can be determined using the (key, domain) pair.
There can be multiple Classifications with the same key in different domains.
For each key, there is a master Classification.
A master Classification has a domain value "" (empty String).
If a Classification is not found in a given domain,
then the master Classification with the same key is returned.
The successful deletion of the master Classification means the deletion of all Classifications with that key.

### Workbasket

 A Workbasket is a list of Tasks.
 It's used to manage the group of people who can work on the Tasks in this list.
 Each user has access to a set of Workbaskets.
 For example, each team member has access to the Workbasket of the team.
 Similar to a Classification,
 a Workbasket can be identified either by id or by the (key, domain) pair.
 There can be multiple Workbaskets with the same key but different domains. 

There are different options for accessing a Workbasket. You can read more about them and other permissions [here](./securityAndPermissions#access-to-workbaskets).

KADAI provides different options for choosing a Workbasket for a specific Task.
For example, there is the Task Routing feature.
Task Routing allows implementing custom logic for determining the Workbasket for a Task. 

### WorkbasketAccessItem

A WorkbasketAccessItem specifies permissions for a given Workbasket and a specific user or group. You can read more about different permissions [here](./securityAndPermissions#access-to-workbaskets). There is also an [example table](./securityAndPermissions.md#example-workbasketaccesslist-table) containing WorkbasketAccessItems. 

### Summary Objects

KADAI provides the possibility to add large attributes to the entities. To minimize the computational load created by these large attributes, KADAI introduces summaries of its entities. Summary objects contain only the most important information. They are light versions of the original object. For example, TaskSummary doesn't contain Attachments or SecondaryObjectReferences. When asked to return a List of entities, our APIs return summaries of the objects. You can always get the full object using the information from the summary of this object.

## Operations on entities

KADAI provides the following operations on its entities:
 - Creating
 - Updating
 - Deleting
 - [Querying](../features/queriesFilteringAndSorting.md) (additionally allows filtering and sorting entities by properties)

You can read technical details about operating on entities [using the Java-API](./javaApiUsage.md) and [using the REST-API](./restApi.md).

## List of important features
You can look up important features of KADAI [here](../../category/features).
