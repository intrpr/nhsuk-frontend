/*!
 * typeahead.js 1.2.1
 * https://github.com/nhsuk/typeahead.js
 * forked from https://github.com/corejavascript/typeahead.js
 * Copyright 2013-2018 Twitter, Inc. and other contributors; Licensed MIT
 */

if (window.jQuery) {

  !function(a,b){"function"==typeof define&&define.amd?define(["jquery"],function(c){return a.Bloodhound=b(c)}):"object"==typeof module&&module.exports?module.exports=b(require("jquery")):a.Bloodhound=b(a.jQuery)}(this,function(a){var b=function(){"use strict";return{isMsie:function(){return!!/(msie|trident)/i.test(navigator.userAgent)&&navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2]},isBlankString:function(a){return!a||/^\s*$/.test(a)},escapeRegExChars:function(a){return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")},isString:function(a){return"string"==typeof a},isNumber:function(a){return"number"==typeof a},isArray:a.isArray,isFunction:a.isFunction,isObject:a.isPlainObject,isUndefined:function(a){return void 0===a},isElement:function(a){return!(!a||1!==a.nodeType)},isJQuery:function(b){return b instanceof a},toStr:function(a){return b.isUndefined(a)||null===a?"":a+""},bind:a.proxy,each:function(b,c){function d(a,b){return c(b,a)}a.each(b,d)},map:a.map,filter:a.grep,every:function(b,c){var d=!0;return b?(a.each(b,function(a,e){if(!(d=c.call(null,e,a,b)))return!1}),!!d):d},some:function(b,c){var d=!1;return b?(a.each(b,function(a,e){if(d=c.call(null,e,a,b))return!1}),!!d):d},mixin:a.extend,identity:function(a){return a},clone:function(b){return a.extend(!0,{},b)},getIdGenerator:function(){var a=0;return function(){return a++}},templatify:function(b){function c(){return String(b)}return a.isFunction(b)?b:c},defer:function(a){setTimeout(a,0)},debounce:function(a,b,c){var d,e;return function(){var f,g,h=this,i=arguments;return f=function(){d=null,c||(e=a.apply(h,i))},g=c&&!d,clearTimeout(d),d=setTimeout(f,b),g&&(e=a.apply(h,i)),e}},throttle:function(a,b){var c,d,e,f,g,h;return g=0,h=function(){g=new Date,e=null,f=a.apply(c,d)},function(){var i=new Date,j=b-(i-g);return c=this,d=arguments,j<=0?(clearTimeout(e),e=null,g=i,f=a.apply(c,d)):e||(e=setTimeout(h,j)),f}},stringify:function(a){return b.isString(a)?a:JSON.stringify(a)},guid:function(){function a(a){var b=(Math.random().toString(16)+"000000000").substr(2,8);return a?"-"+b.substr(0,4)+"-"+b.substr(4,4):b}return"tt-"+a()+a(!0)+a(!0)+a()},noop:function(){}}}(),c="1.2.1",d=function(){"use strict";function a(a){return a=b.toStr(a),a?a.split(/\s+/):[]}function c(a){return a=b.toStr(a),a?a.split(/\W+/):[]}function d(a){a=b.toStr(a);var c=[],d="";return b.each(a.split(""),function(a){a.match(/\s+/)?d="":(c.push(d+a),d+=a)}),c}function e(a){return function(c){return c=b.isArray(c)?c:[].slice.call(arguments,0),function(d){var e=[];return b.each(c,function(c){e=e.concat(a(b.toStr(d[c])))}),e}}}return{nonword:c,whitespace:a,ngram:d,obj:{nonword:e(c),whitespace:e(a),ngram:e(d)}}}(),e=function(){"use strict";function c(c){this.maxSize=b.isNumber(c)?c:100,this.reset(),this.maxSize<=0&&(this.set=this.get=a.noop)}function d(){this.head=this.tail=null}function e(a,b){this.key=a,this.val=b,this.prev=this.next=null}return b.mixin(c.prototype,{set:function(a,b){var c,d=this.list.tail;this.size>=this.maxSize&&(this.list.remove(d),delete this.hash[d.key],this.size--),(c=this.hash[a])?(c.val=b,this.list.moveToFront(c)):(c=new e(a,b),this.list.add(c),this.hash[a]=c,this.size++)},get:function(a){var b=this.hash[a];if(b)return this.list.moveToFront(b),b.val},reset:function(){this.size=0,this.hash={},this.list=new d}}),b.mixin(d.prototype,{add:function(a){this.head&&(a.next=this.head,this.head.prev=a),this.head=a,this.tail=this.tail||a},remove:function(a){a.prev?a.prev.next=a.next:this.head=a.next,a.next?a.next.prev=a.prev:this.tail=a.prev},moveToFront:function(a){this.remove(a),this.add(a)}}),c}(),f=function(){"use strict";function c(a,c){this.prefix=["__",a,"__"].join(""),this.ttlKey="__ttl__",this.keyMatcher=new RegExp("^"+b.escapeRegExChars(this.prefix)),this.ls=c||h,!this.ls&&this._noop()}function d(){return(new Date).getTime()}function e(a){return JSON.stringify(b.isUndefined(a)?null:a)}function f(b){return a.parseJSON(b)}function g(a){var b,c,d=[],e=h.length;for(b=0;b<e;b++)(c=h.key(b)).match(a)&&d.push(c.replace(a,""));return d}var h;try{h=window.localStorage,h.setItem("~~~","!"),h.removeItem("~~~")}catch(a){h=null}return b.mixin(c.prototype,{_prefix:function(a){return this.prefix+a},_ttlKey:function(a){return this._prefix(a)+this.ttlKey},_noop:function(){this.get=this.set=this.remove=this.clear=this.isExpired=b.noop},_safeSet:function(a,b){try{this.ls.setItem(a,b)}catch(a){"QuotaExceededError"===a.name&&(this.clear(),this._noop())}},get:function(a){return this.isExpired(a)&&this.remove(a),f(this.ls.getItem(this._prefix(a)))},set:function(a,c,f){return b.isNumber(f)?this._safeSet(this._ttlKey(a),e(d()+f)):this.ls.removeItem(this._ttlKey(a)),this._safeSet(this._prefix(a),e(c))},remove:function(a){return this.ls.removeItem(this._ttlKey(a)),this.ls.removeItem(this._prefix(a)),this},clear:function(){var a,b=g(this.keyMatcher);for(a=b.length;a--;)this.remove(b[a]);return this},isExpired:function(a){var c=f(this.ls.getItem(this._ttlKey(a)));return!!(b.isNumber(c)&&d()>c)}}),c}(),g=function(){"use strict";function c(a){a=a||{},this.maxPendingRequests=a.maxPendingRequests||6,this.cancelled=!1,this.lastReq=null,this._send=a.transport,this._get=a.limiter?a.limiter(this._get):this._get,this._cache=!1===a.cache?new e(0):g}var d=0,f={},g=new e(10);return c.setMaxPendingRequests=function(a){this.maxPendingRequests=a},c.resetCache=function(){g.reset()},b.mixin(c.prototype,{_fingerprint:function(b){return b=b||{},b.url+b.type+a.param(b.data||{})},_get:function(a,b){function c(a){b(null,a),j._cache.set(h,a)}function e(){b(!0)}function g(){d--,delete f[h],j.onDeckRequestArgs&&(j._get.apply(j,j.onDeckRequestArgs),j.onDeckRequestArgs=null)}var h,i,j=this;h=this._fingerprint(a),this.cancelled||h!==this.lastReq||((i=f[h])?i.done(c).fail(e):d<this.maxPendingRequests?(d++,f[h]=this._send(a).done(c).fail(e).always(g)):this.onDeckRequestArgs=[].slice.call(arguments,0))},get:function(c,d){var e,f;d=d||a.noop,c=b.isString(c)?{url:c}:c||{},f=this._fingerprint(c),this.cancelled=!1,this.lastReq=f,(e=this._cache.get(f))?d(null,e):this._get(c,d)},cancel:function(){this.cancelled=!0}}),c}(),h=window.SearchIndex=function(){"use strict";function c(c){c=c||{},c.datumTokenizer&&c.queryTokenizer||a.error("datumTokenizer and queryTokenizer are both required"),this.identify=c.identify||b.stringify,this.datumTokenizer=c.datumTokenizer,this.queryTokenizer=c.queryTokenizer,this.matchAnyQueryToken=c.matchAnyQueryToken,this.reset()}function d(a){return a=b.filter(a,function(a){return!!a}),a=b.map(a,function(a){return a.toLowerCase()})}function e(){var a={};return a[i]=[],a[h]={},a}function f(a){for(var b={},c=[],d=0,e=a.length;d<e;d++)b[a[d]]||(b[a[d]]=!0,c.push(a[d]));return c}function g(a,b){var c=0,d=0,e=[];a=a.sort(),b=b.sort();for(var f=a.length,g=b.length;c<f&&d<g;)a[c]<b[d]?c++:a[c]>b[d]?d++:(e.push(a[c]),c++,d++);return e}var h="c",i="i";return b.mixin(c.prototype,{bootstrap:function(a){this.datums=a.datums,this.trie=a.trie},add:function(a){var c=this;a=b.isArray(a)?a:[a],b.each(a,function(a){var f,g;c.datums[f=c.identify(a)]=a,g=d(c.datumTokenizer(a)),b.each(g,function(a){var b,d,g;for(b=c.trie,d=a.split("");g=d.shift();)b=b[h][g]||(b[h][g]=e()),b[i].push(f)})})},get:function(a){var c=this;return b.map(a,function(a){return c.datums[a]})},search:function(a){var c,e,j=this;return c=d(this.queryTokenizer(a)),b.each(c,function(a){var b,c,d,f;if(e&&0===e.length&&!j.matchAnyQueryToken)return!1;for(b=j.trie,c=a.split("");b&&(d=c.shift());)b=b[h][d];if(b&&0===c.length)f=b[i].slice(0),e=e?g(e,f):f;else if(!j.matchAnyQueryToken)return e=[],!1}),e?b.map(f(e),function(a){return j.datums[a]}):[]},all:function(){var a=[];for(var b in this.datums)a.push(this.datums[b]);return a},reset:function(){this.datums={},this.trie=e()},serialize:function(){return{datums:this.datums,trie:this.trie}}}),c}(),i=function(){"use strict";function a(a){this.url=a.url,this.ttl=a.ttl,this.cache=a.cache,this.prepare=a.prepare,this.transform=a.transform,this.transport=a.transport,this.thumbprint=a.thumbprint,this.storage=new f(a.cacheKey)}var c;return c={data:"data",protocol:"protocol",thumbprint:"thumbprint"},b.mixin(a.prototype,{_settings:function(){return{url:this.url,type:"GET",dataType:"json"}},store:function(a){this.cache&&(this.storage.set(c.data,a,this.ttl),this.storage.set(c.protocol,location.protocol,this.ttl),this.storage.set(c.thumbprint,this.thumbprint,this.ttl))},fromCache:function(){var a,b={};return this.cache?(b.data=this.storage.get(c.data),b.protocol=this.storage.get(c.protocol),b.thumbprint=this.storage.get(c.thumbprint),a=b.thumbprint!==this.thumbprint||b.protocol!==location.protocol,b.data&&!a?b.data:null):null},fromNetwork:function(a){function b(){a(!0)}function c(b){a(null,e.transform(b))}var d,e=this;a&&(d=this.prepare(this._settings()),this.transport(d).fail(b).done(c))},clear:function(){return this.storage.clear(),this}}),a}(),j=function(){"use strict";function a(a){this.url=a.url,this.prepare=a.prepare,this.transform=a.transform,this.indexResponse=a.indexResponse,this.transport=new g({cache:a.cache,limiter:a.limiter,transport:a.transport,maxPendingRequests:a.maxPendingRequests})}return b.mixin(a.prototype,{_settings:function(){return{url:this.url,type:"GET",dataType:"json"}},get:function(a,b){function c(a,c){b(a?[]:e.transform(c))}var d,e=this;if(b)return a=a||"",d=this.prepare(a,this._settings()),this.transport.get(d,c)},cancelLastRequest:function(){this.transport.cancel()}}),a}(),k=function(){"use strict";function d(d){var e;return d?(e={url:null,ttl:864e5,cache:!0,cacheKey:null,thumbprint:"",prepare:b.identity,transform:b.identity,transport:null},d=b.isString(d)?{url:d}:d,d=b.mixin(e,d),!d.url&&a.error("prefetch requires url to be set"),d.transform=d.filter||d.transform,d.cacheKey=d.cacheKey||d.url,d.thumbprint=c+d.thumbprint,d.transport=d.transport?h(d.transport):a.ajax,d):null}function e(c){var d;if(c)return d={url:null,cache:!0,prepare:null,replace:null,wildcard:null,limiter:null,rateLimitBy:"debounce",rateLimitWait:300,transform:b.identity,transport:null},c=b.isString(c)?{url:c}:c,c=b.mixin(d,c),!c.url&&a.error("remote requires url to be set"),c.transform=c.filter||c.transform,c.prepare=f(c),c.limiter=g(c),c.transport=c.transport?h(c.transport):a.ajax,delete c.replace,delete c.wildcard,delete c.rateLimitBy,delete c.rateLimitWait,c}function f(a){function b(a,b){return b.url=f(b.url,a),b}function c(a,b){return b.url=b.url.replace(g,encodeURIComponent(a)),b}function d(a,b){return b}var e,f,g;return e=a.prepare,f=a.replace,g=a.wildcard,e||(e=f?b:a.wildcard?c:d)}function g(a){var c,d,e;return c=a.limiter,d=a.rateLimitBy,e=a.rateLimitWait,c||(c=/^throttle$/i.test(d)?function(a){return function(c){return b.throttle(c,a)}}(e):function(a){return function(c){return b.debounce(c,a)}}(e)),c}function h(c){return function(d){function e(a){b.defer(function(){g.resolve(a)})}function f(a){b.defer(function(){g.reject(a)})}var g=a.Deferred();return c(d,e,f),g}}return function(c){var f,g;return f={initialize:!0,identify:b.stringify,datumTokenizer:null,queryTokenizer:null,matchAnyQueryToken:!1,sufficient:5,indexRemote:!1,sorter:null,local:[],prefetch:null,remote:null},c=b.mixin(f,c||{}),!c.datumTokenizer&&a.error("datumTokenizer is required"),!c.queryTokenizer&&a.error("queryTokenizer is required"),g=c.sorter,c.sorter=g?function(a){return a.sort(g)}:b.identity,c.local=b.isFunction(c.local)?c.local():c.local,c.prefetch=d(c.prefetch),c.remote=e(c.remote),c}}();return function(){"use strict";function c(a){a=k(a),this.sorter=a.sorter,this.identify=a.identify,this.sufficient=a.sufficient,this.indexRemote=a.indexRemote,this.local=a.local,this.remote=a.remote?new j(a.remote):null,this.prefetch=a.prefetch?new i(a.prefetch):null,this.index=new h({identify:this.identify,datumTokenizer:a.datumTokenizer,queryTokenizer:a.queryTokenizer}),!1!==a.initialize&&this.initialize()}var e;return e=window&&window.Bloodhound,c.noConflict=function(){return window&&(window.Bloodhound=e),c},c.tokenizers=d,b.mixin(c.prototype,{__ttAdapter:function(){function a(a,b,d){return c.search(a,b,d)}function b(a,b){return c.search(a,b)}var c=this;return this.remote?a:b},_loadPrefetch:function(){function b(a,b){if(a)return c.reject();e.add(b),e.prefetch.store(e.index.serialize()),c.resolve()}var c,d,e=this;return c=a.Deferred(),this.prefetch?(d=this.prefetch.fromCache())?(this.index.bootstrap(d),c.resolve()):this.prefetch.fromNetwork(b):c.resolve(),c.promise()},_initialize:function(){function a(){b.add(b.local)}var b=this;return this.clear(),(this.initPromise=this._loadPrefetch()).done(a),this.initPromise},initialize:function(a){return!this.initPromise||a?this._initialize():this.initPromise},add:function(a){return this.index.add(a),this},get:function(a){return a=b.isArray(a)?a:[].slice.call(arguments),this.index.get(a)},search:function(a,c,d){function e(a){var c=[];b.each(a,function(a){!b.some(f,function(b){return g.identify(a)===g.identify(b)})&&c.push(a)}),g.indexRemote&&g.add(c),d(c)}var f,g=this;return c=c||b.noop,d=d||b.noop,f=this.sorter(this.index.search(a)),c(this.remote?f.slice():f),this.remote&&f.length<this.sufficient?this.remote.get(a,e):this.remote&&this.remote.cancelLastRequest(),this},all:function(){return this.index.all()},clear:function(){return this.index.reset(),this},clearPrefetchCache:function(){return this.prefetch&&this.prefetch.clear(),this},clearRemoteCache:function(){return g.resetCache(),this},ttAdapter:function(){return this.__ttAdapter()}}),c}()}),function(a,b){"function"==typeof define&&define.amd?define(["jquery"],function(a){return b(a)}):"object"==typeof module&&module.exports?module.exports=b(require("jquery")):b(a.jQuery)}(this,function(a){var b=function(){"use strict";return{isMsie:function(){return!!/(msie|trident)/i.test(navigator.userAgent)&&navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2]},isBlankString:function(a){return!a||/^\s*$/.test(a)},escapeRegExChars:function(a){return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")},isString:function(a){return"string"==typeof a},isNumber:function(a){return"number"==typeof a},isArray:a.isArray,isFunction:a.isFunction,isObject:a.isPlainObject,isUndefined:function(a){return void 0===a},isElement:function(a){return!(!a||1!==a.nodeType)},isJQuery:function(b){return b instanceof a},toStr:function(a){return b.isUndefined(a)||null===a?"":a+""},bind:a.proxy,each:function(b,c){function d(a,b){return c(b,a)}a.each(b,d)},map:a.map,filter:a.grep,every:function(b,c){var d=!0;return b?(a.each(b,function(a,e){if(!(d=c.call(null,e,a,b)))return!1}),!!d):d},some:function(b,c){var d=!1;return b?(a.each(b,function(a,e){if(d=c.call(null,e,a,b))return!1}),!!d):d},mixin:a.extend,identity:function(a){return a},clone:function(b){return a.extend(!0,{},b)},getIdGenerator:function(){var a=0;return function(){return a++}},templatify:function(b){function c(){return String(b)}return a.isFunction(b)?b:c},defer:function(a){setTimeout(a,0)},debounce:function(a,b,c){var d,e;return function(){var f,g,h=this,i=arguments;return f=function(){d=null,c||(e=a.apply(h,i))},g=c&&!d,clearTimeout(d),d=setTimeout(f,b),g&&(e=a.apply(h,i)),e}},throttle:function(a,b){var c,d,e,f,g,h;return g=0,h=function(){g=new Date,e=null,f=a.apply(c,d)},function(){var i=new Date,j=b-(i-g);return c=this,d=arguments,j<=0?(clearTimeout(e),e=null,g=i,f=a.apply(c,d)):e||(e=setTimeout(h,j)),f}},stringify:function(a){return b.isString(a)?a:JSON.stringify(a)},guid:function(){function a(a){var b=(Math.random().toString(16)+"000000000").substr(2,8);return a?"-"+b.substr(0,4)+"-"+b.substr(4,4):b}return"tt-"+a()+a(!0)+a(!0)+a()},noop:function(){}}}(),c=function(){"use strict";function a(a,g){var h,i;return i=b.mixin({},f,a),h={css:e(),classes:i,html:c(i,g),selectors:d(i)},{css:h.css,html:h.html,classes:h.classes,selectors:h.selectors,mixin:function(a){b.mixin(a,h)}}}function c(a,b){return{wrapper:'<span class="'+a.wrapper+'"></span>',menu:'<div id="'+b+'_listbox" role="listbox" class="'+a.menu+'"></div>'}}function d(a){var c={};return b.each(a,function(a,b){c[b]="."+a}),c}function e(){var a={wrapper:{position:"relative",display:"inline-block"},hint:{position:"absolute",top:"0",left:"0",borderColor:"transparent",boxShadow:"none",opacity:"1"},input:{position:"relative",verticalAlign:"top",backgroundColor:"transparent"},inputWithNoHint:{position:"relative",verticalAlign:"top"},menu:{position:"absolute",top:"100%",left:"0",zIndex:"100",display:"none"},ltr:{left:"0",right:"auto"},rtl:{left:"auto",right:" 0"}};return b.isMsie()&&b.mixin(a.input,{backgroundImage:"url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)"}),a}var f={wrapper:"twitter-typeahead",input:"tt-input",hint:"tt-hint",menu:"tt-menu",dataset:"tt-dataset",suggestion:"tt-suggestion",selectable:"tt-selectable",empty:"tt-empty",open:"tt-open",cursor:"tt-cursor",highlight:"tt-highlight"};return a}(),d=function(){"use strict";function c(b){b&&b.el||a.error("EventBus initialized without el"),this.$el=a(b.el)}var d,e;return d="typeahead:",e={render:"rendered",cursorchange:"cursorchanged",select:"selected",autocomplete:"autocompleted"},b.mixin(c.prototype,{_trigger:function(b,c){var e=a.Event(d+b);return this.$el.trigger.call(this.$el,e,c||[]),e},before:function(a){var b,c;return b=[].slice.call(arguments,1),c=this._trigger("before"+a,b),c.isDefaultPrevented()},trigger:function(a){var b;this._trigger(a,[].slice.call(arguments,1)),(b=e[a])&&this._trigger(b,[].slice.call(arguments,1))}}),c}(),e=function(){"use strict";function a(a,b,c,d){var e;if(!c)return this;for(b=b.split(h),c=d?g(c,d):c,this._callbacks=this._callbacks||{};e=b.shift();)this._callbacks[e]=this._callbacks[e]||{sync:[],async:[]},this._callbacks[e][a].push(c);return this}function b(b,c,d){return a.call(this,"async",b,c,d)}function c(b,c,d){return a.call(this,"sync",b,c,d)}function d(a){var b;if(!this._callbacks)return this;for(a=a.split(h);b=a.shift();)delete this._callbacks[b];return this}function e(a){var b,c,d,e,g;if(!this._callbacks)return this;for(a=a.split(h),d=[].slice.call(arguments,1);(b=a.shift())&&(c=this._callbacks[b]);)e=f(c.sync,this,[b].concat(d)),g=f(c.async,this,[b].concat(d)),e()&&i(g);return this}function f(a,b,c){function d(){for(var d,e=0,f=a.length;!d&&e<f;e+=1)d=!1===a[e].apply(b,c);return!d}return d}function g(a,b){return a.bind?a.bind(b):function(){a.apply(b,[].slice.call(arguments,0))}}var h=/\s+/,i=function(){return window.setImmediate?function(a){setImmediate(function(){a()})}:function(a){setTimeout(function(){a()},0)}}();return{onSync:c,onAsync:b,off:d,trigger:e}}(),f=function(a){"use strict";function c(a){return f[a.toUpperCase()]||a}function d(a,d,e,f){for(var g,h=[],i=0,j=a.length;i<j;i++){var k=b.escapeRegExChars(a[i]);f&&(k=k.replace(/\S/g,c)),h.push(k)}return g=e?"\\b("+h.join("|")+")\\b":"("+h.join("|")+")",d?new RegExp(g):new RegExp(g,"i")}var e={node:null,pattern:null,tagName:"strong",className:null,wordsOnly:!1,caseSensitive:!1,diacriticInsensitive:!1},f={A:"[AaªÀ-Åà-åĀ-ąǍǎȀ-ȃȦȧᴬᵃḀḁẚẠ-ảₐ℀℁℻⒜Ⓐⓐ㍱-㍴㎀-㎄㎈㎉㎩-㎯㏂㏊㏟㏿Ａａ]",B:"[BbᴮᵇḂ-ḇℬ⒝Ⓑⓑ㍴㎅-㎇㏃㏈㏔㏝Ｂｂ]",C:"[CcÇçĆ-čᶜ℀ℂ℃℅℆ℭⅭⅽ⒞Ⓒⓒ㍶㎈㎉㎝㎠㎤㏄-㏇Ｃｃ]",D:"[DdĎďǄ-ǆǱ-ǳᴰᵈḊ-ḓⅅⅆⅮⅾ⒟Ⓓⓓ㋏㍲㍷-㍹㎗㎭-㎯㏅㏈Ｄｄ]",E:"[EeÈ-Ëè-ëĒ-ěȄ-ȇȨȩᴱᵉḘ-ḛẸ-ẽₑ℡ℯℰⅇ⒠Ⓔⓔ㉐㋍㋎Ｅｅ]",F:"[FfᶠḞḟ℉ℱ℻⒡Ⓕⓕ㎊-㎌㎙ﬀ-ﬄＦｆ]",G:"[GgĜ-ģǦǧǴǵᴳᵍḠḡℊ⒢Ⓖⓖ㋌㋍㎇㎍-㎏㎓㎬㏆㏉㏒㏿Ｇｇ]",H:"[HhĤĥȞȟʰᴴḢ-ḫẖℋ-ℎ⒣Ⓗⓗ㋌㍱㎐-㎔㏊㏋㏗Ｈｈ]",I:"[IiÌ-Ïì-ïĨ-İĲĳǏǐȈ-ȋᴵᵢḬḭỈ-ịⁱℐℑℹⅈⅠ-ⅣⅥ-ⅨⅪⅫⅰ-ⅳⅵ-ⅸⅺⅻ⒤Ⓘⓘ㍺㏌㏕ﬁﬃＩｉ]",J:"[JjĲ-ĵǇ-ǌǰʲᴶⅉ⒥ⒿⓙⱼＪｊ]",K:"[KkĶķǨǩᴷᵏḰ-ḵK⒦Ⓚⓚ㎄㎅㎉㎏㎑㎘㎞㎢㎦㎪㎸㎾㏀㏆㏍-㏏Ｋｋ]",L:"[LlĹ-ŀǇ-ǉˡᴸḶḷḺ-ḽℒℓ℡Ⅼⅼ⒧Ⓛⓛ㋏㎈㎉㏐-㏓㏕㏖㏿ﬂﬄＬｌ]",M:"[MmᴹᵐḾ-ṃ℠™ℳⅯⅿ⒨Ⓜⓜ㍷-㍹㎃㎆㎎㎒㎖㎙-㎨㎫㎳㎷㎹㎽㎿㏁㏂㏎㏐㏔-㏖㏘㏙㏞㏟Ｍｍ]",N:"[NnÑñŃ-ŉǊ-ǌǸǹᴺṄ-ṋⁿℕ№⒩Ⓝⓝ㎁㎋㎚㎱㎵㎻㏌㏑Ｎｎ]",O:"[OoºÒ-Öò-öŌ-őƠơǑǒǪǫȌ-ȏȮȯᴼᵒỌ-ỏₒ℅№ℴ⒪Ⓞⓞ㍵㏇㏒㏖Ｏｏ]",P:"[PpᴾᵖṔ-ṗℙ⒫Ⓟⓟ㉐㍱㍶㎀㎊㎩-㎬㎰㎴㎺㏋㏗-㏚Ｐｐ]",Q:"[Qqℚ⒬Ⓠⓠ㏃Ｑｑ]",R:"[RrŔ-řȐ-ȓʳᴿᵣṘ-ṛṞṟ₨ℛ-ℝ⒭Ⓡⓡ㋍㍴㎭-㎯㏚㏛Ｒｒ]",S:"[SsŚ-šſȘșˢṠ-ṣ₨℁℠⒮Ⓢⓢ㎧㎨㎮-㎳㏛㏜ﬆＳｓ]",T:"[TtŢ-ťȚțᵀᵗṪ-ṱẗ℡™⒯Ⓣⓣ㉐㋏㎔㏏ﬅﬆＴｔ]",U:"[UuÙ-Üù-üŨ-ųƯưǓǔȔ-ȗᵁᵘᵤṲ-ṷỤ-ủ℆⒰Ⓤⓤ㍳㍺Ｕｕ]",V:"[VvᵛᵥṼ-ṿⅣ-Ⅷⅳ-ⅷ⒱Ⓥⓥⱽ㋎㍵㎴-㎹㏜㏞Ｖｖ]",W:"[WwŴŵʷᵂẀ-ẉẘ⒲Ⓦⓦ㎺-㎿㏝Ｗｗ]",X:"[XxˣẊ-ẍₓ℻Ⅸ-Ⅻⅸ-ⅻ⒳Ⓧⓧ㏓Ｘｘ]",Y:"[YyÝýÿŶ-ŸȲȳʸẎẏẙỲ-ỹ⒴Ⓨⓨ㏉Ｙｙ]",Z:"[ZzŹ-žǱ-ǳᶻẐ-ẕℤℨ⒵Ⓩⓩ㎐-㎔Ｚｚ]"};return function(c){function f(b){var d,e,f;return(d=h.exec(b.data))&&(f=a.createElement(c.tagName),c.className&&(f.className=c.className),e=b.splitText(d.index),e.splitText(d[0].length),f.appendChild(e.cloneNode(!0)),b.parentNode.replaceChild(f,e)),!!d}function g(a,b){for(var c,d=0;d<a.childNodes.length;d++)c=a.childNodes[d],3===c.nodeType?d+=b(c)?1:0:g(c,b)}var h;c=b.mixin({},e,c),c.node&&c.pattern&&(c.pattern=b.isArray(c.pattern)?c.pattern:[c.pattern],h=d(c.pattern,c.caseSensitive,c.wordsOnly,c.diacriticInsensitive),g(c.node,f))}}(window.document),g=function(){"use strict";function c(c,e){c=c||{},c.input||a.error("input is missing"),e.mixin(this),this.$hint=a(c.hint),this.$input=a(c.input),this.$input.attr({"aria-owns":this.$input.attr("id")+"_listbox",role:"textbox","aria-readonly":"true","aria-autocomplete":"list"}),this.query=this.$input.val(),this.queryWhenFocused=this.hasFocus()?this.query:null,this.$overflowHelper=d(this.$input),this._checkLanguageDirection(),0===this.$hint.length&&(this.setHint=this.getHint=this.clearHint=this.clearHintIfInvalid=b.noop),this.onSync("cursorchange",this._updateDescendent)}function d(b){return a('<pre aria-hidden="true"></pre>').css({position:"absolute",visibility:"hidden",whiteSpace:"pre",fontFamily:b.css("font-family"),fontSize:b.css("font-size"),fontStyle:b.css("font-style"),fontVariant:b.css("font-variant"),fontWeight:b.css("font-weight"),wordSpacing:b.css("word-spacing"),letterSpacing:b.css("letter-spacing"),textIndent:b.css("text-indent"),textRendering:b.css("text-rendering"),textTransform:b.css("text-transform")}).insertAfter(b)}function f(a,b){return c.normalizeQuery(a)===c.normalizeQuery(b)}function g(a){return a.altKey||a.ctrlKey||a.metaKey||a.shiftKey}var h;return h={9:"tab",27:"esc",37:"left",39:"right",13:"enter",38:"up",40:"down"},c.normalizeQuery=function(a){return b.toStr(a).replace(/^\s*/g,"").replace(/\s{2,}/g," ")},b.mixin(c.prototype,e,{_onBlur:function(){this.resetInputValue(),this.trigger("blurred")},_onFocus:function(){this.queryWhenFocused=this.query,this.trigger("focused")},_onKeydown:function(a){var b=h[a.which||a.keyCode];this._managePreventDefault(b,a),b&&this._shouldTrigger(b,a)&&this.trigger(b+"Keyed",a)},_onInput:function(){this._setQuery(this.getInputValue()),this.clearHintIfInvalid(),this._checkLanguageDirection()},_managePreventDefault:function(a,b){var c;switch(a){case"up":case"down":c=!g(b);break;default:c=!1}c&&b.preventDefault()},_shouldTrigger:function(a,b){var c;switch(a){case"tab":c=!g(b);break;default:c=!0}return c},_checkLanguageDirection:function(){var a=(this.$input.css("direction")||"ltr").toLowerCase();this.dir!==a&&(this.dir=a,this.$hint.attr("dir",a),this.trigger("langDirChanged",a))},_setQuery:function(a,b){var c,d;c=f(a,this.query),d=!!c&&this.query.length!==a.length,this.query=a,b||c?!b&&d&&this.trigger("whitespaceChanged",this.query):this.trigger("queryChanged",this.query)},_updateDescendent:function(a,b){this.$input.attr("aria-activedescendant",b)},bind:function(){var a,c,d,e,f=this;return a=b.bind(this._onBlur,this),c=b.bind(this._onFocus,this),d=b.bind(this._onKeydown,this),e=b.bind(this._onInput,this),this.$input.on("blur.tt",a).on("focus.tt",c).on("keydown.tt",d),!b.isMsie()||b.isMsie()>9?this.$input.on("input.tt",e):this.$input.on("keydown.tt keypress.tt cut.tt paste.tt",function(a){h[a.which||a.keyCode]||b.defer(b.bind(f._onInput,f,a))}),this},focus:function(){this.$input.focus()},blur:function(){this.$input.blur()},getLangDir:function(){return this.dir},getQuery:function(){return this.query||""},setQuery:function(a,b){this.setInputValue(a),this._setQuery(a,b)},hasQueryChangedSinceLastFocus:function(){return this.query!==this.queryWhenFocused},getInputValue:function(){return this.$input.val()},setInputValue:function(a){this.$input.val(a),this.clearHintIfInvalid(),this._checkLanguageDirection()},resetInputValue:function(){this.setInputValue(this.query)},getHint:function(){return this.$hint.val()},setHint:function(a){this.$hint.val(a)},clearHint:function(){this.setHint("")},clearHintIfInvalid:function(){var a,b,c,d;a=this.getInputValue(),b=this.getHint(),c=a!==b&&0===b.indexOf(a),!(d=""!==a&&c&&!this.hasOverflow())&&this.clearHint()},hasFocus:function(){return this.$input.is(":focus")},hasOverflow:function(){var a=this.$input.width()-2;return this.$overflowHelper.text(this.getInputValue()),this.$overflowHelper.width()>=a},isCursorAtEnd:function(){var a,c,d;return a=this.$input.val().length,c=this.$input[0].selectionStart,b.isNumber(c)?c===a:!document.selection||(d=document.selection.createRange(),d.moveStart("character",-a),a===d.text.length)},destroy:function(){this.$hint.off(".tt"),this.$input.off(".tt"),this.$overflowHelper.remove(),this.$hint=this.$input=this.$overflowHelper=a("<div>")}}),c}(),h=function(){"use strict";function c(c,e){c=c||{},c.templates=c.templates||{},c.templates.notFound=c.templates.notFound||c.templates.empty,c.source||a.error("missing source"),c.node||a.error("missing node"),c.name&&!h(c.name)&&a.error("invalid dataset name: "+c.name),e.mixin(this),this.highlight=!!c.highlight,this.name=b.toStr(c.name||j()),this.limit=c.limit||5,this.displayFn=d(c.display||c.displayKey),this.templates=g(c.templates,this.displayFn),this.source=c.source.__ttAdapter?c.source.__ttAdapter():c.source,this.async=b.isUndefined(c.async)?this.source.length>2:!!c.async,this._resetLastSuggestion(),this.$el=a(c.node).attr("role","presentation").addClass(this.classes.dataset).addClass(this.classes.dataset+"-"+this.name)}function d(a){function c(b){return b[a]}return a=a||b.stringify,b.isFunction(a)?a:c}function g(c,d){function e(d){var e=c.suggestion;return a(e(d)).attr("id",b.guid())}function f(c){return a('<div role="option">').attr("id",b.guid()).text(d(c))}return{notFound:c.notFound&&b.templatify(c.notFound),pending:c.pending&&b.templatify(c.pending),header:c.header&&b.templatify(c.header),footer:c.footer&&b.templatify(c.footer),suggestion:c.suggestion?e:f}}function h(a){return/^[_a-zA-Z0-9-]+$/.test(a)}var i,j;return i={dataset:"tt-selectable-dataset",val:"tt-selectable-display",obj:"tt-selectable-object"},j=b.getIdGenerator(),c.extractData=function(b){var c=a(b);return c.data(i.obj)?{dataset:c.data(i.dataset)||"",val:c.data(i.val)||"",obj:c.data(i.obj)||null}:null},b.mixin(c.prototype,e,{_overwrite:function(a,b){b=b||[],b.length?this._renderSuggestions(a,b):this.async&&this.templates.pending?this._renderPending(a):!this.async&&this.templates.notFound?this._renderNotFound(a):this._empty(),this.trigger("rendered",b,!1,this.name)},_append:function(a,b){b=b||[],b.length&&this.$lastSuggestion.length?this._appendSuggestions(a,b):b.length?this._renderSuggestions(a,b):!this.$lastSuggestion.length&&this.templates.notFound&&this._renderNotFound(a),this.trigger("rendered",b,!0,this.name)},_renderSuggestions:function(a,b){var c;c=this._getSuggestionsFragment(a,b),this.$lastSuggestion=c.children().last(),this.$el.html(c).prepend(this._getHeader(a,b)).append(this._getFooter(a,b))},_appendSuggestions:function(a,b){var c,d;c=this._getSuggestionsFragment(a,b),d=c.children().last(),this.$lastSuggestion.after(c),this.$lastSuggestion=d},_renderPending:function(a){var b=this.templates.pending;this._resetLastSuggestion(),b&&this.$el.html(b({query:a,dataset:this.name}))},_renderNotFound:function(a){var b=this.templates.notFound;this._resetLastSuggestion(),b&&this.$el.html(b({query:a,dataset:this.name}))},_empty:function(){this.$el.empty(),this._resetLastSuggestion()},_getSuggestionsFragment:function(c,d){var e,g=this;return e=document.createDocumentFragment(),b.each(d,function(b){var d,f;f=g._injectQuery(c,b),d=a(g.templates.suggestion(f)).data(i.dataset,g.name).data(i.obj,b).data(i.val,g.displayFn(b)).addClass(g.classes.suggestion+" "+g.classes.selectable),e.appendChild(d[0])}),this.highlight&&f({className:this.classes.highlight,node:e,pattern:c}),a(e)},_getFooter:function(a,b){return this.templates.footer?this.templates.footer({query:a,suggestions:b,dataset:this.name}):null},_getHeader:function(a,b){return this.templates.header?this.templates.header({query:a,suggestions:b,dataset:this.name}):null},_resetLastSuggestion:function(){this.$lastSuggestion=a()},_injectQuery:function(a,c){return b.isObject(c)?b.mixin({_query:a},c):c},update:function(b){function c(a){g||(g=!0,a=(a||[]).slice(0,e.limit),h=a.length,e._overwrite(b,a),h<e.limit&&e.async&&e.trigger("asyncRequested",b,e.name))}function d(c){if(c=c||[],!f&&h<e.limit){e.cancel=a.noop;var d=Math.abs(h-e.limit);h+=d,e._append(b,c.slice(0,d)),e.async&&e.trigger("asyncReceived",b,e.name)}}var e=this,f=!1,g=!1,h=0;this.cancel(),this.cancel=function(){f=!0,e.cancel=a.noop,e.async&&e.trigger("asyncCanceled",b,e.name)},this.source(b,c,d),!g&&c([])},cancel:a.noop,clear:function(){this._empty(),this.cancel(),this.trigger("cleared")},isEmpty:function(){return this.$el.is(":empty")},destroy:function(){this.$el=a("<div>")}}),c}(),i=function(){"use strict";function c(c,d){function e(b){var c=f.$node.find(b.node).first();return b.node=c.length?c:a("<div>").appendTo(f.$node),new h(b,d)}var f=this;c=c||{},c.node||a.error("node is required"),d.mixin(this),this.$node=a(c.node),this.query=null,this.datasets=b.map(c.datasets,e)}return b.mixin(c.prototype,e,{_onSelectableClick:function(b){this.trigger("selectableClicked",a(b.currentTarget))},_onRendered:function(a,b,c,d){this.$node.toggleClass(this.classes.empty,this._allDatasetsEmpty()),this.trigger("datasetRendered",b,c,d)},_onCleared:function(){this.$node.toggleClass(this.classes.empty,this._allDatasetsEmpty()),this.trigger("datasetCleared")},_propagate:function(){this.trigger.apply(this,arguments)},_allDatasetsEmpty:function(){return b.every(this.datasets,b.bind(function(a){var b=a.isEmpty();return this.$node.attr("aria-expanded",!b),b},this))},_getSelectables:function(){return this.$node.find(this.selectors.selectable)},_removeCursor:function(){var a=this.getActiveSelectable();a&&a.removeClass(this.classes.cursor)},_ensureVisible:function(a){var b,c,d,e;b=a.position().top,c=b+a.outerHeight(!0),d=this.$node.scrollTop(),e=this.$node.height()+parseInt(this.$node.css("paddingTop"),10)+parseInt(this.$node.css("paddingBottom"),10),b<0?this.$node.scrollTop(d+b):e<c&&this.$node.scrollTop(d+(c-e))},bind:function(){var c,d=this;return c=b.bind(this._onSelectableClick,this),this.$node.on("click.tt",this.selectors.selectable,c),this.$node.on("mouseover",this.selectors.selectable,function(){d.setCursor(a(this))}),this.$node.on("mouseleave",function(){d._removeCursor()}),b.each(this.datasets,function(a){a.onSync("asyncRequested",d._propagate,d).onSync("asyncCanceled",d._propagate,d).onSync("asyncReceived",d._propagate,d).onSync("rendered",d._onRendered,d).onSync("cleared",d._onCleared,d)}),this},isOpen:function(){return this.$node.hasClass(this.classes.open)},open:function(){this.$node.scrollTop(0),this.$node.addClass(this.classes.open)},close:function(){this.$node.attr("aria-expanded",!1),this.$node.removeClass(this.classes.open),this._removeCursor()},setLanguageDirection:function(a){this.$node.attr("dir",a)},selectableRelativeToCursor:function(a){var b,c,d,e;return c=this.getActiveSelectable(),b=this._getSelectables(),d=c?b.index(c):-1,e=d+a,e=(e+1)%(b.length+1)-1,e=e<-1?b.length-1:e,-1===e?null:b.eq(e)},setCursor:function(a){this._removeCursor(),(a=a&&a.first())&&(a.addClass(this.classes.cursor),this._ensureVisible(a))},getSelectableData:function(a){return a&&a.length?h.extractData(a):null},getActiveSelectable:function(){var a=this._getSelectables().filter(this.selectors.cursor).first();return a.length?a:null},getTopSelectable:function(){var a=this._getSelectables().first();return a.length?a:null},update:function(a){function c(b){b.update(a)}var d=a!==this.query;return d&&(this.query=a,b.each(this.datasets,c)),d},empty:function(){function a(a){a.clear()}b.each(this.datasets,a),this.query=null,this.$node.addClass(this.classes.empty)},destroy:function(){function c(a){a.destroy()}this.$node.off(".tt"),this.$node=a("<div>"),b.each(this.datasets,c)}}),c}(),j=function(){
  "use strict";function c(c){this.$el=a("<span></span>",{role:"status","aria-live":"polite"}).css({position:"absolute",padding:"0",border:"0",height:"1px",width:"1px","margin-bottom":"-1px","margin-right":"-1px",overflow:"hidden",clip:"rect(0 0 0 0)","white-space":"nowrap"}),c.$input.after(this.$el),b.each(c.menu.datasets,b.bind(function(a){a.onSync&&(a.onSync("rendered",b.bind(this.update,this)),a.onSync("cleared",b.bind(this.cleared,this)))},this))}return b.mixin(c.prototype,{update:function(a,b){if(arguments[2]){var c,d=b.length;c=1===d?{result:"result",is:"is"}:{result:"results",is:"are"},this.$el.text(d+" "+c.result+" "+c.is+" available. Keyboard users can use up and down arrow keys to navigate.")}},cleared:function(){this.$el.text("")}}),c}(),k=function(){"use strict";function a(){i.apply(this,[].slice.call(arguments,0))}var c=i.prototype;return b.mixin(a.prototype,i.prototype,{open:function(){return!this._allDatasetsEmpty()&&this._show(),c.open.apply(this,[].slice.call(arguments,0))},close:function(){return this._hide(),c.close.apply(this,[].slice.call(arguments,0))},_onRendered:function(){return this._allDatasetsEmpty()?this._hide():this.isOpen()&&this._show(),c._onRendered.apply(this,[].slice.call(arguments,0))},_onCleared:function(){return this._allDatasetsEmpty()?this._hide():this.isOpen()&&this._show(),c._onCleared.apply(this,[].slice.call(arguments,0))},setLanguageDirection:function(a){return this.$node.css("ltr"===a?this.css.ltr:this.css.rtl),c.setLanguageDirection.apply(this,[].slice.call(arguments,0))},_hide:function(){this.$node.hide()},_show:function(){this.$node.css("display","block")}}),a}(),l=function(){"use strict";function c(c,e){var f,g,h,i,j,k,l,m,n,o,p;c=c||{},c.input||a.error("missing input"),c.menu||a.error("missing menu"),c.eventBus||a.error("missing event bus"),e.mixin(this),this.eventBus=c.eventBus,this.minLength=b.isNumber(c.minLength)?c.minLength:1,this.input=c.input,this.menu=c.menu,this.enabled=!0,this.autoselect=!!c.autoselect,this.active=!1,this.input.hasFocus()&&this.activate(),this.dir=this.input.getLangDir(),this._hacks(),this.menu.bind().onSync("selectableClicked",this._onSelectableClicked,this).onSync("asyncRequested",this._onAsyncRequested,this).onSync("asyncCanceled",this._onAsyncCanceled,this).onSync("asyncReceived",this._onAsyncReceived,this).onSync("datasetRendered",this._onDatasetRendered,this).onSync("datasetCleared",this._onDatasetCleared,this),f=d(this,"activate","open","_onFocused"),g=d(this,"deactivate","_onBlurred"),h=d(this,"isActive","isOpen","_onEnterKeyed"),i=d(this,"isActive","isOpen","_onTabKeyed"),j=d(this,"isActive","_onEscKeyed"),k=d(this,"isActive","open","_onUpKeyed"),l=d(this,"isActive","open","_onDownKeyed"),m=d(this,"isActive","isOpen","_onLeftKeyed"),n=d(this,"isActive","isOpen","_onRightKeyed"),o=d(this,"_openIfActive","_onQueryChanged"),p=d(this,"_openIfActive","_onWhitespaceChanged"),this.input.bind().onSync("focused",f,this).onSync("blurred",g,this).onSync("enterKeyed",h,this).onSync("tabKeyed",i,this).onSync("escKeyed",j,this).onSync("upKeyed",k,this).onSync("downKeyed",l,this).onSync("leftKeyed",m,this).onSync("rightKeyed",n,this).onSync("queryChanged",o,this).onSync("whitespaceChanged",p,this).onSync("langDirChanged",this._onLangDirChanged,this)}function d(a){var c=[].slice.call(arguments,1);return function(){var d=[].slice.call(arguments);b.each(c,function(b){return a[b].apply(a,d)})}}return b.mixin(c.prototype,{_hacks:function(){var c,d;c=this.input.$input||a("<div>"),d=this.menu.$node||a("<div>"),c.on("blur.tt",function(a){var e,f,g;e=document.activeElement,f=d.is(e),g=d.has(e).length>0,b.isMsie()&&(f||g)&&(a.preventDefault(),a.stopImmediatePropagation(),b.defer(function(){c.focus()}))}),d.on("mousedown.tt",function(a){a.preventDefault()})},_onSelectableClicked:function(a,b){this.select(b)},_onDatasetCleared:function(){this._updateHint()},_onDatasetRendered:function(a,b,c,d){if(this._updateHint(),this.autoselect){var e=this.selectors.cursor.substr(1);this.menu.$node.find(this.selectors.suggestion).first().addClass(e)}this.eventBus.trigger("render",b,c,d)},_onAsyncRequested:function(a,b,c){this.eventBus.trigger("asyncrequest",c,b)},_onAsyncCanceled:function(a,b,c){this.eventBus.trigger("asynccancel",c,b)},_onAsyncReceived:function(a,b,c){this.eventBus.trigger("asyncreceive",c,b)},_onFocused:function(){this._minLengthMet()&&this.menu.update(this.input.getQuery())},_onBlurred:function(){this.input.hasQueryChangedSinceLastFocus()&&this.eventBus.trigger("change",this.input.getQuery())},_onEnterKeyed:function(a,b){var c;(c=this.menu.getActiveSelectable())?this.select(c)&&(b.preventDefault(),b.stopPropagation()):this.autoselect&&this.select(this.menu.getTopSelectable())&&(b.preventDefault(),b.stopPropagation())},_onTabKeyed:function(a,b){var c;(c=this.menu.getActiveSelectable())?this.select(c)&&b.preventDefault():(c=this.menu.getTopSelectable())&&this.autocomplete(c)&&b.preventDefault()},_onEscKeyed:function(){this.close()},_onUpKeyed:function(){this.moveCursor(-1)},_onDownKeyed:function(){this.moveCursor(1)},_onLeftKeyed:function(){"rtl"===this.dir&&this.input.isCursorAtEnd()&&this.autocomplete(this.menu.getActiveSelectable()||this.menu.getTopSelectable())},_onRightKeyed:function(){"ltr"===this.dir&&this.input.isCursorAtEnd()&&this.autocomplete(this.menu.getActiveSelectable()||this.menu.getTopSelectable())},_onQueryChanged:function(a,b){this._minLengthMet(b)?this.menu.update(b):this.menu.empty()},_onWhitespaceChanged:function(){this._updateHint()},_onLangDirChanged:function(a,b){this.dir!==b&&(this.dir=b,this.menu.setLanguageDirection(b))},_openIfActive:function(){this.isActive()&&this.open()},_minLengthMet:function(a){return a=b.isString(a)?a:this.input.getQuery()||"",a.length>=this.minLength},_updateHint:function(){var a,c,d,e,f,h,i;a=this.menu.getTopSelectable(),c=this.menu.getSelectableData(a),d=this.input.getInputValue(),!c||b.isBlankString(d)||this.input.hasOverflow()?this.input.clearHint():(e=g.normalizeQuery(d),f=b.escapeRegExChars(e),h=new RegExp("^(?:"+f+")(.+$)","i"),(i=h.exec(c.val))&&this.input.setHint(d+i[1]))},isEnabled:function(){return this.enabled},enable:function(){this.enabled=!0},disable:function(){this.enabled=!1},isActive:function(){return this.active},activate:function(){return!!this.isActive()||!(!this.isEnabled()||this.eventBus.before("active"))&&(this.active=!0,this.eventBus.trigger("active"),!0)},deactivate:function(){return!this.isActive()||!this.eventBus.before("idle")&&(this.active=!1,this.close(),this.eventBus.trigger("idle"),!0)},isOpen:function(){return this.menu.isOpen()},open:function(){return this.isOpen()||this.eventBus.before("open")||(this.menu.open(),this._updateHint(),this.eventBus.trigger("open")),this.isOpen()},close:function(){return this.isOpen()&&!this.eventBus.before("close")&&(this.menu.close(),this.input.clearHint(),this.input.resetInputValue(),this.eventBus.trigger("close")),!this.isOpen()},setVal:function(a){this.input.setQuery(b.toStr(a))},getVal:function(){return this.input.getQuery()},select:function(a){var b=this.menu.getSelectableData(a);return!(!b||this.eventBus.before("select",b.obj,b.dataset))&&(this.input.setQuery(b.val,!0),this.eventBus.trigger("select",b.obj,b.dataset),this.close(),!0)},autocomplete:function(a){var b,c;return b=this.input.getQuery(),c=this.menu.getSelectableData(a),!(!(c&&b!==c.val)||this.eventBus.before("autocomplete",c.obj,c.dataset))&&(this.input.setQuery(c.val),this.eventBus.trigger("autocomplete",c.obj,c.dataset),!0)},moveCursor:function(a){var b,c,d,e,f,g;return b=this.input.getQuery(),c=this.menu.selectableRelativeToCursor(a),d=this.menu.getSelectableData(c),e=d?d.obj:null,f=d?d.dataset:null,g=c?c.attr("id"):null,this.input.trigger("cursorchange",g),!(this._minLengthMet()&&this.menu.update(b))&&!this.eventBus.before("cursorchange",e,f)&&(this.menu.setCursor(c),d?this.input.setInputValue(d.val):(this.input.resetInputValue(),this._updateHint()),this.eventBus.trigger("cursorchange",e,f),!0)},destroy:function(){this.input.destroy(),this.menu.destroy()}}),c}();!function(){"use strict";function e(b,c){b.each(function(){var b,d=a(this);(b=d.data(q.typeahead))&&c(b,d)})}function f(a,b){return a.clone().addClass(b.classes.hint).removeData().css(b.css.hint).css(m(a)).prop({readonly:!0,required:!1}).removeAttr("id name placeholder").removeClass("required").attr({spellcheck:"false",tabindex:-1})}function h(a,b){a.data(q.attrs,{dir:a.attr("dir"),autocomplete:a.attr("autocomplete"),spellcheck:a.attr("spellcheck"),style:a.attr("style")}),a.addClass(b.classes.input).attr({spellcheck:!1});try{!a.attr("dir")&&a.attr("dir","auto")}catch(a){}return a}function m(a){return{backgroundAttachment:a.css("background-attachment"),backgroundClip:a.css("background-clip"),backgroundColor:a.css("background-color"),backgroundImage:a.css("background-image"),backgroundOrigin:a.css("background-origin"),backgroundPosition:a.css("background-position"),backgroundRepeat:a.css("background-repeat"),backgroundSize:a.css("background-size")}}function n(a){var c,d;c=a.data(q.www),d=a.parent().filter(c.selectors.wrapper),b.each(a.data(q.attrs),function(c,d){b.isUndefined(c)?a.removeAttr(d):a.attr(d,c)}),a.removeData(q.typeahead).removeData(q.www).removeData(q.attr).removeClass(c.classes.input),d.length&&(a.detach().insertAfter(d),d.remove())}function o(c){var d,e;return d=b.isJQuery(c)||b.isElement(c),e=d?a(c).first():[],e.length?e:null}var p,q,r;p=a.fn.typeahead,q={www:"tt-www",attrs:"tt-attrs",typeahead:"tt-typeahead"},r={initialize:function(e,m){function n(){var c,n,r,s,t,u,v,w,x,y,z;b.each(m,function(a){a.highlight=!!e.highlight}),c=a(this),n=a(p.html.wrapper),r=o(e.hint),s=o(e.menu),t=!1!==e.hint&&!r,u=!1!==e.menu&&!s,t&&(r=f(c,p)),u&&(s=a(p.html.menu).css(p.css.menu)),r&&r.val(""),c=h(c,p),(t||u)&&(n.css(p.css.wrapper),c.css(t?p.css.input:p.css.inputWithNoHint),c.wrap(n).parent().prepend(t?r:null).append(u?s:null)),z=u?k:i,v=new d({el:c}),w=new g({hint:r,input:c},p),x=new z({node:s,datasets:m},p),new j({$input:c,menu:x}),y=new l({input:w,menu:x,eventBus:v,minLength:e.minLength,autoselect:e.autoselect},p),c.data(q.www,p),c.data(q.typeahead,y)}var p;m=b.isArray(m)?m:[].slice.call(arguments,1),e=e||{};var r=a(this).attr("id");return p=c(e.classNames,r),this.each(n)},isEnabled:function(){var a;return e(this.first(),function(b){a=b.isEnabled()}),a},enable:function(){return e(this,function(a){a.enable()}),this},disable:function(){return e(this,function(a){a.disable()}),this},isActive:function(){var a;return e(this.first(),function(b){a=b.isActive()}),a},activate:function(){return e(this,function(a){a.activate()}),this},deactivate:function(){return e(this,function(a){a.deactivate()}),this},isOpen:function(){var a;return e(this.first(),function(b){a=b.isOpen()}),a},open:function(){return e(this,function(a){a.open()}),this},close:function(){return e(this,function(a){a.close()}),this},select:function(b){var c=!1,d=a(b);return e(this.first(),function(a){c=a.select(d)}),c},autocomplete:function(b){var c=!1,d=a(b);return e(this.first(),function(a){c=a.autocomplete(d)}),c},moveCursor:function(a){var b=!1;return e(this.first(),function(c){b=c.moveCursor(a)}),b},val:function(a){var c;return arguments.length?(e(this,function(c){c.setVal(b.toStr(a))}),this):(e(this.first(),function(a){c=a.getVal()}),c)},destroy:function(){return e(this,function(a,b){n(b),a.destroy()}),this}},a.fn.typeahead=function(a){return r[a]?r[a].apply(this,[].slice.call(arguments,1)):r.initialize.apply(this,arguments)},a.fn.typeahead.noConflict=function(){return a.fn.typeahead=p,this}}()});

}

