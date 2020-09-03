(this.webpackJsonpv2=this.webpackJsonpv2||[]).push([[0],{310:function(e,a,t){"use strict";t.r(a);var n=t(2),r=t.n(n),i=t(79),o=t.n(i),c=(t(87),t(88),t(14)),l=t(15),s=t(17),u=t(16),m=t(33),d=t(80),h=t.n(d),p=(t(95),t(23));var b=t(24),f=t(44),v=t(45),g=t(46);function y(){b.b.add(f.a,f.b,v.a,v.b,g.b,g.a)}y();var E=function(){var e=function(e,a){var t=r.a.useState((function(){var t=localStorage.getItem(e);return t?JSON.parse(t):a})),n=Object(m.a)(t,2),i=n[0],o=n[1];return r.a.useEffect((function(){window.localStorage.setItem(e,JSON.stringify(i))}),[i,e]),[i,o]}("theme",void 0),a=Object(m.a)(e,2),t=a[0],i=a[1];return Object(n.useEffect)((function(){t?document.documentElement.classList.add("other"):document.documentElement.classList.remove("other")}),[t]),r.a.createElement("div",{className:"toggle-container"},r.a.createElement(h.a,{className:"toggle",checked:t,onChange:function(e){return i(e.target.checked)},icons:{checked:r.a.createElement(p.a,{icon:["far","sun"],style:{color:"#F39C12"}}),unchecked:r.a.createElement(p.a,{icon:["far","moon"],style:{color:"#F1C40F"}})},"aria-label":"Theme toggle"}))},w=function(e){Object(s.a)(t,e);var a=Object(u.a)(t);function t(){return Object(c.a)(this,t),a.apply(this,arguments)}return Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement(E,null)}}]),t}(n.Component);y();var O=[{href:"https://github.com/dedarritchon",aria:"Visit my GitHub profile to learn more about the open source projects I have contributed to",icon:["fab","github"],label:"Github"},{href:"https://www.linkedin.com/in/dedarritchon/",aria:"Visit my LinkedIn profile to learn more about my education and work experience",icon:["fab","linkedin"],label:"LinkedIn"},{href:"https://drive.google.com/file/d/1ASG5JTR_lZI1b3scN3kKAgulgOTe4uNh/view?usp=sharing",aria:"Visit Google Drive to view and download a copy of my resume",icon:["fas","file-alt"],label:"Resume"},{href:"mailto:dedarritchon@uc.cl",aria:"Open a pre-addressed email prompt to me that you can fill out",icon:["fas","paper-plane"],label:"Email me"}],k=function(e){var a=e.href,t=e.aria,n=e.icon,i=e.label;return r.a.createElement("span",{className:"button"},r.a.createElement("a",{href:a,target:"_self","aria-label":t,rel:"noopener noreferrer"},r.a.createElement(p.a,{className:"icon",icon:n,size:"3x"}),r.a.createElement("span",{className:"icon_title"},i)))},j=function(e){Object(s.a)(t,e);var a=Object(u.a)(t);function t(){return Object(c.a)(this,t),a.apply(this,arguments)}return Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,O.map((function(e,a){return r.a.createElement(k,Object.assign({},e,{key:a}))})))}}]),t}(n.Component),N=function(e){Object(s.a)(t,e);var a=Object(u.a)(t);function t(){return Object(c.a)(this,t),a.apply(this,arguments)}return Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"container"},r.a.createElement("h1",{className:"name","aria-label":"My name is Daniel Darritchon"},"Daniel Darritchon"),r.a.createElement("h2",{className:"title","aria-label":"I am a software developer and engineer"},"Software Engineer"),r.a.createElement("h3",{className:"Spotify","aria-label":"I am currently listening to"},"Now playing on Spotify"),r.a.createElement("svg",{width:"100%",height:"100%",xmlns:"http://www.w3.org/2000/svg"},r.a.createElement("image",{href:"https://dedarritchon.vercel.app/api/spotify"})))}}]),t}(n.Component),_=t(81),S=t.n(_),I={particles:{number:{value:60,density:{enable:!0,value_area:800}},color:{value:["#c311e7","#90ee90","#4dc9ff","#ffd300","#ff6961"]},shape:{type:"circle",stroke:{width:0,color:"#000000"},polygon:{nb_sides:5},image:{src:"img/github.svg",width:100,height:100}},opacity:{value:.9,random:!1,anim:{enable:!1,speed:1,opacity_min:.5,sync:!1}},size:{value:4,random:!0,anim:{enable:!1,speed:30,size_min:.1,sync:!0}},line_linked:{enable:!0,distance:100,color:"#adadad",opacity:.4,width:1},move:{enable:!0,speed:3,direction:"none",random:!1,straight:!1,out_mode:"bounce",bounce:!1,attract:{enable:!1,rotateX:600,rotateY:1200}}},interactivity:{detect_on:"canvas",events:{onhover:{enable:!0,mode:"repulse"},onclick:{enable:!0,mode:"push"},resize:!0},modes:{grab:{distance:400,line_linked:{opacity:1}},bubble:{distance:400,size:40,duration:2,opacity:8,speed:3},repulse:{distance:100,duration:1},push:{particles_nb:3},remove:{particles_nb:2}}},retina_detect:!0},C=function(e){Object(s.a)(t,e);var a=Object(u.a)(t);function t(){return Object(c.a)(this,t),a.apply(this,arguments)}return Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{id:"particles-js"},r.a.createElement(S.a,{width:"100vw",height:"100vh",params:I}))}}]),t}(n.Component);var z=function(){return r.a.createElement("div",{className:"App"},r.a.createElement(w,null),r.a.createElement(N,null),r.a.createElement(j,null),r.a.createElement(C,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(z,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},82:function(e,a,t){e.exports=t(310)},87:function(e,a,t){},88:function(e,a,t){}},[[82,1,2]]]);
//# sourceMappingURL=main.79790abc.chunk.js.map