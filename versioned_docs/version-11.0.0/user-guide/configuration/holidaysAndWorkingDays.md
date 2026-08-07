---
sidebar_position: 6
---

# Holidays and Working Days
The configuration of these parameters is in the file ```kadai.properties```. 

Some parameters allow multiple values specified as a list. In this case, individual values are separated by a configurable separator. Use the *propertiesSeparator* parameter to specify it. If none is provided, the default is "|". If you specify a propertiesSeparator, no list item in the properties file can contain any character from the propertiesSeparator.

## Holidays

Holidays can be customized. This is relevant because time on a holiday doesn't count towards working time. 

- ``kadai.german.holidays.enabled``: Standard German holidays will be enabled.
- ``kadai.german.holidays.corpus-christi.enabled``: The holiday corpus christi will be activated.  
- ``kadai.custom.holidays``: Holiday dates specified as a list will be added. Each holiday should be in the dd.MM format.
        Example custom holidays: ```kadai.custom.holidays=31.07|16.12```
        

## Working time

- ``kadai.workingTime.schedule.MONDAY`` : Working time on Monday, e.g., 09:00–18:00
- ``kadai.workingTime.schedule.TUESDAY`` : Working time on Tuesday, e.g., 09:00–18:00
- ``kadai.workingTime.schedule.WEDNESDAY`` : Working time on Wednesday, e.g., 09:00–18:00
- ``kadai.workingTime.schedule.THURSDAY`` : Working time on Thursday, e.g., 09:00–18:00
- ``kadai.workingTime.schedule.FRIDAY`` : Working time on Friday, e.g., 09:00–18:00
- ``kadai.workingTime.timezone`` : Time zone, e. g. UTC
