---
sidebar_position: 4
---

# Modules

Different functionality of KADAI can be found in different modules. In the following article, the relevant modules for external usage are explained. The modules for internal use only are left out of the article. 

## lib

- **kadai-core** provides the main functionality of KADAI. You can read more about kadai-core [here](../core-concepts/javaApiUsage)
- **kadai-spring** configures Spring so that KADAI can be easily integrated
- **kadai-spring-example** provides an example usage of kadai-spring
- **kadai-cdi** uses dependency injection of java(CDI) for configuring KADAI
- **kadai-cdi-example** provides an example usage of kadai-cdi

## rest

- **kadai-rest-spring** embends KADAI in a spring-boot application. It exposes the Java API by setting up a corresponding REST-API
- **kadai-rest-spring-example-boot** provides an example application that uses kadai-rest-spring
- **kadai-rest-spring-example-wildfly** provides an example application that can be deployed on a Wildfly server

## history

- **kadai-loghistory-provider** implements the history SPI (Service Provider Interface). It uses slf4j to log every event
- **kadai-simplehistory-provider**  implements the history SPI (Service Provider Interface). It stores every history event in the KADAI database
- **kadai-simplehistory-rest-spring** implements a REST service to expose the functionality of kadai-simplehistory-provider 

## routing

- **kadai-spi-routing-dmn-router** allows Task routing according to automated rules
- **kadai-routing-rest** implements a REST service to expose the functionality of kadai-spi-routing-dmn-router

## web

- frontend of KADAI