window.onload = function() {
  if (window.jQuery) {

    var NHSUK = NHSUK || {};

    NHSUK.typeahead =
    (function ($) {
      var maxResultCount = 10,
            suggestHost = 'nhs.funnelback.co.uk'
                        ? 'nhs.funnelback.co.uk'
                        : location.hostname,
              searchHost = 'www.nhs.uk'
                        ? 'www.nhs.uk'
                        : location.hostname,
              searchUrl = 'https://' + searchHost + '/search?collection=nhs-meta',
              suggestUrl = 'https://' + suggestHost
                            + '/s/suggest.json?collection=nhs-meta&partial_query=%QUERY&sort=0&fmt=json++&profile=&show='
                            + maxResultCount,
            suggestions = new Bloodhound({
                        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('disp'),
                        queryTokenizer: Bloodhound.tokenizers.whitespace,
                                limit: maxResultCount,
                                remote: { url : suggestUrl,wildcard: '%QUERY' }
                        }),
            searchField = '#search-field';

      function init() {
        suggestions.initialize();

        var $suggestionsMenu = 'suggestions-menu',
            $suggestionsList = 'suggestions-list',
            $suggestionsItem = 'suggestions-item',
            $suggestionsWrapper = 'suggestions-wrapper',
            $suggestionsItemSelected = 'suggestions-item--selected',
            $searchInputShadow = 'nhsuk-search__input--shadow',
            $iconSearch = '<svg class="nhsuk-icon nhsuk-icon__search" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M19.71 18.29l-4.11-4.1a7 7 0 1 0-1.41 1.41l4.1 4.11a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 10a5 5 0 1 1 5 5 5 5 0 0 1-5-5z"></path><text aria-hidden="true">Search</text></svg>',
            $suggestionsTitle = 'suggestions-title',
            $suggestionsNone = 'suggestions-none',
            $searchContainer = 'nhsuk-header__search',
            $searchForm = 'nhsuk-header__search-form',
            $searchInput = 'nhsuk-search__input',
            $searchSubmit = 'nhsuk-search__submit',
            $searchInputWithDropdown = 'nhsuk-search__input--withdropdown',
            $searchSubmitWithDropdown = 'nhsuk-search__submit--withdropdown';

        $(searchField).typeahead({
          minLength: 2,
          highlight: true,
          classNames: {
            menu: $suggestionsMenu,
            suggestion: $suggestionsItem,
            highlight: '',
            selectable: 's', // unused but required for some reason
            dataset: $suggestionsWrapper,
            cursor: $suggestionsItemSelected,
            hint: $searchInputShadow
          }
        },
        {
          name : '-suggestions',
          limit: maxResultCount,
          display: 'disp',
          source: suggestions.ttAdapter(),
          templates: {
            header: '<li class="' + $suggestionsTitle + '">Search suggestions</li>',
            notFound: '<li class="' + $suggestionsNone + '">No suggestions</li>',
            suggestion: function(data){
              var displayitem = "";
              switch (data.disp_t) {
                case 'J':
                  $.each(data.disp, function(key, value) {
                    displayitem += (key, value);
                    displayitem += " ";
                  });
                  break;

                default:

                  if (data.disp.length > 36)
                    displayitem = data.disp.substring(0,36)+'...';
                  else
                    displayitem = data.disp;
                    break;
              }

              switch (data.action_t) {
                case 'Q':
                  displayitem = '<li>' + $iconSearch + '<a href="' + searchUrl + '&query=' + data.action + '">' + displayitem + '</a></li>';
                  break;
                case 'E':
                  displayitem = '<li>' + $iconSearch + '<a href="' + searchUrl + '&query=' + data.key + '&' + data.action + '">' + displayitem + '</a></li>';
                  break;
                case 'U':
                  displayitem = '<li>' + $iconSearch + '<a href="' + data.action + '">' + displayitem + '</a></li>';
                  break;
                case 'C':
                  displayitem = '<li>' + $iconSearch + '<a href="#" onClick="' + data.action + '">'  + displayitem + '</a></li>';
                  break;
                default:
                  displayitem = '<li>' + $iconSearch + '<a href="' + searchUrl + '&query=' + data.disp + '">' + displayitem + '</a></li>';
                  break;
              }

              return displayitem;
            },
          }

        })
        .bind('typeahead:open', function() {
          var val = $(searchField).typeahead('val'),
          value = $(searchField).attr('value');

          if (val === value) {
            $(searchField).typeahead('val', value);
          }
          if (val.toLowerCase() === 'enter a search term'){
            $(searchField).typeahead('val', '');
          }

        })
        .bind('typeahead:render', function() {
          $('.' + $suggestionsWrapper).wrapInner('<ul class="' + $suggestionsList + '"></ul>'); // add list element around the suggestions
          $('.' + $suggestionsList).css('width', $('.' + $searchForm).width()); // get width of the form and give it to the dropdown list
          $('.' + $searchInput).addClass($searchInputWithDropdown); // add classes to remove border radius on input and submit fields when dropdown appears
          $('.' + $searchSubmit).addClass($searchSubmitWithDropdown);
          $('.' + $suggestionsMenu).insertAfter( $('.' + $searchContainer) ); // move the suggestions in the DOM

          // calculate where to position the dropdown from the top and left
          var topoffset = $('.' + $searchForm).offset().top + $('.' + $searchInput).height();
          var position = $('.' + $searchContainer).position();

          $('.' + $suggestionsMenu).css({
            'top' : topoffset + 2, // add 2 for borders?
            'left' : position.left
          });

        })
        .bind('typeahead:close', function() {
          $('.' + $searchInput).removeClass($searchInputWithDropdown);
          $('.' + $searchSubmit).removeClass($searchSubmitWithDropdown);
        })
        .bind('typeahead:idle', function() {
          $('.' + $suggestionsList).hide();
        });
      }

      return {
        init: init
      };
    }(jQuery));

    $(function(){
      NHSUK.typeahead.init();
      $('.nhsuk-search__input--shadow').attr('aria-hidden', 'true').addClass('nhsuk-u-visually-hidden'); // hide the extra input field created by typeahead to screen readers
    });

  }
}

