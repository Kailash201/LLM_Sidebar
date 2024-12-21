/*! For license information please see background.js.LICENSE.txt */
(()=>{"use strict";var t,e,n,s={445:(t,e)=>{const n=["user","model","function","system"];var s,o,i,r,a,c,l,d;e.DE=void 0,(s=e.DE||(e.DE={})).HARM_CATEGORY_UNSPECIFIED="HARM_CATEGORY_UNSPECIFIED",s.HARM_CATEGORY_HATE_SPEECH="HARM_CATEGORY_HATE_SPEECH",s.HARM_CATEGORY_SEXUALLY_EXPLICIT="HARM_CATEGORY_SEXUALLY_EXPLICIT",s.HARM_CATEGORY_HARASSMENT="HARM_CATEGORY_HARASSMENT",s.HARM_CATEGORY_DANGEROUS_CONTENT="HARM_CATEGORY_DANGEROUS_CONTENT",e.vk=void 0,(o=e.vk||(e.vk={})).HARM_BLOCK_THRESHOLD_UNSPECIFIED="HARM_BLOCK_THRESHOLD_UNSPECIFIED",o.BLOCK_LOW_AND_ABOVE="BLOCK_LOW_AND_ABOVE",o.BLOCK_MEDIUM_AND_ABOVE="BLOCK_MEDIUM_AND_ABOVE",o.BLOCK_ONLY_HIGH="BLOCK_ONLY_HIGH",o.BLOCK_NONE="BLOCK_NONE",e.uR=void 0,(i=e.uR||(e.uR={})).HARM_PROBABILITY_UNSPECIFIED="HARM_PROBABILITY_UNSPECIFIED",i.NEGLIGIBLE="NEGLIGIBLE",i.LOW="LOW",i.MEDIUM="MEDIUM",i.HIGH="HIGH",e.Cr=void 0,(r=e.Cr||(e.Cr={})).BLOCKED_REASON_UNSPECIFIED="BLOCKED_REASON_UNSPECIFIED",r.SAFETY="SAFETY",r.OTHER="OTHER",e.eD=void 0,(a=e.eD||(e.eD={})).FINISH_REASON_UNSPECIFIED="FINISH_REASON_UNSPECIFIED",a.STOP="STOP",a.MAX_TOKENS="MAX_TOKENS",a.SAFETY="SAFETY",a.RECITATION="RECITATION",a.OTHER="OTHER",e.wP=void 0,(c=e.wP||(e.wP={})).TASK_TYPE_UNSPECIFIED="TASK_TYPE_UNSPECIFIED",c.RETRIEVAL_QUERY="RETRIEVAL_QUERY",c.RETRIEVAL_DOCUMENT="RETRIEVAL_DOCUMENT",c.SEMANTIC_SIMILARITY="SEMANTIC_SIMILARITY",c.CLASSIFICATION="CLASSIFICATION",c.CLUSTERING="CLUSTERING",e.m0=void 0,(l=e.m0||(e.m0={})).MODE_UNSPECIFIED="MODE_UNSPECIFIED",l.AUTO="AUTO",l.ANY="ANY",l.NONE="NONE",e.wl=void 0,(d=e.wl||(e.wl={})).STRING="STRING",d.NUMBER="NUMBER",d.INTEGER="INTEGER",d.BOOLEAN="BOOLEAN",d.ARRAY="ARRAY",d.OBJECT="OBJECT";class u extends Error{constructor(t){super(`[GoogleGenerativeAI Error]: ${t}`)}}class h extends u{constructor(t,e){super(t),this.response=e}}class f extends u{constructor(t,e,n,s){super(t),this.status=e,this.statusText=n,this.errorDetails=s}}class p extends u{}const E="0.11.4",g="genai-js";var y;!function(t){t.GENERATE_CONTENT="generateContent",t.STREAM_GENERATE_CONTENT="streamGenerateContent",t.COUNT_TOKENS="countTokens",t.EMBED_CONTENT="embedContent",t.BATCH_EMBED_CONTENTS="batchEmbedContents"}(y||(y={}));class m{constructor(t,e,n,s,o){this.model=t,this.task=e,this.apiKey=n,this.stream=s,this.requestOptions=o}toString(){var t,e;const n=(null===(t=this.requestOptions)||void 0===t?void 0:t.apiVersion)||"v1beta";let s=`${(null===(e=this.requestOptions)||void 0===e?void 0:e.baseUrl)||"https://generativelanguage.googleapis.com"}/${n}/${this.model}:${this.task}`;return this.stream&&(s+="?alt=sse"),s}}async function C(t){const e=new Headers;e.append("Content-Type","application/json"),e.append("x-goog-api-client",function(t){const e=[];return(null==t?void 0:t.apiClient)&&e.push(t.apiClient),e.push(`${g}/${E}`),e.join(" ")}(t.requestOptions)),e.append("x-goog-api-key",t.apiKey);let n=t.requestOptions.customHeaders;if(n){if(!(n instanceof Headers))try{n=new Headers(n)}catch(t){throw new p(`unable to convert customHeaders value ${JSON.stringify(n)} to Headers: ${t.message}`)}for(const[t,s]of n.entries()){if("x-goog-api-key"===t)throw new p(`Cannot set reserved header name ${t}`);if("x-goog-api-client"===t)throw new p(`Header name ${t} can only be set using the apiClient field`);e.append(t,s)}}return e}async function O(t,e,n,s,o,i){return async function(t,e,n,s,o,i,r=fetch){const a=new m(t,e,n,s,i);let c;try{const l=await async function(t,e,n,s,o,i){const r=new m(t,e,n,s,i);return{url:r.toString(),fetchOptions:Object.assign(Object.assign({},v(i)),{method:"POST",headers:await C(r),body:o})}}(t,e,n,s,o,i);if(c=await r(l.url,l.fetchOptions),!c.ok){let t,e="";try{const n=await c.json();e=n.error.message,n.error.details&&(e+=` ${JSON.stringify(n.error.details)}`,t=n.error.details)}catch(t){}throw new f(`Error fetching from ${a.toString()}: [${c.status} ${c.statusText}] ${e}`,c.status,c.statusText,t)}}catch(t){let e=t;throw t instanceof f||t instanceof p||(e=new u(`Error fetching from ${a.toString()}: ${t.message}`),e.stack=t.stack),e}return c}(t,e,n,s,o,i,fetch)}function v(t){const e={};if((null==t?void 0:t.timeout)>=0){const n=new AbortController,s=n.signal;setTimeout((()=>n.abort()),t.timeout),e.signal=s}return e}function T(t){return t.text=()=>{if(t.candidates&&t.candidates.length>0){if(t.candidates.length>1&&console.warn(`This response had ${t.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`),I(t.candidates[0]))throw new h(`${N(t)}`,t);return function(t){var e,n,s,o;const i=[];if(null===(n=null===(e=t.candidates)||void 0===e?void 0:e[0].content)||void 0===n?void 0:n.parts)for(const e of null===(o=null===(s=t.candidates)||void 0===s?void 0:s[0].content)||void 0===o?void 0:o.parts)e.text&&i.push(e.text);return i.length>0?i.join(""):""}(t)}if(t.promptFeedback)throw new h(`Text not available. ${N(t)}`,t);return""},t.functionCall=()=>{if(t.candidates&&t.candidates.length>0){if(t.candidates.length>1&&console.warn(`This response had ${t.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),I(t.candidates[0]))throw new h(`${N(t)}`,t);return console.warn("response.functionCall() is deprecated. Use response.functionCalls() instead."),_(t)[0]}if(t.promptFeedback)throw new h(`Function call not available. ${N(t)}`,t)},t.functionCalls=()=>{if(t.candidates&&t.candidates.length>0){if(t.candidates.length>1&&console.warn(`This response had ${t.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),I(t.candidates[0]))throw new h(`${N(t)}`,t);return _(t)}if(t.promptFeedback)throw new h(`Function call not available. ${N(t)}`,t)},t}function _(t){var e,n,s,o;const i=[];if(null===(n=null===(e=t.candidates)||void 0===e?void 0:e[0].content)||void 0===n?void 0:n.parts)for(const e of null===(o=null===(s=t.candidates)||void 0===s?void 0:s[0].content)||void 0===o?void 0:o.parts)e.functionCall&&i.push(e.functionCall);return i.length>0?i:void 0}const w=[e.eD.RECITATION,e.eD.SAFETY];function I(t){return!!t.finishReason&&w.includes(t.finishReason)}function N(t){var e,n,s;let o="";if(t.candidates&&0!==t.candidates.length||!t.promptFeedback){if(null===(s=t.candidates)||void 0===s?void 0:s[0]){const e=t.candidates[0];I(e)&&(o+=`Candidate was blocked due to ${e.finishReason}`,e.finishMessage&&(o+=`: ${e.finishMessage}`))}}else o+="Response was blocked",(null===(e=t.promptFeedback)||void 0===e?void 0:e.blockReason)&&(o+=` due to ${t.promptFeedback.blockReason}`),(null===(n=t.promptFeedback)||void 0===n?void 0:n.blockReasonMessage)&&(o+=`: ${t.promptFeedback.blockReasonMessage}`);return o}function R(t){return this instanceof R?(this.v=t,this):new R(t)}"function"==typeof SuppressedError&&SuppressedError;const S=/^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;async function A(t){const e=[],n=t.getReader();for(;;){const{done:t,value:s}=await n.read();if(t)return T(M(e));e.push(s)}}function b(t){return function(t,e,n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var s,o=n.apply(t,e||[]),i=[];return s={},r("next"),r("throw"),r("return"),s[Symbol.asyncIterator]=function(){return this},s;function r(t){o[t]&&(s[t]=function(e){return new Promise((function(n,s){i.push([t,e,n,s])>1||a(t,e)}))})}function a(t,e){try{(n=o[t](e)).value instanceof R?Promise.resolve(n.value.v).then(c,l):d(i[0][2],n)}catch(t){d(i[0][3],t)}var n}function c(t){a("next",t)}function l(t){a("throw",t)}function d(t,e){t(e),i.shift(),i.length&&a(i[0][0],i[0][1])}}(this,arguments,(function*(){const e=t.getReader();for(;;){const{value:t,done:n}=yield R(e.read());if(n)break;yield yield R(T(t))}}))}function M(t){const e=t[t.length-1],n={promptFeedback:null==e?void 0:e.promptFeedback};for(const e of t)if(e.candidates)for(const t of e.candidates){const e=t.index;if(n.candidates||(n.candidates=[]),n.candidates[e]||(n.candidates[e]={index:t.index}),n.candidates[e].citationMetadata=t.citationMetadata,n.candidates[e].finishReason=t.finishReason,n.candidates[e].finishMessage=t.finishMessage,n.candidates[e].safetyRatings=t.safetyRatings,t.content&&t.content.parts){n.candidates[e].content||(n.candidates[e].content={role:t.content.role||"user",parts:[]});const s={};for(const o of t.content.parts)o.text&&(s.text=o.text),o.functionCall&&(s.functionCall=o.functionCall),0===Object.keys(s).length&&(s.text=""),n.candidates[e].content.parts.push(s)}}return n}async function x(t,e,n,s){return function(t){const e=function(t){const e=t.getReader();return new ReadableStream({start(t){let n="";return function s(){return e.read().then((({value:e,done:o})=>{if(o)return n.trim()?void t.error(new u("Failed to parse stream")):void t.close();n+=e;let i,r=n.match(S);for(;r;){try{i=JSON.parse(r[1])}catch(e){return void t.error(new u(`Error parsing JSON response: "${r[1]}"`))}t.enqueue(i),n=n.substring(r[0].length),r=n.match(S)}return s()}))}()}})}(t.body.pipeThrough(new TextDecoderStream("utf8",{fatal:!0}))),[n,s]=e.tee();return{stream:b(n),response:A(s)}}(await O(e,y.STREAM_GENERATE_CONTENT,t,!0,JSON.stringify(n),s))}async function D(t,e,n,s){const o=await O(e,y.GENERATE_CONTENT,t,!1,JSON.stringify(n),s);return{response:T(await o.json())}}function H(t){if(null!=t)return"string"==typeof t?{role:"system",parts:[{text:t}]}:t.text?{role:"system",parts:[t]}:t.parts?t.role?t:{role:"system",parts:t.parts}:void 0}function L(t){let e=[];if("string"==typeof t)e=[{text:t}];else for(const n of t)"string"==typeof n?e.push({text:n}):e.push(n);return function(t){const e={role:"user",parts:[]},n={role:"function",parts:[]};let s=!1,o=!1;for(const i of t)"functionResponse"in i?(n.parts.push(i),o=!0):(e.parts.push(i),s=!0);if(s&&o)throw new u("Within a single message, FunctionResponse cannot be mixed with other type of part in the request for sending chat message.");if(!s&&!o)throw new u("No content is provided for sending chat message.");return s?e:n}(e)}function P(t){let e;return e=t.contents?t:{contents:[L(t)]},t.systemInstruction&&(e.systemInstruction=H(t.systemInstruction)),e}const $=["text","inlineData","functionCall","functionResponse"],k={user:["text","inlineData"],function:["functionResponse"],model:["text","functionCall"],system:["text"]},F="SILENT_ERROR";class G{constructor(t,e,s,o){this.model=e,this.params=s,this.requestOptions=o,this._history=[],this._sendPromise=Promise.resolve(),this._apiKey=t,(null==s?void 0:s.history)&&(function(t){let e=!1;for(const s of t){const{role:t,parts:o}=s;if(!e&&"user"!==t)throw new u(`First content should be with role 'user', got ${t}`);if(!n.includes(t))throw new u(`Each item should include role field. Got ${t} but valid roles are: ${JSON.stringify(n)}`);if(!Array.isArray(o))throw new u("Content should have 'parts' property with an array of Parts");if(0===o.length)throw new u("Each Content should have at least one part");const i={text:0,inlineData:0,functionCall:0,functionResponse:0,fileData:0};for(const t of o)for(const e of $)e in t&&(i[e]+=1);const r=k[t];for(const e of $)if(!r.includes(e)&&i[e]>0)throw new u(`Content with role '${t}' can't contain '${e}' part`);e=!0}}(s.history),this._history=s.history)}async getHistory(){return await this._sendPromise,this._history}async sendMessage(t){var e,n,s,o,i;await this._sendPromise;const r=L(t),a={safetySettings:null===(e=this.params)||void 0===e?void 0:e.safetySettings,generationConfig:null===(n=this.params)||void 0===n?void 0:n.generationConfig,tools:null===(s=this.params)||void 0===s?void 0:s.tools,toolConfig:null===(o=this.params)||void 0===o?void 0:o.toolConfig,systemInstruction:null===(i=this.params)||void 0===i?void 0:i.systemInstruction,contents:[...this._history,r]};let c;return this._sendPromise=this._sendPromise.then((()=>D(this._apiKey,this.model,a,this.requestOptions))).then((t=>{var e;if(t.response.candidates&&t.response.candidates.length>0){this._history.push(r);const n=Object.assign({parts:[],role:"model"},null===(e=t.response.candidates)||void 0===e?void 0:e[0].content);this._history.push(n)}else{const e=N(t.response);e&&console.warn(`sendMessage() was unsuccessful. ${e}. Inspect response object for details.`)}c=t})),await this._sendPromise,c}async sendMessageStream(t){var e,n,s,o,i;await this._sendPromise;const r=L(t),a={safetySettings:null===(e=this.params)||void 0===e?void 0:e.safetySettings,generationConfig:null===(n=this.params)||void 0===n?void 0:n.generationConfig,tools:null===(s=this.params)||void 0===s?void 0:s.tools,toolConfig:null===(o=this.params)||void 0===o?void 0:o.toolConfig,systemInstruction:null===(i=this.params)||void 0===i?void 0:i.systemInstruction,contents:[...this._history,r]},c=x(this._apiKey,this.model,a,this.requestOptions);return this._sendPromise=this._sendPromise.then((()=>c)).catch((t=>{throw new Error(F)})).then((t=>t.response)).then((t=>{if(t.candidates&&t.candidates.length>0){this._history.push(r);const e=Object.assign({},t.candidates[0].content);e.role||(e.role="model"),this._history.push(e)}else{const e=N(t);e&&console.warn(`sendMessageStream() was unsuccessful. ${e}. Inspect response object for details.`)}})).catch((t=>{t.message!==F&&console.error(t)})),c}}class U{constructor(t,e,n){this.apiKey=t,e.model.includes("/")?this.model=e.model:this.model=`models/${e.model}`,this.generationConfig=e.generationConfig||{},this.safetySettings=e.safetySettings||[],this.tools=e.tools,this.toolConfig=e.toolConfig,this.systemInstruction=H(e.systemInstruction),this.requestOptions=n||{}}async generateContent(t){const e=P(t);return D(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction},e),this.requestOptions)}async generateContentStream(t){const e=P(t);return x(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction},e),this.requestOptions)}startChat(t){return new G(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction},t),this.requestOptions)}async countTokens(t){const e=P(t);return async function(t,e,n,s){return(await O(e,y.COUNT_TOKENS,t,!1,JSON.stringify(Object.assign(Object.assign({},n),{model:e})),s)).json()}(this.apiKey,this.model,e,this.requestOptions)}async embedContent(t){const e="string"==typeof(n=t)||Array.isArray(n)?{content:L(n)}:n;var n;return async function(t,e,n,s){return(await O(e,y.EMBED_CONTENT,t,!1,JSON.stringify(n),s)).json()}(this.apiKey,this.model,e,this.requestOptions)}async batchEmbedContents(t){return async function(t,e,n,s){const o=n.requests.map((t=>Object.assign(Object.assign({},t),{model:e})));return(await O(e,y.BATCH_EMBED_CONTENTS,t,!1,JSON.stringify({requests:o}),s)).json()}(this.apiKey,this.model,t,this.requestOptions)}}e.ij=class{constructor(t){this.apiKey=t}getGenerativeModel(t,e){if(!t.model)throw new u("Must provide a model name. Example: genai.getGenerativeModel({ model: 'my-model-name' })");return new U(this.apiKey,t,e)}}}},o={};t=function(t,e,n,s){return new(n||(n=Promise))((function(o,i){function r(t){try{c(s.next(t))}catch(t){i(t)}}function a(t){try{c(s.throw(t))}catch(t){i(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(r,a)}c((s=s.apply(t,e||[])).next())}))},e=function(t,e){var n,s,o,i,r={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(a){return function(c){return function(a){if(n)throw new TypeError("Generator is already executing.");for(;i&&(i=0,a[0]&&(r=0)),r;)try{if(n=1,s&&(o=2&a[0]?s.return:a[0]?s.throw||((o=s.return)&&o.call(s),0):s.next)&&!(o=o.call(s,a[1])).done)return o;switch(s=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return r.label++,{value:a[1],done:!1};case 5:r.label++,s=a[1],a=[0];continue;case 7:a=r.ops.pop(),r.trys.pop();continue;default:if(!((o=(o=r.trys).length>0&&o[o.length-1])||6!==a[0]&&2!==a[0])){r=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){r.label=a[1];break}if(6===a[0]&&r.label<o[1]){r.label=o[1],o=a;break}if(o&&r.label<o[2]){r.label=o[2],r.ops.push(a);break}o[2]&&r.ops.pop(),r.trys.pop();continue}a=e.call(t,r)}catch(t){a=[6,t],s=0}finally{n=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,c])}}},n=new(0,function t(e){var n=o[e];if(void 0!==n)return n.exports;var i=o[e]={exports:{}};return s[e](i,i.exports,t),i.exports}(445).ij)("AIzaSyBkLwxYev4XNsZ4KjZZR4iZZVPVNKIQwSY"),chrome.runtime.onMessage.addListener((function(s,o,i){if(console.log(o.tab?"from a background:"+o.tab.url:"from the extension"),"get-model"===s)return console.log("received"),function(s){t(this,void 0,void 0,(function(){var t,o;return e(this,(function(e){switch(e.label){case 0:return[4,n.getGenerativeModel({model:"gemini-1.5-flash"}).generateContent("Write a story about a magic backpack.")];case 1:return[4,e.sent().response];case 2:return t=e.sent(),o=t.text(),s({text:o}),[2]}}))}))}(i),!0}))})();