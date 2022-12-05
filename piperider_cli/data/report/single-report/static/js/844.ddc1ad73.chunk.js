"use strict";(self.webpackChunk_infuseai_piperider_ui=self.webpackChunk_infuseai_piperider_ui||[]).push([[844],{5462:function(n,e,t){t.d(e,{B:function(){return d}});var i=t(2175),r=t(7932),l=t(3660),o=t(7615),a=t(913),s=t(6569),c=t(5887),u=["title","children","allowModalPopup","height"];function d(n){var e=n.title,t=n.children,d=n.allowModalPopup,x=n.height,m=void 0===x?300:x,h=(0,r.Z)(n,u),p=(0,l.qY)(),j=p.onOpen,f=p.isOpen,b=p.onClose;return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(o.kC,(0,i.Z)((0,i.Z)({minHeight:"".concat(m,"px"),maxHeight:"".concat(m,"px"),bg:"whiteAlpha.700",rounded:"md",onClick:function(){return d&&j()}},h),{},{children:t})),d&&(0,c.jsxs)(a.u_,{size:"full",isOpen:f,onClose:b,children:[(0,c.jsx)(a.ZA,{}),(0,c.jsxs)(a.hz,{p:12,children:[(0,c.jsx)(a.xB,{children:e}),(0,c.jsx)(a.ol,{}),(0,c.jsx)(a.fe,{children:t}),(0,c.jsx)(a.mz,{children:(0,c.jsx)(o.kC,{mt:6,w:"100%",direction:"row",justify:"center",children:(0,c.jsx)(s.zx,{colorScheme:"blue",mr:3,onClick:b,children:"Close"})})})]})]})]})}},5871:function(n,e,t){t.d(e,{UZ:function(){return x}});var i=t(2175),r=t(2295),l=t(4574),o=t(169),a=t(2221),s=t(4361),c=t(8188),u=t(5887),d="#4780A8";function x(n){var e=n.quantileData,t=n.animation,x=void 0!==t&&t;r.kL.register(l.LU,l.aS,r.f$,r.uw);var m=function(n){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t=Object.assign({},e),r=(0,s.uB)(n),l=r.max,o=r.min,u=r.mean,x=r.q1,m=r.q3,h=[{text:"box region",fillStyle:c.k8},{text:"p50",fillStyle:d}];return(0,i.Z)({responsive:!0,maintainAspectRatio:!1,layout:{padding:10},indexAxis:"y",scales:{x:{offset:!0},y:{display:!1}},plugins:{legend:{position:"bottom",labels:{boxHeight:10,boxWidth:10,padding:15,generateLabels:function(){return h.map((function(n){return{lineWidth:0,text:n.text,fillStyle:n.fillStyle}}))}}},tooltip:{callbacks:{label:function(){var n=(0,a.J8)(o),e=(0,a.J8)(l),t=(0,a.J8)(u),i=(0,a.J8)(x),r=(0,a.J8)(m);return"MIN: ".concat(n," / P25: ").concat(i," / P50 (median): ").concat(t," / P75: ").concat(r," / MAX: ").concat(e)}}}}},t)}(e,{animation:x}),h=function(n){var e=(0,s.uB)(n),t=e.max,i=e.min,r=e.mean,l=e.q1,o=e.q3;return{labels:[""],datasets:[{data:[{min:i,q1:l,mean:r,q3:o,max:t,median:r,items:[],outliers:[]}],borderWidth:1,itemRadius:1,medianColor:d,meanBackgroundColor:d,backgroundColor:c.k8,borderColor:c.Q,hitPadding:10}]}}(e);return(0,u.jsx)(o.kL,{type:"boxplot",data:h,options:m,plugins:[r.De,r.u]})}},9837:function(n,e,t){t.d(e,{Q:function(){return m}});var i=t(2175),r=t(1431),l=t(7932),o=t(2599),a=t(7615),s=t(6835),c=t(2904),u=t(7437),d=t(5887),x=["breadcrumbList"];function m(n){var e=n.breadcrumbList,t=(0,l.Z)(n,x),m=(0,c.TH)(),h=(0,r.Z)(m,1)[0];return(0,d.jsx)(a.kC,(0,i.Z)((0,i.Z)({alignItems:"center",h:"".concat(u.A0,"px"),p:4,borderBottom:"1px solid",borderBottomColor:"gray.300"},t),{},{children:(0,d.jsx)(s.aG,{fontSize:"lg",separator:(0,d.jsx)(o.XC,{color:"gray.500",boxSize:6}),children:e.filter((function(n){return n.label&&n.path})).map((function(n,e){var t=n.label,i=n.path;return(0,d.jsx)(s.gN,{isCurrentPage:h===i,children:(0,d.jsx)(s.At,{"data-cy":"breadcrumb-link",to:i,as:c.rU,cursor:"pointer",display:"flex",alignItems:"center",children:decodeURIComponent(t)})},e)}))})}))}},7708:function(n,e,t){t.d(e,{r:function(){return d}});var i=t(7615),r=t(2753),l=t(225),o=t.n(l),a=t(4361),s=t(5462),c=t(4777),u=t(5887);function d(n){var e=n.hasAnimation,t=n.hasSplitView,l=n.baseColumnDatum,s=n.targetColumnDatum,d=n.tabIndex,m=n.onSelectTab,h=l||{},p=h.type,j=h.topk,f=h.histogram,b=h.trues,g=h.falses,v=s||{},y=v.type,C=v.topk,S=v.histogram,k=v.trues,w=v.falses,D=null!==j&&void 0!==j?j:C,P=null!==p&&void 0!==p?p:y,O=null!==f&&void 0!==f?f:S,z=null!==b&&void 0!==b?b:k,A=null!==g&&void 0!==g?g:w,R=o()(z)&&o()(A),H=O&&P,Z="other"===P,T=R||H||D||Z,_="string"===P?c.d4:"Histogram";return(0,u.jsxs)(i.xu,{pb:10,children:[(0,u.jsx)(i.xv,{fontSize:"xl",mb:3,children:"Visualizations"}),(0,u.jsx)(i.iz,{mb:3}),T?(0,u.jsxs)(r.mQ,{isLazy:!0,index:d,onChange:function(n){return m(n)},children:[(0,u.jsxs)(r.td,{children:[D&&(0,u.jsx)(r.OK,{children:"Top Categories"}),H&&(0,u.jsx)(r.OK,{children:_}),R&&(0,u.jsx)(r.OK,{children:"Boolean"}),Z&&(0,u.jsx)(r.OK,{children:"Other"})]}),(0,u.jsxs)(r.nP,{children:[D&&(0,u.jsx)(r.x4,{px:0,children:x(l,s,t,"topk",e)}),H&&(0,u.jsx)(r.x4,{px:0,children:x(l,s,t,"histogram",e)}),R&&(0,u.jsx)(r.x4,{px:0,children:x(l,s,t,"pie",e)}),Z&&(0,u.jsx)(r.x4,{px:0,children:x(l,s,t)})]})]}):(0,a.y2)({valids:null===l||void 0===l?void 0:l.valids,schema_type:null===l||void 0===l?void 0:l.schema_type})]})}function x(n,e,t,r,l){return(0,u.jsxs)(i.rj,{templateColumns:t?"1fr 1fr":"1fr",gap:10,children:[(0,u.jsx)(i.P4,{minWidth:0,children:(0,u.jsx)(s.B,{px:0,title:null===n||void 0===n?void 0:n.name,children:(0,a.SH)(n,e,r,l)})}),t&&(0,u.jsx)(i.P4,{minWidth:0,children:null!==e&&(0,u.jsx)(s.B,{p:0,title:null===e||void 0===e?void 0:e.name,children:(0,a.SH)(e,n,r,l)})})]})}},2471:function(n,e,t){t.d(e,{t:function(){return u}});var i=t(7615),r=t(4361),l=t(6367),o=t(2448),a=t(3354),s=t(5794),c=t(5887);function u(n){var e=n.columnDatum,t=n.hasAnimation,u=(0,s.Wx)(e),d=!!t&&{};return(0,c.jsxs)(i.kC,{direction:"column",pb:6,children:[(0,c.jsx)(i.xv,{fontSize:"xl",children:"Data Composition"}),(0,c.jsx)(i.iz,{my:3}),(0,c.jsx)(i.xu,{h:"4em",flexGrow:1,children:u?(0,c.jsx)(l.Wi,{data:u,animation:d}):(0,r.y2)({})}),(0,c.jsxs)(i.xu,{children:[(0,c.jsx)(o.P,{columnDatum:e,width:"100%"}),(0,c.jsx)(a.Q,{columnDatum:e,width:"100%"})]})]})}},962:function(n,e,t){t.d(e,{E:function(){return s}});var i=t(7615),r=t(4361),l=t(2221),o=t(1958),a=t(5887);function s(n){var e=n.columnDatum;return(0,a.jsxs)(i.xu,{children:[(0,a.jsxs)(i.xv,{fontSize:"xl",children:[e?(0,l.B1)(null===e||void 0===e?void 0:e.type):"Type "," Statistics"]}),(0,a.jsx)(i.iz,{my:3}),e?(0,a.jsx)(o.Y,{columnDatum:e,width:"100%"}):(0,r.y2)({})]})}},4641:function(n,e,t){t.d(e,{M:function(){return s}});var i=t(7615),r=t(4361),l=t(5871),o=t(5717),a=t(5887);function s(n){var e=n.columnDatum,t=e||{},s=t.p50,c=t.max,u=t.min,d=t.p25,x=t.p75;return(0,a.jsxs)(i.xu,{bg:"gray.50",minWidth:"0px",children:[(0,a.jsx)(i.xv,{fontSize:"xl",children:"Quantile Data"}),(0,a.jsx)(i.iz,{my:3}),e?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(i.xu,{my:5,children:(0,a.jsx)(l.UZ,{quantileData:{p50:s,max:c,min:u,p25:d,p75:x}})}),(0,a.jsx)(o.d,{columnDatum:e})]}):(0,r.y2)({})]})}},2061:function(n,e,t){t.d(e,{mk:function(){return a.mk},Ox:function(){return l.O},FC:function(){return i.FC},ll:function(){return a.ll},rH:function(){return r.rH},SR:function(){return r.SR},Lp:function(){return o.Lp},jr:function(){return o.jr}});var i=t(9408),r=(t(3344),t(5462),t(5871),t(6367),t(3517),t(2626),t(4361),t(6878),t(2948),t(5569)),l=t(1039),o=(t(7708),t(2471),t(962),t(346),t(4641),t(1055)),a=(t(7768),t(6708),t(1831))},1844:function(n,e,t){t.r(e),t.d(e,{default:function(){return k}});var i=t(1431),r=t(7615),l=t(2753),o=t(2904),a=t(1756),s=t(4181),c=t(2471),u=t(7708),d=t(7437),x=t(4641),m=t(4732),h=t(962),p=t(5607),j=t(5794),f=t(2282),b=t(2061),g=t(421),v=t(3015),y=t(5322),C=t(9837),S=t(5887);function k(n){var e,t=n.data,k=n.columnName,w=n.tableName;(0,b.jr)("Single Report: Table Column Details"),(0,b.Lp)({eventName:b.mk.PAGE_VIEW,eventProperties:{type:b.ll,page:"column-details-page"}});var D=(0,o.TH)(),P=(0,i.Z)(D,2)[1],O=(0,a.useState)(0),z=(0,i.Z)(O,2),A=z[0],R=z[1];(0,v.n)((function(n){return n.setReportRawData}))({base:t});var H=v.n.getState(),Z=H.tableColumnsOnly,T=void 0===Z?[]:Z,_=H.assertionsOnly,B=T.find((function(n){return(0,i.Z)(n,1)[0]===w})),L=0===k.length,W=t.tables[w],q=W.columns[k],N=(0,b.SR)((null===_||void 0===_||null===(e=_.base)||void 0===e?void 0:e.filter((function(n){return(null===n||void 0===n?void 0:n.table)===w})))||[]),Q=N.failed,F=N.total,I=q||{},M=I.type,K=I.histogram,E=I.schema_type,J=(0,j.MM)(q),U=J.backgroundColor,Y=J.icon;if(!w||!W||!B)return(0,S.jsx)(s.o,{isSingleReport:!0,children:(0,S.jsx)(p.J,{text:"No profile data found for table name: ".concat(w)})});var G=(0,y.gq)(w,k),V=(0,j.hG)(M);return(0,S.jsx)(s.o,{isSingleReport:!0,maxHeight:d.t4,children:(0,S.jsxs)(r.rj,{width:"inherit",templateColumns:{base:"1fr 2fr"},children:[(0,S.jsx)(r.P4,{colSpan:3,children:(0,S.jsx)(C.Q,{breadcrumbList:G})}),(0,S.jsx)(r.P4,{overflowY:"scroll",maxHeight:d.t4,children:(0,S.jsx)(m._,{tableColEntry:B,currentTable:w,currentColumn:k,onSelect:function(n){var e=n.tableName,t=n.columnName;R(0),P("/tables/".concat(e,"/columns/").concat(t))},singleOnly:!0})}),L?(0,S.jsxs)(r.P4,{maxHeight:d.t4,overflowY:"auto",p:10,children:[(0,S.jsx)(g.Q,{title:W.name,subtitle:"Table",infoTip:W.description,mb:5}),(0,S.jsxs)(l.mQ,{mt:3,defaultIndex:0,children:[(0,S.jsxs)(l.td,{children:[(0,S.jsx)(l.OK,{children:"Overview"}),(0,S.jsx)(l.OK,{children:"Assertions"}),(0,S.jsx)(l.OK,{children:"Schema"})]}),(0,S.jsxs)(l.nP,{children:[(0,S.jsx)(l.x4,{children:(0,S.jsx)(r.rj,{templateColumns:"1fr 1fr",gap:3,children:(0,S.jsx)(f.m,{tableDatum:W})})}),(0,S.jsxs)(l.x4,{children:[Number(F)>0&&(0,S.jsx)(r.kC,{mb:5,children:(0,S.jsx)(b.FC,{total:F,failed:Q})}),(0,S.jsx)(b.Ox,{filterString:W.name,caseSensitiveFilter:!0,comparableAssertions:_,singleOnly:!0,tableSize:"sm"})]}),(0,S.jsx)(l.x4,{children:(0,S.jsx)(b.rH,{baseTableEntryDatum:null===B||void 0===B?void 0:B[1].base,singleOnly:!0,onSelect:function(){}})})]})]})]}):(0,S.jsxs)(r.rj,{templateColumns:"1fr 1fr",templateRows:"8em 1fr 1fr ".concat(V?"1fr":""),gridAutoFlow:"column",width:"100%",pb:5,maxHeight:d.t4,overflowY:"auto",children:[(0,S.jsx)(r.P4,{colSpan:2,p:9,children:(0,S.jsx)(g.Q,{title:k,subtitle:E,infoTip:q.description,icon:Y,iconColor:U,mb:5})}),(0,S.jsx)(r.P4,{colSpan:1,px:10,bg:"gray.50",borderRight:d.dx,children:(0,S.jsx)(c.t,{columnDatum:q,hasAnimation:!0})}),(0,S.jsx)(r.P4,{gridRow:"auto",px:10,bg:"gray.50",borderRight:d.dx,children:(0,j.jl)(M)&&(0,S.jsx)(S.Fragment,{children:(0,S.jsx)(h.E,{columnDatum:q})})}),V&&K&&(0,S.jsx)(r.P4,{bg:"gray.50",minWidth:"1px",borderRight:d.dx,p:10,children:(0,S.jsx)(x.M,{columnDatum:q})}),(0,S.jsx)(r.P4,{colSpan:1,rowSpan:V?3:2,minWidth:0,px:10,bg:"gray.50",children:(0,S.jsx)(u.r,{baseColumnDatum:q,hasAnimation:!0,tabIndex:A,onSelectTab:function(n){return R(n)}})})]})]})})}}}]);
//# sourceMappingURL=844.ddc1ad73.chunk.js.map