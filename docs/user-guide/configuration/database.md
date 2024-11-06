---
sidebar_position: 1
---

# Database

To use KADAI, you need to create a database yourself, and then specify it through the [DataSource](#datasource). You can see the list of the supported databases [here](../getting-started/supportedEnvironments.md). 
The recommended page size for the database is 32 k. It's necessary to create the database schema. The sort order of query results can be changed by the collating sequence specified in database creation. The default for most databases is a case-sensitive sort order.  If you want query results to be sorted case insensitively, you should specify an appropriate collating sequence.

- Page size: 32k
- Encoding: UTF-8
- Collating sequence examples: 
        - db2 (case sensitive): IDENTITY
        - postgres (case sensitive): de_DE.UTF-8

Example db2:
```
CREATE DATABASE <databaseName> USING CODESET UTF-8 COLLATE USING IDENTITY PAGESIZE 32 K 

```

Example Postgres:
```
CREATE DATABASE <databaseName> WITH ENCODING 'UTF8' LC_COLLATE='de_DE.UTF-8';
```

### DataSource

KADAI connects to the database via a DataSource. It does not support XADataSources for connections to databases. The DataSource can be specified during the creation of KadaiConfiguration. For example, as following:
```
new KadaiConfiguration.Builder(dataSource, true, schemaName, false)
        .initKadaiProperties(propertiesFileName, delimiter)
        .build();
``` 
In Spring environment, the DataSource has standard spring options that can be configured in the ```application.properties``` file. You can read more about them in the Spring documentation. Here is an example: 
```
spring.datasource.url=jdbc:h2:mem:kadai;NON_KEYWORDS=KEY,VALUE;IGNORECASE=TRUE;LOCK_MODE=0;
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=sa
```
###  SchemaName and Prefilling the Database

Additionally to the DataSource, you can also configure the schemaName.
It can be specified during the creation of KadaiConfiguration, as seen in the example above.
The default schemaName is `KADAI.
The schemaName can also be changed by setting the parameter "kadai.schemaName"
in the ```application.properties``` file:

```
kadai.schemaName=KADAI
```
Additionally to that, you can configure KADAI so that it prefills the database with sample data.
You can find sample data in the folder ```common/kadai-common-data/src/main/resources/sql/sample-data```.
To do that, set the "generateSampleData" property in the ```application.properties``` file to true:
```
generateSampleData=true
```

## Connection options

KADAI supports three connection management modes: PARTICIPATE, AUTOCOMMIT and EXPLICIT. You can specify the connection management mode when creating KadaiEngine using 

```
KadaiEngine buildKadaiEngine (KadaiConfiguration configuration, ConnectionManagementMode connectionManagementMode)
```

The default mode is PARTICIPATE.

| mode        | description                                                                                                                                                                                                                                                                                    |
|-------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| PARTICIPATE | KADAI  participates in surrounding global transactions. It acquires and  releases connections at begin / end of each API call and relies on the infrastructure to do the commit.                                                                                                               |
| AUTOCOMMIT  | KADAI commits each single API call separately.                                                                                                                                                                                                                                                 |
| EXPLICIT    | KADAI  doesn't acquire, commit or close connections. The client is responsible  for opening a connection, passing it to KADAI, committing or  rolling it back. In order to close a connection, the client has to call either KadaiEngine.closeConnection() or KadaiEngine.setConnection(null). |