document.addEventListener('DOMContentLoaded', function() {

  // Search button toggle
  (function() {

    var searchToggle = {
      searchToggleButton: document.getElementById('toggle-search'),
      searchClose: document.getElementById('close-search'),
      searchContainer: document.getElementById('wrap-search'),
      menuSearchContainer: document.getElementById('content-header'),

      doToggle: function(e) {
        e.preventDefault();

        if (this.searchToggleButton.hasAttribute("aria-expanded")) {
          this.searchToggleButton.removeAttribute("aria-expanded")
        } else {
          this.searchToggleButton.setAttribute("aria-expanded", "true")
        }

        function toggleClass(ele, class1) {
          var classes = ele.className;
          var regex = new RegExp('\\b' + ' ' + class1 + '\\b');
          var hasOne = classes.match(regex);
          class1 = class1.replace(/\s+/g, '');
          if (hasOne)
            ele.className = classes.replace(regex, '');
          else
            ele.className = classes + ' ' + class1;
        }

        toggleClass(this.searchToggleButton, 'is-active');
        toggleClass(this.searchContainer, 'js-show');
        toggleClass(this.menuSearchContainer, 'js-show');

      }
    };

    if (searchToggle.searchToggleButton) { searchToggle.searchToggleButton.addEventListener('click', function(e) { searchToggle.doToggle(e); }); }
    if (searchToggle.searchClose) { searchToggle.searchClose.addEventListener('click', function(e) { searchToggle.doToggle(e); }); }

  }());

});


