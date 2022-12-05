"use strict";(self.webpackChunk_infuseai_piperider_ui=self.webpackChunk_infuseai_piperider_ui||[]).push([[299],{5462:function(n,e,t){t.d(e,{B:function(){return d}});var i=t(2175),r=t(7932),l=t(3660),o=t(7615),a=t(913),s=t(6569),u=t(5887),c=["title","children","allowModalPopup","height"];function d(n){var e=n.title,t=n.children,d=n.allowModalPopup,x=n.height,m=void 0===x?300:x,h=(0,r.Z)(n,c),p=(0,l.qY)(),j=p.onOpen,f=p.isOpen,b=p.onClose;return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(o.kC,(0,i.Z)((0,i.Z)({minHeight:"".concat(m,"px"),maxHeight:"".concat(m,"px"),bg:"whiteAlpha.700",rounded:"md",onClick:function(){return d&&j()}},h),{},{children:t})),d&&(0,u.jsxs)(a.u_,{size:"full",isOpen:f,onClose:b,children:[(0,u.jsx)(a.ZA,{}),(0,u.jsxs)(a.hz,{p:12,children:[(0,u.jsx)(a.xB,{children:e}),(0,u.jsx)(a.ol,{}),(0,u.jsx)(a.fe,{children:t}),(0,u.jsx)(a.mz,{children:(0,u.jsx)(o.kC,{mt:6,w:"100%",direction:"row",justify:"center",children:(0,u.jsx)(s.zx,{colorScheme:"blue",mr:3,onClick:b,children:"Close"})})})]})]})]})}},5871:function(n,e,t){t.d(e,{UZ:function(){return x}});var i=t(2175),r=t(2295),l=t(4574),o=t(169),a=t(2221),s=t(4361),u=t(8188),c=t(5887),d="#4780A8";function x(n){var e=n.quantileData,t=n.animation,x=void 0!==t&&t;r.kL.register(l.LU,l.aS,r.f$,r.uw);var m=function(n){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t=Object.assign({},e),r=(0,s.uB)(n),l=r.max,o=r.min,c=r.mean,x=r.q1,m=r.q3,h=[{text:"box region",fillStyle:u.k8},{text:"p50",fillStyle:d}];return(0,i.Z)({responsive:!0,maintainAspectRatio:!1,layout:{padding:10},indexAxis:"y",scales:{x:{offset:!0},y:{display:!1}},plugins:{legend:{position:"bottom",labels:{boxHeight:10,boxWidth:10,padding:15,generateLabels:function(){return h.map((function(n){return{lineWidth:0,text:n.text,fillStyle:n.fillStyle}}))}}},tooltip:{callbacks:{label:function(){var n=(0,a.J8)(o),e=(0,a.J8)(l),t=(0,a.J8)(c),i=(0,a.J8)(x),r=(0,a.J8)(m);return"MIN: ".concat(n," / P25: ").concat(i," / P50 (median): ").concat(t," / P75: ").concat(r," / MAX: ").concat(e)}}}}},t)}(e,{animation:x}),h=function(n){var e=(0,s.uB)(n),t=e.max,i=e.min,r=e.mean,l=e.q1,o=e.q3;return{labels:[""],datasets:[{data:[{min:i,q1:l,mean:r,q3:o,max:t,median:r,items:[],outliers:[]}],borderWidth:1,itemRadius:1,medianColor:d,meanBackgroundColor:d,backgroundColor:u.k8,borderColor:u.Q,hitPadding:10}]}}(e);return(0,c.jsx)(o.kL,{type:"boxplot",data:h,options:m,plugins:[r.De,r.u]})}},9837:function(n,e,t){t.d(e,{Q:function(){return m}});var i=t(2175),r=t(1431),l=t(7932),o=t(2599),a=t(7615),s=t(6835),u=t(2904),c=t(7437),d=t(5887),x=["breadcrumbList"];function m(n){var e=n.breadcrumbList,t=(0,l.Z)(n,x),m=(0,u.TH)(),h=(0,r.Z)(m,1)[0];return(0,d.jsx)(a.kC,(0,i.Z)((0,i.Z)({alignItems:"center",h:"".concat(c.A0,"px"),p:4,borderBottom:"1px solid",borderBottomColor:"gray.300"},t),{},{children:(0,d.jsx)(s.aG,{fontSize:"lg",separator:(0,d.jsx)(o.XC,{color:"gray.500",boxSize:6}),children:e.filter((function(n){return n.label&&n.path})).map((function(n,e){var t=n.label,i=n.path;return(0,d.jsx)(s.gN,{isCurrentPage:h===i,children:(0,d.jsx)(s.At,{"data-cy":"breadcrumb-link",to:i,as:u.rU,cursor:"pointer",display:"flex",alignItems:"center",children:decodeURIComponent(t)})},e)}))})}))}},7708:function(n,e,t){t.d(e,{r:function(){return d}});var i=t(7615),r=t(2753),l=t(225),o=t.n(l),a=t(4361),s=t(5462),u=t(4777),c=t(5887);function d(n){var e=n.hasAnimation,t=n.hasSplitView,l=n.baseColumnDatum,s=n.targetColumnDatum,d=n.tabIndex,m=n.onSelectTab,h=l||{},p=h.type,j=h.topk,f=h.histogram,b=h.trues,g=h.falses,v=s||{},C=v.type,y=v.topk,S=v.histogram,k=v.trues,D=v.falses,w=null!==j&&void 0!==j?j:y,P=null!==p&&void 0!==p?p:C,z=null!==f&&void 0!==f?f:S,A=null!==b&&void 0!==b?b:k,O=null!==g&&void 0!==g?g:D,T=o()(A)&&o()(O),R=z&&P,Z="other"===P,B=T||R||w||Z,H="string"===P?u.d4:"Histogram";return(0,c.jsxs)(i.xu,{pb:10,children:[(0,c.jsx)(i.xv,{fontSize:"xl",mb:3,children:"Visualizations"}),(0,c.jsx)(i.iz,{mb:3}),B?(0,c.jsxs)(r.mQ,{isLazy:!0,index:d,onChange:function(n){return m(n)},children:[(0,c.jsxs)(r.td,{children:[w&&(0,c.jsx)(r.OK,{children:"Top Categories"}),R&&(0,c.jsx)(r.OK,{children:H}),T&&(0,c.jsx)(r.OK,{children:"Boolean"}),Z&&(0,c.jsx)(r.OK,{children:"Other"})]}),(0,c.jsxs)(r.nP,{children:[w&&(0,c.jsx)(r.x4,{px:0,children:x(l,s,t,"topk",e)}),R&&(0,c.jsx)(r.x4,{px:0,children:x(l,s,t,"histogram",e)}),T&&(0,c.jsx)(r.x4,{px:0,children:x(l,s,t,"pie",e)}),Z&&(0,c.jsx)(r.x4,{px:0,children:x(l,s,t)})]})]}):(0,a.y2)({valids:null===l||void 0===l?void 0:l.valids,schema_type:null===l||void 0===l?void 0:l.schema_type})]})}function x(n,e,t,r,l){return(0,c.jsxs)(i.rj,{templateColumns:t?"1fr 1fr":"1fr",gap:10,children:[(0,c.jsx)(i.P4,{minWidth:0,children:(0,c.jsx)(s.B,{px:0,title:null===n||void 0===n?void 0:n.name,children:(0,a.SH)(n,e,r,l)})}),t&&(0,c.jsx)(i.P4,{minWidth:0,children:null!==e&&(0,c.jsx)(s.B,{p:0,title:null===e||void 0===e?void 0:e.name,children:(0,a.SH)(e,n,r,l)})})]})}},2471:function(n,e,t){t.d(e,{t:function(){return c}});var i=t(7615),r=t(4361),l=t(6367),o=t(2448),a=t(3354),s=t(5794),u=t(5887);function c(n){var e=n.columnDatum,t=n.hasAnimation,c=(0,s.Wx)(e),d=!!t&&{};return(0,u.jsxs)(i.kC,{direction:"column",pb:6,children:[(0,u.jsx)(i.xv,{fontSize:"xl",children:"Data Composition"}),(0,u.jsx)(i.iz,{my:3}),(0,u.jsx)(i.xu,{h:"4em",flexGrow:1,children:c?(0,u.jsx)(l.Wi,{data:c,animation:d}):(0,r.y2)({})}),(0,u.jsxs)(i.xu,{children:[(0,u.jsx)(o.P,{columnDatum:e,width:"100%"}),(0,u.jsx)(a.Q,{columnDatum:e,width:"100%"})]})]})}},962:function(n,e,t){t.d(e,{E:function(){return s}});var i=t(7615),r=t(4361),l=t(2221),o=t(1958),a=t(5887);function s(n){var e=n.columnDatum;return(0,a.jsxs)(i.xu,{children:[(0,a.jsxs)(i.xv,{fontSize:"xl",children:[e?(0,l.B1)(null===e||void 0===e?void 0:e.type):"Type "," Statistics"]}),(0,a.jsx)(i.iz,{my:3}),e?(0,a.jsx)(o.Y,{columnDatum:e,width:"100%"}):(0,r.y2)({})]})}},4641:function(n,e,t){t.d(e,{M:function(){return s}});var i=t(7615),r=t(4361),l=t(5871),o=t(5717),a=t(5887);function s(n){var e=n.columnDatum,t=e||{},s=t.p50,u=t.max,c=t.min,d=t.p25,x=t.p75;return(0,a.jsxs)(i.xu,{bg:"gray.50",minWidth:"0px",children:[(0,a.jsx)(i.xv,{fontSize:"xl",children:"Quantile Data"}),(0,a.jsx)(i.iz,{my:3}),e?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(i.xu,{my:5,children:(0,a.jsx)(l.UZ,{quantileData:{p50:s,max:u,min:c,p25:d,p75:x}})}),(0,a.jsx)(o.d,{columnDatum:e})]}):(0,r.y2)({})]})}},2061:function(n,e,t){t.d(e,{mk:function(){return a.mk},Ox:function(){return l.O},FC:function(){return i.FC},ll:function(){return a.ll},rH:function(){return r.rH},SR:function(){return r.SR},Lp:function(){return o.Lp},jr:function(){return o.jr}});var i=t(9408),r=(t(3344),t(5462),t(5871),t(6367),t(3517),t(2626),t(4361),t(6878),t(2948),t(5569)),l=t(1039),o=(t(7708),t(2471),t(962),t(346),t(4641),t(1055)),a=(t(7768),t(6708),t(1831))},9299:function(n,e,t){t.r(e),t.d(e,{default:function(){return O}});var i=t(1431),r=t(7615),l=t(2753),o=t(2904),a=t(1756),s=t(4181),u=t(2471),c=t(7708),d=t(2732),x=t(7437),m=t(962),h=t(4641),p=t(5607),j=t(5794),f=t(2282),b=t(4236),g=t(9837),v=t(8145),C=t(421),y=t(3015),S=t(5322),k=t(1039),D=t(2622),w=t(1055),P=t(1831),z=t(2061),A=t(5887);function O(n){var e,t,O,R=n.data,Z=n.columnName,B=n.tableName;(0,w.jr)("Comparison Report: Table Column Details"),(0,w.Lp)({eventName:P.mk.PAGE_VIEW,eventProperties:{type:P.bB,page:"column-details-page"}});var H=R.base.tables,W=R.input.tables,_=(0,o.TH)(),L=(0,i.Z)(_,2)[1],q=(0,a.useState)(0),Q=(0,i.Z)(q,2),I=Q[0],M=Q[1],N=0===Z.length;(0,y.n)((function(n){return n.setReportRawData}))({base:R.base,input:R.input});var E=y.n.getState(),F=E.tableColumnsOnly,K=void 0===F?[]:F,J=E.assertionsOnly,G=K.find((function(n){return(0,i.Z)(n,1)[0]===B}));if(!B||!H||!W||!G)return(0,A.jsx)(s.o,{isSingleReport:!1,children:(0,A.jsx)(p.J,{text:"No profile data found for table name: ".concat(B)})});var U=(0,i.Z)(G,3),Y=U[1],V=Y.base,X=Y.target,$=U[2],nn=H[B],en=W[B],tn=(null===nn||void 0===nn?void 0:nn.columns)||{},rn=(null===en||void 0===en?void 0:en.columns)||{},ln=tn[Z],on=rn[Z],an=on||ln,sn=(ln||{}).type,un=(on||{}).type,cn=(0,z.SR)((null===J||void 0===J||null===(e=J.base)||void 0===e?void 0:e.filter((function(n){return(null===n||void 0===n?void 0:n.table)===B})))||[]),dn=cn.failed,xn=cn.total,mn=(0,z.SR)((null===J||void 0===J||null===(t=J.target)||void 0===t?void 0:t.filter((function(n){return(null===n||void 0===n?void 0:n.table)===B})))||[]),hn=mn.failed,pn=mn.total,jn=(0,S.gq)(B,Z),fn=(0,j.MM)(an),bn=fn.backgroundColor,gn=fn.icon;return(0,A.jsx)(s.o,{isSingleReport:!1,maxHeight:x.t4,children:(0,A.jsxs)(r.rj,{width:"inherit",templateColumns:"1fr 2fr",children:[(0,A.jsx)(r.P4,{colSpan:3,children:(0,A.jsx)(g.Q,{breadcrumbList:jn})}),(0,A.jsx)(r.P4,{overflowY:"scroll",maxHeight:x.t4,children:(0,A.jsx)(d._,{tableColEntry:G,currentTable:B,currentColumn:Z,onSelect:function(n){var e=n.tableName,t=n.columnName;M(0),L("/tables/".concat(e,"/columns/").concat(t))}})}),N?(0,A.jsxs)(r.P4,{maxHeight:x.t4,overflowY:"auto",p:10,children:[(0,A.jsx)(C.Q,{title:B,subtitle:"Table",mb:5,infoTip:null===(O=en||nn)||void 0===O?void 0:O.description}),(0,A.jsxs)(l.mQ,{defaultIndex:0,children:[(0,A.jsxs)(l.td,{children:[(0,A.jsx)(l.OK,{children:"Overview"}),(0,A.jsx)(l.OK,{children:"Assertions"}),(0,A.jsx)(l.OK,{children:"Schema"})]}),(0,A.jsxs)(l.nP,{children:[(0,A.jsxs)(l.x4,{children:[(0,A.jsx)(T,{}),(0,A.jsxs)(r.rj,{templateColumns:"1fr 1px 1fr",gap:3,children:[(0,A.jsx)(f.m,{tableDatum:nn}),(0,A.jsx)(r.iz,{orientation:"vertical"}),(0,A.jsx)(f.m,{tableDatum:en})]})]}),(0,A.jsxs)(l.x4,{children:[Number(xn)>0&&(0,A.jsx)(r.kC,{mb:5,children:(0,A.jsx)(D.z,{baseAssertionFailed:dn,baseAssertionTotal:xn,targetAssertionFailed:hn,targetAssertionTotal:pn})}),(0,A.jsx)(r.rj,{templateColumns:"1fr",gap:3,height:"100%",children:(0,A.jsx)(k.O,{filterString:B,caseSensitiveFilter:!0,comparableAssertions:J,tableSize:"sm"})})]}),(0,A.jsxs)(l.x4,{children:[(0,A.jsx)(r.kC,{pb:3,children:(0,A.jsx)(v.Q,{fontWeight:"semibold",color:"gray.600",added:$.added,deleted:$.deleted,changed:$.changed})}),(0,A.jsx)(r.rj,{templateColumns:"1fr",gap:3,height:"100%",children:(0,A.jsx)(b.r,{baseTableEntryDatum:V,targetTableEntryDatum:X,onSelect:function(){}})})]})]})]})]}):(0,A.jsxs)(r.rj,{templateColumns:"1fr 1fr",width:"100%",maxHeight:x.t4,overflowY:"auto",children:[(0,A.jsxs)(r.P4,{colSpan:2,rowSpan:2,p:9,children:[(0,A.jsx)(C.Q,{title:Z,subtitle:null===an||void 0===an?void 0:an.schema_type,infoTip:(null===on||void 0===on?void 0:on.description)||(null===ln||void 0===ln?void 0:ln.description),mb:5,borderBottom:x.dx,icon:gn,iconColor:bn}),(0,A.jsx)(T,{})]}),(0,A.jsx)(r.P4,{colSpan:2,px:9,py:2,bg:"gray.50",children:(0,A.jsxs)(r.rj,{templateColumns:"1fr 1fr",gap:8,minWidth:0,children:[(0,A.jsx)(u.t,{columnDatum:ln}),(0,A.jsx)(u.t,{columnDatum:on})]})}),((0,j.jl)(sn)||(0,j.jl)(un))&&(0,A.jsx)(r.P4,{colSpan:2,gridRow:"span 1",px:9,py:2,bg:"gray.50",children:(0,A.jsxs)(r.rj,{templateColumns:"1fr 1fr",gap:8,children:[(0,A.jsx)(m.E,{columnDatum:ln}),(0,A.jsx)(m.E,{columnDatum:on})]})}),((0,j.hG)(sn)||(0,j.hG)(un))&&(0,A.jsx)(r.P4,{colSpan:2,gridRow:"span 1",p:9,bg:"gray.50",children:(0,A.jsxs)(r.rj,{templateColumns:"1fr 1fr",gap:8,children:[(0,A.jsx)(h.M,{columnDatum:ln}),(0,A.jsx)(h.M,{columnDatum:on})]})}),(0,A.jsx)(r.P4,{colSpan:2,gridRow:"span 1",minWidth:0,p:9,bg:"gray.50",children:(0,A.jsx)(c.r,{baseColumnDatum:ln,targetColumnDatum:on,hasSplitView:!0,hasAnimation:!0,tabIndex:I,onSelectTab:function(n){return M(n)}})})]})]})})}function T(){return(0,A.jsx)(r.rj,{templateColumns:"1fr 1fr",mb:2,gap:10,children:["Base","Target"].map((function(n,e){return(0,A.jsx)(r.kC,{alignItems:"center",w:"100%",children:(0,A.jsx)(r.xv,{fontWeight:"semibold",fontSize:"2xl",color:"gray.400",w:"100%",children:n})},e)}))})}}}]);
//# sourceMappingURL=299.dcb4938b.chunk.js.map