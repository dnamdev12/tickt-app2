(this["webpackJsonptickt-web"]=this["webpackJsonptickt-web"]||[]).push([[8],{283:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var n=[],o=!0,a=!1,r=void 0;try{for(var i,l=e[Symbol.iterator]();!(o=(i=l.next()).done)&&(n.push(i.value),!t||n.length!==t);o=!0);}catch(u){a=!0,r=u}finally{try{!o&&l.return&&l.return()}finally{if(a)throw r}}return n}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")},a=n(0),r=s(a),i=s(n(11)),l=s(n(361)),u=s(n(362));function s(e){return e&&e.__esModule?e:{default:e}}var c={overflow:"hidden",position:"relative"};function f(e,t){return"\n    .react-stars-"+t+":before {\n      position: absolute;\n      overflow: hidden;\n      display: block;\n      z-index: 1;\n      top: 0; left: 0;\n      width: 50%;\n      content: attr(data-forhalf);\n      color: "+e+";\n  }"}function p(e){var t=(0,a.useState)(""),n=o(t,2),i=n[0],s=n[1],p=(0,a.useState)(0),d=o(p,2),y=d[0],h=d[1],v=(0,a.useState)([]),b=o(v,2),m=b[0],g=b[1],S=(0,a.useState)(!1),k=o(S,2),M=k[0],w=k[1],C=(0,l.default)(e),I=o(C,2),O=I[0],E=I[1],H=(0,a.useState)(0),V=o(H,2),_=V[0],j=V[1],P=(0,a.useState)(!1),x=o(P,2),T=x[0],D=x[1],N=(0,a.useState)(""),A=o(N,2),L=A[0],R=A[1];function z(e){"undefined"===typeof e&&(e=O.isHalf?Math.floor(y):Math.round(y));for(var t=[],n=0;n<O.count;n++)t.push({active:n<=e-1});return t}function q(e){if(O.edit){var t=Number(e.currentTarget.getAttribute("data-index"));if(O.isHalf){var n=U(e);D(n),n&&(t+=1),j(t)}else t+=1;!function(e){var t=m.filter((function(e){return e.active}));e!==t.length&&g(z(e))}(t)}}function U(e){var t=e.target.getBoundingClientRect(),n=e.clientX-t.left;return(n=Math.round(Math.abs(n)))>t.width/2}function X(){O.edit&&(B(y),g(z()))}function B(e){O.isHalf&&(D(function(e){return e%1===0}(e)),j(Math.floor(e)))}function F(e){if(O.edit){var t=Number(e.currentTarget.getAttribute("data-index")),n=void 0;if(O.isHalf){var o=U(e);D(o),o&&(t+=1),n=o?t:t+.5,j(t)}else n=t+=1;J(n)}}function J(t){t!==y&&(g(z(t)),h(t),e.onChange(t))}return(0,a.useEffect)((function(){var t,n;!function(){var t="react-stars";R(e.classNames+" "+t)}(),t=e.value,n=e.count,h(t<0||t>n?0:t),g(z(e.value)),E(e),s((Math.random()+"").replace(".","")),w(function(e){return!e.isHalf&&e.emptyIcon&&e.filledIcon||e.isHalf&&e.emptyIcon&&e.halfIcon&&e.filledIcon}(e)),j(Math.floor(e.value)),D(e.isHalf&&e.value%1<.5)}),[]),r.default.createElement("div",{className:"react-stars-wrapper-"+i,style:{display:"flex"}},r.default.createElement("div",{tabIndex:O.a11y&&O.edit?0:null,"aria-label":"add rating by typing an integer from 0 to 5 or pressing arrow keys",onKeyDown:function(e){if(O.a11y||O.edit){var t=e.key,n=y,o=Number(t);o?Number.isInteger(o)&&o>0&&o<=O.count&&(n=o):("ArrowUp"===t||"ArrowRight"===t)&&n<O.count?(e.preventDefault(),n+=O.isHalf?.5:1):("ArrowDown"===t||"ArrowLeft"===t)&&n>.5&&(e.preventDefault(),n-=O.isHalf?.5:1),B(n),J(n)}},className:L,style:c},O.isHalf&&function(){return r.default.createElement("style",{dangerouslySetInnerHTML:{__html:M?(e=O.activeColor,"\n          span.react-stars-half > * {\n          color: "+e+";\n      }"):f(O.activeColor,i)}});var e}(),m.map((function(e,t){return r.default.createElement(u.default,{key:t,index:t,active:e.active,config:O,onMouseOver:q,onMouseLeave:X,onClick:F,halfStarHidden:T,halfStarAt:_,isUsingIcons:M,uniqueness:i})})),r.default.createElement("p",{style:{position:"absolute",left:"-200rem"},role:"status"},y)))}p.propTypes={classNames:i.default.string,edit:i.default.bool,half:i.default.bool,value:i.default.number,count:i.default.number,char:i.default.string,size:i.default.number,color:i.default.string,activeColor:i.default.string,emptyIcon:i.default.element,halfIcon:i.default.element,filledIcon:i.default.element,a11y:i.default.bool},p.defaultProps={edit:!0,half:!1,value:0,count:5,char:"\u2605",size:15,color:"gray",activeColor:"#ffd700",a11y:!0,onChange:function(){}},t.default=p},324:function(e,t,n){"use strict";var o=n(0),a=n.n(o);function r(e){return r="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function u(e,t,n){return t&&l(e.prototype,t),n&&l(e,n),e}function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(){return c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},c.apply(this,arguments)}function f(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},o=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),o.forEach((function(t){s(e,t,n[t])}))}return e}function p(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&y(e,t)}function d(e){return d=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},d(e)}function y(e,t){return y=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},y(e,t)}function h(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function v(e,t){return!t||"object"!==typeof t&&"function"!==typeof t?h(e):t}var b={display:"inline-block",borderRadius:"50%",border:"5px double white",width:30,height:30},m={empty:f({},b,{backgroundColor:"#ccc"}),full:f({},b,{backgroundColor:"black"}),placeholder:f({},b,{backgroundColor:"red"})},g=function(e){return a.a.isValidElement(e)?e:"object"===r(e)&&null!==e?a.a.createElement("span",{style:e}):"[object String]"===Object.prototype.toString.call(e)?a.a.createElement("span",{className:e}):void 0},S=function(e){function t(){return i(this,t),v(this,d(t).apply(this,arguments))}return p(t,e),u(t,[{key:"render",value:function(){var e,t=this.props,n=t.index,o=t.inactiveIcon,r=t.activeIcon,i=t.percent,l=t.direction,u=t.readonly,c=t.onClick,f=t.onMouseMove,p=g(o),d=i<100?{}:{visibility:"hidden"},y=g(r),h=(s(e={display:"inline-block",position:"absolute",overflow:"hidden",top:0},"rtl"===l?"right":"left",0),s(e,"width","".concat(i,"%")),e),v={cursor:u?"inherit":"pointer",display:"inline-block",position:"relative"};function b(e){f&&f(n,e)}function m(e){c&&(e.preventDefault(),c(n,e))}return a.a.createElement("span",{style:v,onClick:m,onMouseMove:b,onTouchMove:b,onTouchEnd:m},a.a.createElement("span",{style:d},p),a.a.createElement("span",{style:h},y))}}]),t}(a.a.PureComponent),k=function(e){function t(e){var n;return i(this,t),(n=v(this,d(t).call(this,e))).state={displayValue:n.props.value,interacting:!1},n.onMouseLeave=n.onMouseLeave.bind(h(h(n))),n.symbolMouseMove=n.symbolMouseMove.bind(h(h(n))),n.symbolClick=n.symbolClick.bind(h(h(n))),n}return p(t,e),u(t,[{key:"UNSAFE_componentWillReceiveProps",value:function(e){var t=this.props.value!==e.value;this.setState((function(n){return{displayValue:t?e.value:n.displayValue}}))}},{key:"componentDidUpdate",value:function(e,t){if(e.value===this.props.value)return t.interacting&&!this.state.interacting?this.props.onHover():void(this.state.interacting&&this.props.onHover(this.state.displayValue))}},{key:"symbolClick",value:function(e,t){var n=this.calculateDisplayValue(e,t);this.props.onClick(n,t)}},{key:"symbolMouseMove",value:function(e,t){var n=this.calculateDisplayValue(e,t);this.setState({interacting:!this.props.readonly,displayValue:n})}},{key:"onMouseLeave",value:function(){this.setState({displayValue:this.props.value,interacting:!1})}},{key:"calculateDisplayValue",value:function(e,t){var n=this.calculateHoverPercentage(t),o=Math.ceil(n%1*this.props.fractions)/this.props.fractions,a=Math.pow(10,3),r=e+(Math.floor(n)+Math.floor(o*a)/a);return r>0?r>this.props.totalSymbols?this.props.totalSymbols:r:1/this.props.fractions}},{key:"calculateHoverPercentage",value:function(e){var t=e.nativeEvent.type.indexOf("touch")>-1?e.nativeEvent.type.indexOf("touchend")>-1?e.changedTouches[0].clientX:e.touches[0].clientX:e.clientX,n=e.target.getBoundingClientRect(),o="rtl"===this.props.direction?n.right-t:t-n.left;return o<0?0:o/n.width}},{key:"render",value:function(){var e,t=this.props,n=t.readonly,o=t.quiet,r=t.totalSymbols,i=t.value,l=t.placeholderValue,u=t.direction,s=t.emptySymbol,p=t.fullSymbol,d=t.placeholderSymbol,y=t.className,h=t.id,v=t.style,b=t.tabIndex,m=this.state,g=m.displayValue,k=m.interacting,M=[],w=[].concat(s),C=[].concat(p),I=[].concat(d),O=0!==l&&0===i&&!k;e=O?l:o?i:g;for(var E=Math.floor(e),H=0;H<r;H++){var V=void 0;V=H-E<0?100:H-E===0?100*(e-H):0,M.push(a.a.createElement(S,c({key:H,index:H,readonly:n,inactiveIcon:w[H%w.length],activeIcon:O?I[H%C.length]:C[H%C.length],percent:V,direction:u},!n&&{onClick:this.symbolClick,onMouseMove:this.symbolMouseMove,onTouchMove:this.symbolMouseMove,onTouchEnd:this.symbolClick})))}return a.a.createElement("span",c({id:h,style:f({},v,{display:"inline-block",direction:u}),className:y,tabIndex:b,"aria-label":this.props["aria-label"]},!n&&{onMouseLeave:this.onMouseLeave}),M)}}]),t}(a.a.PureComponent);function M(){}M._name="react_rating_noop";var w=function(e){function t(e){var n;return i(this,t),(n=v(this,d(t).call(this,e))).state={value:e.initialRating},n.handleClick=n.handleClick.bind(h(h(n))),n.handleHover=n.handleHover.bind(h(h(n))),n}return p(t,e),u(t,[{key:"UNSAFE_componentWillReceiveProps",value:function(e){this.setState({value:e.initialRating})}},{key:"handleClick",value:function(e,t){var n=this,o=this.translateDisplayValueToValue(e);this.props.onClick(o),this.state.value!==o&&this.setState({value:o},(function(){return n.props.onChange(n.state.value)}))}},{key:"handleHover",value:function(e){var t=void 0===e?e:this.translateDisplayValueToValue(e);this.props.onHover(t)}},{key:"translateDisplayValueToValue",value:function(e){var t=e*this.props.step+this.props.start;return t===this.props.start?t+1/this.props.fractions:t}},{key:"tranlateValueToDisplayValue",value:function(e){return void 0===e?0:(e-this.props.start)/this.props.step}},{key:"render",value:function(){var e=this.props,t=e.step,n=e.emptySymbol,o=e.fullSymbol,r=e.placeholderSymbol,i=e.readonly,l=e.quiet,u=e.fractions,s=e.direction,c=e.start,f=e.stop,p=e.id,d=e.className,y=e.style,h=e.tabIndex;return a.a.createElement(k,{id:p,style:y,className:d,tabIndex:h,"aria-label":this.props["aria-label"],totalSymbols:function(e,t,n){return Math.floor((t-e)/n)}(c,f,t),value:this.tranlateValueToDisplayValue(this.state.value),placeholderValue:this.tranlateValueToDisplayValue(this.props.placeholderRating),readonly:i,quiet:l,fractions:u,direction:s,emptySymbol:n,fullSymbol:o,placeholderSymbol:r,onClick:this.handleClick,onHover:this.handleHover})}}]),t}(a.a.PureComponent);w.defaultProps={start:0,stop:5,step:1,readonly:!1,quiet:!1,fractions:1,direction:"ltr",onHover:M,onClick:M,onChange:M,emptySymbol:m.empty,fullSymbol:m.full,placeholderSymbol:m.placeholder},t.a=w},361:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var n=[],o=!0,a=!1,r=void 0;try{for(var i,l=e[Symbol.iterator]();!(o=(i=l.next()).done)&&(n.push(i.value),!t||n.length!==t);o=!0);}catch(u){a=!0,r=u}finally{try{!o&&l.return&&l.return()}finally{if(a)throw r}}return n}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")};t.default=function(e){var t=(0,a.useState)(e.count),n=o(t,2),r=n[0],i=n[1],l=(0,a.useState)(e.size),u=o(l,2),s=u[0],c=u[1],f=(0,a.useState)(e.char),p=o(f,2),d=p[0],y=p[1],h=(0,a.useState)(e.color),v=o(h,2),b=v[0],m=v[1],g=(0,a.useState)(e.activeColor),S=o(g,2),k=S[0],M=S[1],w=(0,a.useState)(e.isHalf),C=o(w,2),I=C[0],O=C[1],E=(0,a.useState)(e.edit),H=o(E,2),V=H[0],_=H[1],j=(0,a.useState)(e.emptyIcon),P=o(j,2),x=P[0],T=P[1],D=(0,a.useState)(e.halfIcon),N=o(D,2),A=N[0],L=N[1],R=(0,a.useState)(e.filledIcon),z=o(R,2),q=z[0],U=z[1],X=(0,a.useState)(e.a11y),B=o(X,2),F=B[0],J=B[1];return[{count:r,size:s,char:d,color:b,activeColor:k,isHalf:I,edit:V,emptyIcon:x,halfIcon:A,filledIcon:q,a11y:F},function(e){i(e.count),c(e.size),y(e.char),m(e.color),M(e.activeColor),O(e.isHalf),_(e.edit),T(e.emptyIcon),L(e.halfIcon),U(e.filledIcon),J(e.a11y)}]};var a=n(0)},362:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e};t.default=function(e){var t=e.index,n=e.active,a=e.config,r=e.onMouseOver,u=e.onMouseLeave,s=e.onClick,c=e.halfStarHidden,f=e.halfStarAt,p=e.isUsingIcons,d=e.uniqueness,y=a.color,h=a.activeColor,v=a.size,b=a.char,m=a.isHalf,g=a.edit,S=a.halfIcon,k=a.emptyIcon,M=a.filledIcon,w="",C=!1;m&&!c&&f===t&&(w=p?"react-stars-half":"react-stars-"+d,C=!0);var I=o({},l,{color:n?h:y,cursor:g?"pointer":"default",fontSize:v+"px"});return i.default.createElement("span",{className:w,style:I,key:t,"data-index":t,"data-forhalf":M?t:b,onMouseOver:r,onMouseMove:r,onMouseLeave:u,onClick:s},p?n?M:!n&&C?S:k:b)};var a,r=n(0),i=(a=r)&&a.__esModule?a:{default:a};var l={position:"relative",overflow:"hidden",cursor:"pointer",display:"block",float:"left"}}}]);
//# sourceMappingURL=8.e68da480.chunk.js.map