---
sidebar_position: 1
---

# How to use Service Provider Interfaces (SPIs)
KADAI allows
customizing and modify its behavior through the use of dedicated Service Provider Interfaces
(SPI).
Each SPI defines an interface that can be implemented by custom code.
This is a common approach for Java developers to extend their applications.
You can find out more about the background and the details in the Java documentation:
https://docs.oracle.com/javase/tutorial/sound/SPI-intro.html

To use an SPI within KADAI, do the following:

1. Create a class that implements the relevant interface.
2. Place that class into the classpath of your application.
3. Provide a control file with the full name of the SPI (e.g., io.kadai.spi.task.api.CreateTaskPreprocessor) in the subdirectory META-INF/services of the classpath. This control file must contain the fully qualified classname (including the package) of the class that implements the relevant interface. This control file is used by the ServiceLoader to load the custom class at runtime. The control file may contain multiple classes that implement the interface. Each implementation should be declared in a new line. All implementations will be used consecutively in the declaration order of the control file. 

The steps above can look the following way for implementing the SPI "TaskRoutingProvider": 

1. Implement TaskRoutingProvider in a class with the name DmnTaskRouter.
2. Place this class within your application, for example, into the package myapp.
3. Create src/main/resources/META-INF/services/io.kadai.spi.routing.api.TaskRoutingProvider with the following content:
```
myapp.DmnTaskRouter
```

If you provide one or multiple implementations according to the description above,
KADAI will invoke the implementations at a specific point.
For example,
the implementation of the CreateTaskPreprocessor will be invoked
before a new Task is inserted into the database.
The Javadoc of each SPI describes these invocation conditions.

You can see the list of SPIs provided by KADAI [here](listOfProvidedSPIs.md).
