---
sidebar_position: 2
---

# Data Model

The KADAI data model is built around three core business entities — **Task**, **Workbasket**, and **Classification** — with supporting structures for access control, user management, job scheduling, and audit history.

## Overview

```mermaid
---
config:
  look: neo
  theme: neo
---
erDiagram
    TASK }o--|| WORKBASKET : "belongs to"
    TASK }o--|| CLASSIFICATION : "classified by"
    CLASSIFICATION ||--o{ CLASSIFICATION : "parent of"
    TASK ||--o{ ATTACHMENT : "has"
    TASK ||--o{ OBJECT_REFERENCE : "has"
    TASK ||--o{ TASK_COMMENT : "has"
    ATTACHMENT }o--|| CLASSIFICATION : "classified by"
    WORKBASKET ||--o{ WORKBASKET_ACCESS_LIST : "secured by"
    WORKBASKET ||--o{ DISTRIBUTION_TARGETS : "source of"
    WORKBASKET ||--o{ DISTRIBUTION_TARGETS : "target of"
    USER_INFO ||--o{ GROUP_INFO : "member of"
    USER_INFO ||--o{ PERMISSION_INFO : "has"

    TASK { string ID PK }
    WORKBASKET { string ID PK }
    CLASSIFICATION { string ID PK }
    ATTACHMENT { string ID PK }
    OBJECT_REFERENCE { string ID PK }
    TASK_COMMENT { string ID PK }
    WORKBASKET_ACCESS_LIST { string ID PK }
    DISTRIBUTION_TARGETS { string SOURCE_ID FK }
    USER_INFO { string USER_ID PK }
    GROUP_INFO { string USER_ID FK }
    PERMISSION_INFO { string USER_ID FK }
```

## Core Entities

### Task, Workbasket & Classification

```mermaid
---
config:
  look: neo
  theme: neo
---
erDiagram
    TASK }o--|| WORKBASKET : "belongs to"
    TASK }o--|| CLASSIFICATION : "classified by"
    CLASSIFICATION ||--o{ CLASSIFICATION : "parent of"

    CLASSIFICATION {
        string  ID                      PK
        string  KEY
        string  PARENT_ID               FK
        string  PARENT_KEY
        string  CATEGORY
        string  TYPE
        string  DOMAIN
        boolean VALID_IN_DOMAIN
        string  NAME
        string  DESCRIPTION
        int     PRIORITY
        string  SERVICE_LEVEL
        string  APPLICATION_ENTRY_POINT
        string  CUSTOM_1
        string  CUSTOM_2
        string  CUSTOM_3
        string  CUSTOM_4
        string  CUSTOM_5
        string  CUSTOM_6
        string  CUSTOM_7
        string  CUSTOM_8
        timestamp CREATED
        timestamp MODIFIED
    }

    WORKBASKET {
        string  ID                  PK
        string  KEY
        string  DOMAIN
        string  TYPE
        string  NAME
        string  DESCRIPTION
        string  OWNER
        boolean MARKED_FOR_DELETION
        string  ORG_LEVEL_1
        string  ORG_LEVEL_2
        string  ORG_LEVEL_3
        string  ORG_LEVEL_4
        string  CUSTOM_1
        string  CUSTOM_2
        string  CUSTOM_3
        string  CUSTOM_4
        string  CUSTOM_5
        string  CUSTOM_6
        string  CUSTOM_7
        string  CUSTOM_8
        timestamp CREATED
        timestamp MODIFIED
    }

    TASK {
        string    ID                         PK
        string    EXTERNAL_ID                UK
        string    WORKBASKET_ID              FK
        string    WORKBASKET_KEY
        string    CLASSIFICATION_ID          FK
        string    CLASSIFICATION_KEY
        string    CLASSIFICATION_CATEGORY
        string    DOMAIN
        string    STATE
        int       PRIORITY
        int       MANUAL_PRIORITY
        string    NAME
        string    CREATOR
        string    DESCRIPTION
        string    NOTE
        string    OWNER
        string    BUSINESS_PROCESS_ID
        string    PARENT_BUSINESS_PROCESS_ID
        string    POR_COMPANY
        string    POR_SYSTEM
        string    POR_INSTANCE
        string    POR_TYPE
        string    POR_VALUE
        boolean   IS_READ
        boolean   IS_TRANSFERRED
        boolean   IS_REOPENED
        string    CALLBACK_STATE
        clob      CALLBACK_INFO
        clob      CUSTOM_ATTRIBUTES
        string    CUSTOM_1
        string    CUSTOM_2
        string    CUSTOM_3
        string    CUSTOM_4
        string    CUSTOM_5
        string    CUSTOM_6
        string    CUSTOM_7
        string    CUSTOM_8
        string    CUSTOM_9
        string    CUSTOM_10
        string    CUSTOM_11
        string    CUSTOM_12
        string    CUSTOM_13
        string    CUSTOM_14
        string    CUSTOM_15
        string    CUSTOM_16
        int       CUSTOM_INT_1
        int       CUSTOM_INT_2
        int       CUSTOM_INT_3
        int       CUSTOM_INT_4
        int       CUSTOM_INT_5
        int       CUSTOM_INT_6
        int       CUSTOM_INT_7
        int       CUSTOM_INT_8
        int       NUMBER_OF_COMMENTS
        timestamp CREATED
        timestamp CLAIMED
        timestamp COMPLETED
        timestamp MODIFIED
        timestamp PLANNED
        timestamp DUE
        timestamp RECEIVED
    }
```

