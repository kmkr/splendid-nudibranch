!function(t){function e(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var n={};e.m=t,e.c=n,e.d=function(t,n,o){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:o})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=48)}([function(t,e,n){"use strict";function o(){}function r(t,e){var n,r,i,u,c=L;for(u=arguments.length;u-- >2;)B.push(arguments[u]);for(e&&null!=e.children&&(B.length||B.push(e.children),delete e.children);B.length;)if((r=B.pop())&&void 0!==r.pop)for(u=r.length;u--;)B.push(r[u]);else"boolean"==typeof r&&(r=null),(i="function"!=typeof t)&&(null==r?r="":"number"==typeof r?r=String(r):"string"!=typeof r&&(i=!1)),i&&n?c[c.length-1]+=r:c===L?c=[r]:c.push(r),n=i;var a=new o;return a.nodeName=t,a.children=c,a.attributes=null==e?void 0:e,a.key=null==e?void 0:e.key,void 0!==M.vnode&&M.vnode(a),a}function i(t,e){for(var n in e)t[n]=e[n];return t}function u(t,e){return r(t.nodeName,i(i({},t.attributes),e),arguments.length>2?[].slice.call(arguments,2):t.children)}function c(t){!t._dirty&&(t._dirty=!0)&&1==I.push(t)&&(M.debounceRendering||F)(a)}function a(){var t,e=I;for(I=[];t=e.pop();)t._dirty&&P(t)}function l(t,e,n){return"string"==typeof e||"number"==typeof e?void 0!==t.splitText:"string"==typeof e.nodeName?!t._componentConstructor&&s(t,e.nodeName):n||t._componentConstructor===e.nodeName}function s(t,e){return t.normalizedNodeName===e||t.nodeName.toLowerCase()===e.toLowerCase()}function f(t){var e=i({},t.attributes);e.children=t.children;var n=t.nodeName.defaultProps;if(void 0!==n)for(var o in n)void 0===e[o]&&(e[o]=n[o]);return e}function p(t,e){var n=e?document.createElementNS("http://www.w3.org/2000/svg",t):document.createElement(t);return n.normalizedNodeName=t,n}function d(t){var e=t.parentNode;e&&e.removeChild(t)}function h(t,e,n,o,r){if("className"===e&&(e="class"),"key"===e);else if("ref"===e)n&&n(null),o&&o(t);else if("class"!==e||r)if("style"===e){if(o&&"string"!=typeof o&&"string"!=typeof n||(t.style.cssText=o||""),o&&"object"==typeof o){if("string"!=typeof n)for(var i in n)i in o||(t.style[i]="");for(var i in o)t.style[i]="number"==typeof o[i]&&!1===U.test(i)?o[i]+"px":o[i]}}else if("dangerouslySetInnerHTML"===e)o&&(t.innerHTML=o.__html||"");else if("o"==e[0]&&"n"==e[1]){var u=e!==(e=e.replace(/Capture$/,""));e=e.toLowerCase().substring(2),o?n||t.addEventListener(e,y,u):t.removeEventListener(e,y,u),(t._listeners||(t._listeners={}))[e]=o}else if("list"!==e&&"type"!==e&&!r&&e in t)v(t,e,null==o?"":o),null!=o&&!1!==o||t.removeAttribute(e);else{var c=r&&e!==(e=e.replace(/^xlink\:?/,""));null==o||!1===o?c?t.removeAttributeNS("http://www.w3.org/1999/xlink",e.toLowerCase()):t.removeAttribute(e):"function"!=typeof o&&(c?t.setAttributeNS("http://www.w3.org/1999/xlink",e.toLowerCase(),o):t.setAttribute(e,o))}else t.className=o||""}function v(t,e,n){try{t[e]=n}catch(t){}}function y(t){return this._listeners[t.type](M.event&&M.event(t)||t)}function m(){for(var t;t=R.pop();)M.afterMount&&M.afterMount(t),t.componentDidMount&&t.componentDidMount()}function b(t,e,n,o,r,i){D++||(X=null!=r&&void 0!==r.ownerSVGElement,Y=null!=t&&!("__preactattr_"in t));var u=_(t,e,n,o,i);return r&&u.parentNode!==r&&r.appendChild(u),--D||(Y=!1,i||m()),u}function _(t,e,n,o,r){var i=t,u=X;if(null!=e&&"boolean"!=typeof e||(e=""),"string"==typeof e||"number"==typeof e)return t&&void 0!==t.splitText&&t.parentNode&&(!t._component||r)?t.nodeValue!=e&&(t.nodeValue=e):(i=document.createTextNode(e),t&&(t.parentNode&&t.parentNode.replaceChild(i,t),w(t,!0))),i.__preactattr_=!0,i;var c=e.nodeName;if("function"==typeof c)return T(t,e,n,o);if(X="svg"===c||"foreignObject"!==c&&X,c=String(c),(!t||!s(t,c))&&(i=p(c,X),t)){for(;t.firstChild;)i.appendChild(t.firstChild);t.parentNode&&t.parentNode.replaceChild(i,t),w(t,!0)}var a=i.firstChild,l=i.__preactattr_,f=e.children;if(null==l){l=i.__preactattr_={};for(var d=i.attributes,h=d.length;h--;)l[d[h].name]=d[h].value}return!Y&&f&&1===f.length&&"string"==typeof f[0]&&null!=a&&void 0!==a.splitText&&null==a.nextSibling?a.nodeValue!=f[0]&&(a.nodeValue=f[0]):(f&&f.length||null!=a)&&g(i,f,n,o,Y||null!=l.dangerouslySetInnerHTML),O(i,e.attributes,l),X=u,i}function g(t,e,n,o,r){var i,u,c,a,s,f=t.childNodes,p=[],h={},v=0,y=0,m=f.length,b=0,g=e?e.length:0;if(0!==m)for(var x=0;x<m;x++){var O=f[x],k=O.__preactattr_,C=g&&k?O._component?O._component.__key:k.key:null;null!=C?(v++,h[C]=O):(k||(void 0!==O.splitText?!r||O.nodeValue.trim():r))&&(p[b++]=O)}if(0!==g)for(var x=0;x<g;x++){a=e[x],s=null;var C=a.key;if(null!=C)v&&void 0!==h[C]&&(s=h[C],h[C]=void 0,v--);else if(!s&&y<b)for(i=y;i<b;i++)if(void 0!==p[i]&&l(u=p[i],a,r)){s=u,p[i]=void 0,i===b-1&&b--,i===y&&y++;break}s=_(s,a,n,o),c=f[x],s&&s!==t&&s!==c&&(null==c?t.appendChild(s):s===c.nextSibling?d(c):t.insertBefore(s,c))}if(v)for(var x in h)void 0!==h[x]&&w(h[x],!1);for(;y<=b;)void 0!==(s=p[b--])&&w(s,!1)}function w(t,e){var n=t._component;n?E(n):(null!=t.__preactattr_&&t.__preactattr_.ref&&t.__preactattr_.ref(null),!1!==e&&null!=t.__preactattr_||d(t),x(t))}function x(t){for(t=t.lastChild;t;){var e=t.previousSibling;w(t,!0),t=e}}function O(t,e,n){var o;for(o in n)e&&null!=e[o]||null==n[o]||h(t,o,n[o],n[o]=void 0,X);for(o in e)"children"===o||"innerHTML"===o||o in n&&e[o]===("value"===o||"checked"===o?t[o]:n[o])||h(t,o,n[o],n[o]=e[o],X)}function k(t){var e=t.constructor.name;(W[e]||(W[e]=[])).push(t)}function C(t,e,n){var o,r=W[t.name];if(t.prototype&&t.prototype.render?(o=new t(e,n),A.call(o,e,n)):(o=new A(e,n),o.constructor=t,o.render=S),r)for(var i=r.length;i--;)if(r[i].constructor===t){o.nextBase=r[i].nextBase,r.splice(i,1);break}return o}function S(t,e,n){return this.constructor(t,n)}function j(t,e,n,o,r){t._disable||(t._disable=!0,(t.__ref=e.ref)&&delete e.ref,(t.__key=e.key)&&delete e.key,!t.base||r?t.componentWillMount&&t.componentWillMount():t.componentWillReceiveProps&&t.componentWillReceiveProps(e,o),o&&o!==t.context&&(t.prevContext||(t.prevContext=t.context),t.context=o),t.prevProps||(t.prevProps=t.props),t.props=e,t._disable=!1,0!==n&&(1!==n&&!1===M.syncComponentUpdates&&t.base?c(t):P(t,1,r)),t.__ref&&t.__ref(t))}function P(t,e,n,o){if(!t._disable){var r,u,c,a=t.props,l=t.state,s=t.context,p=t.prevProps||a,d=t.prevState||l,h=t.prevContext||s,v=t.base,y=t.nextBase,_=v||y,g=t._component,x=!1;if(v&&(t.props=p,t.state=d,t.context=h,2!==e&&t.shouldComponentUpdate&&!1===t.shouldComponentUpdate(a,l,s)?x=!0:t.componentWillUpdate&&t.componentWillUpdate(a,l,s),t.props=a,t.state=l,t.context=s),t.prevProps=t.prevState=t.prevContext=t.nextBase=null,t._dirty=!1,!x){r=t.render(a,l,s),t.getChildContext&&(s=i(i({},s),t.getChildContext()));var O,k,S=r&&r.nodeName;if("function"==typeof S){var T=f(r);u=g,u&&u.constructor===S&&T.key==u.__key?j(u,T,1,s,!1):(O=u,t._component=u=C(S,T,s),u.nextBase=u.nextBase||y,u._parentComponent=t,j(u,T,0,s,!1),P(u,1,n,!0)),k=u.base}else c=_,O=g,O&&(c=t._component=null),(_||1===e)&&(c&&(c._component=null),k=b(c,r,s,n||!v,_&&_.parentNode,!0));if(_&&k!==_&&u!==g){var A=_.parentNode;A&&k!==A&&(A.replaceChild(k,_),O||(_._component=null,w(_,!1)))}if(O&&E(O),t.base=k,k&&!o){for(var N=t,B=t;B=B._parentComponent;)(N=B).base=k;k._component=N,k._componentConstructor=N.constructor}}if(!v||n?R.unshift(t):x||(t.componentDidUpdate&&t.componentDidUpdate(p,d,h),M.afterUpdate&&M.afterUpdate(t)),null!=t._renderCallbacks)for(;t._renderCallbacks.length;)t._renderCallbacks.pop().call(t);D||o||m()}}function T(t,e,n,o){for(var r=t&&t._component,i=r,u=t,c=r&&t._componentConstructor===e.nodeName,a=c,l=f(e);r&&!a&&(r=r._parentComponent);)a=r.constructor===e.nodeName;return r&&a&&(!o||r._component)?(j(r,l,3,n,o),t=r.base):(i&&!c&&(E(i),t=u=null),r=C(e.nodeName,l,n),t&&!r.nextBase&&(r.nextBase=t,u=null),j(r,l,1,n,o),t=r.base,u&&t!==u&&(u._component=null,w(u,!1))),t}function E(t){M.beforeUnmount&&M.beforeUnmount(t);var e=t.base;t._disable=!0,t.componentWillUnmount&&t.componentWillUnmount(),t.base=null;var n=t._component;n?E(n):e&&(e.__preactattr_&&e.__preactattr_.ref&&e.__preactattr_.ref(null),t.nextBase=e,d(e),k(t),x(e)),t.__ref&&t.__ref(null)}function A(t,e){this._dirty=!0,this.context=e,this.props=t,this.state=this.state||{}}function N(t,e,n){return b(n,t,{},!1,e,!1)}Object.defineProperty(e,"__esModule",{value:!0}),n.d(e,"h",function(){return r}),n.d(e,"createElement",function(){return r}),n.d(e,"cloneElement",function(){return u}),n.d(e,"Component",function(){return A}),n.d(e,"render",function(){return N}),n.d(e,"rerender",function(){return a}),n.d(e,"options",function(){return M});var M={},B=[],L=[],F="function"==typeof Promise?Promise.resolve().then.bind(Promise.resolve()):setTimeout,U=/acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,I=[],R=[],D=0,X=!1,Y=!1,W={};i(A.prototype,{setState:function(t,e){var n=this.state;this.prevState||(this.prevState=i({},n)),i(n,"function"==typeof t?t(n,this.props):t),e&&(this._renderCallbacks=this._renderCallbacks||[]).push(e),c(this)},forceUpdate:function(t){t&&(this._renderCallbacks=this._renderCallbacks||[]).push(t),P(this,2)},render:function(){}});var V={h:r,createElement:r,cloneElement:u,Component:A,render:N,rerender:a,options:M};e.default=V},function(t,e,n){var o=n(29)("wks"),r=n(15),i=n(3).Symbol,u="function"==typeof i;(t.exports=function(t){return o[t]||(o[t]=u&&i[t]||(u?i:r)("Symbol."+t))}).store=o},function(t,e){var n=t.exports={version:"2.5.3"};"number"==typeof __e&&(__e=n)},function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,e,n){var o=n(3),r=n(2),i=n(5),u=n(27),c=n(16),a=function(t,e,n){var l,s,f,p,d=t&a.F,h=t&a.G,v=t&a.S,y=t&a.P,m=t&a.B,b=h?o:v?o[e]||(o[e]={}):(o[e]||{}).prototype,_=h?r:r[e]||(r[e]={}),g=_.prototype||(_.prototype={});h&&(n=e);for(l in n)s=!d&&b&&void 0!==b[l],f=(s?b:n)[l],p=m&&s?c(f,o):y&&"function"==typeof f?c(Function.call,f):f,b&&u(b,l,f,t&a.U),_[l]!=f&&i(_,l,p),y&&g[l]!=f&&(g[l]=f)};o.core=r,a.F=1,a.G=2,a.S=4,a.P=8,a.B=16,a.W=32,a.U=64,a.R=128,t.exports=a},function(t,e,n){var o=n(7),r=n(14);t.exports=n(10)?function(t,e,n){return o.f(t,e,r(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e,n){var o=n(8),r=n(57),i=n(58),u=Object.defineProperty;e.f=n(10)?Object.defineProperty:function(t,e,n){if(o(t),e=i(e,!0),o(n),r)try{return u(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},function(t,e,n){var o=n(9);t.exports=function(t){if(!o(t))throw TypeError(t+" is not an object!");return t}},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e,n){t.exports=!n(13)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},,function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e){var n=0,o=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+o).toString(36))}},function(t,e,n){var o=n(59);t.exports=function(t,e,n){if(o(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,o){return t.call(e,n,o)};case 3:return function(n,o,r){return t.call(e,n,o,r)}}return function(){return t.apply(e,arguments)}}},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e,n){var o=n(11);t.exports=function(t){return Object(o(t))}},function(t,e,n){var o=n(20),r=Math.min;t.exports=function(t){return t>0?r(o(t),9007199254740991):0}},function(t,e){var n=Math.ceil,o=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?o:n)(t)}},function(t,e){t.exports={}},function(t,e,n){var o=n(29)("keys"),r=n(15);t.exports=function(t){return o[t]||(o[t]=r(t))}},,,,function(t,e,n){var o=n(9),r=n(3).document,i=o(r)&&o(r.createElement);t.exports=function(t){return i?r.createElement(t):{}}},function(t,e,n){var o=n(3),r=n(5),i=n(6),u=n(15)("src"),c=Function.toString,a=(""+c).split("toString");n(2).inspectSource=function(t){return c.call(t)},(t.exports=function(t,e,n,c){var l="function"==typeof n;l&&(i(n,"name")||r(n,"name",e)),t[e]!==n&&(l&&(i(n,u)||r(n,u,t[e]?""+t[e]:a.join(String(e)))),t===o?t[e]=n:c?t[e]?t[e]=n:r(t,e,n):(delete t[e],r(t,e,n)))})(Function.prototype,"toString",function(){return"function"==typeof this&&this[u]||c.call(this)})},function(t,e,n){var o=n(17);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==o(t)?t.split(""):Object(t)}},function(t,e,n){var o=n(3),r=o["__core-js_shared__"]||(o["__core-js_shared__"]={});t.exports=function(t){return r[t]||(r[t]={})}},function(t,e,n){var o=n(1)("unscopables"),r=Array.prototype;void 0==r[o]&&n(5)(r,o,{}),t.exports=function(t){r[o][t]=!0}},function(t,e,n){var o=n(28),r=n(11);t.exports=function(t){return o(r(t))}},function(t,e,n){var o=n(31),r=n(19),i=n(77);t.exports=function(t){return function(e,n,u){var c,a=o(e),l=r(a.length),s=i(u,l);if(t&&n!=n){for(;l>s;)if((c=a[s++])!=c)return!0}else for(;l>s;s++)if((t||s in a)&&a[s]===n)return t||s||0;return!t&&-1}}},function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,e,n){var o=n(7).f,r=n(6),i=n(1)("toStringTag");t.exports=function(t,e,n){t&&!r(t=n?t:t.prototype,i)&&o(t,i,{configurable:!0,value:e})}},,,,,,,,,,,,,,function(t,e,n){"use strict";var o=n(0);n(49),n(53);var r=n(89),i=function(t){return t&&t.__esModule?t:{default:t}}(r),u=window.snPhotos;(0,o.render)((0,o.h)(i.default,{photos:u}),document.getElementById("app"))},function(t,e,n){"use strict";var o=n(50),r=function(t){return t&&t.__esModule?t:{default:t}}(o);n(51),n(52),r.default.polyfill()},function(t,e,n){!function(){"use strict";function e(t){var e=["MSIE ","Trident/","Edge/"];return new RegExp(e.join("|")).test(t)}function n(){function t(t,e){this.scrollLeft=t,this.scrollTop=e}function n(t){return.5*(1-Math.cos(Math.PI*t))}function i(t){if(null===t||"object"!=typeof t||void 0===t.behavior||"auto"===t.behavior||"instant"===t.behavior)return!0;if("object"==typeof t&&"smooth"===t.behavior)return!1;throw new TypeError("behavior member of ScrollOptions "+t.behavior+" is not a valid value for enumeration ScrollBehavior.")}function u(t,e){return"Y"===e?t.clientHeight+h<t.scrollHeight:"X"===e?t.clientWidth+h<t.scrollWidth:void 0}function c(t,e){var n=o.getComputedStyle(t,null)["overflow"+e];return"auto"===n||"scroll"===n}function a(t){var e=u(t,"Y")&&c(t,"Y"),n=u(t,"X")&&c(t,"X");return e||n}function l(t){var e;do{t=t.parentNode,e=t===r.body}while(!1===e&&!1===a(t));return e=null,t}function s(t){var e,r,i,u=y(),c=(u-t.startTime)/d;c=c>1?1:c,e=n(c),r=t.startX+(t.x-t.startX)*e,i=t.startY+(t.y-t.startY)*e,t.method.call(t.scrollable,r,i),r===t.x&&i===t.y||o.requestAnimationFrame(s.bind(o,t))}function f(e,n,i){var u,c,a,l,f=y();e===r.body?(u=o,c=o.scrollX||o.pageXOffset,a=o.scrollY||o.pageYOffset,l=v.scroll):(u=e,c=e.scrollLeft,a=e.scrollTop,l=t),s({scrollable:u,method:l,startTime:f,startX:c,startY:a,x:n,y:i})}if(!("scrollBehavior"in r.documentElement.style&&!0!==o.__forceSmoothScrollPolyfill__)){var p=o.HTMLElement||o.Element,d=468,h=e(o.navigator.userAgent)?1:0,v={scroll:o.scroll||o.scrollTo,scrollBy:o.scrollBy,elementScroll:p.prototype.scroll||t,scrollIntoView:p.prototype.scrollIntoView},y=o.performance&&o.performance.now?o.performance.now.bind(o.performance):Date.now;o.scroll=o.scrollTo=function(){if(void 0!==arguments[0])return!0===i(arguments[0])?void v.scroll.call(o,void 0!==arguments[0].left?arguments[0].left:"object"!=typeof arguments[0]?arguments[0]:o.scrollX||o.pageXOffset,void 0!==arguments[0].top?arguments[0].top:void 0!==arguments[1]?arguments[1]:o.scrollY||o.pageYOffset):void f.call(o,r.body,void 0!==arguments[0].left?~~arguments[0].left:o.scrollX||o.pageXOffset,void 0!==arguments[0].top?~~arguments[0].top:o.scrollY||o.pageYOffset)},o.scrollBy=function(){if(void 0!==arguments[0])return i(arguments[0])?void v.scrollBy.call(o,void 0!==arguments[0].left?arguments[0].left:"object"!=typeof arguments[0]?arguments[0]:0,void 0!==arguments[0].top?arguments[0].top:void 0!==arguments[1]?arguments[1]:0):void f.call(o,r.body,~~arguments[0].left+(o.scrollX||o.pageXOffset),~~arguments[0].top+(o.scrollY||o.pageYOffset))},p.prototype.scroll=p.prototype.scrollTo=function(){if(void 0!==arguments[0]){if(!0===i(arguments[0])){if("number"==typeof arguments[0]&&void 0===arguments[1])throw new SyntaxError("Value couldn't be converted");return void v.elementScroll.call(this,void 0!==arguments[0].left?~~arguments[0].left:"object"!=typeof arguments[0]?~~arguments[0]:this.scrollLeft,void 0!==arguments[0].top?~~arguments[0].top:void 0!==arguments[1]?~~arguments[1]:this.scrollTop)}var t=arguments[0].left,e=arguments[0].top;f.call(this,this,void 0===t?this.scrollLeft:~~t,void 0===e?this.scrollTop:~~e)}},p.prototype.scrollBy=function(){if(void 0!==arguments[0])return!0===i(arguments[0])?void v.elementScroll.call(this,void 0!==arguments[0].left?~~arguments[0].left+this.scrollLeft:~~arguments[0]+this.scrollLeft,void 0!==arguments[0].top?~~arguments[0].top+this.scrollTop:~~arguments[1]+this.scrollTop):void this.scroll({left:~~arguments[0].left+this.scrollLeft,top:~~arguments[0].top+this.scrollTop,behavior:arguments[0].behavior})},p.prototype.scrollIntoView=function(){if(!0===i(arguments[0]))return void v.scrollIntoView.call(this,void 0===arguments[0]||arguments[0]);var t=l(this),e=t.getBoundingClientRect(),n=this.getBoundingClientRect();t!==r.body?(f.call(this,t,t.scrollLeft+n.left-e.left,t.scrollTop+n.top-e.top),"fixed"!==o.getComputedStyle(t).position&&o.scrollBy({left:e.left,top:e.top,behavior:"smooth"})):o.scrollBy({left:n.left,top:n.top,behavior:"smooth"})}}}var o=window,r=document;t.exports={polyfill:n}}()},function(t,e,n){"use strict";function o(t,e){e=e||{bubbles:!1,cancelable:!1,detail:void 0};var n=document.createEvent("CustomEvent");return n.initCustomEvent(t,e.bubbles,e.cancelable,e.detail),n}"function"!=typeof window.CustomEvent&&(o.prototype=window.Event.prototype,window.CustomEvent=o)},function(t,e,n){"use strict";!function(){for(var t=0,e=["ms","moz","webkit","o"],n=0;n<e.length&&!window.requestAnimationFrame;++n)window.requestAnimationFrame=window[e[n]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[e[n]+"CancelAnimationFrame"]||window[e[n]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(e,n){var o=(new Date).getTime(),r=Math.max(0,16-(o-t)),i=window.setTimeout(function(){e(o+r)},r);return t=o+r,i}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(t){clearTimeout(t)})}()},function(t,e,n){"use strict";n(54),n(61),n(67),n(87)},function(t,e,n){n(55),t.exports=n(2).String.trim},function(t,e,n){"use strict";n(56)("trim",function(t){return function(){return t(this,3)}})},function(t,e,n){var o=n(4),r=n(11),i=n(13),u=n(60),c="["+u+"]",a="​",l=RegExp("^"+c+c+"*"),s=RegExp(c+c+"*$"),f=function(t,e,n){var r={},c=i(function(){return!!u[t]()||a[t]()!=a}),l=r[t]=c?e(p):u[t];n&&(r[n]=l),o(o.P+o.F*c,"String",r)},p=f.trim=function(t,e){return t=String(r(t)),1&e&&(t=t.replace(l,"")),2&e&&(t=t.replace(s,"")),t};t.exports=f},function(t,e,n){t.exports=!n(10)&&!n(13)(function(){return 7!=Object.defineProperty(n(26)("div"),"a",{get:function(){return 7}}).a})},function(t,e,n){var o=n(9);t.exports=function(t,e){if(!o(t))return t;var n,r;if(e&&"function"==typeof(n=t.toString)&&!o(r=n.call(t)))return r;if("function"==typeof(n=t.valueOf)&&!o(r=n.call(t)))return r;if(!e&&"function"==typeof(n=t.toString)&&!o(r=n.call(t)))return r;throw TypeError("Can't convert object to primitive value")}},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e){t.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"},function(t,e,n){n(62),t.exports=n(2).Array.find},function(t,e,n){"use strict";var o=n(4),r=n(63)(5),i=!0;"find"in[]&&Array(1).find(function(){i=!1}),o(o.P+o.F*i,"Array",{find:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}}),n(30)("find")},function(t,e,n){var o=n(16),r=n(28),i=n(18),u=n(19),c=n(64);t.exports=function(t,e){var n=1==t,a=2==t,l=3==t,s=4==t,f=6==t,p=5==t||f,d=e||c;return function(e,c,h){for(var v,y,m=i(e),b=r(m),_=o(c,h,3),g=u(b.length),w=0,x=n?d(e,g):a?d(e,0):void 0;g>w;w++)if((p||w in b)&&(v=b[w],y=_(v,w,m),t))if(n)x[w]=y;else if(y)switch(t){case 3:return!0;case 5:return v;case 6:return w;case 2:x.push(v)}else if(s)return!1;return f?-1:l||s?s:x}}},function(t,e,n){var o=n(65);t.exports=function(t,e){return new(o(t))(e)}},function(t,e,n){var o=n(9),r=n(66),i=n(1)("species");t.exports=function(t){var e;return r(t)&&(e=t.constructor,"function"!=typeof e||e!==Array&&!r(e.prototype)||(e=void 0),o(e)&&null===(e=e[i])&&(e=void 0)),void 0===e?Array:e}},function(t,e,n){var o=n(17);t.exports=Array.isArray||function(t){return"Array"==o(t)}},function(t,e,n){n(68),n(80),t.exports=n(2).Array.from},function(t,e,n){"use strict";var o=n(69)(!0);n(70)(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,e=this._t,n=this._i;return n>=e.length?{value:void 0,done:!0}:(t=o(e,n),this._i+=t.length,{value:t,done:!1})})},function(t,e,n){var o=n(20),r=n(11);t.exports=function(t){return function(e,n){var i,u,c=String(r(e)),a=o(n),l=c.length;return a<0||a>=l?t?"":void 0:(i=c.charCodeAt(a),i<55296||i>56319||a+1===l||(u=c.charCodeAt(a+1))<56320||u>57343?t?c.charAt(a):i:t?c.slice(a,a+2):u-56320+(i-55296<<10)+65536)}}},function(t,e,n){"use strict";var o=n(71),r=n(4),i=n(27),u=n(5),c=n(6),a=n(21),l=n(72),s=n(34),f=n(79),p=n(1)("iterator"),d=!([].keys&&"next"in[].keys()),h=function(){return this};t.exports=function(t,e,n,v,y,m,b){l(n,e,v);var _,g,w,x=function(t){if(!d&&t in S)return S[t];switch(t){case"keys":case"values":return function(){return new n(this,t)}}return function(){return new n(this,t)}},O=e+" Iterator",k="values"==y,C=!1,S=t.prototype,j=S[p]||S["@@iterator"]||y&&S[y],P=!d&&j||x(y),T=y?k?x("entries"):P:void 0,E="Array"==e?S.entries||j:j;if(E&&(w=f(E.call(new t)))!==Object.prototype&&w.next&&(s(w,O,!0),o||c(w,p)||u(w,p,h)),k&&j&&"values"!==j.name&&(C=!0,P=function(){return j.call(this)}),o&&!b||!d&&!C&&S[p]||u(S,p,P),a[e]=P,a[O]=h,y)if(_={values:k?P:x("values"),keys:m?P:x("keys"),entries:T},b)for(g in _)g in S||i(S,g,_[g]);else r(r.P+r.F*(d||C),e,_);return _}},function(t,e){t.exports=!1},function(t,e,n){"use strict";var o=n(73),r=n(14),i=n(34),u={};n(5)(u,n(1)("iterator"),function(){return this}),t.exports=function(t,e,n){t.prototype=o(u,{next:r(1,n)}),i(t,e+" Iterator")}},function(t,e,n){var o=n(8),r=n(74),i=n(33),u=n(22)("IE_PROTO"),c=function(){},a=function(){var t,e=n(26)("iframe"),o=i.length;for(e.style.display="none",n(78).appendChild(e),e.src="javascript:",t=e.contentWindow.document,t.open(),t.write("<script>document.F=Object<\/script>"),t.close(),a=t.F;o--;)delete a.prototype[i[o]];return a()};t.exports=Object.create||function(t,e){var n;return null!==t?(c.prototype=o(t),n=new c,c.prototype=null,n[u]=t):n=a(),void 0===e?n:r(n,e)}},function(t,e,n){var o=n(7),r=n(8),i=n(75);t.exports=n(10)?Object.defineProperties:function(t,e){r(t);for(var n,u=i(e),c=u.length,a=0;c>a;)o.f(t,n=u[a++],e[n]);return t}},function(t,e,n){var o=n(76),r=n(33);t.exports=Object.keys||function(t){return o(t,r)}},function(t,e,n){var o=n(6),r=n(31),i=n(32)(!1),u=n(22)("IE_PROTO");t.exports=function(t,e){var n,c=r(t),a=0,l=[];for(n in c)n!=u&&o(c,n)&&l.push(n);for(;e.length>a;)o(c,n=e[a++])&&(~i(l,n)||l.push(n));return l}},function(t,e,n){var o=n(20),r=Math.max,i=Math.min;t.exports=function(t,e){return t=o(t),t<0?r(t+e,0):i(t,e)}},function(t,e,n){var o=n(3).document;t.exports=o&&o.documentElement},function(t,e,n){var o=n(6),r=n(18),i=n(22)("IE_PROTO"),u=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=r(t),o(t,i)?t[i]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?u:null}},function(t,e,n){"use strict";var o=n(16),r=n(4),i=n(18),u=n(81),c=n(82),a=n(19),l=n(83),s=n(84);r(r.S+r.F*!n(86)(function(t){Array.from(t)}),"Array",{from:function(t){var e,n,r,f,p=i(t),d="function"==typeof this?this:Array,h=arguments.length,v=h>1?arguments[1]:void 0,y=void 0!==v,m=0,b=s(p);if(y&&(v=o(v,h>2?arguments[2]:void 0,2)),void 0==b||d==Array&&c(b))for(e=a(p.length),n=new d(e);e>m;m++)l(n,m,y?v(p[m],m):p[m]);else for(f=b.call(p),n=new d;!(r=f.next()).done;m++)l(n,m,y?u(f,v,[r.value,m],!0):r.value);return n.length=m,n}})},function(t,e,n){var o=n(8);t.exports=function(t,e,n,r){try{return r?e(o(n)[0],n[1]):e(n)}catch(e){var i=t.return;throw void 0!==i&&o(i.call(t)),e}}},function(t,e,n){var o=n(21),r=n(1)("iterator"),i=Array.prototype;t.exports=function(t){return void 0!==t&&(o.Array===t||i[r]===t)}},function(t,e,n){"use strict";var o=n(7),r=n(14);t.exports=function(t,e,n){e in t?o.f(t,e,r(0,n)):t[e]=n}},function(t,e,n){var o=n(85),r=n(1)("iterator"),i=n(21);t.exports=n(2).getIteratorMethod=function(t){if(void 0!=t)return t[r]||t["@@iterator"]||i[o(t)]}},function(t,e,n){var o=n(17),r=n(1)("toStringTag"),i="Arguments"==o(function(){return arguments}()),u=function(t,e){try{return t[e]}catch(t){}};t.exports=function(t){var e,n,c;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(n=u(e=Object(t),r))?n:i?o(e):"Object"==(c=o(e))&&"function"==typeof e.callee?"Arguments":c}},function(t,e,n){var o=n(1)("iterator"),r=!1;try{var i=[7][o]();i.return=function(){r=!0},Array.from(i,function(){throw 2})}catch(t){}t.exports=function(t,e){if(!e&&!r)return!1;var n=!1;try{var i=[7],u=i[o]();u.next=function(){return{done:n=!0}},i[o]=function(){return u},t(i)}catch(t){}return n}},function(t,e,n){n(88),t.exports=n(2).Array.includes},function(t,e,n){"use strict";var o=n(4),r=n(32)(!0);o(o.P,"Array",{includes:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}}),n(30)("includes")},function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function u(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var c=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),a=n(0),l=n(90),s=o(l),f=n(91),p=o(f),d=n(92),h=o(d),v=n(95),y=o(v),m=n(97),b=o(m),_=function(t){function e(){r(this,e);var t=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return t.state={token:""},t.onAddPhoto=t.onAddPhoto.bind(t),t.onDeleteClick=t.onDeleteClick.bind(t),t.onSetToken=t.onSetToken.bind(t),t.onBatchUpdatePhotos=t.onBatchUpdatePhotos.bind(t),t}return u(e,t),c(e,[{key:"componentWillMount",value:function(){var t=this;b.default.addHeaderRequestInterceptor(function(){return{"x-auth":t.state.token}})}},{key:"onAddPhoto",value:function(t){b.default.post("/photos",t)}},{key:"onDeleteClick",value:function(t){b.default.delete("/photos/"+t.key)}},{key:"onSetToken",value:function(t){this.setState({token:t})}},{key:"onBatchUpdatePhotos",value:function(t){t.length?b.default.postJSON("/photos/metadata",t):console.log("Nothing to update")}},{key:"render",value:function(){return(0,a.h)("div",{className:"row"},(0,a.h)("div",{className:"col-lg-push-2 col-lg-10"},(0,a.h)(s.default,{onSetToken:this.onSetToken}),(0,a.h)("div",{style:{opacity:this.state.token?1:.2}},(0,a.h)("h1",null,"Upload photos"),(0,a.h)(p.default,{onAddPhoto:this.onAddPhoto}),(0,a.h)("hr",null),(0,a.h)("h1",null,"Batch update photos"),(0,a.h)(h.default,{photos:this.props.photos.data,onSubmit:this.onBatchUpdatePhotos}),(0,a.h)("hr",null),(0,a.h)("h1",null,"Edit photos"),(0,a.h)(y.default,{photos:this.props.photos,onDeleteClick:this.onDeleteClick}))))}}]),e}(a.Component);e.default=_},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(0);e.default=function(t){var e=t.onSetToken;return(0,o.h)("input",{type:"password",name:"authenticator-token",placeholder:"Authenticator token",onChange:function(t){return e(t.target.value)}})}},function(t,e,n){"use strict";function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function u(t){return t.map(function(t){var e=new window.FormData;return e.append("file",t),e})}Object.defineProperty(e,"__esModule",{value:!0});var c=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),a=n(0),l=function(t){function e(){return o(this,e),r(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return i(e,t),c(e,[{key:"onAddPhoto",value:function(t){var e=this,n=t.target;u(Array.from(n.files||[])).map(function(t){return e.props.onAddPhoto(t)})}},{key:"render",value:function(){var t=this;return(0,a.h)("input",{type:"file",multiple:!0,onChange:function(e){return t.onAddPhoto(e)}})}}]),e}(a.Component);e.default=l},function(t,e,n){"use strict";function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var u=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),c=n(0),a=n(93),l=function(t){function e(){o(this,e);var t=r(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return t.state={content:""},t}return i(e,t),u(e,[{key:"onSubmit",value:function(){var t=(0,a.map)(this.state.content,this.props.photos);this.setState({content:""}),this.props.onSubmit(t)}},{key:"render",value:function(){var t=this;return(0,c.h)("div",null,(0,c.h)("div",null,(0,c.h)("textarea",{value:this.state.content,cols:"100",rows:"10",onChange:function(e){return t.setState({content:e.target.value})}})),(0,c.h)("div",null,(0,c.h)("button",{onClick:this.onSubmit.bind(this)},"Submit")))}}]),e}(c.Component);e.default=l},function(t,e,n){"use strict";function o(t,e){return e.find(function(e){return e.name===t})}function r(t,e){if(!t.key)return!1;var n=o(t.name,e);return Object.keys(t).some(function(e){var o=t[e];return Array.isArray(o)?!(0,c.default)(o,n[e]):o!==n[e]})}function i(t,e){for(var n=[],i={},u=/\.(jpg|gif|png)$/,c=t.split("\n").filter(function(t){return t&&"/"!==t[0]});c.length;){var l=c.shift().trim();if(l.toLowerCase().match(u)){r(i,e)&&n.push(i),i={};var s=o(l,e);if(!s){console.log("Expected to find photo with name "+l+" in list of photos, but did not find it! Skipping photo.");continue}i.name=l,i.key=s.key}else{var f=l.split(/\s/),p=f[0].toLowerCase();if(!p)throw new Error('Expected empty line, file name or tab separated key. Found "'+l+'"');var d=a[p]||a.fallback,h="";f.length>1&&(h=f.slice(1,f.length).filter(function(t){return t}).join(" ")),i[p]=d(h),0===c.length&&r(i,e)&&n.push(i)}}return n}Object.defineProperty(e,"__esModule",{value:!0}),e.map=i;var u=n(94),c=function(t){return t&&t.__esModule?t:{default:t}}(u),a={tags:function(t){return t.split(/\s/)},fallback:function(t){return t}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t,e){if(t===e)return!0;if(null===t||null===e)return!1;if(t.length!==e.length)return!1;for(var n=0;n<t.length;++n)if(t[n]!==e[n])return!1;return!0}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),r=n(96),i=function(t){return t&&t.__esModule?t:{default:t}}(r),u=function(t){var e=t.photos,n=t.onDeleteClick;return(0,o.h)("div",{className:"list-photos"},e.map(function(t){return(0,o.h)("div",{key:t.key},(0,o.h)("h3",null,t.name),(0,o.h)("div",{className:"entry"},(0,o.h)("div",{className:"thumb"},(0,o.h)("img",{src:t.sizes.thumb.url})),(0,o.h)("div",{className:"form"},(0,o.h)(i.default,{onDeleteClick:n,photo:t}))))}))};e.default=u},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),r=function(t){var e=t.photo,n=t.onDeleteClick;return(0,o.h)("div",{className:"edit-photo row"},(0,o.h)("div",{className:"col-sm-10"},(0,o.h)("input",{placeholder:"Title",disabled:!0,value:e.title}),(0,o.h)("input",{placeholder:"Location",disabled:!0,value:e.location}),(0,o.h)("input",{placeholder:"Latin",disabled:!0,value:e.latin}),(0,o.h)("textarea",{placeholder:"Photo description",disabled:!0,value:e.description}),(0,o.h)("div",{className:"tags"},e.tags.sort().map(function(t){return(0,o.h)("span",{key:t},t)}))),(0,o.h)("div",{className:"col-sm-4"},(0,o.h)("button",{className:"danger "+(e.deleting?"active":""),disabled:e.deleting,onClick:n.bind(void 0,e)},"Delete"),e.error&&(0,o.h)("p",{style:{color:"red"}},"Something bad happened!")))};e.default=r},function(t,e,n){"use strict";function o(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=r({accept:"application/json"},e.headers||{},i.reduce(function(t,e){return r({},t(),e())},function(){}));return delete e.headers,window.fetch(t,r({headers:n},e)).then(function(t){return t.status>=400?Promise.reject(t):t})}Object.defineProperty(e,"__esModule",{value:!0});var r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t},i=[];e.default={addHeaderRequestInterceptor:function(t){i.push(t)},get:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return o(t,r({method:"GET"},e))},post:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return o(t,r({method:"POST",body:e},n),!0)},delete:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return o(t,r({method:"DELETE"},e),!0)},putJSON:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},i=r({method:"PUT",body:JSON.stringify(e),headers:{}},n);return i.headers["content-type"]="application/json",o(t,i,!0)},postJSON:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},o=r({body:JSON.stringify(e),headers:{}},n);return o.headers["content-type"]="application/json",this.post(t,e,o)}}}]);