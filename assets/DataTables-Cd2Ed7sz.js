import{g as l,j as e}from"./index-FVIQ9vUH.js";const c=t=>t.map((n,s)=>e.jsx("tr",{children:n.map((r,a)=>e.jsx("td",{children:n[0]==2016&&(a==4||a==5)?"NA":r},a))},s)),h=({data:{isMetro:t,crime:n},closePopup:s})=>{const{data:r,title:a}=l(n,t),i=(a+(t?" - METRO CITIES":" - ALL INDIA")).toUpperCase();return e.jsx("div",{className:"modal-container",children:e.jsxs("div",{className:"table-container",children:[e.jsx("div",{className:"btn-container",children:e.jsx("button",{className:"btn btn-danger",onClick:s,children:"Close"})}),e.jsx("h3",{children:i.toUpperCase()}),e.jsx("div",{className:"table-wrapper",children:e.jsxs("table",{children:[e.jsxs("thead",{children:[e.jsxs("tr",{children:[e.jsx("th",{rowSpan:"2",children:"Year"}),e.jsx("th",{rowSpan:"2",children:"FR Non-Cognizable"}),e.jsx("th",{rowSpan:"2",children:"Final Report False"}),e.jsx("th",{rowSpan:"2",children:"Mistake of Fact or Law or Civil Dispute"}),e.jsx("th",{colSpan:"2",children:"Quashed"}),e.jsx("th",{rowSpan:"2",children:"Convicted"})]}),e.jsxs("tr",{children:[e.jsx("th",{children:"In Investigation Stage"}),e.jsx("th",{children:"In Trial Stage"})]})]}),e.jsx("tbody",{children:c(r)})]})})]})})};export{h as default};
