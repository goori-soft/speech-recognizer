(this["webpackJsonpspeech-recognizer"]=this["webpackJsonpspeech-recognizer"]||[]).push([[0],{13:function(e,t){e.exports=["Voc\xea pode iniciar o transcritor atrav\xe9s do comando `computador iniciar`","Voc\xea pode encerrar o log atrav\xe9s do comando `computador encerrar`","Tente inserir uma marca\xe7\xe3o com o comando `computador inserir marca\xe7\xe3o`","Limpe as mensagem rapidamente com um comando de voz: `compudar limpar mensagens`","Limpe apenas a \xfaltima mensagem com o comando `computar limpar \xfaltima mensagem`"]},22:function(e,t,n){},29:function(e,t,n){},31:function(e,t,n){},32:function(e,t,n){},33:function(e,t,n){"use strict";n.r(t);var r=n(3),a=n.n(r),i=n(15),o=n.n(i),c=(n(22),n(4)),s=n(8),u=n(6),m=n(5),l=n(14),g=n(17),p=n(2),d=n(23),f=window.SpeechRecognition||window.webkitSpeechRecognition;f?console.log("Ferramenta de reconhecimento de voz est\xe1 ativa!"):console.warn("A ferramenta de reconhecimento de voz n\xe3o est\xe1 dispon\xedvel neste navegador");var v=function(e){Object(u.a)(n,e);var t=Object(m.a)(n);function n(){var e;return Object(c.a)(this,n),(e=t.call(this)).appendHistory=function(){if(e.isIgnoring())return Object(p.a)(e);if(!e.isActivated())return Object(p.a)(e);var t=Date.now(),r=t-e.startTime,a={text:e.currentTransciption,start:e.startTime,end:t,duration:r,type:"transcription"};return e.history.push(a),e.reset(),e.emit(n.events.RESULT,a),Object(p.a)(e)},e.getCommandsCallbacks=function(t){var r=[];return t=t.trim().toLowerCase(),e.commands.map((function(a){return a.name.includes(t)&&(e.emit(n.events.COMMAND,t),r.push({callback:a.callback,argument:t})),a})),r},e.end=function(t){e.isStarted=!1,e.restart()},e.getCurrent=function(){return e.currentTransciption},e.getPreview=function(){var t=Date.now(),n=t-e.startTime;return{text:e.getCurrent(),start:e.startTime,end:t,duration:n,type:"transcription"}},e.handleResult=function(t){if(!e.isActivated())return Object(p.a)(e);var n=Array.from(t.results).map((function(e){return e[0]})).map((function(e){return e.transcript})).join("");if(1==n.split(" ").length&&(e.startTime=Date.now()),e.setTransciption(n),t.results[0].isFinal){var r=e.getCommandsCallbacks(n);(r.length<=0||e.transcribeCommand)&&e.appendHistory(),e.reset();var a,i=Object(g.a)(r);try{for(i.s();!(a=i.n()).done;){var o=a.value;o.callback(o.argument)}}catch(c){i.e(c)}finally{i.f()}}return Object(p.a)(e)},e.init=function(){return e.recognition.interimResults=!0,e.recognition.addEventListener(n.events.RESULT,(function(t){e.handleResult(t)})),e.recognition.addEventListener(n.events.END,e.end),Object(p.a)(e)},e.ignore=function(){return e.ignoring=!0,e.emit(n.events.IGNORE,Object(p.a)(e)),Object(p.a)(e)},e.notIgnore=function(){return e.ignoring=!1,e.emit(n.events.NOT_IGNORE,Object(p.a)(e)),Object(p.a)(e)},e.isActivated=function(){return e.activated},e.isIgnoring=function(){return e.ignoring},e.registerCommand=function(t,r){if("function"==typeof r){var a=t;Array.isArray(t)||(a=[t]);var i={name:a=a.map((function(t){return t.toString().trim().toLowerCase(),t=[e.prefix,t].join(" ").trim()})),callback:r};e.commands.push(i),e.emit(n.events.REGISTER_COMMNAD,i)}},e.reset=function(){e.currentTransciption="",e.startTime=Date.now()},e.restart=function(){e.isActivated()&&e.start()},e.setPrefix=function(t){return e.prefix=t.toString().toLowerCase().trim(),Object(p.a)(e)},e.start=function(){return e.isActivated()||(e.activated=!0,e.emit(n.events.START,Object(p.a)(e))),e.isStarted||(e.recognition.start(),e.isStarted=!0),Object(p.a)(e)},e.stop=function(){return e.isActivated()?(e.activated=!1,e.isStarted&&e.recognition.stop(),e.isStarted=!1,e.currentTransciption="",e.emit(n.events.STOP,Object(p.a)(e)),Object(p.a)(e)):Object(p.a)(e)},e.toggle=function(){e.isStarted?e.stop():e.start()},e.toggleIgnore=function(){return e.ignoring?e.notIgnore():e.ignore(),console.log("ignoring",e.ignoring),Object(p.a)(e)},e.currentTransciption="",e.history=[],e.commands=[],e.prefix="",e.transcribeCommand=!1,e.ignoring=!1,e.recognition=new f,e.activated=!1,e.isStarted=!1,e.startTime=Date.now(),e.events=n.events,e.init(),e}return Object(s.a)(n,[{key:"setTransciption",value:function(e){return this.isActivated()?(this.currentTransciption=e,this.emit(n.events.TRANSCRIPT,e),this):this}}]),n}(d);v.events={END:"end",COMMAND:"command",TRANSCRIPT:"transcript",REGISTER_COMMNAD:"registerCommand",RESULT:"result",START:"start",STOP:"stop",IGNORE:"ignore",NOT_IGNORE:"notIgnore"};var b=new v,h=n(7),j=n.n(h),O=n(13),T=n.n(O),y=n(16),x=(n(29),n(0)),C=function(e){Object(u.a)(n,e);var t=Object(m.a)(n);function n(){var e;Object(c.a)(this,n);for(var r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];return(e=t.call.apply(t,[this].concat(a))).render=function(){var t=null,n=null,r=["button",e.props.type||"primary"];return e.props.icon&&(n=Object(x.jsx)("div",{className:"button-icon",children:Object(x.jsx)(y.a,{icon:e.props.icon})})),e.props.label&&(t=Object(x.jsx)("div",{className:"button-label",children:e.props.label})),Object(x.jsxs)("div",{className:r.join(" "),onClick:e.props.onClick,children:[n,t]})},e}return n}(a.a.Component),S=(n(31),function(e){Object(u.a)(n,e);var t=Object(m.a)(n);function n(e){var r;return Object(c.a)(this,n),(r=t.call(this,e)).componentDidMount=function(){r.canvasCtx=r.canvasRef.current.getContext("2d");navigator.getUserMedia({audio:!0},(function(e){var t=new AudioContext;r.analyser=t.createAnalyser(),t.createMediaStreamSource(e).connect(r.analyser),r.draw()}),r.errorMicRequest)},r.draw=function(){requestAnimationFrame(r.draw);var e=r.canvasRef.current;if(r.canvasCtx){r.canvasCtx.clearRect(0,0,e.width,e.height);var t=r.analyser.frequencyBinCount,n=new Uint8Array(t);r.analyser.getByteFrequencyData(n);var a=0,i=0,o=0,c="#0c6e27";c="function"==typeof r.color?r.color():r.color||"#0c6e27",r.canvasCtx.fillStyle=c;for(var s=0;s<r.barsNum;s++)a=3*s,o=n[s]/3,i=(e.height-o)/2,r.canvasCtx.fillRect(a,i,2,o)}},r.errorMicRequest=function(){console.log("Usu\xe1rio n\xe3o concedeu acesso ao microfone")},r.render=function(){return Object(x.jsx)(x.Fragment,{children:Object(x.jsx)("canvas",{className:"analyser-canvas",ref:r.canvasRef,height:"60",width:"300"})})},r.canvasRef=a.a.createRef(),r.canvasCtx=null,r.analyser=null,r.barsNum=100,r.color=r.props.color||"#0c6e27",r}return n}(a.a.Component)),R=n(10),N=(n(32),"secondary"),w=function(e){Object(u.a)(n,e);var t=Object(m.a)(n);function n(e){var r;return Object(c.a)(this,n),(r=t.call(this,e)).append=function(e){r.history.push(e),r.forceUpdate()},r.componentDidMount=function(){b.start()},r.componentDidUpdate=function(){r.scrollContainer()},r.createDialogBox=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Object(l.a)(Object(l.a)({},e),{},{start:0}),t=arguments.length>1?arguments[1]:void 0;"undefined"==typeof t&&(t=e.start);var n=["dialog-box",e.type];return Object(x.jsxs)("div",{className:n.join(" "),children:[Object(x.jsxs)("div",{className:"stats",children:[r.formatTime(e.start),", ",r.formatSeconds(e.duration)]}),Object(x.jsx)("p",{className:"text",children:e.text})]},t)},r.define=function(){b.ignore(),b.setPrefix(j.a.prefix),b.on(b.events.COMMAND,(function(){r.nextTip()})),b.on(b.events.TRANSCRIPT,(function(e){r.forceUpdate()})),b.on(b.events.RESULT,(function(e){r.append(e)})),b.on(b.events.IGNORE,(function(){r.setState({buttonType:N,buttonIcon:R.b})})),b.on(b.events.NOT_IGNORE,(function(){r.setState({buttonType:"primary",buttonIcon:R.a})})),b.registerCommand(j.a.clearMessages,(function(){r.history=[],r.forceUpdate()})),b.registerCommand(j.a.insertMark,(function(e){r.append({text:"---",type:"mark",start:Date.now(),end:Date.now(),duration:0})})),b.registerCommand(j.a.startLog,(function(){b.notIgnore()})),b.registerCommand(j.a.endLog,(function(){b.ignore()})),b.registerCommand(j.a.cleanLastMessage,(function(){r.history.splice(-1,1),r.forceUpdate()}))},r.formatTime=function(e){var t=new Date(e);return Object(x.jsxs)("span",{children:[t.getHours().toString().padStart(2,"0"),":",t.getMinutes().toString().padStart(2,"0"),":",t.getSeconds().toString().padStart(2,"0")]})},r.formatSeconds=function(e){var t=parseInt(e/1e3);return Object(x.jsxs)("span",{children:[t,"s"]})},r.getHistory=function(){var e=[];for(var t in r.history){var n=r.history[t];e.push(r.createDialogBox(n))}return e},r.getCurrent=function(){if(b.isIgnoring())return null;var e=b.getPreview();return""==e.text.trim()?null:r.createDialogBox(e,"current")},r.getColor=function(){var e="#54BF71";return b.isIgnoring()&&(e="#F58F2A"),e},r.getTip=function(){return T.a[r.state.currentTip]},r.nextTip=function(){var e=r.state.currentTip+1;e>=T.a.length&&(e=0),r.setState({currentTip:e})},r.scrollContainer=function(){var e=r.speecherDialogs.current;e&&e.scrollTo({top:e.scrollHeight,behavior:"smooth"})},r.toggle=function(){b.toggleIgnore()},r.history=[],r.speecherDialogs=a.a.createRef(),r.state={buttonType:N,buttonIcon:R.b,currentTip:0},r.define(),r}return Object(s.a)(n,[{key:"render",value:function(){var e=this;return Object(x.jsxs)("div",{className:"speecher-container",children:[Object(x.jsxs)("div",{className:"speecher-dialogs",ref:this.speecherDialogs,children:[this.getHistory(),this.getCurrent()]}),Object(x.jsx)("div",{className:"speecher-dialogs-shade"}),Object(x.jsxs)("div",{className:"speecher-controller",children:[Object(x.jsx)(C,{type:this.state.buttonType,icon:this.state.buttonIcon,onClick:function(){e.toggle()}}),Object(x.jsx)(S,{color:this.getColor})]}),Object(x.jsx)("div",{className:"speecher-tip",children:this.getTip()})]})}}]),n}(a.a.Component),I=function(e){Object(u.a)(n,e);var t=Object(m.a)(n);function n(){return Object(c.a)(this,n),t.apply(this,arguments)}return Object(s.a)(n,[{key:"render",value:function(){return Object(x.jsx)(x.Fragment,{children:Object(x.jsx)(w,{})})}}]),n}(a.a.Component),A=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,34)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,i=t.getLCP,o=t.getTTFB;n(e),r(e),a(e),i(e),o(e)}))};o.a.render(Object(x.jsx)(a.a.StrictMode,{children:Object(x.jsx)(I,{})}),document.getElementById("root")),A()},7:function(e,t){e.exports={prefix:"computador",cleanLastMessage:["limpar \xfaltima mensagem","apagar \xfaltima mensagem","remover \xfaltima mensagem","limpar a \xfaltima mensagem","apagar a \xfaltima mensagem","remover a \xfaltima mensagem","remova a \xfaltima mensagem","apague a \xfaltima mensagem","limpe a \xfaltima mensagem","remova somente a \xfaltima mensagem","apague somente a \xfaltima mensagem","limpe somente a \xfaltima mensagem"],clearMessages:["apagar mensagem","apagar mensagens","limpar mensagens","limpar mensagem","limpar log","apagar log","apagar todas as mensagens","limpar todas as mensagens"],insertMark:["insira uma marca\xe7\xe3o","insira marca\xe7\xe3o","inserir marca\xe7\xe3o","inserir uma marca\xe7\xe3o","coloque uma marca\xe7\xe3o","coloque marca\xe7\xe3o","marca\xe7\xe3o"],startLog:["iniciar log","iniciar transcri\xe7\xe3o","iniciar","retomar log","resumir log","resumir"],endLog:["encerrar login","para login","encerrar log","encerrar transcri\xe7\xe3o","encerrar","parar log","pausar","pausa"]}}},[[33,1,2]]]);
//# sourceMappingURL=main.2cf8c08c.chunk.js.map