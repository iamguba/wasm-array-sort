"use strict";(self.webpackChunkcreate_wasm_app=self.webpackChunkcreate_wasm_app||[]).push([[237],{235:(t,e,i)=>{i.a(t,(async(t,n)=>{try{i.d(e,{Nj:()=>r.Nj});var s=i(161),r=i(813),a=t([s]);s=(a.then?(await a)():a)[0],(0,r.lI)(s),n()}catch(t){n(t)}}))},813:(t,e,i)=>{let n;function s(t){n=t}i.d(e,{BZ:()=>P,D1:()=>W,DI:()=>it,FJ:()=>rt,Gu:()=>H,H0:()=>N,J1:()=>et,KN:()=>G,Mq:()=>st,NL:()=>q,Nj:()=>k,O9:()=>K,OL:()=>ot,PR:()=>B,Py:()=>lt,QR:()=>R,Qg:()=>j,Qn:()=>_t,Rj:()=>E,V5:()=>v,VF:()=>M,Xu:()=>T,bk:()=>C,cA:()=>O,cl:()=>$,hH:()=>nt,hW:()=>D,h_:()=>z,jF:()=>Z,kn:()=>tt,lI:()=>s,nq:()=>ct,qv:()=>I,rl:()=>ht,s:()=>L,sd:()=>Q,tM:()=>V,tn:()=>X,u$:()=>x,vS:()=>U,vU:()=>Y,wR:()=>at,xN:()=>J,yc:()=>F}),t=i.hmd(t);const r=new Array(128).fill(void 0);function a(t){return r[t]}r.push(void 0,null,!0,!1);let o=r.length;function c(t){const e=a(t);return function(t){t<132||(r[t]=o,o=t)}(t),e}function h(t){o===r.length&&r.push(r.length+1);const e=o;return o=r[e],r[e]=t,e}let _=new("undefined"==typeof TextDecoder?(0,t.require)("util").TextDecoder:TextDecoder)("utf-8",{ignoreBOM:!0,fatal:!0});_.decode();let l=null;function u(){return null!==l&&0!==l.byteLength||(l=new Uint8Array(n.memory.buffer)),l}function d(t,e){return t>>>=0,_.decode(u().subarray(t,t+e))}function g(t){const e=typeof t;if("number"==e||"boolean"==e||null==t)return`${t}`;if("string"==e)return`"${t}"`;if("symbol"==e){const e=t.description;return null==e?"Symbol":`Symbol(${e})`}if("function"==e){const e=t.name;return"string"==typeof e&&e.length>0?`Function(${e})`:"Function"}if(Array.isArray(t)){const e=t.length;let i="[";e>0&&(i+=g(t[0]));for(let n=1;n<e;n++)i+=", "+g(t[n]);return i+="]",i}const i=/\[object ([^\]]+)\]/.exec(toString.call(t));let n;if(!(i.length>1))return toString.call(t);if(n=i[1],"Object"==n)try{return"Object("+JSON.stringify(t)+")"}catch(t){return"Object"}return t instanceof Error?`${t.name}: ${t.message}\n${t.stack}`:n}let f=0,b=new("undefined"==typeof TextEncoder?(0,t.require)("util").TextEncoder:TextEncoder)("utf-8");const w="function"==typeof b.encodeInto?function(t,e){return b.encodeInto(t,e)}:function(t,e){const i=b.encode(t);return e.set(i),{read:t.length,written:i.length}};function p(t,e,i){if(void 0===i){const i=b.encode(t),n=e(i.length,1)>>>0;return u().subarray(n,n+i.length).set(i),f=i.length,n}let n=t.length,s=e(n,1)>>>0;const r=u();let a=0;for(;a<n;a++){const e=t.charCodeAt(a);if(e>127)break;r[s+a]=e}if(a!==n){0!==a&&(t=t.slice(a)),s=i(s,n,n=a+3*t.length,1)>>>0;const e=u().subarray(s+a,s+n);a+=w(t,e).written,s=i(s,n,a,1)>>>0}return f=a,s}let y=null;function m(){return(null===y||!0===y.buffer.detached||void 0===y.buffer.detached&&y.buffer!==n.memory.buffer)&&(y=new DataView(n.memory.buffer)),y}function A(t,e){try{return t.apply(this,e)}catch(t){n.__wbindgen_exn_store(h(t))}}const S="undefined"==typeof FinalizationRegistry?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry((t=>n.__wbg_sorting_free(t>>>0,1)));class k{static __wrap(t){t>>>=0;const e=Object.create(k.prototype);return e.__wbg_ptr=t,S.register(e,e.__wbg_ptr,e),e}__destroy_into_raw(){const t=this.__wbg_ptr;return this.__wbg_ptr=0,S.unregister(this),t}free(){const t=this.__destroy_into_raw();n.__wbg_sorting_free(t,0)}static new(t){const e=n.sorting_new(t);return k.__wrap(e)}size(){return n.sorting_size(this.__wbg_ptr)>>>0}values(){return c(n.sorting_values(this.__wbg_ptr))}operation(){return c(n.sorting_operation(this.__wbg_ptr))}reads(){return n.sorting_reads(this.__wbg_ptr)>>>0}writes(){return n.sorting_writes(this.__wbg_ptr)>>>0}compares(){return n.sorting_compares(this.__wbg_ptr)>>>0}swaps(){return n.sorting_swaps(this.__wbg_ptr)>>>0}tick(){return 0!==n.sorting_tick(this.__wbg_ptr)}flush(){n.sorting_flush(this.__wbg_ptr)}frame(t){return 0!==n.sorting_frame(this.__wbg_ptr,t)}resetStats(){n.sorting_resetStats(this.__wbg_ptr)}bubble(){n.sorting_bubble(this.__wbg_ptr)}selection(){n.sorting_selection(this.__wbg_ptr)}cocktail(){n.sorting_cocktail(this.__wbg_ptr)}insertion(){n.sorting_insertion(this.__wbg_ptr)}gnome(){n.sorting_gnome(this.__wbg_ptr)}cycle(){n.sorting_cycle(this.__wbg_ptr)}heap(){n.sorting_heap(this.__wbg_ptr)}shell(){n.sorting_shell(this.__wbg_ptr)}oddEven(){n.sorting_oddEven(this.__wbg_ptr)}quickSort(){n.sorting_quickSort(this.__wbg_ptr)}shuffle(){n.sorting_shuffle(this.__wbg_ptr)}reverse(){n.sorting_reverse(this.__wbg_ptr)}}function C(t){c(t)}function v(){return h(new Error)}function x(t,e){const i=p(a(e).stack,n.__wbindgen_malloc,n.__wbindgen_realloc),s=f;m().setInt32(t+4,s,!0),m().setInt32(t+0,i,!0)}function T(t,e){let i,s;try{i=t,s=e,console.error(d(t,e))}finally{n.__wbindgen_free(i,s,1)}}function P(t){return h(a(t))}function I(t){const e=a(t);return"object"==typeof e&&null!==e}function E(t,e){return h(new Error(d(t,e)))}function R(t){return h(t)}function j(t){return h(BigInt.asUintN(64,t))}function F(t,e){return h(d(t,e))}function N(t,e,i){a(t)[c(e)]=c(i)}function z(t){return h(a(t).crypto)}function O(t){return h(a(t).process)}function W(t){return h(a(t).versions)}function q(t){return h(a(t).node)}function H(t){return"string"==typeof a(t)}function L(){return A((function(){return h(t.require)}),arguments)}function $(t){return h(a(t).msCrypto)}function D(){return A((function(t,e){a(t).randomFillSync(c(e))}),arguments)}function M(){return A((function(t,e){a(t).getRandomValues(a(e))}),arguments)}function U(){return h(new Array)}function B(t){return"function"==typeof a(t)}function J(t,e){return h(new Function(d(t,e)))}function V(){return A((function(t,e){return h(a(t).call(a(e)))}),arguments)}function Q(){return h(new Object)}function G(){return A((function(){return h(self.self)}),arguments)}function K(){return A((function(){return h(window.window)}),arguments)}function X(){return A((function(){return h(globalThis.globalThis)}),arguments)}function Z(){return A((function(){return h(i.g.global)}),arguments)}function Y(t){return void 0===a(t)}function tt(t,e,i){a(t)[e>>>0]=c(i)}function et(){return A((function(t,e,i){return h(a(t).call(a(e),a(i)))}),arguments)}function it(t){return h(a(t).buffer)}function nt(t,e,i){return h(new Uint8Array(a(t),e>>>0,i>>>0))}function st(t){return h(new Uint8Array(a(t)))}function rt(t,e,i){a(t).set(a(e),i>>>0)}function at(t,e,i){return h(new Uint16Array(a(t),e>>>0,i>>>0))}function ot(t){return h(new Uint8Array(t>>>0))}function ct(t,e,i){return h(a(t).subarray(e>>>0,i>>>0))}function ht(t,e){const i=p(g(a(e)),n.__wbindgen_malloc,n.__wbindgen_realloc),s=f;m().setInt32(t+4,s,!0),m().setInt32(t+0,i,!0)}function _t(t,e){throw new Error(d(t,e))}function lt(){return h(n.memory)}},237:(t,e,i)=>{i.a(t,(async(t,n)=>{try{i.r(e);var s=i(982),r=t([s]);s=(r.then?(await r)():r)[0];const a={initial:"shuffled",size:512,sortTime:10,algorithm:"bubble"},o=d("canvas"),c=d("settings"),h=[d("play-pause"),d("next-tick"),d("reset"),d("share")],_=[d("reads"),d("writes"),d("compares"),d("swaps"),d("operation"),d("fps")],l=Array.from([d("initial"),d("size"),d("sort-time"),d("algorithm")]),u=new s.A({settingsConfig:a,settingsWrapper:c,settings:l,controls:h,stats:_,canvas:o});function d(t){return document.getElementById(t)}window.renderer=u,n()}catch(g){n(g)}}))},982:(t,e,i)=>{i.a(t,(async(t,n)=>{try{i.d(e,{A:()=>a});var s=i(235),r=t([s]);s=(r.then?(await r)():r)[0];class a{constructor({settingsConfig:t,settingsWrapper:e,settings:i,controls:n,stats:s,canvas:r}){this.maxMobileSize=1024,this.readConfigFromHash(t),this.frame=null,this.framesCount=0,this.animationStartAt=null,this.sortState="idle",this.initCanvas(r),this.initControls(n),this.initArray(),this.initSettingsProps(e,i),this.initStats(s),this.drawSettings(),this.draw()}animate(){const t=Number(this.settingsConfig.sortTime);if(this.sortState="sorting",!this.sortArray.frame(t))return this.draw(),this.stopAnimate(),void this.drawIdleState();this.draw(),this.framesCount++,this.frame=window.requestAnimationFrame((()=>{this.animate()}))}stopAnimate(){window.cancelAnimationFrame(this.frame),this.frame=null,this.playPause.innerText="play_arrow",this.reset.disabled=!1,this.next.disabled=!1,this.sortState="paused"}nextTick(){this.sortArray.tick()?(this.settingsWrapper.classList.add("disabled"),this.draw()):this.drawIdleState()}draw(){this.drawArray(),this.drawStats()}drawArray(){const t=this.sortArray.operation(),e=t?t.Read:null;this.ctx.clearRect(0,0,this.canvasWidth+10,this.canvasHeight+10),this.sortArray.values().forEach(((t,i)=>{i===e?this.drawArrayElement(i,t,"white"):this.drawArrayElement(i,t)}))}drawArrayElement(t,e,i=null){const n=this.hPerElement*e,s=this.wPerElement*t,r=this.canvasHeight-n,a=e/this.sortArray.size()*270;this.ctx.fillStyle=i||`hsl(${a}, 80%, 50%)`,this.ctx.fillRect(s,r,this.wPerElement,n)}drawStats(){this.reads.innerText=this.sortArray.reads(),this.writes.innerText=this.sortArray.writes(),this.compares.innerText=this.sortArray.compares(),this.swaps.innerText=this.sortArray.swaps(),this.operation.innerText=this.getOperationDesc();const t="sorting"===this.sortState&&this.animationStartAt?this.framesCount/(Date.now()-this.animationStartAt)*1e3:0;this.fps.innerText=t.toFixed(1)}drawSettings(){for(const[t,e]of Object.entries(this.settingsConfig)){const i=this.settingsProps[t];for(const t in i){const n=i[t];t==e?n.classList.remove("enabled"):n.classList.add("enabled")}}}drawIdleState(){this.settingsWrapper.classList.remove("disabled"),this.playPause.disabled=!0,this.next.disabled=!0,this.sortState="idle"}handleInitialClick(t){this.handleSettingsClick(t,"initial")&&(this.initArrayInitial(),this.draw(),this.playPause.disabled=!1,this.next.disabled=!1)}handleSizeClick(t){this.handleSettingsClick(t,"size",!0)&&(this.initArray(),this.draw(),this.playPause.disabled=!1,this.next.disabled=!1)}handleSortTimeClick(t){this.handleSettingsClick(t,"sortTime",!0)}handleAlgorithmClick(t){this.handleSettingsClick(t,"algorithm")&&"idle"===this.sortState&&(this.initArrayInitial(),this.draw(),this.playPause.disabled=!1,this.next.disabled=!1)}handleSettingsClick(t,e,i=!1){if(!t.classList.contains("enabled")||this.frame)return!1;const n=i?Number(t.dataset.value):t.dataset.value;return this.settingsConfig={...this.settingsConfig,[e]:n},this.drawSettings(),this.setConfigToHash(),!0}handlePlayPauseClick(){this.settingsWrapper.classList.add("disabled"),this.frame?this.stopAnimate():(this.playPause.innerText="pause",this.reset.disabled=!0,this.next.disabled=!0,this.animationStartAt=Date.now(),this.framesCount=0,this.animate())}handleNextTickClick(){this.nextTick()}handleResetClick(){this.frame&&this.stopAnimate(),this.initArray(),this.draw(),this.settingsWrapper.classList.remove("disabled"),this.playPause.disabled=!1}handleShareClick(){this.share.disabled=!0,navigator.clipboard.writeText(window.location.href).then((()=>{this.share.innerText="download_done"})).catch((t=>{console.error("Failed to copy link to clipboard: ",t)})).finally((()=>{setTimeout((()=>{this.share.innerText="ios_share",this.share.disabled=!1}),1e3)}))}handlePresetClick(t){this.settingsConfig={...this.settingsConfig,algorithm:t.dataset.algo,initial:t.dataset.initial},this.stopAnimate(),this.setConfigToHash(),this.initArray(),this.drawIdleState(),this.drawSettings(),this.draw(),this.playPause.disabled=!1,this.next.disabled=!1}readConfigFromHash(t){const e=window.location.hash.substring(1);if(e)try{const i=JSON.parse(decodeURIComponent(e));this.settingsConfig={...t,...i},this.isMobile()&&(this.settingsConfig.size=Math.min(this.settingsConfig.size,this.maxMobileSize),this.setConfigToHash())}catch(t){}else this.settingsConfig={...t},this.setConfigToHash()}setConfigToHash(){const t=encodeURIComponent(JSON.stringify(this.settingsConfig));window.location.hash=t}initCanvas(t){this.canvas=t,this.ctx=t.getContext("2d"),this.canvasWidth=t.width,this.canvasHeight=t.height}initControls(t){const[e,i,n,s]=t;this.playPause=e,this.next=i,this.reset=n,this.share=s}initSettingsProps(t,e){this.settingsWrapper=t;const i={};for(const t of e){const e={},n=t.dataset.key??t.id,s=Array.from(t.querySelectorAll("p"));for(const t of s)e[t.dataset.value]=t,this.isMobile()&&"size"===n&&Number(t.dataset.value)>this.maxMobileSize&&t.classList.add("mobile-hide");i[n]=e}this.settingsProps=i}initStats(t){const[e,i,n,s,r,a]=t;this.reads=e,this.writes=i,this.compares=n,this.swaps=s,this.operation=r,this.fps=a}initArray(){this.sortArray=s.Nj.new(Number(this.settingsConfig.size)),this.initArrayInitial(),this.wPerElement=this.canvasWidth/this.sortArray.size(),this.hPerElement=this.canvasHeight/this.sortArray.size()}initArrayInitial(){switch(this.settingsConfig.initial){case"shuffled":this.sortArray.shuffle();break;case"reversed":this.sortArray.reverse()}this.sortArray.flush(),this.sortArray.resetStats(),this.initAlgorithm()}initAlgorithm(){switch(this.settingsConfig.algorithm){case"bubble":this.sortArray.bubble();break;case"selection":this.sortArray.selection();break;case"cocktail":this.sortArray.cocktail();break;case"insertion":this.sortArray.insertion();break;case"gnome":this.sortArray.gnome();break;case"cycle":this.sortArray.cycle();break;case"heap":this.sortArray.heap();break;case"shell":this.sortArray.shell();break;case"oddEven":this.sortArray.oddEven();break;case"quickSort":this.sortArray.quickSort()}}getOperationDesc(){const t=this.sortArray.operation();return t&&"string"==typeof t?t:t&&t.Read?`Read(${t.Read})`:t&&t.Write?`Write(${t.Write[0]}, ${t.Write[1]})`:"-"}isMobile(){return[/Android/i,/webOS/i,/iPhone/i,/iPad/i,/iPod/i,/BlackBerry/i,/Windows Phone/i].some((t=>navigator.userAgent.match(t)))}}n()}catch(t){n(t)}}))},161:(t,e,i)=>{var n=i(813);t.exports=i.v(e,t.id,"294cc667caa644ed9be8",{"./wasm_array_sort_bg.js":{__wbindgen_object_drop_ref:n.bk,__wbg_new_abda76e883ba8a5f:n.V5,__wbg_stack_658279fe44541cf6:n.u$,__wbg_error_f851667af71bcfc6:n.Xu,__wbindgen_object_clone_ref:n.BZ,__wbindgen_is_object:n.qv,__wbindgen_error_new:n.Rj,__wbindgen_number_new:n.QR,__wbindgen_bigint_from_u64:n.Qg,__wbindgen_string_new:n.yc,__wbg_set_20cbc34131e76824:n.H0,__wbg_crypto_1d1f22824a6a080c:n.h_,__wbg_process_4a72847cc503995b:n.cA,__wbg_versions_f686565e586dd935:n.D1,__wbg_node_104a2ff8d6ea03a2:n.NL,__wbindgen_is_string:n.Gu,__wbg_require_cca90b1a94a0255b:n.s,__wbg_msCrypto_eb05e62b530a1508:n.cl,__wbg_randomFillSync_5c9c955aa56b6049:n.hW,__wbg_getRandomValues_3aa56aa6edec874c:n.VF,__wbg_new_a220cf903aa02ca2:n.vS,__wbindgen_is_function:n.PR,__wbg_newnoargs_76313bd6ff35d0f2:n.xN,__wbg_call_1084a111329e68ce:n.tM,__wbg_new_525245e2b9901204:n.sd,__wbg_self_3093d5d1f7bcb682:n.KN,__wbg_window_3bcfc4d31bc012f8:n.O9,__wbg_globalThis_86b222e13bdf32ed:n.tn,__wbg_global_e5a3fe56f8be9485:n.jF,__wbindgen_is_undefined:n.vU,__wbg_set_673dda6c73d19609:n.kn,__wbg_call_89af060b4e1523f2:n.J1,__wbg_buffer_b7b08af79b0b0974:n.DI,__wbg_newwithbyteoffsetandlength_8a2cb9ca96b27ec9:n.hH,__wbg_new_ea1883e1e5e86686:n.Mq,__wbg_set_d1e79e2388520f18:n.FJ,__wbg_newwithbyteoffsetandlength_bd3d5191e8925067:n.wR,__wbg_newwithlength_ec548f448387c968:n.OL,__wbg_subarray_7c2e3576afe181d1:n.nq,__wbindgen_debug_string:n.rl,__wbindgen_throw:n.Qn,__wbindgen_memory:n.Py}})}}]);