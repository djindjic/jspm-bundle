"format register";!function(){function t(){}t.amd={},System.register("github:aurelia/dependency-injection@0.1.1/amd/annotations",[],!1,function(t,n){return function(t){"use strict";var n=Array.prototype.slice,e=function(t,n){t.prototype=Object.create(n.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),t.__proto__=n},i=function(){var t=n.call(arguments);this.keys=t};t.Inject=i;var r=function(){var t=function(){};return t.prototype.register=function(){throw new Error("A custom Registration must implement register(container, key, fn).")},t}();t.Registration=r;var o=function(t){var n=function(t){this.key=t};return e(n,t),n.prototype.register=function(t,n,e){t.registerTransient(this.key||n,e)},n}(r);t.Transient=o;var a=function(t){var n=function(t){this.key=t};return e(n,t),n.prototype.register=function(t,n,e){t.registerSingleton(this.key||n,e)},n}(r);t.Singleton=a;var u=function(){var t=function(){};return t.prototype.get=function(){throw new Error("A custom Resolver must implement get(container) and return the resolved instance(s).")},t}();t.Resolver=u;var s=function(t){var n=function(t){this.key=t};return e(n,t),n.prototype.get=function(t){var n=this;return function(){return t.get(n.key)}},n.of=function(t){return new n(t)},n}(u);t.Lazy=s;var c=function(t){var n=function(t){this.key=t};return e(n,t),n.prototype.get=function(t){return t.getAll(this.key)},n.of=function(t){return new n(t)},n}(u);t.All=c}.call(n,n)})}(),function(){function t(){}t.amd={},System.register("github:aurelia/metadata@0.1.1/amd/origin",[],!1,function(t,n){return function(t){"use strict";function n(t){return t instanceof e?t:new e(t)}var e=function(){var t=function(t,n){this.moduleId=t,this.moduleMember=n};return t.get=function(t){var e=t.__origin__;return void 0!==e?e:"function"==typeof t.origin?t.__origin__=n(t.origin()):void 0!==t.origin?t.__origin__=n(t.origin):null},t.set=function(n,e){null===t.get(n)&&(n.__origin__=e)},t}();t.Origin=e}.call(n,n)})}(),function(){function t(){}t.amd={},System.register("github:aurelia/metadata@0.1.1/amd/resource-type",[],!1,function(t,n){return function(t){"use strict";var n=function(){var t=function(){};return t.prototype.load=function(){return this},t.prototype.register=function(){throw new Error('All descendents of "ResourceType" must implement the "register" method.')},t}();t.ResourceType=n}.call(n,n)})}(),function(){function t(){}t.amd={},System.register("github:aurelia/metadata@0.1.1/amd/annotations",[],!1,function(t,n){return function(t){"use strict";function n(t,n){var e,i,r,o;if("function"==typeof t.annotations&&(t.annotations=t.annotations()),e=t.annotations,void 0===e)return null;for(i=0,r=e.length;r>i;++i)if(o=e[i],o instanceof n)return o;return null}function e(t,n){var e,i,o,a,u;if("function"==typeof t.annotations&&(t.annotations=t.annotations()),e=t.annotations,void 0===e)return r;for(u=[],i=0,o=e.length;o>i;++i)a=e[i],a instanceof n&&u.push(a);return u}function i(t,n){var e;"function"==typeof t.annotations&&(t.annotations=t.annotations()),e=t.annotations||(t.annotations=[]),e.push(n)}t.getAnnotation=n,t.getAllAnnotations=e,t.addAnnotation=i;var r=[]}.call(n,n)})}(),function(){function t(){}t.amd={},System.register("github:aurelia/dependency-injection@0.1.1/amd/util",[],!1,function(t,n){return function(t){"use strict";function n(t){return t.toUpperCase()===t}function e(t){return t.name?n(t.name.charAt(0)):Object.keys(t.prototype).length>0}t.isClass=e,function(){}.name||Object.defineProperty(Function.prototype,"name",{get:function(){var t=this.toString().match(/^\s*function\s*(\S*)\s*\(/)[1];return Object.defineProperty(this,"name",{value:t}),t}})}.call(n,n)})}(),function(){function t(){}t.amd={},System.register("github:aurelia/metadata@0.1.1/amd/index",["./origin","./resource-type","./annotations"],!1,function(t,n){return function(t,n,e,i){"use strict";t.Origin=n.Origin,t.ResourceType=e.ResourceType,t.getAnnotation=i.getAnnotation,t.getAllAnnotations=i.getAllAnnotations,t.addAnnotation=i.addAnnotation,t.normalize=i.normalize}.call(n,n,t("./origin"),t("./resource-type"),t("./annotations"))})}(),function(){function t(){}t.amd={},System.register("github:aurelia/metadata@0.1.1",["github:aurelia/metadata@0.1.1/amd/index"],!1,function(t){return function(t){return t}.call(this,t("github:aurelia/metadata@0.1.1/amd/index"))})}(),function(){function t(){}t.amd={},System.register("github:aurelia/dependency-injection@0.1.1/amd/container",["aurelia-metadata","./annotations","./util"],!1,function(t,n){return function(t,n,e,i){"use strict";var r=n.getAnnotation,o=e.Inject,a=e.Resolver,u=e.Registration,s=i.isClass,c=function(){var t=function(t){this.constructionInfo=t||new Map,this.entries=new Map};return t.prototype.registerInstance=function(t,n){this.registerHandler(t,function(){return n})},t.prototype.registerTransient=function(t,n){this.registerHandler(t,function(t){return t.invoke(n)})},t.prototype.registerSingleton=function(t,n){var e=null;this.registerHandler(t,function(t){return e||(e=t.invoke(n))})},t.prototype.autoRegister=function(t,n){var e=r(t,u);e?e.register(this,n||t,t):this.registerSingleton(n||t,t)},t.prototype.autoRegisterAll=function(t){var n=this;t.forEach(function(t){return n.autoRegister(t)})},t.prototype.registerHandler=function(t,n){this.getOrCreateEntry(t).push(n)},t.prototype.get=function(n){var e;return n instanceof a?n.get(this):n===t?this:(e=this.entries.get(n),void 0!==e?e[0](this):this.parent?this.parent.get(n):(this.autoRegister(n),e=this.entries.get(n),e[0](this)))},t.prototype.getAll=function(t){var n=this,e=this.entries.get(t);return void 0!==e?e.map(function(t){return t(n)}):this.parent?this.parent.getAll(t):[]},t.prototype.hasHandler=function(t){return this.entries.has(t)},t.prototype.createChild=function(){var n=new t(this.constructionInfo);return n.parent=this,n},t.prototype.createTypedChild=function(t){var n=new t(this.constructionInfo);return n.parent=this,n},t.prototype.getOrCreateEntry=function(t){var n=this.entries.get(t);return void 0===n&&(n=[],this.entries.set(t,n)),n},t.prototype.invoke=function(t){var n,e,i,r=this.getOrCreateConstructionInfo(t),o=r.keys,a=new Array(o.length);for(e=0,i=o.length;i>e;++e)a[e]=this.get(o[e]);return r.isClass?(n=Object.create(t.prototype),t.apply(n,a)||n):t.apply(void 0,a)},t.prototype.getOrCreateConstructionInfo=function(t){var n=this.constructionInfo.get(t);return void 0===n&&(n=this.createConstructionInfo(t),this.constructionInfo.set(t,n)),n},t.prototype.createConstructionInfo=function(t){var n,e,i,a,u={isClass:s(t)},c=[],f=t.parameters;return void 0!==t.inject?(u.keys="function"==typeof t.inject?t.inject():t.inject,u):(n=r(t,o),n&&(c=c.concat(n.keys)),f&&f.forEach(function(t,n){for(e=0,i=t.length;i>e;e++)a=t[e],a instanceof o?c[n]=a.keys[0]:c[n]||(c[n]=a)}),u.keys=c,u)},t}();t.Container=c}.call(n,n,t("aurelia-metadata"),t("./annotations"),t("./util"))})}(),function(){function t(){}t.amd={},System.register("github:aurelia/dependency-injection@0.1.1/amd/index",["./annotations","./container"],!1,function(t,n){return function(t,n,e){"use strict";t.Inject=n.Inject,t.Registration=n.Registration,t.Transient=n.Transient,t.Singleton=n.Singleton,t.Resolver=n.Resolver,t.Lazy=n.Lazy,t.All=n.All,t.Container=e.Container}.call(n,n,t("./annotations"),t("./container"))})}(),function(){function t(){}t.amd={},System.register("github:aurelia/dependency-injection@0.1.1",["github:aurelia/dependency-injection@0.1.1/amd/index"],!1,function(t){return function(t){return t}.call(this,t("github:aurelia/dependency-injection@0.1.1/amd/index"))})}(),System.register("app/app",["aurelia-dependency-injection"],function(t){"use strict";var n,e;return{setters:[function(t){n=t["default"]}],execute:function(){e=t("Person",function(){var t=function(){};return $traceurRuntime.createClass(t,{},{annotations:function(){return[new n.Transient]}})}()),console.log(e)}}});
//# sourceMappingURL=bundle-3.js.map