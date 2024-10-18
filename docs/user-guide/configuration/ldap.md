---
sidebar_position: 3
---

# LDAP
KADAI provides [LDAP](https://ldap.com/learn-about-ldap/) support by showing LDAP-usage in its example module ```kadai-rest-spring-example-boot```.
If you do not create an LdapContextSource bean, KADAI will create one for you using the parameters specified on this documentation page.
If you want to create your LdapContextSource bean to be used in KADAI, please use as qualifier the constant ```io.kadai.common.rest.ldap.KADAI_LDAP_CONTEXT_SOURCE```.
In order to configure LDAP for usage with KADAI, you need an .ldif file. Additionaly, you need to configure LDAP in the ``application.properties`` file using following parameters: 

|Parameter                        |Description                                              |Sample Value          |
|---------------------------------|---------------------------------------------------------|----------------------|              
|kadai.ldap.serverUrl                   |The url of the ldap server used by KADAI.                                                     | ldap://localhost:10389
|kadai.ldap.bindDn                      |The bind dn when connecting.|uid=admin
|kadai.ldap.bindPassword                |The password for connecting with the bind dn.|secret
|kadai.ldap.baseDn                      |The base dn of the ldap server.|ou=Test,O=KADAI
|kadai.ldap.userSearchBase              |The base dn of each use.|cn=users
|kadai.ldap.userSearchFilterName        |Name of the attribute for filtering users.|objectclass
|kadai.ldap.userSearchFilterValue       |Value of the attribute for filtering users.|person
|kadai.ldap.userFirstnameAttribute      |Name of the attribute that is used to specify the first name of the user in the ldif file. |givenName
|kadai.ldap.userLastnameAttribute       |Name of the attribute that is used to specify the last name of the user in the ldif file.|sn
|kadai.ldap.userFullnameAttribute       |Name of the attribute that is used to specify the full name of the user in the ldif file.|cn
|kadai.ldap.userPhoneAttribute          |Name of the attribute that is used to specify the phone of the user in the ldif file.|phoneNumber
|kadai.ldap.userMobilePhoneAttribute    |Name of the attribute that is used to specify the mobile phone of the user in the ldif file.|mobileNumber
|kadai.ldap.userEmailAttribute          |Name of the attribute that is used to specify the email of the user in the ldif file.|email
|kadai.ldap.userOrglevel1Attribute      |Name of the attribute that is used to specify the first organization level of the user in the ldif file.|orgLevel1
|kadai.ldap.userOrglevel2Attribute      |Name of the attribute that is used to specify the second organization level of the user in the ldif file.|orgLevel2
|kadai.ldap.userOrglevel3Attribute      |Name of the attribute that is used to specify the third organization level of the user in the ldif file.|orgLevel3
|kadai.ldap.userOrglevel4Attribute      |Name of the attribute that is used to specify the fourth organization level of the user in the ldif file.|orgLevel4
|kadai.ldap.userIdAttribute             |Name of the attribute that is used to specify the id of the user in the ldif file.|uid
|kadai.ldap.userMemberOfGroupAttribute  |Name of the attribute that is used to specify groups of the user in the ldif file.|memberOf
|kadai.ldap.groupSearchBase             |The base dn of each group
|kadai.ldap.groupSearchFilterName       |Name of the attribute for filtering groups.|objectclass
|kadai.ldap.groupSearchFilterValue      |Value of the attribute for filtering goups.|groupOfUniqueNames|
|kadai.ldap.groupNameAttribute          |Name of the attribute that is used to specify the name of the group in the ldif file.|cn
|kadai.ldap.minSearchForLength<br /> (optional)         ||3|
|kadai.ldap.maxNumberOfReturnedAccessIds<br />(optional)||50|
|kadai.ldap.groupsOfUser<br /> (optional)                 |deprecated. Please use kadai.ldap.groupsOfUser.name instead.   |uniquemember|
|kadai.ldap.groupsOfUser.name<br />  (optional)            |Name of the attribute in a group object, which specifies the member of the group.                   |uniquemember|
|kadai.ldap.groupsOfUser.type<br />(optional)           |Type of the attribute in a group object, which specifies the member of the group.If you specify ‘dn’ as the type, KADAI assumes that this field contains exactly the full dn of the member.|dn|
