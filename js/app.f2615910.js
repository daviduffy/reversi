(function(e){function t(t){for(var r,a,c=t[0],s=t[1],u=t[2],l=0,d=[];l<c.length;l++)a=c[l],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&d.push(o[a][0]),o[a]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);f&&f(t);while(d.length)d.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,a=1;a<n.length;a++){var s=n[a];0!==o[s]&&(r=!1)}r&&(i.splice(t--,1),e=c(c.s=n[0]))}return e}var r={},o={app:0},i=[];function a(e){return c.p+"js/"+({about:"about"}[e]||e)+"."+{about:"e4461c81"}[e]+".js"}function c(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(e){var t=[],n=o[e];if(0!==n)if(n)t.push(n[2]);else{var r=new Promise((function(t,r){n=o[e]=[t,r]}));t.push(n[2]=r);var i,s=document.createElement("script");s.charset="utf-8",s.timeout=120,c.nc&&s.setAttribute("nonce",c.nc),s.src=a(e);var u=new Error;i=function(t){s.onerror=s.onload=null,clearTimeout(l);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),i=t&&t.target&&t.target.src;u.message="Loading chunk "+e+" failed.\n("+r+": "+i+")",u.name="ChunkLoadError",u.type=r,u.request=i,n[1](u)}o[e]=void 0}};var l=setTimeout((function(){i({type:"timeout",target:s})}),12e4);s.onerror=s.onload=i,document.head.appendChild(s)}return Promise.all(t)},c.m=e,c.c=r,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(n,r,function(t){return e[t]}.bind(null,r));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/reversi/",c.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],u=s.push.bind(s);s.push=t,s=s.slice();for(var l=0;l<s.length;l++)t(s[l]);var f=u;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},2221:function(e,t,n){"use strict";n("7b46")},"56d7":function(e,t,n){"use strict";n.r(t);n("e623"),n("e379"),n("5dc8"),n("37e1");var r=n("2b0e"),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("game")],1)},i=[],a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"game"},[n("div",[n("p",[e._v("Current player: "+e._s(e.currentPlayer))])]),n("div",{staticClass:"controls"},[n("button",{staticClass:"button",on:{click:e.reset}},[e._v("reset")]),n("button",{staticClass:"button",on:{click:e.undo}},[e._v("undo")])]),n("Board"),n("div",[e.gameOver?n("p",[e._v("Game Over")]):e._e(),n("p"),n("p",[e._v("Moves: "+e._s(e.moves))])]),n("style",{tag:"component",attrs:{type:"text/css"}},[e._v(" :root { --side-length: "+e._s(e.sideLength)+" } ")])],1)},c=[],s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"Board"},e._l(e.tiles,(function(t){return n("tile-component",e._b({key:t.key},"tile-component",t,!1))})),1)},u=[],l=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{class:e.containerClasses},[n("button",{class:e.buttonClasses,on:{click:e.handleClick}})])},f=[],d=n("ade3"),v=(n("a9e3"),{name:"TileComponent",props:{index:{type:Number,required:!0},owner:{type:[Boolean,Number],required:!0}},computed:{buttonClasses:function(){var e=this.owner;return Object(d["a"])({Tile__button:!0},"Tile__button--".concat(e||"vacant"),!0)},containerClasses:function(){var e=this.owner;return{Tile:!0,Tile__owned:e}}},methods:{handleClick:function(){if(!1===this.owner){var e={index:this.index};this.$store.dispatch("startClickTile",e)}}}}),h=v,p=(n("ea9a"),n("2877")),m=Object(p["a"])(h,l,f,!1,null,"89a6f208",null),g=m.exports,b={name:"Board",components:{TileComponent:g},computed:{tiles:function(){return this.$store.state.tilesProjection},currentPlayer:function(){return this.$store.state.currentPlayer}}},E=b,y=(n("a3cb"),Object(p["a"])(E,s,u,!1,null,null,null)),T=y.exports,_={name:"Home",components:{Board:T},computed:{sideLength:function(){return this.$store.state.sideLength},currentPlayer:function(){return 1===this.$store.state.currentPlayer?"black":"white"},gameOver:function(){var e=this.$store.state.aggregateAnalytics.gameOver;return e},histogram:function(){var e=this.$store.state.aggregateAnalytics.histogram;return e},moves:function(){var e=this.$store.state.aggregateAnalytics.moves;return e}},methods:{reset:function(){this.$store.dispatch("startResetGame")},undo:function(){this.$store.dispatch("startUndo")}}},O=_,w=(n("2221"),Object(p["a"])(O,a,c,!1,null,null,null)),P=w.exports,S={name:"App",components:{Game:P},beforeMount:function(){var e=this;this.$store.dispatch("startAppSetup").then((function(){return e.$store.dispatch("startReconstituteGame")}))}},x=S,j=(n("5c0b"),Object(p["a"])(x,o,i,!1,null,null,null)),L=j.exports,R=(n("d3b7"),n("3ca3"),n("ddb0"),n("8c4f"));r["a"].use(R["a"]);var C,A=[{path:"/",name:"Game",component:P},{path:"/about",name:"About",component:function(){return n.e("about").then(n.bind(null,"f820"))}}],N=new R["a"]({mode:"history",base:"/reversi/",routes:A}),k=N,G=n("2909"),$=n("5530"),I=(n("99af"),n("fb6a"),n("2f62")),B=(n("d81d"),n("cb29"),"CHANGE_CURRENT_PLAYER"),J="CLICK_TILE",Y={sideLength:8,events:[],currentPlayer:1},M=function(){var e=Y.sideLength,t=new Array(e*e).fill(null).map((function(e,t){return{index:t,owner:!1}}));return 10===Y.sideLength?(t[44].owner=1,t[45].owner=2,t[54].owner=2,t[55].owner=1):8===Y.sideLength&&(t[27].owner=1,t[28].owner=2,t[35].owner=2,t[36].owner=1),t},U=(Object(G["a"])(M()),"reversi"),V=function(){return new Promise((function(e){var t,n=window.localStorage[U];try{t=JSON.parse(n)}catch(r){t={}}e(t)}))},D=function(e){return new Promise((function(t){return V().then((function(n){var r=Object($["a"])(Object($["a"])({},n),e);window.localStorage[U]=JSON.stringify(r),t(r)}))}))},H=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return new Promise((function(t){e?window.localStorage.removeItem(U):window.localStorage[U]=JSON.stringify({events:[]}),t()}))},q=(n("4de4"),n("159b"),function(e){var t=e.state,n=t.tilesProjection,r=t.aggregateAnalytics,o=void 0===r?{}:r,i=o.histogram,a=void 0===i?[]:i,c=n.filter((function(e){var t=e.owner;return!1!==t})),s=100===c.length,u=c.length-4,l={1:0,2:0};n.forEach((function(e){var t=e.owner;l[t]&&(l[t]+=1)}));var f=[].concat(Object(G["a"])(a),[l]),d={gameOver:s,histogram:f,moves:u};return d}),K=n("15fd"),z=n("d4ec"),F=(n("b64b"),n("5a0c")),Q=n.n(F),W=(n("caad6"),n("2532"),function(e){var t=e.index,n=e.sideLength,r=t<n,o=(t+1)%n===0,i=t>=n*n-n,a=t%n===0,c={index:!r&&t-n,location:"top"},s={index:!o&&t+1,location:"right"},u={index:!i&&t+n,location:"bottom"},l={index:!a&&t-1,location:"left"},f={index:!r&&!o&&c.index+1,location:"rightTop"},d={index:!i&&!o&&u.index+1,location:"rightBottom"},v={index:!i&&!a&&u.index-1,location:"leftBottom"},h={index:!r&&!a&&c.index-1,location:"leftTop"};return[h,c,f,l,{index:t,location:"center"},s,v,u,d]}),X=function(e){return{top:function(t){return t-e>=0&&t-e},right:function(e){return(e+1)%10!==0&&e+1},bottom:function(t){return t+e<=e*e&&t+e},left:function(e){return e%10!==0&&e-1},rightTop:function(t){return t-(e-1)},rightBottom:function(t){return t+(e+1)},leftBottom:function(t){return t+(e-1)},leftTop:function(t){return t-(e+1)}}},Z=function(e){var t=e.sideLength,n=e.index,r=e.location,o=r.toLowerCase(),i=function(e){return e<t},a=function(e){return(e+1)%t===0},c=function(e){return e>=t*t-t},s=function(e){return e%t===0};return o.includes("top")&&i(n)||o.includes("right")&&a(n)||o.includes("bottom")&&c(n)||o.includes("left")&&s(n)},ee=function(e){var t=e.currentPlayer,n=e.neighbors,r=e.sideLength,o=e.tiles,i=n.filter((function(e){var n=e.index,i=e.location;if(!1===n)return!1;var a=o[n].owner,c=Z({sideLength:r,index:n,location:i});return!1!==n&&!1!==a&&a!==t&&!c})),a=X(r),c=i.map((function(e){var n=e.index,r=e.location,i=[],c=n,s=!1;do{var u=o[c];if(!u)break;if(!1===u.owner)break;if(u.owner===t){if(u.owner===t){s=!0;break}break}i=[].concat(Object(G["a"])(i),[c]);var l=a[r](c);if(!1===l)break;c=l}while(1);return s?i:[]}));return c.flat()},te=function(e){var t=e.currentPlayer,n=e.index,r=e.prevTiles,o=e.sideLength,i=W({index:n,sideLength:o}),a=ee({currentPlayer:t,index:n,neighbors:i,sideLength:o,tiles:r});if(0===a.length)return{error:!0,index:n};var c=Object(G["a"])(r);return[n].concat(Object(G["a"])(a)).forEach((function(e){c[e].owner=t})),c},ne=(n("5319"),n("ac1f"),n("25f0"),function(){return([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,(function(e){return(e^16*Math.random()>>e/4).toString(16)}))}),re=function e(t){var n=this,r=t.type,o=Object(K["a"])(t,["type"]);Object(z["a"])(this,e),this.type=r,this.id=ne(),this.createdAt=Q()().valueOf(),Object.keys(o||{}).forEach((function(e){n[e]=o[e]}))},oe=function(e){var t=e.prevProjection,n=e.event,r=e.sideLength,o=n.currentPlayer,i=n.index;return te({currentPlayer:o,index:i,prevTiles:t,sideLength:r})},ie=function(e){var t=e.nextPlayer;return t},ae=(C={},Object(d["a"])(C,J,oe),Object(d["a"])(C,B,ie),C),ce=function(e){var t=e.events,n=1,r=Object(G["a"])(M());return t.forEach((function(t){var o=t.type;o===J?r=ae[J]({prevProjection:r,event:t,sideLength:e.sideLength}):o===B&&(n=t.nextPlayer)})),{currentPlayer:n,tilesProjection:r}};r["a"].use(I["a"]);var se=new I["a"].Store({state:Object($["a"])(Object($["a"])({},Y),{},{tilesProjection:M(),error:!1,aggregateAnalytics:{}}),mutations:{SET_SIDE_LENGTH:function(e,t){e.sideLength=t},SET_ERROR_STATE:function(e,t){e.error=t},SET_TILES_PROJECTION:function(e,t){e.tilesProjection=t},SET_EVENTS:function(e,t){e.events=t},SET_CURRENT_PLAYER:function(e,t){e.currentPlayer=t},SET_AGGREGATE_ANALYTICS:function(e,t){e.aggregateAnalytics=t},RECORD_EVENT:function(e,t){e.events=[].concat(Object(G["a"])(e.events),[t])}},actions:{startAppSetup:function(e){var t=e.state;return V().then((function(e){var n=e.events;return n&&n.length>0&&(t.events=n),Promise.resolve("done")}))},startClickTile:function(e,t){var n=e.state,r=e.commit,o=e.dispatch,i=n.currentPlayer,a=1===i?2:1,c=new re(Object($["a"])({type:J,currentPlayer:i},t)),s=new re({type:B,nextPlayer:a});return o("startApplyClickTile",c).then((function(e){var t=e.valid,n=e.index;if(!t)throw r("SET_ERROR_STATE",n),setTimeout((function(){return r("SET_ERROR_STATE",null)}),1e3),new Error("throw to avoid executing remaining actions");o("startRecordEvent",c)})).then((function(){return o("startRecordEvent",s)})).then((function(){return o("startApplyChangePlayer",s)})).then((function(){return o("startTally")})).catch((function(e){console.warn(e)}))},startApplyClickTile:function(e,t){var n=e.state,r=e.commit,o=n.tilesProjection,i=n.sideLength,a=ae[t.type],c=a({prevProjection:o,event:t,sideLength:i});return c.error?{valid:!1,index:c.index}:(r("SET_TILES_PROJECTION",c),{valid:!0})},startApplyChangePlayer:function(e,t){var n=e.commit;n("SET_CURRENT_PLAYER",t.nextPlayer)},startRecordEvent:function(e,t){var n=e.state,r=e.commit;r("RECORD_EVENT",t);var o=n.events;return D({events:o})},startTally:function(e){var t=e.state,n=e.commit,r=q({state:t}),o=r.gameOver,i=r.histogram,a=r.moves;return n("SET_AGGREGATE_ANALYTICS",{gameOver:o,histogram:i,moves:a}),Promise.resolve()},startUndo:function(e){var t=e.state,n=e.commit,r=e.dispatch,o=t.events;if(o.length<=0)console.warn("first move, cannot undo");else{var i=Object(G["a"])(o),a=o[o.length-1];a.type===J?i.pop():i=i.slice(0,i.length-2),n("SET_EVENTS",i),r("startReconstituteGame",{prevEvents:i})}},startReconstituteGame:function(e){var t=e.state,n=e.commit,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},o=r.prevEvents,i=t.events,a=t.sideLength,c={events:o||i,sideLength:a},s=ce(c),u=s.currentPlayer,l=s.tilesProjection,f=q({state:{tilesProjection:l}}),d=f.gameOver,v=f.histogram,h=f.moves;n("SET_TILES_PROJECTION",l),n("SET_CURRENT_PLAYER",u),n("SET_AGGREGATE_ANALYTICS",{gameOver:d,histogram:v,moves:h})},startResetGame:function(e){var t=e.commit,n=Y,r=n.sideLength,o=n.events,i=n.currentPlayer;t("SET_SIDE_LENGTH",r),t("SET_TILES_PROJECTION",M()),t("SET_EVENTS",o),t("SET_CURRENT_PLAYER",i),H()}},modules:{}});r["a"].config.productionTip=!1,new r["a"]({router:k,store:se,render:function(e){return e(L)}}).$mount("#app")},"5c0b":function(e,t,n){"use strict";n("9c0c")},"7b46":function(e,t,n){},"824b":function(e,t,n){},"9c0c":function(e,t,n){},a3cb:function(e,t,n){"use strict";n("b2af")},b2af:function(e,t,n){},ea9a:function(e,t,n){"use strict";n("824b")}});
//# sourceMappingURL=app.f2615910.js.map