"use strict";(self.webpackChunkfirst_example=self.webpackChunkfirst_example||[]).push([[8918],{8146:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>c,contentTitle:()=>s,default:()=>u,frontMatter:()=>i,metadata:()=>n,toc:()=>l});const n=JSON.parse('{"id":"user-guide/core-concepts/restApi","title":"REST-API","description":"KADAI provides a REST API to interact with the KADAI entities.","source":"@site/docs/user-guide/core-concepts/restApi.md","sourceDirName":"user-guide/core-concepts","slug":"/user-guide/core-concepts/restApi","permalink":"/kadai-doc/docs/user-guide/core-concepts/restApi","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":4,"frontMatter":{"sidebar_position":4},"sidebar":"userSidebar","previous":{"title":"Java-API usage","permalink":"/kadai-doc/docs/user-guide/core-concepts/javaApiUsage"},"next":{"title":"Security and Permissions","permalink":"/kadai-doc/docs/user-guide/core-concepts/securityAndPermissions"}}');var r=o(4848),a=o(8453);o(9734);const i={sidebar_position:4},s="REST-API",c={},l=[];function d(e){const t={a:"a",code:"code",em:"em",h1:"h1",header:"header",p:"p",pre:"pre",...(0,a.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.header,{children:(0,r.jsx)(t.h1,{id:"rest-api",children:"REST-API"})}),"\n","\n",(0,r.jsx)(t.p,{children:"KADAI provides a REST API to interact with the KADAI entities.\nFor example, you can get metadata of Workbaskets, create new Tasks, update Tasks, etc.\nThe path for all requests to KADAI starts with the following:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{children:"http://localhost:8080/kadai/api/v1/\n"})}),"\n",(0,r.jsxs)(t.p,{children:["You can make your request by specifying the correct path with the corresponding HTTP method. The entity that the request is working on can be specified as part of the path. For example, the following request returns the Task with the id ",(0,r.jsx)(t.em,{children:"TKI:100000000000000000000000000000000000"}),":"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{children:"GET http://localhost:8080/kadai/api/v1/tasks/TKI:100000000000000000000000000000000000\n"})}),"\n",(0,r.jsx)(t.p,{children:"We can also add parameters for filtering or sorting to the request.\nThe following example filters all Tasks that are READY\nand returns them sorted by the key of their Classification:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{children:"GET http://localhost:8080/kadai/api/v1/tasks?state=READY&sort-by=CLASSIFICATION_KEY\n"})}),"\n",(0,r.jsxs)(t.p,{children:["The full documentation of the REST-API can be found ",(0,r.jsx)(t.a,{href:"https://kadai-io.azurewebsites.net/kadai/swagger-ui/index.html",children:"here"}),"."]})]})}function u(e={}){const{wrapper:t}={...(0,a.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},8478:(e,t,o)=>{o.r(t),o.d(t,{default:()=>a});o(6540);var n=o(2303),r=o(4848);function a(e){let{children:t,fallback:o}=e;return(0,n.A)()?(0,r.jsx)(r.Fragment,{children:t?.()}):o??null}},9734:(e,t,o)=>{var n=o(8478),r=o(6540);function a(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var i=a(n),s=a(r),c=function(){return c=Object.assign||function(e){for(var t,o=1,n=arguments.length;o<n;o++)for(var r in t=arguments[o])Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e},c.apply(this,arguments)};!function(e,t){void 0===t&&(t={});var o=t.insertAt;if(e&&"undefined"!=typeof document){var n=document.head||document.getElementsByTagName("head")[0],r=document.createElement("style");r.type="text/css","top"===o&&n.firstChild?n.insertBefore(r,n.firstChild):n.appendChild(r),r.styleSheet?r.styleSheet.cssText=e:r.appendChild(document.createTextNode(e))}}(".docusaurus-plugin-drawio {\n  width: 100%;\n  padding: 10px;\n  border: 1px solid #ccc;\n  text-align: center;\n  overflow-x: auto;\n}\n\nhtml[data-theme='dark'] .docusaurus-plugin-drawio {\n  background-color: #333;\n  color: #fff;\n}\n\n.docusaurus-plugin-drawio > div {\n  margin-left: auto;\n  margin-right: auto;\n  border: 1px solid transparent;\n  min-width: 180px;\n}\n");var l=function(e){var t=e.content,o=e.maxHeight,n=e.autoFit,a=e.autoCrop,i=e.autoOrigin,l=e.allowZoomOut,d=e.allowZoomIn,u=e.checkVisibleState,p=e.toolbarPosition,h=e.toolbarNohide,f=e.toolbarButtons,m=function(e,t){var o={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(o[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(n=Object.getOwnPropertySymbols(e);r<n.length;r++)t.indexOf(n[r])<0&&Object.prototype.propertyIsEnumerable.call(e,n[r])&&(o[n[r]]=e[n[r]])}return o}(e,["content","maxHeight","autoFit","autoCrop","autoOrigin","allowZoomOut","allowZoomIn","checkVisibleState","toolbarPosition","toolbarNohide","toolbarButtons"]),g=r.useState("loading..."),b=g[0],x=g[1],w=r.useRef(null),k=window.GraphViewer;return r.useEffect((function(){if(k)if(t){var e=c({editable:"_blank",highlight:"#0000ff",nav:!0,resize:!0,toolbar:"zoom lightbox",xml:t,"max-height":o,"auto-fit":n,"auto-crop":a,"auto-origin":i,"allow-zoom-out":l,"allow-zoom-in":d,"check-visible-state":u,"toolbar-position":p,"toolbar-nohide":h,"toolbar-buttons":f},m),r=JSON.stringify(e);w.current.dataset.mxgraph=r,x(""),setTimeout((function(){k.createViewerForElement(w.current)}),0)}else x("drawio file is empty");else x("GraphViewer is not loaded")}),[]),s.default.createElement("div",{className:"docusaurus-plugin-drawio"},s.default.createElement("div",{className:"docusaurus-plugin-drawio__content",ref:w},b))},d=r.memo((function(e){return s.default.createElement(i.default,{fallback:s.default.createElement(s.default.Fragment,null,"loading...")},(function(){return s.default.createElement(l,c({},e))}))}));e.exports=d},8453:(e,t,o)=>{o.d(t,{R:()=>i,x:()=>s});var n=o(6540);const r={},a=n.createContext(r);function i(e){const t=n.useContext(a);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function s(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),n.createElement(a.Provider,{value:t},e.children)}}}]);