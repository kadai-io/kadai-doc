---
sidebar_position: 1
---

import Drawio from '@theme/Drawio'
import simpleGraph from '!!raw-loader!../static/core-concepts/task-states.drawio';
import lifecycle from '!!raw-loader!../static/core-concepts/lifecycle.drawio';
import timelineExample from '!!raw-loader!../static/core-concepts/TimelineTask.drawio';
import timelineGeneral from '!!raw-loader!../static/core-concepts/TimelineGeneral.drawio';


# Task Lifecycle

A Task goes through different states during its existence.
The Task Lifecycle describes the states and their transitions.
Additionally,
a Task has timestamps for important state transitions and expected milestones in the processing of the Task.
In this article, Task Lifecycle and the corresponding Task states are explained in detail.

The following diagram shows Task states and their transitions. You can read more about Task States below.

<Drawio content={lifecycle} />

## Task States

<Drawio content={simpleGraph} />

## Task Timeline

The changes of state and timestamps during the lifetime of a Task can be shown in a timeline. Below is a general timeline of a Task for a common case. It shows how states and timestamps relate to each other, as well as their chronological order. It contains most of the timestamps. For a complete list of timestamps with an explanation, see the text below the diagram.

<Drawio content={timelineGeneral} />

- **Reaction Time**: Describes the time taken for someone to claim the task after it has been planned.
- **Processing Time**: Describes how long someone worked on the task from start to finish.
- **Lead Time**: Describes the time between supposed start date of a task until completion.
- **Service Level**: Describes maximum duration from supposed start until deadline.

### Task Timestamps

Each Task has different timestamps. Most of them are shown in the [example](#example) below:
- **received**: Describes when the Task first came into the system. For example, it can be the timestamp of an e-mail containing the relevant document. If there is no such timestamp, then the received timestamp can be empty.
- **created**: Describes when the Task was first inserted into the database.
- **planned**: Describes when somebody should start working on the Task.
- **claimed**: Describes when someone started to work on this Task.
- **due**: Describes the deadline for Task completion.
- **completed**: Describes when the Task was completed.
- **modified**: Describes when the Task was modified last time. Modifying a Task includes creating, claiming, completing and updating it.

All timestamps except *received* can be set automatically.
The timestamps *received*, *planned* and *due* can be set manually.
However,
the time between planned and due is usually configured
to have a fix value
by setting [servicelevel.validation.enforce](../configuration/classificationAndServiceLevel.md) to true.
If [servicelevel.validation.enforce](../configuration/classificationAndServiceLevel.md) is true,
the time between planned and due is the smallest service level corresponding to the Task.
To find out the smallest service level of the Task,
the service levels of Classification of the Task and the Classification of its Attachments are compared.
Then, either due or planned are set accordingly.
If both attributes, planned and due, were set manually without matching the service level,
and [servicelevel.validation.enforce](../configuration/classificationAndServiceLevel.md) is true,
an exception will be thrown.
If [servicelevel.validation.enforce](../configuration/classificationAndServiceLevel.md) is false,
the time between planned and due is not fixed.
That means no exception will be thrown.

### Example

Prerequisites:
- Classification ```Employment Contract``` with Service Level P5D 
- Classification ```Contract Extension``` with Service Level P7D
- [servicelevel.validation.enforce](../configuration/classificationAndServiceLevel.md) is true

Example Scenario:
- An envelope containing a letter '*Extend Contract*' describing a Task, and another document '*Contract of Max Mustermann*' attached to the letter, is received on 01-11-2023.  
- On the next day, the letter '*Extend Contract*' is then scanned with an OCR reader, which creates a Task in KADAI. The task has a deadline of 10-11-2023 and is classified as ```Contract Extension```.
- The Attachment '*Contract of Max Mustermann*' is also scanned with the OCR reader, which creates an Attachment in KADAI and assigned it to the Classification ```Employment Contract```.
- The planned timestamp of the Task is computed during the Task creation as following:
  - service Levels of the Attachment and Task are compared. 
  - The Classification ```Contract Extension``` has a Service Level of P7D, and Classification ```Employment Contract``` has a Service Level of P5D.
  - P5D is used to compute planned of the Task, because P5D is smaller than P7D. 
  - Planned is set to 3-11-2023. 
- An employee claims this Task on 06-11-2023. 
- The employee completes it on 09-11-2023, one day before the due date.


<Drawio content={timelineExample} />






