var v=Object.create;var i=Object.defineProperty;var y=Object.getOwnPropertyDescriptor;var w=Object.getOwnPropertyNames;var b=Object.getPrototypeOf,k=Object.prototype.hasOwnProperty;var c=r=>i(r,"__esModule",{value:!0});var x=(r,t)=>{c(r);for(var e in t)i(r,e,{get:t[e],enumerable:!0})},_=(r,t,e)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of w(t))!k.call(r,o)&&o!=="default"&&i(r,o,{get:()=>t[o],enumerable:!(e=y(t,o))||e.enumerable});return r},p=r=>_(c(i(r!=null?v(b(r)):{},"default",r&&r.__esModule&&"default"in r?{get:()=>r.default,enumerable:!0}:{value:r,enumerable:!0})),r);x(exports,{default:()=>j});var f=p(require("atom"));var u="service-fetch";function n(r,t){for(var e=0,o=t.length,s=r.length;e<o;e++,s++)r[s]=t[e];return r}var P=function(){function r(t){t===void 0&&(t={}),this.name=t.name,this.styleSheet=`
      background-color: `+(t.backgroundColor||"darkgrey")+`;
      border-radius: 2px;
      color: `+(t.color||"white")+`;
      line-height: 1.5;
      padding: 1px 4px;
      text-shadow: 0 1px 0px rgba(0, 0, 0, 0.2);
    `}return r.prototype.__console__=function(t){for(var e,o=[],s=1;s<arguments.length;s++)o[s-1]=arguments[s];!(atom==null?void 0:atom.inDevMode())||(o.unshift("%c"+this.name+"%c",this.styleSheet,""),(e=window.console)[t].apply(e,o))},r.prototype.debug=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this.__console__.apply(this,n(["debug"],t))},r.prototype.error=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this.__console__.apply(this,n(["error"],t))},r.prototype.info=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this.__console__.apply(this,n(["info"],t))},r.prototype.log=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this.__console__.apply(this,n(["log"],t))},r.prototype.trace=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this.__console__.apply(this,n(["trace"],t))},r.prototype.warn=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this.__console__.apply(this,n(["warn"],t))},r}(),h=P;var a=new h({name:u,backgroundColor:"black",color:"gold"});var g=p(require("path"));var m=new Worker((0,g.resolve)(__dirname,"fetch.worker.js"));function l(r,t,e={}){return new Promise(o=>{a.log(`Request ${r}`,e),m.postMessage({responseType:r,url:t,options:e}),m.onmessage=s=>{a.log("Response",s.data),o({...s.data,[r]:()=>Promise.resolve(s.data[r])})}})}async function R(r,t={}){var o;let e=((o=t==null?void 0:t.headers)==null?void 0:o.Accept)||null;switch(!0){case e==="application/json":return await l("json",r,t);case e==="application/octet-stream":return await l("arrayBuffer",r,t);case e==="multipart/form-data":return await l("formData",r,t);case(e==null?void 0:e.startsWith("text/")):return await l("text",r,t);default:throw Error("The Accept header is required to mock the Fetch API Response")}}var d=R;var j={subscriptions:new f.CompositeDisposable,activate(){a.log("Activating package")},deactivate(){var r;a.log("Deactivating package"),(r=this.subscriptions)==null||r.dispose()},provideFetch(){return a.log("Providing service"),d}};0&&(module.exports={});
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
//# sourceMappingURL=main.js.map
