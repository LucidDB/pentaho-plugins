var cv={prefs:{suppressMsg:{},fadeTime:250,wipeTime:250,isDebug:0,skipDirtyAlert:false},defaultNS:"http://www.pentaho.com",contextPath:null,dojoWidgets:{},helpTopics:{},helpWin:null,securityToken:null,nsResolver:function(_1){
return "http://www.pentaho.com";
},onDefaultJSFAction:function(e){
if(e.key==13&&e.target){
var _2=e.target;
if(_2&&_2.tagName=="TEXTAREA"){
return;
}
while(_2&&_2.tagName!="FORM"){
_2=_2.parentNode;
}
if(!_2){
return;
}
_2=cv.util.getFirstChildByClass(_2,"_defaultJSFButton");
if(!_2){
return;
}
_2.click();
dojo.event.browser.stopEvent(e);
}
},getFieldHelp:null,getActiveReport:null,init:function(){
var _3=dojo.byId("commonMsgText");
if(_3){
cv.util.setCommonMsgTooltip(_3.innerHTML);
}
dojo.event.connect(document,"onkey",this,"onDefaultJSFAction");
var _4=dojo.byId("stok");
if(_4){
cv.securityToken=_4.value;
}
}};
dojo.addOnLoad(cv,"init");
cv.util={initDojoWidget:null,alertMessage:function(){
dojo.html.setOpacity(dojo.byId("commonMsgBarBackground"),0.5);
setTimeout("cv.util._fadeMessage()",2*cv.prefs.fadeTime);
},alertErrorOnPageOpen:function(_5,_6){
alert(_5);
if(_6){
window.location=_6;
}
},_fadeMessage:function(){
dojo.lfx.html.fadeOut(dojo.byId("commonMsgBarBackground"),4*cv.prefs.fadeTime).play();
},checkNumber:function(_7,_8){
if(!_7){
return _8;
}
return !isNaN(Number(_7));
},connectPopupMenu:function(_9,_a){
for(var x=0;_a&&x<_a.length;++x){
var mi=this.getDojoWidget(_a[x].id);
if(mi){
dojo.event.connect(mi,"onClick",(_a[x].src?_a[x].src:_9),_a[x].handler);
if(_a[x].disabled){
mi.setDisabled(true);
}
}
}
},destroyDojoWidgets:function(){
for(var x in cv.dojoWidgets){
try{
if(cv.dojoWidgets[x]){
cv.dojoWidgets[x].destroy(true);
}
}
catch(e){
}
}
},disconnectPopupMenu:function(_b,_c){
for(var x=0;_c&&x<_c.length;++x){
var mi=this.getDojoWidget(_c[x].id);
if(mi){
dojo.event.disconnect(mi,"onClick",_b,_c[x].handler);
}
}
},displayWidget:function(id,_d){
if(this.getDojoWidget(id)){
var _e=this.getDojoWidget(id).domNode;
if(_e){
_d?dojo.html.show(_e):dojo.html.hide(_e);
}
}
},getAncestorByClass:function(_f,_10){
while(_f&&!dojo.html.hasClass(_f,_10)){
_f=_f.parentNode;
}
return _f;
},getFirstChildByClass:function(_11,_12){
var _13=dojo.html.getElementsByClass(_12,_11);
return (_13&&_13.length>0)?_13[0]:null;
},getDojoWidget:function(id){
if(cv.dojoWidgets[id]){
return cv.dojoWidgets[id];
}
var wi=dojo.widget.byId(id);
if(!wi){
wi=dojo.byId(id);
if(!wi){
return null;
}
if(!this.dojoParser){
this.dojoParser=new dojo.xml.Parse();
}
wi=this.dojoParser.parseElement(wi,null,true);
if(wi){
wi=dojo.widget.getParser().createComponents(wi);
if(wi&&wi.length>0){
wi=wi[0];
}else{
wi=null;
}
}
}
if(wi){
if(this.initDojoWidget){
this.initDojoWidget(wi);
}
cv.dojoWidgets[id]=wi;
}
with(wi.domNode.style){
zIndex=1002;
}
return wi;
},helpdialog:null,getHelp:function(_14){
if(dojo.lang.isObject(_14)&&_14.target){
_14=_14.target.id;
}
if(!_14||_14=="null"){
_14="";
}else{
if(_14.indexOf(".html")<0){
_14=cv.helpTopics&&cv.helpTopics[_14]?cv.helpTopics[_14]:"";
}
}
_14=cv.contextPath+"help/topic.html?"+_14;
if(window.location.search&&window.location.search.indexOf("embeddedHelp=true")>-1){
if(this.helpDialog==null){
this.helpDialog=new cv.HelpDialog();
this.helpDialog.init();
}
this.helpDialog.showDlg(_14);
return;
}
var _15=dojo.html.getViewport();
if(cv.helpWin&&!cv.helpWin.closed){
cv.helpWin.close();
}
var _16=window.open(_14,"helpWnd","height="+_15.height*0.8+",width="+_15.width*0.8+",menubar=0,status=0,toolbar=0,location=0,resizable=1");
if(_16){
cv.helpWin=_16;
}
_16.focus();
},getSelectionList:function(_17){
var _18=_17.getElementsByTagName("INPUT");
var _19=[],len=_18.length;
for(var x=0;x<len;++x){
if(_18[x].checked){
_19.push(_18[x].name);
}
}
if(_19.length==0){
_19=null;
}
return _19;
},hide:function(){
for(var i=0;i<arguments.length;++i){
dojo.html.addClass(dojo.byId(arguments[i]),"hidden");
}
},initDivButton:function(_1a,_1b,_1c){
if(dojo.lang.isString(_1a)){
_1a=dojo.byId(_1a);
}
if(!_1a){
return;
}
dojo.event.connect(_1a,"onmouseover",this,"_divButtonActive");
dojo.event.connect(_1a,"onmousedown",this,"_divButtonPressed");
dojo.event.connect(_1a,"onmouseout",this,"_divButtonInactive");
dojo.event.connect(_1a,"onclick",_1b,_1c);
dojo.event.connect(_1a,"onclick",this,"_divButtonInactive");
dojo.html.disableSelection(_1a);
},isHidden:function(_1d){
return dojo.html.hasClass(dojo.byId(_1d),"hidden");
},setButtonDisabled:function(btn,_1e){
if(!btn){
return;
}
if(_1e==btn.disabled){
return;
}
if(btn.tagName=="IMG"){
var _1f=(btn.src.indexOf(".png")>-1)?".png":".gif";
btn.src=_1e?btn.src.replace(_1f,"_disabled"+_1f):btn.src.replace("_disabled"+_1f,_1f);
}else{
_1e?dojo.html.addClass(btn,"disabled"):dojo.html.removeClass(btn,"disabled");
}
btn.disabled=_1e;
},_divButtonActive:function(e){
if(e.target.disabled){
return;
}
dojo.html.addClass(this.getAncestorByClass(e.target,"reportBtn"),"btnActive");
},_divButtonInactive:function(e){
var _20=this.getAncestorByClass(e.target,"reportBtn");
dojo.html.removeClass(_20,"btnPressed");
dojo.html.removeClass(_20,"btnActive");
},_divButtonPressed:function(e){
if(e.target.disabled){
return;
}
dojo.html.addClass(this.getAncestorByClass(e.target,"reportBtn"),"btnPressed");
},onToggleSectionCheckbox:function(evt){
if(evt.target.checked){
dojo.lfx.html.wipeIn(evt.target.id+"DIV",cv.prefs.wipeTime).play();
}else{
dojo.lfx.html.wipeOut(evt.target.id+"DIV",cv.prefs.wipeTime).play();
}
},parseMDXExpression:function(_21,_22){
var _23=_21.lastIndexOf("].[");
if(_23==-1){
return "";
}
_21=_21.substring(_23);
var reg=/\]\.\[(.+)\]$/;
var _24=reg.exec(_21);
if(!_24){
return "";
}
var val=_24[1];
val=val.replace("]]","]");
if(val=="#null"){
return cvCatalog.attributeNullValue;
}
if(val.search(/\S/)<0){
return cvCatalog.attributeBlankValue;
}
return _22?dojo.string.escape("HTML",val):val;
},parseAjaxMsg:function(_25){
if(dojo.lang.isString(_25)){
var i=_25.indexOf("<message");
if(i<0){
return;
}
var j=_25.indexOf("</message>");
if(j<0){
j=_25.indexOf("/>");
if(j<0){
return;
}
j+=2;
}else{
j+=10;
}
_25=dojo.dom.createDocumentFromText(_25.substring(i,j));
}
if(dojo.lang.isObject(_25)&&_25.documentElement&&_25.documentElement.tagName=="message"){
var id=_25.documentElement.getAttribute("id");
if(id=="sessionTimeout"){
alert(cvCatalog.errorSessionTimeout);
if(cv.getActiveReport()){
cv.getActiveReport().setReportPropsDirty(false);
cv.getActiveReport().history.setSaved();
}
window.location.reload();
}else{
var _26=_25.documentElement.attributes;
var msg={text:dojo.dom.textContent(_25.documentElement)};
for(var x=0;x<_26.length;++x){
var _27=_26.item(x);
if(_27.name){
msg[_27.name]=_27.value;
}
}
return msg;
}
}
return null;
},parseURLQuery:function(_28){
if(!_28){
_28=window.location.search;
}
if(_28.length==0){
return null;
}
var _29=_28.substring(1).split("&"),ret={};
for(var x=0;x<_29.length;++x){
var id=_29[x].indexOf("=");
if(id>0){
ret[_29[x].substring(0,id)]=decodeURIComponent(_29[x].substring(id+1));
}
}
return ret;
},getURLQueryValue:function(key,_2a){
var pm=this.parseURLQuery(_2a);
return pm?pm[key]:null;
},removeNode:function(_2b){
if(_2b){
_2b.parentNode.removeChild(_2b);
}
},setCommonMsgTooltip:function(msg){
if(!msg){
return;
}
var _2c=this.getDojoWidget("commonMsgTooltip");
if(_2c){
_2c.domNode.innerHTML=msg;
}
},setDivActive:function(div,_2d){
if(_2d){
dojo.html.addClass(div,"active");
}else{
dojo.html.removeClass(div,"active");
}
},setHelpTopics:function(_2e){
for(var x=0;x<_2e.length;++x){
var _2f=(typeof (_2e[x])=="string")?dojo.byId(_2e[x]):_2e[x];
dojo.event.connectOnce(_2f,"onclick",this,"getHelp");
cv.helpTopics[_2e[x]]=_2e[++x];
}
},setMenuItem:function(mi,_30,_31){
if(dojo.lang.isString(mi)){
mi=this.getDojoWidget(mi);
}
if(!mi){
return;
}
if(_30){
var _32=mi.domNode.firstChild.firstChild;
if(_30=="checked"){
_30="checkmark.png";
}
if(_30&&_30!="none"){
_30=cv.contextPath+"images/"+_30;
mi.iconSrc=_30;
if((_30.toLowerCase().substring(_30.length-4)==".png")&&(dojo.render.html.ie)){
_32.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+_30+"', sizingMethod='image')";
_32.style.backgroundImage="";
}else{
_32.style.backgroundImage="url("+_30+")";
}
}else{
if(_30=="none"){
if(dojo.render.html.ie){
_32.style.filter="";
}else{
_32.style.backgroundImage="";
}
}
}
}
if(_31){
mi.setDisabled(_31=="disabled"?true:false);
}
},setSectionCollapsed:function(id){
var _33=true;
var _34=dojo.byId(id);
if(_34){
if(_34.type=="checkbox"){
_34.checked=false;
}else{
if(_34.tagName=="IMG"){
this.hide(_34.id+"DIV");
_34.name="closed";
_34.src=_34.src.replace(/opened\./,"closed.");
_33=false;
}
}
}
if(_33){
dojo.lfx.html.wipeOut(dojo.byId(id+"DIV"),0).play();
}
},show:function(){
for(var i=0;i<arguments.length;++i){
dojo.html.removeClass(dojo.byId(arguments[i]),"hidden");
}
},updateMenuItemCaption:function(id,_35,_36){
var mi=this.getDojoWidget(id);
if(!mi){
return;
}
_35=cvCatalog[_35];
if(_36){
_35=dojo.string.substituteParams(_35,_36);
}
mi.domNode.childNodes[1].innerHTML=mi.caption=_35;
},TRACE:function(_37){
if(cv.prefs.isDebug<2){
return;
}
try{
if(_37=="_INIT"){
this.TRACEWIN=window.open("","cvtrace","resizable=1,scrollbars=1");
this.TRACEWIN.document.open();
this.TRACEWIN.document.writeln("<b>INITIALIZE ClearView JS Trace</b><p>");
}else{
if(_37=="_EXIT"){
this.TRACEWIN.document.writeln("<b>EXIT ClearView JS Trace</b>");
this.TRACEWIN.document.close();
this.TRACEWIN.close();
}else{
if(_37=="_START"){
this.TSBASE=this.TSSTART=new Date();
this.TRACEWIN.document.writeln("<b>Start Profiling at: "+this.TSSTART+"</b><br>");
}else{
if(_37=="_END"){
this.TRACEWIN.document.writeln("<b>Finish Profiling - Total: "+(new Date()-this.TSSTART)+" ms</b><p>");
}else{
if(_37=="_CLEAR"){
this.TRACEWIN.document.clear();
}else{
var ts=new Date();
this.TRACEWIN.document.writeln("&nbsp;&nbsp;&nbsp;&nbsp;"+_37+": "+(ts-this.TSBASE)+" ms<br>");
this.TSBASE=new Date();
}
}
}
}
}
}
catch(e){
}
},createEvent:function(_38){
var evt=new Object();
evt.target=_38;
evt.clientX=0;
evt.clientY=0;
evt.stopPropagation=function(){
};
evt.preventDefault=function(){
};
return evt;
},convertStringtoDate:function(_39){
var _3a=_39;
_3a=_3a.replace(/-/g,"/");
_3a=_3a.replace("T"," ");
_3a=_3a.replace("Z"," GMT-0000");
return new Date(Date.parse(_3a));
},formatDateString:function(_3b){
var _3c=this.convertStringtoDate(_3b);
var _3d=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
var _3e=_3d[_3c.getMonth()];
var _3f=_3c.getDate();
var _40=_3c.getFullYear();
var _41=_3c.toLocaleTimeString();
if(_41.indexOf("0")==0){
_41=_41.substring(1);
}
return _3e+" "+_3f+", "+_40+" "+_41;
},goToURL:function(url){
try{
window.location=url;
}
catch(e){
if(dojo.render.html.ie&&e.message.indexOf("Unspecified error")>-1){
}else{
throw e;
}
}
}};
dojo.declare("cv.Collapsible",null,function(_42,_43,_44,_45,_46){
this.header=_42;
this.body=_43;
this.cssOpen=_45?_45:"folderOpen";
this.cssClose=_46?_46:"folderClose";
this.isOpen=(_44==true);
this.setState(this.isOpen,true);
dojo.html.disableSelection(_42);
dojo.event.connect(_42,"onclick",this,"onClickHeader");
},{onClickHeader:function(e){
if(!this.animation||this.animation.status()!="playing"){
this.isOpen=!this.isOpen;
this.setState(this.isOpen,true);
}
e.stopPropagation();
},setState:function(_47,_48){
if(_47){
dojo.html.replaceClass(this.header,this.cssOpen,this.cssClose);
if(_48){
this.body.style.display="block";
this.animation=null;
}else{
this.animation=dojo.lfx.html.wipeIn(this.body,cv.prefs.wipeTime);
this.animation.play();
}
}else{
dojo.html.replaceClass(this.header,this.cssClose,this.cssOpen);
if(_48){
this.body.style.display="none";
this.animation=null;
}else{
this.animation=dojo.lfx.html.wipeOut(this.body,cv.prefs.wipeTime);
this.animation.play();
}
}
}});
dojo.extend(dojo.dnd.HtmlDragObject,{opacity:0.8,onDragStart:function(e){
dojo.html.clearSelection();
this.scrollOffset=dojo.html.getScroll().offset;
this.dragStartPosition=dojo.html.getAbsolutePosition(this.domNode,true);
this.dragOffset={y:this.dragStartPosition.y-e.pageY,x:this.dragStartPosition.x-e.pageX};
this.dragClone=this.createDragNode();
this.containingBlockPosition=this.domNode.offsetParent?dojo.html.getAbsolutePosition(this.domNode.offsetParent,true):{x:0,y:0};
if(this.constrainToContainer){
this.constraints=this.getConstraints();
}
if(cv.getActiveReport().isResizing){
return;
}
with(this.dragClone.style){
position="absolute";
top=this.dragOffset.y+e.pageY+"px";
left=this.dragOffset.x+e.pageX+"px";
if(this.domNode.firstChild.nodeType==1){
width=dojo.html.getElementBox(this.domNode.firstChild).width-10+"px";
height=dojo.html.getElementBox(this.domNode.firstChild).height+"px";
}
textAlign="left";
paddingLeft="5px";
}
dojo.body().appendChild(this.dragClone);
dojo.event.topic.publish("dragStart",{source:this});
},createDragNode:function(){
var _49=this.domNode.getAttribute("formula"),_4a;
if(_49){
_4a=document.createElement("DIV");
var _4b;
if(dojo.html.hasClass(this.domNode,"filterItem")||dojo.html.hasClass(this.domNode,"filterGroup")){
_4b="filterDragObject";
if(this.domNode.id.indexOf("filter_metric")==0){
_4a.innerHTML=cvCatalog.filterMetric;
}else{
var _4c=this.domNode.getElementsByTagName("span");
_4a.innerHTML=cv.textContent(_4c[0]);
}
_4a.setAttribute("formula",this.domNode.id);
}else{
var _4d=this.domNode.getAttribute("metrictype")?"V":cv.getFieldHelp().getDndType(_49);
_4b=(_4d=="V")?"metricDragObject":"attributeDragObject";
_4a.innerHTML=dojo.string.escape("html",cv.textContent(this.domNode));
_4a.setAttribute("formula",_49);
}
dojo.html.addClass(_4a,"commonDragObject");
if(_4b){
dojo.html.addClass(_4a,_4b);
}
if(this.opacity<1){
dojo.html.setOpacity(_4a,this.opacity);
}
}else{
if(this.type=="DB"){
_4a=document.createElement("DIV");
var box=dojo.html.getBorderBox(this.domNode);
with(_4a.style){
border="2px dashed black";
height=box.height+"px";
width=box.width+"px";
backgroundColor="silver";
}
if(this.opacity<1){
dojo.html.setOpacity(_4a,this.opacity);
}
}else{
_4a=this.domNode.cloneNode(true);
if(this.dragClass){
dojo.html.addClass(_4a,this.dragClass);
}
if(this.opacity<1){
dojo.html.setOpacity(_4a,this.opacity);
}
var ltn=_4a.tagName.toLowerCase();
var _4e=(ltn=="tr");
if((_4e)||(ltn=="tbody")){
var doc=this.domNode.ownerDocument;
var _4f=doc.createElement("table");
if(_4e){
var _50=doc.createElement("tbody");
_4f.appendChild(_50);
_50.appendChild(_4a);
}else{
_4f.appendChild(_4a);
}
var _51=((_4e)?this.domNode:this.domNode.firstChild);
var _52=((_4e)?_4a:_4a.firstChild);
var _53=tdp.childNodes;
var _54=_52.childNodes;
for(var i=0;i<_53.length;i++){
if((_54[i])&&(_54[i].style)){
_54[i].style.width=dojo.html.getContentBox(_53[i]).width+"px";
}
}
_4a=_4f;
}
}
}
if((dojo.render.html.ie55||dojo.render.html.ie60)&&this.createIframe){
with(_4a.style){
top="0px";
left="0px";
}
var _55=document.createElement("div");
_55.appendChild(_4a);
this.bgIframe=new dojo.html.BackgroundIframe(_55);
_55.appendChild(this.bgIframe.iframe);
_4a=_55;
}
_4a.style.zIndex=999;
return _4a;
}});
dojo.declare("cv.History",null,function(_56,_57,_58){
this.owner=_56;
this.undoStack=new dojo.collections.Stack();
this.redoStack=new dojo.collections.Stack();
this.savedState=null;
this.originalState=null;
if(_57&&_58){
dojo.event.connect(this,"add",_57,_58);
dojo.event.connect(this,"undo",_57,_58);
dojo.event.connect(this,"redo",_57,_58);
dojo.event.connect(this,"rewindTo",_57,_58);
dojo.event.connect(this,"forwardTo",_57,_58);
dojo.event.connect(this,"setTo",_57,_58);
dojo.event.connect(this,"setSaved",_57,_58);
}
},{add:function(_59){
_59.init(this.owner);
if(!this.originalState&&this.undoStack.count==0){
this.originalState=_59;
}
this.undoStack.push(_59);
this.redoStack.clear();
},current:function(){
return this.undoStack.peek();
},next:function(){
return this.redoStack.peek();
},undo:function(){
if(!this.hasUndo()){
return;
}
var o=this.undoStack.pop();
if(o){
this.redoStack.push(o);
if(this.owner.manager.cmdUndo.title.indexOf("Column Resize")<0){
o=this.current();
}
o.back();
}
},redo:function(){
if(!this.hasRedo()){
return;
}
var o=this.redoStack.pop();
if(o){
this.undoStack.push(o);
o.forward();
}
},rewindTo:function(_5a,_5b){
while(this.hasUndo()&&(_5a!=this.current()||_5a==null)){
this.redoStack.push(this.undoStack.pop());
}
if(!this.hasUndo()){
return null;
}
if(_5b){
this.current().back();
}
return this.current();
},forwardTo:function(_5c,_5d){
while(this.hasRedo()&&_5c!=this.next()){
this.undoStack.push(this.redoStack.pop());
}
if(!this.hasRedo()){
return null;
}
this.undoStack.push(this.redoStack.pop());
if(_5d){
this.current().forward();
}
return this.current();
},setTo:function(_5e){
if(!_5e){
return false;
}
if(this.undoStack.contains(_5e)){
while(_5e!=this.current()){
this.redoStack.push(this.undoStack.pop());
}
}else{
if(this.redoStack.contains(_5e)){
while(_5e!=this.next()){
this.undoStack.push(this.redoStack.pop());
}
this.undoStack.push(this.redoStack.pop());
}else{
return false;
}
}
return true;
},hasUndo:function(){
return this.undoStack.count>1;
},hasRedo:function(){
return this.redoStack.count>0;
},setSaved:function(){
this.savedState=this.current();
},isStateDirty:function(){
return this.savedState!=this.current();
},isEmpty:function(){
return this.undoStack.count<=1&&this.redoStack.count<=0;
}});
var cvConst={};
var cvCatalog={attributeNullValue:"Not Available",attributeBlankValue:"Not Available: spaces etc.",btnLabelCancel:"Cancel",btnLabelSave:"Save",btnTitleHelp:"Get help on this topic",errorNoAA:"You cannot create reports at this time since there is no Analysis Area available. Please contact your Administrator.",errorSessionTimeout:"Your session has expired, and you will be redirected to the login page."};
dojo.lang.extend(dojo.dnd.HtmlDragManager,{onMouseUp:function(e,_5f){
dojo.event.disconnect(document,"onmousemove",this,"onMouseMove");
if(this.selectedSources.length==0){
return;
}
this.mouseDownX=null;
this.mouseDownY=null;
this._dragTriggered=false;
e.dragSource=this.dragSource;
if((!e.shiftKey)&&(!e.ctrlKey)){
if(this.currentDropTarget){
this.currentDropTarget.onDropStart();
}
dojo.lang.forEach(this.dragObjects,function(_60){
var ret=null;
if(!_60){
return;
}
if(this.currentDropTarget){
e.dragObject=_60;
var ce=this.currentDropTarget.domNode.childNodes;
if(ce.length>0){
e.dropTarget=ce[0];
while(e.dropTarget==_60.domNode){
e.dropTarget=e.dropTarget.nextSibling;
}
}else{
e.dropTarget=this.currentDropTarget.domNode;
}
if(this.dropAcceptable){
ret=this.currentDropTarget.onDrop(e);
}else{
this.currentDropTarget.onDragOut(e);
}
}
e.dragStatus=this.dropAcceptable&&ret?"dropSuccess":"dropFailure";
dojo.lang.delayThese([function(){
try{
_60.dragSource.onDragEnd(e);
}
catch(err){
var _61={};
for(var i in e){
if(i=="type"){
_61.type="mouseup";
continue;
}
_61[i]=e[i];
}
_60.dragSource.onDragEnd(_61);
}
},function(){
_60.onDragEnd(e);
}]);
},this);
this.selectedSources=[];
this.dragObjects=[];
this.dragSource=null;
if(this.currentDropTarget){
this.currentDropTarget.onDropEnd();
}
}else{
}
this.currentDropTarget=null;
}});
(function(){
var d=document;
var dm=dojo.dnd.dragManager;
dojo.event.disconnect(d,"onkeydown",dm,"onKeyDown");
dojo.event.disconnect(d,"onmouseover",dm,"onMouseOver");
dojo.event.disconnect(d,"onmouseout",dm,"onMouseOut");
dojo.event.disconnect(d,"onmousedown",dm,"onMouseDown");
dojo.event.disconnect(d,"onmouseup",dm,"onMouseUp");
dojo.event.disconnect(window,"onscroll",dm,"onScroll");
})();
dojo.dnd.dragManager=new dojo.dnd.HtmlDragManager();
(function(){
var d=document;
var dm=dojo.dnd.dragManager;
dojo.event.connect(d,"onkeydown",dm,"onKeyDown");
dojo.event.connect(d,"onmouseover",dm,"onMouseOver");
dojo.event.connect(d,"onmouseout",dm,"onMouseOut");
dojo.event.connect(d,"onmousedown",dm,"onMouseDown");
dojo.event.connect(d,"onmouseup",dm,"onMouseUp");
dojo.event.connect(window,"onscroll",dm,"onScroll");
})();
dojo.lang.extend(dojo.widget.PopupMenu2,{snarfChildDomOutput:false});
cv.setDomDefaultNamespace=function(_62){
if(typeof _62.setProperty!="undefined"){
_62.setProperty("SelectionNamespaces","xmlns:cv='"+cv.defaultNS+"'");
}
};
if(dojo.render.html.ie){
cv.textContent=function(_63,str){
if(dojo.lang.isUndefined(str)){
return dojo.dom.textContent(_63);
}
if(_63.nodeType==1){
_63.text=str;
}else{
return dojo.dom.textContent(_63,str);
}
};
cv.createNode=function(_64,_65,ns){
return _64.createNode(1,_65,ns?ns:cv.defaultNS);
};
cv.addOption=function(_66,_67){
_66.add(_67);
};
dojo.html.BackgroundIframe=function(_68){
var _69="<iframe src=\"javascript:'<html><head></head><body></body></html>'\""+" style='position: absolute; left: 0px; top: 0px; width: 100%; height: 100%;"+"z-index: -1; filter:Alpha(Opacity=\"0\");'>";
this.iframe=dojo.doc().createElement(_69);
this.iframe.tabIndex=-1;
if(_68){
_68.appendChild(this.iframe);
this.domNode=_68;
}else{
dojo.body().appendChild(this.iframe);
this.iframe.style.display="none";
}
};
dojo.lang.extend(dojo.html.BackgroundIframe,{iframe:null,onResized:function(){
if(this.iframe&&this.domNode&&this.domNode.parentNode){
var _6a=dojo.html.getMarginBox(this.domNode);
if(_6a.width==0||_6a.height==0){
dojo.lang.setTimeout(this,this.onResized,100);
return;
}
this.iframe.style.width=_6a.width+"px";
this.iframe.style.height=_6a.height+"px";
}
},size:function(_6b){
if(!this.iframe){
return;
}
var _6c=dojo.html.toCoordinateObject(_6b,true,dojo.html.boxSizing.BORDER_BOX);
with(this.iframe.style){
width=_6c.width+"px";
height=_6c.height+"px";
left=_6c.left+"px";
top=_6c.top+"px";
}
},setZIndex:function(_6d){
if(!this.iframe){
return;
}
if(dojo.dom.isNode(_6d)){
this.iframe.style.zIndex=dojo.html.getStyle(_6d,"z-index")-1;
}else{
if(!isNaN(_6d)){
this.iframe.style.zIndex=_6d;
}
}
},show:function(){
if(this.iframe){
this.iframe.style.display="block";
}
},hide:function(){
if(this.iframe){
this.iframe.style.display="none";
}
},remove:function(){
if(this.iframe){
dojo.html.removeNode(this.iframe,true);
delete this.iframe;
this.iframe=null;
}
}});
cv.contentMinWidth=750;
cv.setMinWidth=function(){
var _6e=dojo.html.getViewport().width;
if(_6e<=cv.contentMinWidth){
document.body.style.width=cv.contentMinWidth+"px";
this.xScrolling=true;
}else{
document.body.style.width=_6e+"px";
this.xScrolling=false;
}
};
dojo.html.disableSelection=function(_6f){
_6f.onselectstart=function(){
return false;
};
};
}else{
Element.prototype.selectNodes=function(_70){
var res=this.ownerDocument.evaluate(_70,this,cv.nsResolver,XPathResult.ORDERED_NODE_ITERATOR_TYPE,null);
var _71=[];
if(res){
var _72=res.iterateNext();
while(_72){
_71.push(_72);
_72=res.iterateNext();
}
}
return _71;
};
Element.prototype.selectSingleNode=function(_73){
var res=this.ownerDocument.evaluate(_73,this,cv.nsResolver,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
return res?res.singleNodeValue:null;
};
cv.textContent=function(_74,str){
if(dojo.lang.isUndefined(str)){
return dojo.dom.textContent(_74);
}
return dojo.dom.textContent(_74,str);
};
cv.createNode=function(_75,_76,ns){
return _75.createElementNS(ns?ns:cv.defaultNS,_76);
};
cv.addOption=function(_77,_78){
_77.appendChild(_78);
};
}
dojo.html.placeOnScreen=function(_79,_7a,_7b,_7c,_7d,_7e,_7f){
if(_7a instanceof Array||typeof _7a=="array"){
_7f=_7e;
_7e=_7d;
_7d=_7c;
_7c=_7b;
_7b=_7a[1];
_7a=_7a[0];
}
if(_7e instanceof String||typeof _7e=="string"){
_7e=_7e.split(",");
}
if(!isNaN(_7c)){
_7c=[Number(_7c),Number(_7c)];
}else{
if(!(_7c instanceof Array||typeof _7c=="array")){
_7c=[0,0];
}
}
var _80=dojo.html.getScroll().offset;
var _81=dojo.html.getViewport();
_79=dojo.byId(_79);
var _82=_79.style.display;
_79.style.display="";
_79.style.opacity="0.05";
var bb=dojo.html.getBorderBox(_79);
var w=bb.width;
var h=bb.height;
_79.style.opacity="";
_79.style.display=_82;
if(!(_7e instanceof Array||typeof _7e=="array")){
_7e=["TL"];
}
var _83,_84,_85=Infinity,_86;
for(var _87=0;_87<_7e.length;++_87){
var _88=_7e[_87];
var _89=true;
var _8a=_7a-(_88.charAt(1)=="L"?0:w)+_7c[0]*(_88.charAt(1)=="L"?1:-1);
var _8b=_7b-(_88.charAt(0)=="T"?0:h)+_7c[1]*(_88.charAt(0)=="T"?1:-1);
if(_7d){
_8a-=_80.x;
_8b-=_80.y;
}
if(_8a<0){
_8a=0;
_89=false;
}
if(_8b<0){
_8b=0;
_89=false;
}
var x=_8a+w;
if(x>_81.width){
x=_81.width-w;
_89=false;
}else{
x=_8a;
}
x=Math.max(_7c[0],x)+_80.x;
var y=_8b+h;
if(y>_81.height){
y=_81.height-h;
_89=false;
}else{
y=_8b;
}
y=Math.max(_7c[1],y)+_80.y;
if(_89){
_83=x;
_84=y;
_85=0;
_86=_88;
break;
}else{
var _8c=Math.pow(x-_8a-_80.x,2)+Math.pow(y-_8b-_80.y,2);
if(_85>_8c){
_85=_8c;
_83=x;
_84=y;
_86=_88;
}
}
}
if(!_7f){
_79.style.left=_83+"px";
_79.style.top=_84+"px";
}
return {left:_83,top:_84,x:_83,y:_84,dist:_85,corner:_86};
};
cv.Dialog=function(){
this.theForm=null;
this.type=null;
this.dlgTemplate=null;
this.prefix=null;
this.cache={};
this.status=null;
this.helpTopic=null;
this.defaultMsg=null;
this.lastSaveTime=null;
this.isShowing=false;
this.defaultFocus=null;
this._parentReport=null;
};
cv.Dialog.prototype={show:null,save:null,prev:null,cancel:function(){
cv.dlgWidget.hide();
if(this._parentReport!=null){
this._parentReport.refreshReport();
}
},next:function(){
this.save();
},onSave:function(){
if(this.lastSaveTime&&new Date()-this.lastSaveTime<1000){
return;
}
this.save();
this.lastSaveTime=new Date();
},onHide:function(){
if(!this.isShowing){
return;
}
if(this.asyncRequest){
this.asyncRequest.abort();
this.asyncRequest=null;
}
if(this.asyncRequestId){
cv.io.cancelAsyncRequest(this.asyncRequestId);
this.asyncRequestId=null;
}
this.isShowing=false;
},showError:function(msg,_8d){
this.msgClass="error";
this._showAlert(msg,_8d);
},showWarning:function(msg,_8e,_8f,_90,_91,_92){
this.msgClass="warn";
this._parentReport=_92;
this._showAlert(msg,_8e,_8f,_90,_91);
},showConfirm:function(msg,_93,_94,_95,_96){
this.msgClass="info";
this._showAlert(msg,_93,_94,_95,_96);
},_showAlert:function(msg,_97,_98,_99,_9a){
this.type="alertDlg";
this.dlgTemplate="alertDlg.html";
var _9b="<img class='alertMsgIcon' src='images/icons/"+this.msgClass+"_l.gif'><div class='alertMsgText'>";
if(dojo.lang.isString(msg)){
if(cvCatalog[msg]){
_9b+=cvCatalog[msg];
}else{
_9b+=msg;
}
}else{
if(dojo.lang.isArray(msg)){
msg[0]=cvCatalog[msg[0]];
_9b+=dojo.string.substituteParams.apply(this,msg);
}else{
return;
}
}
_9b+="</div>";
if(!this.load(_9b)){
return;
}
if(_97){
var _9c=dojo.byId("dlgHelp");
if(_9c){
dojo.html.setClass(_9c,"titleBarButton");
cv.util.setHelpTopics(["dlgHelp",_97]);
}
}
var _9d=dojo.byId("alertDlgSuppressMsg");
if(_9a){
cv.util.show(_9d.parentNode);
_9d.onchange=function(){
cv.prefs.suppressMsg[_9a]=_9d.checked;
};
}else{
cv.util.hide(_9d.parentNode);
}
var _9e=dojo.byId("dlgBtnCancel");
if(_98){
var btn;
if(_98.hasNext){
btn=dojo.byId("dlgBtnNext");
}else{
btn=dojo.byId("dlgBtnSave");
dojo.event.connect(btn,"onclick",cv.dlgWidget,"hide");
}
if(_98.srcObj){
dojo.event.connect(btn,"onclick",_98.srcObj,_98.srcFunc);
}else{
dojo.event.connect(btn,"onclick",_98.srcFunc);
}
if(_98.srcFunc=="onSaveReport"||_98.srcFunc=="onSaveReportInTooltip"||_98.srcFunc=="onSaveReportInRptInfoDialog"){
dojo.byId("dlgBtnSaveLabel").innerHTML=cvCatalog.btnLabelSave;
}
cv.util.show(btn);
dojo.byId("dlgBtnCancelLabel").innerHTML=cvCatalog.btnLabelCancel;
}
if(_99){
if(_99.srcObj){
dojo.event.connect(_9e,"onclick",_99.srcObj,_99.srcFunc);
dojo.event.connect(dojo.byId("dlgCloseBox"),"onclick",_99.srcObj,_99.srcFunc);
}else{
dojo.event.connect(_9e,"onclick",_99.srcFunc);
dojo.event.connect(dojo.byId("dlgCloseBox"),"onclick",_99.srcFunc);
}
}
this.showDialog();
},showDialog:function(){
if(cv.dlgWidget.animationInProgress&&cv.dlgWidget.isShowing()){
dojo.lang.setTimeout(this,"showDialog",250);
}else{
cv.dlgWidget.show();
this.isShowing=true;
}
},displayMsg:function(){
if(!this.msgBar){
return;
}
var msg=this.defaultMsg;
if(arguments.length==1){
msg=arguments[0];
}else{
if(arguments.length>1){
msg=dojo.string.substituteParams.apply(this,arguments);
}
}
this.msgBar.innerHTML=msg?msg:"";
if(msg){
cv.util.show(this.msgBar);
dojo.lfx.html.fadeShow(this.msgBar,cv.prefs.fadeTime).play();
}
},displayError:function(){
this.displayMsg.apply(this,arguments[0].indexOf("<span")==0?arguments:["<span class='dlgError'>"+arguments[0]+"</span>"].concat(Array.prototype.slice.call(arguments,1)));
},byId:function(id){
return dojo.lang.isString(id)?dojo.byId(this.prefix+id):dojo.byId(id);
},load:function(){
this.status=null;
if(!this.cache[this.type]){
var dlg=this;
dojo.io.bind({url:cv.contextPath+"templates/"+this.dlgTemplate,handle:function(_9f,_a0,evt){
if(_9f=="load"){
if(cv.util.parseAjaxMsg(_a0)){
this.status="errorDlgLoad";
return;
}
dlg.cache[dlg.type]=_a0;
}else{
dlg.status="errorDlgLoad";
}
},mimetype:"text/plain",method:"POST",sync:true});
}
if(this.status!=null){
return false;
}
var str=this.load.arguments.length>0?dojo.string.substituteParams(this.cache[this.type],this.load.arguments):this.cache[this.type];
if(dojo.lang.isUndefined(cv.dlgWidget)){
cv.dlgWidget=cv.util.getDojoWidget("theDialog");
}
cv.dlgWidget.setContent("<form id=\"theDialogForm\" action=\"\">"+str+"</form>");
this.defaultMsg=null;
this.theForm=dojo.byId("theDialogForm");
this.titleBar=dojo.byId("dialogTitleBar");
this.msgBar=dojo.byId("dialogMessageBar");
if(this.msgBar){
cv.util.hide(this.msgBar);
}
dojo.event.connect(this.titleBar,"onmousedown",this,"onDragStart");
dojo.event.connect(document,"onmouseup",this,"onDragEnd");
var btn=dojo.byId("dlgBtnSave");
if(btn){
if(this.type!="alertDlg"){
dojo.event.connect(btn,"onclick",this,"onSave");
}
}
var btn=dojo.byId("dlgBtnNext");
if(btn){
dojo.event.connect(btn,"onclick",this,"next");
}
btn=dojo.byId("dlgBtnPrev");
if(btn){
dojo.event.connect(btn,"onclick",this,"prev");
}
btn=dojo.byId("dlgHelp");
if(btn){
if(this.helpTopic){
dojo.event.connect(btn,"onclick",this,"showHelpWnd");
btn.title=cvCatalog.btnTitleHelp;
}else{
cv.util.hide(btn);
}
}
dojo.event.connect(dojo.byId("dlgBtnCancel"),"onclick",this,"cancel");
dojo.event.connect(dojo.byId("dlgCloseBox"),"onclick",this,"cancel");
dojo.event.connectOnce(cv.dlgWidget,"hide",this,"onHide");
dojo.event.connectOnce(cv.dlgWidget,"onShow",this,"onShow");
return true;
},updateHtml:function(_a1,_a2){
var _a3=this.byId(_a1);
if(!_a3){
_a3=this.theForm[this.prefix+_a1];
if(_a3&&_a3.length>0&&_a3[0].type=="radio"){
for(var x=0;x<_a3.length;++x){
if(_a3[x].value==_a2){
_a3[x].checked=true;
}
}
return;
}
}
if(!_a3){
return;
}
if(_a3.tagName=="INPUT"||_a3.tagName=="SELECT"){
if(_a3.type=="checkbox"){
_a3.checked=(_a2=="true"?true:false);
}else{
_a3.value=_a2;
}
}else{
_a3.innerHTML=_a2;
}
},updateXml:function(_a4,src){
if(!_a4){
return;
}
var _a5=src.id.substr(src.id.indexOf(this.prefix)+this.prefix.length);
if(!_a5){
return;
}
switch(src.type){
case "checkbox":
_a4.setAttribute(_a5,src.checked?"true":"false");
break;
default:
_a4.setAttribute(_a5,src.value);
break;
}
},getRadioGroupValue:function(_a6){
var _a7=this.theForm[_a6];
for(var x=0;x<_a7.length;++x){
if(_a7[x].checked){
return _a7[x].value;
}
}
},showHelpWnd:function(e){
if(!e.target){
return;
}
cv.util.getHelp(e.target.id=="dlgHelp"?this.helpTopic:e);
},onDragStart:function(e){
var _a8=cv.dlgWidget.domNode;
this.currentPos=dojo.html.getAbsolutePosition(_a8);
this.cursorPos={x:e.pageX,y:e.pageY};
dojo.event.connect(document,"onmousemove",this,"onDragMove");
},onDragEnd:function(e){
dojo.event.disconnect(document,"onmousemove",this,"onDragMove");
},onDragMove:function(e){
dojo.html.clearSelection(this.titleBar);
var x=this.currentPos.x+e.pageX-this.cursorPos.x;
var y=this.currentPos.y+e.pageY-this.cursorPos.y;
var _a9=dojo.html.getViewport();
if(x<_a9.width-100&&x>20){
this.currentPos.x=x;
this.cursorPos.x=e.pageX;
}
if(y<_a9.height-100&&y>20){
this.currentPos.y=y;
this.cursorPos.y=e.pageY;
}
with(cv.dlgWidget.domNode.style){
left=this.currentPos.x+"px";
top=this.currentPos.y+"px";
}
}};
dojo.provide("clearview.widget.CVTooltip");
dojo.widget.defineWidget("clearview.widget.CVTooltip",dojo.widget.Tooltip,{_connectNodes:[],addConnectNode:function(_aa,_ab){
if(_ab&&dojo.lang.inArray(this._connectNodes,_aa)){
return;
}
dojo.event.connect(_aa,"onmouseover",this,"_onMouseOver");
this._connectNodes.push(_aa);
},fillInTemplate:function(_ac,_ad){
dojo.widget.Tooltip.superclass.fillInTemplate.call(this,_ac,_ad);
this.addOnLoad(this,"_loadedContent");
dojo.html.addClass(this.domNode,"cvTooltip");
var _ae=this.getFragNodeRef(_ad);
dojo.html.copyStyle(this.domNode,_ae);
this.applyPopupBasicStyle();
},postCreate:function(_af,_b0){
dojo.widget.Tooltip.superclass.postCreate.call(this,_af,_b0);
},_onMouseOver:function(e){
this._mouse={x:e.pageX,y:e.pageY};
var _b1=e.target;
this._connectNode=_b1;
this._loadedContent();
if(cv.formatTooltip){
cv.formatTooltip(this.domNode,_b1);
this.cancelShowing=false;
}else{
this.domNode.innerHTML="Tooltip has not been initialized for this element";
}
if(!this._tracking){
dojo.event.connect(document.documentElement,"onmousemove",this,"_onMouseMove");
this._tracking=true;
}
this._onHover(e);
},open:function(){
if(this.isShowingNow||this.cancelShowing){
return;
}
dojo.widget.PopupContainerBase.prototype.open.call(this,this._mouse.x,this._mouse.y,null,[this._mouse.x,this._mouse.y],"TL,TR,BL,BR",[10,5]);
},_position:function(){
this.move(this._mouse.x,this._mouse.y,[10,5],"TL,TR,BL,BR");
},uninitialize:function(){
this.close();
for(var x=0,len=this._connectNodes.length;x<len;++x){
dojo.event.disconnect(this._connectNodes[x],"onmouseover",this,"_onMouseOver");
}
}});
dojo.provide("clearview.widget.CVTooltipRefresh");
dojo.widget.defineWidget("clearview.widget.CVTooltipRefresh",dojo.widget.Tooltip,{position_x:null,position_y:null,node:null,_mouse:null,_this:null,constrainToContainer:true,addConnectNode:function(_b2,x,y){
this.position_x=x;
this.position_y=y;
this.node=_b2;
this._mouse={x:this.position_x,y:this.position_y};
dojo.event.connect(_b2,"onmouseover",this,"_onMouseOver");
},removeConnectNode:function(_b3){
this.node=_b3;
dojo.event.disconnect(_b3,"onmouseover",this,"_onMouseOver");
},fillInTemplate:function(_b4,_b5){
dojo.widget.Tooltip.superclass.fillInTemplate.call(this,_b4,_b5);
this.addOnLoad(this,"_loadedContent");
dojo.html.addClass(this.domNode,"progressPaneUp");
var _b6=this.getFragNodeRef(_b5);
dojo.html.copyStyle(this.domNode,_b6);
this.applyPopupBasicStyle();
},postCreate:function(_b7,_b8){
_this=this;
dojo.widget.Tooltip.superclass.postCreate.call(this,_b7,_b8);
},_onMouseOver:function(e){
this._mouse={x:this.position_x,y:this.position_y};
var _b9=this.node;
this._connectNode=_b9;
if(this.isShowingNow){
return;
}
this._thisShow();
if(!this._tracking){
dojo.event.connect(document.documentElement,"onmousemove",this,"_MouseMove");
this._tracking=true;
}
this._onHover(e);
},_MouseMove:function(e){
this._mouse={x:this.position_x,y:this.position_y};
if(dojo.html.overElement(this._connectNode,e)||dojo.html.overElement(this.domNode,e)){
this._onHover(e);
}else{
this._onUnHover(e);
}
},close:function(){
dojo.widget.PopupContainerBase.prototype.close.call(_this,true);
this._tracking=false;
dojo.event.disconnect(document.documentElement,"onmousemove",this,"_MouseMove");
this.isShowingNow=false;
},open:function(){
if(this.isShowingNow){
return;
}
dojo.widget.PopupContainerBase.prototype.open.call(this,this._mouse.x,this._mouse.y,null,[this._mouse.x,this._mouse.y],"TL,TR,BL,BR",[10,15]);
this.isShowingNow=true;
},_showInMS:function(_ba){
this._thisShow();
dojo.lang.setTimeout(this.close,_ba);
},_thisShow:function(){
if(this.isShowingNow){
return;
}
clearview.widget.CVTooltipRefresh.superclass.show.apply(this,arguments);
this.isShowingNow=true;
},_position:function(){
this.move(this._mouse.x,this._mouse.y,[10,5],"TL,TR,BL,BR");
},uninitialize:function(){
dojo.event.disconnect(document.documentElement,"onmousemove",this,"_MouseMove");
dojo.event.disconnect(this._connectNode,"onmouseover",this,"_onMouseOver");
}});
cv.flex={resizeClearviewFlex:function(){
var _bb=dojo.html.getViewport().height;
if(dojo.byId("commonHeader")!=null){
_bb-=dojo.html.getBorderBox("commonHeader").height;
_bb-=dojo.html.getBorderBox("commonMsgBar").height;
}
if(dojo.byId("clearviewFlex")!=null){
dojo.byId("clearviewFlex").style.height=_bb+"px";
}
},beforeunloadClearviewFlex:function(){
var _bc=dojo.byId("clearviewFlex").onbeforeunload();
if(_bc!=null&&_bc.length>0){
return _bc;
}else{
return;
}
},selectTab:function(tab){
dojo.html.removeClass(dojo.byId("navHOME"),"current");
dojo.html.removeClass(dojo.byId("navDASHBOARD"),"current");
dojo.html.removeClass(dojo.byId("navADMIN"),"current");
dojo.html.removeClass(dojo.byId("navSYSTEM"),"current");
if(tab){
dojo.html.addClass(dojo.byId("nav"+tab),"current");
}
},showMessage:function(_bd,msg){
var _be=dojo.byId("commonMsgBar");
if(!_be){
return;
}
this.commonMsgText=dojo.byId("commonMsgText");
if(!this.commonMsgText){
this.commonMsgText=document.createElement("DIV");
_be.appendChild(this.commonMsgText);
this.commonMsgText.id="commonMsgText";
var _bf=document.createElement("DIV");
_be.appendChild(_bf);
_bf.id="commonMsgBarBackground";
dojo.html.setOpacity(_bf,0);
}
var _c0="<span class=\""+_bd.toLowerCase()+"\">"+msg+"</span>";
this.commonMsgText.innerHTML=_c0;
cv.util.setCommonMsgTooltip(_c0);
cv.util.alertMessage();
},clearMessage:function(){
var _c1=dojo.byId("commonMsgBar");
if(!_c1){
return;
}
var _c2=dojo.byId("commonMsgText");
if(!_c2){
return;
}
_c1.removeChild(_c2);
var _c3=dojo.byId("commonMsgBarBackground");
if(_c3){
_c1.removeChild(_c3);
}
var _c4=cv.util.getDojoWidget("commonMsgTooltip");
if(_c4){
_c4.uninitialize();
}
},getMessage:function(){
var _c5=dojo.byId("commonMsgText");
if(_c5!=null){
return _c5.firstChild.firstChild.nodeValue;
}
},focusFlex:function(){
if(dojo.byId("clearviewFlex")==null||dojo.render.html.ie){
return;
}
dojo.byId("clearviewFlex").focus();
},sendSync:function(_c6,url,_c7){
var _c8;
try{
_c8=new ActiveXObject("Msxml2.XMLHTTP");
}
catch(e){
try{
_c8=new ActiveXObject("Microsoft.XMLHTTP");
}
catch(oc){
_c8=null;
}
}
if(!_c8&&typeof XMLHttpRequest!="undefined"){
_c8=new XMLHttpRequest();
}
try{
_c8.open(_c6,url,false);
if(_c6=="POST"){
_c8.setRequestHeader("Content-type","application/x-www-form-urlencoded");
_c8.setRequestHeader("Content-length",_c7==null?"0":_c7.length);
}
_c8.send(_c7);
return _c8.responseText;
}
catch(error){
if(error.indexOf("0x80004005")<0){
alert(error);
}
}
}};

