(this["webpackJsonptickt-web"]=this["webpackJsonptickt-web"]||[]).push([[31],{227:function(e,t,s){"use strict";var n=s(0),r=s.n(n),l=function(e,t){return l=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var s in t)t.hasOwnProperty(s)&&(e[s]=t[s])},l(e,t)};var o=function(){return o=Object.assign||function(e){for(var t,s=1,n=arguments.length;s<n;s++)for(var r in t=arguments[s])Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e},o.apply(this,arguments)};var i="Pixel",a="Percent",c={unit:a,value:.8};function d(e){return"number"===typeof e?{unit:a,value:100*e}:"string"===typeof e?e.match(/^(\d*(\.\d+)?)px$/)?{unit:i,value:parseFloat(e)}:e.match(/^(\d*(\.\d+)?)%$/)?{unit:a,value:parseFloat(e)}:(console.warn('scrollThreshold format is invalid. Valid formats: "120px", "50%"...'),c):(console.warn("scrollThreshold should be string or number"),c)}var h=function(e){function t(t){var s=e.call(this,t)||this;return s.lastScrollTop=0,s.actionTriggered=!1,s.startY=0,s.currentY=0,s.dragging=!1,s.maxPullDownDistance=0,s.getScrollableTarget=function(){return s.props.scrollableTarget instanceof HTMLElement?s.props.scrollableTarget:"string"===typeof s.props.scrollableTarget?document.getElementById(s.props.scrollableTarget):(null===s.props.scrollableTarget&&console.warn("You are trying to pass scrollableTarget but it is null. This might\n        happen because the element may not have been added to DOM yet.\n        See https://github.com/ankeetmaini/react-infinite-scroll-component/issues/59 for more info.\n      "),null)},s.onStart=function(e){s.lastScrollTop||(s.dragging=!0,e instanceof MouseEvent?s.startY=e.pageY:e instanceof TouchEvent&&(s.startY=e.touches[0].pageY),s.currentY=s.startY,s._infScroll&&(s._infScroll.style.willChange="transform",s._infScroll.style.transition="transform 0.2s cubic-bezier(0,0,0.31,1)"))},s.onMove=function(e){s.dragging&&(e instanceof MouseEvent?s.currentY=e.pageY:e instanceof TouchEvent&&(s.currentY=e.touches[0].pageY),s.currentY<s.startY||(s.currentY-s.startY>=Number(s.props.pullDownToRefreshThreshold)&&s.setState({pullToRefreshThresholdBreached:!0}),s.currentY-s.startY>1.5*s.maxPullDownDistance||s._infScroll&&(s._infScroll.style.overflow="visible",s._infScroll.style.transform="translate3d(0px, "+(s.currentY-s.startY)+"px, 0px)")))},s.onEnd=function(){s.startY=0,s.currentY=0,s.dragging=!1,s.state.pullToRefreshThresholdBreached&&(s.props.refreshFunction&&s.props.refreshFunction(),s.setState({pullToRefreshThresholdBreached:!1})),requestAnimationFrame((function(){s._infScroll&&(s._infScroll.style.overflow="auto",s._infScroll.style.transform="none",s._infScroll.style.willChange="unset")}))},s.onScrollListener=function(e){"function"===typeof s.props.onScroll&&setTimeout((function(){return s.props.onScroll&&s.props.onScroll(e)}),0);var t=s.props.height||s._scrollableNode?e.target:document.documentElement.scrollTop?document.documentElement:document.body;s.actionTriggered||((s.props.inverse?s.isElementAtTop(t,s.props.scrollThreshold):s.isElementAtBottom(t,s.props.scrollThreshold))&&s.props.hasMore&&(s.actionTriggered=!0,s.setState({showLoader:!0}),s.props.next&&s.props.next()),s.lastScrollTop=t.scrollTop)},s.state={showLoader:!1,pullToRefreshThresholdBreached:!1,prevDataLength:t.dataLength},s.throttledOnScrollListener=function(e,t,s,n){var r,l=!1,o=0;function i(){r&&clearTimeout(r)}function a(){var a=this,c=Date.now()-o,d=arguments;function h(){o=Date.now(),s.apply(a,d)}function p(){r=void 0}l||(n&&!r&&h(),i(),void 0===n&&c>e?h():!0!==t&&(r=setTimeout(n?p:h,void 0===n?e-c:e)))}return"boolean"!==typeof t&&(n=s,s=t,t=void 0),a.cancel=function(){i(),l=!0},a}(150,s.onScrollListener).bind(s),s.onStart=s.onStart.bind(s),s.onMove=s.onMove.bind(s),s.onEnd=s.onEnd.bind(s),s}return function(e,t){function s(){this.constructor=e}l(e,t),e.prototype=null===t?Object.create(t):(s.prototype=t.prototype,new s)}(t,e),t.prototype.componentDidMount=function(){if("undefined"===typeof this.props.dataLength)throw new Error('mandatory prop "dataLength" is missing. The prop is needed when loading more content. Check README.md for usage');if(this._scrollableNode=this.getScrollableTarget(),this.el=this.props.height?this._infScroll:this._scrollableNode||window,this.el&&this.el.addEventListener("scroll",this.throttledOnScrollListener),"number"===typeof this.props.initialScrollY&&this.el&&this.el instanceof HTMLElement&&this.el.scrollHeight>this.props.initialScrollY&&this.el.scrollTo(0,this.props.initialScrollY),this.props.pullDownToRefresh&&this.el&&(this.el.addEventListener("touchstart",this.onStart),this.el.addEventListener("touchmove",this.onMove),this.el.addEventListener("touchend",this.onEnd),this.el.addEventListener("mousedown",this.onStart),this.el.addEventListener("mousemove",this.onMove),this.el.addEventListener("mouseup",this.onEnd),this.maxPullDownDistance=this._pullDown&&this._pullDown.firstChild&&this._pullDown.firstChild.getBoundingClientRect().height||0,this.forceUpdate(),"function"!==typeof this.props.refreshFunction))throw new Error('Mandatory prop "refreshFunction" missing.\n          Pull Down To Refresh functionality will not work\n          as expected. Check README.md for usage\'')},t.prototype.componentWillUnmount=function(){this.el&&(this.el.removeEventListener("scroll",this.throttledOnScrollListener),this.props.pullDownToRefresh&&(this.el.removeEventListener("touchstart",this.onStart),this.el.removeEventListener("touchmove",this.onMove),this.el.removeEventListener("touchend",this.onEnd),this.el.removeEventListener("mousedown",this.onStart),this.el.removeEventListener("mousemove",this.onMove),this.el.removeEventListener("mouseup",this.onEnd)))},t.prototype.componentDidUpdate=function(e){this.props.dataLength!==e.dataLength&&(this.actionTriggered=!1,this.setState({showLoader:!1}))},t.getDerivedStateFromProps=function(e,t){return e.dataLength!==t.prevDataLength?o(o({},t),{prevDataLength:e.dataLength}):null},t.prototype.isElementAtTop=function(e,t){void 0===t&&(t=.8);var s=e===document.body||e===document.documentElement?window.screen.availHeight:e.clientHeight,n=d(t);return n.unit===i?e.scrollTop<=n.value+s-e.scrollHeight+1:e.scrollTop<=n.value/100+s-e.scrollHeight+1},t.prototype.isElementAtBottom=function(e,t){void 0===t&&(t=.8);var s=e===document.body||e===document.documentElement?window.screen.availHeight:e.clientHeight,n=d(t);return n.unit===i?e.scrollTop+s>=e.scrollHeight-n.value:e.scrollTop+s>=n.value/100*e.scrollHeight},t.prototype.render=function(){var e=this,t=o({height:this.props.height||"auto",overflow:"auto",WebkitOverflowScrolling:"touch"},this.props.style),s=this.props.hasChildren||!!(this.props.children&&this.props.children instanceof Array&&this.props.children.length),n=this.props.pullDownToRefresh&&this.props.height?{overflow:"auto"}:{};return r.a.createElement("div",{style:n,className:"infinite-scroll-component__outerdiv"},r.a.createElement("div",{className:"infinite-scroll-component "+(this.props.className||""),ref:function(t){return e._infScroll=t},style:t},this.props.pullDownToRefresh&&r.a.createElement("div",{style:{position:"relative"},ref:function(t){return e._pullDown=t}},r.a.createElement("div",{style:{position:"absolute",left:0,right:0,top:-1*this.maxPullDownDistance}},this.state.pullToRefreshThresholdBreached?this.props.releaseToRefreshContent:this.props.pullDownToRefreshContent)),this.props.children,!this.state.showLoader&&!s&&this.props.hasMore&&this.props.loader,this.state.showLoader&&this.props.hasMore&&this.props.loader,!this.props.hasMore&&this.props.endMessage))},t}(n.Component);t.a=h},282:function(e,t,s){"use strict";t.a="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADCSURBVHgB7ZSxDoJAEESXE62tDI3J8il0xB/Wjk/xEhtiZa3hzlukECFx50ICBa/gcoSZgdsJRCtzkyAPH46nq6zPlyse9cVqNIYgvFx4tzXVPitZo4ACzMYXIcQiIdARCRmX7JqkClIOW/vvuOAANCQqAAmJDtCGpL+iropMClzT27aDD2v+fXOkRZ7iGWoHX3C/nXNSIjXt3pqlvp8a94mewZh5bScastY8KgAxhwNQcwH6F6HmQkoQbQ3V5ivL4A2SyXb0mzHgZQAAAABJRU5ErkJggg=="},285:function(e,t,s){"use strict";t.a="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAF/SURBVHgBpZNfTsJAEMa/WWKC4gOewB7BIyycwMTEP0/ACcQTIDeAExCewAcTTwC9gdxAvME+SEQTOs60xdSyLVEnaZjdDr/95tspIRNVO7EVUIsJloCAgSWIFlEUDdfhTYiSoG1yZB96RHxfXEmD1ezqrui1yUEcMfcP+P1kNb8m/QVzJ1bG3K01p6PCc6SdoEL0ohCwaazCy0W+SGsM0VzblYMab542TcVQL84YfR9EQ/xZGlEWl1Fav9Ma40yTDfgJJZGqcPJYPwgJSE/FnuAEhGrz8XQHFBspUbej+j6QeBTXrGcXr7uKZE40+cBhuwyiM4YE5PXRGBm2OBET9XZ8RapW3idXzzz0ghITeSxPXcZgXrOTdl7JJx0+69XregOEPtD3ZB/b6UA+jdt06dTY1JOtdy7NlxuZpfzlUHaRqKGW7NrMdijtjFXJdih9sB+gXEtBFWvnwo7L7hXBCkFlB/hgvwYVwQz+EKogkj+nwxwQ6Bz/CVVWs9Ou5l974rNzXy5V5QAAAABJRU5ErkJggg=="},608:function(e,t,s){"use strict";s.r(t);var n=s(37),r=s(44),l=s(41),o=s(17),i=s(0),a=s(31),c=s(20),d=s(76),h=s(285),p=s(282),u=s(93),j=s(66),m=s(15),b=s.n(m),v=s(53),g=s(79),f=s(227),x=s(69),O=s(1),A=function(e){var t=e.isLoading,s=e.searching,n=e.paymentHistory,r=e.paymentDetails,m=e.getPaymentHistory,A=e.getPaymentDetails,_=Object(a.g)(),N=Object(a.h)().search,w=Object(i.useState)(""),y=Object(o.a)(w,2),E=y[0],T=y[1],S=Object(i.useState)(""),L=Object(o.a)(S,2),D=L[0],Y=L[1],C=Object(i.useState)(!1),B=Object(o.a)(C,2),M=B[0],R=B[1],P=Object(i.useState)({totalEarnings:0,totalJobs:0,revenueList:[]}),k=Object(o.a)(P,2),I=k[0],J=k[1],X=Object(i.useState)(1),H=Object(o.a)(X,2),z=H[0],F=H[1],Q=Object(i.useState)(!0),U=Object(o.a)(Q,2),V=U[0],W=U[1];Object(i.useEffect)((function(){var e=new URLSearchParams(N).get("jobId");T(e),e?A(e):m(z,"",!0)}),[N,m,A]);var Z=Object(i.useCallback)(Object(g.debounce)((function(e){return m(1,e,!1)}),1e3),[]);Object(i.useEffect)((function(){console.log({paymentHistory:n});var e,t=n.totalEarnings,s=n.totalJobs,r=n.revenue,o=(null===r||void 0===r?void 0:r.revenueList)||[];(null===o||void 0===o?void 0:o.length)?J((function(e){return{totalEarnings:t,totalJobs:s,revenueList:z>1?[].concat(Object(l.a)(null===e||void 0===e?void 0:e.revenueList),Object(l.a)(o)):o}})):(null===I||void 0===I||null===(e=I.revenueList)||void 0===e?void 0:e.length)&&W(!1)}),[Z,n]);var G=c.a.getItem("userType"),q=I||{},K=q.totalEarnings,$=void 0===K?0:K,ee=q.totalJobs,te=void 0===ee?0:ee,se=q.revenueList,ne=void 0===se?[]:se,re=r||{},le=re.status,oe=re.tradeId,ie=re.specialization,ae=re.tradieId,ce=re.tradieName,de=re.tradieImage,he=re.builderId,pe=re.builderName,ue=re.builderImage,je=re.jobName,me=re.from_date,be=re.to_date,ve=re.totalEarning,ge=re.review,fe=re.rating,xe=re.milestones,Oe=void 0===xe?[]:xe;return t?null:E?Object(O.jsx)("div",{className:"app_wrapper",children:Object(O.jsx)("div",{className:"section_wrapper",children:Object(O.jsx)("div",{className:"custom_container",children:Object(O.jsx)("div",{className:"revenue_detail",children:Object(O.jsxs)("div",{className:"flex_row",children:[Object(O.jsxs)("div",{className:"flex_col_sm_8",children:[Object(O.jsx)("button",{className:"back",onClick:function(){return _.goBack()}}),Object(O.jsx)("ul",{className:"total_count_card",children:Object(O.jsx)("li",{children:Object(O.jsxs)("div",{className:"flex_row center_flex",children:[Object(O.jsx)("div",{className:"flex_col_sm_7",children:Object(O.jsxs)("div",{className:"img_txt_wrap",children:[Object(O.jsx)("figure",{className:"job_img",children:Object(O.jsx)("img",{src:(1===G?ue:de)||d.a,alt:"job-img"})}),Object(O.jsxs)("div",{className:"details",children:[Object(O.jsx)("span",{className:"inner_title",children:je}),Object(O.jsx)("span",{className:"show_label",children:"Active"===le?Object(O.jsx)("label",{children:le}):Object(v.h)(me,be,"MM-DD-YYYY")})]})]})}),Object(O.jsx)("div",{className:"flex_col_sm_5 text-right",children:Object(O.jsx)("span",{className:"sub_title",children:ve})})]})})}),Object(O.jsx)("div",{children:Object(O.jsx)("ul",{className:"milestones_check payment_check",children:Oe.map((function(e){var t=e._id,s=e.milestone_name,n=e.milestoneEarning,r=e.isPhotoevidence,l=e.from_date,o=e.to_date,i=e.status;return Object(O.jsxs)("li",{className:"Pending"!==i&&"Comming"!==i?"check":"disabled",children:[Object(O.jsx)("div",{className:"circle_stepper",children:Object(O.jsx)("span",{})}),Object(O.jsxs)("div",{className:"f_spacebw",children:[Object(O.jsxs)("div",{className:"info",children:[Object(O.jsx)("label",{children:s}),r&&Object(O.jsx)("span",{children:"Photo evidence required"}),Object(O.jsx)("span",{children:Object(v.h)(l,o)})]}),Object(O.jsx)("span",{className:"xs_sub_title",children:n})]})]},t)}))})})]}),Object(O.jsxs)("div",{className:"flex_col_sm_4 col_ruler",children:[Object(O.jsx)("span",{className:"sub_title",children:1===G?"Posted by":"Tradesperson"}),Object(O.jsx)("div",{className:"tradie_card posted_by ",children:Object(O.jsxs)("div",{className:"user_wrap",onClick:function(){return _.push("/".concat(1===G?"builder":"tradie","-info?").concat(1===G?"builder":"trade","Id=").concat(1===G?he:ae))},children:[Object(O.jsx)("figure",{className:"u_img",children:Object(O.jsx)("img",{src:(1===G?ue:de)||d.a,alt:"img",onError:function(e){var t,s;(null===e||void 0===e||null===(t=e.target)||void 0===t?void 0:t.onerror)&&(e.target.onerror=null),(null===e||void 0===e||null===(s=e.target)||void 0===s?void 0:s.src)&&(e.target.src=d.a)}})}),Object(O.jsxs)("div",{className:"details",children:[Object(O.jsx)("span",{className:"name",children:1===G?pe:ce}),Object(O.jsxs)("span",{className:"rating",children:[fe?fe.toFixed(1):0," | ",ge||0," reviews"]})]})]})}),Object(O.jsxs)("div",{className:"relate",children:[Object(O.jsx)("span",{className:"sub_title",children:"Job details"}),Object(O.jsx)("span",{className:"edit_icon",title:"More",onClick:function(){return _.push("/job-details-page?jobId=".concat(E).concat(1===G?"&tradeId=".concat(oe,"&specializationId=").concat(null===ie||void 0===ie?void 0:ie[0]):""))},children:Object(O.jsx)("img",{src:p.a,alt:"more"})})]})]})]})})})})}):Object(O.jsx)("div",{className:"app_wrapper",children:Object(O.jsx)("div",{className:"section_wrapper",children:Object(O.jsxs)("div",{className:"custom_container",children:[Object(O.jsxs)("div",{className:"relate",children:[Object(O.jsx)("button",{className:"back",onClick:function(){return _.goBack()}}),Object(O.jsx)("span",{className:"title",children:1===G?"Payment history":"Transaction history"})]}),Object(O.jsxs)("ul",{className:"total_count_card",children:[Object(O.jsxs)("li",{className:"revenue",children:[Object(O.jsx)("span",{className:"show_label",children:1===G?"Total earnings":"Total payment sent"}),Object(O.jsx)("span",{className:"title",children:Object(O.jsx)(x.a,{value:$&&(null===$||void 0===$?void 0:$.toFixed(2))?null===$||void 0===$?void 0:$.toFixed(2):$,className:"foo",displayType:"text",thousandSeparator:!0,prefix:"$"})})]}),Object(O.jsxs)("li",{className:"job",children:[Object(O.jsx)("span",{className:"show_label",children:"Total Jobs"}),Object(O.jsx)("span",{className:"title",children:te})]})]}),Object(O.jsxs)("div",{className:"flex_row center_flex",children:[Object(O.jsx)("div",{className:"flex_col_sm_2",children:Object(O.jsx)("span",{className:"xs_sub_title mb0",children:"Last jobs"})}),Object(O.jsx)("div",{className:"flex_col_sm_4",children:Object(O.jsxs)("div",{className:"search_bar".concat(M?" active":""),children:[Object(O.jsx)("input",{type:"text",placeholder:"Search",value:D,onChange:function(e){var t=e.target.value;J({totalEarnings:0,totalJobs:0,revenueList:[]}),F(1),W(!0),Y(t),Z(t)}}),Object(O.jsx)("span",{className:"detect_icon_ltr",onClick:function(){return R(!0)},children:Object(O.jsx)("img",{src:h.a,alt:"search"})})]})})]}),Object(O.jsx)("div",{className:"last_jobs",children:Object(O.jsx)("div",{id:"table-scrollable",className:"table_wrap",children:Object(O.jsx)(f.a,{dataLength:null===ne||void 0===ne?void 0:ne.length,next:function(){console.log("Here!!!");var e=z+1;F((function(e){return e+1})),m(e,"",!0)},hasMore:V,loader:Object(O.jsx)(O.Fragment,{}),children:Object(O.jsxs)("table",{cellPadding:"0",cellSpacing:"0",children:[Object(O.jsx)("thead",{children:Object(O.jsxs)("tr",{children:[Object(O.jsx)("th",{children:Object(O.jsx)("span",{className:"form_label",children:"Job"})}),Object(O.jsx)("th",{children:Object(O.jsx)("span",{className:"form_label",children:"Status"})}),Object(O.jsxs)("th",{children:[" ",Object(O.jsxs)("span",{className:"form_label",children:["Hired ",1===G?"by":"tradesperson"]})]}),Object(O.jsx)("th",{children:Object(O.jsx)("span",{className:"form_label",children:"Start Date"})}),Object(O.jsxs)("th",{children:[" ",Object(O.jsx)("span",{className:"form_label",children:"Price"})]})]})}),Object(O.jsx)("tbody",{children:s?Object(O.jsx)("tr",{children:Object(O.jsx)("td",{colSpan:5,children:Object(O.jsx)("div",{className:"no_record",children:Object(O.jsx)("img",{src:u.a,alt:"loader",width:"130px"})})})}):(null===ne||void 0===ne?void 0:ne.length)?ne.map((function(e){var t=e._id,s=e.jobId,n=e.status,r=e.jobName,l=e.tradieName,o=e.tradieImage,i=e.tradeName,a=e.builderName,c=e.builderImage,h=e.from_date,p=e.earning;return Object(O.jsxs)("tr",{children:[Object(O.jsx)("td",{children:Object(O.jsxs)("div",{className:"img_txt_wrap",children:[Object(O.jsx)("figure",{className:"job_img",children:Object(O.jsx)("img",{src:(1===G?c:o)||d.a,alt:"job-img"})}),Object(O.jsxs)("div",{className:"details",onClick:function(){_.push("/payment-history?jobId=".concat(s))},children:[Object(O.jsx)("span",{className:"inner_title line-2",children:i}),Object(O.jsx)("span",{className:"xs_head line-1",children:r})]})]})}),Object(O.jsx)("td",{children:Object(O.jsx)("span",{className:"inner_title line-3",children:n})}),Object(O.jsx)("td",{children:Object(O.jsx)("span",{className:"inner_title line-3",children:1===G?a:l})}),Object(O.jsx)("td",{children:Object(O.jsx)("span",{className:"inner_title",children:b()(h).format("DD.MM.YYYY")})}),Object(O.jsx)("td",{children:Object(O.jsx)("span",{className:"inner_title",children:p})})]},t)})):Object(O.jsx)("tr",{children:Object(O.jsx)("td",{colSpan:5,children:Object(O.jsxs)("div",{className:"no_record",children:[Object(O.jsx)("figure",{className:"no_img",children:Object(O.jsx)("img",{src:j.a,alt:"data not found"})}),Object(O.jsx)("span",{children:"No Data Found"})]})})})})]})})})})]})})})},_=s(68),N=Object(n.b)((function(e){var t=e.profile,s=t.paymentHistory,n=t.paymentDetails,r=t.searching;return{isLoading:e.common.isLoading,searching:r,paymentHistory:s,paymentDetails:n}}),(function(e){return Object(r.b)({getPaymentHistory:_.j,getPaymentDetails:_.i},e)}))(A);t.default=N}}]);
//# sourceMappingURL=31.2c3c8ced.chunk.js.map