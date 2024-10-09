'use strict';

var atom$1 = require('atom');
var path = require('path');
var k = require('crypto');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var k__default = /*#__PURE__*/_interopDefault(k);

var g="service-fetch";var f=class{name;styleSheet;constructor(e,t={}){if(typeof e!="string")throw new TypeError(`DeveloperConsole: name must be a string, got "${typeof e}"`);this.name=e,this.styleSheet=`
      background-color: ${t.backgroundColor||"darkgrey"};
      border-radius: 2px;
      color: ${t.color||"white"};
      line-height: 1.5;
      padding: 1px 4px;
      text-shadow: 0 1px 0px rgba(0, 0, 0, 0.2);
    `;}__console__(e,...t){atom!=null&&atom.inDevMode()&&(t.unshift(`%c${this.name}%c`,this.styleSheet,""),globalThis.console[e](...t));}debug(...e){this.__console__("debug",...e);}error(...e){this.__console__("error",...e);}info(...e){this.__console__("info",...e);}log(...e){this.__console__("log",...e);}trace(...e){this.__console__("trace",...e);}warn(...e){this.__console__("warn",...e);}};var s=new f(g,{backgroundColor:"black",color:"gold"});var p=new Uint8Array(256),c=p.length;function m(){return c>p.length-16&&(k__default.default.randomFillSync(p),c=0),p.slice(c,c+=16)}var v=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;function I(e){return typeof e=="string"&&v.test(e)}var w=I;var r=[];for(let e=0;e<256;++e)r.push((e+256).toString(16).substr(1));function D(e,t=0){let o=(r[e[t+0]]+r[e[t+1]]+r[e[t+2]]+r[e[t+3]]+"-"+r[e[t+4]]+r[e[t+5]]+"-"+r[e[t+6]]+r[e[t+7]]+"-"+r[e[t+8]]+r[e[t+9]]+"-"+r[e[t+10]]+r[e[t+11]]+r[e[t+12]]+r[e[t+13]]+r[e[t+14]]+r[e[t+15]]).toLowerCase();if(!w(o))throw TypeError("Stringified UUID is invalid");return o}var x=D;function P(e,t,o){e=e||{};let i=e.random||(e.rng||m)();if(i[6]=i[6]&15|64,i[8]=i[8]&63|128,t){o=o||0;for(let n=0;n<16;++n)t[o+n]=i[n];return t}return x(i)}var d=P;var y=new Worker(path.resolve(__dirname,"fetch.worker.js"));function u(e,t,o={}){return new Promise((i,n)=>{let l=d(),h=l.substr(0,8);s.log(`Request ID ${h}:`,{options:o,senderID:l,url:t}),y.postMessage({responseType:e,url:t,options:o,senderID:l}),y.onmessage=a=>{l===a.data.recipientID&&(s.log(`Response ID ${h}:`,a.data),a.data.ok?i({...a.data,[e]:()=>Promise.resolve(a.data[e])}):n(a.data));};})}async function q(e,t={}){var i;let o=((i=t==null?void 0:t.headers)==null?void 0:i.Accept)||"application/json";switch(!0){case o==="application/json":return await u("json",e,t);case o==="application/octet-stream":return await u("arrayBuffer",e,t);case o==="multipart/form-data":return await u("formData",e,t);case(o==null?void 0:o.startsWith("text/")):return await u("text",e,t);default:throw new Error("Requires a supported Accept header is required to mock the Fetch API Response")}}var b=q;var te={subscriptions:new atom$1.CompositeDisposable,activate(){s.log("Activating package");},deactivate(){var e;s.log("Deactivating package"),(e=this.subscriptions)==null||e.dispose();},provideFetch(){return s.log("Providing service"),b}};

module.exports = te;