### Task Sub-Entities

```mermaid
---
config:
  look: neo
  theme: neo
---
erDiagram
    TASK ||--o{ ATTACHMENT : "has"
    TASK ||--o{ OBJECT_REFERENCE : "has"
    TASK ||--o{ TASK_COMMENT : "has"
    ATTACHMENT }o--|| CLASSIFICATION : "classified by"

    TASK { string ID PK }
    CLASSIFICATION { string ID PK }

    ATTACHMENT {
        string    ID                 PK
        string    TASK_ID            FK
        string    CLASSIFICATION_ID  FK
        string    CLASSIFICATION_KEY
        string    REF_COMPANY
        string    REF_SYSTEM
        string    REF_INSTANCE
        string    REF_TYPE
        string    REF_VALUE
        string    CHANNEL
        clob      CUSTOM_ATTRIBUTES
        timestamp CREATED
        timestamp MODIFIED
        timestamp RECEIVED
    }

    OBJECT_REFERENCE {
        string ID      PK
        string TASK_ID FK
        string COMPANY
        string SYSTEM
        string SYSTEM_INSTANCE
        string TYPE
        string VALUE
    }

    TASK_COMMENT {
        string    ID         PK
        string    TASK_ID    FK
        string    TEXT_FIELD
        string    CREATOR
        timestamp CREATED
        timestamp MODIFIED
    }
```

## Access Control

```mermaid
---
config:
  look: neo
  theme: neo
---
erDiagram
    WORKBASKET ||--o{ WORKBASKET_ACCESS_LIST : "secured by"
    WORKBASKET ||--o{ DISTRIBUTION_TARGETS : "source of"
    WORKBASKET ||--o{ DISTRIBUTION_TARGETS : "target of"

    WORKBASKET { string ID PK }

    WORKBASKET_ACCESS_LIST {
        string  ID              PK
        string  WORKBASKET_ID   FK
        string  ACCESS_ID
        string  ACCESS_NAME
        boolean PERM_READ
        boolean PERM_READTASKS
        boolean PERM_EDITTASKS
        boolean PERM_OPEN
        boolean PERM_APPEND
        boolean PERM_TRANSFER
        boolean PERM_DISTRIBUTE
        boolean PERM_CUSTOM_1
        boolean PERM_CUSTOM_2
        boolean PERM_CUSTOM_3
        boolean PERM_CUSTOM_4
        boolean PERM_CUSTOM_5
        boolean PERM_CUSTOM_6
        boolean PERM_CUSTOM_7
        boolean PERM_CUSTOM_8
        boolean PERM_CUSTOM_9
        boolean PERM_CUSTOM_10
        boolean PERM_CUSTOM_11
        boolean PERM_CUSTOM_12
    }

    DISTRIBUTION_TARGETS {
        string SOURCE_ID FK
        string TARGET_ID FK
    }
```

## User Management

```mermaid
---
config:
  look: neo
  theme: neo
---
erDiagram
    USER_INFO ||--o{ GROUP_INFO : "member of"
    USER_INFO ||--o{ PERMISSION_INFO : "has"

    USER_INFO {
        string USER_ID      PK
        string FIRST_NAME
        string LAST_NAME
        string FULL_NAME
        string LONG_NAME
        string E_MAIL
        string PHONE
        string MOBILE_PHONE
        string ORG_LEVEL_1
        string ORG_LEVEL_2
        string ORG_LEVEL_3
        string ORG_LEVEL_4
        clob   DATA
    }

    GROUP_INFO {
        string USER_ID   FK
        string GROUP_ID
    }

    PERMISSION_INFO {
        string USER_ID       FK
        string PERMISSION_ID
    }
```

## System & Scheduling

```mermaid
---
config:
  look: neo
  theme: neo
---
erDiagram
    SCHEDULED_JOB {
        int       JOB_ID       PK
        int       PRIORITY
        string    STATE
        string    TYPE
        int       RETRY_COUNT
        string    LOCKED_BY
        clob      ARGUMENTS
        timestamp CREATED
        timestamp DUE
        timestamp LOCK_EXPIRES
    }

    CONFIGURATION {
        string  NAME             PK
        boolean ENFORCE_SECURITY
        clob    CUSTOM_ATTRIBUTES
    }

    KADAI_SCHEMA_VERSION {
        int       ID      PK
        string    VERSION
        timestamp CREATED
    }
```

