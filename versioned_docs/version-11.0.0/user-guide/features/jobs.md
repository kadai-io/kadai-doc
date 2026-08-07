---
sidebar_position: 4
---

# KADAI Jobs

During the usage of KADAI, some functionality has to be executed in the background implicitly.
This is by Jobs that are run by the scheduler.
Both scheduler and customizable Jobs
run at a fixed rate that can be specified during KADAI set up.
Each time the scheduler is run, it starts all jobs that are due.
This way, jobs can be created and run automatically.
Jobs can only be started by the scheduler.
If the scheduler is run once daily, a job can't be executed more frequently.
All job configuration options are explained [here](../configuration/kadaiJobs.md).

You can implement your own Jobs or use Jobs provided by KADAI. The jobs provided by KADAI are listed
below.

### TaskPriorityUpdateJob

This job updates Task priority for each Task once in a fixed time interval.

### UserInfoRefreshJob

This job loads User Info into the User table from the .ldif file once in a fixed time interval.

### TaskCleanupJob

This job deletes Tasks completed longer than a fixed time ago. This Job also runs at a fixed rate.

### HistoryCleanupJob

This job deletes HistoryEvents for deleted Tasks. This Job also runs at a fixed rate.
