(()=>{"use strict";var a,e={572:()=>{const a=window.wp.blocks,e=window.wp.i18n,n=window.wp.blockEditor,t=window.wp.components,r=window.ReactJSXRuntime,i=JSON.parse('{"UU":"narahosting/narahosting-cta"}');(0,a.registerBlockType)(i.UU,{edit:function({attributes:a,setAttributes:i}){const{heading:s,subHeading:o,description:l,buttonText:c,buttonUrl:h,imageUrl:g}=a,d=(0,n.useBlockProps)();return(0,r.jsxs)("div",{...d,children:[(0,r.jsx)(n.InspectorControls,{children:(0,r.jsxs)(t.PanelBody,{title:(0,e.__)("CTA Settings","narahosting-cta"),initialOpen:!0,children:[(0,r.jsx)(t.TextControl,{label:(0,e.__)("Sub Heading","narahosting-cta"),value:o,onChange:a=>i({subHeading:a})}),(0,r.jsx)(t.TextControl,{label:(0,e.__)("Heading","narahosting-cta"),value:s,onChange:a=>i({heading:a})}),(0,r.jsx)(t.TextControl,{label:(0,e.__)("Description","narahosting-cta"),value:l,onChange:a=>i({description:a})}),(0,r.jsx)(t.TextControl,{label:(0,e.__)("Button Text","narahosting-cta"),value:c,onChange:a=>i({buttonText:a})}),(0,r.jsx)(t.TextControl,{label:(0,e.__)("Button URL","narahosting-cta"),value:h,onChange:a=>i({buttonUrl:a})}),(0,r.jsx)(n.MediaUploadCheck,{children:(0,r.jsx)(n.MediaUpload,{onSelect:a=>i({imageUrl:a.url}),allowedTypes:["image"],render:({open:a})=>(0,r.jsx)(t.Button,{onClick:a,variant:"secondary",children:g?(0,e.__)("Change Image","narahosting-cta"):(0,e.__)("Select Image","narahosting-cta")})})})]})}),(0,r.jsxs)("div",{className:"narahosting-cta-block",children:[(0,r.jsxs)("div",{className:"narahosting-cta-content",children:[(0,r.jsx)("div",{className:"narahosting-cta-subheading",children:(0,r.jsx)(n.RichText,{tagName:"p",value:o,onChange:a=>i({subHeading:a}),placeholder:(0,e.__)("Heading…","narahosting-cta")})}),(0,r.jsx)(n.RichText,{tagName:"h2",value:s,onChange:a=>i({heading:a}),placeholder:(0,e.__)("Heading…","narahosting-cta")}),(0,r.jsx)(n.RichText,{tagName:"p",value:l,onChange:a=>i({description:a}),placeholder:(0,e.__)("Description","narahosting-cta")}),(0,r.jsx)("a",{className:"narahosting-cta-button",href:h,target:"_blank",rel:"noopener noreferrer",children:c})]}),(0,r.jsx)("div",{className:"narahosting-cta-image",children:g&&(0,r.jsx)("img",{src:g,alt:""})})]})]})},save:function({attributes:a}){const{heading:e,subHeading:t,description:i,buttonText:s,buttonUrl:o,imageUrl:l}=a,c=n.useBlockProps.save({className:"narahosting-cta-block"});return(0,r.jsxs)("div",{...c,children:[(0,r.jsxs)("div",{className:"narahosting-cta-content",children:[(0,r.jsx)("div",{className:"narahosting-cta-subheading",children:(0,r.jsx)(n.RichText.Content,{tagName:"p",value:t})}),(0,r.jsx)(n.RichText.Content,{tagName:"h2",value:e}),(0,r.jsx)(n.RichText.Content,{tagName:"p",value:i}),(0,r.jsx)("a",{className:"narahosting-cta-button",href:o,target:"_blank",rel:"noopener noreferrer",children:s})]}),(0,r.jsx)("div",{className:"narahosting-cta-image",children:l&&(0,r.jsx)("img",{src:l,alt:""})})]})}})}},n={};function t(a){var r=n[a];if(void 0!==r)return r.exports;var i=n[a]={exports:{}};return e[a](i,i.exports,t),i.exports}t.m=e,a=[],t.O=(e,n,r,i)=>{if(!n){var s=1/0;for(h=0;h<a.length;h++){for(var[n,r,i]=a[h],o=!0,l=0;l<n.length;l++)(!1&i||s>=i)&&Object.keys(t.O).every((a=>t.O[a](n[l])))?n.splice(l--,1):(o=!1,i<s&&(s=i));if(o){a.splice(h--,1);var c=r();void 0!==c&&(e=c)}}return e}i=i||0;for(var h=a.length;h>0&&a[h-1][2]>i;h--)a[h]=a[h-1];a[h]=[n,r,i]},t.o=(a,e)=>Object.prototype.hasOwnProperty.call(a,e),(()=>{var a={619:0,755:0};t.O.j=e=>0===a[e];var e=(e,n)=>{var r,i,[s,o,l]=n,c=0;if(s.some((e=>0!==a[e]))){for(r in o)t.o(o,r)&&(t.m[r]=o[r]);if(l)var h=l(t)}for(e&&e(n);c<s.length;c++)i=s[c],t.o(a,i)&&a[i]&&a[i][0](),a[i]=0;return t.O(h)},n=globalThis.webpackChunknarahosting_cta=globalThis.webpackChunknarahosting_cta||[];n.forEach(e.bind(null,0)),n.push=e.bind(null,n.push.bind(n))})();var r=t.O(void 0,[755],(()=>t(572)));r=t.O(r)})();