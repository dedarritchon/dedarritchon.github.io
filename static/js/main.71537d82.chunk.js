(this.webpackJsonpv2=this.webpackJsonpv2||[]).push([[0],{310:function(e,t,a){"use strict";a.r(t);var n=a(2),r=a.n(n),o=a(79),i=a.n(o),c=(a(87),a(88),a(14)),l=a(15),s=a(17),u=a(16),m=a(33),d=a(80),p=a.n(d),f=(a(95),a(23));var h=a(24),b=a(44),v=a(45),y=a(46);function g(){h.b.add(b.a,b.b,v.a,v.b,y.b,y.a)}g();var E=function(){var e=function(e,t){var a=r.a.useState((function(){var a=localStorage.getItem(e);return a?JSON.parse(a):t})),n=Object(m.a)(a,2),o=n[0],i=n[1];return r.a.useEffect((function(){window.localStorage.setItem(e,JSON.stringify(o))}),[o,e]),[o,i]}("theme",void 0),t=Object(m.a)(e,2),a=t[0],o=t[1];return Object(n.useEffect)((function(){a?document.documentElement.classList.add("other"):document.documentElement.classList.remove("other")}),[a]),r.a.createElement("div",{className:"toggle-container"},r.a.createElement(p.a,{className:"toggle",checked:a,onChange:function(e){return o(e.target.checked)},icons:{checked:r.a.createElement(f.a,{icon:["far","sun"],style:{color:"#F39C12"}}),unchecked:r.a.createElement(f.a,{icon:["far","moon"],style:{color:"#F1C40F"}})},"aria-label":"Theme toggle"}))},j=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(l.a)(a,[{key:"render",value:function(){return r.a.createElement(E,null)}}]),a}(n.Component);g();var w=[{href:"https://github.com/dedarritchon",aria:"Visit my GitHub profile to learn more about the open source projects I have contributed to",icon:["fab","github"],label:"Github"},{href:"https://www.linkedin.com/in/dedarritchon/",aria:"Visit my LinkedIn profile to learn more about my education and work experience",icon:["fab","linkedin"],label:"LinkedIn"},{href:"https://open.spotify.com/user/22usjhj23c7c4s52lzjexdtmy",aria:"Visit my Spotify profile to see my favorite artists",icon:["fab","spotify"],label:"Spotify"},{href:"https://drive.google.com/file/d/1ASG5JTR_lZI1b3scN3kKAgulgOTe4uNh/view?usp=sharing",aria:"Visit Google Drive to view and download a copy of my resume",icon:["fas","file-alt"],label:"Resume"},{href:"mailto:dedarritchon@uc.cl",aria:"Open a pre-addressed email prompt to me that you can fill out",icon:["fas","paper-plane"],label:"Email me"}],O=function(e){var t=e.href,a=e.aria,n=e.icon,o=e.label;return r.a.createElement("span",{className:"button"},r.a.createElement("a",{href:t,target:"_self","aria-label":a,rel:"noopener noreferrer"},r.a.createElement(f.a,{className:"icon",icon:n,size:"3x"}),r.a.createElement("span",{className:"icon_title"},o)))},k=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(l.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,w.map((function(e,t){return r.a.createElement(O,Object.assign({},e,{key:t}))})))}}]),a}(n.Component),_=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(l.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"container"},r.a.createElement("h1",{className:"name","aria-label":"My name is Daniel Darritchon"},"Daniel Darritchon"),r.a.createElement("h2",{className:"title","aria-label":"I am a software developer and engineer"},"Software Engineer"))}}]),a}(n.Component),N=a(81),S=a.n(N),I={particles:{number:{value:60,density:{enable:!0,value_area:800}},color:{value:["#c311e7","#90ee90","#4dc9ff","#ffd300","#ff6961"]},shape:{type:"circle",stroke:{width:0,color:"#000000"},polygon:{nb_sides:5},image:{src:"img/github.svg",width:100,height:100}},opacity:{value:.9,random:!1,anim:{enable:!1,speed:1,opacity_min:.5,sync:!1}},size:{value:4,random:!0,anim:{enable:!1,speed:30,size_min:.1,sync:!0}},line_linked:{enable:!0,distance:100,color:"#adadad",opacity:.4,width:1},move:{enable:!0,speed:3,direction:"none",random:!1,straight:!1,out_mode:"bounce",bounce:!1,attract:{enable:!1,rotateX:600,rotateY:1200}}},interactivity:{detect_on:"canvas",events:{onhover:{enable:!0,mode:"repulse"},onclick:{enable:!0,mode:"push"},resize:!0},modes:{grab:{distance:400,line_linked:{opacity:1}},bubble:{distance:400,size:40,duration:2,opacity:8,speed:3},repulse:{distance:100,duration:1},push:{particles_nb:3},remove:{particles_nb:2}}},retina_detect:!0},C=function(e){Object(s.a)(a,e);var t=Object(u.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(l.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{id:"particles-js"},r.a.createElement(S.a,{width:"100vw",height:"100vh",params:I}))}}]),a}(n.Component);var z=function(){return r.a.createElement("div",{className:"App"},r.a.createElement(j,null),r.a.createElement(_,null),r.a.createElement(k,null),r.a.createElement(C,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(z,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},82:function(e,t,a){e.exports=a(310)},87:function(e,t,a){},88:function(e,t,a){}},[[82,1,2]]]);
//# sourceMappingURL=main.71537d82.chunk.js.map