var y=Object.create;var l=Object.defineProperty;var w=Object.getOwnPropertyDescriptor;var b=Object.getOwnPropertyNames;var k=Object.getPrototypeOf,x=Object.prototype.hasOwnProperty;var c=r=>l(r,"__esModule",{value:!0});var _=(r,t)=>{c(r);for(var e in t)l(r,e,{get:t[e],enumerable:!0})},R=(r,t,e)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of b(t))!x.call(r,o)&&o!=="default"&&l(r,o,{get:()=>t[o],enumerable:!(e=w(t,o))||e.enumerable});return r},u=r=>R(c(l(r!=null?y(k(r)):{},"default",r&&r.__esModule&&"default"in r?{get:()=>r.default,enumerable:!0}:{value:r,enumerable:!0})),r);_(exports,{default:()=>q});var v=u(require("atom"));var h="service-fetch";function n(r,t){for(var e=0,o=t.length,s=r.length;e<o;e++,s++)r[s]=t[e];return r}var P=function(){function r(t){t===void 0&&(t={}),this.name=t.name,this.styleSheet=`
      background-color: `+(t.backgroundColor||"darkgrey")+`;
      border-radius: 2px;
      color: `+(t.color||"white")+`;
      line-height: 1.5;
      padding: 1px 4px;
      text-shadow: 0 1px 0px rgba(0, 0, 0, 0.2);
    `}return r.prototype.__console__=function(t){for(var e,o=[],s=1;s<arguments.length;s++)o[s-1]=arguments[s];!(atom==null?void 0:atom.inDevMode())||(o.unshift("%c"+this.name+"%c",this.styleSheet,""),(e=window.console)[t].apply(e,o))},r.prototype.debug=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this.__console__.apply(this,n(["debug"],t))},r.prototype.error=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this.__console__.apply(this,n(["error"],t))},r.prototype.info=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this.__console__.apply(this,n(["info"],t))},r.prototype.log=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this.__console__.apply(this,n(["log"],t))},r.prototype.trace=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this.__console__.apply(this,n(["trace"],t))},r.prototype.warn=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this.__console__.apply(this,n(["warn"],t))},r}(),g=P;var a=new g({name:h,backgroundColor:"black",color:"gold"});var m=u(require("path"));var d=new Worker((0,m.resolve)(__dirname,"fetch.worker.js"));function p(r,t,e={}){return new Promise((o,s)=>{a.log(`Request ${r}`,e),d.postMessage({responseType:r,url:t,options:e}),d.onmessage=i=>{a.log("Response",i.data),i.data.ok?o({...i.data,[r]:()=>Promise.resolve(i.data[r])}):s(i.data)}})}async function j(r,t={}){var o;let e=((o=t==null?void 0:t.headers)==null?void 0:o.Accept)||null;switch(!0){case e==="application/json":return await p("json",r,t);case e==="application/octet-stream":return await p("arrayBuffer",r,t);case e==="multipart/form-data":return await p("formData",r,t);case(e==null?void 0:e.startsWith("text/")):return await p("text",r,t);default:throw Error("Requires a supported Accept header is required to mock the Fetch API Response")}}var f=j;var q={subscriptions:new v.CompositeDisposable,activate(){a.log("Activating package")},deactivate(){var r;a.log("Deactivating package"),(r=this.subscriptions)==null||r.dispose()},provideFetch(){return a.log("Providing service"),f}};0&&(module.exports={});
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
