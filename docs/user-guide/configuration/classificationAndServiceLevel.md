---
sidebar_position: 4
---

# Classification and ServiceLevel

The configuration of these parameters is in the file ```kadai.properties```. Some parameters allow multiple values specified as a list. In this case, individual values are separated by a configurable separator. Use the *propertiesSeparator* parameter to specify it. If none is provided, the default is "|". If you specify a propertiesSeparator, no list item in the properties file can contain any character from the propertiesSeparator.


| Parameter                                                                                       | Description                                                                                             | Sample Value                               |
|-------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------|--------------------------------------------|
| kadai.domains                                                                                   | A list of domains for Classifications and Workbaskets                                                   | DOMAIN_C \| DOMAIN_TEST                    |
| kadai.classification.types                                                                      | A list of Classification types (case insensitive)                                                       | TASK \| document                           |
| kadai.classification.categories.\<type\> (for example kadai.classification.categories.document) | A list of classification categories for each type                                                       | EXTERNAL \| manual \| autoMAtic \| Process |
| kadai.servicelevel.validation.enforce                                                           | allows user to create Tasks with date-attributes independent of the serviceLevel of the Classifications | true                                       |