document.addEventListener('DOMContentLoaded', function() {

  // Menu button toggle
  (function() {

    var menuToggle = {
      menuToggleButton: document.getElementById('toggle-menu'),
      menuClose: document.getElementById('close-menu'),
      nav: document.getElementById('header-navigation'),

      doToggle: function(e) {
        e.preventDefault();

        if (this.menuToggleButton.hasAttribute("aria-expanded")) {
          this.menuToggleButton.removeAttribute("aria-expanded")
        } else {
          this.menuToggleButton.setAttribute("aria-expanded", "true")
        }

        function toggleClass(ele, class1) {
          var classes = ele.className;
          var regex = new RegExp('\\b' + ' ' + class1 + '\\b');
          var hasOne = classes.match(regex);
          class1 = class1.replace(/\s+/g, '');
          if (hasOne)
            ele.className = classes.replace(regex, '');
          else
            ele.className = classes + ' ' + class1;
        }

        toggleClass(this.menuToggleButton, 'is-active');
        toggleClass(this.nav, 'js-show');

      }
    };

    if (menuToggle.menuToggleButton) { menuToggle.menuToggleButton.addEventListener('click', function(e) { menuToggle.doToggle(e); }); }
    if (menuToggle.menuClose) { menuToggle.menuClose.addEventListener('click', function(e) { menuToggle.doToggle(e); }); }

  }());

});

