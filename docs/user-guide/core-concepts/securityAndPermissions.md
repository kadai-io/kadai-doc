---
sidebar_position: 5
---

# Security and Permissions

## Security Overview

KADAI Java library uses JAAS subjects for its authentication. Its security features can be used
based on the REST service. The authentication cannot be run without the REST service. Client side
authorization is required to view Tasks and Workbaskets or to make any changes. If the client side
authorization does not work, the unauthorized user will not be able to use KADAI properly.

We provide an example (kadai-rest-spring-example) which is using LDAP. You can build a simple
step-by-step example with our [Getting Started](../getting-started/exampleSpringBoot.md) as well.

KADAI Java library needs its client to provide a mapping to the JAAS Subject used for users and
groups. The client should create a JAAS context for the Java library. The ids of users and groups,
e.g. `user-1-1` or `admin`, are then used for the internal logic in the Java library. Our REST
Service already provides LDAP support. 

## Security Roles in KADAI

Users can have one of the six different roles:

- **USER**
  The USER role grants access to KADAI. USER is everybody who gets assigned to and completes
  tasks.
- **TASK_ADMIN**
  The TASK_ADMIN role includes all permissions on tasks except deleting a task/tasks.
  It can also READ all workbaskets in case to create/transfer tasks in/to them.
- **BUSINESS_ADMINISTRATOR**
  The BUSINESS_ADMINISTRATOR role allows changing the business configuration (workbaskets,
  classifications, ...)
- **ADMINISTRATOR**
  The ADMINISTRATOR role includes all permissions on the system.
- **MONITOR**
  The MONITOR role grants access to all monitoring operations and to the monitoring UI.
- **TASK_ROUTER**
  The TASK_ROUTER role implies access to creating Tasks in all Workbaskets without having READ
  permissions for them. This role is used for automated scripts, not for persons.

You can assign roles to users or groups in the ```kadai.properties``` file. Read more about LDAP
configuration [here](../configuration/ldap.md)

## Access to Workbaskets

KADAI Java library uses WorkbasketAccessItems for authorization. WorkbasketAccessItems are stored
in the WorkbasketAccessList database table. Each WorkbasketAccessItems contains values for each of
the following permissions: *READ, OPEN, APPEND, TRANSFER, DISTRIBUTE and CUSTOM_1 through
CUSTOM_12*. A WorkbasketAccessItem belongs to a specific Workbasket-User or Workbasket-Group pair.
The user or group are specified by their accessId (for example, "user-1-1"). The different
permissions have the following meaning:

| Permission            | Meaning                                                                                                                                                                                                                                                           |
|-----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| READ                  | Read or query Workbasket metadata.   If a user does **not** have the READ permission, he does not even know about the existence of the Workbasket.                                                                                                                |
| READTASKS             | Allows user to read or query metadata of Tasks without **explicitly** specifying Workbasket in the query. For this, the READ permission is also required. If a user does not have the READTASKS permission, he cannot specify this Workbasket when getting Tasks. |
| OPEN                  | The user is allowed to **explicitly** query the Tasks of specific Workbaskets. To do this, READ and READTASKS permissions are also required. If a user does not have the OPEN permission, he cannot query/filter Tasks by Workbaskets.                            |
| EDITTASKS             | Allows the user to update, claim or complete tasks. For editing, READ and READTASKS permissions are also required.                                                                                                                                                |
| APPEND                | The user is allowed to append a Task to the Workbasket. This applies to creation of Tasks in this Workbasket as well as for transferring Tasks to this Workbasket.                                                                                                |
| TRANSFER              | Allows the user to transfer Tasks from this Workbasket to another one.                                                                                                                                                                                            |
| DISTRIBUTE            | The  user is allowed to distribute Tasks from this Workbasket to the  configured distribution targets. For distribution the APPEND and  TRANSFER permissions are checked also.                                                                                    |
| CUSTOM_1 .. CUSTOM_12 | Permissions to be used in custom code to configure application specific scenarios which are not directly checked by KADAI.                                                                                                                                        |

### Example WorkbasketAccessList table

Example WorkbasketAccessItems:

| ID   | WB_ID | ,ACCESS_ID | ACCESS_NAME | READ, | READTSKS | OPN,  | EDITTSKS | APPD, | TRSFR, | DISTR, | C1,           | .., | C12) |
|------|-------|------------|-------------|-------|----------|-------|----------|-------|--------|--------|---------------|-----|------|
| WA01 | WB01  | teamlead_1 | Dominik     | true  | false    | false | false    | true  | true   | true   | true,...false |     |
| WA02 | WB01  | teamlead_2 | Holger      | true  | true     | true  | true     | false | false  | true   | true,...true; |     |
| WA03 | WB01  | group_1    | Schaden     | true  | true     | true  | false    | false | true   | false  | true,...true; |     |

## Disable security using the *securityEnabled* parameter

The securityEnabled-flag can disable authentication for the complete KADAI functionality if set
to false. The default value of the flag is true. You can change the value by specifying the
*securityEnabled* parameter of the constructor of KadaiEngineConfiguration.

```
KadaiEngineConfiguration(DataSource dataSource, boolean useManagedTransactions,
        boolean securityEnabled, String propertiesFileName, String propertiesSeparator)
```

In the spring boot example, you can add the following bean to disable security:

```
    @Bean
    public KadaiEngineConfiguration kadaiEngineConfiguration(DataSource dataSource) {
        return new SpringKadaiEngineConfiguration(dataSource, true, false, "KADAI");
    }
```

The CONFIGURATION table has an ENFORCE_SECURITY field.
If this field is already set, then
*securityEnabled* should be set to the same value.
If the ENFORCE_SECURITY flag in the database has
no value, then the first KadaiEngine connecting to the database sets its *securityEnabled* as the
value of ENFORCE_SECURITY.