## Audit History

```mermaid
---
config:
  look: neo
  theme: neo
---
erDiagram
    TASK_HISTORY_EVENT {
        string    ID                             PK
        string    TASK_ID
        string    EVENT_TYPE
        string    USER_ID
        string    PROXY_ACCESS_ID
        string    DOMAIN
        string    WORKBASKET_KEY
        string    WORKBASKET_NAME
        string    POR_COMPANY
        string    POR_SYSTEM
        string    POR_INSTANCE
        string    POR_TYPE
        string    POR_VALUE
        int       TASK_PRIORITY
        string    TASK_OWNER
        string    TASK_CLASSIFICATION_KEY
        string    TASK_CLASSIFICATION_NAME
        string    TASK_CLASSIFICATION_CATEGORY
        string    ATTACHMENT_CLASSIFICATION_KEY
        string    ATTACHMENT_CLASSIFICATION_NAME
        string    BUSINESS_PROCESS_ID
        string    PARENT_BUSINESS_PROCESS_ID
        string    OLD_VALUE
        string    NEW_VALUE
        string    CUSTOM_1
        string    CUSTOM_2
        string    CUSTOM_3
        string    CUSTOM_4
        clob      DETAILS
        timestamp CREATED
        timestamp TASK_PLANNED
        timestamp TASK_DUE
    }

    WORKBASKET_HISTORY_EVENT {
        string    ID              PK
        string    WORKBASKET_ID
        string    EVENT_TYPE
        string    USER_ID
        string    PROXY_ACCESS_ID
        string    DOMAIN
        string    KEY
        string    TYPE
        string    OWNER
        string    ORG_LEVEL_1
        string    ORG_LEVEL_2
        string    ORG_LEVEL_3
        string    ORG_LEVEL_4
        string    CUSTOM_1
        string    CUSTOM_2
        string    CUSTOM_3
        string    CUSTOM_4
        clob      DETAILS
        timestamp CREATED
    }

    CLASSIFICATION_HISTORY_EVENT {
        string    ID                      PK
        string    CLASSIFICATION_ID
        string    EVENT_TYPE
        string    USER_ID
        string    PROXY_ACCESS_ID
        string    DOMAIN
        string    KEY
        string    CATEGORY
        string    TYPE
        string    NAME
        string    PARENT_ID
        string    PARENT_KEY
        int       PRIORITY
        string    SERVICE_LEVEL
        string    APPLICATION_ENTRY_POINT
        string    CUSTOM_1
        string    CUSTOM_2
        string    CUSTOM_3
        string    CUSTOM_4
        string    CUSTOM_5
        string    CUSTOM_6
        string    CUSTOM_7
        string    CUSTOM_8
        clob      DETAILS
        timestamp CREATED
    }
```

## Entity Descriptions

| Entity | Description |
|---|---|
| **TASK** | The central entity representing a unit of work. Holds all business data including state, priority, owner, timestamps, and up to 16 string and 8 integer custom fields. |
| **WORKBASKET** | A container that organizes Tasks. Can be a personal or group basket. Supports organizational hierarchy via `ORG_LEVEL_*` fields. |
| **CLASSIFICATION** | Hierarchical taxonomy for categorizing Tasks and Attachments. Defines the service level (SLA) and drives priority calculations. |
| **ATTACHMENT** | A secondary object reference attached to a Task, with its own Classification and object reference fields. |
| **OBJECT_REFERENCE** | An additional external-system reference on a Task (beyond the primary object reference embedded in TASK). |
| **TASK_COMMENT** | A user-created note appended to a Task. Deleted automatically when the parent Task is deleted. |
| **WORKBASKET_ACCESS_LIST** | Defines which users or groups can access a Workbasket and which operations they are permitted to perform. |
| **DISTRIBUTION_TARGETS** | Maps a source Workbasket to one or more target Workbaskets for Task distribution. |
| **USER_INFO** | Stores user profile data including contact details and organizational hierarchy levels. |
| **GROUP_INFO** | Maps a user to a group, enabling group-based Workbasket access. |
| **PERMISSION_INFO** | Maps a user to a named permission used for fine-grained access decisions. |
| **SCHEDULED_JOB** | Tracks background jobs (e.g. cleanup, priority recalculation) managed by the KADAI job framework. |
| **CONFIGURATION** | Single-row system configuration record, including the `ENFORCE_SECURITY` flag. |
| **KADAI_SCHEMA_VERSION** | Records the current schema version for migration management. |
| **TASK_HISTORY_EVENT** | Immutable audit log entry for every state change or modification on a Task. |
| **WORKBASKET_HISTORY_EVENT** | Immutable audit log entry for every change to a Workbasket. |
| **CLASSIFICATION_HISTORY_EVENT** | Immutable audit log entry for every change to a Classification. |
