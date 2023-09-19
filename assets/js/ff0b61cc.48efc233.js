"use strict";(self.webpackChunkfirst_example=self.webpackChunkfirst_example||[]).push([[612],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>m});var a=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function n(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?n(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,a,o=function(e,t){if(null==e)return{};var r,a,o={},n=Object.keys(e);for(a=0;a<n.length;a++)r=n[a],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(a=0;a<n.length;a++)r=n[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var c=a.createContext({}),l=function(e){var t=a.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},u=function(e){var t=l(e.components);return a.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var r=e.components,o=e.mdxType,n=e.originalType,c=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),d=l(r),m=o,f=d["".concat(c,".").concat(m)]||d[m]||p[m]||n;return r?a.createElement(f,i(i({ref:t},u),{},{components:r})):a.createElement(f,i({ref:t},u))}));function m(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var n=r.length,i=new Array(n);i[0]=d;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:o,i[1]=s;for(var l=2;l<n;l++)i[l]=r[l];return a.createElement.apply(null,i)}return a.createElement.apply(null,r)}d.displayName="MDXCreateElement"},9064:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>p,frontMatter:()=>n,metadata:()=>s,toc:()=>l});var a=r(7462),o=(r(7294),r(3905));const n={sidebar_position:1},i="How to use Service Provider Interfaces (SPIs)",s={unversionedId:"user-guide/features/SPI-usage",id:"user-guide/features/SPI-usage",title:"How to use Service Provider Interfaces (SPIs)",description:"TASKANA allows to customize and modify it\u2019s behaviour through the use of dedicated Service Provider Interfaces (SPI). Each SPI defines an interface that can be implemented by custom code. This is a common approach for Java developers to extend their applications. You can find out more about the background and the details in the Java documentation//docs.oracle.com/javase/tutorial/sound/SPI-intro.html",source:"@site/docs/user-guide/features/SPI-usage.md",sourceDirName:"user-guide/features",slug:"/user-guide/features/SPI-usage",permalink:"/taskana-doc/docs/user-guide/features/SPI-usage",draft:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"userSidebar",previous:{title:"Features",permalink:"/taskana-doc/docs/category/features"},next:{title:"List of provided SPIs",permalink:"/taskana-doc/docs/user-guide/features/provided-SPI"}},c={},l=[],u={toc:l};function p(e){let{components:t,...r}=e;return(0,o.kt)("wrapper",(0,a.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"how-to-use-service-provider-interfaces-spis"},"How to use Service Provider Interfaces (SPIs)"),(0,o.kt)("p",null,"TASKANA allows to customize and modify it\u2019s behaviour through the use of dedicated Service Provider Interfaces (SPI). Each SPI defines an interface that can be implemented by custom code. This is a common approach for Java developers to extend their applications. You can find out more about the background and the details in the Java documentation: ",(0,o.kt)("a",{parentName:"p",href:"https://docs.oracle.com/javase/tutorial/sound/SPI-intro.html"},"https://docs.oracle.com/javase/tutorial/sound/SPI-intro.html")),(0,o.kt)("p",null,"In order to use an SPI within TASKANA, do the following:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Create a class that implements the relevant interface."),(0,o.kt)("li",{parentName:"ol"},"Place that class into the classpath of your application."),(0,o.kt)("li",{parentName:"ol"},"Provide a control file with full name of the SPI (e. g. pro.taskana.spi.task.api.CreateTaskPreprocessor) in the subdirectory META-INF/services of the classpath. This control file must contain the fully qualified classname (including the package) of the class that implements the relevant interface. This control file is used by the ServiceLoader to load the custom class at runtime. The control file may contain multiple classes that implement the interface. Each implementation should be declared in a new line. All implementations will be used consecutively in the declaration order of the control file. ")),(0,o.kt)("p",null,'The steps above can look the following way for implementing the SPI "TaskRoutingProvider": '),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Implement TaskRoutingProvider in a class with the name DmnTaskRouter."),(0,o.kt)("li",{parentName:"ol"},"Place this class within your application, for example into the package myapp."),(0,o.kt)("li",{parentName:"ol"},"Create src/main/resources/META-INF/services/pro.taskana.spi.routing.api.TaskRoutingProvider with following content:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"myapp.DmnTaskRouter\n")),(0,o.kt)("p",null,"If you provide one or multiple implementations according to the description above, TASKANA will invoke the implementations at a specific point. For example, the implementation of the CreateTaskPreprocessor will be invoked before a new Task is inserted into the database. The Javadoc of each SPI describes these invokation conditions."),(0,o.kt)("p",null,"You can see the list of SPIs provided by TASKANA ",(0,o.kt)("a",{parentName:"p",href:"/taskana-doc/docs/user-guide/features/provided-SPI"},"here"),"."))}p.isMDXComponent=!0}}]);