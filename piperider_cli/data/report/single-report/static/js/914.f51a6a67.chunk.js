"use strict";(self.webpackChunk_infuseai_piperider_ui=self.webpackChunk_infuseai_piperider_ui||[]).push([[914],{6669:function(e,t,n){n.r(t),n.d(t,{default:function(){return _}});var l=n(9439),i=n(4190),r=n(7094),a=n(8625),s=n(2791),o=n(8039),d=n(8693),u=n(5650),c=n(3159),m=n(1573),x=n(1892),p=n(8982),j=n(8493),h=n(4304),f=n(4494),b=n(5456),g=n(5575),v=n(7369),C=n(1364),S=n(4749),y=n(5761),w=n(9645),D=n(3530),T=n(5405),P=n(5850),R=n(7677),k=n(184);function _(e){var t,n,_,E=e.data,N=e.columnName,O=e.tableName;(0,T.jr)("Comparison Report: Table Column Details"),(0,T.Lp)({eventName:P.mk.PAGE_VIEW,eventProperties:{type:P.bB,page:"column-details-page"}});var H=E.base.tables,Q=E.input.tables,W=(0,a.TH)(),z=(0,l.Z)(W,2)[1],I=(0,s.useState)(0),M=(0,l.Z)(I,2),Z=M[0],B=M[1],F=0===N.length;(0,S.n)((function(e){return e.setReportRawData}))({base:E.base,input:E.input});var G=S.n.getState(),K=G.tableColumnsOnly,Y=void 0===K?[]:K,L=G.assertionsOnly,V=Y.find((function(e){return(0,l.Z)(e,1)[0]===O}));if(!O||!H||!Q||!V)return(0,k.jsx)(o.o,{isSingleReport:!1,children:(0,k.jsx)(j.J,{text:"No profile data found for table name: ".concat(O)})});var q=(0,l.Z)(V,3),J=q[1],U=J.base,X=J.target,$=q[2],ee=H[O],te=Q[O],ne=(null===ee||void 0===ee?void 0:ee.columns)||{},le=(null===te||void 0===te?void 0:te.columns)||{},ie=ne[N],re=le[N],ae=re||ie,se=(ie||{}).type,oe=(re||{}).type,de=(0,R.SR)((null===L||void 0===L||null===(t=L.base)||void 0===t?void 0:t.filter((function(e){return(null===e||void 0===e?void 0:e.table)===O})))||[]),ue=de.failed,ce=de.total,me=(0,R.SR)((null===L||void 0===L||null===(n=L.target)||void 0===n?void 0:n.filter((function(e){return(null===e||void 0===e?void 0:e.table)===O})))||[]),xe=me.failed,pe=me.total,je=(0,y.gq)(O,N),he=(0,h.MM)(ae),fe=he.backgroundColor,be=he.icon;return(0,k.jsx)(o.o,{isSingleReport:!1,maxHeight:m.t4,children:(0,k.jsxs)(i.rj,{width:"inherit",templateColumns:"1fr 2fr",children:[(0,k.jsx)(i.P4,{colSpan:3,children:(0,k.jsx)(g.Q,{breadcrumbList:je})}),(0,k.jsx)(i.P4,{overflowY:"scroll",maxHeight:m.t4,children:(0,k.jsx)(c._,{tableColEntry:V,currentTable:O,currentColumn:N,onSelect:function(e){var t=e.tableName,n=e.columnName;B(0),z("/tables/".concat(t,"/columns/").concat(n))}})}),F?(0,k.jsxs)(i.P4,{maxHeight:m.t4,overflowY:"auto",p:10,children:[(0,k.jsx)(C.Q,{title:O,subtitle:"Table",mb:5,infoTip:null===(_=te||ee)||void 0===_?void 0:_.description}),(0,k.jsxs)(r.mQ,{defaultIndex:0,children:[(0,k.jsxs)(r.td,{children:[(0,k.jsx)(r.OK,{children:"Overview"}),(0,k.jsx)(r.OK,{children:"Assertions"}),(0,k.jsx)(r.OK,{children:"Schema"})]}),(0,k.jsxs)(r.nP,{children:[(0,k.jsxs)(r.x4,{children:[(0,k.jsx)(A,{}),(0,k.jsxs)(i.rj,{templateColumns:"1fr 1px 1fr",gap:3,children:[(0,k.jsx)(f.m,{tableDatum:ee}),(0,k.jsx)(i.iz,{orientation:"vertical"}),(0,k.jsx)(f.m,{tableDatum:te})]})]}),(0,k.jsxs)(r.x4,{children:[Number(ce)>0&&(0,k.jsx)(i.kC,{mb:5,children:(0,k.jsx)(D.z,{baseAssertionFailed:ue,baseAssertionTotal:ce,targetAssertionFailed:xe,targetAssertionTotal:pe})}),(0,k.jsx)(i.rj,{templateColumns:"1fr",gap:3,height:"100%",children:(0,k.jsx)(w.O,{filterString:O,caseSensitiveFilter:!0,comparableAssertions:L,tableSize:"sm"})})]}),(0,k.jsxs)(r.x4,{children:[(0,k.jsx)(i.kC,{pb:3,children:(0,k.jsx)(v.Q,{fontWeight:"semibold",color:"gray.600",added:$.added,deleted:$.deleted,changed:$.changed})}),(0,k.jsx)(i.rj,{templateColumns:"1fr",gap:3,height:"100%",children:(0,k.jsx)(b.r,{baseTableEntryDatum:U,targetTableEntryDatum:X,onSelect:function(){}})})]})]})]})]}):(0,k.jsxs)(i.rj,{templateColumns:"1fr 1fr",width:"100%",maxHeight:m.t4,overflowY:"auto",children:[(0,k.jsxs)(i.P4,{colSpan:2,rowSpan:2,p:9,children:[(0,k.jsx)(C.Q,{title:N,subtitle:null===ae||void 0===ae?void 0:ae.schema_type,infoTip:(null===re||void 0===re?void 0:re.description)||(null===ie||void 0===ie?void 0:ie.description),mb:5,borderBottom:m.dx,icon:be,iconColor:fe}),(0,k.jsx)(A,{})]}),(0,k.jsx)(i.P4,{colSpan:2,px:9,py:2,bg:"gray.50",children:(0,k.jsxs)(i.rj,{templateColumns:"1fr 1fr",gap:8,minWidth:0,children:[(0,k.jsx)(d.t,{columnDatum:ie}),(0,k.jsx)(d.t,{columnDatum:re})]})}),((0,h.jl)(se)||(0,h.jl)(oe))&&(0,k.jsx)(i.P4,{colSpan:2,gridRow:"span 1",px:9,py:2,bg:"gray.50",children:(0,k.jsxs)(i.rj,{templateColumns:"1fr 1fr",gap:8,children:[(0,k.jsx)(x.E,{columnDatum:ie}),(0,k.jsx)(x.E,{columnDatum:re})]})}),((0,h.hG)(se)||(0,h.hG)(oe))&&(0,k.jsx)(i.P4,{colSpan:2,gridRow:"span 1",p:9,bg:"gray.50",children:(0,k.jsxs)(i.rj,{templateColumns:"1fr 1fr",gap:8,children:[(0,k.jsx)(p.M,{columnDatum:ie}),(0,k.jsx)(p.M,{columnDatum:re})]})}),(0,k.jsx)(i.P4,{colSpan:2,gridRow:"span 1",minWidth:0,p:9,bg:"gray.50",children:(0,k.jsx)(u.r,{baseColumnDatum:ie,targetColumnDatum:re,hasSplitView:!0,hasAnimation:!0,tabIndex:Z,onSelectTab:function(e){return B(e)}})})]})]})})}function A(){return(0,k.jsx)(i.rj,{templateColumns:"1fr 1fr",mb:2,gap:10,children:["Base","Target"].map((function(e,t){return(0,k.jsx)(i.kC,{alignItems:"center",w:"100%",children:(0,k.jsx)(i.xv,{fontWeight:"semibold",fontSize:"2xl",color:"gray.400",w:"100%",children:e})},t)}))})}}}]);
//# sourceMappingURL=914.f51a6a67.chunk.js.map