// Feedback banner

var banner = document.querySelector('#nhsuk-feedback-banner');
var bannerCloseButton = document.querySelector('#nhsuk-feedback-banner-close');
var footer = document.getElementById('nhsuk-footer');

// taken from https://stackoverflow.com/a/22480938
function isScrolledIntoView(el) {
  var rect = el.getBoundingClientRect();
  var elemTop = rect.top;
  var elemBottom = rect.bottom;
  // Only completely visible elements return true:
  // var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
  // Partially visible elements return true:
  var isVisible = elemTop < window.innerHeight && elemBottom >= 0;
  return isVisible;
}

document.addEventListener("DOMContentLoaded", function(){

  setTimeout(function () {
    if (typeof(banner) != 'undefined' && banner != null) {
      banner.style.display = "block";
    }
  }, 3000);

  var didScroll = false,
      timer = false;

  // set a timer when scrolling, so as not to be constantly calling the
  // isScrolledIntoView function and spiking CPU, to check when the footer
  // comes in to view, to make the banner not sticky but position it in the
  // normal flow of the page below the footer
  $(window).scroll(function() {
    if (!didScroll) {
      timer = setInterval(function() {
        if (didScroll) {
          didScroll = false;
          clearTimeout(timer);

          if (isScrolledIntoView(footer)) {
            banner.classList.add("js-inview")
          } else {
            banner.classList.remove("js-inview")
          }
        }
      }, 500);
    }
    didScroll = true;
  });

});

if (bannerCloseButton) {
  bannerCloseButton.addEventListener("click", function(){
    banner.style.display = "none";
  });
}

// When using VoiceOver on iOS, focus remains on the skip link anchor when
// selected so the next focusable element is not at the jumped to area.
// This Javascript hack focuses on the first H1 header (if one exists, which it
// should) by adding tabindex = -1 to it and then removes it when focus is
// off it.

document.addEventListener('DOMContentLoaded', function() {

  var skip = {

    link: document.querySelector('.nhsuk-skip-link'),
    header: document.getElementsByTagName('H1')[0],

    doFocus: function(e) {
      this.header.setAttribute('tabIndex', '-1');
      this.header.focus();
    },

    doLeave: function(e) {
      this.header.removeAttribute('tabIndex');
    }

  }

  if (skip.link && skip.header) {

    skip.link.addEventListener('click', function(e) {
      e.preventDefault();
      skip.doFocus(e);
    });

    skip.header.addEventListener('blur', function(e) {
      skip.doLeave(e);
    });

  }

})
