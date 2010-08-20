/*
	Copyright (c) 2004-2006, The Dojo Foundation
	All Rights Reserved.

	Licensed under the Academic Free License version 2.1 or above OR the
	modified BSD license. For more information on Dojo licensing, see:

		http://dojotoolkit.org/community/licensing.shtml
*/

/*
	This is a compiled version of Dojo, built for deployment and not for
	development. To get an editable version, please visit:

		http://dojotoolkit.org

	for documentation and information on getting the source.
*/

if(typeof dojo=="undefined"){
var dj_global=this;
var dj_currentContext=this;
function dj_undef(_1,_2){
return (typeof (_2||dj_currentContext)[_1]=="undefined");
}
if(dj_undef("djConfig",this)){
var djConfig={};
}
if(dj_undef("dojo",this)){
var dojo={};
}
dojo.global=function(){
return dj_currentContext;
};
dojo.locale=djConfig.locale;
dojo.version={major:0,minor:0,patch:0,flag:"dev",revision:Number("$Rev: 6824 $".match(/[0-9]+/)[0]),toString:function(){
with(dojo.version){
return major+"."+minor+"."+patch+flag+" ("+revision+")";
}
}};
dojo.evalProp=function(_3,_4,_5){
if((!_4)||(!_3)){
return undefined;
}
if(!dj_undef(_3,_4)){
return _4[_3];
}
return (_5?(_4[_3]={}):undefined);
};
dojo.parseObjPath=function(_6,_7,_8){
var _9=(_7||dojo.global());
var _a=_6.split(".");
var _b=_a.pop();
for(var i=0,l=_a.length;i<l&&_9;i++){
_9=dojo.evalProp(_a[i],_9,_8);
}
return {obj:_9,prop:_b};
};
dojo.evalObjPath=function(_e,_f){
if(typeof _e!="string"){
return dojo.global();
}
if(_e.indexOf(".")==-1){
return dojo.evalProp(_e,dojo.global(),_f);
}
var ref=dojo.parseObjPath(_e,dojo.global(),_f);
if(ref){
return dojo.evalProp(ref.prop,ref.obj,_f);
}
return null;
};
dojo.errorToString=function(_11){
if(!dj_undef("message",_11)){
return _11.message;
}else{
if(!dj_undef("description",_11)){
return _11.description;
}else{
return _11;
}
}
};
dojo.raise=function(_12,_13){
if(_13){
_12=_12+": "+dojo.errorToString(_13);
}else{
_12=dojo.errorToString(_12);
}
try{
if(djConfig.isDebug){
dojo.hostenv.println("FATAL exception raised: "+_12);
}
}
catch(e){
}
throw _13||Error(_12);
};
dojo.debug=function(){
};
dojo.debugShallow=function(obj){
};
dojo.profile={start:function(){
},end:function(){
},stop:function(){
},dump:function(){
}};
function dj_eval(_15){
return dj_global.eval?dj_global.eval(_15):eval(_15);
}
dojo.unimplemented=function(_16,_17){
var _18="'"+_16+"' not implemented";
if(_17!=null){
_18+=" "+_17;
}
dojo.raise(_18);
};
dojo.deprecated=function(_19,_1a,_1b){
var _1c="DEPRECATED: "+_19;
if(_1a){
_1c+=" "+_1a;
}
if(_1b){
_1c+=" -- will be removed in version: "+_1b;
}
dojo.debug(_1c);
};
dojo.render=(function(){
function vscaffold(_1d,_1e){
var tmp={capable:false,support:{builtin:false,plugin:false},prefixes:_1d};
for(var i=0;i<_1e.length;i++){
tmp[_1e[i]]=false;
}
return tmp;
}
return {name:"",ver:dojo.version,os:{win:false,linux:false,osx:false},html:vscaffold(["html"],["ie","opera","khtml","safari","moz"]),svg:vscaffold(["svg"],["corel","adobe","batik"]),vml:vscaffold(["vml"],["ie"]),swf:vscaffold(["Swf","Flash","Mm"],["mm"]),swt:vscaffold(["Swt"],["ibm"])};
})();
dojo.hostenv=(function(){
var _21={isDebug:false,allowQueryConfig:false,baseScriptUri:"",baseRelativePath:"",libraryScriptUri:"",iePreventClobber:false,ieClobberMinimal:true,preventBackButtonFix:true,delayMozLoadingFix:false,searchIds:[],parseWidgets:true};
if(typeof djConfig=="undefined"){
djConfig=_21;
}else{
for(var _22 in _21){
if(typeof djConfig[_22]=="undefined"){
djConfig[_22]=_21[_22];
}
}
}
return {name_:"(unset)",version_:"(unset)",getName:function(){
return this.name_;
},getVersion:function(){
return this.version_;
},getText:function(uri){
dojo.unimplemented("getText","uri="+uri);
}};
})();
dojo.hostenv.getBaseScriptUri=function(){
if(djConfig.baseScriptUri.length){
return djConfig.baseScriptUri;
}
var uri=new String(djConfig.libraryScriptUri||djConfig.baseRelativePath);
if(!uri){
dojo.raise("Nothing returned by getLibraryScriptUri(): "+uri);
}
var _25=uri.lastIndexOf("/");
djConfig.baseScriptUri=djConfig.baseRelativePath;
return djConfig.baseScriptUri;
};
(function(){
var _26={pkgFileName:"__package__",loading_modules_:{},loaded_modules_:{},addedToLoadingCount:[],removedFromLoadingCount:[],inFlightCount:0,modulePrefixes_:{dojo:{name:"dojo",value:"src"}},setModulePrefix:function(_27,_28){
this.modulePrefixes_[_27]={name:_27,value:_28};
},moduleHasPrefix:function(_29){
var mp=this.modulePrefixes_;
return Boolean(mp[_29]&&mp[_29].value);
},getModulePrefix:function(_2b){
if(this.moduleHasPrefix(_2b)){
return this.modulePrefixes_[_2b].value;
}
return _2b;
},getTextStack:[],loadUriStack:[],loadedUris:[],post_load_:false,modulesLoadedListeners:[],unloadListeners:[],loadNotifying:false};
for(var _2c in _26){
dojo.hostenv[_2c]=_26[_2c];
}
})();
dojo.hostenv.loadPath=function(_2d,_2e,cb){
var uri;
if(_2d.charAt(0)=="/"||_2d.match(/^\w+:/)){
uri=_2d;
}else{
uri=this.getBaseScriptUri()+_2d;
}
if(djConfig.cacheBust&&dojo.render.html.capable){
uri+="?"+String(djConfig.cacheBust).replace(/\W+/g,"");
}
try{
return !_2e?this.loadUri(uri,cb):this.loadUriAndCheck(uri,_2e,cb);
}
catch(e){
dojo.debug(e);
return false;
}
};
dojo.hostenv.loadUri=function(uri,cb){
if(this.loadedUris[uri]){
return true;
}
var _33=this.getText(uri,null,true);
if(!_33){
return false;
}
this.loadedUris[uri]=true;
if(cb){
_33="("+_33+")";
}
var _34=dj_eval(_33);
if(cb){
cb(_34);
}
return true;
};
dojo.hostenv.loadUriAndCheck=function(uri,_36,cb){
var ok=true;
try{
ok=this.loadUri(uri,cb);
}
catch(e){
dojo.debug("failed loading ",uri," with error: ",e);
}
return Boolean(ok&&this.findModule(_36,false));
};
dojo.loaded=function(){
};
dojo.unloaded=function(){
};
dojo.hostenv.loaded=function(){
this.loadNotifying=true;
this.post_load_=true;
var mll=this.modulesLoadedListeners;
for(var x=0;x<mll.length;x++){
mll[x]();
}
this.modulesLoadedListeners=[];
this.loadNotifying=false;
dojo.loaded();
};
dojo.hostenv.unloaded=function(){
var mll=this.unloadListeners;
while(mll.length){
(mll.pop())();
}
dojo.unloaded();
};
dojo.addOnLoad=function(obj,_3d){
var dh=dojo.hostenv;
if(arguments.length==1){
dh.modulesLoadedListeners.push(obj);
}else{
if(arguments.length>1){
dh.modulesLoadedListeners.push(function(){
obj[_3d]();
});
}
}
if(dh.post_load_&&dh.inFlightCount==0&&!dh.loadNotifying){
dh.callLoaded();
}
};
dojo.addOnUnload=function(obj,_40){
var dh=dojo.hostenv;
if(arguments.length==1){
dh.unloadListeners.push(obj);
}else{
if(arguments.length>1){
dh.unloadListeners.push(function(){
obj[_40]();
});
}
}
};
dojo.hostenv.modulesLoaded=function(){
if(this.post_load_){
return;
}
if(this.loadUriStack.length==0&&this.getTextStack.length==0){
if(this.inFlightCount>0){
dojo.debug("files still in flight!");
return;
}
dojo.hostenv.callLoaded();
}
};
dojo.hostenv.callLoaded=function(){
if(typeof setTimeout=="object"){
setTimeout("dojo.hostenv.loaded();",0);
}else{
dojo.hostenv.loaded();
}
};
dojo.hostenv.getModuleSymbols=function(_42){
var _43=_42.split(".");
for(var i=_43.length;i>0;i--){
var _45=_43.slice(0,i).join(".");
if((i==1)&&!this.moduleHasPrefix(_45)){
_43[0]="../"+_43[0];
}else{
var _46=this.getModulePrefix(_45);
if(_46!=_45){
_43.splice(0,i,_46);
break;
}
}
}
return _43;
};
dojo.hostenv._global_omit_module_check=false;
dojo.hostenv.loadModule=function(_47,_48,_49){
if(!_47){
return;
}
_49=this._global_omit_module_check||_49;
var _4a=this.findModule(_47,false);
if(_4a){
return _4a;
}
if(dj_undef(_47,this.loading_modules_)){
this.addedToLoadingCount.push(_47);
}
this.loading_modules_[_47]=1;
var _4b=_47.replace(/\./g,"/")+".js";
var _4c=_47.split(".");
var _4d=this.getModuleSymbols(_47);
var _4e=((_4d[0].charAt(0)!="/")&&!_4d[0].match(/^\w+:/));
var _4f=_4d[_4d.length-1];
var ok;
if(_4f=="*"){
_47=_4c.slice(0,-1).join(".");
while(_4d.length){
_4d.pop();
_4d.push(this.pkgFileName);
_4b=_4d.join("/")+".js";
if(_4e&&_4b.charAt(0)=="/"){
_4b=_4b.slice(1);
}
ok=this.loadPath(_4b,!_49?_47:null);
if(ok){
break;
}
_4d.pop();
}
}else{
_4b=_4d.join("/")+".js";
_47=_4c.join(".");
var _51=!_49?_47:null;
ok=this.loadPath(_4b,_51);
if(!ok&&!_48){
_4d.pop();
while(_4d.length){
_4b=_4d.join("/")+".js";
ok=this.loadPath(_4b,_51);
if(ok){
break;
}
_4d.pop();
_4b=_4d.join("/")+"/"+this.pkgFileName+".js";
if(_4e&&_4b.charAt(0)=="/"){
_4b=_4b.slice(1);
}
ok=this.loadPath(_4b,_51);
if(ok){
break;
}
}
}
if(!ok&&!_49){
dojo.raise("Could not load '"+_47+"'; last tried '"+_4b+"'");
}
}
if(!_49&&!this["isXDomain"]){
_4a=this.findModule(_47,false);
if(!_4a){
dojo.raise("symbol '"+_47+"' is not defined after loading '"+_4b+"'");
}
}
return _4a;
};
dojo.hostenv.startPackage=function(_52){
var _53=String(_52);
var _54=_53;
var _55=_52.split(/\./);
if(_55[_55.length-1]=="*"){
_55.pop();
_54=_55.join(".");
}
var _56=dojo.evalObjPath(_54,true);
this.loaded_modules_[_53]=_56;
this.loaded_modules_[_54]=_56;
return _56;
};
dojo.hostenv.findModule=function(_57,_58){
var lmn=String(_57);
if(this.loaded_modules_[lmn]){
return this.loaded_modules_[lmn];
}
if(_58){
dojo.raise("no loaded module named '"+_57+"'");
}
return null;
};
dojo.kwCompoundRequire=function(_5a){
var _5b=_5a["common"]||[];
var _5c=_5a[dojo.hostenv.name_]?_5b.concat(_5a[dojo.hostenv.name_]||[]):_5b.concat(_5a["default"]||[]);
for(var x=0;x<_5c.length;x++){
var _5e=_5c[x];
if(_5e.constructor==Array){
dojo.hostenv.loadModule.apply(dojo.hostenv,_5e);
}else{
dojo.hostenv.loadModule(_5e);
}
}
};
dojo.require=function(_5f){
dojo.hostenv.loadModule.apply(dojo.hostenv,arguments);
};
dojo.requireIf=function(_60,_61){
var _62=arguments[0];
if((_62===true)||(_62=="common")||(_62&&dojo.render[_62].capable)){
var _63=[];
for(var i=1;i<arguments.length;i++){
_63.push(arguments[i]);
}
dojo.require.apply(dojo,_63);
}
};
dojo.requireAfterIf=dojo.requireIf;
dojo.provide=function(_65){
return dojo.hostenv.startPackage.apply(dojo.hostenv,arguments);
};
dojo.registerModulePath=function(_66,_67){
return dojo.hostenv.setModulePrefix(_66,_67);
};
dojo.setModulePrefix=function(_68,_69){
dojo.deprecated("dojo.setModulePrefix(\""+_68+"\", \""+_69+"\")","replaced by dojo.registerModulePath","0.5");
return dojo.registerModulePath(_68,_69);
};
dojo.exists=function(obj,_6b){
var p=_6b.split(".");
for(var i=0;i<p.length;i++){
if(!obj[p[i]]){
return false;
}
obj=obj[p[i]];
}
return true;
};
dojo.hostenv.normalizeLocale=function(_6e){
var _6f=_6e?_6e.toLowerCase():dojo.locale;
if(_6f=="root"){
_6f="ROOT";
}
return _6f;
};
dojo.hostenv.searchLocalePath=function(_70,_71,_72){
_70=dojo.hostenv.normalizeLocale(_70);
var _73=_70.split("-");
var _74=[];
for(var i=_73.length;i>0;i--){
_74.push(_73.slice(0,i).join("-"));
}
_74.push(false);
if(_71){
_74.reverse();
}
for(var j=_74.length-1;j>=0;j--){
var loc=_74[j]||"ROOT";
var _78=_72(loc);
if(_78){
break;
}
}
};
dojo.hostenv.localesGenerated;
dojo.hostenv.registerNlsPrefix=function(){
dojo.registerModulePath("nls","nls");
};
dojo.hostenv.preloadLocalizations=function(){
if(dojo.hostenv.localesGenerated){
dojo.hostenv.registerNlsPrefix();
function preload(_79){
_79=dojo.hostenv.normalizeLocale(_79);
dojo.hostenv.searchLocalePath(_79,true,function(loc){
for(var i=0;i<dojo.hostenv.localesGenerated.length;i++){
if(dojo.hostenv.localesGenerated[i]==loc){
dojo["require"]("nls.dojo_"+loc);
return true;
}
}
return false;
});
}
preload();
var _7c=djConfig.extraLocale||[];
for(var i=0;i<_7c.length;i++){
preload(_7c[i]);
}
}
dojo.hostenv.preloadLocalizations=function(){
};
};
dojo.requireLocalization=function(_7e,_7f,_80,_81){
dojo.hostenv.preloadLocalizations();
var _82=dojo.hostenv.normalizeLocale(_80);
var _83=[_7e,"nls",_7f].join(".");
var _84="";
if(_81){
var _85=_81.split(",");
for(var i=0;i<_85.length;i++){
if(_82.indexOf(_85[i])==0){
if(_85[i].length>_84.length){
_84=_85[i];
}
}
}
if(!_84){
_84="ROOT";
}
}
var _87=_81?_84:_82;
var _88=dojo.hostenv.findModule(_83);
var _89=null;
if(_88){
if(djConfig.localizationComplete&&_88._built){
return;
}
var _8a=_87.replace("-","_");
var _8b=_83+"."+_8a;
_89=dojo.hostenv.findModule(_8b);
}
if(!_89){
_88=dojo.hostenv.startPackage(_83);
var _8c=dojo.hostenv.getModuleSymbols(_7e);
var _8d=_8c.concat("nls").join("/");
var _8e;
dojo.hostenv.searchLocalePath(_87,_81,function(loc){
var _90=loc.replace("-","_");
var _91=_83+"."+_90;
var _92=false;
if(!dojo.hostenv.findModule(_91)){
dojo.hostenv.startPackage(_91);
var _93=[_8d];
if(loc!="ROOT"){
_93.push(loc);
}
_93.push(_7f);
var _94=_93.join("/")+".js";
_92=dojo.hostenv.loadPath(_94,null,function(_95){
var _96=function(){
};
_96.prototype=_8e;
_88[_90]=new _96();
for(var j in _95){
_88[_90][j]=_95[j];
}
});
}else{
_92=true;
}
if(_92&&_88[_90]){
_8e=_88[_90];
}else{
_88[_90]=_8e;
}
if(_81){
return true;
}
});
}
if(_81&&_82!=_84){
_88[_82.replace("-","_")]=_88[_84.replace("-","_")];
}
};
(function(){
var _98=djConfig.extraLocale;
if(_98){
if(!_98 instanceof Array){
_98=[_98];
}
var req=dojo.requireLocalization;
dojo.requireLocalization=function(m,b,_9c,_9d){
req(m,b,_9c,_9d);
if(_9c){
return;
}
for(var i=0;i<_98.length;i++){
req(m,b,_98[i],_9d);
}
};
}
})();
}
if(typeof window!="undefined"){
(function(){
if(djConfig.allowQueryConfig){
var _9f=document.location.toString();
var _a0=_9f.split("?",2);
if(_a0.length>1){
var _a1=_a0[1];
var _a2=_a1.split("&");
for(var x in _a2){
var sp=_a2[x].split("=");
if((sp[0].length>9)&&(sp[0].substr(0,9)=="djConfig.")){
var opt=sp[0].substr(9);
try{
djConfig[opt]=eval(sp[1]);
}
catch(e){
djConfig[opt]=sp[1];
}
}
}
}
}
if(((djConfig["baseScriptUri"]=="")||(djConfig["baseRelativePath"]==""))&&(document&&document.getElementsByTagName)){
var _a6=document.getElementsByTagName("script");
var _a7=/(__package__|dojo|bootstrap1)\.js([\?\.]|$)/i;
for(var i=0;i<_a6.length;i++){
var src=_a6[i].getAttribute("src");
if(!src){
continue;
}
var m=src.match(_a7);
if(m){
var _ab=src.substring(0,m.index);
if(src.indexOf("bootstrap1")>-1){
_ab+="../";
}
if(!this["djConfig"]){
djConfig={};
}
if(djConfig["baseScriptUri"]==""){
djConfig["baseScriptUri"]=_ab;
}
if(djConfig["baseRelativePath"]==""){
djConfig["baseRelativePath"]=_ab;
}
break;
}
}
}
var dr=dojo.render;
var drh=dojo.render.html;
var drs=dojo.render.svg;
var dua=(drh.UA=navigator.userAgent);
var dav=(drh.AV=navigator.appVersion);
var t=true;
var f=false;
drh.capable=t;
drh.support.builtin=t;
dr.ver=parseFloat(drh.AV);
dr.os.mac=dav.indexOf("Macintosh")>=0;
dr.os.win=dav.indexOf("Windows")>=0;
dr.os.linux=dav.indexOf("X11")>=0;
drh.opera=dua.indexOf("Opera")>=0;
drh.khtml=(dav.indexOf("Konqueror")>=0)||(dav.indexOf("Safari")>=0);
drh.safari=dav.indexOf("Safari")>=0;
var _b3=dua.indexOf("Gecko");
drh.mozilla=drh.moz=(_b3>=0)&&(!drh.khtml);
if(drh.mozilla){
drh.geckoVersion=dua.substring(_b3+6,_b3+14);
}
drh.ie=(document.all)&&(!drh.opera);
drh.ie50=drh.ie&&dav.indexOf("MSIE 5.0")>=0;
drh.ie55=drh.ie&&dav.indexOf("MSIE 5.5")>=0;
drh.ie60=drh.ie&&dav.indexOf("MSIE 6.0")>=0;
drh.ie70=drh.ie&&dav.indexOf("MSIE 7.0")>=0;
var cm=document["compatMode"];
drh.quirks=(cm=="BackCompat")||(cm=="QuirksMode")||drh.ie55||drh.ie50;
dojo.locale=dojo.locale||(drh.ie?navigator.userLanguage:navigator.language).toLowerCase();
dr.vml.capable=drh.ie;
drs.capable=f;
drs.support.plugin=f;
drs.support.builtin=f;
var _b5=window["document"];
var tdi=_b5["implementation"];
if((tdi)&&(tdi["hasFeature"])&&(tdi.hasFeature("org.w3c.dom.svg","1.0"))){
drs.capable=t;
drs.support.builtin=t;
drs.support.plugin=f;
}
if(drh.safari){
var tmp=dua.split("AppleWebKit/")[1];
var ver=parseFloat(tmp.split(" ")[0]);
if(ver>=420){
drs.capable=t;
drs.support.builtin=t;
drs.support.plugin=f;
}
}else{
}
})();
dojo.hostenv.startPackage("dojo.hostenv");
dojo.render.name=dojo.hostenv.name_="browser";
dojo.hostenv.searchIds=[];
dojo.hostenv._XMLHTTP_PROGIDS=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"];
dojo.hostenv.getXmlhttpObject=function(){
var _b9=null;
var _ba=null;
try{
_b9=new XMLHttpRequest();
}
catch(e){
}
if(!_b9){
for(var i=0;i<3;++i){
var _bc=dojo.hostenv._XMLHTTP_PROGIDS[i];
try{
_b9=new ActiveXObject(_bc);
}
catch(e){
_ba=e;
}
if(_b9){
dojo.hostenv._XMLHTTP_PROGIDS=[_bc];
break;
}
}
}
if(!_b9){
return dojo.raise("XMLHTTP not available",_ba);
}
return _b9;
};
dojo.hostenv._blockAsync=false;
dojo.hostenv.getText=function(uri,_be,_bf){
if(!_be){
this._blockAsync=true;
}
var _c0=this.getXmlhttpObject();
function isDocumentOk(_c1){
var _c2=_c1["status"];
return Boolean((!_c2)||((200<=_c2)&&(300>_c2))||(_c2==304));
}
if(_be){
var _c3=this,_c4=null,gbl=dojo.global();
var xhr=dojo.evalObjPath("dojo.io.XMLHTTPTransport");
_c0.onreadystatechange=function(){
if(_c4){
gbl.clearTimeout(_c4);
_c4=null;
}
if(_c3._blockAsync||(xhr&&xhr._blockAsync)){
_c4=gbl.setTimeout(function(){
_c0.onreadystatechange.apply(this);
},10);
}else{
if(4==_c0.readyState){
if(isDocumentOk(_c0)){
_be(_c0.responseText);
}
}
}
};
}
_c0.open("GET",uri,_be?true:false);
try{
_c0.send(null);
if(_be){
return null;
}
if(!isDocumentOk(_c0)){
var err=Error("Unable to load "+uri+" status:"+_c0.status);
err.status=_c0.status;
err.responseText=_c0.responseText;
throw err;
}
}
catch(e){
this._blockAsync=false;
if((_bf)&&(!_be)){
return null;
}else{
throw e;
}
}
this._blockAsync=false;
return _c0.responseText;
};
dojo.hostenv.defaultDebugContainerId="dojoDebug";
dojo.hostenv._println_buffer=[];
dojo.hostenv._println_safe=false;
dojo.hostenv.println=function(_c8){
if(!dojo.hostenv._println_safe){
dojo.hostenv._println_buffer.push(_c8);
}else{
try{
var _c9=document.getElementById(djConfig.debugContainerId?djConfig.debugContainerId:dojo.hostenv.defaultDebugContainerId);
if(!_c9){
_c9=dojo.body();
}
var div=document.createElement("div");
div.appendChild(document.createTextNode(_c8));
_c9.appendChild(div);
}
catch(e){
try{
document.write("<div>"+_c8+"</div>");
}
catch(e2){
window.status=_c8;
}
}
}
};
dojo.addOnLoad(function(){
dojo.hostenv._println_safe=true;
while(dojo.hostenv._println_buffer.length>0){
dojo.hostenv.println(dojo.hostenv._println_buffer.shift());
}
});
function dj_addNodeEvtHdlr(_cb,_cc,fp){
var _ce=_cb["on"+_cc]||function(){
};
_cb["on"+_cc]=function(){
fp.apply(_cb,arguments);
_ce.apply(_cb,arguments);
};
return true;
}
function dj_load_init(e){
var _d0=(e&&e.type)?e.type.toLowerCase():"load";
if(arguments.callee.initialized||(_d0!="domcontentloaded"&&_d0!="load")){
return;
}
arguments.callee.initialized=true;
if(typeof (_timer)!="undefined"){
clearInterval(_timer);
delete _timer;
}
var _d1=function(){
if(dojo.render.html.ie){
dojo.hostenv.makeWidgets();
}
};
if(dojo.hostenv.inFlightCount==0){
_d1();
dojo.hostenv.modulesLoaded();
}else{
dojo.hostenv.modulesLoadedListeners.unshift(_d1);
}
}
if(document.addEventListener){
if(dojo.render.html.opera||(dojo.render.html.moz&&!djConfig.delayMozLoadingFix)){
document.addEventListener("DOMContentLoaded",dj_load_init,null);
}
window.addEventListener("load",dj_load_init,null);
}
if(dojo.render.html.ie&&dojo.render.os.win){
document.attachEvent("onreadystatechange",function(e){
if(document.readyState=="complete"){
dj_load_init();
}
});
}
if(/(WebKit|khtml)/i.test(navigator.userAgent)){
var _timer=setInterval(function(){
if(/loaded|complete/.test(document.readyState)){
dj_load_init();
}
},10);
}
if(dojo.render.html.ie){
dj_addNodeEvtHdlr(window,"beforeunload",function(){
dojo.hostenv._unloading=true;
window.setTimeout(function(){
dojo.hostenv._unloading=false;
},0);
});
}
dj_addNodeEvtHdlr(window,"unload",function(){
dojo.hostenv.unloaded();
if((!dojo.render.html.ie)||(dojo.render.html.ie&&dojo.hostenv._unloading)){
dojo.hostenv.unloaded();
}
});
dojo.hostenv.makeWidgets=function(){
var _d3=[];
if(djConfig.searchIds&&djConfig.searchIds.length>0){
_d3=_d3.concat(djConfig.searchIds);
}
if(dojo.hostenv.searchIds&&dojo.hostenv.searchIds.length>0){
_d3=_d3.concat(dojo.hostenv.searchIds);
}
if((djConfig.parseWidgets)||(_d3.length>0)){
if(dojo.evalObjPath("dojo.widget.Parse")){
var _d4=new dojo.xml.Parse();
if(_d3.length>0){
for(var x=0;x<_d3.length;x++){
var _d6=document.getElementById(_d3[x]);
if(!_d6){
continue;
}
var _d7=_d4.parseElement(_d6,null,true);
dojo.widget.getParser().createComponents(_d7);
}
}else{
if(djConfig.parseWidgets){
var _d7=_d4.parseElement(dojo.body(),null,true);
dojo.widget.getParser().createComponents(_d7);
}
}
}
}
};
dojo.addOnLoad(function(){
if(!dojo.render.html.ie){
dojo.hostenv.makeWidgets();
}
});
try{
if(dojo.render.html.ie){
document.namespaces.add("v","urn:schemas-microsoft-com:vml");
document.createStyleSheet().addRule("v\\:*","behavior:url(#default#VML)");
}
}
catch(e){
}
dojo.hostenv.writeIncludes=function(){
};
if(!dj_undef("document",this)){
dj_currentDocument=this.document;
}
dojo.doc=function(){
return dj_currentDocument;
};
dojo.body=function(){
return dojo.doc().body||dojo.doc().getElementsByTagName("body")[0];
};
dojo.byId=function(id,doc){
if((id)&&((typeof id=="string")||(id instanceof String))){
if(!doc){
doc=dj_currentDocument;
}
var ele=doc.getElementById(id);
if(ele&&(ele.id!=id)&&doc.all){
ele=null;
eles=doc.all[id];
if(eles){
if(eles.length){
for(var i=0;i<eles.length;i++){
if(eles[i].id==id){
ele=eles[i];
break;
}
}
}else{
ele=eles;
}
}
}
return ele;
}
return id;
};
dojo.setContext=function(_dc,_dd){
dj_currentContext=_dc;
dj_currentDocument=_dd;
};
dojo._fireCallback=function(_de,_df,_e0){
if((_df)&&((typeof _de=="string")||(_de instanceof String))){
_de=_df[_de];
}
return (_df?_de.apply(_df,_e0||[]):_de());
};
dojo.withGlobal=function(_e1,_e2,_e3,_e4){
var _e5;
var _e6=dj_currentContext;
var _e7=dj_currentDocument;
try{
dojo.setContext(_e1,_e1.document);
_e5=dojo._fireCallback(_e2,_e3,_e4);
}
finally{
dojo.setContext(_e6,_e7);
}
return _e5;
};
dojo.withDoc=function(_e8,_e9,_ea,_eb){
var _ec;
var _ed=dj_currentDocument;
try{
dj_currentDocument=_e8;
_ec=dojo._fireCallback(_e9,_ea,_eb);
}
finally{
dj_currentDocument=_ed;
}
return _ec;
};
}
(function(){
if(typeof dj_usingBootstrap!="undefined"){
return;
}
var _ee=false;
var _ef=false;
var _f0=false;
if((typeof this["load"]=="function")&&((typeof this["Packages"]=="function")||(typeof this["Packages"]=="object"))){
_ee=true;
}else{
if(typeof this["load"]=="function"){
_ef=true;
}else{
if(window.widget){
_f0=true;
}
}
}
var _f1=[];
if((this["djConfig"])&&((djConfig["isDebug"])||(djConfig["debugAtAllCosts"]))){
_f1.push("debug.js");
}
if((this["djConfig"])&&(djConfig["debugAtAllCosts"])&&(!_ee)&&(!_f0)){
_f1.push("browser_debug.js");
}
var _f2=djConfig["baseScriptUri"];
if((this["djConfig"])&&(djConfig["baseLoaderUri"])){
_f2=djConfig["baseLoaderUri"];
}
for(var x=0;x<_f1.length;x++){
var _f4=_f2+"src/"+_f1[x];
if(_ee||_ef){
load(_f4);
}else{
try{
document.write("<scr"+"ipt type='text/javascript' src='"+_f4+"'></scr"+"ipt>");
}
catch(e){
var _f5=document.createElement("script");
_f5.src=_f4;
document.getElementsByTagName("head")[0].appendChild(_f5);
}
}
}
})();
dojo.provide("dojo.lang.common");
dojo.lang.inherits=function(_f6,_f7){
if(!dojo.lang.isFunction(_f7)){
dojo.raise("dojo.inherits: superclass argument ["+_f7+"] must be a function (subclass: ["+_f6+"']");
}
_f6.prototype=new _f7();
_f6.prototype.constructor=_f6;
_f6.superclass=_f7.prototype;
_f6["super"]=_f7.prototype;
};
dojo.lang._mixin=function(obj,_f9){
var _fa={};
for(var x in _f9){
if((typeof _fa[x]=="undefined")||(_fa[x]!=_f9[x])){
obj[x]=_f9[x];
}
}
if(dojo.render.html.ie&&(typeof (_f9["toString"])=="function")&&(_f9["toString"]!=obj["toString"])&&(_f9["toString"]!=_fa["toString"])){
obj.toString=_f9.toString;
}
return obj;
};
dojo.lang.mixin=function(obj,_fd){
for(var i=1,l=arguments.length;i<l;i++){
dojo.lang._mixin(obj,arguments[i]);
}
return obj;
};
dojo.lang.extend=function(_100,_101){
for(var i=1,l=arguments.length;i<l;i++){
dojo.lang._mixin(_100.prototype,arguments[i]);
}
return _100;
};
dojo.inherits=dojo.lang.inherits;
dojo.mixin=dojo.lang.mixin;
dojo.extend=dojo.lang.extend;
dojo.lang.find=function(_104,_105,_106,_107){
if(!dojo.lang.isArrayLike(_104)&&dojo.lang.isArrayLike(_105)){
dojo.deprecated("dojo.lang.find(value, array)","use dojo.lang.find(array, value) instead","0.5");
var temp=_104;
_104=_105;
_105=temp;
}
var _109=dojo.lang.isString(_104);
if(_109){
_104=_104.split("");
}
if(_107){
var step=-1;
var i=_104.length-1;
var end=-1;
}else{
var step=1;
var i=0;
var end=_104.length;
}
if(_106){
while(i!=end){
if(_104[i]===_105){
return i;
}
i+=step;
}
}else{
while(i!=end){
if(_104[i]==_105){
return i;
}
i+=step;
}
}
return -1;
};
dojo.lang.indexOf=dojo.lang.find;
dojo.lang.findLast=function(_10d,_10e,_10f){
return dojo.lang.find(_10d,_10e,_10f,true);
};
dojo.lang.lastIndexOf=dojo.lang.findLast;
dojo.lang.inArray=function(_110,_111){
return dojo.lang.find(_110,_111)>-1;
};
dojo.lang.isObject=function(it){
if(typeof it=="undefined"){
return false;
}
return (typeof it=="object"||it===null||dojo.lang.isArray(it)||dojo.lang.isFunction(it));
};
dojo.lang.isArray=function(it){
return (it&&it instanceof Array||typeof it=="array");
};
dojo.lang.isArrayLike=function(it){
if((!it)||(dojo.lang.isUndefined(it))){
return false;
}
if(dojo.lang.isString(it)){
return false;
}
if(dojo.lang.isFunction(it)){
return false;
}
if(dojo.lang.isArray(it)){
return true;
}
if((it.tagName)&&(it.tagName.toLowerCase()=="form")){
return false;
}
if(dojo.lang.isNumber(it.length)&&isFinite(it.length)){
return true;
}
return false;
};
dojo.lang.isFunction=function(it){
return (it instanceof Function||typeof it=="function");
};
(function(){
if((dojo.render.html.capable)&&(dojo.render.html["safari"])){
dojo.lang.isFunction=function(it){
if((typeof (it)=="function")&&(it=="[object NodeList]")){
return false;
}
return (it instanceof Function||typeof it=="function");
};
}
})();
dojo.lang.isString=function(it){
return (typeof it=="string"||it instanceof String);
};
dojo.lang.isAlien=function(it){
if(!it){
return false;
}
return !dojo.lang.isFunction(it)&&/\{\s*\[native code\]\s*\}/.test(String(it));
};
dojo.lang.isBoolean=function(it){
return (it instanceof Boolean||typeof it=="boolean");
};
dojo.lang.isNumber=function(it){
return (it instanceof Number||typeof it=="number");
};
dojo.lang.isUndefined=function(it){
return ((typeof (it)=="undefined")&&(it==undefined));
};
dojo.provide("dojo.lang.array");
dojo.lang.mixin(dojo.lang,{has:function(obj,name){
try{
return typeof obj[name]!="undefined";
}
catch(e){
return false;
}
},isEmpty:function(obj){
if(dojo.lang.isObject(obj)){
var tmp={};
var _120=0;
for(var x in obj){
if(obj[x]&&(!tmp[x])){
_120++;
break;
}
}
return _120==0;
}else{
if(dojo.lang.isArrayLike(obj)||dojo.lang.isString(obj)){
return obj.length==0;
}
}
},map:function(arr,obj,_124){
var _125=dojo.lang.isString(arr);
if(_125){
arr=arr.split("");
}
if(dojo.lang.isFunction(obj)&&(!_124)){
_124=obj;
obj=dj_global;
}else{
if(dojo.lang.isFunction(obj)&&_124){
var _126=obj;
obj=_124;
_124=_126;
}
}
if(Array.map){
var _127=Array.map(arr,_124,obj);
}else{
var _127=[];
for(var i=0;i<arr.length;++i){
_127.push(_124.call(obj,arr[i]));
}
}
if(_125){
return _127.join("");
}else{
return _127;
}
},reduce:function(arr,_12a,obj,_12c){
var _12d=_12a;
if(arguments.length==1){
dojo.debug("dojo.lang.reduce called with too few arguments!");
return false;
}else{
if(arguments.length==2){
_12c=_12a;
_12d=arr.shift();
}else{
if(arguments.lenght==3){
if(dojo.lang.isFunction(obj)){
_12c=obj;
obj=null;
}
}else{
if(dojo.lang.isFunction(obj)){
var tmp=_12c;
_12c=obj;
obj=tmp;
}
}
}
}
var ob=obj?obj:dj_global;
dojo.lang.map(arr,function(val){
_12d=_12c.call(ob,_12d,val);
});
return _12d;
},forEach:function(_131,_132,_133){
if(dojo.lang.isString(_131)){
_131=_131.split("");
}
if(Array.forEach){
Array.forEach(_131,_132,_133);
}else{
if(!_133){
_133=dj_global;
}
for(var i=0,l=_131.length;i<l;i++){
_132.call(_133,_131[i],i,_131);
}
}
},_everyOrSome:function(_136,arr,_138,_139){
if(dojo.lang.isString(arr)){
arr=arr.split("");
}
if(Array.every){
return Array[_136?"every":"some"](arr,_138,_139);
}else{
if(!_139){
_139=dj_global;
}
for(var i=0,l=arr.length;i<l;i++){
var _13c=_138.call(_139,arr[i],i,arr);
if(_136&&!_13c){
return false;
}else{
if((!_136)&&(_13c)){
return true;
}
}
}
return Boolean(_136);
}
},every:function(arr,_13e,_13f){
return this._everyOrSome(true,arr,_13e,_13f);
},some:function(arr,_141,_142){
return this._everyOrSome(false,arr,_141,_142);
},filter:function(arr,_144,_145){
var _146=dojo.lang.isString(arr);
if(_146){
arr=arr.split("");
}
var _147;
if(Array.filter){
_147=Array.filter(arr,_144,_145);
}else{
if(!_145){
if(arguments.length>=3){
dojo.raise("thisObject doesn't exist!");
}
_145=dj_global;
}
_147=[];
for(var i=0;i<arr.length;i++){
if(_144.call(_145,arr[i],i,arr)){
_147.push(arr[i]);
}
}
}
if(_146){
return _147.join("");
}else{
return _147;
}
},unnest:function(){
var out=[];
for(var i=0;i<arguments.length;i++){
if(dojo.lang.isArrayLike(arguments[i])){
var add=dojo.lang.unnest.apply(this,arguments[i]);
out=out.concat(add);
}else{
out.push(arguments[i]);
}
}
return out;
},toArray:function(_14c,_14d){
var _14e=[];
for(var i=_14d||0;i<_14c.length;i++){
_14e.push(_14c[i]);
}
return _14e;
}});
dojo.provide("dojo.lang.extras");
dojo.lang.setTimeout=function(func,_151){
var _152=window,_153=2;
if(!dojo.lang.isFunction(func)){
_152=func;
func=_151;
_151=arguments[2];
_153++;
}
if(dojo.lang.isString(func)){
func=_152[func];
}
var args=[];
for(var i=_153;i<arguments.length;i++){
args.push(arguments[i]);
}
return dojo.global().setTimeout(function(){
func.apply(_152,args);
},_151);
};
dojo.lang.clearTimeout=function(_156){
dojo.global().clearTimeout(_156);
};
dojo.lang.getNameInObj=function(ns,item){
if(!ns){
ns=dj_global;
}
for(var x in ns){
if(ns[x]===item){
return new String(x);
}
}
return null;
};
dojo.lang.shallowCopy=function(obj,deep){
var i,ret;
if(obj===null){
return null;
}
if(dojo.lang.isObject(obj)){
ret=new obj.constructor();
for(i in obj){
if(dojo.lang.isUndefined(ret[i])){
ret[i]=deep?dojo.lang.shallowCopy(obj[i],deep):obj[i];
}
}
}else{
if(dojo.lang.isArray(obj)){
ret=[];
for(i=0;i<obj.length;i++){
ret[i]=deep?dojo.lang.shallowCopy(obj[i],deep):obj[i];
}
}else{
ret=obj;
}
}
return ret;
};
dojo.lang.firstValued=function(){
for(var i=0;i<arguments.length;i++){
if(typeof arguments[i]!="undefined"){
return arguments[i];
}
}
return undefined;
};
dojo.lang.getObjPathValue=function(_15f,_160,_161){
with(dojo.parseObjPath(_15f,_160,_161)){
return dojo.evalProp(prop,obj,_161);
}
};
dojo.lang.setObjPathValue=function(_162,_163,_164,_165){
dojo.deprecated("dojo.lang.setObjPathValue","use dojo.parseObjPath and the '=' operator","0.6");
if(arguments.length<4){
_165=true;
}
with(dojo.parseObjPath(_162,_164,_165)){
if(obj&&(_165||(prop in obj))){
obj[prop]=_163;
}
}
};
dojo.provide("dojo.lang.declare");
dojo.lang.declare=function(_166,_167,init,_169){
if((dojo.lang.isFunction(_169))||((!_169)&&(!dojo.lang.isFunction(init)))){
var temp=_169;
_169=init;
init=temp;
}
var _16b=[];
if(dojo.lang.isArray(_167)){
_16b=_167;
_167=_16b.shift();
}
if(!init){
init=dojo.evalObjPath(_166,false);
if((init)&&(!dojo.lang.isFunction(init))){
init=null;
}
}
var ctor=dojo.lang.declare._makeConstructor();
var scp=(_167?_167.prototype:null);
if(scp){
scp.prototyping=true;
ctor.prototype=new _167();
scp.prototyping=false;
}
ctor.superclass=scp;
ctor.mixins=_16b;
for(var i=0,l=_16b.length;i<l;i++){
dojo.lang.extend(ctor,_16b[i].prototype);
}
ctor.prototype.initializer=null;
ctor.prototype.declaredClass=_166;
if(dojo.lang.isArray(_169)){
dojo.lang.extend.apply(dojo.lang,[ctor].concat(_169));
}else{
dojo.lang.extend(ctor,(_169)||{});
}
dojo.lang.extend(ctor,dojo.lang.declare._common);
ctor.prototype.constructor=ctor;
ctor.prototype.initializer=(ctor.prototype.initializer)||(init)||(function(){
});
var _170=dojo.parseObjPath(_166,null,true);
_170.obj[_170.prop]=ctor;
return ctor;
};
dojo.lang.declare._makeConstructor=function(){
return function(){
var self=this._getPropContext();
var s=self.constructor.superclass;
if((s)&&(s.constructor)){
if(s.constructor==arguments.callee){
this._inherited("constructor",arguments);
}else{
this._contextMethod(s,"constructor",arguments);
}
}
var ms=(self.constructor.mixins)||([]);
for(var i=0,m;(m=ms[i]);i++){
(((m.prototype)&&(m.prototype.initializer))||(m)).apply(this,arguments);
}
if((!this.prototyping)&&(self.initializer)){
self.initializer.apply(this,arguments);
}
};
};
dojo.lang.declare._common={_getPropContext:function(){
return (this.___proto||this);
},_contextMethod:function(_176,_177,args){
var _179,_17a=this.___proto;
this.___proto=_176;
try{
_179=_176[_177].apply(this,(args||[]));
}
catch(e){
throw e;
}
finally{
this.___proto=_17a;
}
return _179;
},_inherited:function(prop,args){
var p=this._getPropContext();
do{
if((!p.constructor)||(!p.constructor.superclass)){
return;
}
p=p.constructor.superclass;
}while(!(prop in p));
return (dojo.lang.isFunction(p[prop])?this._contextMethod(p,prop,args):p[prop]);
},inherited:function(prop,args){
dojo.deprecated("'inherited' method is dangerous, do not up-call! 'inherited' is slated for removal in 0.5; name your super class (or use superclass property) instead.","0.5");
this._inherited(prop,args);
}};
dojo.declare=dojo.lang.declare;
dojo.provide("dojo.lang.func");
dojo.lang.hitch=function(_180,_181){
var fcn=(dojo.lang.isString(_181)?_180[_181]:_181)||function(){
};
return function(){
return fcn.apply(_180,arguments);
};
};
dojo.lang.anonCtr=0;
dojo.lang.anon={};
dojo.lang.nameAnonFunc=function(_183,_184,_185){
var nso=(_184||dojo.lang.anon);
if((_185)||((dj_global["djConfig"])&&(djConfig["slowAnonFuncLookups"]==true))){
for(var x in nso){
try{
if(nso[x]===_183){
return x;
}
}
catch(e){
}
}
}
var ret="__"+dojo.lang.anonCtr++;
while(typeof nso[ret]!="undefined"){
ret="__"+dojo.lang.anonCtr++;
}
nso[ret]=_183;
return ret;
};
dojo.lang.forward=function(_189){
return function(){
return this[_189].apply(this,arguments);
};
};
dojo.lang.curry=function(_18a,func){
var _18c=[];
_18a=_18a||dj_global;
if(dojo.lang.isString(func)){
func=_18a[func];
}
for(var x=2;x<arguments.length;x++){
_18c.push(arguments[x]);
}
var _18e=(func["__preJoinArity"]||func.length)-_18c.length;
function gather(_18f,_190,_191){
var _192=_191;
var _193=_190.slice(0);
for(var x=0;x<_18f.length;x++){
_193.push(_18f[x]);
}
_191=_191-_18f.length;
if(_191<=0){
var res=func.apply(_18a,_193);
_191=_192;
return res;
}else{
return function(){
return gather(arguments,_193,_191);
};
}
}
return gather([],_18c,_18e);
};
dojo.lang.curryArguments=function(_196,func,args,_199){
var _19a=[];
var x=_199||0;
for(x=_199;x<args.length;x++){
_19a.push(args[x]);
}
return dojo.lang.curry.apply(dojo.lang,[_196,func].concat(_19a));
};
dojo.lang.tryThese=function(){
for(var x=0;x<arguments.length;x++){
try{
if(typeof arguments[x]=="function"){
var ret=(arguments[x]());
if(ret){
return ret;
}
}
}
catch(e){
dojo.debug(e);
}
}
};
dojo.lang.delayThese=function(farr,cb,_1a0,_1a1){
if(!farr.length){
if(typeof _1a1=="function"){
_1a1();
}
return;
}
if((typeof _1a0=="undefined")&&(typeof cb=="number")){
_1a0=cb;
cb=function(){
};
}else{
if(!cb){
cb=function(){
};
if(!_1a0){
_1a0=0;
}
}
}
setTimeout(function(){
(farr.shift())();
cb();
dojo.lang.delayThese(farr,cb,_1a0,_1a1);
},_1a0);
};
dojo.provide("dojo.event.common");
dojo.event=new function(){
this._canTimeout=dojo.lang.isFunction(dj_global["setTimeout"])||dojo.lang.isAlien(dj_global["setTimeout"]);
function interpolateArgs(args,_1a3){
var dl=dojo.lang;
var ao={srcObj:dj_global,srcFunc:null,adviceObj:dj_global,adviceFunc:null,aroundObj:null,aroundFunc:null,adviceType:(args.length>2)?args[0]:"after",precedence:"last",once:false,delay:null,rate:0,adviceMsg:false};
switch(args.length){
case 0:
return;
case 1:
return;
case 2:
ao.srcFunc=args[0];
ao.adviceFunc=args[1];
break;
case 3:
if((dl.isObject(args[0]))&&(dl.isString(args[1]))&&(dl.isString(args[2]))){
ao.adviceType="after";
ao.srcObj=args[0];
ao.srcFunc=args[1];
ao.adviceFunc=args[2];
}else{
if((dl.isString(args[1]))&&(dl.isString(args[2]))){
ao.srcFunc=args[1];
ao.adviceFunc=args[2];
}else{
if((dl.isObject(args[0]))&&(dl.isString(args[1]))&&(dl.isFunction(args[2]))){
ao.adviceType="after";
ao.srcObj=args[0];
ao.srcFunc=args[1];
var _1a6=dl.nameAnonFunc(args[2],ao.adviceObj,_1a3);
ao.adviceFunc=_1a6;
}else{
if((dl.isFunction(args[0]))&&(dl.isObject(args[1]))&&(dl.isString(args[2]))){
ao.adviceType="after";
ao.srcObj=dj_global;
var _1a6=dl.nameAnonFunc(args[0],ao.srcObj,_1a3);
ao.srcFunc=_1a6;
ao.adviceObj=args[1];
ao.adviceFunc=args[2];
}
}
}
}
break;
case 4:
if((dl.isObject(args[0]))&&(dl.isObject(args[2]))){
ao.adviceType="after";
ao.srcObj=args[0];
ao.srcFunc=args[1];
ao.adviceObj=args[2];
ao.adviceFunc=args[3];
}else{
if((dl.isString(args[0]))&&(dl.isString(args[1]))&&(dl.isObject(args[2]))){
ao.adviceType=args[0];
ao.srcObj=dj_global;
ao.srcFunc=args[1];
ao.adviceObj=args[2];
ao.adviceFunc=args[3];
}else{
if((dl.isString(args[0]))&&(dl.isFunction(args[1]))&&(dl.isObject(args[2]))){
ao.adviceType=args[0];
ao.srcObj=dj_global;
var _1a6=dl.nameAnonFunc(args[1],dj_global,_1a3);
ao.srcFunc=_1a6;
ao.adviceObj=args[2];
ao.adviceFunc=args[3];
}else{
if((dl.isString(args[0]))&&(dl.isObject(args[1]))&&(dl.isString(args[2]))&&(dl.isFunction(args[3]))){
ao.srcObj=args[1];
ao.srcFunc=args[2];
var _1a6=dl.nameAnonFunc(args[3],dj_global,_1a3);
ao.adviceObj=dj_global;
ao.adviceFunc=_1a6;
}else{
if(dl.isObject(args[1])){
ao.srcObj=args[1];
ao.srcFunc=args[2];
ao.adviceObj=dj_global;
ao.adviceFunc=args[3];
}else{
if(dl.isObject(args[2])){
ao.srcObj=dj_global;
ao.srcFunc=args[1];
ao.adviceObj=args[2];
ao.adviceFunc=args[3];
}else{
ao.srcObj=ao.adviceObj=ao.aroundObj=dj_global;
ao.srcFunc=args[1];
ao.adviceFunc=args[2];
ao.aroundFunc=args[3];
}
}
}
}
}
}
break;
case 6:
ao.srcObj=args[1];
ao.srcFunc=args[2];
ao.adviceObj=args[3];
ao.adviceFunc=args[4];
ao.aroundFunc=args[5];
ao.aroundObj=dj_global;
break;
default:
ao.srcObj=args[1];
ao.srcFunc=args[2];
ao.adviceObj=args[3];
ao.adviceFunc=args[4];
ao.aroundObj=args[5];
ao.aroundFunc=args[6];
ao.once=args[7];
ao.delay=args[8];
ao.rate=args[9];
ao.adviceMsg=args[10];
break;
}
if(dl.isFunction(ao.aroundFunc)){
var _1a6=dl.nameAnonFunc(ao.aroundFunc,ao.aroundObj,_1a3);
ao.aroundFunc=_1a6;
}
if(dl.isFunction(ao.srcFunc)){
ao.srcFunc=dl.getNameInObj(ao.srcObj,ao.srcFunc);
}
if(dl.isFunction(ao.adviceFunc)){
ao.adviceFunc=dl.getNameInObj(ao.adviceObj,ao.adviceFunc);
}
if((ao.aroundObj)&&(dl.isFunction(ao.aroundFunc))){
ao.aroundFunc=dl.getNameInObj(ao.aroundObj,ao.aroundFunc);
}
if(!ao.srcObj){
dojo.raise("bad srcObj for srcFunc: "+ao.srcFunc);
}
if(!ao.adviceObj){
dojo.raise("bad adviceObj for adviceFunc: "+ao.adviceFunc);
}
if(!ao.adviceFunc){
dojo.debug("bad adviceFunc for srcFunc: "+ao.srcFunc);
dojo.debugShallow(ao);
}
return ao;
}
this.connect=function(){
if(arguments.length==1){
var ao=arguments[0];
}else{
var ao=interpolateArgs(arguments,true);
}
if(dojo.lang.isString(ao.srcFunc)&&(ao.srcFunc.toLowerCase()=="onkey")){
if(dojo.render.html.ie){
ao.srcFunc="onkeydown";
this.connect(ao);
}
ao.srcFunc="onkeypress";
}
if(dojo.lang.isArray(ao.srcObj)&&ao.srcObj!=""){
var _1a8={};
for(var x in ao){
_1a8[x]=ao[x];
}
var mjps=[];
dojo.lang.forEach(ao.srcObj,function(src){
if((dojo.render.html.capable)&&(dojo.lang.isString(src))){
src=dojo.byId(src);
}
_1a8.srcObj=src;
mjps.push(dojo.event.connect.call(dojo.event,_1a8));
});
return mjps;
}
var mjp=dojo.event.MethodJoinPoint.getForMethod(ao.srcObj,ao.srcFunc);
if(ao.adviceFunc){
var mjp2=dojo.event.MethodJoinPoint.getForMethod(ao.adviceObj,ao.adviceFunc);
}
mjp.kwAddAdvice(ao);
return mjp;
};
this.log=function(a1,a2){
var _1b0;
if((arguments.length==1)&&(typeof a1=="object")){
_1b0=a1;
}else{
_1b0={srcObj:a1,srcFunc:a2};
}
_1b0.adviceFunc=function(){
var _1b1=[];
for(var x=0;x<arguments.length;x++){
_1b1.push(arguments[x]);
}
dojo.debug("("+_1b0.srcObj+")."+_1b0.srcFunc,":",_1b1.join(", "));
};
this.kwConnect(_1b0);
};
this.connectBefore=function(){
var args=["before"];
for(var i=0;i<arguments.length;i++){
args.push(arguments[i]);
}
return this.connect.apply(this,args);
};
this.connectAround=function(){
var args=["around"];
for(var i=0;i<arguments.length;i++){
args.push(arguments[i]);
}
return this.connect.apply(this,args);
};
this.connectOnce=function(){
var ao=interpolateArgs(arguments,true);
ao.once=true;
return this.connect(ao);
};
this._kwConnectImpl=function(_1b8,_1b9){
var fn=(_1b9)?"disconnect":"connect";
if(typeof _1b8["srcFunc"]=="function"){
_1b8.srcObj=_1b8["srcObj"]||dj_global;
var _1bb=dojo.lang.nameAnonFunc(_1b8.srcFunc,_1b8.srcObj,true);
_1b8.srcFunc=_1bb;
}
if(typeof _1b8["adviceFunc"]=="function"){
_1b8.adviceObj=_1b8["adviceObj"]||dj_global;
var _1bb=dojo.lang.nameAnonFunc(_1b8.adviceFunc,_1b8.adviceObj,true);
_1b8.adviceFunc=_1bb;
}
_1b8.srcObj=_1b8["srcObj"]||dj_global;
_1b8.adviceObj=_1b8["adviceObj"]||_1b8["targetObj"]||dj_global;
_1b8.adviceFunc=_1b8["adviceFunc"]||_1b8["targetFunc"];
return dojo.event[fn](_1b8);
};
this.kwConnect=function(_1bc){
return this._kwConnectImpl(_1bc,false);
};
this.disconnect=function(){
if(arguments.length==1){
var ao=arguments[0];
}else{
var ao=interpolateArgs(arguments,true);
}
if(!ao.adviceFunc){
return;
}
if(dojo.lang.isString(ao.srcFunc)&&(ao.srcFunc.toLowerCase()=="onkey")){
if(dojo.render.html.ie){
ao.srcFunc="onkeydown";
this.disconnect(ao);
}
ao.srcFunc="onkeypress";
}
if(!ao.srcObj[ao.srcFunc]){
return null;
}
var mjp=dojo.event.MethodJoinPoint.getForMethod(ao.srcObj,ao.srcFunc,true);
mjp.removeAdvice(ao.adviceObj,ao.adviceFunc,ao.adviceType,ao.once);
return mjp;
};
this.kwDisconnect=function(_1bf){
return this._kwConnectImpl(_1bf,true);
};
};
dojo.event.MethodInvocation=function(_1c0,obj,args){
this.jp_=_1c0;
this.object=obj;
this.args=[];
for(var x=0;x<args.length;x++){
this.args[x]=args[x];
}
this.around_index=-1;
};
dojo.event.MethodInvocation.prototype.proceed=function(){
this.around_index++;
if(this.around_index>=this.jp_.around.length){
return this.jp_.object[this.jp_.methodname].apply(this.jp_.object,this.args);
}else{
var ti=this.jp_.around[this.around_index];
var mobj=ti[0]||dj_global;
var meth=ti[1];
return mobj[meth].call(mobj,this);
}
};
dojo.event.MethodJoinPoint=function(obj,_1c8){
this.object=obj||dj_global;
this.methodname=_1c8;
this.methodfunc=this.object[_1c8];
this.squelch=false;
};
dojo.event.MethodJoinPoint.getForMethod=function(obj,_1ca){
if(!obj){
obj=dj_global;
}
if(!obj[_1ca]){
obj[_1ca]=function(){
};
if(!obj[_1ca]){
dojo.raise("Cannot set do-nothing method on that object "+_1ca);
}
}else{
if((!dojo.lang.isFunction(obj[_1ca]))&&(!dojo.lang.isAlien(obj[_1ca]))){
return null;
}
}
var _1cb=_1ca+"$joinpoint";
var _1cc=_1ca+"$joinpoint$method";
var _1cd=obj[_1cb];
if(!_1cd){
var _1ce=false;
if(dojo.event["browser"]){
if((obj["attachEvent"])||(obj["nodeType"])||(obj["addEventListener"])){
_1ce=true;
dojo.event.browser.addClobberNodeAttrs(obj,[_1cb,_1cc,_1ca]);
}
}
var _1cf=obj[_1ca].length;
obj[_1cc]=obj[_1ca];
_1cd=obj[_1cb]=new dojo.event.MethodJoinPoint(obj,_1cc);
obj[_1ca]=function(){
var args=[];
if((_1ce)&&(!arguments.length)){
var evt=null;
try{
if(obj.ownerDocument){
evt=obj.ownerDocument.parentWindow.event;
}else{
if(obj.documentElement){
evt=obj.documentElement.ownerDocument.parentWindow.event;
}else{
if(obj.event){
evt=obj.event;
}else{
evt=window.event;
}
}
}
}
catch(e){
evt=window.event;
}
if(evt){
args.push(dojo.event.browser.fixEvent(evt,this));
}
}else{
for(var x=0;x<arguments.length;x++){
if((x==0)&&(_1ce)&&(dojo.event.browser.isEvent(arguments[x]))){
args.push(dojo.event.browser.fixEvent(arguments[x],this));
}else{
args.push(arguments[x]);
}
}
}
return _1cd.run.apply(_1cd,args);
};
obj[_1ca].__preJoinArity=_1cf;
}
return _1cd;
};
dojo.lang.extend(dojo.event.MethodJoinPoint,{unintercept:function(){
this.object[this.methodname]=this.methodfunc;
this.before=[];
this.after=[];
this.around=[];
},disconnect:dojo.lang.forward("unintercept"),run:function(){
var obj=this.object||dj_global;
var args=arguments;
var _1d5=[];
for(var x=0;x<args.length;x++){
_1d5[x]=args[x];
}
var _1d7=function(marr){
if(!marr){
dojo.debug("Null argument to unrollAdvice()");
return;
}
var _1d9=marr[0]||dj_global;
var _1da=marr[1];
if(!_1d9[_1da]){
dojo.raise("function \""+_1da+"\" does not exist on \""+_1d9+"\"");
}
var _1db=marr[2]||dj_global;
var _1dc=marr[3];
var msg=marr[6];
var _1de;
var to={args:[],jp_:this,object:obj,proceed:function(){
return _1d9[_1da].apply(_1d9,to.args);
}};
to.args=_1d5;
var _1e0=parseInt(marr[4]);
var _1e1=((!isNaN(_1e0))&&(marr[4]!==null)&&(typeof marr[4]!="undefined"));
if(marr[5]){
var rate=parseInt(marr[5]);
var cur=new Date();
var _1e4=false;
if((marr["last"])&&((cur-marr.last)<=rate)){
if(dojo.event._canTimeout){
if(marr["delayTimer"]){
clearTimeout(marr.delayTimer);
}
var tod=parseInt(rate*2);
var mcpy=dojo.lang.shallowCopy(marr);
marr.delayTimer=setTimeout(function(){
mcpy[5]=0;
_1d7(mcpy);
},tod);
}
return;
}else{
marr.last=cur;
}
}
if(_1dc){
_1db[_1dc].call(_1db,to);
}else{
if((_1e1)&&((dojo.render.html)||(dojo.render.svg))){
dj_global["setTimeout"](function(){
if(msg){
_1d9[_1da].call(_1d9,to);
}else{
_1d9[_1da].apply(_1d9,args);
}
},_1e0);
}else{
if(msg){
_1d9[_1da].call(_1d9,to);
}else{
_1d9[_1da].apply(_1d9,args);
}
}
}
};
var _1e7=function(){
if(this.squelch){
try{
return _1d7.apply(this,arguments);
}
catch(e){
dojo.debug(e);
}
}else{
return _1d7.apply(this,arguments);
}
};
if((this["before"])&&(this.before.length>0)){
dojo.lang.forEach(this.before.concat(new Array()),_1e7);
}
var _1e8;
try{
if((this["around"])&&(this.around.length>0)){
var mi=new dojo.event.MethodInvocation(this,obj,args);
_1e8=mi.proceed();
}else{
if(this.methodfunc){
_1e8=this.object[this.methodname].apply(this.object,args);
}
}
}
catch(e){
if(!this.squelch){
dojo.debug(e,"when calling",this.methodname,"on",this.object,"with arguments",args);
dojo.raise(e);
}
}
if((this["after"])&&(this.after.length>0)){
dojo.lang.forEach(this.after.concat(new Array()),_1e7);
}
return (this.methodfunc)?_1e8:null;
},getArr:function(kind){
var type="after";
if((typeof kind=="string")&&(kind.indexOf("before")!=-1)){
type="before";
}else{
if(kind=="around"){
type="around";
}
}
if(!this[type]){
this[type]=[];
}
return this[type];
},kwAddAdvice:function(args){
this.addAdvice(args["adviceObj"],args["adviceFunc"],args["aroundObj"],args["aroundFunc"],args["adviceType"],args["precedence"],args["once"],args["delay"],args["rate"],args["adviceMsg"]);
},addAdvice:function(_1ed,_1ee,_1ef,_1f0,_1f1,_1f2,once,_1f4,rate,_1f6){
var arr=this.getArr(_1f1);
if(!arr){
dojo.raise("bad this: "+this);
}
var ao=[_1ed,_1ee,_1ef,_1f0,_1f4,rate,_1f6];
if(once){
if(this.hasAdvice(_1ed,_1ee,_1f1,arr)>=0){
return;
}
}
if(_1f2=="first"){
arr.unshift(ao);
}else{
arr.push(ao);
}
},hasAdvice:function(_1f9,_1fa,_1fb,arr){
if(!arr){
arr=this.getArr(_1fb);
}
var ind=-1;
for(var x=0;x<arr.length;x++){
var aao=(typeof _1fa=="object")?(new String(_1fa)).toString():_1fa;
var a1o=(typeof arr[x][1]=="object")?(new String(arr[x][1])).toString():arr[x][1];
if((arr[x][0]==_1f9)&&(a1o==aao)){
ind=x;
}
}
return ind;
},removeAdvice:function(_201,_202,_203,once){
var arr=this.getArr(_203);
var ind=this.hasAdvice(_201,_202,_203,arr);
if(ind==-1){
return false;
}
while(ind!=-1){
arr.splice(ind,1);
if(once){
break;
}
ind=this.hasAdvice(_201,_202,_203,arr);
}
return true;
}});
dojo.provide("dojo.event.topic");
dojo.event.topic=new function(){
this.topics={};
this.getTopic=function(_207){
if(!this.topics[_207]){
this.topics[_207]=new this.TopicImpl(_207);
}
return this.topics[_207];
};
this.registerPublisher=function(_208,obj,_20a){
var _208=this.getTopic(_208);
_208.registerPublisher(obj,_20a);
};
this.subscribe=function(_20b,obj,_20d){
var _20b=this.getTopic(_20b);
_20b.subscribe(obj,_20d);
};
this.unsubscribe=function(_20e,obj,_210){
var _20e=this.getTopic(_20e);
_20e.unsubscribe(obj,_210);
};
this.destroy=function(_211){
this.getTopic(_211).destroy();
delete this.topics[_211];
};
this.publishApply=function(_212,args){
var _212=this.getTopic(_212);
_212.sendMessage.apply(_212,args);
};
this.publish=function(_214,_215){
var _214=this.getTopic(_214);
var args=[];
for(var x=1;x<arguments.length;x++){
args.push(arguments[x]);
}
_214.sendMessage.apply(_214,args);
};
};
dojo.event.topic.TopicImpl=function(_218){
this.topicName=_218;
this.subscribe=function(_219,_21a){
var tf=_21a||_219;
var to=(!_21a)?dj_global:_219;
return dojo.event.kwConnect({srcObj:this,srcFunc:"sendMessage",adviceObj:to,adviceFunc:tf});
};
this.unsubscribe=function(_21d,_21e){
var tf=(!_21e)?_21d:_21e;
var to=(!_21e)?null:_21d;
return dojo.event.kwDisconnect({srcObj:this,srcFunc:"sendMessage",adviceObj:to,adviceFunc:tf});
};
this._getJoinPoint=function(){
return dojo.event.MethodJoinPoint.getForMethod(this,"sendMessage");
};
this.setSquelch=function(_221){
this._getJoinPoint().squelch=_221;
};
this.destroy=function(){
this._getJoinPoint().disconnect();
};
this.registerPublisher=function(_222,_223){
dojo.event.connect(_222,_223,this,"sendMessage");
};
this.sendMessage=function(_224){
};
};
dojo.provide("dojo.event.browser");
dojo._ie_clobber=new function(){
this.clobberNodes=[];
function nukeProp(node,prop){
try{
node[prop]=null;
}
catch(e){
}
try{
delete node[prop];
}
catch(e){
}
try{
node.removeAttribute(prop);
}
catch(e){
}
}
this.clobber=function(_227){
var na;
var tna;
if(_227){
tna=_227.all||_227.getElementsByTagName("*");
na=[_227];
for(var x=0;x<tna.length;x++){
if(tna[x]["__doClobber__"]){
na.push(tna[x]);
}
}
}else{
try{
window.onload=null;
}
catch(e){
}
na=(this.clobberNodes.length)?this.clobberNodes:document.all;
}
tna=null;
var _22b={};
for(var i=na.length-1;i>=0;i=i-1){
var el=na[i];
try{
if(el&&el["__clobberAttrs__"]){
for(var j=0;j<el.__clobberAttrs__.length;j++){
nukeProp(el,el.__clobberAttrs__[j]);
}
nukeProp(el,"__clobberAttrs__");
nukeProp(el,"__doClobber__");
}
}
catch(e){
}
}
na=null;
};
};
if(dojo.render.html.ie){
dojo.addOnUnload(function(){
dojo._ie_clobber.clobber();
try{
if((dojo["widget"])&&(dojo.widget["manager"])){
dojo.widget.manager.destroyAll();
}
}
catch(e){
}
if(dojo.widget){
for(var name in dojo.widget._templateCache){
if(dojo.widget._templateCache[name].node){
dojo.dom.destroyNode(dojo.widget._templateCache[name].node);
dojo.widget._templateCache[name].node=null;
delete dojo.widget._templateCache[name].node;
}
}
}
try{
window.onload=null;
}
catch(e){
}
try{
window.onunload=null;
}
catch(e){
}
dojo._ie_clobber.clobberNodes=[];
});
}
dojo.event.browser=new function(){
var _230=0;
this.normalizedEventName=function(_231){
switch(_231){
case "CheckboxStateChange":
case "DOMAttrModified":
case "DOMMenuItemActive":
case "DOMMenuItemInactive":
case "DOMMouseScroll":
case "DOMNodeInserted":
case "DOMNodeRemoved":
case "RadioStateChange":
return _231;
break;
default:
return _231.toLowerCase();
break;
}
};
this.clean=function(node){
if(dojo.render.html.ie){
dojo._ie_clobber.clobber(node);
}
};
this.addClobberNode=function(node){
if(!dojo.render.html.ie){
return;
}
if(!node["__doClobber__"]){
node.__doClobber__=true;
dojo._ie_clobber.clobberNodes.push(node);
node.__clobberAttrs__=[];
}
};
this.addClobberNodeAttrs=function(node,_235){
if(!dojo.render.html.ie){
return;
}
this.addClobberNode(node);
for(var x=0;x<_235.length;x++){
node.__clobberAttrs__.push(_235[x]);
}
};
this.removeListener=function(node,_238,fp,_23a){
if(!_23a){
var _23a=false;
}
_238=dojo.event.browser.normalizedEventName(_238);
if((_238=="onkey")||(_238=="key")){
if(dojo.render.html.ie){
this.removeListener(node,"onkeydown",fp,_23a);
}
_238="onkeypress";
}
if(_238.substr(0,2)=="on"){
_238=_238.substr(2);
}
if(node.removeEventListener){
node.removeEventListener(_238,fp,_23a);
}
};
this.addListener=function(node,_23c,fp,_23e,_23f){
if(!node){
return;
}
if(!_23e){
var _23e=false;
}
_23c=dojo.event.browser.normalizedEventName(_23c);
if((_23c=="onkey")||(_23c=="key")){
if(dojo.render.html.ie){
this.addListener(node,"onkeydown",fp,_23e,_23f);
}
_23c="onkeypress";
}
if(_23c.substr(0,2)!="on"){
_23c="on"+_23c;
}
if(!_23f){
var _240=function(evt){
if(!evt){
evt=window.event;
}
var ret=fp(dojo.event.browser.fixEvent(evt,this));
if(_23e){
dojo.event.browser.stopEvent(evt);
}
return ret;
};
}else{
_240=fp;
}
if(node.addEventListener){
node.addEventListener(_23c.substr(2),_240,_23e);
return _240;
}else{
if(typeof node[_23c]=="function"){
var _243=node[_23c];
node[_23c]=function(e){
_243(e);
return _240(e);
};
}else{
node[_23c]=_240;
}
if(dojo.render.html.ie){
this.addClobberNodeAttrs(node,[_23c]);
}
return _240;
}
};
this.isEvent=function(obj){
return (typeof obj!="undefined")&&(obj)&&(typeof Event!="undefined")&&(obj.eventPhase);
};
this.currentEvent=null;
this.callListener=function(_246,_247){
if(typeof _246!="function"){
dojo.raise("listener not a function: "+_246);
}
dojo.event.browser.currentEvent.currentTarget=_247;
return _246.call(_247,dojo.event.browser.currentEvent);
};
this._stopPropagation=function(){
dojo.event.browser.currentEvent.cancelBubble=true;
};
this._preventDefault=function(){
dojo.event.browser.currentEvent.returnValue=false;
};
this.keys={KEY_BACKSPACE:8,KEY_TAB:9,KEY_CLEAR:12,KEY_ENTER:13,KEY_SHIFT:16,KEY_CTRL:17,KEY_ALT:18,KEY_PAUSE:19,KEY_CAPS_LOCK:20,KEY_ESCAPE:27,KEY_SPACE:32,KEY_PAGE_UP:33,KEY_PAGE_DOWN:34,KEY_END:35,KEY_HOME:36,KEY_LEFT_ARROW:37,KEY_UP_ARROW:38,KEY_RIGHT_ARROW:39,KEY_DOWN_ARROW:40,KEY_INSERT:45,KEY_DELETE:46,KEY_HELP:47,KEY_LEFT_WINDOW:91,KEY_RIGHT_WINDOW:92,KEY_SELECT:93,KEY_NUMPAD_0:96,KEY_NUMPAD_1:97,KEY_NUMPAD_2:98,KEY_NUMPAD_3:99,KEY_NUMPAD_4:100,KEY_NUMPAD_5:101,KEY_NUMPAD_6:102,KEY_NUMPAD_7:103,KEY_NUMPAD_8:104,KEY_NUMPAD_9:105,KEY_NUMPAD_MULTIPLY:106,KEY_NUMPAD_PLUS:107,KEY_NUMPAD_ENTER:108,KEY_NUMPAD_MINUS:109,KEY_NUMPAD_PERIOD:110,KEY_NUMPAD_DIVIDE:111,KEY_F1:112,KEY_F2:113,KEY_F3:114,KEY_F4:115,KEY_F5:116,KEY_F6:117,KEY_F7:118,KEY_F8:119,KEY_F9:120,KEY_F10:121,KEY_F11:122,KEY_F12:123,KEY_F13:124,KEY_F14:125,KEY_F15:126,KEY_NUM_LOCK:144,KEY_SCROLL_LOCK:145};
this.revKeys=[];
for(var key in this.keys){
this.revKeys[this.keys[key]]=key;
}
this.fixEvent=function(evt,_24a){
if(!evt){
if(window["event"]){
evt=window.event;
}
}
if((evt["type"])&&(evt["type"].indexOf("key")==0)){
evt.keys=this.revKeys;
for(var key in this.keys){
evt[key]=this.keys[key];
}
if(evt["type"]=="keydown"&&dojo.render.html.ie){
switch(evt.keyCode){
case evt.KEY_SHIFT:
case evt.KEY_CTRL:
case evt.KEY_ALT:
case evt.KEY_CAPS_LOCK:
case evt.KEY_LEFT_WINDOW:
case evt.KEY_RIGHT_WINDOW:
case evt.KEY_SELECT:
case evt.KEY_NUM_LOCK:
case evt.KEY_SCROLL_LOCK:
case evt.KEY_NUMPAD_0:
case evt.KEY_NUMPAD_1:
case evt.KEY_NUMPAD_2:
case evt.KEY_NUMPAD_3:
case evt.KEY_NUMPAD_4:
case evt.KEY_NUMPAD_5:
case evt.KEY_NUMPAD_6:
case evt.KEY_NUMPAD_7:
case evt.KEY_NUMPAD_8:
case evt.KEY_NUMPAD_9:
case evt.KEY_NUMPAD_PERIOD:
break;
case evt.KEY_NUMPAD_MULTIPLY:
case evt.KEY_NUMPAD_PLUS:
case evt.KEY_NUMPAD_ENTER:
case evt.KEY_NUMPAD_MINUS:
case evt.KEY_NUMPAD_DIVIDE:
break;
case evt.KEY_PAUSE:
case evt.KEY_TAB:
case evt.KEY_BACKSPACE:
case evt.KEY_ENTER:
case evt.KEY_ESCAPE:
case evt.KEY_PAGE_UP:
case evt.KEY_PAGE_DOWN:
case evt.KEY_END:
case evt.KEY_HOME:
case evt.KEY_LEFT_ARROW:
case evt.KEY_UP_ARROW:
case evt.KEY_RIGHT_ARROW:
case evt.KEY_DOWN_ARROW:
case evt.KEY_INSERT:
case evt.KEY_DELETE:
case evt.KEY_F1:
case evt.KEY_F2:
case evt.KEY_F3:
case evt.KEY_F4:
case evt.KEY_F5:
case evt.KEY_F6:
case evt.KEY_F7:
case evt.KEY_F8:
case evt.KEY_F9:
case evt.KEY_F10:
case evt.KEY_F11:
case evt.KEY_F12:
case evt.KEY_F12:
case evt.KEY_F13:
case evt.KEY_F14:
case evt.KEY_F15:
case evt.KEY_CLEAR:
case evt.KEY_HELP:
evt.key=evt.keyCode;
break;
default:
if(evt.ctrlKey||evt.altKey){
var _24c=evt.keyCode;
if(_24c>=65&&_24c<=90&&evt.shiftKey==false){
_24c+=32;
}
if(_24c>=1&&_24c<=26&&evt.ctrlKey){
_24c+=96;
}
evt.key=String.fromCharCode(_24c);
}
}
}else{
if(evt["type"]=="keypress"){
if(dojo.render.html.opera){
if(evt.which==0){
evt.key=evt.keyCode;
}else{
if(evt.which>0){
switch(evt.which){
case evt.KEY_SHIFT:
case evt.KEY_CTRL:
case evt.KEY_ALT:
case evt.KEY_CAPS_LOCK:
case evt.KEY_NUM_LOCK:
case evt.KEY_SCROLL_LOCK:
break;
case evt.KEY_PAUSE:
case evt.KEY_TAB:
case evt.KEY_BACKSPACE:
case evt.KEY_ENTER:
case evt.KEY_ESCAPE:
evt.key=evt.which;
break;
default:
var _24c=evt.which;
if((evt.ctrlKey||evt.altKey||evt.metaKey)&&(evt.which>=65&&evt.which<=90&&evt.shiftKey==false)){
_24c+=32;
}
evt.key=String.fromCharCode(_24c);
}
}
}
}else{
if(dojo.render.html.ie){
if(!evt.ctrlKey&&!evt.altKey&&evt.keyCode>=evt.KEY_SPACE){
evt.key=String.fromCharCode(evt.keyCode);
}
}else{
if(dojo.render.html.safari){
switch(evt.keyCode){
case 25:
evt.key=evt.KEY_TAB;
evt.shift=true;
break;
case 63232:
evt.key=evt.KEY_UP_ARROW;
break;
case 63233:
evt.key=evt.KEY_DOWN_ARROW;
break;
case 63234:
evt.key=evt.KEY_LEFT_ARROW;
break;
case 63235:
evt.key=evt.KEY_RIGHT_ARROW;
break;
case 63236:
evt.key=evt.KEY_F1;
break;
case 63237:
evt.key=evt.KEY_F2;
break;
case 63238:
evt.key=evt.KEY_F3;
break;
case 63239:
evt.key=evt.KEY_F4;
break;
case 63240:
evt.key=evt.KEY_F5;
break;
case 63241:
evt.key=evt.KEY_F6;
break;
case 63242:
evt.key=evt.KEY_F7;
break;
case 63243:
evt.key=evt.KEY_F8;
break;
case 63244:
evt.key=evt.KEY_F9;
break;
case 63245:
evt.key=evt.KEY_F10;
break;
case 63246:
evt.key=evt.KEY_F11;
break;
case 63247:
evt.key=evt.KEY_F12;
break;
case 63250:
evt.key=evt.KEY_PAUSE;
break;
case 63272:
evt.key=evt.KEY_DELETE;
break;
case 63273:
evt.key=evt.KEY_HOME;
break;
case 63275:
evt.key=evt.KEY_END;
break;
case 63276:
evt.key=evt.KEY_PAGE_UP;
break;
case 63277:
evt.key=evt.KEY_PAGE_DOWN;
break;
case 63302:
evt.key=evt.KEY_INSERT;
break;
case 63248:
case 63249:
case 63289:
break;
default:
evt.key=evt.charCode>=evt.KEY_SPACE?String.fromCharCode(evt.charCode):evt.keyCode;
}
}else{
evt.key=evt.charCode>0?String.fromCharCode(evt.charCode):evt.keyCode;
}
}
}
}
}
}
if(dojo.render.html.ie){
if(!evt.target){
evt.target=evt.srcElement;
}
if(!evt.currentTarget){
evt.currentTarget=(_24a?_24a:evt.srcElement);
}
if(!evt.layerX){
evt.layerX=evt.offsetX;
}
if(!evt.layerY){
evt.layerY=evt.offsetY;
}
var doc=(evt.srcElement&&evt.srcElement.ownerDocument)?evt.srcElement.ownerDocument:document;
var _24e=((dojo.render.html.ie55)||(doc["compatMode"]=="BackCompat"))?doc.body:doc.documentElement;
if(!evt.pageX){
evt.pageX=evt.clientX+(_24e.scrollLeft||0);
}
if(!evt.pageY){
evt.pageY=evt.clientY+(_24e.scrollTop||0);
}
if(evt.type=="mouseover"){
evt.relatedTarget=evt.fromElement;
}
if(evt.type=="mouseout"){
evt.relatedTarget=evt.toElement;
}
this.currentEvent=evt;
evt.callListener=this.callListener;
evt.stopPropagation=this._stopPropagation;
evt.preventDefault=this._preventDefault;
}
return evt;
};
this.stopEvent=function(evt){
if(window.event){
evt.cancelBubble=true;
evt.returnValue=false;
}else{
evt.preventDefault();
evt.stopPropagation();
}
};
};
dojo.provide("dojo.event.*");
dojo.provide("dojo.event");
dojo.deprecated("dojo.event","replaced by dojo.event.*","0.5");
dojo.provide("dojo.string.common");
dojo.string.trim=function(str,wh){
if(!str.replace){
return str;
}
if(!str.length){
return str;
}
var re=(wh>0)?(/^\s+/):(wh<0)?(/\s+$/):(/^\s+|\s+$/g);
return str.replace(re,"");
};
dojo.string.trimStart=function(str){
return dojo.string.trim(str,1);
};
dojo.string.trimEnd=function(str){
return dojo.string.trim(str,-1);
};
dojo.string.repeat=function(str,_256,_257){
var out="";
for(var i=0;i<_256;i++){
out+=str;
if(_257&&i<_256-1){
out+=_257;
}
}
return out;
};
dojo.string.pad=function(str,len,c,dir){
var out=String(str);
if(!c){
c="0";
}
if(!dir){
dir=1;
}
while(out.length<len){
if(dir>0){
out=c+out;
}else{
out+=c;
}
}
return out;
};
dojo.string.padLeft=function(str,len,c){
return dojo.string.pad(str,len,c,1);
};
dojo.string.padRight=function(str,len,c){
return dojo.string.pad(str,len,c,-1);
};
dojo.provide("dojo.string.extras");
dojo.string.substituteParams=function(_265,hash){
var map=(typeof hash=="object")?hash:dojo.lang.toArray(arguments,1);
return _265.replace(/\%\{(\w+)\}/g,function(_268,key){
if(typeof (map[key])!="undefined"&&map[key]!=null){
return map[key];
}
dojo.raise("Substitution not found: "+key);
});
};
dojo.string.capitalize=function(str){
if(!dojo.lang.isString(str)){
return "";
}
if(arguments.length==0){
str=this;
}
var _26b=str.split(" ");
for(var i=0;i<_26b.length;i++){
_26b[i]=_26b[i].charAt(0).toUpperCase()+_26b[i].substring(1);
}
return _26b.join(" ");
};
dojo.string.isBlank=function(str){
if(!dojo.lang.isString(str)){
return true;
}
return (dojo.string.trim(str).length==0);
};
dojo.string.encodeAscii=function(str){
if(!dojo.lang.isString(str)){
return str;
}
var ret="";
var _270=escape(str);
var _271,re=/%u([0-9A-F]{4})/i;
while((_271=_270.match(re))){
var num=Number("0x"+_271[1]);
var _274=escape("&#"+num+";");
ret+=_270.substring(0,_271.index)+_274;
_270=_270.substring(_271.index+_271[0].length);
}
ret+=_270.replace(/\+/g,"%2B");
return ret;
};
dojo.string.escape=function(type,str){
var args=dojo.lang.toArray(arguments,1);
switch(type.toLowerCase()){
case "xml":
case "html":
case "xhtml":
return dojo.string.escapeXml.apply(this,args);
case "sql":
return dojo.string.escapeSql.apply(this,args);
case "regexp":
case "regex":
return dojo.string.escapeRegExp.apply(this,args);
case "javascript":
case "jscript":
case "js":
return dojo.string.escapeJavaScript.apply(this,args);
case "ascii":
return dojo.string.encodeAscii.apply(this,args);
default:
return str;
}
};
dojo.string.escapeXml=function(str,_279){
str=str.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").replace(/"/gm,"&quot;");
if(!_279){
str=str.replace(/'/gm,"&#39;");
}
return str;
};
dojo.string.escapeSql=function(str){
return str.replace(/'/gm,"''");
};
dojo.string.escapeRegExp=function(str){
return str.replace(/\\/gm,"\\\\").replace(/([\f\b\n\t\r[\^$|?*+(){}])/gm,"\\$1");
};
dojo.string.escapeJavaScript=function(str){
return str.replace(/(["'\f\b\n\t\r])/gm,"\\$1");
};
dojo.string.escapeString=function(str){
return ("\""+str.replace(/(["\\])/g,"\\$1")+"\"").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r");
};
dojo.string.summary=function(str,len){
if(!len||str.length<=len){
return str;
}
return str.substring(0,len).replace(/\.+$/,"")+"...";
};
dojo.string.endsWith=function(str,end,_282){
if(_282){
str=str.toLowerCase();
end=end.toLowerCase();
}
if((str.length-end.length)<0){
return false;
}
return str.lastIndexOf(end)==str.length-end.length;
};
dojo.string.endsWithAny=function(str){
for(var i=1;i<arguments.length;i++){
if(dojo.string.endsWith(str,arguments[i])){
return true;
}
}
return false;
};
dojo.string.startsWith=function(str,_286,_287){
if(_287){
str=str.toLowerCase();
_286=_286.toLowerCase();
}
return str.indexOf(_286)==0;
};
dojo.string.startsWithAny=function(str){
for(var i=1;i<arguments.length;i++){
if(dojo.string.startsWith(str,arguments[i])){
return true;
}
}
return false;
};
dojo.string.has=function(str){
for(var i=1;i<arguments.length;i++){
if(str.indexOf(arguments[i])>-1){
return true;
}
}
return false;
};
dojo.string.normalizeNewlines=function(text,_28d){
if(_28d=="\n"){
text=text.replace(/\r\n/g,"\n");
text=text.replace(/\r/g,"\n");
}else{
if(_28d=="\r"){
text=text.replace(/\r\n/g,"\r");
text=text.replace(/\n/g,"\r");
}else{
text=text.replace(/([^\r])\n/g,"$1\r\n").replace(/\r([^\n])/g,"\r\n$1");
}
}
return text;
};
dojo.string.splitEscaped=function(str,_28f){
var _290=[];
for(var i=0,_292=0;i<str.length;i++){
if(str.charAt(i)=="\\"){
i++;
continue;
}
if(str.charAt(i)==_28f){
_290.push(str.substring(_292,i));
_292=i+1;
}
}
_290.push(str.substr(_292));
return _290;
};
dojo.provide("dojo.string");
dojo.provide("dojo.io.common");
dojo.io.transports=[];
dojo.io.hdlrFuncNames=["load","error","timeout"];
dojo.io.Request=function(url,_294,_295,_296){
if((arguments.length==1)&&(arguments[0].constructor==Object)){
this.fromKwArgs(arguments[0]);
}else{
this.url=url;
if(_294){
this.mimetype=_294;
}
if(_295){
this.transport=_295;
}
if(arguments.length>=4){
this.changeUrl=_296;
}
}
};
dojo.lang.extend(dojo.io.Request,{url:"",mimetype:"text/plain",method:"GET",content:undefined,transport:undefined,changeUrl:undefined,formNode:undefined,sync:false,bindSuccess:false,useCache:false,preventCache:false,load:function(type,data,_299,_29a){
},error:function(type,_29c,_29d,_29e){
},timeout:function(type,_2a0,_2a1,_2a2){
},handle:function(type,data,_2a5,_2a6){
},timeoutSeconds:0,abort:function(){
},fromKwArgs:function(_2a7){
if(_2a7["url"]){
_2a7.url=_2a7.url.toString();
}
if(_2a7["formNode"]){
_2a7.formNode=dojo.byId(_2a7.formNode);
}
if(!_2a7["method"]&&_2a7["formNode"]&&_2a7["formNode"].method){
_2a7.method=_2a7["formNode"].method;
}
if(!_2a7["handle"]&&_2a7["handler"]){
_2a7.handle=_2a7.handler;
}
if(!_2a7["load"]&&_2a7["loaded"]){
_2a7.load=_2a7.loaded;
}
if(!_2a7["changeUrl"]&&_2a7["changeURL"]){
_2a7.changeUrl=_2a7.changeURL;
}
_2a7.encoding=dojo.lang.firstValued(_2a7["encoding"],djConfig["bindEncoding"],"");
_2a7.sendTransport=dojo.lang.firstValued(_2a7["sendTransport"],djConfig["ioSendTransport"],false);
var _2a8=dojo.lang.isFunction;
for(var x=0;x<dojo.io.hdlrFuncNames.length;x++){
var fn=dojo.io.hdlrFuncNames[x];
if(_2a7[fn]&&_2a8(_2a7[fn])){
continue;
}
if(_2a7["handle"]&&_2a8(_2a7["handle"])){
_2a7[fn]=_2a7.handle;
}
}
dojo.lang.mixin(this,_2a7);
}});
dojo.io.Error=function(msg,type,num){
this.message=msg;
this.type=type||"unknown";
this.number=num||0;
};
dojo.io.transports.addTransport=function(name){
this.push(name);
this[name]=dojo.io[name];
};
dojo.io.bind=function(_2af){
if(!(_2af instanceof dojo.io.Request)){
try{
_2af=new dojo.io.Request(_2af);
}
catch(e){
dojo.debug(e);
}
}
var _2b0="";
if(_2af["transport"]){
_2b0=_2af["transport"];
if(!this[_2b0]){
dojo.io.sendBindError(_2af,"No dojo.io.bind() transport with name '"+_2af["transport"]+"'.");
return _2af;
}
if(!this[_2b0].canHandle(_2af)){
dojo.io.sendBindError(_2af,"dojo.io.bind() transport with name '"+_2af["transport"]+"' cannot handle this type of request.");
return _2af;
}
}else{
for(var x=0;x<dojo.io.transports.length;x++){
var tmp=dojo.io.transports[x];
if((this[tmp])&&(this[tmp].canHandle(_2af))){
_2b0=tmp;
break;
}
}
if(_2b0==""){
dojo.io.sendBindError(_2af,"None of the loaded transports for dojo.io.bind()"+" can handle the request.");
return _2af;
}
}
this[_2b0].bind(_2af);
_2af.bindSuccess=true;
return _2af;
};
dojo.io.sendBindError=function(_2b3,_2b4){
if((typeof _2b3.error=="function"||typeof _2b3.handle=="function")&&(typeof setTimeout=="function"||typeof setTimeout=="object")){
var _2b5=new dojo.io.Error(_2b4);
setTimeout(function(){
_2b3[(typeof _2b3.error=="function")?"error":"handle"]("error",_2b5,null,_2b3);
},50);
}else{
dojo.raise(_2b4);
}
};
dojo.io.queueBind=function(_2b6){
if(!(_2b6 instanceof dojo.io.Request)){
try{
_2b6=new dojo.io.Request(_2b6);
}
catch(e){
dojo.debug(e);
}
}
var _2b7=_2b6.load;
_2b6.load=function(){
dojo.io._queueBindInFlight=false;
var ret=_2b7.apply(this,arguments);
dojo.io._dispatchNextQueueBind();
return ret;
};
var _2b9=_2b6.error;
_2b6.error=function(){
dojo.io._queueBindInFlight=false;
var ret=_2b9.apply(this,arguments);
dojo.io._dispatchNextQueueBind();
return ret;
};
dojo.io._bindQueue.push(_2b6);
dojo.io._dispatchNextQueueBind();
return _2b6;
};
dojo.io._dispatchNextQueueBind=function(){
if(!dojo.io._queueBindInFlight){
dojo.io._queueBindInFlight=true;
if(dojo.io._bindQueue.length>0){
dojo.io.bind(dojo.io._bindQueue.shift());
}else{
dojo.io._queueBindInFlight=false;
}
}
};
dojo.io._bindQueue=[];
dojo.io._queueBindInFlight=false;
dojo.io.argsFromMap=function(map,_2bc,last){
var enc=/utf/i.test(_2bc||"")?encodeURIComponent:dojo.string.encodeAscii;
var _2bf=[];
var _2c0=new Object();
for(var name in map){
var _2c2=function(elt){
var val=enc(name)+"="+enc(elt);
_2bf[(last==name)?"push":"unshift"](val);
};
if(!_2c0[name]){
var _2c5=map[name];
if(dojo.lang.isArray(_2c5)){
dojo.lang.forEach(_2c5,_2c2);
}else{
_2c2(_2c5);
}
}
}
return _2bf.join("&");
};
dojo.io.setIFrameSrc=function(_2c6,src,_2c8){
try{
var r=dojo.render.html;
if(!_2c8){
if(r.safari){
_2c6.location=src;
}else{
frames[_2c6.name].location=src;
}
}else{
var idoc;
if(r.ie){
idoc=_2c6.contentWindow.document;
}else{
if(r.safari){
idoc=_2c6.document;
}else{
idoc=_2c6.contentWindow;
}
}
if(!idoc){
_2c6.location=src;
return;
}else{
idoc.location.replace(src);
}
}
}
catch(e){
dojo.debug(e);
dojo.debug("setIFrameSrc: "+e);
}
};
dojo.provide("dojo.dom");
dojo.dom.ELEMENT_NODE=1;
dojo.dom.ATTRIBUTE_NODE=2;
dojo.dom.TEXT_NODE=3;
dojo.dom.CDATA_SECTION_NODE=4;
dojo.dom.ENTITY_REFERENCE_NODE=5;
dojo.dom.ENTITY_NODE=6;
dojo.dom.PROCESSING_INSTRUCTION_NODE=7;
dojo.dom.COMMENT_NODE=8;
dojo.dom.DOCUMENT_NODE=9;
dojo.dom.DOCUMENT_TYPE_NODE=10;
dojo.dom.DOCUMENT_FRAGMENT_NODE=11;
dojo.dom.NOTATION_NODE=12;
dojo.dom.dojoml="http://www.dojotoolkit.org/2004/dojoml";
dojo.dom.xmlns={svg:"http://www.w3.org/2000/svg",smil:"http://www.w3.org/2001/SMIL20/",mml:"http://www.w3.org/1998/Math/MathML",cml:"http://www.xml-cml.org",xlink:"http://www.w3.org/1999/xlink",xhtml:"http://www.w3.org/1999/xhtml",xul:"http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",xbl:"http://www.mozilla.org/xbl",fo:"http://www.w3.org/1999/XSL/Format",xsl:"http://www.w3.org/1999/XSL/Transform",xslt:"http://www.w3.org/1999/XSL/Transform",xi:"http://www.w3.org/2001/XInclude",xforms:"http://www.w3.org/2002/01/xforms",saxon:"http://icl.com/saxon",xalan:"http://xml.apache.org/xslt",xsd:"http://www.w3.org/2001/XMLSchema",dt:"http://www.w3.org/2001/XMLSchema-datatypes",xsi:"http://www.w3.org/2001/XMLSchema-instance",rdf:"http://www.w3.org/1999/02/22-rdf-syntax-ns#",rdfs:"http://www.w3.org/2000/01/rdf-schema#",dc:"http://purl.org/dc/elements/1.1/",dcq:"http://purl.org/dc/qualifiers/1.0","soap-env":"http://schemas.xmlsoap.org/soap/envelope/",wsdl:"http://schemas.xmlsoap.org/wsdl/",AdobeExtensions:"http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"};
dojo.dom.isNode=function(wh){
if(typeof Element=="function"){
try{
return wh instanceof Element;
}
catch(e){
}
}else{
return wh&&!isNaN(wh.nodeType);
}
};
dojo.dom.getUniqueId=function(){
var _2cc=dojo.doc();
do{
var id="dj_unique_"+(++arguments.callee._idIncrement);
}while(_2cc.getElementById(id));
return id;
};
dojo.dom.getUniqueId._idIncrement=0;
dojo.dom.firstElement=dojo.dom.getFirstChildElement=function(_2ce,_2cf){
var node=_2ce.firstChild;
while(node&&node.nodeType!=dojo.dom.ELEMENT_NODE){
node=node.nextSibling;
}
if(_2cf&&node&&node.tagName&&node.tagName.toLowerCase()!=_2cf.toLowerCase()){
node=dojo.dom.nextElement(node,_2cf);
}
return node;
};
dojo.dom.lastElement=dojo.dom.getLastChildElement=function(_2d1,_2d2){
var node=_2d1.lastChild;
while(node&&node.nodeType!=dojo.dom.ELEMENT_NODE){
node=node.previousSibling;
}
if(_2d2&&node&&node.tagName&&node.tagName.toLowerCase()!=_2d2.toLowerCase()){
node=dojo.dom.prevElement(node,_2d2);
}
return node;
};
dojo.dom.nextElement=dojo.dom.getNextSiblingElement=function(node,_2d5){
if(!node){
return null;
}
do{
node=node.nextSibling;
}while(node&&node.nodeType!=dojo.dom.ELEMENT_NODE);
if(node&&_2d5&&_2d5.toLowerCase()!=node.tagName.toLowerCase()){
return dojo.dom.nextElement(node,_2d5);
}
return node;
};
dojo.dom.prevElement=dojo.dom.getPreviousSiblingElement=function(node,_2d7){
if(!node){
return null;
}
if(_2d7){
_2d7=_2d7.toLowerCase();
}
do{
node=node.previousSibling;
}while(node&&node.nodeType!=dojo.dom.ELEMENT_NODE);
if(node&&_2d7&&_2d7.toLowerCase()!=node.tagName.toLowerCase()){
return dojo.dom.prevElement(node,_2d7);
}
return node;
};
dojo.dom.moveChildren=function(_2d8,_2d9,trim){
var _2db=0;
if(trim){
while(_2d8.hasChildNodes()&&_2d8.firstChild.nodeType==dojo.dom.TEXT_NODE){
_2d8.removeChild(_2d8.firstChild);
}
while(_2d8.hasChildNodes()&&_2d8.lastChild.nodeType==dojo.dom.TEXT_NODE){
_2d8.removeChild(_2d8.lastChild);
}
}
while(_2d8.hasChildNodes()){
_2d9.appendChild(_2d8.firstChild);
_2db++;
}
return _2db;
};
dojo.dom.copyChildren=function(_2dc,_2dd,trim){
var _2df=_2dc.cloneNode(true);
return this.moveChildren(_2df,_2dd,trim);
};
dojo.dom.replaceChildren=function(node,_2e1){
var _2e2=[];
if(dojo.render.html.ie){
for(var i=0;i<node.childNodes.length;i++){
_2e2.push(node.childNodes[i]);
}
}
dojo.dom.removeChildren(node);
node.appendChild(_2e1);
for(var i=0;i<_2e2.length;i++){
dojo.dom.destroyNode(_2e2[i]);
}
};
dojo.dom.removeChildren=function(node){
var _2e5=node.childNodes.length;
while(node.hasChildNodes()){
dojo.dom.removeNode(node.firstChild);
}
return _2e5;
};
dojo.dom.replaceNode=function(node,_2e7){
return node.parentNode.replaceChild(_2e7,node);
};
dojo.dom.destroyNode=function(node){
if(node.parentNode){
node=dojo.dom.removeNode(node);
}
if(node.nodeType!=3){
if(dojo.evalObjPath("dojo.event.browser.clean",false)){
dojo.event.browser.clean(node);
}
if(dojo.render.html.ie){
node.outerHTML="";
}
}
};
dojo.dom.removeNode=function(node){
if(node&&node.parentNode){
return node.parentNode.removeChild(node);
}
};
dojo.dom.getAncestors=function(node,_2eb,_2ec){
var _2ed=[];
var _2ee=(_2eb&&(_2eb instanceof Function||typeof _2eb=="function"));
while(node){
if(!_2ee||_2eb(node)){
_2ed.push(node);
}
if(_2ec&&_2ed.length>0){
return _2ed[0];
}
node=node.parentNode;
}
if(_2ec){
return null;
}
return _2ed;
};
dojo.dom.getAncestorsByTag=function(node,tag,_2f1){
tag=tag.toLowerCase();
return dojo.dom.getAncestors(node,function(el){
return ((el.tagName)&&(el.tagName.toLowerCase()==tag));
},_2f1);
};
dojo.dom.getFirstAncestorByTag=function(node,tag){
return dojo.dom.getAncestorsByTag(node,tag,true);
};
dojo.dom.isDescendantOf=function(node,_2f6,_2f7){
if(_2f7&&node){
node=node.parentNode;
}
while(node){
if(node==_2f6){
return true;
}
node=node.parentNode;
}
return false;
};
dojo.dom.innerXML=function(node){
if(node.innerXML){
return node.innerXML;
}else{
if(node.xml){
return node.xml;
}else{
if(typeof XMLSerializer!="undefined"){
return (new XMLSerializer()).serializeToString(node);
}
}
}
};
dojo.dom.createDocument=function(){
var doc=null;
var _2fa=dojo.doc();
if(!dj_undef("ActiveXObject")){
var _2fb=["MSXML2","Microsoft","MSXML","MSXML3"];
for(var i=0;i<_2fb.length;i++){
try{
doc=new ActiveXObject(_2fb[i]+".XMLDOM");
}
catch(e){
}
if(doc){
break;
}
}
}else{
if((_2fa.implementation)&&(_2fa.implementation.createDocument)){
doc=_2fa.implementation.createDocument("","",null);
}
}
return doc;
};
dojo.dom.createDocumentFromText=function(str,_2fe){
if(!_2fe){
_2fe="text/xml";
}
if(!dj_undef("DOMParser")){
var _2ff=new DOMParser();
return _2ff.parseFromString(str,_2fe);
}else{
if(!dj_undef("ActiveXObject")){
var _300=dojo.dom.createDocument();
if(_300){
_300.async=false;
_300.loadXML(str);
return _300;
}else{
dojo.debug("toXml didn't work?");
}
}else{
var _301=dojo.doc();
if(_301.createElement){
var tmp=_301.createElement("xml");
tmp.innerHTML=str;
if(_301.implementation&&_301.implementation.createDocument){
var _303=_301.implementation.createDocument("foo","",null);
for(var i=0;i<tmp.childNodes.length;i++){
_303.importNode(tmp.childNodes.item(i),true);
}
return _303;
}
return ((tmp.document)&&(tmp.document.firstChild?tmp.document.firstChild:tmp));
}
}
}
return null;
};
dojo.dom.prependChild=function(node,_306){
if(_306.firstChild){
_306.insertBefore(node,_306.firstChild);
}else{
_306.appendChild(node);
}
return true;
};
dojo.dom.insertBefore=function(node,ref,_309){
if((_309!=true)&&(node===ref||node.nextSibling===ref)){
return false;
}
var _30a=ref.parentNode;
_30a.insertBefore(node,ref);
return true;
};
dojo.dom.insertAfter=function(node,ref,_30d){
var pn=ref.parentNode;
if(ref==pn.lastChild){
if((_30d!=true)&&(node===ref)){
return false;
}
pn.appendChild(node);
}else{
return this.insertBefore(node,ref.nextSibling,_30d);
}
return true;
};
dojo.dom.insertAtPosition=function(node,ref,_311){
if((!node)||(!ref)||(!_311)){
return false;
}
switch(_311.toLowerCase()){
case "before":
return dojo.dom.insertBefore(node,ref);
case "after":
return dojo.dom.insertAfter(node,ref);
case "first":
if(ref.firstChild){
return dojo.dom.insertBefore(node,ref.firstChild);
}else{
ref.appendChild(node);
return true;
}
break;
default:
ref.appendChild(node);
return true;
}
};
dojo.dom.insertAtIndex=function(node,_313,_314){
var _315=_313.childNodes;
if(!_315.length||_315.length==_314){
_313.appendChild(node);
return true;
}
if(_314==0){
return dojo.dom.prependChild(node,_313);
}
return dojo.dom.insertAfter(node,_315[_314-1]);
};
dojo.dom.textContent=function(node,text){
if(arguments.length>1){
var _318=dojo.doc();
dojo.dom.replaceChildren(node,_318.createTextNode(text));
return text;
}else{
if(node.textContent!=undefined){
return node.textContent;
}
var _319="";
if(node==null){
return _319;
}
for(var i=0;i<node.childNodes.length;i++){
switch(node.childNodes[i].nodeType){
case 1:
case 5:
_319+=dojo.dom.textContent(node.childNodes[i]);
break;
case 3:
case 2:
case 4:
_319+=node.childNodes[i].nodeValue;
break;
default:
break;
}
}
return _319;
}
};
dojo.dom.hasParent=function(node){
return Boolean(node&&node.parentNode&&dojo.dom.isNode(node.parentNode));
};
dojo.dom.isTag=function(node){
if(node&&node.tagName){
for(var i=1;i<arguments.length;i++){
if(node.tagName==String(arguments[i])){
return String(arguments[i]);
}
}
}
return "";
};
dojo.dom.setAttributeNS=function(elem,_31f,_320,_321){
if(elem==null||((elem==undefined)&&(typeof elem=="undefined"))){
dojo.raise("No element given to dojo.dom.setAttributeNS");
}
if(!((elem.setAttributeNS==undefined)&&(typeof elem.setAttributeNS=="undefined"))){
elem.setAttributeNS(_31f,_320,_321);
}else{
var _322=elem.ownerDocument;
var _323=_322.createNode(2,_320,_31f);
_323.nodeValue=_321;
elem.setAttributeNode(_323);
}
};
dojo.provide("dojo.undo.browser");
try{
if((!djConfig["preventBackButtonFix"])&&(!dojo.hostenv.post_load_)){
document.write("<iframe style='border: 0px; width: 1px; height: 1px; position: absolute; bottom: 0px; right: 0px; visibility: visible;' name='djhistory' id='djhistory' src='"+(dojo.hostenv.getBaseScriptUri()+"iframe_history.html")+"'></iframe>");
}
}
catch(e){
}
if(dojo.render.html.opera){
dojo.debug("Opera is not supported with dojo.undo.browser, so back/forward detection will not work.");
}
dojo.undo.browser={initialHref:(!dj_undef("window"))?window.location.href:"",initialHash:(!dj_undef("window"))?window.location.hash:"",moveForward:false,historyStack:[],forwardStack:[],historyIframe:null,bookmarkAnchor:null,locationTimer:null,setInitialState:function(args){
this.initialState=this._createState(this.initialHref,args,this.initialHash);
},addToHistory:function(args){
this.forwardStack=[];
var hash=null;
var url=null;
if(!this.historyIframe){
this.historyIframe=window.frames["djhistory"];
}
if(!this.bookmarkAnchor){
this.bookmarkAnchor=document.createElement("a");
dojo.body().appendChild(this.bookmarkAnchor);
this.bookmarkAnchor.style.display="none";
}
if(args["changeUrl"]){
hash="#"+((args["changeUrl"]!==true)?args["changeUrl"]:(new Date()).getTime());
if(this.historyStack.length==0&&this.initialState.urlHash==hash){
this.initialState=this._createState(url,args,hash);
return;
}else{
if(this.historyStack.length>0&&this.historyStack[this.historyStack.length-1].urlHash==hash){
this.historyStack[this.historyStack.length-1]=this._createState(url,args,hash);
return;
}
}
this.changingUrl=true;
setTimeout("window.location.href = '"+hash+"'; dojo.undo.browser.changingUrl = false;",1);
this.bookmarkAnchor.href=hash;
if(dojo.render.html.ie){
url=this._loadIframeHistory();
var _328=args["back"]||args["backButton"]||args["handle"];
var tcb=function(_32a){
if(window.location.hash!=""){
setTimeout("window.location.href = '"+hash+"';",1);
}
_328.apply(this,[_32a]);
};
if(args["back"]){
args.back=tcb;
}else{
if(args["backButton"]){
args.backButton=tcb;
}else{
if(args["handle"]){
args.handle=tcb;
}
}
}
var _32b=args["forward"]||args["forwardButton"]||args["handle"];
var tfw=function(_32d){
if(window.location.hash!=""){
window.location.href=hash;
}
if(_32b){
_32b.apply(this,[_32d]);
}
};
if(args["forward"]){
args.forward=tfw;
}else{
if(args["forwardButton"]){
args.forwardButton=tfw;
}else{
if(args["handle"]){
args.handle=tfw;
}
}
}
}else{
if(dojo.render.html.moz){
if(!this.locationTimer){
this.locationTimer=setInterval("dojo.undo.browser.checkLocation();",200);
}
}
}
}else{
url=this._loadIframeHistory();
}
this.historyStack.push(this._createState(url,args,hash));
},checkLocation:function(){
if(!this.changingUrl){
var hsl=this.historyStack.length;
if((window.location.hash==this.initialHash||window.location.href==this.initialHref)&&(hsl==1)){
this.handleBackButton();
return;
}
if(this.forwardStack.length>0){
if(this.forwardStack[this.forwardStack.length-1].urlHash==window.location.hash){
this.handleForwardButton();
return;
}
}
if((hsl>=2)&&(this.historyStack[hsl-2])){
if(this.historyStack[hsl-2].urlHash==window.location.hash){
this.handleBackButton();
return;
}
}
}
},iframeLoaded:function(evt,_330){
if(!dojo.render.html.opera){
var _331=this._getUrlQuery(_330.href);
if(_331==null){
if(this.historyStack.length==1){
this.handleBackButton();
}
return;
}
if(this.moveForward){
this.moveForward=false;
return;
}
if(this.historyStack.length>=2&&_331==this._getUrlQuery(this.historyStack[this.historyStack.length-2].url)){
this.handleBackButton();
}else{
if(this.forwardStack.length>0&&_331==this._getUrlQuery(this.forwardStack[this.forwardStack.length-1].url)){
this.handleForwardButton();
}
}
}
},handleBackButton:function(){
var _332=this.historyStack.pop();
if(!_332){
return;
}
var last=this.historyStack[this.historyStack.length-1];
if(!last&&this.historyStack.length==0){
last=this.initialState;
}
if(last){
if(last.kwArgs["back"]){
last.kwArgs["back"]();
}else{
if(last.kwArgs["backButton"]){
last.kwArgs["backButton"]();
}else{
if(last.kwArgs["handle"]){
last.kwArgs.handle("back");
}
}
}
}
this.forwardStack.push(_332);
},handleForwardButton:function(){
var last=this.forwardStack.pop();
if(!last){
return;
}
if(last.kwArgs["forward"]){
last.kwArgs.forward();
}else{
if(last.kwArgs["forwardButton"]){
last.kwArgs.forwardButton();
}else{
if(last.kwArgs["handle"]){
last.kwArgs.handle("forward");
}
}
}
this.historyStack.push(last);
},_createState:function(url,args,hash){
return {"url":url,"kwArgs":args,"urlHash":hash};
},_getUrlQuery:function(url){
var _339=url.split("?");
if(_339.length<2){
return null;
}else{
return _339[1];
}
},_loadIframeHistory:function(){
var url=dojo.hostenv.getBaseScriptUri()+"iframe_history.html?"+(new Date()).getTime();
this.moveForward=true;
dojo.io.setIFrameSrc(this.historyIframe,url,false);
return url;
}};
dojo.provide("dojo.io.BrowserIO");
if(!dj_undef("window")){
dojo.io.checkChildrenForFile=function(node){
var _33c=false;
var _33d=node.getElementsByTagName("input");
dojo.lang.forEach(_33d,function(_33e){
if(_33c){
return;
}
if(_33e.getAttribute("type")=="file"){
_33c=true;
}
});
return _33c;
};
dojo.io.formHasFile=function(_33f){
return dojo.io.checkChildrenForFile(_33f);
};
dojo.io.updateNode=function(node,_341){
node=dojo.byId(node);
var args=_341;
if(dojo.lang.isString(_341)){
args={url:_341};
}
args.mimetype="text/html";
args.load=function(t,d,e){
while(node.firstChild){
dojo.dom.destroyNode(node.firstChild);
}
node.innerHTML=d;
};
dojo.io.bind(args);
};
dojo.io.formFilter=function(node){
var type=(node.type||"").toLowerCase();
return !node.disabled&&node.name&&!dojo.lang.inArray(["file","submit","image","reset","button"],type);
};
dojo.io.encodeForm=function(_348,_349,_34a){
if((!_348)||(!_348.tagName)||(!_348.tagName.toLowerCase()=="form")){
dojo.raise("Attempted to encode a non-form element.");
}
if(!_34a){
_34a=dojo.io.formFilter;
}
var enc=/utf/i.test(_349||"")?encodeURIComponent:dojo.string.encodeAscii;
var _34c=[];
for(var i=0;i<_348.elements.length;i++){
var elm=_348.elements[i];
if(!elm||elm.tagName.toLowerCase()=="fieldset"||!_34a(elm)){
continue;
}
var name=enc(elm.name);
var type=elm.type.toLowerCase();
if(type=="select-multiple"){
for(var j=0;j<elm.options.length;j++){
if(elm.options[j].selected){
_34c.push(name+"="+enc(elm.options[j].value));
}
}
}else{
if(dojo.lang.inArray(["radio","checkbox"],type)){
if(elm.checked){
_34c.push(name+"="+enc(elm.value));
}
}else{
_34c.push(name+"="+enc(elm.value));
}
}
}
var _352=_348.getElementsByTagName("input");
for(var i=0;i<_352.length;i++){
var _353=_352[i];
if(_353.type.toLowerCase()=="image"&&_353.form==_348&&_34a(_353)){
var name=enc(_353.name);
_34c.push(name+"="+enc(_353.value));
_34c.push(name+".x=0");
_34c.push(name+".y=0");
}
}
return _34c.join("&")+"&";
};
dojo.io.FormBind=function(args){
this.bindArgs={};
if(args&&args.formNode){
this.init(args);
}else{
if(args){
this.init({formNode:args});
}
}
};
dojo.lang.extend(dojo.io.FormBind,{form:null,bindArgs:null,clickedButton:null,init:function(args){
var form=dojo.byId(args.formNode);
if(!form||!form.tagName||form.tagName.toLowerCase()!="form"){
throw new Error("FormBind: Couldn't apply, invalid form");
}else{
if(this.form==form){
return;
}else{
if(this.form){
throw new Error("FormBind: Already applied to a form");
}
}
}
dojo.lang.mixin(this.bindArgs,args);
this.form=form;
this.connect(form,"onsubmit","submit");
for(var i=0;i<form.elements.length;i++){
var node=form.elements[i];
if(node&&node.type&&dojo.lang.inArray(["submit","button"],node.type.toLowerCase())){
this.connect(node,"onclick","click");
}
}
var _359=form.getElementsByTagName("input");
for(var i=0;i<_359.length;i++){
var _35a=_359[i];
if(_35a.type.toLowerCase()=="image"&&_35a.form==form){
this.connect(_35a,"onclick","click");
}
}
},onSubmit:function(form){
return true;
},submit:function(e){
e.preventDefault();
if(this.onSubmit(this.form)){
dojo.io.bind(dojo.lang.mixin(this.bindArgs,{formFilter:dojo.lang.hitch(this,"formFilter")}));
}
},click:function(e){
var node=e.currentTarget;
if(node.disabled){
return;
}
this.clickedButton=node;
},formFilter:function(node){
var type=(node.type||"").toLowerCase();
var _361=false;
if(node.disabled||!node.name){
_361=false;
}else{
if(dojo.lang.inArray(["submit","button","image"],type)){
if(!this.clickedButton){
this.clickedButton=node;
}
_361=node==this.clickedButton;
}else{
_361=!dojo.lang.inArray(["file","submit","reset","button"],type);
}
}
return _361;
},connect:function(_362,_363,_364){
if(dojo.evalObjPath("dojo.event.connect")){
dojo.event.connect(_362,_363,this,_364);
}else{
var fcn=dojo.lang.hitch(this,_364);
_362[_363]=function(e){
if(!e){
e=window.event;
}
if(!e.currentTarget){
e.currentTarget=e.srcElement;
}
if(!e.preventDefault){
e.preventDefault=function(){
window.event.returnValue=false;
};
}
fcn(e);
};
}
}});
dojo.io.XMLHTTPTransport=new function(){
var _367=this;
var _368={};
this.useCache=false;
this.preventCache=false;
function getCacheKey(url,_36a,_36b){
return url+"|"+_36a+"|"+_36b.toLowerCase();
}
function addToCache(url,_36d,_36e,http){
_368[getCacheKey(url,_36d,_36e)]=http;
}
function getFromCache(url,_371,_372){
return _368[getCacheKey(url,_371,_372)];
}
this.clearCache=function(){
_368={};
};
function doLoad(_373,http,url,_376,_377){
if(((http.status>=200)&&(http.status<300))||(http.status==304)||(location.protocol=="file:"&&(http.status==0||http.status==undefined))||(location.protocol=="chrome:"&&(http.status==0||http.status==undefined))){
var ret;
if(_373.method.toLowerCase()=="head"){
var _379=http.getAllResponseHeaders();
ret={};
ret.toString=function(){
return _379;
};
var _37a=_379.split(/[\r\n]+/g);
for(var i=0;i<_37a.length;i++){
var pair=_37a[i].match(/^([^:]+)\s*:\s*(.+)$/i);
if(pair){
ret[pair[1]]=pair[2];
}
}
}else{
if(_373.mimetype=="text/javascript"){
try{
ret=dj_eval(http.responseText);
}
catch(e){
dojo.debug(e);
dojo.debug(http.responseText);
ret=null;
}
}else{
if(_373.mimetype=="text/json"||_373.mimetype=="application/json"){
try{
ret=dj_eval("("+http.responseText+")");
}
catch(e){
dojo.debug(e);
dojo.debug(http.responseText);
ret=false;
}
}else{
if((_373.mimetype=="application/xml")||(_373.mimetype=="text/xml")){
if (http.responseText && http.responseText.indexOf("<message id=\"sessionTimeout\" type=\"error\"></message>")<0){
ret=http.responseXML;
if(!ret||typeof ret=="string"||!http.getResponseHeader("Content-Type")){
ret=dojo.dom.createDocumentFromText(http.responseText);
}
}else{
ret=http.responseText;
}
}else{
ret=http.responseText;
}
}
}
}
if(_377){
addToCache(url,_376,_373.method,http);
}
_373[(typeof _373.load=="function")?"load":"handle"]("load",ret,http,_373);
}else{
var _37d=new dojo.io.Error("XMLHttpTransport Error: "+http.status+" "+http.statusText);
_373[(typeof _373.error=="function")?"error":"handle"]("error",_37d,http,_373);
}
}
function setHeaders(http,_37f){
if(_37f["headers"]){
for(var _380 in _37f["headers"]){
if(_380.toLowerCase()=="content-type"&&!_37f["contentType"]){
_37f["contentType"]=_37f["headers"][_380];
}else{
http.setRequestHeader(_380,_37f["headers"][_380]);
}
}
}
}
this.inFlight=[];
this.inFlightTimer=null;
this.startWatchingInFlight=function(){
if(!this.inFlightTimer){
this.inFlightTimer=setTimeout("dojo.io.XMLHTTPTransport.watchInFlight();",10);
}
};
this.watchInFlight=function(){
var now=null;
if(!dojo.hostenv._blockAsync&&!_367._blockAsync){
for(var x=this.inFlight.length-1;x>=0;x--){
try{
var tif=this.inFlight[x];
if(!tif||tif.http._aborted||!tif.http.readyState){
this.inFlight.splice(x,1);
continue;
}
if(4==tif.http.readyState){
this.inFlight.splice(x,1);
doLoad(tif.req,tif.http,tif.url,tif.query,tif.useCache);
}else{
if(tif.startTime){
if(!now){
now=(new Date()).getTime();
}
if(tif.startTime+(tif.req.timeoutSeconds*1000)<now){
if(typeof tif.http.abort=="function"){
tif.http.abort();
}
this.inFlight.splice(x,1);
tif.req[(typeof tif.req.timeout=="function")?"timeout":"handle"]("timeout",null,tif.http,tif.req);
}
}
}
}
catch(e){
try{
var _384=new dojo.io.Error("XMLHttpTransport.watchInFlight Error: "+e);
tif.req[(typeof tif.req.error=="function")?"error":"handle"]("error",_384,tif.http,tif.req);
}
catch(e2){
dojo.debug("XMLHttpTransport error callback failed: "+e2);
}
}
}
}
clearTimeout(this.inFlightTimer);
if(this.inFlight.length==0){
this.inFlightTimer=null;
return;
}
this.inFlightTimer=setTimeout("dojo.io.XMLHTTPTransport.watchInFlight();",10);
};
var _385=dojo.hostenv.getXmlhttpObject()?true:false;
this.canHandle=function(_386){
return _385&&dojo.lang.inArray(["text/plain","text/html","application/xml","text/xml","text/javascript","text/json","application/json"],(_386["mimetype"].toLowerCase()||""))&&!(_386["formNode"]&&dojo.io.formHasFile(_386["formNode"]));
};
this.multipartBoundary="45309FFF-BD65-4d50-99C9-36986896A96F";
this.bind=function(_387){
if(!_387["url"]){
if(!_387["formNode"]&&(_387["backButton"]||_387["back"]||_387["changeUrl"]||_387["watchForURL"])&&(!djConfig.preventBackButtonFix)){
dojo.deprecated("Using dojo.io.XMLHTTPTransport.bind() to add to browser history without doing an IO request","Use dojo.undo.browser.addToHistory() instead.","0.4");
dojo.undo.browser.addToHistory(_387);
return true;
}
}
var url=_387.url;
var _389="";
if(_387["formNode"]){
var ta=_387.formNode.getAttribute("action");
if((ta)&&(!_387["url"])){
url=ta;
}
var tp=_387.formNode.getAttribute("method");
if((tp)&&(!_387["method"])){
_387.method=tp;
}
_389+=dojo.io.encodeForm(_387.formNode,_387.encoding,_387["formFilter"]);
}
if(url.indexOf("#")>-1){
dojo.debug("Warning: dojo.io.bind: stripping hash values from url:",url);
url=url.split("#")[0];
}
if(_387["file"]){
_387.method="post";
}
if(!_387["method"]){
_387.method="get";
}
if(_387.method.toLowerCase()=="get"){
_387.multipart=false;
}else{
if(_387["file"]){
_387.multipart=true;
}else{
if(!_387["multipart"]){
_387.multipart=false;
}
}
}
if(_387["backButton"]||_387["back"]||_387["changeUrl"]){
dojo.undo.browser.addToHistory(_387);
}
var _38c=_387["content"]||{};
if(_387.sendTransport){
_38c["dojo.transport"]="xmlhttp";
}
do{
if(_387.postContent){
_389=_387.postContent;
break;
}
if(_38c){
_389+=dojo.io.argsFromMap(_38c,_387.encoding);
}
if(_387.method.toLowerCase()=="get"||!_387.multipart){
break;
}
var t=[];
if(_389.length){
var q=_389.split("&");
for(var i=0;i<q.length;++i){
if(q[i].length){
var p=q[i].split("=");
t.push("--"+this.multipartBoundary,"Content-Disposition: form-data; name=\""+p[0]+"\"","",p[1]);
}
}
}
if(_387.file){
if(dojo.lang.isArray(_387.file)){
for(var i=0;i<_387.file.length;++i){
var o=_387.file[i];
t.push("--"+this.multipartBoundary,"Content-Disposition: form-data; name=\""+o.name+"\"; filename=\""+("fileName" in o?o.fileName:o.name)+"\"","Content-Type: "+("contentType" in o?o.contentType:"application/octet-stream"),"",o.content);
}
}else{
var o=_387.file;
t.push("--"+this.multipartBoundary,"Content-Disposition: form-data; name=\""+o.name+"\"; filename=\""+("fileName" in o?o.fileName:o.name)+"\"","Content-Type: "+("contentType" in o?o.contentType:"application/octet-stream"),"",o.content);
}
}
if(t.length){
t.push("--"+this.multipartBoundary+"--","");
_389=t.join("\r\n");
}
}while(false);
var _392=_387["sync"]?false:true;
var _393=_387["preventCache"]||(this.preventCache==true&&_387["preventCache"]!=false);
var _394=_387["useCache"]==true||(this.useCache==true&&_387["useCache"]!=false);
if(!_393&&_394){
var _395=getFromCache(url,_389,_387.method);
if(_395){
doLoad(_387,_395,url,_389,false);
return;
}
}
var http=dojo.hostenv.getXmlhttpObject(_387);
var _397=false;
if(_392){
var _398=this.inFlight.push({"req":_387,"http":http,"url":url,"query":_389,"useCache":_394,"startTime":_387.timeoutSeconds?(new Date()).getTime():0});
this.startWatchingInFlight();
}else{
_367._blockAsync=true;
}
if(_387.method.toLowerCase()=="post"){
if(!_387.user){
http.open("POST",url,_392);
}else{
http.open("POST",url,_392,_387.user,_387.password);
}
setHeaders(http,_387);
http.setRequestHeader("Content-Type",_387.multipart?("multipart/form-data; boundary="+this.multipartBoundary):(_387.contentType||"application/x-www-form-urlencoded"));
try{
http.send(_389);
}
catch(e){
if(typeof http.abort=="function"){
http.abort();
}
doLoad(_387,{status:404},url,_389,_394);
}
}else{
var _399=url;
if(_389!=""){
_399+=(_399.indexOf("?")>-1?"&":"?")+_389;
}
if(_393){
_399+=(dojo.string.endsWithAny(_399,"?","&")?"":(_399.indexOf("?")>-1?"&":"?"))+"dojo.preventCache="+new Date().valueOf();
}
if(!_387.user){
http.open(_387.method.toUpperCase(),_399,_392);
}else{
http.open(_387.method.toUpperCase(),_399,_392,_387.user,_387.password);
}
setHeaders(http,_387);
try{
http.send(null);
}
catch(e){
if(typeof http.abort=="function"){
http.abort();
}
doLoad(_387,{status:404},url,_389,_394);
}
}
if(!_392){
doLoad(_387,http,url,_389,_394);
_367._blockAsync=false;
}
_387.abort=function(){
try{
http._aborted=true;
}
catch(e){
}
return http.abort();
};
return;
};
dojo.io.transports.addTransport("XMLHTTPTransport");
};
}
dojo.provide("dojo.io.cookie");
dojo.io.cookie.setCookie=function(name,_39b,days,path,_39e,_39f){
var _3a0=-1;
if((typeof days=="number")&&(days>=0)){
var d=new Date();
d.setTime(d.getTime()+(days*24*60*60*1000));
_3a0=d.toGMTString();
}
_39b=escape(_39b);
document.cookie=name+"="+_39b+";"+(_3a0!=-1?" expires="+_3a0+";":"")+(path?"path="+path:"")+(_39e?"; domain="+_39e:"")+(_39f?"; secure":"");
};
dojo.io.cookie.set=dojo.io.cookie.setCookie;
dojo.io.cookie.getCookie=function(name){
var idx=document.cookie.lastIndexOf(name+"=");
if(idx==-1){
return null;
}
var _3a4=document.cookie.substring(idx+name.length+1);
var end=_3a4.indexOf(";");
if(end==-1){
end=_3a4.length;
}
_3a4=_3a4.substring(0,end);
_3a4=unescape(_3a4);
return _3a4;
};
dojo.io.cookie.get=dojo.io.cookie.getCookie;
dojo.io.cookie.deleteCookie=function(name){
dojo.io.cookie.setCookie(name,"-",0);
};
dojo.io.cookie.setObjectCookie=function(name,obj,days,path,_3ab,_3ac,_3ad){
if(arguments.length==5){
_3ad=_3ab;
_3ab=null;
_3ac=null;
}
var _3ae=[],_3af,_3b0="";
if(!_3ad){
_3af=dojo.io.cookie.getObjectCookie(name);
}
if(days>=0){
if(!_3af){
_3af={};
}
for(var prop in obj){
if(obj[prop]==null){
delete _3af[prop];
}else{
if((typeof obj[prop]=="string")||(typeof obj[prop]=="number")){
_3af[prop]=obj[prop];
}
}
}
prop=null;
for(var prop in _3af){
_3ae.push(escape(prop)+"="+escape(_3af[prop]));
}
_3b0=_3ae.join("&");
}
dojo.io.cookie.setCookie(name,_3b0,days,path,_3ab,_3ac);
};
dojo.io.cookie.getObjectCookie=function(name){
var _3b3=null,_3b4=dojo.io.cookie.getCookie(name);
if(_3b4){
_3b3={};
var _3b5=_3b4.split("&");
for(var i=0;i<_3b5.length;i++){
var pair=_3b5[i].split("=");
var _3b8=pair[1];
if(isNaN(_3b8)){
_3b8=unescape(pair[1]);
}
_3b3[unescape(pair[0])]=_3b8;
}
}
return _3b3;
};
dojo.io.cookie.isSupported=function(){
if(typeof navigator.cookieEnabled!="boolean"){
dojo.io.cookie.setCookie("__TestingYourBrowserForCookieSupport__","CookiesAllowed",90,null);
var _3b9=dojo.io.cookie.getCookie("__TestingYourBrowserForCookieSupport__");
navigator.cookieEnabled=(_3b9=="CookiesAllowed");
if(navigator.cookieEnabled){
this.deleteCookie("__TestingYourBrowserForCookieSupport__");
}
}
return navigator.cookieEnabled;
};
if(!dojo.io.cookies){
dojo.io.cookies=dojo.io.cookie;
}
dojo.provide("dojo.io.*");
dojo.provide("dojo.io.BrowserIO");
if(!dj_undef("window")){
dojo.io.checkChildrenForFile=function(node){
var _3bb=false;
var _3bc=node.getElementsByTagName("input");
dojo.lang.forEach(_3bc,function(_3bd){
if(_3bb){
return;
}
if(_3bd.getAttribute("type")=="file"){
_3bb=true;
}
});
return _3bb;
};
dojo.io.formHasFile=function(_3be){
return dojo.io.checkChildrenForFile(_3be);
};
dojo.io.updateNode=function(node,_3c0){
node=dojo.byId(node);
var args=_3c0;
if(dojo.lang.isString(_3c0)){
args={url:_3c0};
}
args.mimetype="text/html";
args.load=function(t,d,e){
while(node.firstChild){
dojo.dom.destroyNode(node.firstChild);
}
node.innerHTML=d;
};
dojo.io.bind(args);
};
dojo.io.formFilter=function(node){
var type=(node.type||"").toLowerCase();
return !node.disabled&&node.name&&!dojo.lang.inArray(["file","submit","image","reset","button"],type);
};
dojo.io.encodeForm=function(_3c7,_3c8,_3c9){
if((!_3c7)||(!_3c7.tagName)||(!_3c7.tagName.toLowerCase()=="form")){
dojo.raise("Attempted to encode a non-form element.");
}
if(!_3c9){
_3c9=dojo.io.formFilter;
}
var enc=/utf/i.test(_3c8||"")?encodeURIComponent:dojo.string.encodeAscii;
var _3cb=[];
for(var i=0;i<_3c7.elements.length;i++){
var elm=_3c7.elements[i];
if(!elm||elm.tagName.toLowerCase()=="fieldset"||!_3c9(elm)){
continue;
}
var name=enc(elm.name);
var type=elm.type.toLowerCase();
if(type=="select-multiple"){
for(var j=0;j<elm.options.length;j++){
if(elm.options[j].selected){
_3cb.push(name+"="+enc(elm.options[j].value));
}
}
}else{
if(dojo.lang.inArray(["radio","checkbox"],type)){
if(elm.checked){
_3cb.push(name+"="+enc(elm.value));
}
}else{
_3cb.push(name+"="+enc(elm.value));
}
}
}
var _3d1=_3c7.getElementsByTagName("input");
for(var i=0;i<_3d1.length;i++){
var _3d2=_3d1[i];
if(_3d2.type.toLowerCase()=="image"&&_3d2.form==_3c7&&_3c9(_3d2)){
var name=enc(_3d2.name);
_3cb.push(name+"="+enc(_3d2.value));
_3cb.push(name+".x=0");
_3cb.push(name+".y=0");
}
}
return _3cb.join("&")+"&";
};
dojo.io.FormBind=function(args){
this.bindArgs={};
if(args&&args.formNode){
this.init(args);
}else{
if(args){
this.init({formNode:args});
}
}
};
dojo.lang.extend(dojo.io.FormBind,{form:null,bindArgs:null,clickedButton:null,init:function(args){
var form=dojo.byId(args.formNode);
if(!form||!form.tagName||form.tagName.toLowerCase()!="form"){
throw new Error("FormBind: Couldn't apply, invalid form");
}else{
if(this.form==form){
return;
}else{
if(this.form){
throw new Error("FormBind: Already applied to a form");
}
}
}
dojo.lang.mixin(this.bindArgs,args);
this.form=form;
this.connect(form,"onsubmit","submit");
for(var i=0;i<form.elements.length;i++){
var node=form.elements[i];
if(node&&node.type&&dojo.lang.inArray(["submit","button"],node.type.toLowerCase())){
this.connect(node,"onclick","click");
}
}
var _3d8=form.getElementsByTagName("input");
for(var i=0;i<_3d8.length;i++){
var _3d9=_3d8[i];
if(_3d9.type.toLowerCase()=="image"&&_3d9.form==form){
this.connect(_3d9,"onclick","click");
}
}
},onSubmit:function(form){
return true;
},submit:function(e){
e.preventDefault();
if(this.onSubmit(this.form)){
dojo.io.bind(dojo.lang.mixin(this.bindArgs,{formFilter:dojo.lang.hitch(this,"formFilter")}));
}
},click:function(e){
var node=e.currentTarget;
if(node.disabled){
return;
}
this.clickedButton=node;
},formFilter:function(node){
var type=(node.type||"").toLowerCase();
var _3e0=false;
if(node.disabled||!node.name){
_3e0=false;
}else{
if(dojo.lang.inArray(["submit","button","image"],type)){
if(!this.clickedButton){
this.clickedButton=node;
}
_3e0=node==this.clickedButton;
}else{
_3e0=!dojo.lang.inArray(["file","submit","reset","button"],type);
}
}
return _3e0;
},connect:function(_3e1,_3e2,_3e3){
if(dojo.evalObjPath("dojo.event.connect")){
dojo.event.connect(_3e1,_3e2,this,_3e3);
}else{
var fcn=dojo.lang.hitch(this,_3e3);
_3e1[_3e2]=function(e){
if(!e){
e=window.event;
}
if(!e.currentTarget){
e.currentTarget=e.srcElement;
}
if(!e.preventDefault){
e.preventDefault=function(){
window.event.returnValue=false;
};
}
fcn(e);
};
}
}});
dojo.io.XMLHTTPTransport=new function(){
var _3e6=this;
var _3e7={};
this.useCache=false;
this.preventCache=false;
function getCacheKey(url,_3e9,_3ea){
return url+"|"+_3e9+"|"+_3ea.toLowerCase();
}
function addToCache(url,_3ec,_3ed,http){
_3e7[getCacheKey(url,_3ec,_3ed)]=http;
}
function getFromCache(url,_3f0,_3f1){
return _3e7[getCacheKey(url,_3f0,_3f1)];
}
this.clearCache=function(){
_3e7={};
};
function doLoad(_3f2,http,url,_3f5,_3f6){
if(((http.status>=200)&&(http.status<300))||(http.status==304)||(location.protocol=="file:"&&(http.status==0||http.status==undefined))||(location.protocol=="chrome:"&&(http.status==0||http.status==undefined))){
var ret;
if(_3f2.method.toLowerCase()=="head"){
var _3f8=http.getAllResponseHeaders();
ret={};
ret.toString=function(){
return _3f8;
};
var _3f9=_3f8.split(/[\r\n]+/g);
for(var i=0;i<_3f9.length;i++){
var pair=_3f9[i].match(/^([^:]+)\s*:\s*(.+)$/i);
if(pair){
ret[pair[1]]=pair[2];
}
}
}else{
if(_3f2.mimetype=="text/javascript"){
try{
ret=dj_eval(http.responseText);
}
catch(e){
dojo.debug(e);
dojo.debug(http.responseText);
ret=null;
}
}else{
if(_3f2.mimetype=="text/json"||_3f2.mimetype=="application/json"){
try{
ret=dj_eval("("+http.responseText+")");
}
catch(e){
dojo.debug(e);
dojo.debug(http.responseText);
ret=false;
}
}else{
if((_3f2.mimetype=="application/xml")||(_3f2.mimetype=="text/xml")){
if (http.responseText && http.responseText.indexOf("<message id=\"sessionTimeout\" type=\"error\"></message>")<0){
ret=http.responseXML;
if(!ret||typeof ret=="string"||!http.getResponseHeader("Content-Type")){
ret=dojo.dom.createDocumentFromText(http.responseText);
}
}else{
ret=http.responseText;
}
}else{
ret=http.responseText;
}
}
}
}
if(_3f6){
addToCache(url,_3f5,_3f2.method,http);
}
_3f2[(typeof _3f2.load=="function")?"load":"handle"]("load",ret,http,_3f2);
}else{
var _3fc=new dojo.io.Error("XMLHttpTransport Error: "+http.status+" "+http.statusText);
_3f2[(typeof _3f2.error=="function")?"error":"handle"]("error",_3fc,http,_3f2);
}
}
function setHeaders(http,_3fe){
if(_3fe["headers"]){
for(var _3ff in _3fe["headers"]){
if(_3ff.toLowerCase()=="content-type"&&!_3fe["contentType"]){
_3fe["contentType"]=_3fe["headers"][_3ff];
}else{
http.setRequestHeader(_3ff,_3fe["headers"][_3ff]);
}
}
}
}
this.inFlight=[];
this.inFlightTimer=null;
this.startWatchingInFlight=function(){
if(!this.inFlightTimer){
this.inFlightTimer=setTimeout("dojo.io.XMLHTTPTransport.watchInFlight();",10);
}
};
this.watchInFlight=function(){
var now=null;
if(!dojo.hostenv._blockAsync&&!_3e6._blockAsync){
for(var x=this.inFlight.length-1;x>=0;x--){
try{
var tif=this.inFlight[x];
if(!tif||tif.http._aborted||!tif.http.readyState){
this.inFlight.splice(x,1);
continue;
}
if(4==tif.http.readyState){
this.inFlight.splice(x,1);
doLoad(tif.req,tif.http,tif.url,tif.query,tif.useCache);
}else{
if(tif.startTime){
if(!now){
now=(new Date()).getTime();
}
if(tif.startTime+(tif.req.timeoutSeconds*1000)<now){
if(typeof tif.http.abort=="function"){
tif.http.abort();
}
this.inFlight.splice(x,1);
tif.req[(typeof tif.req.timeout=="function")?"timeout":"handle"]("timeout",null,tif.http,tif.req);
}
}
}
}
catch(e){
try{
var _403=new dojo.io.Error("XMLHttpTransport.watchInFlight Error: "+e);
tif.req[(typeof tif.req.error=="function")?"error":"handle"]("error",_403,tif.http,tif.req);
}
catch(e2){
dojo.debug("XMLHttpTransport error callback failed: "+e2);
}
}
}
}
clearTimeout(this.inFlightTimer);
if(this.inFlight.length==0){
this.inFlightTimer=null;
return;
}
this.inFlightTimer=setTimeout("dojo.io.XMLHTTPTransport.watchInFlight();",10);
};
var _404=dojo.hostenv.getXmlhttpObject()?true:false;
this.canHandle=function(_405){
return _404&&dojo.lang.inArray(["text/plain","text/html","application/xml","text/xml","text/javascript","text/json","application/json"],(_405["mimetype"].toLowerCase()||""))&&!(_405["formNode"]&&dojo.io.formHasFile(_405["formNode"]));
};
this.multipartBoundary="45309FFF-BD65-4d50-99C9-36986896A96F";
this.bind=function(_406){
if(!_406["url"]){
if(!_406["formNode"]&&(_406["backButton"]||_406["back"]||_406["changeUrl"]||_406["watchForURL"])&&(!djConfig.preventBackButtonFix)){
dojo.deprecated("Using dojo.io.XMLHTTPTransport.bind() to add to browser history without doing an IO request","Use dojo.undo.browser.addToHistory() instead.","0.4");
dojo.undo.browser.addToHistory(_406);
return true;
}
}
var url=_406.url;
var _408="";
if(_406["formNode"]){
var ta=_406.formNode.getAttribute("action");
if((ta)&&(!_406["url"])){
url=ta;
}
var tp=_406.formNode.getAttribute("method");
if((tp)&&(!_406["method"])){
_406.method=tp;
}
_408+=dojo.io.encodeForm(_406.formNode,_406.encoding,_406["formFilter"]);
}
if(url.indexOf("#")>-1){
dojo.debug("Warning: dojo.io.bind: stripping hash values from url:",url);
url=url.split("#")[0];
}
if(_406["file"]){
_406.method="post";
}
if(!_406["method"]){
_406.method="get";
}
if(_406.method.toLowerCase()=="get"){
_406.multipart=false;
}else{
if(_406["file"]){
_406.multipart=true;
}else{
if(!_406["multipart"]){
_406.multipart=false;
}
}
}
if(_406["backButton"]||_406["back"]||_406["changeUrl"]){
dojo.undo.browser.addToHistory(_406);
}
var _40b=_406["content"]||{};
if(_406.sendTransport){
_40b["dojo.transport"]="xmlhttp";
}
do{
if(_406.postContent){
_408=_406.postContent;
break;
}
if(_40b){
_408+=dojo.io.argsFromMap(_40b,_406.encoding);
}
if(_406.method.toLowerCase()=="get"||!_406.multipart){
break;
}
var t=[];
if(_408.length){
var q=_408.split("&");
for(var i=0;i<q.length;++i){
if(q[i].length){
var p=q[i].split("=");
t.push("--"+this.multipartBoundary,"Content-Disposition: form-data; name=\""+p[0]+"\"","",p[1]);
}
}
}
if(_406.file){
if(dojo.lang.isArray(_406.file)){
for(var i=0;i<_406.file.length;++i){
var o=_406.file[i];
t.push("--"+this.multipartBoundary,"Content-Disposition: form-data; name=\""+o.name+"\"; filename=\""+("fileName" in o?o.fileName:o.name)+"\"","Content-Type: "+("contentType" in o?o.contentType:"application/octet-stream"),"",o.content);
}
}else{
var o=_406.file;
t.push("--"+this.multipartBoundary,"Content-Disposition: form-data; name=\""+o.name+"\"; filename=\""+("fileName" in o?o.fileName:o.name)+"\"","Content-Type: "+("contentType" in o?o.contentType:"application/octet-stream"),"",o.content);
}
}
if(t.length){
t.push("--"+this.multipartBoundary+"--","");
_408=t.join("\r\n");
}
}while(false);
var _411=_406["sync"]?false:true;
var _412=_406["preventCache"]||(this.preventCache==true&&_406["preventCache"]!=false);
var _413=_406["useCache"]==true||(this.useCache==true&&_406["useCache"]!=false);
if(!_412&&_413){
var _414=getFromCache(url,_408,_406.method);
if(_414){
doLoad(_406,_414,url,_408,false);
return;
}
}
var http=dojo.hostenv.getXmlhttpObject(_406);
var _416=false;
if(_411){
var _417=this.inFlight.push({"req":_406,"http":http,"url":url,"query":_408,"useCache":_413,"startTime":_406.timeoutSeconds?(new Date()).getTime():0});
this.startWatchingInFlight();
}else{
_3e6._blockAsync=true;
}
if(_406.method.toLowerCase()=="post"){
if(!_406.user){
http.open("POST",url,_411);
}else{
http.open("POST",url,_411,_406.user,_406.password);
}
setHeaders(http,_406);
http.setRequestHeader("Content-Type",_406.multipart?("multipart/form-data; boundary="+this.multipartBoundary):(_406.contentType||"application/x-www-form-urlencoded"));
try{
http.send(_408);
}
catch(e){
if(typeof http.abort=="function"){
http.abort();
}
doLoad(_406,{status:404},url,_408,_413);
}
}else{
var _418=url;
if(_408!=""){
_418+=(_418.indexOf("?")>-1?"&":"?")+_408;
}
if(_412){
_418+=(dojo.string.endsWithAny(_418,"?","&")?"":(_418.indexOf("?")>-1?"&":"?"))+"dojo.preventCache="+new Date().valueOf();
}
if(!_406.user){
http.open(_406.method.toUpperCase(),_418,_411);
}else{
http.open(_406.method.toUpperCase(),_418,_411,_406.user,_406.password);
}
setHeaders(http,_406);
try{
http.send(null);
}
catch(e){
if(typeof http.abort=="function"){
http.abort();
}
doLoad(_406,{status:404},url,_408,_413);
}
}
if(!_411){
doLoad(_406,http,url,_408,_413);
_3e6._blockAsync=false;
}
_406.abort=function(){
try{
http._aborted=true;
}
catch(e){
}
return http.abort();
};
return;
};
dojo.io.transports.addTransport("XMLHTTPTransport");
};
}
dojo.provide("dojo.AdapterRegistry");
dojo.AdapterRegistry=function(_419){
this.pairs=[];
this.returnWrappers=_419||false;
};
dojo.lang.extend(dojo.AdapterRegistry,{register:function(name,_41b,wrap,_41d,_41e){
var type=(_41e)?"unshift":"push";
this.pairs[type]([name,_41b,wrap,_41d]);
},match:function(){
for(var i=0;i<this.pairs.length;i++){
var pair=this.pairs[i];
if(pair[1].apply(this,arguments)){
if((pair[3])||(this.returnWrappers)){
return pair[2];
}else{
return pair[2].apply(this,arguments);
}
}
}
throw new Error("No match found");
},unregister:function(name){
for(var i=0;i<this.pairs.length;i++){
var pair=this.pairs[i];
if(pair[0]==name){
this.pairs.splice(i,1);
return true;
}
}
return false;
}});
dojo.provide("dojo.json");
dojo.json={jsonRegistry:new dojo.AdapterRegistry(),register:function(name,_426,wrap,_428){
dojo.json.jsonRegistry.register(name,_426,wrap,_428);
},evalJson:function(json){
try{
return eval("("+json+")");
}
catch(e){
dojo.debug(e);
return json;
}
},serialize:function(o){
var _42b=typeof (o);
if(_42b=="undefined"){
return "undefined";
}else{
if((_42b=="number")||(_42b=="boolean")){
return o+"";
}else{
if(o===null){
return "null";
}
}
}
if(_42b=="string"){
return dojo.string.escapeString(o);
}
var me=arguments.callee;
var _42d;
if(typeof (o.__json__)=="function"){
_42d=o.__json__();
if(o!==_42d){
return me(_42d);
}
}
if(typeof (o.json)=="function"){
_42d=o.json();
if(o!==_42d){
return me(_42d);
}
}
if(_42b!="function"&&typeof (o.length)=="number"){
var res=[];
for(var i=0;i<o.length;i++){
var val=me(o[i]);
if(typeof (val)!="string"){
val="undefined";
}
res.push(val);
}
return "["+res.join(",")+"]";
}
try{
window.o=o;
_42d=dojo.json.jsonRegistry.match(o);
return me(_42d);
}
catch(e){
}
if(_42b=="function"){
return null;
}
res=[];
for(var k in o){
var _432;
if(typeof (k)=="number"){
_432="\""+k+"\"";
}else{
if(typeof (k)=="string"){
_432=dojo.string.escapeString(k);
}else{
continue;
}
}
val=me(o[k]);
if(typeof (val)!="string"){
continue;
}
res.push(_432+":"+val);
}
return "{"+res.join(",")+"}";
}};
dojo.provide("dojo.html.common");
dojo.lang.mixin(dojo.html,dojo.dom);
dojo.html.body=function(){
dojo.deprecated("dojo.html.body() moved to dojo.body()","0.5");
return dojo.body();
};
dojo.html.getEventTarget=function(evt){
if(!evt){
evt=dojo.global().event||{};
}
var t=(evt.srcElement?evt.srcElement:(evt.target?evt.target:null));
while((t)&&(t.nodeType!=1)){
t=t.parentNode;
}
return t;
};
dojo.html.getViewport=function(){
var _435=dojo.global();
var _436=dojo.doc();
var w=0;
var h=0;
if(dojo.render.html.mozilla){
w=_436.documentElement.clientWidth;
h=_435.innerHeight;
}else{
if(!dojo.render.html.opera&&_435.innerWidth){
w=_435.innerWidth;
h=_435.innerHeight;
}else{
if(!dojo.render.html.opera&&dojo.exists(_436,"documentElement.clientWidth")){
var w2=_436.documentElement.clientWidth;
if(!w||w2&&w2<w){
w=w2;
}
h=_436.documentElement.clientHeight;
}else{
if(dojo.body().clientWidth){
w=dojo.body().clientWidth;
h=dojo.body().clientHeight;
}
}
}
}
return {width:w,height:h};
};
dojo.html.getScroll=function(){
var _43a=dojo.global();
var _43b=dojo.doc();
var top=_43a.pageYOffset||_43b.documentElement.scrollTop||dojo.body().scrollTop||0;
var left=_43a.pageXOffset||_43b.documentElement.scrollLeft||dojo.body().scrollLeft||0;
return {top:top,left:left,offset:{x:left,y:top}};
};
dojo.html.getParentByType=function(node,type){
var _440=dojo.doc();
var _441=dojo.byId(node);
type=type.toLowerCase();
while((_441)&&(_441.nodeName.toLowerCase()!=type)){
if(_441==(_440["body"]||_440["documentElement"])){
return null;
}
_441=_441.parentNode;
}
return _441;
};
dojo.html.getAttribute=function(node,attr){
node=dojo.byId(node);
if((!node)||(!node.getAttribute)){
return null;
}
var ta=typeof attr=="string"?attr:new String(attr);
var v=node.getAttribute(ta.toUpperCase());
if((v)&&(typeof v=="string")&&(v!="")){
return v;
}
if(v&&v.value){
return v.value;
}
if((node.getAttributeNode)&&(node.getAttributeNode(ta))){
return (node.getAttributeNode(ta)).value;
}else{
if(node.getAttribute(ta)){
return node.getAttribute(ta);
}else{
if(node.getAttribute(ta.toLowerCase())){
return node.getAttribute(ta.toLowerCase());
}
}
}
return null;
};
dojo.html.hasAttribute=function(node,attr){
return dojo.html.getAttribute(dojo.byId(node),attr)?true:false;
};
dojo.html.getCursorPosition=function(e){
e=e||dojo.global().event;
var _449={x:0,y:0};
if(e.pageX||e.pageY){
_449.x=e.pageX;
_449.y=e.pageY;
}else{
var de=dojo.doc().documentElement;
var db=dojo.body();
_449.x=e.clientX+((de||db)["scrollLeft"])-((de||db)["clientLeft"]);
_449.y=e.clientY+((de||db)["scrollTop"])-((de||db)["clientTop"]);
}
return _449;
};
dojo.html.isTag=function(node){
node=dojo.byId(node);
if(node&&node.tagName){
for(var i=1;i<arguments.length;i++){
if(node.tagName.toLowerCase()==String(arguments[i]).toLowerCase()){
return String(arguments[i]).toLowerCase();
}
}
}
return "";
};
if(dojo.render.html.ie&&!dojo.render.html.ie70){
if(window.location.href.substr(0,6).toLowerCase()!="https:"){
(function(){
var _44e=dojo.doc().createElement("script");
_44e.src="javascript:'dojo.html.createExternalElement=function(doc, tag){ return doc.createElement(tag); }'";
dojo.doc().getElementsByTagName("head")[0].appendChild(_44e);
})();
}
}else{
dojo.html.createExternalElement=function(doc,tag){
return doc.createElement(tag);
};
}
dojo.html._callDeprecated=function(_451,_452,args,_454,_455){
dojo.deprecated("dojo.html."+_451,"replaced by dojo.html."+_452+"("+(_454?"node, {"+_454+": "+_454+"}":"")+")"+(_455?"."+_455:""),"0.5");
var _456=[];
if(_454){
var _457={};
_457[_454]=args[1];
_456.push(args[0]);
_456.push(_457);
}else{
_456=args;
}
var ret=dojo.html[_452].apply(dojo.html,args);
if(_455){
return ret[_455];
}else{
return ret;
}
};
dojo.html.getViewportWidth=function(){
return dojo.html._callDeprecated("getViewportWidth","getViewport",arguments,null,"width");
};
dojo.html.getViewportHeight=function(){
return dojo.html._callDeprecated("getViewportHeight","getViewport",arguments,null,"height");
};
dojo.html.getViewportSize=function(){
return dojo.html._callDeprecated("getViewportSize","getViewport",arguments);
};
dojo.html.getScrollTop=function(){
return dojo.html._callDeprecated("getScrollTop","getScroll",arguments,null,"top");
};
dojo.html.getScrollLeft=function(){
return dojo.html._callDeprecated("getScrollLeft","getScroll",arguments,null,"left");
};
dojo.html.getScrollOffset=function(){
return dojo.html._callDeprecated("getScrollOffset","getScroll",arguments,null,"offset");
};
dojo.provide("dojo.uri.Uri");
dojo.uri=new function(){
this.dojoUri=function(uri){
return new dojo.uri.Uri(dojo.hostenv.getBaseScriptUri(),uri);
};
this.moduleUri=function(_45a,uri){
var loc=dojo.hostenv.getModuleSymbols(_45a).join("/");
if(!loc){
return null;
}
if(loc.lastIndexOf("/")!=loc.length-1){
loc+="/";
}
return new dojo.uri.Uri(dojo.hostenv.getBaseScriptUri()+loc,uri);
};
this.Uri=function(){
var uri=arguments[0];
for(var i=1;i<arguments.length;i++){
if(!arguments[i]){
continue;
}
var _45f=new dojo.uri.Uri(arguments[i].toString());
var _460=new dojo.uri.Uri(uri.toString());
if((_45f.path=="")&&(_45f.scheme==null)&&(_45f.authority==null)&&(_45f.query==null)){
if(_45f.fragment!=null){
_460.fragment=_45f.fragment;
}
_45f=_460;
}else{
if(_45f.scheme==null){
_45f.scheme=_460.scheme;
if(_45f.authority==null){
_45f.authority=_460.authority;
if(_45f.path.charAt(0)!="/"){
var path=_460.path.substring(0,_460.path.lastIndexOf("/")+1)+_45f.path;
var segs=path.split("/");
for(var j=0;j<segs.length;j++){
if(segs[j]=="."){
if(j==segs.length-1){
segs[j]="";
}else{
segs.splice(j,1);
j--;
}
}else{
if(j>0&&!(j==1&&segs[0]=="")&&segs[j]==".."&&segs[j-1]!=".."){
if(j==segs.length-1){
segs.splice(j,1);
segs[j-1]="";
}else{
segs.splice(j-1,2);
j-=2;
}
}
}
}
_45f.path=segs.join("/");
}
}
}
}
uri="";
if(_45f.scheme!=null){
uri+=_45f.scheme+":";
}
if(_45f.authority!=null){
uri+="//"+_45f.authority;
}
uri+=_45f.path;
if(_45f.query!=null){
uri+="?"+_45f.query;
}
if(_45f.fragment!=null){
uri+="#"+_45f.fragment;
}
}
this.uri=uri.toString();
var _464="^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$";
var r=this.uri.match(new RegExp(_464));
this.scheme=r[2]||(r[1]?"":null);
this.authority=r[4]||(r[3]?"":null);
this.path=r[5];
this.query=r[7]||(r[6]?"":null);
this.fragment=r[9]||(r[8]?"":null);
if(this.authority!=null){
_464="^((([^:]+:)?([^@]+))@)?([^:]*)(:([0-9]+))?$";
r=this.authority.match(new RegExp(_464));
this.user=r[3]||null;
this.password=r[4]||null;
this.host=r[5];
this.port=r[7]||null;
}
this.toString=function(){
return this.uri;
};
};
};
dojo.provide("dojo.html.style");
dojo.html.getClass=function(node){
node=dojo.byId(node);
if(!node){
return "";
}
var cs="";
if(node.className){
cs=node.className;
}else{
if(dojo.html.hasAttribute(node,"class")){
cs=dojo.html.getAttribute(node,"class");
}
}
return cs.replace(/^\s+|\s+$/g,"");
};
dojo.html.getClasses=function(node){
var c=dojo.html.getClass(node);
return (c=="")?[]:c.split(/\s+/g);
};
dojo.html.hasClass=function(node,_46b){
return (new RegExp("(^|\\s+)"+_46b+"(\\s+|$)")).test(dojo.html.getClass(node));
};
dojo.html.prependClass=function(node,_46d){
_46d+=" "+dojo.html.getClass(node);
return dojo.html.setClass(node,_46d);
};
dojo.html.addClass=function(node,_46f){
if(dojo.html.hasClass(node,_46f)){
return false;
}
_46f=(dojo.html.getClass(node)+" "+_46f).replace(/^\s+|\s+$/g,"");
return dojo.html.setClass(node,_46f);
};
dojo.html.setClass=function(node,_471){
node=dojo.byId(node);
var cs=new String(_471);
try{
if(typeof node.className=="string"){
node.className=cs;
}else{
if(node.setAttribute){
node.setAttribute("class",_471);
node.className=cs;
}else{
return false;
}
}
}
catch(e){
dojo.debug("dojo.html.setClass() failed",e);
}
return true;
};
dojo.html.removeClass=function(node,_474,_475){
try{
if(!_475){
var _476=dojo.html.getClass(node).replace(new RegExp("(^|\\s+)"+_474+"(\\s+|$)"),"$1$2");
}else{
var _476=dojo.html.getClass(node).replace(_474,"");
}
dojo.html.setClass(node,_476);
}
catch(e){
dojo.debug("dojo.html.removeClass() failed",e);
}
return true;
};
dojo.html.replaceClass=function(node,_478,_479){
dojo.html.removeClass(node,_479);
dojo.html.addClass(node,_478);
};
dojo.html.classMatchType={ContainsAll:0,ContainsAny:1,IsOnly:2};
dojo.html.getElementsByClass=function(_47a,_47b,_47c,_47d,_47e){
_47e=false;
var _47f=dojo.doc();
_47b=dojo.byId(_47b)||_47f;
var _480=_47a.split(/\s+/g);
var _481=[];
if(_47d!=1&&_47d!=2){
_47d=0;
}
var _482=new RegExp("(\\s|^)(("+_480.join(")|(")+"))(\\s|$)");
var _483=_480.join(" ").length;
var _484=[];
if(!_47e&&_47f.evaluate){
var _485=".//"+(_47c||"*")+"[contains(";
if(_47d!=dojo.html.classMatchType.ContainsAny){
_485+="concat(' ',@class,' '), ' "+_480.join(" ') and contains(concat(' ',@class,' '), ' ")+" ')";
if(_47d==2){
_485+=" and string-length(@class)="+_483+"]";
}else{
_485+="]";
}
}else{
_485+="concat(' ',@class,' '), ' "+_480.join(" ') or contains(concat(' ',@class,' '), ' ")+" ')]";
}
var _486=_47f.evaluate(_485,_47b,null,XPathResult.ANY_TYPE,null);
var _487=_486.iterateNext();
while(_487){
try{
_484.push(_487);
_487=_486.iterateNext();
}
catch(e){
break;
}
}
return _484;
}else{
if(!_47c){
_47c="*";
}
_484=_47b.getElementsByTagName(_47c);
var node,i=0;
outer:
while(node=_484[i++]){
var _48a=dojo.html.getClasses(node);
if(_48a.length==0){
continue outer;
}
var _48b=0;
for(var j=0;j<_48a.length;j++){
if(_482.test(_48a[j])){
if(_47d==dojo.html.classMatchType.ContainsAny){
_481.push(node);
continue outer;
}else{
_48b++;
}
}else{
if(_47d==dojo.html.classMatchType.IsOnly){
continue outer;
}
}
}
if(_48b==_480.length){
if((_47d==dojo.html.classMatchType.IsOnly)&&(_48b==_48a.length)){
_481.push(node);
}else{
if(_47d==dojo.html.classMatchType.ContainsAll){
_481.push(node);
}
}
}
}
return _481;
}
};
dojo.html.getElementsByClassName=dojo.html.getElementsByClass;
dojo.html.toCamelCase=function(_48d){
var arr=_48d.split("-"),cc=arr[0];
for(var i=1;i<arr.length;i++){
cc+=arr[i].charAt(0).toUpperCase()+arr[i].substring(1);
}
return cc;
};
dojo.html.toSelectorCase=function(_491){
return _491.replace(/([A-Z])/g,"-$1").toLowerCase();
};
dojo.html.getComputedStyle=function(node,_493,_494){
node=dojo.byId(node);
var _493=dojo.html.toSelectorCase(_493);
var _495=dojo.html.toCamelCase(_493);
if(!node||!node.style){
return _494;
}else{
if(document.defaultView&&dojo.html.isDescendantOf(node,node.ownerDocument)){
try{
var cs=document.defaultView.getComputedStyle(node,"");
if(cs){
return cs.getPropertyValue(_493);
}
}
catch(e){
if(node.style.getPropertyValue){
return node.style.getPropertyValue(_493);
}else{
return _494;
}
}
}else{
if(node.currentStyle){
return node.currentStyle[_495];
}
}
}
if(node.style.getPropertyValue){
return node.style.getPropertyValue(_493);
}else{
return _494;
}
};
dojo.html.getStyleProperty=function(node,_498){
node=dojo.byId(node);
return (node&&node.style?node.style[dojo.html.toCamelCase(_498)]:undefined);
};
dojo.html.getStyle=function(node,_49a){
var _49b=dojo.html.getStyleProperty(node,_49a);
return (_49b?_49b:dojo.html.getComputedStyle(node,_49a));
};
dojo.html.setStyle=function(node,_49d,_49e){
node=dojo.byId(node);
if(node&&node.style){
var _49f=dojo.html.toCamelCase(_49d);
node.style[_49f]=_49e;
}
};
dojo.html.setStyleText=function(_4a0,text){
try{
_4a0.style.cssText=text;
}
catch(e){
_4a0.setAttribute("style",text);
}
};
dojo.html.copyStyle=function(_4a2,_4a3){
if(!_4a3.style.cssText){
_4a2.setAttribute("style",_4a3.getAttribute("style"));
}else{
_4a2.style.cssText=_4a3.style.cssText;
}
dojo.html.addClass(_4a2,dojo.html.getClass(_4a3));
};
dojo.html.getUnitValue=function(node,_4a5,_4a6){
var s=dojo.html.getComputedStyle(node,_4a5);
if((!s)||((s=="auto")&&(_4a6))){
return {value:0,units:"px"};
}
var _4a8=s.match(/(\-?[\d.]+)([a-z%]*)/i);
if(!_4a8){
return dojo.html.getUnitValue.bad;
}
return {value:Number(_4a8[1]),units:_4a8[2].toLowerCase()};
};
dojo.html.getUnitValue.bad={value:NaN,units:""};
dojo.html.getPixelValue=function(node,_4aa,_4ab){
var _4ac=dojo.html.getUnitValue(node,_4aa,_4ab);
if(isNaN(_4ac.value)){
return 0;
}
if((_4ac.value)&&(_4ac.units!="px")){
return NaN;
}
return _4ac.value;
};
dojo.html.setPositivePixelValue=function(node,_4ae,_4af){
if(isNaN(_4af)){
return false;
}
node.style[_4ae]=Math.max(0,_4af)+"px";
return true;
};
dojo.html.styleSheet=null;
dojo.html.insertCssRule=function(_4b0,_4b1,_4b2){
if(!dojo.html.styleSheet){
if(document.createStyleSheet){
dojo.html.styleSheet=document.createStyleSheet();
}else{
if(document.styleSheets[0]){
dojo.html.styleSheet=document.styleSheets[0];
}else{
return null;
}
}
}
if(arguments.length<3){
if(dojo.html.styleSheet.cssRules){
_4b2=dojo.html.styleSheet.cssRules.length;
}else{
if(dojo.html.styleSheet.rules){
_4b2=dojo.html.styleSheet.rules.length;
}else{
return null;
}
}
}
if(dojo.html.styleSheet.insertRule){
var rule=_4b0+" { "+_4b1+" }";
return dojo.html.styleSheet.insertRule(rule,_4b2);
}else{
if(dojo.html.styleSheet.addRule){
return dojo.html.styleSheet.addRule(_4b0,_4b1,_4b2);
}else{
return null;
}
}
};
dojo.html.removeCssRule=function(_4b4){
if(!dojo.html.styleSheet){
dojo.debug("no stylesheet defined for removing rules");
return false;
}
if(dojo.render.html.ie){
if(!_4b4){
_4b4=dojo.html.styleSheet.rules.length;
dojo.html.styleSheet.removeRule(_4b4);
}
}else{
if(document.styleSheets[0]){
if(!_4b4){
_4b4=dojo.html.styleSheet.cssRules.length;
}
dojo.html.styleSheet.deleteRule(_4b4);
}
}
return true;
};
dojo.html._insertedCssFiles=[];
dojo.html.insertCssFile=function(URI,doc,_4b7,_4b8){
if(!URI){
return;
}
if(!doc){
doc=document;
}
var _4b9=dojo.hostenv.getText(URI,false,_4b8);
if(_4b9===null){
return;
}
_4b9=dojo.html.fixPathsInCssText(_4b9,URI);
if(_4b7){
var idx=-1,node,ent=dojo.html._insertedCssFiles;
for(var i=0;i<ent.length;i++){
if((ent[i].doc==doc)&&(ent[i].cssText==_4b9)){
idx=i;
node=ent[i].nodeRef;
break;
}
}
if(node){
var _4be=doc.getElementsByTagName("style");
for(var i=0;i<_4be.length;i++){
if(_4be[i]==node){
return;
}
}
dojo.html._insertedCssFiles.shift(idx,1);
}
}
var _4bf=dojo.html.insertCssText(_4b9,doc);
dojo.html._insertedCssFiles.push({"doc":doc,"cssText":_4b9,"nodeRef":_4bf});
if(_4bf&&djConfig.isDebug){
_4bf.setAttribute("dbgHref",URI);
}
return _4bf;
};
dojo.html.insertCssText=function(_4c0,doc,URI){
if(!_4c0){
return;
}
if(!doc){
doc=document;
}
if(URI){
_4c0=dojo.html.fixPathsInCssText(_4c0,URI);
}
var _4c3=doc.createElement("style");
_4c3.setAttribute("type","text/css");
var head=doc.getElementsByTagName("head")[0];
if(!head){
dojo.debug("No head tag in document, aborting styles");
return;
}else{
head.appendChild(_4c3);
}
if(_4c3.styleSheet){
var _4c5=function(){
try{
_4c3.styleSheet.cssText=_4c0;
}
catch(e){
dojo.debug(e);
}
};
if(_4c3.styleSheet.disabled){
setTimeout(_4c5,10);
}else{
_4c5();
}
}else{
var _4c6=doc.createTextNode(_4c0);
_4c3.appendChild(_4c6);
}
return _4c3;
};
dojo.html.fixPathsInCssText=function(_4c7,URI){
if(!_4c7||!URI){
return;
}
var _4c9,str="",url="",_4cc="[\\t\\s\\w\\(\\)\\/\\.\\\\'\"-:#=&?~]+";
var _4cd=new RegExp("url\\(\\s*("+_4cc+")\\s*\\)");
var _4ce=/(file|https?|ftps?):\/\//;
regexTrim=new RegExp("^[\\s]*(['\"]?)("+_4cc+")\\1[\\s]*?$");
if(dojo.render.html.ie55||dojo.render.html.ie60){
var _4cf=new RegExp("AlphaImageLoader\\((.*)src=['\"]("+_4cc+")['\"]");
while(_4c9=_4cf.exec(_4c7)){
url=_4c9[2].replace(regexTrim,"$2");
if(!_4ce.exec(url)){
url=(new dojo.uri.Uri(URI,url).toString());
}
str+=_4c7.substring(0,_4c9.index)+"AlphaImageLoader("+_4c9[1]+"src='"+url+"'";
_4c7=_4c7.substr(_4c9.index+_4c9[0].length);
}
_4c7=str+_4c7;
str="";
}
while(_4c9=_4cd.exec(_4c7)){
url=_4c9[1].replace(regexTrim,"$2");
if(!_4ce.exec(url)){
url=(new dojo.uri.Uri(URI,url).toString());
}
str+=_4c7.substring(0,_4c9.index)+"url("+url+")";
_4c7=_4c7.substr(_4c9.index+_4c9[0].length);
}
return str+_4c7;
};
dojo.html.setActiveStyleSheet=function(_4d0){
var i=0,a,els=dojo.doc().getElementsByTagName("link");
while(a=els[i++]){
if(a.getAttribute("rel").indexOf("style")!=-1&&a.getAttribute("title")){
a.disabled=true;
if(a.getAttribute("title")==_4d0){
a.disabled=false;
}
}
}
};
dojo.html.getActiveStyleSheet=function(){
var i=0,a,els=dojo.doc().getElementsByTagName("link");
while(a=els[i++]){
if(a.getAttribute("rel").indexOf("style")!=-1&&a.getAttribute("title")&&!a.disabled){
return a.getAttribute("title");
}
}
return null;
};
dojo.html.getPreferredStyleSheet=function(){
var i=0,a,els=dojo.doc().getElementsByTagName("link");
while(a=els[i++]){
if(a.getAttribute("rel").indexOf("style")!=-1&&a.getAttribute("rel").indexOf("alt")==-1&&a.getAttribute("title")){
return a.getAttribute("title");
}
}
return null;
};
dojo.html.applyBrowserClass=function(node){
var drh=dojo.render.html;
var _4dc={dj_ie:drh.ie,dj_ie55:drh.ie55,dj_ie6:drh.ie60,dj_ie7:drh.ie70,dj_iequirks:drh.ie&&drh.quirks,dj_opera:drh.opera,dj_opera8:drh.opera&&(Math.floor(dojo.render.version)==8),dj_opera9:drh.opera&&(Math.floor(dojo.render.version)==9),dj_khtml:drh.khtml,dj_safari:drh.safari,dj_gecko:drh.mozilla};
for(var p in _4dc){
if(_4dc[p]){
dojo.html.addClass(node,p);
}
}
};
dojo.provide("dojo.html.*");
dojo.provide("dojo.html.display");
dojo.html._toggle=function(node,_4df,_4e0){
node=dojo.byId(node);
_4e0(node,!_4df(node));
return _4df(node);
};
dojo.html.show=function(node){
node=dojo.byId(node);
if(dojo.html.getStyleProperty(node,"display")=="none"){
dojo.html.setStyle(node,"display",(node.dojoDisplayCache||""));
node.dojoDisplayCache=undefined;
}
};
dojo.html.hide=function(node){
node=dojo.byId(node);
if(typeof node["dojoDisplayCache"]=="undefined"){
var d=dojo.html.getStyleProperty(node,"display");
if(d!="none"){
node.dojoDisplayCache=d;
}
}
dojo.html.setStyle(node,"display","none");
};
dojo.html.setShowing=function(node,_4e5){
dojo.html[(_4e5?"show":"hide")](node);
};
dojo.html.isShowing=function(node){
return (dojo.html.getStyleProperty(node,"display")!="none");
};
dojo.html.toggleShowing=function(node){
return dojo.html._toggle(node,dojo.html.isShowing,dojo.html.setShowing);
};
dojo.html.displayMap={tr:"",td:"",th:"",img:"inline",span:"inline",input:"inline",button:"inline"};
dojo.html.suggestDisplayByTagName=function(node){
node=dojo.byId(node);
if(node&&node.tagName){
var tag=node.tagName.toLowerCase();
return (tag in dojo.html.displayMap?dojo.html.displayMap[tag]:"block");
}
};
dojo.html.setDisplay=function(node,_4eb){
dojo.html.setStyle(node,"display",((_4eb instanceof String||typeof _4eb=="string")?_4eb:(_4eb?dojo.html.suggestDisplayByTagName(node):"none")));
};
dojo.html.isDisplayed=function(node){
return (dojo.html.getComputedStyle(node,"display")!="none");
};
dojo.html.toggleDisplay=function(node){
return dojo.html._toggle(node,dojo.html.isDisplayed,dojo.html.setDisplay);
};
dojo.html.setVisibility=function(node,_4ef){
dojo.html.setStyle(node,"visibility",((_4ef instanceof String||typeof _4ef=="string")?_4ef:(_4ef?"visible":"hidden")));
};
dojo.html.isVisible=function(node){
return (dojo.html.getComputedStyle(node,"visibility")!="hidden");
};
dojo.html.toggleVisibility=function(node){
return dojo.html._toggle(node,dojo.html.isVisible,dojo.html.setVisibility);
};
dojo.html.setOpacity=function(node,_4f3,_4f4){
node=dojo.byId(node);
var h=dojo.render.html;
if(!_4f4){
if(_4f3>=1){
if(h.ie){
dojo.html.clearOpacity(node);
return;
}else{
_4f3=0.999999;
}
}else{
if(_4f3<0){
_4f3=0;
}
}
}
if(h.ie){
if(node.nodeName.toLowerCase()=="tr"){
var tds=node.getElementsByTagName("td");
for(var x=0;x<tds.length;x++){
tds[x].style.filter="Alpha(Opacity="+_4f3*100+")";
}
}
node.style.filter="Alpha(Opacity="+_4f3*100+")";
}else{
if(h.moz){
node.style.opacity=_4f3;
node.style.MozOpacity=_4f3;
}else{
if(h.safari){
node.style.opacity=_4f3;
node.style.KhtmlOpacity=_4f3;
}else{
node.style.opacity=_4f3;
}
}
}
};
dojo.html.clearOpacity=function(node){
node=dojo.byId(node);
var ns=node.style;
var h=dojo.render.html;
if(h.ie){
try{
if(node.filters&&node.filters.alpha){
ns.filter="";
}
}
catch(e){
}
}else{
if(h.moz){
ns.opacity=1;
ns.MozOpacity=1;
}else{
if(h.safari){
ns.opacity=1;
ns.KhtmlOpacity=1;
}else{
ns.opacity=1;
}
}
}
};
dojo.html.getOpacity=function(node){
node=dojo.byId(node);
var h=dojo.render.html;
if(h.ie){
var opac=(node.filters&&node.filters.alpha&&typeof node.filters.alpha.opacity=="number"?node.filters.alpha.opacity:100)/100;
}else{
var opac=node.style.opacity||node.style.MozOpacity||node.style.KhtmlOpacity||1;
}
return opac>=0.999999?1:Number(opac);
};
dojo.provide("dojo.html.layout");
dojo.html.sumAncestorProperties=function(node,prop){
node=dojo.byId(node);
if(!node){
return 0;
}
var _500=0;
while(node){
if(dojo.html.getComputedStyle(node,"position")=="fixed"){
return 0;
}
var val=node[prop];
if(val){
_500+=val-0;
if(node==dojo.body()){
break;
}
}
node=node.parentNode;
}
return _500;
};
dojo.html.setStyleAttributes=function(node,_503){
node=dojo.byId(node);
var _504=_503.replace(/(;)?\s*$/,"").split(";");
for(var i=0;i<_504.length;i++){
var _506=_504[i].split(":");
var name=_506[0].replace(/\s*$/,"").replace(/^\s*/,"").toLowerCase();
var _508=_506[1].replace(/\s*$/,"").replace(/^\s*/,"");
switch(name){
case "opacity":
dojo.html.setOpacity(node,_508);
break;
case "content-height":
dojo.html.setContentBox(node,{height:_508});
break;
case "content-width":
dojo.html.setContentBox(node,{width:_508});
break;
case "outer-height":
dojo.html.setMarginBox(node,{height:_508});
break;
case "outer-width":
dojo.html.setMarginBox(node,{width:_508});
break;
default:
node.style[dojo.html.toCamelCase(name)]=_508;
}
}
};
dojo.html.boxSizing={MARGIN_BOX:"margin-box",BORDER_BOX:"border-box",PADDING_BOX:"padding-box",CONTENT_BOX:"content-box"};
dojo.html.getAbsolutePosition=dojo.html.abs=function(node,_50a,_50b){
node=dojo.byId(node,node.ownerDocument);
var ret={x:0,y:0};
var bs=dojo.html.boxSizing;
if(!_50b){
_50b=bs.CONTENT_BOX;
}
var _50e=2;
var _50f;
switch(_50b){
case bs.MARGIN_BOX:
_50f=3;
break;
case bs.BORDER_BOX:
_50f=2;
break;
case bs.PADDING_BOX:
default:
_50f=1;
break;
case bs.CONTENT_BOX:
_50f=0;
break;
}
var h=dojo.render.html;
var db=document["body"]||document["documentElement"];
if(h.ie){
with(node.getBoundingClientRect()){
ret.x=left-2;
ret.y=top-2;
}
}else{
if(document.getBoxObjectFor){
_50e=1;
try{
var bo=document.getBoxObjectFor(node);
ret.x=bo.x-dojo.html.sumAncestorProperties(node,"scrollLeft");
ret.y=bo.y-dojo.html.sumAncestorProperties(node,"scrollTop");
}
catch(e){
}
}else{
if(node["offsetParent"]){
var _513;
if((h.safari)&&(node.style.getPropertyValue("position")=="absolute")&&(node.parentNode==db)){
_513=db;
}else{
_513=db.parentNode;
}
if(node.parentNode!=db){
var nd=node;
if(dojo.render.html.opera){
nd=db;
}
ret.x-=dojo.html.sumAncestorProperties(nd,"scrollLeft");
ret.y-=dojo.html.sumAncestorProperties(nd,"scrollTop");
}
var _515=node;
do{
var n=_515["offsetLeft"];
if(!h.opera||n>0){
ret.x+=isNaN(n)?0:n;
}
var m=_515["offsetTop"];
ret.y+=isNaN(m)?0:m;
_515=_515.offsetParent;
}while((_515!=_513)&&(_515!=null));
}else{
if(node["x"]&&node["y"]){
ret.x+=isNaN(node.x)?0:node.x;
ret.y+=isNaN(node.y)?0:node.y;
}
}
}
}
if(_50a){
var _518=dojo.html.getScroll();
ret.y+=_518.top;
ret.x+=_518.left;
}
var _519=[dojo.html.getPaddingExtent,dojo.html.getBorderExtent,dojo.html.getMarginExtent];
if(_50e>_50f){
for(var i=_50f;i<_50e;++i){
ret.y+=_519[i](node,"top");
ret.x+=_519[i](node,"left");
}
}else{
if(_50e<_50f){
for(var i=_50f;i>_50e;--i){
ret.y-=_519[i-1](node,"top");
ret.x-=_519[i-1](node,"left");
}
}
}
ret.top=ret.y;
ret.left=ret.x;
return ret;
};
dojo.html.isPositionAbsolute=function(node){
return (dojo.html.getComputedStyle(node,"position")=="absolute");
};
dojo.html._sumPixelValues=function(node,_51d,_51e){
var _51f=0;
for(var x=0;x<_51d.length;x++){
_51f+=dojo.html.getPixelValue(node,_51d[x],_51e);
}
return _51f;
};
dojo.html.getMargin=function(node){
return {width:dojo.html._sumPixelValues(node,["margin-left","margin-right"],(dojo.html.getComputedStyle(node,"position")=="absolute")),height:dojo.html._sumPixelValues(node,["margin-top","margin-bottom"],(dojo.html.getComputedStyle(node,"position")=="absolute"))};
};
dojo.html.getBorder=function(node){
return {width:dojo.html.getBorderExtent(node,"left")+dojo.html.getBorderExtent(node,"right"),height:dojo.html.getBorderExtent(node,"top")+dojo.html.getBorderExtent(node,"bottom")};
};
dojo.html.getBorderExtent=function(node,side){
return (dojo.html.getStyle(node,"border-"+side+"-style")=="none"?0:dojo.html.getPixelValue(node,"border-"+side+"-width"));
};
dojo.html.getMarginExtent=function(node,side){
return dojo.html._sumPixelValues(node,["margin-"+side],dojo.html.isPositionAbsolute(node));
};
dojo.html.getPaddingExtent=function(node,side){
return dojo.html._sumPixelValues(node,["padding-"+side],true);
};
dojo.html.getPadding=function(node){
return {width:dojo.html._sumPixelValues(node,["padding-left","padding-right"],true),height:dojo.html._sumPixelValues(node,["padding-top","padding-bottom"],true)};
};
dojo.html.getPadBorder=function(node){
var pad=dojo.html.getPadding(node);
var _52c=dojo.html.getBorder(node);
return {width:pad.width+_52c.width,height:pad.height+_52c.height};
};
dojo.html.getBoxSizing=function(node){
var h=dojo.render.html;
var bs=dojo.html.boxSizing;
if(((h.ie)||(h.opera))&&node.nodeName!="IMG"){
var cm=document["compatMode"];
if((cm=="BackCompat")||(cm=="QuirksMode")){
return bs.BORDER_BOX;
}else{
return bs.CONTENT_BOX;
}
}else{
if(arguments.length==0){
node=document.documentElement;
}
var _531=dojo.html.getStyle(node,"-moz-box-sizing");
if(!_531){
_531=dojo.html.getStyle(node,"box-sizing");
}
return (_531?_531:bs.CONTENT_BOX);
}
};
dojo.html.isBorderBox=function(node){
return (dojo.html.getBoxSizing(node)==dojo.html.boxSizing.BORDER_BOX);
};
dojo.html.getBorderBox=function(node){
node=dojo.byId(node);
return {width:node.offsetWidth,height:node.offsetHeight};
};
dojo.html.getPaddingBox=function(node){
var box=dojo.html.getBorderBox(node);
var _536=dojo.html.getBorder(node);
return {width:box.width-_536.width,height:box.height-_536.height};
};
dojo.html.getContentBox=function(node){
node=dojo.byId(node);
var _538=dojo.html.getPadBorder(node);
return {width:node.offsetWidth-_538.width,height:node.offsetHeight-_538.height};
};
dojo.html.setContentBox=function(node,args){
node=dojo.byId(node);
var _53b=0;
var _53c=0;
var isbb=dojo.html.isBorderBox(node);
var _53e=(isbb?dojo.html.getPadBorder(node):{width:0,height:0});
var ret={};
if(typeof args.width!="undefined"){
_53b=args.width+_53e.width;
ret.width=dojo.html.setPositivePixelValue(node,"width",_53b);
}
if(typeof args.height!="undefined"){
_53c=args.height+_53e.height;
ret.height=dojo.html.setPositivePixelValue(node,"height",_53c);
}
return ret;
};
dojo.html.getMarginBox=function(node){
var _541=dojo.html.getBorderBox(node);
var _542=dojo.html.getMargin(node);
return {width:_541.width+_542.width,height:_541.height+_542.height};
};
dojo.html.setMarginBox=function(node,args){
node=dojo.byId(node);
var _545=0;
var _546=0;
var isbb=dojo.html.isBorderBox(node);
var _548=(!isbb?dojo.html.getPadBorder(node):{width:0,height:0});
var _549=dojo.html.getMargin(node);
var ret={};
if(typeof args.width!="undefined"){
_545=args.width-_548.width;
_545-=_549.width;
ret.width=dojo.html.setPositivePixelValue(node,"width",_545);
}
if(typeof args.height!="undefined"){
_546=args.height-_548.height;
_546-=_549.height;
ret.height=dojo.html.setPositivePixelValue(node,"height",_546);
}
return ret;
};
dojo.html.getElementBox=function(node,type){
var bs=dojo.html.boxSizing;
switch(type){
case bs.MARGIN_BOX:
return dojo.html.getMarginBox(node);
case bs.BORDER_BOX:
return dojo.html.getBorderBox(node);
case bs.PADDING_BOX:
return dojo.html.getPaddingBox(node);
case bs.CONTENT_BOX:
default:
return dojo.html.getContentBox(node);
}
};
dojo.html.toCoordinateObject=dojo.html.toCoordinateArray=function(_54e,_54f,_550){
if(_54e instanceof Array||typeof _54e=="array"){
dojo.deprecated("dojo.html.toCoordinateArray","use dojo.html.toCoordinateObject({left: , top: , width: , height: }) instead","0.5");
while(_54e.length<4){
_54e.push(0);
}
while(_54e.length>4){
_54e.pop();
}
var ret={left:_54e[0],top:_54e[1],width:_54e[2],height:_54e[3]};
}else{
if(!_54e.nodeType&&!(_54e instanceof String||typeof _54e=="string")&&("width" in _54e||"height" in _54e||"left" in _54e||"x" in _54e||"top" in _54e||"y" in _54e)){
var ret={left:_54e.left||_54e.x||0,top:_54e.top||_54e.y||0,width:_54e.width||0,height:_54e.height||0};
}else{
var node=dojo.byId(_54e);
var pos=dojo.html.abs(node,_54f,_550);
var _554=dojo.html.getMarginBox(node);
var ret={left:pos.left,top:pos.top,width:_554.width,height:_554.height};
}
}
ret.x=ret.left;
ret.y=ret.top;
return ret;
};
dojo.html.setMarginBoxWidth=dojo.html.setOuterWidth=function(node,_556){
return dojo.html._callDeprecated("setMarginBoxWidth","setMarginBox",arguments,"width");
};
dojo.html.setMarginBoxHeight=dojo.html.setOuterHeight=function(){
return dojo.html._callDeprecated("setMarginBoxHeight","setMarginBox",arguments,"height");
};
dojo.html.getMarginBoxWidth=dojo.html.getOuterWidth=function(){
return dojo.html._callDeprecated("getMarginBoxWidth","getMarginBox",arguments,null,"width");
};
dojo.html.getMarginBoxHeight=dojo.html.getOuterHeight=function(){
return dojo.html._callDeprecated("getMarginBoxHeight","getMarginBox",arguments,null,"height");
};
dojo.html.getTotalOffset=function(node,type,_559){
return dojo.html._callDeprecated("getTotalOffset","getAbsolutePosition",arguments,null,type);
};
dojo.html.getAbsoluteX=function(node,_55b){
return dojo.html._callDeprecated("getAbsoluteX","getAbsolutePosition",arguments,null,"x");
};
dojo.html.getAbsoluteY=function(node,_55d){
return dojo.html._callDeprecated("getAbsoluteY","getAbsolutePosition",arguments,null,"y");
};
dojo.html.totalOffsetLeft=function(node,_55f){
return dojo.html._callDeprecated("totalOffsetLeft","getAbsolutePosition",arguments,null,"left");
};
dojo.html.totalOffsetTop=function(node,_561){
return dojo.html._callDeprecated("totalOffsetTop","getAbsolutePosition",arguments,null,"top");
};
dojo.html.getMarginWidth=function(node){
return dojo.html._callDeprecated("getMarginWidth","getMargin",arguments,null,"width");
};
dojo.html.getMarginHeight=function(node){
return dojo.html._callDeprecated("getMarginHeight","getMargin",arguments,null,"height");
};
dojo.html.getBorderWidth=function(node){
return dojo.html._callDeprecated("getBorderWidth","getBorder",arguments,null,"width");
};
dojo.html.getBorderHeight=function(node){
return dojo.html._callDeprecated("getBorderHeight","getBorder",arguments,null,"height");
};
dojo.html.getPaddingWidth=function(node){
return dojo.html._callDeprecated("getPaddingWidth","getPadding",arguments,null,"width");
};
dojo.html.getPaddingHeight=function(node){
return dojo.html._callDeprecated("getPaddingHeight","getPadding",arguments,null,"height");
};
dojo.html.getPadBorderWidth=function(node){
return dojo.html._callDeprecated("getPadBorderWidth","getPadBorder",arguments,null,"width");
};
dojo.html.getPadBorderHeight=function(node){
return dojo.html._callDeprecated("getPadBorderHeight","getPadBorder",arguments,null,"height");
};
dojo.html.getBorderBoxWidth=dojo.html.getInnerWidth=function(){
return dojo.html._callDeprecated("getBorderBoxWidth","getBorderBox",arguments,null,"width");
};
dojo.html.getBorderBoxHeight=dojo.html.getInnerHeight=function(){
return dojo.html._callDeprecated("getBorderBoxHeight","getBorderBox",arguments,null,"height");
};
dojo.html.getContentBoxWidth=dojo.html.getContentWidth=function(){
return dojo.html._callDeprecated("getContentBoxWidth","getContentBox",arguments,null,"width");
};
dojo.html.getContentBoxHeight=dojo.html.getContentHeight=function(){
return dojo.html._callDeprecated("getContentBoxHeight","getContentBox",arguments,null,"height");
};
dojo.html.setContentBoxWidth=dojo.html.setContentWidth=function(node,_56b){
return dojo.html._callDeprecated("setContentBoxWidth","setContentBox",arguments,"width");
};
dojo.html.setContentBoxHeight=dojo.html.setContentHeight=function(node,_56d){
return dojo.html._callDeprecated("setContentBoxHeight","setContentBox",arguments,"height");
};
dojo.provide("dojo.html.util");
dojo.html.getElementWindow=function(_56e){
return dojo.html.getDocumentWindow(_56e.ownerDocument);
};
dojo.html.getDocumentWindow=function(doc){
if(dojo.render.html.safari&&!doc._parentWindow){
var fix=function(win){
win.document._parentWindow=win;
for(var i=0;i<win.frames.length;i++){
fix(win.frames[i]);
}
};
fix(window.top);
}
if(dojo.render.html.ie&&window!==document.parentWindow&&!doc._parentWindow){
doc.parentWindow.execScript("document._parentWindow = window;","Javascript");
var win=doc._parentWindow;
doc._parentWindow=null;
return win;
}
return doc._parentWindow||doc.parentWindow||doc.defaultView;
};
dojo.html.gravity=function(node,e){
node=dojo.byId(node);
var _576=dojo.html.getCursorPosition(e);
with(dojo.html){
var _577=getAbsolutePosition(node,true);
var bb=getBorderBox(node);
var _579=_577.x+(bb.width/2);
var _57a=_577.y+(bb.height/2);
}
with(dojo.html.gravity){
return ((_576.x<_579?WEST:EAST)|(_576.y<_57a?NORTH:SOUTH));
}
};
dojo.html.gravity.NORTH=1;
dojo.html.gravity.SOUTH=1<<1;
dojo.html.gravity.EAST=1<<2;
dojo.html.gravity.WEST=1<<3;
dojo.html.overElement=function(_57b,e){
_57b=dojo.byId(_57b);
var _57d=dojo.html.getCursorPosition(e);
var bb=dojo.html.getBorderBox(_57b);
var _57f=dojo.html.getAbsolutePosition(_57b,true,dojo.html.boxSizing.BORDER_BOX);
var top=_57f.y;
var _581=top+bb.height;
var left=_57f.x;
var _583=left+bb.width;
return (_57d.x>=left&&_57d.x<=_583&&_57d.y>=top&&_57d.y<=_581);
};
dojo.html.renderedTextContent=function(node){
node=dojo.byId(node);
var _585="";
if(node==null){
return _585;
}
for(var i=0;i<node.childNodes.length;i++){
switch(node.childNodes[i].nodeType){
case 1:
case 5:
var _587="unknown";
try{
_587=dojo.html.getStyle(node.childNodes[i],"display");
}
catch(E){
}
switch(_587){
case "block":
case "list-item":
case "run-in":
case "table":
case "table-row-group":
case "table-header-group":
case "table-footer-group":
case "table-row":
case "table-column-group":
case "table-column":
case "table-cell":
case "table-caption":
_585+="\n";
_585+=dojo.html.renderedTextContent(node.childNodes[i]);
_585+="\n";
break;
case "none":
break;
default:
if(node.childNodes[i].tagName&&node.childNodes[i].tagName.toLowerCase()=="br"){
_585+="\n";
}else{
_585+=dojo.html.renderedTextContent(node.childNodes[i]);
}
break;
}
break;
case 3:
case 2:
case 4:
var text=node.childNodes[i].nodeValue;
var _589="unknown";
try{
_589=dojo.html.getStyle(node,"text-transform");
}
catch(E){
}
switch(_589){
case "capitalize":
var _58a=text.split(" ");
for(var i=0;i<_58a.length;i++){
_58a[i]=_58a[i].charAt(0).toUpperCase()+_58a[i].substring(1);
}
text=_58a.join(" ");
break;
case "uppercase":
text=text.toUpperCase();
break;
case "lowercase":
text=text.toLowerCase();
break;
default:
break;
}
switch(_589){
case "nowrap":
break;
case "pre-wrap":
break;
case "pre-line":
break;
case "pre":
break;
default:
text=text.replace(/\s+/," ");
if(/\s$/.test(_585)){
text.replace(/^\s/,"");
}
break;
}
_585+=text;
break;
default:
break;
}
}
return _585;
};
dojo.html.createNodesFromText=function(txt,trim){
if(trim){
txt=txt.replace(/^\s+|\s+$/g,"");
}
var tn=dojo.doc().createElement("div");
tn.style.visibility="hidden";
dojo.body().appendChild(tn);
var _58e="none";
if((/^<t[dh][\s\r\n>]/i).test(txt.replace(/^\s+/))){
txt="<table><tbody><tr>"+txt+"</tr></tbody></table>";
_58e="cell";
}else{
if((/^<tr[\s\r\n>]/i).test(txt.replace(/^\s+/))){
txt="<table><tbody>"+txt+"</tbody></table>";
_58e="row";
}else{
if((/^<(thead|tbody|tfoot)[\s\r\n>]/i).test(txt.replace(/^\s+/))){
txt="<table>"+txt+"</table>";
_58e="section";
}
}
}
tn.innerHTML=txt;
if(tn["normalize"]){
tn.normalize();
}
var _58f=null;
switch(_58e){
case "cell":
_58f=tn.getElementsByTagName("tr")[0];
break;
case "row":
_58f=tn.getElementsByTagName("tbody")[0];
break;
case "section":
_58f=tn.getElementsByTagName("table")[0];
break;
default:
_58f=tn;
break;
}
var _590=[];
for(var x=0;x<_58f.childNodes.length;x++){
_590.push(_58f.childNodes[x].cloneNode(true));
}
tn.style.display="none";
dojo.html.destroyNode(tn);
return _590;
};
dojo.html.placeOnScreen=function(node,_593,_594,_595,_596,_597,_598){
if(_593 instanceof Array||typeof _593=="array"){
_598=_597;
_597=_596;
_596=_595;
_595=_594;
_594=_593[1];
_593=_593[0];
}
if(_597 instanceof String||typeof _597=="string"){
_597=_597.split(",");
}
if(!isNaN(_595)){
_595=[Number(_595),Number(_595)];
}else{
if(!(_595 instanceof Array||typeof _595=="array")){
_595=[0,0];
}
}
var _599=dojo.html.getScroll().offset;
var view=dojo.html.getViewport();
node=dojo.byId(node);
var _59b=node.style.display;
node.style.display="";
var bb=dojo.html.getBorderBox(node);
var w=bb.width;
var h=bb.height;
node.style.display=_59b;
if(!(_597 instanceof Array||typeof _597=="array")){
_597=["TL"];
}
var _59f,_5a0,_5a1=Infinity,_5a2;
for(var _5a3=0;_5a3<_597.length;++_5a3){
var _5a4=_597[_5a3];
var _5a5=true;
var tryX=_593-(_5a4.charAt(1)=="L"?0:w)+_595[0]*(_5a4.charAt(1)=="L"?1:-1);
var tryY=_594-(_5a4.charAt(0)=="T"?0:h)+_595[1]*(_5a4.charAt(0)=="T"?1:-1);
if(_596){
tryX-=_599.x;
tryY-=_599.y;
}
if(tryX<0){
tryX=0;
_5a5=false;
}
if(tryY<0){
tryY=0;
_5a5=false;
}
var x=tryX+w;
if(x>view.width){
x=view.width-w;
_5a5=false;
}else{
x=tryX;
}
x=Math.max(_595[0],x)+_599.x;
var y=tryY+h;
if(y>view.height){
y=view.height-h;
_5a5=false;
}else{
y=tryY;
}
y=Math.max(_595[1],y)+_599.y;
if(_5a5){
_59f=x;
_5a0=y;
_5a1=0;
_5a2=_5a4;
break;
}else{
var dist=Math.pow(x-tryX-_599.x,2)+Math.pow(y-tryY-_599.y,2);
if(_5a1>dist){
_5a1=dist;
_59f=x;
_5a0=y;
_5a2=_5a4;
}
}
}
if(!_598){
node.style.left=_59f+"px";
node.style.top=_5a0+"px";
}
return {left:_59f,top:_5a0,x:_59f,y:_5a0,dist:_5a1,corner:_5a2};
};
dojo.html.placeOnScreenPoint=function(node,_5ac,_5ad,_5ae,_5af){
dojo.deprecated("dojo.html.placeOnScreenPoint","use dojo.html.placeOnScreen() instead","0.5");
return dojo.html.placeOnScreen(node,_5ac,_5ad,_5ae,_5af,["TL","TR","BL","BR"]);
};
dojo.html.placeOnScreenAroundElement=function(node,_5b1,_5b2,_5b3,_5b4,_5b5){
var best,_5b7=Infinity;
_5b1=dojo.byId(_5b1);
var _5b8=_5b1.style.display;
_5b1.style.display="";
var mb=dojo.html.getElementBox(_5b1,_5b3);
var _5ba=mb.width;
var _5bb=mb.height;
var _5bc=dojo.html.getAbsolutePosition(_5b1,true,_5b3);
_5b1.style.display=_5b8;
for(var _5bd in _5b4){
var pos,_5bf,_5c0;
var _5c1=_5b4[_5bd];
_5bf=_5bc.x+(_5bd.charAt(1)=="L"?0:_5ba);
_5c0=_5bc.y+(_5bd.charAt(0)=="T"?0:_5bb);
pos=dojo.html.placeOnScreen(node,_5bf,_5c0,_5b2,true,_5c1,true);
if(pos.dist==0){
best=pos;
break;
}else{
if(_5b7>pos.dist){
_5b7=pos.dist;
best=pos;
}
}
}
if(!_5b5){
node.style.left=best.left+"px";
node.style.top=best.top+"px";
}
return best;
};
dojo.html.scrollIntoView=function(node){
if(!node){
return;
}
if(dojo.render.html.ie){
if(dojo.html.getBorderBox(node.parentNode).height<=node.parentNode.scrollHeight){
node.scrollIntoView(false);
}
}else{
if(dojo.render.html.mozilla){
node.scrollIntoView(false);
}else{
var _5c3=node.parentNode;
var _5c4=_5c3.scrollTop+dojo.html.getBorderBox(_5c3).height;
var _5c5=node.offsetTop+dojo.html.getMarginBox(node).height;
if(_5c4<_5c5){
_5c3.scrollTop+=(_5c5-_5c4);
}else{
if(_5c3.scrollTop>node.offsetTop){
_5c3.scrollTop-=(_5c3.scrollTop-node.offsetTop);
}
}
}
}
};
dojo.provide("dojo.xml.Parse");
dojo.xml.Parse=function(){
var isIE=((dojo.render.html.capable)&&(dojo.render.html.ie));
function getTagName(node){
try{
return node.tagName.toLowerCase();
}
catch(e){
return "";
}
}
function getDojoTagName(node){
var _5c9=getTagName(node);
if(!_5c9){
return "";
}
if((dojo.widget)&&(dojo.widget.tags[_5c9])){
return _5c9;
}
var p=_5c9.indexOf(":");
if(p>=0){
return _5c9;
}
if(_5c9.substr(0,5)=="dojo:"){
return _5c9;
}
if(dojo.render.html.capable&&dojo.render.html.ie&&node.scopeName!="HTML"){
return node.scopeName.toLowerCase()+":"+_5c9;
}
if(_5c9.substr(0,4)=="dojo"){
return "dojo:"+_5c9.substring(4);
}
var djt=node.getAttribute("dojoType")||node.getAttribute("dojotype");
if(djt){
if(djt.indexOf(":")<0){
djt="dojo:"+djt;
}
return djt.toLowerCase();
}
djt=node.getAttributeNS&&node.getAttributeNS(dojo.dom.dojoml,"type");
if(djt){
return "dojo:"+djt.toLowerCase();
}
try{
djt=node.getAttribute("dojo:type");
}
catch(e){
}
if(djt){
return "dojo:"+djt.toLowerCase();
}
if((dj_global["djConfig"])&&(!djConfig["ignoreClassNames"])){
var _5cc=node.className||node.getAttribute("class");
if((_5cc)&&(_5cc.indexOf)&&(_5cc.indexOf("dojo-")!=-1)){
var _5cd=_5cc.split(" ");
for(var x=0,c=_5cd.length;x<c;x++){
if(_5cd[x].slice(0,5)=="dojo-"){
return "dojo:"+_5cd[x].substr(5).toLowerCase();
}
}
}
}
return "";
}
this.parseElement=function(node,_5d1,_5d2,_5d3){
var _5d4=getTagName(node);
if(isIE&&_5d4.indexOf("/")==0){
return null;
}
try{
var attr=node.getAttribute("parseWidgets");
if(attr&&attr.toLowerCase()=="false"){
return {};
}
}
catch(e){
}
var _5d6=true;
if(_5d2){
var _5d7=getDojoTagName(node);
_5d4=_5d7||_5d4;
_5d6=Boolean(_5d7);
}
var _5d8={};
_5d8[_5d4]=[];
var pos=_5d4.indexOf(":");
if(pos>0){
var ns=_5d4.substring(0,pos);
_5d8["ns"]=ns;
if((dojo.ns)&&(!dojo.ns.allow(ns))){
_5d6=false;
}
}
if(_5d6){
var _5db=this.parseAttributes(node);
for(var attr in _5db){
if((!_5d8[_5d4][attr])||(typeof _5d8[_5d4][attr]!="array")){
_5d8[_5d4][attr]=[];
}
_5d8[_5d4][attr].push(_5db[attr]);
}
_5d8[_5d4].nodeRef=node;
_5d8.tagName=_5d4;
_5d8.index=_5d3||0;
}
var _5dc=0;
for(var i=0;i<node.childNodes.length;i++){
var tcn=node.childNodes.item(i);
switch(tcn.nodeType){
case dojo.dom.ELEMENT_NODE:
var ctn=getDojoTagName(tcn)||getTagName(tcn);
if(!_5d8[ctn]){
_5d8[ctn]=[];
}
_5d8[ctn].push(this.parseElement(tcn,true,_5d2,_5dc));
if((tcn.childNodes.length==1)&&(tcn.childNodes.item(0).nodeType==dojo.dom.TEXT_NODE)){
_5d8[ctn][_5d8[ctn].length-1].value=tcn.childNodes.item(0).nodeValue;
}
_5dc++;
break;
case dojo.dom.TEXT_NODE:
if(node.childNodes.length==1){
_5d8[_5d4].push({value:node.childNodes.item(0).nodeValue});
}
break;
default:
break;
}
}
return _5d8;
};
this.parseAttributes=function(node){
var _5e1={};
var atts=node.attributes;
var _5e3,i=0;
while((_5e3=atts[i++])){
if(isIE){
if(!_5e3){
continue;
}
if((typeof _5e3=="object")&&(typeof _5e3.nodeValue=="undefined")||(_5e3.nodeValue==null)||(_5e3.nodeValue=="")){
continue;
}
}
var nn=_5e3.nodeName.split(":");
nn=(nn.length==2)?nn[1]:_5e3.nodeName;
_5e1[nn]={value:_5e3.nodeValue};
}
return _5e1;
};
};
dojo.provide("dojo.ns");
dojo.ns={namespaces:{},failed:{},loading:{},loaded:{},register:function(name,_5e7,_5e8,_5e9){
if(!_5e9||!this.namespaces[name]){
this.namespaces[name]=new dojo.ns.Ns(name,_5e7,_5e8);
}
},allow:function(name){
if(this.failed[name]){
return false;
}
if((djConfig.excludeNamespace)&&(dojo.lang.inArray(djConfig.excludeNamespace,name))){
return false;
}
return ((name==this.dojo)||(!djConfig.includeNamespace)||(dojo.lang.inArray(djConfig.includeNamespace,name)));
},get:function(name){
return this.namespaces[name];
},require:function(name){
var ns=this.namespaces[name];
if((ns)&&(this.loaded[name])){
return ns;
}
if(!this.allow(name)){
return false;
}
if(this.loading[name]){
dojo.debug("dojo.namespace.require: re-entrant request to load namespace \""+name+"\" must fail.");
return false;
}
var req=dojo.require;
this.loading[name]=true;
try{
if(name=="dojo"){
req("dojo.namespaces.dojo");
}else{
if(!dojo.hostenv.moduleHasPrefix(name)){
dojo.registerModulePath(name,"../"+name);
}
req([name,"manifest"].join("."),false,true);
}
if(!this.namespaces[name]){
this.failed[name]=true;
}
}
finally{
this.loading[name]=false;
}
return this.namespaces[name];
}};
dojo.ns.Ns=function(name,_5f0,_5f1){
this.name=name;
this.module=_5f0;
this.resolver=_5f1;
this._loaded=[];
this._failed=[];
};
dojo.ns.Ns.prototype.resolve=function(name,_5f3,_5f4){
if(!this.resolver||djConfig["skipAutoRequire"]){
return false;
}
var _5f5=this.resolver(name,_5f3);
if((_5f5)&&(!this._loaded[_5f5])&&(!this._failed[_5f5])){
var req=dojo.require;
req(_5f5,false,true);
if(dojo.hostenv.findModule(_5f5,false)){
this._loaded[_5f5]=true;
}else{
if(!_5f4){
dojo.raise("dojo.ns.Ns.resolve: module '"+_5f5+"' not found after loading via namespace '"+this.name+"'");
}
this._failed[_5f5]=true;
}
}
return Boolean(this._loaded[_5f5]);
};
dojo.registerNamespace=function(name,_5f8,_5f9){
dojo.ns.register.apply(dojo.ns,arguments);
};
dojo.registerNamespaceResolver=function(name,_5fb){
var n=dojo.ns.namespaces[name];
if(n){
n.resolver=_5fb;
}
};
dojo.registerNamespaceManifest=function(_5fd,path,name,_600,_601){
dojo.registerModulePath(name,path);
dojo.registerNamespace(name,_600,_601);
};
dojo.registerNamespace("dojo","dojo.widget");
dojo.provide("dojo.widget.Manager");
dojo.widget.manager=new function(){
this.widgets=[];
this.widgetIds=[];
this.topWidgets={};
var _602={};
var _603=[];
this.getUniqueId=function(_604){
var _605;
do{
_605=_604+"_"+(_602[_604]!=undefined?++_602[_604]:_602[_604]=0);
}while(this.getWidgetById(_605));
return _605;
};
this.add=function(_606){
this.widgets.push(_606);
if(!_606.extraArgs["id"]){
_606.extraArgs["id"]=_606.extraArgs["ID"];
}
if(_606.widgetId==""){
if(_606["id"]){
_606.widgetId=_606["id"];
}else{
if(_606.extraArgs["id"]){
_606.widgetId=_606.extraArgs["id"];
}else{
_606.widgetId=this.getUniqueId(_606.ns+"_"+_606.widgetType);
}
}
}
if(this.widgetIds[_606.widgetId]){
dojo.debug("widget ID collision on ID: "+_606.widgetId);
}
this.widgetIds[_606.widgetId]=_606;
};
this.destroyAll=function(){
for(var x=this.widgets.length-1;x>=0;x--){
try{
this.widgets[x].destroy(true);
delete this.widgets[x];
}
catch(e){
}
}
};
this.remove=function(_608){
if(dojo.lang.isNumber(_608)){
var tw=this.widgets[_608].widgetId;
delete this.widgetIds[tw];
this.widgets.splice(_608,1);
}else{
this.removeById(_608);
}
};
this.removeById=function(id){
if(!dojo.lang.isString(id)){
id=id["widgetId"];
if(!id){
dojo.debug("invalid widget or id passed to removeById");
return;
}
}
for(var i=0;i<this.widgets.length;i++){
if(this.widgets[i].widgetId==id){
this.remove(i);
break;
}
}
};
this.getWidgetById=function(id){
if(dojo.lang.isString(id)){
return this.widgetIds[id];
}
return id;
};
this.getWidgetsByType=function(type){
var lt=type.toLowerCase();
var _60f=(type.indexOf(":")<0?function(x){
return x.widgetType.toLowerCase();
}:function(x){
return x.getNamespacedType();
});
var ret=[];
dojo.lang.forEach(this.widgets,function(x){
if(_60f(x)==lt){
ret.push(x);
}
});
return ret;
};
this.getWidgetsByFilter=function(_614,_615){
var ret=[];
dojo.lang.every(this.widgets,function(x){
if(_614(x)){
ret.push(x);
if(_615){
return false;
}
}
return true;
});
return (_615?ret[0]:ret);
};
this.getAllWidgets=function(){
return this.widgets.concat();
};
this.getWidgetByNode=function(node){
var w=this.getAllWidgets();
node=dojo.byId(node);
for(var i=0;i<w.length;i++){
if(w[i].domNode==node){
return w[i];
}
}
return null;
};
this.byId=this.getWidgetById;
this.byType=this.getWidgetsByType;
this.byFilter=this.getWidgetsByFilter;
this.byNode=this.getWidgetByNode;
var _61b={};
var _61c=["dojo.widget"];
for(var i=0;i<_61c.length;i++){
_61c[_61c[i]]=true;
}
this.registerWidgetPackage=function(_61e){
if(!_61c[_61e]){
_61c[_61e]=true;
_61c.push(_61e);
}
};
this.getWidgetPackageList=function(){
return dojo.lang.map(_61c,function(elt){
return (elt!==true?elt:undefined);
});
};
this.getImplementation=function(_620,_621,_622,ns){
var impl=this.getImplementationName(_620,ns);
if(impl){
var ret=_621?new impl(_621):new impl();
return ret;
}
};
function buildPrefixCache(){
for(var _626 in dojo.render){
if(dojo.render[_626]["capable"]===true){
var _627=dojo.render[_626].prefixes;
for(var i=0;i<_627.length;i++){
_603.push(_627[i].toLowerCase());
}
}
}
}
var _629=function(_62a,_62b){
if(!_62b){
return null;
}
for(var i=0,l=_603.length,_62e;i<=l;i++){
_62e=(i<l?_62b[_603[i]]:_62b);
if(!_62e){
continue;
}
for(var name in _62e){
if(name.toLowerCase()==_62a){
return _62e[name];
}
}
}
return null;
};
var _630=function(_631,_632){
var _633=dojo.evalObjPath(_632,false);
return (_633?_629(_631,_633):null);
};
this.getImplementationName=function(_634,ns){
var _636=_634.toLowerCase();
ns=ns||"dojo";
var imps=_61b[ns]||(_61b[ns]={});
var impl=imps[_636];
if(impl){
return impl;
}
if(!_603.length){
buildPrefixCache();
}
var _639=dojo.ns.get(ns);
if(!_639){
dojo.ns.register(ns,ns+".widget");
_639=dojo.ns.get(ns);
}
if(_639){
_639.resolve(_634);
}
impl=_630(_636,_639.module);
if(impl){
return (imps[_636]=impl);
}
_639=dojo.ns.require(ns);
if((_639)&&(_639.resolver)){
_639.resolve(_634);
impl=_630(_636,_639.module);
if(impl){
return (imps[_636]=impl);
}
}
dojo.deprecated("dojo.widget.Manager.getImplementationName","Could not locate widget implementation for \""+_634+"\" in \""+_639.module+"\" registered to namespace \""+_639.name+"\". "+"Developers must specify correct namespaces for all non-Dojo widgets","0.5");
for(var i=0;i<_61c.length;i++){
impl=_630(_636,_61c[i]);
if(impl){
return (imps[_636]=impl);
}
}
throw new Error("Could not locate widget implementation for \""+_634+"\" in \""+_639.module+"\" registered to namespace \""+_639.name+"\"");
};
this.resizing=false;
this.onWindowResized=function(){
if(this.resizing){
return;
}
try{
this.resizing=true;
for(var id in this.topWidgets){
var _63c=this.topWidgets[id];
if(_63c.checkSize){
_63c.checkSize();
}
}
}
catch(e){
}
finally{
this.resizing=false;
}
};
if(typeof window!="undefined"){
dojo.addOnLoad(this,"onWindowResized");
dojo.event.connect(window,"onresize",this,"onWindowResized");
}
};
(function(){
var dw=dojo.widget;
var dwm=dw.manager;
var h=dojo.lang.curry(dojo.lang,"hitch",dwm);
var g=function(_641,_642){
dw[(_642||_641)]=h(_641);
};
g("add","addWidget");
g("destroyAll","destroyAllWidgets");
g("remove","removeWidget");
g("removeById","removeWidgetById");
g("getWidgetById");
g("getWidgetById","byId");
g("getWidgetsByType");
g("getWidgetsByFilter");
g("getWidgetsByType","byType");
g("getWidgetsByFilter","byFilter");
g("getWidgetByNode","byNode");
dw.all=function(n){
var _644=dwm.getAllWidgets.apply(dwm,arguments);
if(arguments.length>0){
return _644[n];
}
return _644;
};
g("registerWidgetPackage");
g("getImplementation","getWidgetImplementation");
g("getImplementationName","getWidgetImplementationName");
dw.widgets=dwm.widgets;
dw.widgetIds=dwm.widgetIds;
dw.root=dwm.root;
})();
dojo.provide("dojo.uri.*");
dojo.provide("dojo.a11y");
dojo.a11y={imgPath:dojo.uri.dojoUri("src/widget/templates/images"),doAccessibleCheck:true,accessible:null,checkAccessible:function(){
if(this.accessible===null){
this.accessible=false;
if(this.doAccessibleCheck==true){
this.accessible=this.testAccessible();
}
}
return this.accessible;
},testAccessible:function(){
this.accessible=false;
if(dojo.render.html.ie||dojo.render.html.mozilla){
var div=document.createElement("div");
div.style.backgroundImage="url(\""+this.imgPath+"/tab_close.gif\")";
dojo.body().appendChild(div);
var _646=null;
if(window.getComputedStyle){
var _647=getComputedStyle(div,"");
_646=_647.getPropertyValue("background-image");
}else{
_646=div.currentStyle.backgroundImage;
}
var _648=false;
if(_646!=null&&(_646=="none"||_646=="url(invalid-url:)")){
this.accessible=true;
}
dojo.body().removeChild(div);
}
return this.accessible;
},setCheckAccessible:function(_649){
this.doAccessibleCheck=_649;
},setAccessibleMode:function(){
if(this.accessible===null){
if(this.checkAccessible()){
dojo.render.html.prefixes.unshift("a11y");
}
}
return this.accessible;
}};
dojo.provide("dojo.widget.Widget");
dojo.declare("dojo.widget.Widget",null,function(){
this.children=[];
this.extraArgs={};
},{parent:null,isTopLevel:false,disabled:false,isContainer:false,widgetId:"",widgetType:"Widget",ns:"dojo",getNamespacedType:function(){
return (this.ns?this.ns+":"+this.widgetType:this.widgetType).toLowerCase();
},toString:function(){
return "[Widget "+this.getNamespacedType()+", "+(this.widgetId||"NO ID")+"]";
},repr:function(){
return this.toString();
},enable:function(){
this.disabled=false;
},disable:function(){
this.disabled=true;
},onResized:function(){
this.notifyChildrenOfResize();
},notifyChildrenOfResize:function(){
for(var i=0;i<this.children.length;i++){
var _64b=this.children[i];
if(_64b.onResized){
_64b.onResized();
}
}
},create:function(args,_64d,_64e,ns){
if(ns){
this.ns=ns;
}
this.satisfyPropertySets(args,_64d,_64e);
this.mixInProperties(args,_64d,_64e);
this.postMixInProperties(args,_64d,_64e);
dojo.widget.manager.add(this);
this.buildRendering(args,_64d,_64e);
this.initialize(args,_64d,_64e);
this.postInitialize(args,_64d,_64e);
this.postCreate(args,_64d,_64e);
return this;
},destroy:function(_650){
if(this.parent){
this.parent.removeChild(this);
}
this.destroyChildren();
this.uninitialize();
this.destroyRendering(_650);
dojo.widget.manager.removeById(this.widgetId);
},destroyChildren:function(){
var _651;
var i=0;
while(this.children.length>i){
_651=this.children[i];
if(_651 instanceof dojo.widget.Widget){
this.removeChild(_651);
_651.destroy();
continue;
}
i++;
}
},getChildrenOfType:function(type,_654){
var ret=[];
var _656=dojo.lang.isFunction(type);
if(!_656){
type=type.toLowerCase();
}
for(var x=0;x<this.children.length;x++){
if(_656){
if(this.children[x] instanceof type){
ret.push(this.children[x]);
}
}else{
if(this.children[x].widgetType.toLowerCase()==type){
ret.push(this.children[x]);
}
}
if(_654){
ret=ret.concat(this.children[x].getChildrenOfType(type,_654));
}
}
return ret;
},getDescendants:function(){
var _658=[];
var _659=[this];
var elem;
while((elem=_659.pop())){
_658.push(elem);
if(elem.children){
dojo.lang.forEach(elem.children,function(elem){
_659.push(elem);
});
}
}
return _658;
},isFirstChild:function(){
return this===this.parent.children[0];
},isLastChild:function(){
return this===this.parent.children[this.parent.children.length-1];
},satisfyPropertySets:function(args){
return args;
},mixInProperties:function(args,frag){
if((args["fastMixIn"])||(frag["fastMixIn"])){
for(var x in args){
this[x]=args[x];
}
return;
}
var _660;
var _661=dojo.widget.lcArgsCache[this.widgetType];
if(_661==null){
_661={};
for(var y in this){
_661[((new String(y)).toLowerCase())]=y;
}
dojo.widget.lcArgsCache[this.widgetType]=_661;
}
var _663={};
for(var x in args){
if(!this[x]){
var y=_661[(new String(x)).toLowerCase()];
if(y){
args[y]=args[x];
x=y;
}
}
if(_663[x]){
continue;
}
_663[x]=true;
if((typeof this[x])!=(typeof _660)){
if(typeof args[x]!="string"){
this[x]=args[x];
}else{
if(dojo.lang.isString(this[x])){
this[x]=args[x];
}else{
if(dojo.lang.isNumber(this[x])){
this[x]=new Number(args[x]);
}else{
if(dojo.lang.isBoolean(this[x])){
this[x]=(args[x].toLowerCase()=="false")?false:true;
}else{
if(dojo.lang.isFunction(this[x])){
if(args[x].search(/[^\w\.]+/i)==-1){
this[x]=dojo.evalObjPath(args[x],false);
}else{
var tn=dojo.lang.nameAnonFunc(new Function(args[x]),this);
dojo.event.kwConnect({srcObj:this,srcFunc:x,adviceObj:this,adviceFunc:tn});
}
}else{
if(dojo.lang.isArray(this[x])){
this[x]=args[x].split(";");
}else{
if(this[x] instanceof Date){
this[x]=new Date(Number(args[x]));
}else{
if(typeof this[x]=="object"){
if(this[x] instanceof dojo.uri.Uri){
this[x]=dojo.uri.dojoUri(args[x]);
}else{
var _665=args[x].split(";");
for(var y=0;y<_665.length;y++){
var si=_665[y].indexOf(":");
if((si!=-1)&&(_665[y].length>si)){
this[x][_665[y].substr(0,si).replace(/^\s+|\s+$/g,"")]=_665[y].substr(si+1);
}
}
}
}else{
this[x]=args[x];
}
}
}
}
}
}
}
}
}else{
this.extraArgs[x.toLowerCase()]=args[x];
}
}
},postMixInProperties:function(args,frag,_669){
},initialize:function(args,frag,_66c){
return false;
},postInitialize:function(args,frag,_66f){
return false;
},postCreate:function(args,frag,_672){
return false;
},uninitialize:function(){
return false;
},buildRendering:function(args,frag,_675){
dojo.unimplemented("dojo.widget.Widget.buildRendering, on "+this.toString()+", ");
return false;
},destroyRendering:function(){
dojo.unimplemented("dojo.widget.Widget.destroyRendering");
return false;
},addedTo:function(_676){
},addChild:function(_677){
dojo.unimplemented("dojo.widget.Widget.addChild");
return false;
},removeChild:function(_678){
for(var x=0;x<this.children.length;x++){
if(this.children[x]===_678){
this.children.splice(x,1);
_678.parent=null;
break;
}
}
return _678;
},getPreviousSibling:function(){
var idx=this.getParentIndex();
if(idx<=0){
return null;
}
return this.parent.children[idx-1];
},getSiblings:function(){
return this.parent.children;
},getParentIndex:function(){
return dojo.lang.indexOf(this.parent.children,this,true);
},getNextSibling:function(){
var idx=this.getParentIndex();
if(idx==this.parent.children.length-1){
return null;
}
if(idx<0){
return null;
}
return this.parent.children[idx+1];
}});
dojo.widget.lcArgsCache={};
dojo.widget.tags={};
dojo.widget.tags.addParseTreeHandler=function(type){
dojo.deprecated("addParseTreeHandler",". ParseTreeHandlers are now reserved for components. Any unfiltered DojoML tag without a ParseTreeHandler is assumed to be a widget","0.5");
};
dojo.widget.tags["dojo:propertyset"]=function(_67d,_67e,_67f){
var _680=_67e.parseProperties(_67d["dojo:propertyset"]);
};
dojo.widget.tags["dojo:connect"]=function(_681,_682,_683){
var _684=_682.parseProperties(_681["dojo:connect"]);
};
dojo.widget.buildWidgetFromParseTree=function(type,frag,_687,_688,_689,_68a){
dojo.a11y.setAccessibleMode();
var _68b=type.split(":");
_68b=(_68b.length==2)?_68b[1]:type;
var _68c=_68a||_687.parseProperties(frag[frag["ns"]+":"+_68b]);
var _68d=dojo.widget.manager.getImplementation(_68b,null,null,frag["ns"]);
if(!_68d){
throw new Error("cannot find \""+type+"\" widget");
}else{
if(!_68d.create){
throw new Error("\""+type+"\" widget object has no \"create\" method and does not appear to implement *Widget");
}
}
_68c["dojoinsertionindex"]=_689;
var ret=_68d.create(_68c,frag,_688,frag["ns"]);
return ret;
};
dojo.widget.defineWidget=function(_68f,_690,_691,init,_693){
if(dojo.lang.isString(arguments[3])){
dojo.widget._defineWidget(arguments[0],arguments[3],arguments[1],arguments[4],arguments[2]);
}else{
var args=[arguments[0]],p=3;
if(dojo.lang.isString(arguments[1])){
args.push(arguments[1],arguments[2]);
}else{
args.push("",arguments[1]);
p=2;
}
if(dojo.lang.isFunction(arguments[p])){
args.push(arguments[p],arguments[p+1]);
}else{
args.push(null,arguments[p]);
}
dojo.widget._defineWidget.apply(this,args);
}
};
dojo.widget.defineWidget.renderers="html|svg|vml";
dojo.widget._defineWidget=function(_696,_697,_698,init,_69a){
var _69b=_696.split(".");
var type=_69b.pop();
var regx="\\.("+(_697?_697+"|":"")+dojo.widget.defineWidget.renderers+")\\.";
var r=_696.search(new RegExp(regx));
_69b=(r<0?_69b.join("."):_696.substr(0,r));
dojo.widget.manager.registerWidgetPackage(_69b);
var pos=_69b.indexOf(".");
var _6a0=(pos>-1)?_69b.substring(0,pos):_69b;
_69a=(_69a)||{};
_69a.widgetType=type;
if((!init)&&(_69a["classConstructor"])){
init=_69a.classConstructor;
delete _69a.classConstructor;
}
dojo.declare(_696,_698,init,_69a);
};
dojo.provide("dojo.widget.Parse");
dojo.widget.Parse=function(_6a1){
this.propertySetsList=[];
this.fragment=_6a1;
this.createComponents=function(frag,_6a3){
var _6a4=[];
var _6a5=false;
try{
if(frag&&frag.tagName&&(frag!=frag.nodeRef)){
var _6a6=dojo.widget.tags;
var tna=String(frag.tagName).split(";");
for(var x=0;x<tna.length;x++){
var ltn=tna[x].replace(/^\s+|\s+$/g,"").toLowerCase();
frag.tagName=ltn;
var ret;
if(_6a6[ltn]){
_6a5=true;
ret=_6a6[ltn](frag,this,_6a3,frag.index);
_6a4.push(ret);
}else{
if(ltn.indexOf(":")==-1){
ltn="dojo:"+ltn;
}
ret=dojo.widget.buildWidgetFromParseTree(ltn,frag,this,_6a3,frag.index);
if(ret){
_6a5=true;
_6a4.push(ret);
}
}
}
}
}
catch(e){
dojo.debug("dojo.widget.Parse: error:",e);
}
if(!_6a5){
_6a4=_6a4.concat(this.createSubComponents(frag,_6a3));
}
return _6a4;
};
this.createSubComponents=function(_6ab,_6ac){
var frag,_6ae=[];
for(var item in _6ab){
frag=_6ab[item];
if(frag&&typeof frag=="object"&&(frag!=_6ab.nodeRef)&&(frag!=_6ab.tagName)&&(!dojo.dom.isNode(frag))){
_6ae=_6ae.concat(this.createComponents(frag,_6ac));
}
}
return _6ae;
};
this.parsePropertySets=function(_6b0){
return [];
};
this.parseProperties=function(_6b1){
var _6b2={};
for(var item in _6b1){
if((_6b1[item]==_6b1.tagName)||(_6b1[item]==_6b1.nodeRef)){
}else{
var frag=_6b1[item];
if(frag.tagName&&dojo.widget.tags[frag.tagName.toLowerCase()]){
}else{
if(frag[0]&&frag[0].value!=""&&frag[0].value!=null){
try{
if(item.toLowerCase()=="dataprovider"){
var _6b5=this;
this.getDataProvider(_6b5,frag[0].value);
_6b2.dataProvider=this.dataProvider;
}
_6b2[item]=frag[0].value;
var _6b6=this.parseProperties(frag);
for(var _6b7 in _6b6){
_6b2[_6b7]=_6b6[_6b7];
}
}
catch(e){
dojo.debug(e);
}
}
}
switch(item.toLowerCase()){
case "checked":
case "disabled":
if(typeof _6b2[item]!="boolean"){
_6b2[item]=true;
}
break;
}
}
}
return _6b2;
};
this.getDataProvider=function(_6b8,_6b9){
dojo.io.bind({url:_6b9,load:function(type,_6bb){
if(type=="load"){
_6b8.dataProvider=_6bb;
}
},mimetype:"text/javascript",sync:true});
};
this.getPropertySetById=function(_6bc){
for(var x=0;x<this.propertySetsList.length;x++){
if(_6bc==this.propertySetsList[x]["id"][0].value){
return this.propertySetsList[x];
}
}
return "";
};
this.getPropertySetsByType=function(_6be){
var _6bf=[];
for(var x=0;x<this.propertySetsList.length;x++){
var cpl=this.propertySetsList[x];
var cpcc=cpl.componentClass||cpl.componentType||null;
var _6c3=this.propertySetsList[x]["id"][0].value;
if(cpcc&&(_6c3==cpcc[0].value)){
_6bf.push(cpl);
}
}
return _6bf;
};
this.getPropertySets=function(_6c4){
var ppl="dojo:propertyproviderlist";
var _6c6=[];
var _6c7=_6c4.tagName;
if(_6c4[ppl]){
var _6c8=_6c4[ppl].value.split(" ");
for(var _6c9 in _6c8){
if((_6c9.indexOf("..")==-1)&&(_6c9.indexOf("://")==-1)){
var _6ca=this.getPropertySetById(_6c9);
if(_6ca!=""){
_6c6.push(_6ca);
}
}else{
}
}
}
return this.getPropertySetsByType(_6c7).concat(_6c6);
};
this.createComponentFromScript=function(_6cb,_6cc,_6cd,ns){
_6cd.fastMixIn=true;
var ltn=(ns||"dojo")+":"+_6cc.toLowerCase();
if(dojo.widget.tags[ltn]){
return [dojo.widget.tags[ltn](_6cd,this,null,null,_6cd)];
}
return [dojo.widget.buildWidgetFromParseTree(ltn,_6cd,this,null,null,_6cd)];
};
};
dojo.widget._parser_collection={"dojo":new dojo.widget.Parse()};
dojo.widget.getParser=function(name){
if(!name){
name="dojo";
}
if(!this._parser_collection[name]){
this._parser_collection[name]=new dojo.widget.Parse();
}
return this._parser_collection[name];
};
dojo.widget.createWidget=function(name,_6d2,_6d3,_6d4){
var _6d5=false;
var _6d6=(typeof name=="string");
if(_6d6){
var pos=name.indexOf(":");
var ns=(pos>-1)?name.substring(0,pos):"dojo";
if(pos>-1){
name=name.substring(pos+1);
}
var _6d9=name.toLowerCase();
var _6da=ns+":"+_6d9;
_6d5=(dojo.byId(name)&&!dojo.widget.tags[_6da]);
}
if((arguments.length==1)&&(_6d5||!_6d6)){
var xp=new dojo.xml.Parse();
var tn=_6d5?dojo.byId(name):name;
return dojo.widget.getParser().createComponents(xp.parseElement(tn,null,true))[0];
}
function fromScript(_6dd,name,_6df,ns){
_6df[_6da]={dojotype:[{value:_6d9}],nodeRef:_6dd,fastMixIn:true};
_6df.ns=ns;
return dojo.widget.getParser().createComponentFromScript(_6dd,name,_6df,ns);
}
_6d2=_6d2||{};
var _6e1=false;
var tn=null;
var h=dojo.render.html.capable;
if(h){
tn=document.createElement("span");
}
if(!_6d3){
_6e1=true;
_6d3=tn;
if(h){
dojo.body().appendChild(_6d3);
}
}else{
if(_6d4){
dojo.dom.insertAtPosition(tn,_6d3,_6d4);
}else{
tn=_6d3;
}
}
var _6e3=fromScript(tn,name.toLowerCase(),_6d2,ns);
if((!_6e3)||(!_6e3[0])||(typeof _6e3[0].widgetType=="undefined")){
throw new Error("createWidget: Creation of \""+name+"\" widget failed.");
}
try{
if(_6e1&&_6e3[0].domNode.parentNode){
_6e3[0].domNode.parentNode.removeChild(_6e3[0].domNode);
}
}
catch(e){
dojo.debug(e);
}
return _6e3[0];
};
dojo.provide("dojo.widget.DomWidget");
dojo.widget._cssFiles={};
dojo.widget._cssStrings={};
dojo.widget._templateCache={};
dojo.widget.defaultStrings={dojoRoot:dojo.hostenv.getBaseScriptUri(),baseScriptUri:dojo.hostenv.getBaseScriptUri()};
dojo.widget.fillFromTemplateCache=function(obj,_6e5,_6e6,_6e7){
var _6e8=_6e5||obj.templatePath;
var _6e9=dojo.widget._templateCache;
if(!_6e8&&!obj["widgetType"]){
do{
var _6ea="__dummyTemplate__"+dojo.widget._templateCache.dummyCount++;
}while(_6e9[_6ea]);
obj.widgetType=_6ea;
}
var wt=_6e8?_6e8.toString():obj.widgetType;
var ts=_6e9[wt];
if(!ts){
_6e9[wt]={"string":null,"node":null};
if(_6e7){
ts={};
}else{
ts=_6e9[wt];
}
}
if((!obj.templateString)&&(!_6e7)){
obj.templateString=_6e6||ts["string"];
}
if((!obj.templateNode)&&(!_6e7)){
obj.templateNode=ts["node"];
}
if((!obj.templateNode)&&(!obj.templateString)&&(_6e8)){
var _6ed=dojo.hostenv.getText(_6e8);
if(_6ed){
_6ed=_6ed.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,"");
var _6ee=_6ed.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(_6ee){
_6ed=_6ee[1];
}
}else{
_6ed="";
}
obj.templateString=_6ed;
if(!_6e7){
_6e9[wt]["string"]=_6ed;
}
}
if((!ts["string"])&&(!_6e7)){
ts.string=obj.templateString;
}
};
dojo.widget._templateCache.dummyCount=0;
dojo.widget.attachProperties=["dojoAttachPoint","id"];
dojo.widget.eventAttachProperty="dojoAttachEvent";
dojo.widget.onBuildProperty="dojoOnBuild";
dojo.widget.waiNames=["waiRole","waiState"];
dojo.widget.wai={waiRole:{name:"waiRole","namespace":"http://www.w3.org/TR/xhtml2",alias:"x2",prefix:"wairole:"},waiState:{name:"waiState","namespace":"http://www.w3.org/2005/07/aaa",alias:"aaa",prefix:""},setAttr:function(node,ns,attr,_6f2){
if(dojo.render.html.ie){
node.setAttribute(this[ns].alias+":"+attr,this[ns].prefix+_6f2);
}else{
node.setAttributeNS(this[ns]["namespace"],attr,this[ns].prefix+_6f2);
}
},getAttr:function(node,ns,attr){
if(dojo.render.html.ie){
return node.getAttribute(this[ns].alias+":"+attr);
}else{
return node.getAttributeNS(this[ns]["namespace"],attr);
}
},removeAttr:function(node,ns,attr){
var _6f9=true;
if(dojo.render.html.ie){
_6f9=node.removeAttribute(this[ns].alias+":"+attr);
}else{
node.removeAttributeNS(this[ns]["namespace"],attr);
}
return _6f9;
}};
dojo.widget.attachTemplateNodes=function(_6fa,_6fb,_6fc){
var _6fd=dojo.dom.ELEMENT_NODE;
function trim(str){
return str.replace(/^\s+|\s+$/g,"");
}
if(!_6fa){
_6fa=_6fb.domNode;
}
if(_6fa.nodeType!=_6fd){
return;
}
var _6ff=_6fa.all||_6fa.getElementsByTagName("*");
var _700=_6fb;
for(var x=-1;x<_6ff.length;x++){
var _702=(x==-1)?_6fa:_6ff[x];
var _703=[];
if(!_6fb.widgetsInTemplate||!_702.getAttribute("dojoType")){
for(var y=0;y<this.attachProperties.length;y++){
var _705=_702.getAttribute(this.attachProperties[y]);
if(_705){
_703=_705.split(";");
for(var z=0;z<_703.length;z++){
if(dojo.lang.isArray(_6fb[_703[z]])){
_6fb[_703[z]].push(_702);
}else{
_6fb[_703[z]]=_702;
}
}
break;
}
}
var _707=_702.getAttribute(this.eventAttachProperty);
if(_707){
var evts=_707.split(";");
for(var y=0;y<evts.length;y++){
if((!evts[y])||(!evts[y].length)){
continue;
}
var _709=null;
var tevt=trim(evts[y]);
if(evts[y].indexOf(":")>=0){
var _70b=tevt.split(":");
tevt=trim(_70b[0]);
_709=trim(_70b[1]);
}
if(!_709){
_709=tevt;
}
var tf=function(){
var ntf=new String(_709);
return function(evt){
if(_700[ntf]){
_700[ntf](dojo.event.browser.fixEvent(evt,this));
}
};
}();
dojo.event.browser.addListener(_702,tevt,tf,false,true);
}
}
for(var y=0;y<_6fc.length;y++){
var _70f=_702.getAttribute(_6fc[y]);
if((_70f)&&(_70f.length)){
var _709=null;
var _710=_6fc[y].substr(4);
_709=trim(_70f);
var _711=[_709];
if(_709.indexOf(";")>=0){
_711=dojo.lang.map(_709.split(";"),trim);
}
for(var z=0;z<_711.length;z++){
if(!_711[z].length){
continue;
}
var tf=function(){
var ntf=new String(_711[z]);
return function(evt){
if(_700[ntf]){
_700[ntf](dojo.event.browser.fixEvent(evt,this));
}
};
}();
dojo.event.browser.addListener(_702,_710,tf,false,true);
}
}
}
}
var _714=_702.getAttribute(this.templateProperty);
if(_714){
_6fb[_714]=_702;
}
dojo.lang.forEach(dojo.widget.waiNames,function(name){
var wai=dojo.widget.wai[name];
var val=_702.getAttribute(wai.name);
if(val){
if(val.indexOf("-")==-1){
dojo.widget.wai.setAttr(_702,wai.name,"role",val);
}else{
var _718=val.split("-");
dojo.widget.wai.setAttr(_702,wai.name,_718[0],_718[1]);
}
}
},this);
var _719=_702.getAttribute(this.onBuildProperty);
if(_719){
eval("var node = baseNode; var widget = targetObj; "+_719);
}
}
};
dojo.widget.getDojoEventsFromStr=function(str){
var re=/(dojoOn([a-z]+)(\s?))=/gi;
var evts=str?str.match(re)||[]:[];
var ret=[];
var lem={};
for(var x=0;x<evts.length;x++){
if(evts[x].length<1){
continue;
}
var cm=evts[x].replace(/\s/,"");
cm=(cm.slice(0,cm.length-1));
if(!lem[cm]){
lem[cm]=true;
ret.push(cm);
}
}
return ret;
};
dojo.declare("dojo.widget.DomWidget",dojo.widget.Widget,function(){
if((arguments.length>0)&&(typeof arguments[0]=="object")){
this.create(arguments[0]);
}
},{templateNode:null,templateString:null,templateCssString:null,preventClobber:false,domNode:null,containerNode:null,widgetsInTemplate:false,addChild:function(_721,_722,pos,ref,_725){
if(!this.isContainer){
dojo.debug("dojo.widget.DomWidget.addChild() attempted on non-container widget");
return null;
}else{
if(_725==undefined){
_725=this.children.length;
}
this.addWidgetAsDirectChild(_721,_722,pos,ref,_725);
this.registerChild(_721,_725);
}
return _721;
},addWidgetAsDirectChild:function(_726,_727,pos,ref,_72a){
if((!this.containerNode)&&(!_727)){
this.containerNode=this.domNode;
}
var cn=(_727)?_727:this.containerNode;
if(!pos){
pos="after";
}
if(!ref){
if(!cn){
cn=dojo.body();
}
ref=cn.lastChild;
}
if(!_72a){
_72a=0;
}
_726.domNode.setAttribute("dojoinsertionindex",_72a);
if(!ref){
cn.appendChild(_726.domNode);
}else{
if(pos=="insertAtIndex"){
dojo.dom.insertAtIndex(_726.domNode,ref.parentNode,_72a);
}else{
if((pos=="after")&&(ref===cn.lastChild)){
cn.appendChild(_726.domNode);
}else{
dojo.dom.insertAtPosition(_726.domNode,cn,pos);
}
}
}
},registerChild:function(_72c,_72d){
_72c.dojoInsertionIndex=_72d;
var idx=-1;
for(var i=0;i<this.children.length;i++){
if(this.children[i].dojoInsertionIndex<=_72d){
idx=i;
}
}
this.children.splice(idx+1,0,_72c);
_72c.parent=this;
_72c.addedTo(this,idx+1);
delete dojo.widget.manager.topWidgets[_72c.widgetId];
},removeChild:function(_730){
dojo.dom.removeNode(_730.domNode);
return dojo.widget.DomWidget.superclass.removeChild.call(this,_730);
},getFragNodeRef:function(frag){
if(!frag){
return null;
}
if(!frag[this.getNamespacedType()]){
dojo.raise("Error: no frag for widget type "+this.getNamespacedType()+", id "+this.widgetId+" (maybe a widget has set it's type incorrectly)");
}
return frag[this.getNamespacedType()]["nodeRef"];
},postInitialize:function(args,frag,_734){
var _735=this.getFragNodeRef(frag);
if(_734&&(_734.snarfChildDomOutput||!_735)){
_734.addWidgetAsDirectChild(this,"","insertAtIndex","",args["dojoinsertionindex"],_735);
}else{
if(_735){
if(this.domNode&&(this.domNode!==_735)){
this._sourceNodeRef=dojo.dom.replaceNode(_735,this.domNode);
}
}
}
if(_734){
_734.registerChild(this,args.dojoinsertionindex);
}else{
dojo.widget.manager.topWidgets[this.widgetId]=this;
}
if(this.widgetsInTemplate){
var _736=new dojo.xml.Parse();
var _737;
var _738=this.domNode.getElementsByTagName("*");
for(var i=0;i<_738.length;i++){
if(_738[i].getAttribute("dojoAttachPoint")=="subContainerWidget"){
_737=_738[i];
}
if(_738[i].getAttribute("dojoType")){
_738[i].setAttribute("isSubWidget",true);
}
}
if(this.isContainer&&!this.containerNode){
if(_737){
var src=this.getFragNodeRef(frag);
if(src){
dojo.dom.moveChildren(src,_737);
frag["dojoDontFollow"]=true;
}
}else{
dojo.debug("No subContainerWidget node can be found in template file for widget "+this);
}
}
var _73b=_736.parseElement(this.domNode,null,true);
dojo.widget.getParser().createSubComponents(_73b,this);
var _73c=[];
var _73d=[this];
var w;
while((w=_73d.pop())){
for(var i=0;i<w.children.length;i++){
var _73f=w.children[i];
if(_73f._processedSubWidgets||!_73f.extraArgs["issubwidget"]){
continue;
}
_73c.push(_73f);
if(_73f.isContainer){
_73d.push(_73f);
}
}
}
for(var i=0;i<_73c.length;i++){
var _740=_73c[i];
if(_740._processedSubWidgets){
dojo.debug("This should not happen: widget._processedSubWidgets is already true!");
return;
}
_740._processedSubWidgets=true;
if(_740.extraArgs["dojoattachevent"]){
var evts=_740.extraArgs["dojoattachevent"].split(";");
for(var j=0;j<evts.length;j++){
var _743=null;
var tevt=dojo.string.trim(evts[j]);
if(tevt.indexOf(":")>=0){
var _745=tevt.split(":");
tevt=dojo.string.trim(_745[0]);
_743=dojo.string.trim(_745[1]);
}
if(!_743){
_743=tevt;
}
if(dojo.lang.isFunction(_740[tevt])){
dojo.event.kwConnect({srcObj:_740,srcFunc:tevt,targetObj:this,targetFunc:_743});
}else{
alert(tevt+" is not a function in widget "+_740);
}
}
}
if(_740.extraArgs["dojoattachpoint"]){
this[_740.extraArgs["dojoattachpoint"]]=_740;
}
}
}
if(this.isContainer&&!frag["dojoDontFollow"]){
dojo.widget.getParser().createSubComponents(frag,this);
}
},buildRendering:function(args,frag){
var ts=dojo.widget._templateCache[this.widgetType];
if(args["templatecsspath"]){
args["templateCssPath"]=args["templatecsspath"];
}
var _749=args["templateCssPath"]||this.templateCssPath;
if(_749&&!dojo.widget._cssFiles[_749.toString()]){
if((!this.templateCssString)&&(_749)){
this.templateCssString=dojo.hostenv.getText(_749);
this.templateCssPath=null;
}
dojo.widget._cssFiles[_749.toString()]=true;
}
if((this["templateCssString"])&&(!dojo.widget._cssStrings[this.templateCssString])){
dojo.html.insertCssText(this.templateCssString,null,_749);
dojo.widget._cssStrings[this.templateCssString]=true;
}
if((!this.preventClobber)&&((this.templatePath)||(this.templateNode)||((this["templateString"])&&(this.templateString.length))||((typeof ts!="undefined")&&((ts["string"])||(ts["node"]))))){
this.buildFromTemplate(args,frag);
}else{
this.domNode=this.getFragNodeRef(frag);
}
this.fillInTemplate(args,frag);
},buildFromTemplate:function(args,frag){
var _74c=false;
if(args["templatepath"]){
args["templatePath"]=args["templatepath"];
}
dojo.widget.fillFromTemplateCache(this,args["templatePath"],null,_74c);
var ts=dojo.widget._templateCache[this.templatePath?this.templatePath.toString():this.widgetType];
if((ts)&&(!_74c)){
if(!this.templateString.length){
this.templateString=ts["string"];
}
if(!this.templateNode){
this.templateNode=ts["node"];
}
}
var _74e=false;
var node=null;
var tstr=this.templateString;
if((!this.templateNode)&&(this.templateString)){
_74e=this.templateString.match(/\$\{([^\}]+)\}/g);
if(_74e){
var hash=this.strings||{};
for(var key in dojo.widget.defaultStrings){
if(dojo.lang.isUndefined(hash[key])){
hash[key]=dojo.widget.defaultStrings[key];
}
}
for(var i=0;i<_74e.length;i++){
var key=_74e[i];
key=key.substring(2,key.length-1);
var kval=(key.substring(0,5)=="this.")?dojo.lang.getObjPathValue(key.substring(5),this):hash[key];
var _755;
if((kval)||(dojo.lang.isString(kval))){
_755=new String((dojo.lang.isFunction(kval))?kval.call(this,key,this.templateString):kval);
while(_755.indexOf("\"")>-1){
_755=_755.replace("\"","&quot;");
}
tstr=tstr.replace(_74e[i],_755);
}
}
}else{
this.templateNode=this.createNodesFromText(this.templateString,true)[0];
if(!_74c){
ts.node=this.templateNode;
}
}
}
if((!this.templateNode)&&(!_74e)){
dojo.debug("DomWidget.buildFromTemplate: could not create template");
return false;
}else{
if(!_74e){
node=this.templateNode.cloneNode(true);
if(!node){
return false;
}
}else{
node=this.createNodesFromText(tstr,true)[0];
}
}
this.domNode=node;
this.attachTemplateNodes();
if(this.isContainer&&this.containerNode){
var src=this.getFragNodeRef(frag);
if(src){
dojo.dom.moveChildren(src,this.containerNode);
}
}
},attachTemplateNodes:function(_757,_758){
if(!_757){
_757=this.domNode;
}
if(!_758){
_758=this;
}
return dojo.widget.attachTemplateNodes(_757,_758,dojo.widget.getDojoEventsFromStr(this.templateString));
},fillInTemplate:function(){
},destroyRendering:function(){
try{
dojo.dom.destroyNode(this.domNode);
delete this.domNode;
}
catch(e){
}
if(this._sourceNodeRef){
try{
dojo.dom.destroyNode(this._sourceNodeRef);
}
catch(e){
}
}
},createNodesFromText:function(){
dojo.unimplemented("dojo.widget.DomWidget.createNodesFromText");
}});
dojo.provide("dojo.gfx.color");
dojo.gfx.color.Color=function(r,g,b,a){
if(dojo.lang.isArray(r)){
this.r=r[0];
this.g=r[1];
this.b=r[2];
this.a=r[3]||1;
}else{
if(dojo.lang.isString(r)){
var rgb=dojo.gfx.color.extractRGB(r);
this.r=rgb[0];
this.g=rgb[1];
this.b=rgb[2];
this.a=g||1;
}else{
if(r instanceof dojo.gfx.color.Color){
this.r=r.r;
this.b=r.b;
this.g=r.g;
this.a=r.a;
}else{
this.r=r;
this.g=g;
this.b=b;
this.a=a;
}
}
}
};
dojo.gfx.color.Color.fromArray=function(arr){
return new dojo.gfx.color.Color(arr[0],arr[1],arr[2],arr[3]);
};
dojo.extend(dojo.gfx.color.Color,{toRgb:function(_75f){
if(_75f){
return this.toRgba();
}else{
return [this.r,this.g,this.b];
}
},toRgba:function(){
return [this.r,this.g,this.b,this.a];
},toHex:function(){
return dojo.gfx.color.rgb2hex(this.toRgb());
},toCss:function(){
return "rgb("+this.toRgb().join()+")";
},toString:function(){
return this.toHex();
},blend:function(_760,_761){
var rgb=null;
if(dojo.lang.isArray(_760)){
rgb=_760;
}else{
if(_760 instanceof dojo.gfx.color.Color){
rgb=_760.toRgb();
}else{
rgb=new dojo.gfx.color.Color(_760).toRgb();
}
}
return dojo.gfx.color.blend(this.toRgb(),rgb,_761);
}});
dojo.gfx.color.named={white:[255,255,255],black:[0,0,0],red:[255,0,0],green:[0,255,0],lime:[0,255,0],blue:[0,0,255],navy:[0,0,128],gray:[128,128,128],silver:[192,192,192]};
dojo.gfx.color.blend=function(a,b,_765){
if(typeof a=="string"){
return dojo.gfx.color.blendHex(a,b,_765);
}
if(!_765){
_765=0;
}
_765=Math.min(Math.max(-1,_765),1);
_765=((_765+1)/2);
var c=[];
for(var x=0;x<3;x++){
c[x]=parseInt(b[x]+((a[x]-b[x])*_765));
}
return c;
};
dojo.gfx.color.blendHex=function(a,b,_76a){
return dojo.gfx.color.rgb2hex(dojo.gfx.color.blend(dojo.gfx.color.hex2rgb(a),dojo.gfx.color.hex2rgb(b),_76a));
};
dojo.gfx.color.extractRGB=function(_76b){
var hex="0123456789abcdef";
_76b=_76b.toLowerCase();
if(_76b.indexOf("rgb")==0){
var _76d=_76b.match(/rgba*\((\d+), *(\d+), *(\d+)/i);
var ret=_76d.splice(1,3);
return ret;
}else{
var _76f=dojo.gfx.color.hex2rgb(_76b);
if(_76f){
return _76f;
}else{
return dojo.gfx.color.named[_76b]||[255,255,255];
}
}
};
dojo.gfx.color.hex2rgb=function(hex){
var _771="0123456789ABCDEF";
var rgb=new Array(3);
if(hex.indexOf("#")==0){
hex=hex.substring(1);
}
hex=hex.toUpperCase();
if(hex.replace(new RegExp("["+_771+"]","g"),"")!=""){
return null;
}
if(hex.length==3){
rgb[0]=hex.charAt(0)+hex.charAt(0);
rgb[1]=hex.charAt(1)+hex.charAt(1);
rgb[2]=hex.charAt(2)+hex.charAt(2);
}else{
rgb[0]=hex.substring(0,2);
rgb[1]=hex.substring(2,4);
rgb[2]=hex.substring(4);
}
for(var i=0;i<rgb.length;i++){
rgb[i]=_771.indexOf(rgb[i].charAt(0))*16+_771.indexOf(rgb[i].charAt(1));
}
return rgb;
};
dojo.gfx.color.rgb2hex=function(r,g,b){
if(dojo.lang.isArray(r)){
g=r[1]||0;
b=r[2]||0;
r=r[0]||0;
}
var ret=dojo.lang.map([r,g,b],function(x){
x=new Number(x);
var s=x.toString(16);
while(s.length<2){
s="0"+s;
}
return s;
});
ret.unshift("#");
return ret.join("");
};
dojo.provide("dojo.lfx.Animation");
dojo.lfx.Line=function(_77a,end){
this.start=_77a;
this.end=end;
if(dojo.lang.isArray(_77a)){
var diff=[];
dojo.lang.forEach(this.start,function(s,i){
diff[i]=this.end[i]-s;
},this);
this.getValue=function(n){
var res=[];
dojo.lang.forEach(this.start,function(s,i){
res[i]=(diff[i]*n)+s;
},this);
return res;
};
}else{
var diff=end-_77a;
this.getValue=function(n){
return (diff*n)+this.start;
};
}
};
dojo.lfx.easeDefault=function(n){
if(dojo.render.html.khtml){
return (parseFloat("0.5")+((Math.sin((n+parseFloat("1.5"))*Math.PI))/2));
}else{
return (0.5+((Math.sin((n+1.5)*Math.PI))/2));
}
};
dojo.lfx.easeIn=function(n){
return Math.pow(n,3);
};
dojo.lfx.easeOut=function(n){
return (1-Math.pow(1-n,3));
};
dojo.lfx.easeInOut=function(n){
return ((3*Math.pow(n,2))-(2*Math.pow(n,3)));
};
dojo.lfx.IAnimation=function(){
};
dojo.lang.extend(dojo.lfx.IAnimation,{curve:null,duration:1000,easing:null,repeatCount:0,rate:25,handler:null,beforeBegin:null,onBegin:null,onAnimate:null,onEnd:null,onPlay:null,onPause:null,onStop:null,play:null,pause:null,stop:null,connect:function(evt,_789,_78a){
if(!_78a){
_78a=_789;
_789=this;
}
_78a=dojo.lang.hitch(_789,_78a);
var _78b=this[evt]||function(){
};
this[evt]=function(){
var ret=_78b.apply(this,arguments);
_78a.apply(this,arguments);
return ret;
};
return this;
},fire:function(evt,args){
if(this[evt]){
this[evt].apply(this,(args||[]));
}
return this;
},repeat:function(_78f){
this.repeatCount=_78f;
return this;
},_active:false,_paused:false});
dojo.lfx.Animation=function(_790,_791,_792,_793,_794,rate){
dojo.lfx.IAnimation.call(this);
if(dojo.lang.isNumber(_790)||(!_790&&_791.getValue)){
rate=_794;
_794=_793;
_793=_792;
_792=_791;
_791=_790;
_790=null;
}else{
if(_790.getValue||dojo.lang.isArray(_790)){
rate=_793;
_794=_792;
_793=_791;
_792=_790;
_791=null;
_790=null;
}
}
if(dojo.lang.isArray(_792)){
this.curve=new dojo.lfx.Line(_792[0],_792[1]);
}else{
this.curve=_792;
}
if(_791!=null&&_791>0){
this.duration=_791;
}
if(_794){
this.repeatCount=_794;
}
if(rate){
this.rate=rate;
}
if(_790){
dojo.lang.forEach(["handler","beforeBegin","onBegin","onEnd","onPlay","onStop","onAnimate"],function(item){
if(_790[item]){
this.connect(item,_790[item]);
}
},this);
}
if(_793&&dojo.lang.isFunction(_793)){
this.easing=_793;
}
};
dojo.inherits(dojo.lfx.Animation,dojo.lfx.IAnimation);
dojo.lang.extend(dojo.lfx.Animation,{_startTime:null,_endTime:null,_timer:null,_percent:0,_startRepeatCount:0,play:function(_797,_798){
if(_798){
clearTimeout(this._timer);
this._active=false;
this._paused=false;
this._percent=0;
}else{
if(this._active&&!this._paused){
return this;
}
}
this.fire("handler",["beforeBegin"]);
this.fire("beforeBegin");
if(_797>0){
setTimeout(dojo.lang.hitch(this,function(){
this.play(null,_798);
}),_797);
return this;
}
this._startTime=new Date().valueOf();
if(this._paused){
this._startTime-=(this.duration*this._percent/100);
}
this._endTime=this._startTime+this.duration;
this._active=true;
this._paused=false;
var step=this._percent/100;
var _79a=this.curve.getValue(step);
if(this._percent==0){
if(!this._startRepeatCount){
this._startRepeatCount=this.repeatCount;
}
this.fire("handler",["begin",_79a]);
this.fire("onBegin",[_79a]);
}
this.fire("handler",["play",_79a]);
this.fire("onPlay",[_79a]);
this._cycle();
return this;
},pause:function(){
clearTimeout(this._timer);
if(!this._active){
return this;
}
this._paused=true;
var _79b=this.curve.getValue(this._percent/100);
this.fire("handler",["pause",_79b]);
this.fire("onPause",[_79b]);
return this;
},gotoPercent:function(pct,_79d){
clearTimeout(this._timer);
this._active=true;
this._paused=true;
this._percent=pct;
if(_79d){
this.play();
}
return this;
},stop:function(_79e){
clearTimeout(this._timer);
var step=this._percent/100;
if(_79e){
step=1;
}
var _7a0=this.curve.getValue(step);
this.fire("handler",["stop",_7a0]);
this.fire("onStop",[_7a0]);
this._active=false;
this._paused=false;
return this;
},status:function(){
if(this._active){
return this._paused?"paused":"playing";
}else{
return "stopped";
}
return this;
},_cycle:function(){
clearTimeout(this._timer);
if(this._active){
var curr=new Date().valueOf();
var step=(curr-this._startTime)/(this._endTime-this._startTime);
if(step>=1){
step=1;
this._percent=100;
}else{
this._percent=step*100;
}
if((this.easing)&&(dojo.lang.isFunction(this.easing))){
step=this.easing(step);
}
var _7a3=this.curve.getValue(step);
this.fire("handler",["animate",_7a3]);
this.fire("onAnimate",[_7a3]);
if(step<1){
this._timer=setTimeout(dojo.lang.hitch(this,"_cycle"),this.rate);
}else{
this._active=false;
this.fire("handler",["end"]);
this.fire("onEnd");
if(this.repeatCount>0){
this.repeatCount--;
this.play(null,true);
}else{
if(this.repeatCount==-1){
this.play(null,true);
}else{
if(this._startRepeatCount){
this.repeatCount=this._startRepeatCount;
this._startRepeatCount=0;
}
}
}
}
}
return this;
}});
dojo.lfx.Combine=function(_7a4){
dojo.lfx.IAnimation.call(this);
this._anims=[];
this._animsEnded=0;
var _7a5=arguments;
if(_7a5.length==1&&(dojo.lang.isArray(_7a5[0])||dojo.lang.isArrayLike(_7a5[0]))){
_7a5=_7a5[0];
}
dojo.lang.forEach(_7a5,function(anim){
this._anims.push(anim);
anim.connect("onEnd",dojo.lang.hitch(this,"_onAnimsEnded"));
},this);
};
dojo.inherits(dojo.lfx.Combine,dojo.lfx.IAnimation);
dojo.lang.extend(dojo.lfx.Combine,{_animsEnded:0,play:function(_7a7,_7a8){
if(!this._anims.length){
return this;
}
this.fire("beforeBegin");
if(_7a7>0){
setTimeout(dojo.lang.hitch(this,function(){
this.play(null,_7a8);
}),_7a7);
return this;
}
if(_7a8||this._anims[0].percent==0){
this.fire("onBegin");
}
this.fire("onPlay");
this._animsCall("play",null,_7a8);
return this;
},pause:function(){
this.fire("onPause");
this._animsCall("pause");
return this;
},stop:function(_7a9){
this.fire("onStop");
this._animsCall("stop",_7a9);
return this;
},_onAnimsEnded:function(){
this._animsEnded++;
if(this._animsEnded>=this._anims.length){
this.fire("onEnd");
}
return this;
},_animsCall:function(_7aa){
var args=[];
if(arguments.length>1){
for(var i=1;i<arguments.length;i++){
args.push(arguments[i]);
}
}
var _7ad=this;
dojo.lang.forEach(this._anims,function(anim){
anim[_7aa](args);
},_7ad);
return this;
}});
dojo.lfx.Chain=function(_7af){
dojo.lfx.IAnimation.call(this);
this._anims=[];
this._currAnim=-1;
var _7b0=arguments;
if(_7b0.length==1&&(dojo.lang.isArray(_7b0[0])||dojo.lang.isArrayLike(_7b0[0]))){
_7b0=_7b0[0];
}
var _7b1=this;
dojo.lang.forEach(_7b0,function(anim,i,_7b4){
this._anims.push(anim);
if(i<_7b4.length-1){
anim.connect("onEnd",dojo.lang.hitch(this,"_playNext"));
}else{
anim.connect("onEnd",dojo.lang.hitch(this,function(){
this.fire("onEnd");
}));
}
},this);
};
dojo.inherits(dojo.lfx.Chain,dojo.lfx.IAnimation);
dojo.lang.extend(dojo.lfx.Chain,{_currAnim:-1,play:function(_7b5,_7b6){
if(!this._anims.length){
return this;
}
if(_7b6||!this._anims[this._currAnim]){
this._currAnim=0;
}
var _7b7=this._anims[this._currAnim];
this.fire("beforeBegin");
if(_7b5>0){
setTimeout(dojo.lang.hitch(this,function(){
this.play(null,_7b6);
}),_7b5);
return this;
}
if(_7b7){
if(this._currAnim==0){
this.fire("handler",["begin",this._currAnim]);
this.fire("onBegin",[this._currAnim]);
}
this.fire("onPlay",[this._currAnim]);
_7b7.play(null,_7b6);
}
return this;
},pause:function(){
if(this._anims[this._currAnim]){
this._anims[this._currAnim].pause();
this.fire("onPause",[this._currAnim]);
}
return this;
},playPause:function(){
if(this._anims.length==0){
return this;
}
if(this._currAnim==-1){
this._currAnim=0;
}
var _7b8=this._anims[this._currAnim];
if(_7b8){
if(!_7b8._active||_7b8._paused){
this.play();
}else{
this.pause();
}
}
return this;
},stop:function(){
var _7b9=this._anims[this._currAnim];
if(_7b9){
_7b9.stop();
this.fire("onStop",[this._currAnim]);
}
return _7b9;
},_playNext:function(){
if(this._currAnim==-1||this._anims.length==0){
return this;
}
this._currAnim++;
if(this._anims[this._currAnim]){
this._anims[this._currAnim].play(null,true);
}
return this;
}});
dojo.lfx.combine=function(_7ba){
var _7bb=arguments;
if(dojo.lang.isArray(arguments[0])){
_7bb=arguments[0];
}
if(_7bb.length==1){
return _7bb[0];
}
return new dojo.lfx.Combine(_7bb);
};
dojo.lfx.chain=function(_7bc){
var _7bd=arguments;
if(dojo.lang.isArray(arguments[0])){
_7bd=arguments[0];
}
if(_7bd.length==1){
return _7bd[0];
}
return new dojo.lfx.Chain(_7bd);
};
dojo.provide("dojo.html.color");
dojo.html.getBackgroundColor=function(node){
node=dojo.byId(node);
var _7bf;
do{
_7bf=dojo.html.getStyle(node,"background-color");
if(_7bf.toLowerCase()=="rgba(0, 0, 0, 0)"){
_7bf="transparent";
}
if(node==document.getElementsByTagName("body")[0]){
node=null;
break;
}
node=node.parentNode;
}while(node&&dojo.lang.inArray(["transparent",""],_7bf));
if(_7bf=="transparent"){
_7bf=[255,255,255,0];
}else{
_7bf=dojo.gfx.color.extractRGB(_7bf);
}
return _7bf;
};
dojo.provide("dojo.lfx.html");
dojo.lfx.html._byId=function(_7c0){
if(!_7c0){
return [];
}
if(dojo.lang.isArrayLike(_7c0)){
if(!_7c0.alreadyChecked){
var n=[];
dojo.lang.forEach(_7c0,function(node){
n.push(dojo.byId(node));
});
n.alreadyChecked=true;
return n;
}else{
return _7c0;
}
}else{
var n=[];
n.push(dojo.byId(_7c0));
n.alreadyChecked=true;
return n;
}
};
dojo.lfx.html.propertyAnimation=function(_7c3,_7c4,_7c5,_7c6,_7c7){
_7c3=dojo.lfx.html._byId(_7c3);
var _7c8={"propertyMap":_7c4,"nodes":_7c3,"duration":_7c5,"easing":_7c6||dojo.lfx.easeDefault};
var _7c9=function(args){
if(args.nodes.length==1){
var pm=args.propertyMap;
if(!dojo.lang.isArray(args.propertyMap)){
var parr=[];
for(var _7cd in pm){
pm[_7cd].property=_7cd;
parr.push(pm[_7cd]);
}
pm=args.propertyMap=parr;
}
dojo.lang.forEach(pm,function(prop){
if(dj_undef("start",prop)){
if(prop.property!="opacity"){
prop.start=parseInt(dojo.html.getComputedStyle(args.nodes[0],prop.property));
}else{
prop.start=dojo.html.getOpacity(args.nodes[0]);
}
}
});
}
};
var _7cf=function(_7d0){
var _7d1=[];
dojo.lang.forEach(_7d0,function(c){
_7d1.push(Math.round(c));
});
return _7d1;
};
var _7d3=function(n,_7d5){
n=dojo.byId(n);
if(!n||!n.style){
return;
}
for(var s in _7d5){
try{
if(s=="opacity"){
dojo.html.setOpacity(n,_7d5[s]);
}else{
n.style[s]=_7d5[s];
}
}
catch(e){
dojo.debug(e);
}
}
};
var _7d7=function(_7d8){
this._properties=_7d8;
this.diffs=new Array(_7d8.length);
dojo.lang.forEach(_7d8,function(prop,i){
if(dojo.lang.isFunction(prop.start)){
prop.start=prop.start(prop,i);
}
if(dojo.lang.isFunction(prop.end)){
prop.end=prop.end(prop,i);
}
if(dojo.lang.isArray(prop.start)){
this.diffs[i]=null;
}else{
if(prop.start instanceof dojo.gfx.color.Color){
prop.startRgb=prop.start.toRgb();
prop.endRgb=prop.end.toRgb();
}else{
this.diffs[i]=prop.end-prop.start;
}
}
},this);
this.getValue=function(n){
var ret={};
dojo.lang.forEach(this._properties,function(prop,i){
var _7df=null;
if(dojo.lang.isArray(prop.start)){
}else{
if(prop.start instanceof dojo.gfx.color.Color){
_7df=(prop.units||"rgb")+"(";
for(var j=0;j<prop.startRgb.length;j++){
_7df+=Math.round(((prop.endRgb[j]-prop.startRgb[j])*n)+prop.startRgb[j])+(j<prop.startRgb.length-1?",":"");
}
_7df+=")";
}else{
_7df=((this.diffs[i])*n)+prop.start+(prop.property!="opacity"?prop.units||"px":"");
}
}
ret[dojo.html.toCamelCase(prop.property)]=_7df;
},this);
return ret;
};
};
var anim=new dojo.lfx.Animation({beforeBegin:function(){
_7c9(_7c8);
anim.curve=new _7d7(_7c8.propertyMap);
},onAnimate:function(_7e2){
dojo.lang.forEach(_7c8.nodes,function(node){
_7d3(node,_7e2);
});
}},_7c8.duration,null,_7c8.easing);
if(_7c7){
for(var x in _7c7){
if(dojo.lang.isFunction(_7c7[x])){
anim.connect(x,anim,_7c7[x]);
}
}
}
return anim;
};
dojo.lfx.html._makeFadeable=function(_7e5){
var _7e6=function(node){
if(dojo.render.html.ie){
if((node.style.zoom.length==0)&&(dojo.html.getStyle(node,"zoom")=="normal")){
node.style.zoom="1";
}
if((node.style.width.length==0)&&(dojo.html.getStyle(node,"width")=="auto")){
node.style.width="auto";
}
}
};
if(dojo.lang.isArrayLike(_7e5)){
dojo.lang.forEach(_7e5,_7e6);
}else{
_7e6(_7e5);
}
};
dojo.lfx.html.fade=function(_7e8,_7e9,_7ea,_7eb,_7ec){
_7e8=dojo.lfx.html._byId(_7e8);
var _7ed={property:"opacity"};
if(!dj_undef("start",_7e9)){
_7ed.start=_7e9.start;
}else{
_7ed.start=function(){
return dojo.html.getOpacity(_7e8[0]);
};
}
if(!dj_undef("end",_7e9)){
_7ed.end=_7e9.end;
}else{
dojo.raise("dojo.lfx.html.fade needs an end value");
}
var anim=dojo.lfx.propertyAnimation(_7e8,[_7ed],_7ea,_7eb);
anim.connect("beforeBegin",function(){
dojo.lfx.html._makeFadeable(_7e8);
});
if(_7ec){
anim.connect("onEnd",function(){
_7ec(_7e8,anim);
});
}
return anim;
};
dojo.lfx.html.fadeIn=function(_7ef,_7f0,_7f1,_7f2){
return dojo.lfx.html.fade(_7ef,{end:1},_7f0,_7f1,_7f2);
};
dojo.lfx.html.fadeOut=function(_7f3,_7f4,_7f5,_7f6){
return dojo.lfx.html.fade(_7f3,{end:0},_7f4,_7f5,_7f6);
};
dojo.lfx.html.fadeShow=function(_7f7,_7f8,_7f9,_7fa){
_7f7=dojo.lfx.html._byId(_7f7);
dojo.lang.forEach(_7f7,function(node){
dojo.html.setOpacity(node,0);
});
var anim=dojo.lfx.html.fadeIn(_7f7,_7f8,_7f9,_7fa);
anim.connect("beforeBegin",function(){
if(dojo.lang.isArrayLike(_7f7)){
dojo.lang.forEach(_7f7,dojo.html.show);
}else{
dojo.html.show(_7f7);
}
});
return anim;
};
dojo.lfx.html.fadeHide=function(_7fd,_7fe,_7ff,_800){
var anim=dojo.lfx.html.fadeOut(_7fd,_7fe,_7ff,function(){
if(dojo.lang.isArrayLike(_7fd)){
dojo.lang.forEach(_7fd,dojo.html.hide);
}else{
dojo.html.hide(_7fd);
}
if(_800){
_800(_7fd,anim);
}
});
return anim;
};
dojo.lfx.html.wipeIn=function(_802,_803,_804,_805){
_802=dojo.lfx.html._byId(_802);
var _806=[];
dojo.lang.forEach(_802,function(node){
var _808={};
var _809,_80a,_80b;
with(node.style){
_809=top;
_80a=left;
_80b=position;
top="-9999px";
left="-9999px";
position="absolute";
display="";
}
var _80c=dojo.html.getBorderBox(node).height;
with(node.style){
top=_809;
left=_80a;
position=_80b;
display="none";
}
var anim=dojo.lfx.propertyAnimation(node,{"height":{start:1,end:function(){
return _80c;
}}},_803,_804);
anim.connect("beforeBegin",function(){
_808.overflow=node.style.overflow;
_808.height=node.style.height;
with(node.style){
overflow="hidden";
_80c="1px";
}
dojo.html.show(node);
});
anim.connect("onEnd",function(){
with(node.style){
overflow=_808.overflow;
_80c=_808.height;
}
if(_805){
_805(node,anim);
}
});
_806.push(anim);
});
return dojo.lfx.combine(_806);
};
dojo.lfx.html.wipeOut=function(_80e,_80f,_810,_811){
_80e=dojo.lfx.html._byId(_80e);
var _812=[];
dojo.lang.forEach(_80e,function(node){
var _814={};
var anim=dojo.lfx.propertyAnimation(node,{"height":{start:function(){
return dojo.html.getContentBox(node).height;
},end:1}},_80f,_810,{"beforeBegin":function(){
_814.overflow=node.style.overflow;
_814.height=node.style.height;
with(node.style){
overflow="hidden";
}
dojo.html.show(node);
},"onEnd":function(){
dojo.html.hide(node);
with(node.style){
overflow=_814.overflow;
height=_814.height;
}
if(_811){
_811(node,anim);
}
}});
_812.push(anim);
});
return dojo.lfx.combine(_812);
};
dojo.lfx.html.slideTo=function(_816,_817,_818,_819,_81a){
_816=dojo.lfx.html._byId(_816);
var _81b=[];
var _81c=dojo.html.getComputedStyle;
if(dojo.lang.isArray(_817)){
dojo.deprecated("dojo.lfx.html.slideTo(node, array)","use dojo.lfx.html.slideTo(node, {top: value, left: value});","0.5");
_817={top:_817[0],left:_817[1]};
}
dojo.lang.forEach(_816,function(node){
var top=null;
var left=null;
var init=(function(){
var _821=node;
return function(){
var pos=_81c(_821,"position");
top=(pos=="absolute"?node.offsetTop:parseInt(_81c(node,"top"))||0);
left=(pos=="absolute"?node.offsetLeft:parseInt(_81c(node,"left"))||0);
if(!dojo.lang.inArray(["absolute","relative"],pos)){
var ret=dojo.html.abs(_821,true);
dojo.html.setStyleAttributes(_821,"position:absolute;top:"+ret.y+"px;left:"+ret.x+"px;");
top=ret.y;
left=ret.x;
}
};
})();
init();
var anim=dojo.lfx.propertyAnimation(node,{"top":{start:top,end:(_817.top||0)},"left":{start:left,end:(_817.left||0)}},_818,_819,{"beforeBegin":init});
if(_81a){
anim.connect("onEnd",function(){
_81a(_816,anim);
});
}
_81b.push(anim);
});
return dojo.lfx.combine(_81b);
};
dojo.lfx.html.slideBy=function(_825,_826,_827,_828,_829){
_825=dojo.lfx.html._byId(_825);
var _82a=[];
var _82b=dojo.html.getComputedStyle;
if(dojo.lang.isArray(_826)){
dojo.deprecated("dojo.lfx.html.slideBy(node, array)","use dojo.lfx.html.slideBy(node, {top: value, left: value});","0.5");
_826={top:_826[0],left:_826[1]};
}
dojo.lang.forEach(_825,function(node){
var top=null;
var left=null;
var init=(function(){
var _830=node;
return function(){
var pos=_82b(_830,"position");
top=(pos=="absolute"?node.offsetTop:parseInt(_82b(node,"top"))||0);
left=(pos=="absolute"?node.offsetLeft:parseInt(_82b(node,"left"))||0);
if(!dojo.lang.inArray(["absolute","relative"],pos)){
var ret=dojo.html.abs(_830,true);
dojo.html.setStyleAttributes(_830,"position:absolute;top:"+ret.y+"px;left:"+ret.x+"px;");
top=ret.y;
left=ret.x;
}
};
})();
init();
var anim=dojo.lfx.propertyAnimation(node,{"top":{start:top,end:top+(_826.top||0)},"left":{start:left,end:left+(_826.left||0)}},_827,_828).connect("beforeBegin",init);
if(_829){
anim.connect("onEnd",function(){
_829(_825,anim);
});
}
_82a.push(anim);
});
return dojo.lfx.combine(_82a);
};
dojo.lfx.html.explode=function(_834,_835,_836,_837,_838){
var h=dojo.html;
_834=dojo.byId(_834);
_835=dojo.byId(_835);
var _83a=h.toCoordinateObject(_834,true);
var _83b=document.createElement("div");
h.copyStyle(_83b,_835);
if(_835.explodeClassName){
_83b.className=_835.explodeClassName;
}
with(_83b.style){
position="absolute";
display="none";
var _83c=h.getStyle(_834,"background-color");
backgroundColor=_83c?_83c.toLowerCase():"transparent";
backgroundColor=(backgroundColor=="transparent")?"rgb(221, 221, 221)":backgroundColor;
}
dojo.body().appendChild(_83b);
with(_835.style){
visibility="hidden";
display="block";
}
var _83d=h.toCoordinateObject(_835,true);
with(_835.style){
display="none";
visibility="visible";
}
var _83e={opacity:{start:0.5,end:1}};
dojo.lang.forEach(["height","width","top","left"],function(type){
_83e[type]={start:_83a[type],end:_83d[type]};
});
var anim=new dojo.lfx.propertyAnimation(_83b,_83e,_836,_837,{"beforeBegin":function(){
h.setDisplay(_83b,"block");
},"onEnd":function(){
h.setDisplay(_835,"block");
_83b.parentNode.removeChild(_83b);
}});
if(_838){
anim.connect("onEnd",function(){
_838(_835,anim);
});
}
return anim;
};
dojo.lfx.html.implode=function(_841,end,_843,_844,_845){
var h=dojo.html;
_841=dojo.byId(_841);
end=dojo.byId(end);
var _847=dojo.html.toCoordinateObject(_841,true);
var _848=dojo.html.toCoordinateObject(end,true);
var _849=document.createElement("div");
dojo.html.copyStyle(_849,_841);
if(_841.explodeClassName){
_849.className=_841.explodeClassName;
}
dojo.html.setOpacity(_849,0.3);
with(_849.style){
position="absolute";
display="none";
backgroundColor=h.getStyle(_841,"background-color").toLowerCase();
}
dojo.body().appendChild(_849);
var _84a={opacity:{start:1,end:0.5}};
dojo.lang.forEach(["height","width","top","left"],function(type){
_84a[type]={start:_847[type],end:_848[type]};
});
var anim=new dojo.lfx.propertyAnimation(_849,_84a,_843,_844,{"beforeBegin":function(){
dojo.html.hide(_841);
dojo.html.show(_849);
},"onEnd":function(){
_849.parentNode.removeChild(_849);
}});
if(_845){
anim.connect("onEnd",function(){
_845(_841,anim);
});
}
return anim;
};
dojo.lfx.html.highlight=function(_84d,_84e,_84f,_850,_851){
_84d=dojo.lfx.html._byId(_84d);
var _852=[];
dojo.lang.forEach(_84d,function(node){
var _854=dojo.html.getBackgroundColor(node);
var bg=dojo.html.getStyle(node,"background-color").toLowerCase();
var _856=dojo.html.getStyle(node,"background-image");
var _857=(bg=="transparent"||bg=="rgba(0, 0, 0, 0)");
while(_854.length>3){
_854.pop();
}
var rgb=new dojo.gfx.color.Color(_84e);
var _859=new dojo.gfx.color.Color(_854);
var anim=dojo.lfx.propertyAnimation(node,{"background-color":{start:rgb,end:_859}},_84f,_850,{"beforeBegin":function(){
if(_856){
node.style.backgroundImage="none";
}
node.style.backgroundColor="rgb("+rgb.toRgb().join(",")+")";
},"onEnd":function(){
if(_856){
node.style.backgroundImage=_856;
}
if(_857){
node.style.backgroundColor="transparent";
}
if(_851){
_851(node,anim);
}
}});
_852.push(anim);
});
return dojo.lfx.combine(_852);
};
dojo.lfx.html.unhighlight=function(_85b,_85c,_85d,_85e,_85f){
_85b=dojo.lfx.html._byId(_85b);
var _860=[];
dojo.lang.forEach(_85b,function(node){
var _862=new dojo.gfx.color.Color(dojo.html.getBackgroundColor(node));
var rgb=new dojo.gfx.color.Color(_85c);
var _864=dojo.html.getStyle(node,"background-image");
var anim=dojo.lfx.propertyAnimation(node,{"background-color":{start:_862,end:rgb}},_85d,_85e,{"beforeBegin":function(){
if(_864){
node.style.backgroundImage="none";
}
node.style.backgroundColor="rgb("+_862.toRgb().join(",")+")";
},"onEnd":function(){
if(_85f){
_85f(node,anim);
}
}});
_860.push(anim);
});
return dojo.lfx.combine(_860);
};
dojo.lang.mixin(dojo.lfx,dojo.lfx.html);
dojo.provide("dojo.lfx.*");
dojo.provide("dojo.lfx.toggle");
dojo.lfx.toggle.plain={show:function(node,_867,_868,_869){
dojo.html.show(node);
if(dojo.lang.isFunction(_869)){
_869();
}
},hide:function(node,_86b,_86c,_86d){
dojo.html.hide(node);
if(dojo.lang.isFunction(_86d)){
_86d();
}
}};
dojo.lfx.toggle.fade={show:function(node,_86f,_870,_871){
dojo.lfx.fadeShow(node,_86f,_870,_871).play();
},hide:function(node,_873,_874,_875){
dojo.lfx.fadeHide(node,_873,_874,_875).play();
}};
dojo.lfx.toggle.wipe={show:function(node,_877,_878,_879){
dojo.lfx.wipeIn(node,_877,_878,_879).play();
},hide:function(node,_87b,_87c,_87d){
dojo.lfx.wipeOut(node,_87b,_87c,_87d).play();
}};
dojo.lfx.toggle.explode={show:function(node,_87f,_880,_881,_882){
dojo.lfx.explode(_882||{x:0,y:0,width:0,height:0},node,_87f,_880,_881).play();
},hide:function(node,_884,_885,_886,_887){
dojo.lfx.implode(node,_887||{x:0,y:0,width:0,height:0},_884,_885,_886).play();
}};
dojo.provide("dojo.widget.HtmlWidget");
dojo.declare("dojo.widget.HtmlWidget",dojo.widget.DomWidget,{templateCssPath:null,templatePath:null,lang:"",toggle:"plain",toggleDuration:150,initialize:function(args,frag){
},postMixInProperties:function(args,frag){
if(this.lang===""){
this.lang=null;
}
this.toggleObj=dojo.lfx.toggle[this.toggle.toLowerCase()]||dojo.lfx.toggle.plain;
},createNodesFromText:function(txt,wrap){
return dojo.html.createNodesFromText(txt,wrap);
},destroyRendering:function(_88e){
try{
if(this.bgIframe){
this.bgIframe.remove();
delete this.bgIframe;
}
if(!_88e&&this.domNode){
dojo.event.browser.clean(this.domNode);
}
dojo.widget.HtmlWidget.superclass.destroyRendering.call(this);
}
catch(e){
}
},isShowing:function(){
return dojo.html.isShowing(this.domNode);
},toggleShowing:function(){
if(this.isShowing()){
this.hide();
}else{
this.show();
}
},show:function(){
if(this.isShowing()){
return;
}
this.animationInProgress=true;
this.toggleObj.show(this.domNode,this.toggleDuration,null,dojo.lang.hitch(this,this.onShow),this.explodeSrc);
},onShow:function(){
this.animationInProgress=false;
this.checkSize();
},hide:function(){
if(!this.isShowing()){
return;
}
this.animationInProgress=true;
this.toggleObj.hide(this.domNode,this.toggleDuration,null,dojo.lang.hitch(this,this.onHide),this.explodeSrc);
},onHide:function(){
this.animationInProgress=false;
},_isResized:function(w,h){
if(!this.isShowing()){
return false;
}
var wh=dojo.html.getMarginBox(this.domNode);
var _892=w||wh.width;
var _893=h||wh.height;
if(this.width==_892&&this.height==_893){
return false;
}
this.width=_892;
this.height=_893;
return true;
},checkSize:function(){
if(!this._isResized()){
return;
}
this.onResized();
},resizeTo:function(w,h){
dojo.html.setMarginBox(this.domNode,{width:w,height:h});
if(this.isShowing()){
this.onResized();
}
},resizeSoon:function(){
if(this.isShowing()){
dojo.lang.setTimeout(this,this.onResized,0);
}
},onResized:function(){
dojo.lang.forEach(this.children,function(_896){
if(_896.checkSize){
_896.checkSize();
}
});
}});
dojo.provide("dojo.widget.*");
dojo.provide("dojo.widget.ContentPane");
dojo.widget.defineWidget("dojo.widget.ContentPane",dojo.widget.HtmlWidget,function(){
this._styleNodes=[];
this._onLoadStack=[];
this._onUnloadStack=[];
this._callOnUnload=false;
this._ioBindObj;
this.scriptScope;
this.bindArgs={};
},{isContainer:true,adjustPaths:true,href:"",extractContent:true,parseContent:true,cacheContent:true,preload:false,refreshOnShow:false,handler:"",executeScripts:false,scriptSeparation:true,loadingMessage:"Loading...",isLoaded:false,postCreate:function(args,frag,_899){
if(this.handler!==""){
this.setHandler(this.handler);
}
if(this.isShowing()||this.preload){
this.loadContents();
}
},show:function(){
if(this.refreshOnShow){
this.refresh();
}else{
this.loadContents();
}
dojo.widget.ContentPane.superclass.show.call(this);
},refresh:function(){
this.isLoaded=false;
this.loadContents();
},loadContents:function(){
if(this.isLoaded){
return;
}
if(dojo.lang.isFunction(this.handler)){
this._runHandler();
}else{
if(this.href!=""){
this._downloadExternalContent(this.href,this.cacheContent&&!this.refreshOnShow);
}
}
},setUrl:function(url){
this.href=url;
this.isLoaded=false;
if(this.preload||this.isShowing()){
this.loadContents();
}
},abort:function(){
var bind=this._ioBindObj;
if(!bind||!bind.abort){
return;
}
bind.abort();
delete this._ioBindObj;
},_downloadExternalContent:function(url,_89d){
this.abort();
this._handleDefaults(this.loadingMessage,"onDownloadStart");
var self=this;
this._ioBindObj=dojo.io.bind(this._cacheSetting({url:url,mimetype:"text/html",handler:function(type,data,xhr){
delete self._ioBindObj;
if(type=="load"){
self.onDownloadEnd.call(self,url,data);
}else{
var e={responseText:xhr.responseText,status:xhr.status,statusText:xhr.statusText,responseHeaders:xhr.getAllResponseHeaders(),text:"Error loading '"+url+"' ("+xhr.status+" "+xhr.statusText+")"};
self._handleDefaults.call(self,e,"onDownloadError");
self.onLoad();
}
}},_89d));
},_cacheSetting:function(_8a3,_8a4){
for(var x in this.bindArgs){
if(dojo.lang.isUndefined(_8a3[x])){
_8a3[x]=this.bindArgs[x];
}
}
if(dojo.lang.isUndefined(_8a3.useCache)){
_8a3.useCache=_8a4;
}
if(dojo.lang.isUndefined(_8a3.preventCache)){
_8a3.preventCache=!_8a4;
}
if(dojo.lang.isUndefined(_8a3.mimetype)){
_8a3.mimetype="text/html";
}
return _8a3;
},onLoad:function(e){
this._runStack("_onLoadStack");
this.isLoaded=true;
},onUnLoad:function(e){
dojo.deprecated(this.widgetType+".onUnLoad, use .onUnload (lowercased load)",0.5);
},onUnload:function(e){
this._runStack("_onUnloadStack");
delete this.scriptScope;
if(this.onUnLoad!==dojo.widget.ContentPane.prototype.onUnLoad){
this.onUnLoad.apply(this,arguments);
}
},_runStack:function(_8a9){
var st=this[_8a9];
var err="";
var _8ac=this.scriptScope||window;
for(var i=0;i<st.length;i++){
try{
st[i].call(_8ac);
}
catch(e){
err+="\n"+st[i]+" failed: "+e.description;
}
}
this[_8a9]=[];
if(err.length){
var name=(_8a9=="_onLoadStack")?"addOnLoad":"addOnUnLoad";
this._handleDefaults(name+" failure\n "+err,"onExecError","debug");
}
},addOnLoad:function(obj,func){
this._pushOnStack(this._onLoadStack,obj,func);
},addOnUnload:function(obj,func){
this._pushOnStack(this._onUnloadStack,obj,func);
},addOnUnLoad:function(){
dojo.deprecated(this.widgetType+".addOnUnLoad, use addOnUnload instead. (lowercased Load)",0.5);
this.addOnUnload.apply(this,arguments);
},_pushOnStack:function(_8b3,obj,func){
if(typeof func=="undefined"){
_8b3.push(obj);
}else{
_8b3.push(function(){
obj[func]();
});
}
},destroy:function(){
this.onUnload();
dojo.widget.ContentPane.superclass.destroy.call(this);
},onExecError:function(e){
},onContentError:function(e){
},onDownloadError:function(e){
},onDownloadStart:function(e){
},onDownloadEnd:function(url,data){
data=this.splitAndFixPaths(data,url);
this.setContent(data);
},_handleDefaults:function(e,_8bd,_8be){
if(!_8bd){
_8bd="onContentError";
}
if(dojo.lang.isString(e)){
e={text:e};
}
if(!e.text){
e.text=e.toString();
}
e.toString=function(){
return this.text;
};
if(typeof e.returnValue!="boolean"){
e.returnValue=true;
}
if(typeof e.preventDefault!="function"){
e.preventDefault=function(){
this.returnValue=false;
};
}
this[_8bd](e);
if(e.returnValue){
switch(_8be){
case true:
case "alert":
alert(e.toString());
break;
case "debug":
dojo.debug(e.toString());
break;
default:
if(this._callOnUnload){
this.onUnload();
}
this._callOnUnload=false;
if(arguments.callee._loopStop){
dojo.debug(e.toString());
}else{
arguments.callee._loopStop=true;
this._setContent(e.toString());
}
}
}
arguments.callee._loopStop=false;
},splitAndFixPaths:function(s,url){
var _8c1=[],_8c2=[],tmp=[];
var _8c4=[],_8c5=[],attr=[],_8c7=[];
var str="",path="",fix="",_8cb="",tag="",_8cd="";
if(!url){
url="./";
}
if(s){
var _8ce=/<title[^>]*>([\s\S]*?)<\/title>/i;
while(_8c4=_8ce.exec(s)){
_8c1.push(_8c4[1]);
s=s.substring(0,_8c4.index)+s.substr(_8c4.index+_8c4[0].length);
}
if(this.adjustPaths){
var _8cf=/<[a-z][a-z0-9]*[^>]*\s(?:(?:src|href|style)=[^>])+[^>]*>/i;
var _8d0=/\s(src|href|style)=(['"]?)([\w()\[\]\/.,\\'"-:;#=&?\s@]+?)\2/i;
var _8d1=/^(?:[#]|(?:(?:https?|ftps?|file|javascript|mailto|news):))/;
while(tag=_8cf.exec(s)){
str+=s.substring(0,tag.index);
s=s.substring((tag.index+tag[0].length),s.length);
tag=tag[0];
_8cb="";
while(attr=_8d0.exec(tag)){
path="";
_8cd=attr[3];
switch(attr[1].toLowerCase()){
case "src":
case "href":
if(_8d1.exec(_8cd)){
path=_8cd;
}else{
path=(new dojo.uri.Uri(url,_8cd).toString());
}
break;
case "style":
path=dojo.html.fixPathsInCssText(_8cd,url);
break;
default:
path=_8cd;
}
fix=" "+attr[1]+"="+attr[2]+path+attr[2];
_8cb+=tag.substring(0,attr.index)+fix;
tag=tag.substring((attr.index+attr[0].length),tag.length);
}
str+=_8cb+tag;
}
s=str+s;
}
_8ce=/(?:<(style)[^>]*>([\s\S]*?)<\/style>|<link ([^>]*rel=['"]?stylesheet['"]?[^>]*)>)/i;
while(_8c4=_8ce.exec(s)){
if(_8c4[1]&&_8c4[1].toLowerCase()=="style"){
_8c7.push(dojo.html.fixPathsInCssText(_8c4[2],url));
}else{
if(attr=_8c4[3].match(/href=(['"]?)([^'">]*)\1/i)){
_8c7.push({path:attr[2]});
}
}
s=s.substring(0,_8c4.index)+s.substr(_8c4.index+_8c4[0].length);
}
var _8ce=/<script([^>]*)>([\s\S]*?)<\/script>/i;
var _8d2=/src=(['"]?)([^"']*)\1/i;
var _8d3=/.*(\bdojo\b\.js(?:\.uncompressed\.js)?)$/;
var _8d4=/(?:var )?\bdjConfig\b(?:[\s]*=[\s]*\{[^}]+\}|\.[\w]*[\s]*=[\s]*[^;\n]*)?;?|dojo\.hostenv\.writeIncludes\(\s*\);?/g;
var _8d5=/dojo\.(?:(?:require(?:After)?(?:If)?)|(?:widget\.(?:manager\.)?registerWidgetPackage)|(?:(?:hostenv\.)?setModulePrefix|registerModulePath)|defineNamespace)\((['"]).*?\1\)\s*;?/;
while(_8c4=_8ce.exec(s)){
if(this.executeScripts&&_8c4[1]){
if(attr=_8d2.exec(_8c4[1])){
if(_8d3.exec(attr[2])){
dojo.debug("Security note! inhibit:"+attr[2]+" from  being loaded again.");
}else{
_8c2.push({path:attr[2]});
}
}
}
if(_8c4[2]){
var sc=_8c4[2].replace(_8d4,"");
if(!sc){
continue;
}
while(tmp=_8d5.exec(sc)){
_8c5.push(tmp[0]);
sc=sc.substring(0,tmp.index)+sc.substr(tmp.index+tmp[0].length);
}
if(this.executeScripts){
_8c2.push(sc);
}
}
s=s.substr(0,_8c4.index)+s.substr(_8c4.index+_8c4[0].length);
}
if(this.extractContent){
_8c4=s.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(_8c4){
s=_8c4[1];
}
}
if(this.executeScripts&&this.scriptSeparation){
var _8ce=/(<[a-zA-Z][a-zA-Z0-9]*\s[^>]*?\S=)((['"])[^>]*scriptScope[^>]*>)/;
var _8d7=/([\s'";:\(])scriptScope(.*)/;
str="";
while(tag=_8ce.exec(s)){
tmp=((tag[3]=="'")?"\"":"'");
fix="";
str+=s.substring(0,tag.index)+tag[1];
while(attr=_8d7.exec(tag[2])){
tag[2]=tag[2].substring(0,attr.index)+attr[1]+"dojo.widget.byId("+tmp+this.widgetId+tmp+").scriptScope"+attr[2];
}
str+=tag[2];
s=s.substr(tag.index+tag[0].length);
}
s=str+s;
}
}
return {"xml":s,"styles":_8c7,"titles":_8c1,"requires":_8c5,"scripts":_8c2,"url":url};
},_setContent:function(cont){
this.destroyChildren();
for(var i=0;i<this._styleNodes.length;i++){
if(this._styleNodes[i]&&this._styleNodes[i].parentNode){
this._styleNodes[i].parentNode.removeChild(this._styleNodes[i]);
}
}
this._styleNodes=[];
try{
var node=this.containerNode||this.domNode;
while(node.firstChild){
dojo.html.destroyNode(node.firstChild);
}
if(typeof cont!="string"){
node.appendChild(cont);
}else{
node.innerHTML=cont;
}
}
catch(e){
e.text="Couldn't load content:"+e.description;
this._handleDefaults(e,"onContentError");
}
},setContent:function(data){
this.abort();
if(this._callOnUnload){
this.onUnload();
}
this._callOnUnload=true;
if(!data||dojo.html.isNode(data)){
this._setContent(data);
this.onResized();
this.onLoad();
}else{
if(typeof data.xml!="string"){
this.href="";
data=this.splitAndFixPaths(data);
}
this._setContent(data.xml);
for(var i=0;i<data.styles.length;i++){
if(data.styles[i].path){
this._styleNodes.push(dojo.html.insertCssFile(data.styles[i].path,dojo.doc(),false,true));
}else{
this._styleNodes.push(dojo.html.insertCssText(data.styles[i]));
}
}
if(this.parseContent){
for(var i=0;i<data.requires.length;i++){
try{
eval(data.requires[i]);
}
catch(e){
e.text="ContentPane: error in package loading calls, "+(e.description||e);
this._handleDefaults(e,"onContentError","debug");
}
}
}
var _8dd=this;
function asyncParse(){
if(_8dd.executeScripts){
_8dd._executeScripts(data.scripts);
}
if(_8dd.parseContent){
var node=_8dd.containerNode||_8dd.domNode;
var _8df=new dojo.xml.Parse();
var frag=_8df.parseElement(node,null,true);
dojo.widget.getParser().createSubComponents(frag,_8dd);
}
_8dd.onResized();
_8dd.onLoad();
}
if(dojo.hostenv.isXDomain&&data.requires.length){
dojo.addOnLoad(asyncParse);
}else{
asyncParse();
}
}
},setHandler:function(_8e1){
var fcn=dojo.lang.isFunction(_8e1)?_8e1:window[_8e1];
if(!dojo.lang.isFunction(fcn)){
this._handleDefaults("Unable to set handler, '"+_8e1+"' not a function.","onExecError",true);
return;
}
this.handler=function(){
return fcn.apply(this,arguments);
};
},_runHandler:function(){
var ret=true;
if(dojo.lang.isFunction(this.handler)){
this.handler(this,this.domNode);
ret=false;
}
this.onLoad();
return ret;
},_executeScripts:function(_8e4){
var self=this;
var tmp="",code="";
for(var i=0;i<_8e4.length;i++){
if(_8e4[i].path){
dojo.io.bind(this._cacheSetting({"url":_8e4[i].path,"load":function(type,_8ea){
dojo.lang.hitch(self,tmp=";"+_8ea);
},"error":function(type,_8ec){
_8ec.text=type+" downloading remote script";
self._handleDefaults.call(self,_8ec,"onExecError","debug");
},"mimetype":"text/plain","sync":true},this.cacheContent));
code+=tmp;
}else{
code+=_8e4[i];
}
}
try{
if(this.scriptSeparation){
delete this.scriptScope;
this.scriptScope=new (new Function("_container_",code+"; return this;"))(self);
}else{
var djg=dojo.global();
if(djg.execScript){
djg.execScript(code);
}else{
var djd=dojo.doc();
var sc=djd.createElement("script");
sc.appendChild(djd.createTextNode(code));
(this.containerNode||this.domNode).appendChild(sc);
}
}
}
catch(e){
e.text="Error running scripts from content:\n"+e.description;
this._handleDefaults(e,"onExecError","debug");
}
}});
dojo.provide("dojo.html.iframe");
dojo.html.iframeContentWindow=function(_8f0){
var win=dojo.html.getDocumentWindow(dojo.html.iframeContentDocument(_8f0))||dojo.html.iframeContentDocument(_8f0).__parent__||(_8f0.name&&document.frames[_8f0.name])||null;
return win;
};
dojo.html.iframeContentDocument=function(_8f2){
var doc=_8f2.contentDocument||((_8f2.contentWindow)&&(_8f2.contentWindow.document))||((_8f2.name)&&(document.frames[_8f2.name])&&(document.frames[_8f2.name].document))||null;
return doc;
};
dojo.html.BackgroundIframe=function(node){
if(dojo.render.html.ie55||dojo.render.html.ie60){
var html="<iframe src='javascript:false'"+" style='position: absolute; left: 0px; top: 0px; width: 100%; height: 100%;"+"z-index: -1; filter:Alpha(Opacity=\"0\");' "+">";
this.iframe=dojo.doc().createElement(html);
this.iframe.tabIndex=-1;
if(node){
node.appendChild(this.iframe);
this.domNode=node;
}else{
dojo.body().appendChild(this.iframe);
this.iframe.style.display="none";
}
}
};
dojo.lang.extend(dojo.html.BackgroundIframe,{iframe:null,onResized:function(){
if(this.iframe&&this.domNode&&this.domNode.parentNode){
var _8f6=dojo.html.getMarginBox(this.domNode);
if(_8f6.width==0||_8f6.height==0){
dojo.lang.setTimeout(this,this.onResized,100);
return;
}
this.iframe.style.width=_8f6.width+"px";
this.iframe.style.height=_8f6.height+"px";
}
},size:function(node){
if(!this.iframe){
return;
}
var _8f8=dojo.html.toCoordinateObject(node,true,dojo.html.boxSizing.BORDER_BOX);
with(this.iframe.style){
width=_8f8.width+"px";
height=_8f8.height+"px";
left=_8f8.left+"px";
top=_8f8.top+"px";
}
},setZIndex:function(node){
if(!this.iframe){
return;
}
if(dojo.dom.isNode(node)){
this.iframe.style.zIndex=dojo.html.getStyle(node,"z-index")-1;
}else{
if(!isNaN(node)){
this.iframe.style.zIndex=node;
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
dojo.provide("dojo.html.selection");
dojo.html.selectionType={NONE:0,TEXT:1,CONTROL:2};
dojo.html.clearSelection=function(){
var _8fa=dojo.global();
var _8fb=dojo.doc();
try{
if(_8fa["getSelection"]){
if(dojo.render.html.safari){
_8fa.getSelection().collapse();
}else{
_8fa.getSelection().removeAllRanges();
}
}else{
if(_8fb.selection){
if(_8fb.selection.empty){
_8fb.selection.empty();
}else{
if(_8fb.selection.clear){
_8fb.selection.clear();
}
}
}
}
return true;
}
catch(e){
dojo.debug(e);
return false;
}
};
dojo.html.disableSelection=function(_8fc){
_8fc=dojo.byId(_8fc)||dojo.body();
var h=dojo.render.html;
if(h.mozilla){
_8fc.style.MozUserSelect="none";
}else{
if(h.safari){
_8fc.style.KhtmlUserSelect="none";
}else{
if(h.ie){
_8fc.unselectable="on";
}else{
return false;
}
}
}
return true;
};
dojo.html.enableSelection=function(_8fe){
_8fe=dojo.byId(_8fe)||dojo.body();
var h=dojo.render.html;
if(h.mozilla){
_8fe.style.MozUserSelect="";
}else{
if(h.safari){
_8fe.style.KhtmlUserSelect="";
}else{
if(h.ie){
_8fe.unselectable="off";
}else{
return false;
}
}
}
return true;
};
dojo.html.selectElement=function(_900){
dojo.deprecated("dojo.html.selectElement","replaced by dojo.html.selection.selectElementChildren",0.5);
};
dojo.html.selectInputText=function(_901){
var _902=dojo.global();
var _903=dojo.doc();
_901=dojo.byId(_901);
if(_903["selection"]&&dojo.body()["createTextRange"]){
var _904=_901.createTextRange();
_904.moveStart("character",0);
_904.moveEnd("character",_901.value.length);
_904.select();
}else{
if(_902["getSelection"]){
var _905=_902.getSelection();
_901.setSelectionRange(0,_901.value.length);
}
}
_901.focus();
};
dojo.html.isSelectionCollapsed=function(){
dojo.deprecated("dojo.html.isSelectionCollapsed","replaced by dojo.html.selection.isCollapsed",0.5);
return dojo.html.selection.isCollapsed();
};
dojo.lang.mixin(dojo.html.selection,{getType:function(){
if(dojo.doc()["selection"]){
return dojo.html.selectionType[dojo.doc().selection.type.toUpperCase()];
}else{
var _906=dojo.html.selectionType.TEXT;
var oSel;
try{
oSel=dojo.global().getSelection();
}
catch(e){
}
if(oSel&&oSel.rangeCount==1){
var _908=oSel.getRangeAt(0);
if(_908.startContainer==_908.endContainer&&(_908.endOffset-_908.startOffset)==1&&_908.startContainer.nodeType!=dojo.dom.TEXT_NODE){
_906=dojo.html.selectionType.CONTROL;
}
}
return _906;
}
},isCollapsed:function(){
var _909=dojo.global();
var _90a=dojo.doc();
if(_90a["selection"]){
return _90a.selection.createRange().text=="";
}else{
if(_909["getSelection"]){
var _90b=_909.getSelection();
if(dojo.lang.isString(_90b)){
return _90b=="";
}else{
return _90b.isCollapsed||_90b.toString()=="";
}
}
}
},getSelectedElement:function(){
if(dojo.html.selection.getType()==dojo.html.selectionType.CONTROL){
if(dojo.doc()["selection"]){
var _90c=dojo.doc().selection.createRange();
if(_90c&&_90c.item){
return dojo.doc().selection.createRange().item(0);
}
}else{
var _90d=dojo.global().getSelection();
return _90d.anchorNode.childNodes[_90d.anchorOffset];
}
}
},getParentElement:function(){
if(dojo.html.selection.getType()==dojo.html.selectionType.CONTROL){
var p=dojo.html.selection.getSelectedElement();
if(p){
return p.parentNode;
}
}else{
if(dojo.doc()["selection"]){
return dojo.doc().selection.createRange().parentElement();
}else{
var _90f=dojo.global().getSelection();
if(_90f){
var node=_90f.anchorNode;
while(node&&node.nodeType!=dojo.dom.ELEMENT_NODE){
node=node.parentNode;
}
return node;
}
}
}
},getSelectedText:function(){
if(dojo.doc()["selection"]){
if(dojo.html.selection.getType()==dojo.html.selectionType.CONTROL){
return null;
}
return dojo.doc().selection.createRange().text;
}else{
var _911=dojo.global().getSelection();
if(_911){
return _911.toString();
}
}
},getSelectedHtml:function(){
if(dojo.doc()["selection"]){
if(dojo.html.selection.getType()==dojo.html.selectionType.CONTROL){
return null;
}
return dojo.doc().selection.createRange().htmlText;
}else{
var _912=dojo.global().getSelection();
if(_912&&_912.rangeCount){
var frag=_912.getRangeAt(0).cloneContents();
var div=document.createElement("div");
div.appendChild(frag);
return div.innerHTML;
}
return null;
}
},hasAncestorElement:function(_915){
return (dojo.html.selection.getAncestorElement.apply(this,arguments)!=null);
},getAncestorElement:function(_916){
var node=dojo.html.selection.getSelectedElement()||dojo.html.selection.getParentElement();
while(node){
if(dojo.html.selection.isTag(node,arguments).length>0){
return node;
}
node=node.parentNode;
}
return null;
},isTag:function(node,tags){
if(node&&node.tagName){
for(var i=0;i<tags.length;i++){
if(node.tagName.toLowerCase()==String(tags[i]).toLowerCase()){
return String(tags[i]).toLowerCase();
}
}
}
return "";
},selectElement:function(_91b){
var _91c=dojo.global();
var _91d=dojo.doc();
_91b=dojo.byId(_91b);
if(_91d.selection&&dojo.body().createTextRange){
try{
var _91e=dojo.body().createControlRange();
_91e.addElement(_91b);
_91e.select();
}
catch(e){
dojo.html.selection.selectElementChildren(_91b);
}
}else{
if(_91c["getSelection"]){
var _91f=_91c.getSelection();
if(_91f["removeAllRanges"]){
var _91e=_91d.createRange();
_91e.selectNode(_91b);
_91f.removeAllRanges();
_91f.addRange(_91e);
}
}
}
},selectElementChildren:function(_920){
var _921=dojo.global();
var _922=dojo.doc();
_920=dojo.byId(_920);
if(_922.selection&&dojo.body().createTextRange){
var _923=dojo.body().createTextRange();
_923.moveToElementText(_920);
_923.select();
}else{
if(_921["getSelection"]){
var _924=_921.getSelection();
if(_924["setBaseAndExtent"]){
_924.setBaseAndExtent(_920,0,_920,_920.innerText.length-1);
}else{
if(_924["selectAllChildren"]){
_924.selectAllChildren(_920);
}
}
}
}
},getBookmark:function(){
var _925;
var _926=dojo.doc();
if(_926["selection"]){
var _927=_926.selection.createRange();
_925=_927.getBookmark();
}else{
var _928;
try{
_928=dojo.global().getSelection();
}
catch(e){
}
if(_928){
var _927=_928.getRangeAt(0);
_925=_927.cloneRange();
}else{
dojo.debug("No idea how to store the current selection for this browser!");
}
}
return _925;
},moveToBookmark:function(_929){
var _92a=dojo.doc();
if(_92a["selection"]){
var _92b=_92a.selection.createRange();
_92b.moveToBookmark(_929);
_92b.select();
}else{
var _92c;
try{
_92c=dojo.global().getSelection();
}
catch(e){
}
if(_92c&&_92c["removeAllRanges"]){
_92c.removeAllRanges();
_92c.addRange(_929);
}else{
dojo.debug("No idea how to restore selection for this browser!");
}
}
},collapse:function(_92d){
if(dojo.global()["getSelection"]){
var _92e=dojo.global().getSelection();
if(_92e.removeAllRanges){
if(_92d){
_92e.collapseToStart();
}else{
_92e.collapseToEnd();
}
}else{
dojo.global().getSelection().collapse(_92d);
}
}else{
if(dojo.doc().selection){
var _92f=dojo.doc().selection.createRange();
_92f.collapse(_92d);
_92f.select();
}
}
},remove:function(){
if(dojo.doc().selection){
var _930=dojo.doc().selection;
if(_930.type.toUpperCase()!="NONE"){
_930.clear();
}
return _930;
}else{
var _930=dojo.global().getSelection();
for(var i=0;i<_930.rangeCount;i++){
_930.getRangeAt(i).deleteContents();
}
return _930;
}
}});
dojo.provide("dojo.lfx.shadow");
dojo.lfx.shadow=function(node){
this.shadowPng=dojo.uri.dojoUri("src/html/images/shadow");
this.shadowThickness=8;
this.shadowOffset=15;
this.init(node);
};
dojo.extend(dojo.lfx.shadow,{init:function(node){
this.node=node;
this.pieces={};
var x1=-1*this.shadowThickness;
var y0=this.shadowOffset;
var y1=this.shadowOffset+this.shadowThickness;
this._makePiece("tl","top",y0,"left",x1);
this._makePiece("l","top",y1,"left",x1,"scale");
this._makePiece("tr","top",y0,"left",0);
this._makePiece("r","top",y1,"left",0,"scale");
this._makePiece("bl","top",0,"left",x1);
this._makePiece("b","top",0,"left",0,"crop");
this._makePiece("br","top",0,"left",0);
},_makePiece:function(name,_938,_939,_93a,_93b,_93c){
var img;
var url=this.shadowPng+name.toUpperCase()+".png";
if(dojo.render.html.ie55||dojo.render.html.ie60){
img=dojo.doc().createElement("div");
img.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+url+"'"+(_93c?", sizingMethod='"+_93c+"'":"")+")";
}else{
img=dojo.doc().createElement("img");
img.src=url;
}
img.style.position="absolute";
img.style[_938]=_939+"px";
img.style[_93a]=_93b+"px";
img.style.width=this.shadowThickness+"px";
img.style.height=this.shadowThickness+"px";
this.pieces[name]=img;
this.node.appendChild(img);
},size:function(_93f,_940){
var _941=_940-(this.shadowOffset+this.shadowThickness+1);
if(_941<0){
_941=0;
}
if(_940<1){
_940=1;
}
if(_93f<1){
_93f=1;
}
with(this.pieces){
l.style.height=_941+"px";
r.style.height=_941+"px";
b.style.width=(_93f-1)+"px";
bl.style.top=(_940-1)+"px";
b.style.top=(_940-1)+"px";
br.style.top=(_940-1)+"px";
tr.style.left=(_93f-1)+"px";
r.style.left=(_93f-1)+"px";
br.style.left=(_93f-1)+"px";
}
}});
dojo.provide("dojo.widget.html.layout");
dojo.widget.html.layout=function(_942,_943,_944){
dojo.html.addClass(_942,"dojoLayoutContainer");
_943=dojo.lang.filter(_943,function(_945,idx){
_945.idx=idx;
return dojo.lang.inArray(["top","bottom","left","right","client","flood"],_945.layoutAlign);
});
if(_944&&_944!="none"){
var rank=function(_948){
switch(_948.layoutAlign){
case "flood":
return 1;
case "left":
case "right":
return (_944=="left-right")?2:3;
case "top":
case "bottom":
return (_944=="left-right")?3:2;
default:
return 4;
}
};
_943.sort(function(a,b){
return (rank(a)-rank(b))||(a.idx-b.idx);
});
}
var f={top:dojo.html.getPixelValue(_942,"padding-top",true),left:dojo.html.getPixelValue(_942,"padding-left",true)};
dojo.lang.mixin(f,dojo.html.getContentBox(_942));
dojo.lang.forEach(_943,function(_94c){
var elm=_94c.domNode;
var pos=_94c.layoutAlign;
with(elm.style){
left=f.left+"px";
top=f.top+"px";
bottom="auto";
right="auto";
}
dojo.html.addClass(elm,"dojoAlign"+dojo.string.capitalize(pos));
if((pos=="top")||(pos=="bottom")){
dojo.html.setMarginBox(elm,{width:f.width});
var h=dojo.html.getMarginBox(elm).height;
f.height-=h;
if(pos=="top"){
f.top+=h;
}else{
elm.style.top=f.top+f.height+"px";
}
if(_94c.onResized){
_94c.onResized();
}
}else{
if(pos=="left"||pos=="right"){
var w=dojo.html.getMarginBox(elm).width;
if(_94c.resizeTo){
_94c.resizeTo(w,f.height);
}else{
dojo.html.setMarginBox(elm,{width:w,height:f.height});
}
f.width-=w;
if(pos=="left"){
f.left+=w;
}else{
elm.style.left=f.left+f.width+"px";
}
}else{
if(pos=="flood"||pos=="client"){
if(_94c.resizeTo){
_94c.resizeTo(f.width,f.height);
}else{
dojo.html.setMarginBox(elm,{width:f.width,height:f.height});
}
}
}
}
});
};
dojo.html.insertCssText(".dojoLayoutContainer{ position: relative; display: block; overflow: hidden; }\n"+"body .dojoAlignTop, body .dojoAlignBottom, body .dojoAlignLeft, body .dojoAlignRight { position: absolute; overflow: hidden; }\n"+"body .dojoAlignClient { position: absolute }\n"+".dojoAlignClient { overflow: auto; }\n");
dojo.provide("dojo.dnd.DragAndDrop");
dojo.declare("dojo.dnd.DragSource",null,{type:"",onDragEnd:function(evt){
},onDragStart:function(evt){
},onSelected:function(evt){
},unregister:function(){
dojo.dnd.dragManager.unregisterDragSource(this);
},reregister:function(){
dojo.dnd.dragManager.registerDragSource(this);
}});
dojo.declare("dojo.dnd.DragObject",null,{type:"",register:function(){
var dm=dojo.dnd.dragManager;
if(dm["registerDragObject"]){
dm.registerDragObject(this);
}
},onDragStart:function(evt){
},onDragMove:function(evt){
},onDragOver:function(evt){
},onDragOut:function(evt){
},onDragEnd:function(evt){
},onDragLeave:dojo.lang.forward("onDragOut"),onDragEnter:dojo.lang.forward("onDragOver"),ondragout:dojo.lang.forward("onDragOut"),ondragover:dojo.lang.forward("onDragOver")});
dojo.declare("dojo.dnd.DropTarget",null,{acceptsType:function(type){
if(!dojo.lang.inArray(this.acceptedTypes,"*")){
if(!dojo.lang.inArray(this.acceptedTypes,type)){
return false;
}
}
return true;
},accepts:function(_95b){
if(!dojo.lang.inArray(this.acceptedTypes,"*")){
for(var i=0;i<_95b.length;i++){
if(!dojo.lang.inArray(this.acceptedTypes,_95b[i].type)){
return false;
}
}
}
return true;
},unregister:function(){
dojo.dnd.dragManager.unregisterDropTarget(this);
},onDragOver:function(evt){
},onDragOut:function(evt){
},onDragMove:function(evt){
},onDropStart:function(evt){
},onDrop:function(evt){
},onDropEnd:function(){
}},function(){
this.acceptedTypes=[];
});
dojo.dnd.DragEvent=function(){
this.dragSource=null;
this.dragObject=null;
this.target=null;
this.eventStatus="success";
};
dojo.declare("dojo.dnd.DragManager",null,{selectedSources:[],dragObjects:[],dragSources:[],registerDragSource:function(_962){
},dropTargets:[],registerDropTarget:function(_963){
},lastDragTarget:null,currentDragTarget:null,onKeyDown:function(){
},onMouseOut:function(){
},onMouseMove:function(){
},onMouseUp:function(){
}});
dojo.provide("dojo.dnd.HtmlDragManager");
dojo.declare("dojo.dnd.HtmlDragManager",dojo.dnd.DragManager,{disabled:false,nestedTargets:false,mouseDownTimer:null,dsCounter:0,dsPrefix:"dojoDragSource",dropTargetDimensions:[],currentDropTarget:null,previousDropTarget:null,_dragTriggered:false,selectedSources:[],dragObjects:[],dragSources:[],currentX:null,currentY:null,lastX:null,lastY:null,mouseDownX:null,mouseDownY:null,threshold:7,dropAcceptable:false,cancelEvent:function(e){
e.stopPropagation();
e.preventDefault();
},registerDragSource:function(ds){
if(ds["domNode"]){
var dp=this.dsPrefix;
var _967=dp+"Idx_"+(this.dsCounter++);
ds.dragSourceId=_967;
this.dragSources[_967]=ds;
ds.domNode.setAttribute(dp,_967);
if(dojo.render.html.ie){
dojo.event.browser.addListener(ds.domNode,"ondragstart",this.cancelEvent);
}
}
},unregisterDragSource:function(ds){
if(ds["domNode"]){
var dp=this.dsPrefix;
var _96a=ds.dragSourceId;
delete ds.dragSourceId;
delete this.dragSources[_96a];
ds.domNode.setAttribute(dp,null);
if(dojo.render.html.ie){
dojo.event.browser.removeListener(ds.domNode,"ondragstart",this.cancelEvent);
}
}
},registerDropTarget:function(dt){
this.dropTargets.push(dt);
},unregisterDropTarget:function(dt){
var _96d=dojo.lang.find(this.dropTargets,dt,true);
if(_96d>=0){
this.dropTargets.splice(_96d,1);
}
},getDragSource:function(e){
var tn=e.target;
if(tn===dojo.body()){
return;
}
var ta=dojo.html.getAttribute(tn,this.dsPrefix);
while((!ta)&&(tn)){
tn=tn.parentNode;
if((!tn)||(tn===dojo.body())){
return;
}
ta=dojo.html.getAttribute(tn,this.dsPrefix);
}
return this.dragSources[ta];
},onKeyDown:function(e){
},onMouseDown:function(e){
if(this.disabled){
return;
}
if(dojo.render.html.ie){
if(e.button!=1){
return;
}
}else{
if(e.which!=1){
return;
}
}
var _973=e.target.nodeType==dojo.html.TEXT_NODE?e.target.parentNode:e.target;
if(dojo.html.isTag(_973,"button","textarea","input","select","option")){
return;
}
var ds=this.getDragSource(e);
if(!ds){
return;
}
if(!dojo.lang.inArray(this.selectedSources,ds)){
this.selectedSources.push(ds);
ds.onSelected();
}
this.mouseDownX=e.pageX;
this.mouseDownY=e.pageY;
e.preventDefault();
dojo.event.connect(document,"onmousemove",this,"onMouseMove");
},onMouseUp:function(e,_976){
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
dojo.lang.forEach(this.dragObjects,function(_977){
var ret=null;
if(!_977){
return;
}
if(this.currentDropTarget){
e.dragObject=_977;
var ce=this.currentDropTarget.domNode.childNodes;
if(ce.length>0){
e.dropTarget=ce[0];
while(e.dropTarget==_977.domNode){
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
_977.dragSource.onDragEnd(e);
}
catch(err){
var _97a={};
for(var i in e){
if(i=="type"){
_97a.type="mouseup";
continue;
}
_97a[i]=e[i];
}
_977.dragSource.onDragEnd(_97a);
}
},function(){
_977.onDragEnd(e);
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
dojo.event.disconnect(document,"onmousemove",this,"onMouseMove");
this.currentDropTarget=null;
},onScroll:function(){
for(var i=0;i<this.dragObjects.length;i++){
if(this.dragObjects[i].updateDragOffset){
this.dragObjects[i].updateDragOffset();
}
}
if(this.dragObjects.length){
this.cacheTargetLocations();
}
},_dragStartDistance:function(x,y){
if((!this.mouseDownX)||(!this.mouseDownX)){
return;
}
var dx=Math.abs(x-this.mouseDownX);
var dx2=dx*dx;
var dy=Math.abs(y-this.mouseDownY);
var dy2=dy*dy;
return parseInt(Math.sqrt(dx2+dy2),10);
},cacheTargetLocations:function(){
dojo.profile.start("cacheTargetLocations");
this.dropTargetDimensions=[];
dojo.lang.forEach(this.dropTargets,function(_983){
var tn=_983.domNode;
if(!tn||!_983.accepts([this.dragSource])){
return;
}
var abs=dojo.html.getAbsolutePosition(tn,true);
var bb=dojo.html.getBorderBox(tn);
this.dropTargetDimensions.push([[abs.x,abs.y],[abs.x+bb.width,abs.y+bb.height],_983]);
},this);
dojo.profile.end("cacheTargetLocations");
},onMouseMove:function(e){
if((dojo.render.html.ie)&&(e.button!=1)){
this.currentDropTarget=null;
this.onMouseUp(e,true);
return;
}
if((this.selectedSources.length)&&(!this.dragObjects.length)){
var dx;
var dy;
if(!this._dragTriggered){
this._dragTriggered=(this._dragStartDistance(e.pageX,e.pageY)>this.threshold);
if(!this._dragTriggered){
return;
}
dx=e.pageX-this.mouseDownX;
dy=e.pageY-this.mouseDownY;
}
this.dragSource=this.selectedSources[0];
dojo.lang.forEach(this.selectedSources,function(_98a){
if(!_98a){
return;
}
var tdo=_98a.onDragStart(e);
if(tdo){
tdo.onDragStart(e);
tdo.dragOffset.y+=dy;
tdo.dragOffset.x+=dx;
tdo.dragSource=_98a;
this.dragObjects.push(tdo);
}
},this);
this.previousDropTarget=null;
this.cacheTargetLocations();
}
dojo.lang.forEach(this.dragObjects,function(_98c){
if(_98c){
_98c.onDragMove(e);
}
});
if(this.currentDropTarget){
var c=dojo.html.toCoordinateObject(this.currentDropTarget.domNode,true);
var dtp=[[c.x,c.y],[c.x+c.width,c.y+c.height]];
}
if((!this.nestedTargets)&&(dtp)&&(this.isInsideBox(e,dtp))){
if(this.dropAcceptable){
this.currentDropTarget.onDragMove(e,this.dragObjects);
}
}else{
var _98f=this.findBestTarget(e);
if(_98f.target===null){
if(this.currentDropTarget){
this.currentDropTarget.onDragOut(e);
this.previousDropTarget=this.currentDropTarget;
this.currentDropTarget=null;
}
this.dropAcceptable=false;
return;
}
if(this.currentDropTarget!==_98f.target){
if(this.currentDropTarget){
this.previousDropTarget=this.currentDropTarget;
this.currentDropTarget.onDragOut(e);
}
this.currentDropTarget=_98f.target;
e.dragObjects=this.dragObjects;
this.dropAcceptable=this.currentDropTarget.onDragOver(e);
}else{
if(this.dropAcceptable){
this.currentDropTarget.onDragMove(e,this.dragObjects);
}
}
}
},findBestTarget:function(e){
var _991=this;
var _992=new Object();
_992.target=null;
_992.points=null;
dojo.lang.every(this.dropTargetDimensions,function(_993){
if(!_991.isInsideBox(e,_993)){
return true;
}
_992.target=_993[2];
_992.points=_993;
return Boolean(_991.nestedTargets);
});
return _992;
},isInsideBox:function(e,_995){
if((e.pageX>_995[0][0])&&(e.pageX<_995[1][0])&&(e.pageY>_995[0][1])&&(e.pageY<_995[1][1])){
return true;
}
return false;
},onMouseOver:function(e){
},onMouseOut:function(e){
}});
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
dojo.provide("dojo.dnd.HtmlDragAndDrop");
dojo.declare("dojo.dnd.HtmlDragSource",dojo.dnd.DragSource,{dragClass:"",onDragStart:function(){
var _99a=new dojo.dnd.HtmlDragObject(this.dragObject,this.type);
if(this.dragClass){
_99a.dragClass=this.dragClass;
}
if(this.constrainToContainer){
_99a.constrainTo(this.constrainingContainer||this.domNode.parentNode);
}
return _99a;
},setDragHandle:function(node){
node=dojo.byId(node);
dojo.dnd.dragManager.unregisterDragSource(this);
this.domNode=node;
dojo.dnd.dragManager.registerDragSource(this);
},setDragTarget:function(node){
this.dragObject=node;
},constrainTo:function(_99d){
this.constrainToContainer=true;
if(_99d){
this.constrainingContainer=_99d;
}
},onSelected:function(){
for(var i=0;i<this.dragObjects.length;i++){
dojo.dnd.dragManager.selectedSources.push(new dojo.dnd.HtmlDragSource(this.dragObjects[i]));
}
},addDragObjects:function(el){
for(var i=0;i<arguments.length;i++){
this.dragObjects.push(dojo.byId(arguments[i]));
}
}},function(node,type){
node=dojo.byId(node);
this.dragObjects=[];
this.constrainToContainer=false;
if(node){
this.domNode=node;
this.dragObject=node;
this.type=(type)||(this.domNode.nodeName.toLowerCase());
dojo.dnd.DragSource.prototype.reregister.call(this);
}
});
dojo.declare("dojo.dnd.HtmlDragObject",dojo.dnd.DragObject,{dragClass:"",opacity:0.5,createIframe:true,disableX:false,disableY:false,createDragNode:function(){
var node=this.domNode.cloneNode(true);
if(this.dragClass){
dojo.html.addClass(node,this.dragClass);
}
if(this.opacity<1){
dojo.html.setOpacity(node,this.opacity);
}
var ltn=node.tagName.toLowerCase();
var isTr=(ltn=="tr");
if((isTr)||(ltn=="tbody")){
var doc=this.domNode.ownerDocument;
var _9a7=doc.createElement("table");
if(isTr){
var _9a8=doc.createElement("tbody");
_9a7.appendChild(_9a8);
_9a8.appendChild(node);
}else{
_9a7.appendChild(node);
}
var _9a9=((isTr)?this.domNode:this.domNode.firstChild);
var _9aa=((isTr)?node:node.firstChild);
var _9ab=tdp.childNodes;
var _9ac=_9aa.childNodes;
for(var i=0;i<_9ab.length;i++){
if((_9ac[i])&&(_9ac[i].style)){
_9ac[i].style.width=dojo.html.getContentBox(_9ab[i]).width+"px";
}
}
node=_9a7;
}
if((dojo.render.html.ie55||dojo.render.html.ie60)&&this.createIframe){
with(node.style){
top="0px";
left="0px";
}
var _9ae=document.createElement("div");
_9ae.appendChild(node);
this.bgIframe=new dojo.html.BackgroundIframe(_9ae);
_9ae.appendChild(this.bgIframe.iframe);
node=_9ae;
}
node.style.zIndex=999;
return node;
},onDragStart:function(e){
dojo.html.clearSelection();
this.scrollOffset=dojo.html.getScroll().offset;
this.dragStartPosition=dojo.html.getAbsolutePosition(this.domNode,true);
this.dragOffset={y:this.dragStartPosition.y-e.pageY,x:this.dragStartPosition.x-e.pageX};
this.dragClone=this.createDragNode();
this.containingBlockPosition=this.domNode.offsetParent?dojo.html.getAbsolutePosition(this.domNode.offsetParent,true):{x:0,y:0};
if(this.constrainToContainer){
this.constraints=this.getConstraints();
}
with(this.dragClone.style){
position="absolute";
top=this.dragOffset.y+e.pageY+"px";
left=this.dragOffset.x+e.pageX+"px";
}
dojo.body().appendChild(this.dragClone);
dojo.event.topic.publish("dragStart",{source:this});
},getConstraints:function(){
if(this.constrainingContainer.nodeName.toLowerCase()=="body"){
var _9b0=dojo.html.getViewport();
var _9b1=_9b0.width;
var _9b2=_9b0.height;
var _9b3=dojo.html.getScroll().offset;
var x=_9b3.x;
var y=_9b3.y;
}else{
var _9b6=dojo.html.getContentBox(this.constrainingContainer);
_9b1=_9b6.width;
_9b2=_9b6.height;
x=this.containingBlockPosition.x+dojo.html.getPixelValue(this.constrainingContainer,"padding-left",true)+dojo.html.getBorderExtent(this.constrainingContainer,"left");
y=this.containingBlockPosition.y+dojo.html.getPixelValue(this.constrainingContainer,"padding-top",true)+dojo.html.getBorderExtent(this.constrainingContainer,"top");
}
var mb=dojo.html.getMarginBox(this.domNode);
return {minX:x,minY:y,maxX:x+_9b1-mb.width,maxY:y+_9b2-mb.height};
},updateDragOffset:function(){
var _9b8=dojo.html.getScroll().offset;
if(_9b8.y!=this.scrollOffset.y){
var diff=_9b8.y-this.scrollOffset.y;
this.dragOffset.y+=diff;
this.scrollOffset.y=_9b8.y;
}
if(_9b8.x!=this.scrollOffset.x){
var diff=_9b8.x-this.scrollOffset.x;
this.dragOffset.x+=diff;
this.scrollOffset.x=_9b8.x;
}
},onDragMove:function(e){
this.updateDragOffset();
var x=this.dragOffset.x+e.pageX;
var y=this.dragOffset.y+e.pageY;
if(this.constrainToContainer){
if(x<this.constraints.minX){
x=this.constraints.minX;
}
if(y<this.constraints.minY){
y=this.constraints.minY;
}
if(x>this.constraints.maxX){
x=this.constraints.maxX;
}
if(y>this.constraints.maxY){
y=this.constraints.maxY;
}
}
this.setAbsolutePosition(x,y);
dojo.event.topic.publish("dragMove",{source:this});
},setAbsolutePosition:function(x,y){
if(!this.disableY){
this.dragClone.style.top=y+"px";
}
if(!this.disableX){
this.dragClone.style.left=x+"px";
}
},onDragEnd:function(e){
switch(e.dragStatus){
case "dropSuccess":
dojo.html.removeNode(this.dragClone);
this.dragClone=null;
break;
case "dropFailure":
var _9c0=dojo.html.getAbsolutePosition(this.dragClone,true);
var _9c1={left:this.dragStartPosition.x+1,top:this.dragStartPosition.y+1};
var anim=dojo.lfx.slideTo(this.dragClone,_9c1,300);
var _9c3=this;
dojo.event.connect(anim,"onEnd",function(e){
dojo.html.removeNode(_9c3.dragClone);
_9c3.dragClone=null;
});
anim.play();
break;
}
dojo.event.topic.publish("dragEnd",{source:this});
},constrainTo:function(_9c5){
this.constrainToContainer=true;
if(_9c5){
this.constrainingContainer=_9c5;
}else{
this.constrainingContainer=this.domNode.parentNode;
}
}},function(node,type){
this.domNode=dojo.byId(node);
this.type=type;
this.constrainToContainer=false;
this.dragSource=null;
dojo.dnd.DragObject.prototype.register.call(this);
});
dojo.declare("dojo.dnd.HtmlDropTarget",dojo.dnd.DropTarget,{vertical:false,onDragOver:function(e){
if(!this.accepts(e.dragObjects)){
return false;
}
this.childBoxes=[];
for(var i=0,_9ca;i<this.domNode.childNodes.length;i++){
_9ca=this.domNode.childNodes[i];
if(_9ca.nodeType!=dojo.html.ELEMENT_NODE){
continue;
}
var pos=dojo.html.getAbsolutePosition(_9ca,true);
var _9cc=dojo.html.getBorderBox(_9ca);
this.childBoxes.push({top:pos.y,bottom:pos.y+_9cc.height,left:pos.x,right:pos.x+_9cc.width,height:_9cc.height,width:_9cc.width,node:_9ca});
}
return true;
},_getNodeUnderMouse:function(e){
for(var i=0,_9cf;i<this.childBoxes.length;i++){
with(this.childBoxes[i]){
if(e.pageX>=left&&e.pageX<=right&&e.pageY>=top&&e.pageY<=bottom){
return i;
}
}
}
return -1;
},createDropIndicator:function(){
this.dropIndicator=document.createElement("div");
with(this.dropIndicator.style){
position="absolute";
zIndex=999;
if(this.vertical){
borderLeftWidth="1px";
borderLeftColor="black";
borderLeftStyle="solid";
height=dojo.html.getBorderBox(this.domNode).height+"px";
top=dojo.html.getAbsolutePosition(this.domNode,true).y+"px";
}else{
borderTopWidth="1px";
borderTopColor="black";
borderTopStyle="solid";
width=dojo.html.getBorderBox(this.domNode).width+"px";
left=dojo.html.getAbsolutePosition(this.domNode,true).x+"px";
}
}
},onDragMove:function(e,_9d1){
var i=this._getNodeUnderMouse(e);
if(!this.dropIndicator){
this.createDropIndicator();
}
var _9d3=this.vertical?dojo.html.gravity.WEST:dojo.html.gravity.NORTH;
var hide=false;
if(i<0){
if(this.childBoxes.length){
var _9d5=(dojo.html.gravity(this.childBoxes[0].node,e)&_9d3);
if(_9d5){
hide=true;
}
}else{
var _9d5=true;
}
}else{
var _9d6=this.childBoxes[i];
var _9d5=(dojo.html.gravity(_9d6.node,e)&_9d3);
if(_9d6.node===_9d1[0].dragSource.domNode){
hide=true;
}else{
var _9d7=_9d5?(i>0?this.childBoxes[i-1]:_9d6):(i<this.childBoxes.length-1?this.childBoxes[i+1]:_9d6);
if(_9d7.node===_9d1[0].dragSource.domNode){
hide=true;
}
}
}
if(hide){
this.dropIndicator.style.display="none";
return;
}else{
this.dropIndicator.style.display="";
}
this.placeIndicator(e,_9d1,i,_9d5);
if(!dojo.html.hasParent(this.dropIndicator)){
dojo.body().appendChild(this.dropIndicator);
}
},placeIndicator:function(e,_9d9,_9da,_9db){
var _9dc=this.vertical?"left":"top";
var _9dd;
if(_9da<0){
if(this.childBoxes.length){
_9dd=_9db?this.childBoxes[0]:this.childBoxes[this.childBoxes.length-1];
}else{
this.dropIndicator.style[_9dc]=dojo.html.getAbsolutePosition(this.domNode,true)[this.vertical?"x":"y"]+"px";
}
}else{
_9dd=this.childBoxes[_9da];
}
if(_9dd){
this.dropIndicator.style[_9dc]=(_9db?_9dd[_9dc]:_9dd[this.vertical?"right":"bottom"])+"px";
if(this.vertical){
this.dropIndicator.style.height=_9dd.height+"px";
this.dropIndicator.style.top=_9dd.top+"px";
}else{
this.dropIndicator.style.width=_9dd.width+"px";
this.dropIndicator.style.left=_9dd.left+"px";
}
}
},onDragOut:function(e){
if(this.dropIndicator){
dojo.html.removeNode(this.dropIndicator);
delete this.dropIndicator;
}
},onDrop:function(e){
this.onDragOut(e);
var i=this._getNodeUnderMouse(e);
var _9e1=this.vertical?dojo.html.gravity.WEST:dojo.html.gravity.NORTH;
if(i<0){
if(this.childBoxes.length){
if(dojo.html.gravity(this.childBoxes[0].node,e)&_9e1){
return this.insert(e,this.childBoxes[0].node,"before");
}else{
return this.insert(e,this.childBoxes[this.childBoxes.length-1].node,"after");
}
}
return this.insert(e,this.domNode,"append");
}
var _9e2=this.childBoxes[i];
if(dojo.html.gravity(_9e2.node,e)&_9e1){
return this.insert(e,_9e2.node,"before");
}else{
return this.insert(e,_9e2.node,"after");
}
},insert:function(e,_9e4,_9e5){
var node=e.dragObject.domNode;
if(_9e5=="before"){
return dojo.html.insertBefore(node,_9e4);
}else{
if(_9e5=="after"){
return dojo.html.insertAfter(node,_9e4);
}else{
if(_9e5=="append"){
_9e4.appendChild(node);
return true;
}
}
}
return false;
}},function(node,_9e8){
if(arguments.length==0){
return;
}
this.domNode=dojo.byId(node);
dojo.dnd.DropTarget.call(this);
if(_9e8&&dojo.lang.isString(_9e8)){
_9e8=[_9e8];
}
this.acceptedTypes=_9e8||[];
dojo.dnd.dragManager.registerDropTarget(this);
});
dojo.provide("dojo.dnd.*");
dojo.provide("dojo.dnd.HtmlDragMove");
dojo.declare("dojo.dnd.HtmlDragMoveSource",dojo.dnd.HtmlDragSource,{onDragStart:function(){
var _9e9=new dojo.dnd.HtmlDragMoveObject(this.dragObject,this.type);
if(this.constrainToContainer){
_9e9.constrainTo(this.constrainingContainer);
}
return _9e9;
},onSelected:function(){
for(var i=0;i<this.dragObjects.length;i++){
dojo.dnd.dragManager.selectedSources.push(new dojo.dnd.HtmlDragMoveSource(this.dragObjects[i]));
}
}});
dojo.declare("dojo.dnd.HtmlDragMoveObject",dojo.dnd.HtmlDragObject,{onDragStart:function(e){
dojo.html.clearSelection();
this.dragClone=this.domNode;
if(dojo.html.getComputedStyle(this.domNode,"position")!="absolute"){
this.domNode.style.position="relative";
}
var left=parseInt(dojo.html.getComputedStyle(this.domNode,"left"));
var top=parseInt(dojo.html.getComputedStyle(this.domNode,"top"));
this.dragStartPosition={x:isNaN(left)?0:left,y:isNaN(top)?0:top};
this.scrollOffset=dojo.html.getScroll().offset;
this.dragOffset={y:this.dragStartPosition.y-e.pageY,x:this.dragStartPosition.x-e.pageX};
this.containingBlockPosition={x:0,y:0};
if(this.constrainToContainer){
this.constraints=this.getConstraints();
}
dojo.event.connect(this.domNode,"onclick",this,"_squelchOnClick");
},onDragEnd:function(e){
},setAbsolutePosition:function(x,y){
if(!this.disableY){
this.domNode.style.top=y+"px";
}
if(!this.disableX){
this.domNode.style.left=x+"px";
}
},_squelchOnClick:function(e){
dojo.event.browser.stopEvent(e);
dojo.event.disconnect(this.domNode,"onclick",this,"_squelchOnClick");
}});
dojo.provide("dojo.widget.Dialog");
dojo.declare("dojo.widget.ModalDialogBase",null,{isContainer:true,focusElement:"",bgColor:"black",bgOpacity:0.4,followScroll:true,closeOnBackgroundClick:false,trapTabs:function(e){
if(e.target==this.tabStartOuter){
if(this._fromTrap){
this.tabStart.focus();
this._fromTrap=false;
}else{
this._fromTrap=true;
this.tabEnd.focus();
}
}else{
if(e.target==this.tabStart){
if(this._fromTrap){
this._fromTrap=false;
}else{
this._fromTrap=true;
this.tabEnd.focus();
}
}else{
if(e.target==this.tabEndOuter){
if(this._fromTrap){
this.tabEnd.focus();
this._fromTrap=false;
}else{
this._fromTrap=true;
this.tabStart.focus();
}
}else{
if(e.target==this.tabEnd){
if(this._fromTrap){
this._fromTrap=false;
}else{
this._fromTrap=true;
this.tabStart.focus();
}
}
}
}
}
},clearTrap:function(e){
var _9f4=this;
setTimeout(function(){
_9f4._fromTrap=false;
},100);
},postCreate:function(){
with(this.domNode.style){
position="absolute";
zIndex=999;
display="none";
overflow="visible";
}
var b=dojo.body();
b.appendChild(this.domNode);
this.bg=document.createElement("div");
this.bg.className="dialogUnderlay";
with(this.bg.style){
position="absolute";
left=top="0px";
zIndex=998;
display="none";
}
b.appendChild(this.bg);
this.setBackgroundColor(this.bgColor);
this.bgIframe=new dojo.html.BackgroundIframe();
if(this.bgIframe.iframe){
with(this.bgIframe.iframe.style){
position="absolute";
left=top="0px";
zIndex=90;
display="none";
}
}
if(this.closeOnBackgroundClick){
dojo.event.kwConnect({srcObj:this.bg,srcFunc:"onclick",adviceObj:this,adviceFunc:"onBackgroundClick",once:true});
}
},uninitialize:function(){
this.bgIframe.remove();
dojo.html.removeNode(this.bg,true);
},setBackgroundColor:function(_9f6){
if(arguments.length>=3){
_9f6=new dojo.gfx.color.Color(arguments[0],arguments[1],arguments[2]);
}else{
_9f6=new dojo.gfx.color.Color(_9f6);
}
this.bg.style.backgroundColor=_9f6.toString();
return this.bgColor=_9f6;
},setBackgroundOpacity:function(op){
if(arguments.length==0){
op=this.bgOpacity;
}
dojo.html.setOpacity(this.bg,op);
try{
this.bgOpacity=dojo.html.getOpacity(this.bg);
}
catch(e){
this.bgOpacity=op;
}
return this.bgOpacity;
},_sizeBackground:function(){
if(this.bgOpacity>0){
var _9f8=dojo.html.getViewport();
var h=_9f8.height;
var w=_9f8.width;
with(this.bg.style){
width=w+"px";
height=h+"px";
}
var _9fb=dojo.html.getScroll().offset;
this.bg.style.top=_9fb.y+"px";
this.bg.style.left=_9fb.x+"px";
var _9f8=dojo.html.getViewport();
if(_9f8.width!=w){
this.bg.style.width=_9f8.width+"px";
}
if(_9f8.height!=h){
this.bg.style.height=_9f8.height+"px";
}
}
this.bgIframe.size(this.bg);
},_showBackground:function(){
if(this.bgOpacity>0){
this.bg.style.display="block";
}
if(this.bgIframe.iframe){
this.bgIframe.iframe.style.display="block";
}
},placeModalDialog:function(){
var _9fc=dojo.html.getScroll().offset;
var _9fd=dojo.html.getViewport();
var mb;
if(this.isShowing()){
mb=dojo.html.getMarginBox(this.domNode);
}else{
dojo.html.setVisibility(this.domNode,false);
dojo.html.show(this.domNode);
mb=dojo.html.getMarginBox(this.domNode);
dojo.html.hide(this.domNode);
dojo.html.setVisibility(this.domNode,true);
}
var x=_9fc.x+(_9fd.width-mb.width)/2;
var y=_9fc.y+(_9fd.height-mb.height)/2;
with(this.domNode.style){
left=x+"px";
top=y+"px";
}
},_onKey:function(evt){
if(evt.key){
var node=evt.target;
while(node!=null){
if(node==this.domNode){
return;
}
node=node.parentNode;
}
if(evt.key!=evt.KEY_TAB){
dojo.event.browser.stopEvent(evt);
}else{
if(!dojo.render.html.opera){
try{
this.tabStart.focus();
}
catch(e){
}
}
}
}
},showModalDialog:function(){
if(this.followScroll&&!this._scrollConnected){
this._scrollConnected=true;
dojo.event.connect(window,"onscroll",this,"_onScroll");
}
dojo.event.connect(document.documentElement,"onkey",this,"_onKey");
this.placeModalDialog();
this.setBackgroundOpacity();
this._sizeBackground();
this._showBackground();
this._fromTrap=true;
setTimeout(dojo.lang.hitch(this,function(){
try{
this.tabStart.focus();
}
catch(e){
}
}),50);
},hideModalDialog:function(){
if(this.focusElement){
dojo.byId(this.focusElement).focus();
dojo.byId(this.focusElement).blur();
}
this.bg.style.display="none";
this.bg.style.width=this.bg.style.height="1px";
if(this.bgIframe.iframe){
this.bgIframe.iframe.style.display="none";
}
dojo.event.disconnect(document.documentElement,"onkey",this,"_onKey");
if(this._scrollConnected){
this._scrollConnected=false;
dojo.event.disconnect(window,"onscroll",this,"_onScroll");
}
},_onScroll:function(){
var _a03=dojo.html.getScroll().offset;
this.bg.style.top=_a03.y+"px";
this.bg.style.left=_a03.x+"px";
this.placeModalDialog();
},checkSize:function(){
if(this.isShowing()){
this._sizeBackground();
this.placeModalDialog();
this.onResized();
}
},onBackgroundClick:function(){
if(this.lifetime-this.timeRemaining>=this.blockDuration){
return;
}
this.hide();
}});
dojo.widget.defineWidget("dojo.widget.Dialog",[dojo.widget.ContentPane,dojo.widget.ModalDialogBase],{templateString:"<div id=\"${this.widgetId}\" class=\"dojoDialog\" dojoattachpoint=\"wrapper\">\n	<span dojoattachpoint=\"tabStartOuter\" dojoonfocus=\"trapTabs\" dojoonblur=\"clearTrap\"	tabindex=\"0\"></span>\n	<span dojoattachpoint=\"tabStart\" dojoonfocus=\"trapTabs\" dojoonblur=\"clearTrap\" tabindex=\"0\"></span>\n	<div dojoattachpoint=\"containerNode\" style=\"position: relative; z-index: 2;\"></div>\n	<span dojoattachpoint=\"tabEnd\" dojoonfocus=\"trapTabs\" dojoonblur=\"clearTrap\" tabindex=\"0\"></span>\n	<span dojoattachpoint=\"tabEndOuter\" dojoonfocus=\"trapTabs\" dojoonblur=\"clearTrap\" tabindex=\"0\"></span>\n</div>\n",blockDuration:0,lifetime:0,closeNode:"",postMixInProperties:function(){
dojo.widget.Dialog.superclass.postMixInProperties.apply(this,arguments);
if(this.closeNode){
this.setCloseControl(this.closeNode);
}
},postCreate:function(){
dojo.widget.Dialog.superclass.postCreate.apply(this,arguments);
dojo.widget.ModalDialogBase.prototype.postCreate.apply(this,arguments);
},show:function(){
if(this.lifetime){
this.timeRemaining=this.lifetime;
if(this.timerNode){
this.timerNode.innerHTML=Math.ceil(this.timeRemaining/1000);
}
if(this.blockDuration&&this.closeNode){
if(this.lifetime>this.blockDuration){
this.closeNode.style.visibility="hidden";
}else{
this.closeNode.style.display="none";
}
}
if(this.timer){
clearInterval(this.timer);
}
this.timer=setInterval(dojo.lang.hitch(this,"_onTick"),100);
}
this.showModalDialog();
dojo.widget.Dialog.superclass.show.call(this);
},onLoad:function(){
this.placeModalDialog();
dojo.widget.Dialog.superclass.onLoad.call(this);
},fillInTemplate:function(){
},hide:function(){
this.hideModalDialog();
dojo.widget.Dialog.superclass.hide.call(this);
if(this.timer){
clearInterval(this.timer);
}
},setTimerNode:function(node){
this.timerNode=node;
},setCloseControl:function(node){
this.closeNode=dojo.byId(node);
dojo.event.connect(this.closeNode,"onclick",this,"hide");
},setShowControl:function(node){
node=dojo.byId(node);
dojo.event.connect(node,"onclick",this,"show");
},_onTick:function(){
if(this.timer){
this.timeRemaining-=100;
if(this.lifetime-this.timeRemaining>=this.blockDuration){
if(this.closeNode){
this.closeNode.style.visibility="visible";
}
}
if(!this.timeRemaining){
clearInterval(this.timer);
this.hide();
}else{
if(this.timerNode){
this.timerNode.innerHTML=Math.ceil(this.timeRemaining/1000);
}
}
}
}});
dojo.provide("dojo.widget.ResizeHandle");
dojo.widget.defineWidget("dojo.widget.ResizeHandle",dojo.widget.HtmlWidget,{targetElmId:"",templateCssString:".dojoHtmlResizeHandle {\n	float: right;\n	position: absolute;\n	right: 2px;\n	bottom: 2px;\n	width: 13px;\n	height: 13px;\n	z-index: 20;\n	cursor: nw-resize;\n	background-image: url(grabCorner.gif);\n	line-height: 0px;\n}",templateCssPath:dojo.uri.dojoUri("src/widget/templates/ResizeHandle.css"),templateString:"<div class=\"dojoHtmlResizeHandle\"><div></div></div>",postCreate:function(){
dojo.event.connect(this.domNode,"onmousedown",this,"_beginSizing");
},_beginSizing:function(e){
if(this._isSizing){
return false;
}
this.targetWidget=dojo.widget.byId(this.targetElmId);
this.targetDomNode=this.targetWidget?this.targetWidget.domNode:dojo.byId(this.targetElmId);
if(!this.targetDomNode){
return;
}
this._isSizing=true;
this.startPoint={"x":e.clientX,"y":e.clientY};
var mb=dojo.html.getMarginBox(this.targetDomNode);
this.startSize={"w":mb.width,"h":mb.height};
dojo.event.kwConnect({srcObj:dojo.body(),srcFunc:"onmousemove",targetObj:this,targetFunc:"_changeSizing",rate:25});
dojo.event.connect(dojo.body(),"onmouseup",this,"_endSizing");
e.preventDefault();
},_changeSizing:function(e){
try{
if(!e.clientX||!e.clientY){
return;
}
}
catch(e){
return;
}
var dx=this.startPoint.x-e.clientX;
var dy=this.startPoint.y-e.clientY;
var newW=this.startSize.w-dx;
var newH=this.startSize.h-dy;
if(this.minSize){
var mb=dojo.html.getMarginBox(this.targetDomNode);
if(newW<this.minSize.w){
newW=mb.width;
}
if(newH<this.minSize.h){
newH=mb.height;
}
}
if(this.targetWidget){
this.targetWidget.resizeTo(newW,newH);
}else{
dojo.html.setMarginBox(this.targetDomNode,{width:newW,height:newH});
}
e.preventDefault();
},_endSizing:function(e){
dojo.event.disconnect(dojo.body(),"onmousemove",this,"_changeSizing");
dojo.event.disconnect(dojo.body(),"onmouseup",this,"_endSizing");
this._isSizing=false;
}});
dojo.provide("dojo.widget.FloatingPane");
dojo.declare("dojo.widget.FloatingPaneBase",null,{title:"",iconSrc:"",hasShadow:false,constrainToContainer:false,taskBarId:"",resizable:true,titleBarDisplay:true,windowState:"normal",displayCloseAction:false,displayMinimizeAction:false,displayMaximizeAction:false,_max_taskBarConnectAttempts:5,_taskBarConnectAttempts:0,templateString:"<div id=\"${this.widgetId}\" dojoAttachEvent=\"onMouseDown\" class=\"dojoFloatingPane\">\n	<div dojoAttachPoint=\"titleBar\" class=\"dojoFloatingPaneTitleBar\"  style=\"display:none\">\n	  	<img dojoAttachPoint=\"titleBarIcon\"  class=\"dojoFloatingPaneTitleBarIcon\">\n		<div dojoAttachPoint=\"closeAction\" dojoAttachEvent=\"onClick:closeWindow\"\n   	  		class=\"dojoFloatingPaneCloseIcon\"></div>\n		<div dojoAttachPoint=\"restoreAction\" dojoAttachEvent=\"onClick:restoreWindow\"\n   	  		class=\"dojoFloatingPaneRestoreIcon\"></div>\n		<div dojoAttachPoint=\"maximizeAction\" dojoAttachEvent=\"onClick:maximizeWindow\"\n   	  		class=\"dojoFloatingPaneMaximizeIcon\"></div>\n		<div dojoAttachPoint=\"minimizeAction\" dojoAttachEvent=\"onClick:minimizeWindow\"\n   	  		class=\"dojoFloatingPaneMinimizeIcon\"></div>\n	  	<div dojoAttachPoint=\"titleBarText\" class=\"dojoFloatingPaneTitleText\">${this.title}</div>\n	</div>\n\n	<div id=\"${this.widgetId}_container\" dojoAttachPoint=\"containerNode\" class=\"dojoFloatingPaneClient\"></div>\n\n	<div dojoAttachPoint=\"resizeBar\" class=\"dojoFloatingPaneResizebar\" style=\"display:none\"></div>\n</div>",templateCssString:"\n/********** Outer Window ***************/\n\n.dojoFloatingPane {\n	/* essential css */\n	position: absolute;\n	overflow: visible;		/* so drop shadow is displayed */\n	z-index: 10;\n\n	/* styling css */\n	border: 1px solid;\n	border-color: ThreeDHighlight ThreeDShadow ThreeDShadow ThreeDHighlight;\n	background-color: ThreeDFace;\n}\n\n\n/********** Title Bar ****************/\n\n.dojoFloatingPaneTitleBar {\n	vertical-align: top;\n	margin: 2px 2px 2px 2px;\n	z-index: 10;\n	background-color: #7596c6;\n	cursor: default;\n	overflow: hidden;\n	border-color: ThreeDHighlight ThreeDShadow ThreeDShadow ThreeDHighlight;\n	vertical-align: middle;\n}\n\n.dojoFloatingPaneTitleText {\n	float: left;\n	padding: 2px 4px 2px 2px;\n	white-space: nowrap;\n	color: CaptionText;\n	font: small-caption;\n}\n\n.dojoTitleBarIcon {\n	float: left;\n	height: 22px;\n	width: 22px;\n	vertical-align: middle;\n	margin-right: 5px;\n	margin-left: 5px;\n}\n\n.dojoFloatingPaneActions{\n	float: right;\n	position: absolute;\n	right: 2px;\n	top: 2px;\n	vertical-align: middle;\n}\n\n\n.dojoFloatingPaneActionItem {\n	vertical-align: middle;\n	margin-right: 1px;\n	height: 22px;\n	width: 22px;\n}\n\n\n.dojoFloatingPaneTitleBarIcon {\n	/* essential css */\n	float: left;\n\n	/* styling css */\n	margin-left: 2px;\n	margin-right: 4px;\n	height: 22px;\n}\n\n/* minimize/maximize icons are specified by CSS only */\n.dojoFloatingPaneMinimizeIcon,\n.dojoFloatingPaneMaximizeIcon,\n.dojoFloatingPaneRestoreIcon,\n.dojoFloatingPaneCloseIcon {\n	vertical-align: middle;\n	height: 22px;\n	width: 22px;\n	float: right;\n}\n.dojoFloatingPaneMinimizeIcon {\n	background-image: url(images/floatingPaneMinimize.gif);\n}\n.dojoFloatingPaneMaximizeIcon {\n	background-image: url(images/floatingPaneMaximize.gif);\n}\n.dojoFloatingPaneRestoreIcon {\n	background-image: url(images/floatingPaneRestore.gif);\n}\n.dojoFloatingPaneCloseIcon {\n	background-image: url(images/floatingPaneClose.gif);\n}\n\n/* bar at bottom of window that holds resize handle */\n.dojoFloatingPaneResizebar {\n	z-index: 10;\n	height: 13px;\n	background-color: ThreeDFace;\n}\n\n/************* Client Area ***************/\n\n.dojoFloatingPaneClient {\n	position: relative;\n	z-index: 10;\n	border: 1px solid;\n	border-color: ThreeDShadow ThreeDHighlight ThreeDHighlight ThreeDShadow;\n	margin: 2px;\n	background-color: ThreeDFace;\n	padding: 8px;\n	font-family: Verdana, Helvetica, Garamond, sans-serif;\n	font-size: 12px;\n	overflow: auto;\n}\n\n",templateCssPath:dojo.uri.dojoUri("src/widget/templates/FloatingPane.css"),fillInFloatingPaneTemplate:function(args,frag){
var _a12=this.getFragNodeRef(frag);
dojo.html.copyStyle(this.domNode,_a12);
dojo.body().appendChild(this.domNode);
if(!this.isShowing()){
this.windowState="minimized";
}
if(this.iconSrc==""){
dojo.html.removeNode(this.titleBarIcon);
}else{
this.titleBarIcon.src=this.iconSrc.toString();
}
if(this.titleBarDisplay){
this.titleBar.style.display="";
dojo.html.disableSelection(this.titleBar);
this.titleBarIcon.style.display=(this.iconSrc==""?"none":"");
this.minimizeAction.style.display=(this.displayMinimizeAction?"":"none");
this.maximizeAction.style.display=(this.displayMaximizeAction&&this.windowState!="maximized"?"":"none");
this.restoreAction.style.display=(this.displayMaximizeAction&&this.windowState=="maximized"?"":"none");
this.closeAction.style.display=(this.displayCloseAction?"":"none");
this.drag=new dojo.dnd.HtmlDragMoveSource(this.domNode);
if(this.constrainToContainer){
this.drag.constrainTo();
}
this.drag.setDragHandle(this.titleBar);
var self=this;
dojo.event.topic.subscribe("dragMove",function(info){
if(info.source.domNode==self.domNode){
dojo.event.topic.publish("floatingPaneMove",{source:self});
}
});
}
if(this.resizable){
this.resizeBar.style.display="";
this.resizeHandle=dojo.widget.createWidget("ResizeHandle",{targetElmId:this.widgetId,id:this.widgetId+"_resize"});
this.resizeBar.appendChild(this.resizeHandle.domNode);
}
if(this.hasShadow){
this.shadow=new dojo.lfx.shadow(this.domNode);
}
this.bgIframe=new dojo.html.BackgroundIframe(this.domNode);
if(this.taskBarId){
this._taskBarSetup();
}
dojo.body().removeChild(this.domNode);
},postCreate:function(){
if(dojo.hostenv.post_load_){
this._setInitialWindowState();
}else{
dojo.addOnLoad(this,"_setInitialWindowState");
}
},maximizeWindow:function(evt){
var mb=dojo.html.getMarginBox(this.domNode);
this.previous={width:mb.width||this.width,height:mb.height||this.height,left:this.domNode.style.left,top:this.domNode.style.top,bottom:this.domNode.style.bottom,right:this.domNode.style.right};
if(this.domNode.parentNode.style.overflow.toLowerCase()!="hidden"){
this.parentPrevious={overflow:this.domNode.parentNode.style.overflow};
dojo.debug(this.domNode.parentNode.style.overflow);
this.domNode.parentNode.style.overflow="hidden";
}
this.domNode.style.left=dojo.html.getPixelValue(this.domNode.parentNode,"padding-left",true)+"px";
this.domNode.style.top=dojo.html.getPixelValue(this.domNode.parentNode,"padding-top",true)+"px";
if((this.domNode.parentNode.nodeName.toLowerCase()=="body")){
var _a17=dojo.html.getViewport();
var _a18=dojo.html.getPadding(dojo.body());
this.resizeTo(_a17.width-_a18.width,_a17.height-_a18.height);
}else{
var _a19=dojo.html.getContentBox(this.domNode.parentNode);
this.resizeTo(_a19.width,_a19.height);
}
this.maximizeAction.style.display="none";
this.restoreAction.style.display="";
if(this.resizeHandle){
this.resizeHandle.domNode.style.display="none";
}
this.drag.setDragHandle(null);
this.windowState="maximized";
},minimizeWindow:function(evt){
this.hide();
for(var attr in this.parentPrevious){
this.domNode.parentNode.style[attr]=this.parentPrevious[attr];
}
this.lastWindowState=this.windowState;
this.windowState="minimized";
},restoreWindow:function(evt){
if(this.windowState=="minimized"){
this.show();
if(this.lastWindowState=="maximized"){
this.domNode.parentNode.style.overflow="hidden";
this.windowState="maximized";
}else{
this.windowState="normal";
}
}else{
if(this.windowState=="maximized"){
for(var attr in this.previous){
this.domNode.style[attr]=this.previous[attr];
}
for(var attr in this.parentPrevious){
this.domNode.parentNode.style[attr]=this.parentPrevious[attr];
}
this.resizeTo(this.previous.width,this.previous.height);
this.previous=null;
this.parentPrevious=null;
this.restoreAction.style.display="none";
this.maximizeAction.style.display=this.displayMaximizeAction?"":"none";
if(this.resizeHandle){
this.resizeHandle.domNode.style.display="";
}
this.drag.setDragHandle(this.titleBar);
this.windowState="normal";
}else{
}
}
},toggleDisplay:function(){
if(this.windowState=="minimized"){
this.restoreWindow();
}else{
this.minimizeWindow();
}
},closeWindow:function(evt){
dojo.html.removeNode(this.domNode);
this.destroy();
},onMouseDown:function(evt){
this.bringToTop();
},bringToTop:function(){
var _a20=dojo.widget.manager.getWidgetsByType(this.widgetType);
var _a21=[];
for(var x=0;x<_a20.length;x++){
if(this.widgetId!=_a20[x].widgetId){
_a21.push(_a20[x]);
}
}
_a21.sort(function(a,b){
return a.domNode.style.zIndex-b.domNode.style.zIndex;
});
_a21.push(this);
var _a25=100;
for(x=0;x<_a21.length;x++){
_a21[x].domNode.style.zIndex=_a25+x*2;
}
},_setInitialWindowState:function(){
if(this.isShowing()){
this.width=-1;
var mb=dojo.html.getMarginBox(this.domNode);
this.resizeTo(mb.width,mb.height);
}
if(this.windowState=="maximized"){
this.maximizeWindow();
this.show();
return;
}
if(this.windowState=="normal"){
this.show();
return;
}
if(this.windowState=="minimized"){
this.hide();
return;
}
this.windowState="minimized";
},_taskBarSetup:function(){
var _a27=dojo.widget.getWidgetById(this.taskBarId);
if(!_a27){
if(this._taskBarConnectAttempts<this._max_taskBarConnectAttempts){
dojo.lang.setTimeout(this,this._taskBarSetup,50);
this._taskBarConnectAttempts++;
}else{
dojo.debug("Unable to connect to the taskBar");
}
return;
}
_a27.addChild(this);
},showFloatingPane:function(){
this.bringToTop();
},onFloatingPaneShow:function(){
var mb=dojo.html.getMarginBox(this.domNode);
this.resizeTo(mb.width,mb.height);
},resizeTo:function(_a29,_a2a){
dojo.html.setMarginBox(this.domNode,{width:_a29,height:_a2a});
dojo.widget.html.layout(this.domNode,[{domNode:this.titleBar,layoutAlign:"top"},{domNode:this.resizeBar,layoutAlign:"bottom"},{domNode:this.containerNode,layoutAlign:"client"}]);
dojo.widget.html.layout(this.containerNode,this.children,"top-bottom");
this.bgIframe.onResized();
if(this.shadow){
this.shadow.size(_a29,_a2a);
}
this.onResized();
},checkSize:function(){
},destroyFloatingPane:function(){
if(this.resizeHandle){
this.resizeHandle.destroy();
this.resizeHandle=null;
}
}});
dojo.widget.defineWidget("dojo.widget.FloatingPane",[dojo.widget.ContentPane,dojo.widget.FloatingPaneBase],{fillInTemplate:function(args,frag){
this.fillInFloatingPaneTemplate(args,frag);
dojo.widget.FloatingPane.superclass.fillInTemplate.call(this,args,frag);
},postCreate:function(){
dojo.widget.FloatingPaneBase.prototype.postCreate.apply(this,arguments);
dojo.widget.FloatingPane.superclass.postCreate.apply(this,arguments);
},show:function(){
dojo.widget.FloatingPane.superclass.show.apply(this,arguments);
this.showFloatingPane();
},onShow:function(){
dojo.widget.FloatingPane.superclass.onShow.call(this);
this.onFloatingPaneShow();
},destroy:function(){
this.destroyFloatingPane();
dojo.widget.FloatingPane.superclass.destroy.apply(this,arguments);
}});
dojo.widget.defineWidget("dojo.widget.ModalFloatingPane",[dojo.widget.FloatingPane,dojo.widget.ModalDialogBase],{windowState:"minimized",displayCloseAction:true,postCreate:function(){
dojo.widget.ModalDialogBase.prototype.postCreate.call(this);
dojo.widget.ModalFloatingPane.superclass.postCreate.call(this);
},show:function(){
this.showModalDialog();
dojo.widget.ModalFloatingPane.superclass.show.apply(this,arguments);
this.bg.style.zIndex=this.domNode.style.zIndex-1;
},hide:function(){
this.hideModalDialog();
dojo.widget.ModalFloatingPane.superclass.hide.apply(this,arguments);
},closeWindow:function(){
this.hide();
dojo.widget.ModalFloatingPane.superclass.closeWindow.apply(this,arguments);
}});
dojo.provide("dojo.widget.PopupContainer");
dojo.declare("dojo.widget.PopupContainerBase",null,function(){
this.queueOnAnimationFinish=[];
},{isContainer:true,templateString:"<div dojoAttachPoint=\"containerNode\" style=\"display:none;position:absolute;\" class=\"dojoPopupContainer\" ></div>",isShowingNow:false,currentSubpopup:null,beginZIndex:1000,parentPopup:null,parent:null,popupIndex:0,aroundBox:dojo.html.boxSizing.BORDER_BOX,openedForWindow:null,processKey:function(evt){
return false;
},applyPopupBasicStyle:function(){
with(this.domNode.style){
display="none";
position="absolute";
}
},aboutToShow:function(){
},open:function(x,y,_a30,_a31,_a32,_a33){
if(this.isShowingNow){
return;
}
if(this.animationInProgress){
this.queueOnAnimationFinish.push(this.open,arguments);
return;
}
this.aboutToShow();
var _a34=false,node,_a36;
if(typeof x=="object"){
node=x;
_a36=_a31;
_a31=_a30;
_a30=y;
_a34=true;
}
this.parent=_a30;
dojo.body().appendChild(this.domNode);
_a31=_a31||_a30["domNode"]||[];
var _a37=null;
this.isTopLevel=true;
while(_a30){
if(_a30!==this&&(_a30.setOpenedSubpopup!=undefined&&_a30.applyPopupBasicStyle!=undefined)){
_a37=_a30;
this.isTopLevel=false;
_a37.setOpenedSubpopup(this);
break;
}
_a30=_a30.parent;
}
this.parentPopup=_a37;
this.popupIndex=_a37?_a37.popupIndex+1:1;
if(this.isTopLevel){
var _a38=dojo.html.isNode(_a31)?_a31:null;
dojo.widget.PopupManager.opened(this,_a38);
}
if(this.isTopLevel&&!dojo.withGlobal(this.openedForWindow||dojo.global(),dojo.html.selection.isCollapsed)){
this._bookmark=dojo.withGlobal(this.openedForWindow||dojo.global(),dojo.html.selection.getBookmark);
}else{
this._bookmark=null;
}
if(_a31 instanceof Array){
_a31={left:_a31[0],top:_a31[1],width:0,height:0};
}
with(this.domNode.style){
display="";
zIndex=this.beginZIndex+this.popupIndex;
}
if(_a34){
this.move(node,_a33,_a36);
}else{
this.move(x,y,_a33,_a32);
}
this.domNode.style.display="none";
this.explodeSrc=_a31;
this.show();
this.isShowingNow=true;
},move:function(x,y,_a3b,_a3c){
var _a3d=(typeof x=="object");
if(_a3d){
var _a3e=_a3b;
var node=x;
_a3b=y;
if(!_a3e){
_a3e={"BL":"TL","TL":"BL"};
}
dojo.html.placeOnScreenAroundElement(this.domNode,node,_a3b,this.aroundBox,_a3e);
}else{
if(!_a3c){
_a3c="TL,TR,BL,BR";
}
dojo.html.placeOnScreen(this.domNode,x,y,_a3b,true,_a3c);
}
},close:function(_a40){
if(_a40){
this.domNode.style.display="none";
}
if(this.animationInProgress){
this.queueOnAnimationFinish.push(this.close,[]);
return;
}
this.closeSubpopup(_a40);
this.hide();
if(this.bgIframe){
this.bgIframe.hide();
this.bgIframe.size({left:0,top:0,width:0,height:0});
}
if(this.isTopLevel){
dojo.widget.PopupManager.closed(this);
}
this.isShowingNow=false;
if(this.parent){
setTimeout(dojo.lang.hitch(this,function(){
try{
if(this.parent["focus"]){
this.parent.focus();
}else{
this.parent.domNode.focus();
}
}
catch(e){
dojo.debug("No idea how to focus to parent",e);
}
}),10);
}
if(this._bookmark&&dojo.withGlobal(this.openedForWindow||dojo.global(),dojo.html.selection.isCollapsed)){
if(this.openedForWindow){
this.openedForWindow.focus();
}
try{
dojo.withGlobal(this.openedForWindow||dojo.global(),"moveToBookmark",dojo.html.selection,[this._bookmark]);
}
catch(e){
}
}
this._bookmark=null;
},closeAll:function(_a41){
if(this.parentPopup){
this.parentPopup.closeAll(_a41);
}else{
this.close(_a41);
}
},setOpenedSubpopup:function(_a42){
this.currentSubpopup=_a42;
},closeSubpopup:function(_a43){
if(this.currentSubpopup==null){
return;
}
this.currentSubpopup.close(_a43);
this.currentSubpopup=null;
},onShow:function(){
dojo.widget.PopupContainer.superclass.onShow.apply(this,arguments);
this.openedSize={w:this.domNode.style.width,h:this.domNode.style.height};
if(dojo.render.html.ie){
if(!this.bgIframe){
this.bgIframe=new dojo.html.BackgroundIframe();
this.bgIframe.setZIndex(this.domNode);
}
this.bgIframe.size(this.domNode);
this.bgIframe.show();
}
this.processQueue();
},processQueue:function(){
if(!this.queueOnAnimationFinish.length){
return;
}
var func=this.queueOnAnimationFinish.shift();
var args=this.queueOnAnimationFinish.shift();
func.apply(this,args);
},onHide:function(){
dojo.widget.HtmlWidget.prototype.onHide.call(this);
if(this.openedSize){
with(this.domNode.style){
width=this.openedSize.w;
height=this.openedSize.h;
}
}
this.processQueue();
}});
dojo.widget.defineWidget("dojo.widget.PopupContainer",[dojo.widget.HtmlWidget,dojo.widget.PopupContainerBase],{});
dojo.widget.PopupManager=new function(){
this.currentMenu=null;
this.currentButton=null;
this.currentFocusMenu=null;
this.focusNode=null;
this.registeredWindows=[];
this.registerWin=function(win){
if(!win.__PopupManagerRegistered){
dojo.event.connect(win.document,"onmousedown",this,"onClick");
dojo.event.connect(win,"onscroll",this,"onClick");
dojo.event.connect(win.document,"onkey",this,"onKey");
win.__PopupManagerRegistered=true;
this.registeredWindows.push(win);
}
};
this.registerAllWindows=function(_a47){
if(!_a47){
try{
_a47=dojo.html.getDocumentWindow(window.top&&window.top.document||window.document);
}catch(e){
_a47=dojo.html.getDocumentWindow(window.document);
}
}
this.registerWin(_a47);
for(var i=0;i<_a47.frames.length;i++){
try{
var win=dojo.html.getDocumentWindow(_a47.frames[i].document);
if(win){
this.registerAllWindows(win);
}
}
catch(e){
}
}
};
this.unRegisterWin=function(win){
if(win.__PopupManagerRegistered){
dojo.event.disconnect(win.document,"onmousedown",this,"onClick");
dojo.event.disconnect(win,"onscroll",this,"onClick");
dojo.event.disconnect(win.document,"onkey",this,"onKey");
win.__PopupManagerRegistered=false;
}
};
this.unRegisterAllWindows=function(){
for(var i=0;i<this.registeredWindows.length;++i){
this.unRegisterWin(this.registeredWindows[i]);
}
this.registeredWindows=[];
};
dojo.addOnLoad(this,"registerAllWindows");
dojo.addOnUnload(this,"unRegisterAllWindows");
this.closed=function(menu){
if(this.currentMenu==menu){
this.currentMenu=null;
this.currentButton=null;
this.currentFocusMenu=null;
}
};
this.opened=function(menu,_a4e){
if(menu==this.currentMenu){
return;
}
if(this.currentMenu){
this.currentMenu.close();
}
this.currentMenu=menu;
this.currentFocusMenu=menu;
this.currentButton=_a4e;
};
this.setFocusedMenu=function(menu){
this.currentFocusMenu=menu;
};
this.onKey=function(e){
if(!e.key){
return;
}
if(!this.currentMenu||!this.currentMenu.isShowingNow){
return;
}
var m=this.currentFocusMenu;
while(m){
if(m.processKey(e)){
e.preventDefault();
e.stopPropagation();
break;
}
m=m.parentPopup;
}
},this.onClick=function(e){
if(!this.currentMenu){
return;
}
var _a53=dojo.html.getScroll().offset;
var m=this.currentMenu;
while(m){
if(dojo.html.overElement(m.domNode,e)||dojo.html.isDescendantOf(e.target,m.domNode)){
return;
}
m=m.currentSubpopup;
}
if(this.currentButton&&dojo.html.overElement(this.currentButton,e)){
return;
}
this.currentMenu.close();
};
};
dojo.provide("dojo.widget.Menu2");
dojo.widget.defineWidget("dojo.widget.PopupMenu2",dojo.widget.PopupContainer,function(){
this.targetNodeIds=[];
this.eventNames={open:""};
},{snarfChildDomOutput:true,eventNaming:"default",templateString:"<table class=\"dojoPopupMenu2\" border=0 cellspacing=0 cellpadding=0 style=\"display: none;\"><tbody dojoAttachPoint=\"containerNode\"></tbody></table>",templateCssString:"\n.dojoPopupMenu2 {\n	position: absolute;\n	border: 1px solid #7298d0;\n	background:#85aeec url(images/soriaMenuBg.gif) repeat-x bottom left !important;\n	padding: 1px;\n	margin-top: 1px;\n	margin-bottom: 1px;\n}\n\n.dojoMenuItem2{\n	white-space: nowrap;\n	font: menu;\n	margin: 0;\n}\n\n.dojoMenuItem2Hover {\n	background-color: #D2E4FD;\n	cursor:pointer;\n	cursor:hand;\n}\n\n.dojoMenuItem2Icon {\n	position: relative;\n	background-position: center center;\n	background-repeat: no-repeat;\n	width: 16px;\n	height: 16px;\n	padding-right: 3px;\n}\n\n.dojoMenuItem2Label {\n	position: relative;\n	vertical-align: middle;\n}\n\n/* main label text */\n.dojoMenuItem2Label {\n	position: relative;\n	vertical-align: middle;\n}\n\n.dojoMenuItem2Accel {\n	position: relative;\n	vertical-align: middle;\n	padding-left: 3px;\n}\n\n.dojoMenuItem2Disabled .dojoMenuItem2Label,\n.dojoMenuItem2Disabled .dojoMenuItem2Accel {\n	color: #607a9e;\n}\n\n.dojoMenuItem2Submenu {\n	position: relative;\n	background-position: center center;\n	background-repeat: no-repeat;\n	background-image: url(images/submenu_off.gif);\n	width: 5px;\n	height: 9px;\n	padding-left: 3px;\n}\n.dojoMenuItem2Hover .dojoMenuItem2Submenu {\n	background-image: url(images/submenu_on.gif);\n}\n\n.dojoMenuItem2Disabled .dojoMenuItem2Submenu {\n	background-image: url(images/submenu_disabled.gif);\n}\n\n.dojoMenuSeparator2 {\n	font-size: 1px;\n	margin: 0;\n}\n\n.dojoMenuSeparator2Top {\n	height: 50%;\n	border-bottom: 1px solid #7a98c4;\n	margin: 0px 2px;\n	font-size: 1px;\n}\n\n.dojoMenuSeparator2Bottom {\n	height: 50%;\n	border-top: 1px solid #c9deff;\n	margin: 0px 2px;\n	font-size: 1px;\n}\n\n.dojoMenuBar2 {\n	/*position: relative;*/\n	background:#85aeec url(images/soriaBarBg.gif) repeat-x top left;\n	border-bottom:1px solid #6b9fec;\n	\n}\n\n.dojoMenuBar2Client {\n	padding: 1px;\n}\n\n.dojoMenuBarItem2 {\n	white-space: nowrap;\n	font: menu;\n	margin: 0;\n	position: relative;\n	vertical-align: middle;\n	z-index: 1;\n	padding: 3px 8px;\n}\n\n.dojoMenuBarItem2 span {\n	margin: 0;\n	position: relative;\n	z-index: 2;\n	cursor:pointer;\n	cursor:hand;\n}\n\n.dojoMenuBarItem2Hover {\n	background-color:#d2e4fd;\n}\n\n.dojoMenuBarItem2Disabled span {\n	color: #4f6582;\n}\n",templateCssPath:dojo.uri.dojoUri("src/widget/templates/Menu2.css"),templateCssString:"",submenuDelay:500,submenuOverlap:5,contextMenuForWindow:false,initialize:function(args,frag){
if(this.eventNaming=="default"){
for(var _a57 in this.eventNames){
this.eventNames[_a57]=this.widgetId+"/"+_a57;
}
}
},postCreate:function(){
if(this.contextMenuForWindow){
var doc=dojo.body();
this.bindDomNode(doc);
}else{
if(this.targetNodeIds.length>0){
dojo.lang.forEach(this.targetNodeIds,this.bindDomNode,this);
}
}
this._subscribeSubitemsOnOpen();
},_subscribeSubitemsOnOpen:function(){
var _a59=this.getChildrenOfType(dojo.widget.MenuItem2);
for(var i=0;i<_a59.length;i++){
dojo.event.topic.subscribe(this.eventNames.open,_a59[i],"menuOpen");
}
},getTopOpenEvent:function(){
var menu=this;
while(menu.parentPopup){
menu=menu.parentPopup;
}
return menu.openEvent;
},bindDomNode:function(node){
node=dojo.byId(node);
var win=dojo.html.getElementWindow(node);
if(dojo.html.isTag(node,"iframe")=="iframe"){
win=dojo.html.iframeContentWindow(node);
node=dojo.withGlobal(win,dojo.body);
}
dojo.widget.Menu2.OperaAndKonqFixer.fixNode(node);
dojo.event.kwConnect({srcObj:node,srcFunc:"oncontextmenu",targetObj:this,targetFunc:"onOpen",once:true});
if(dojo.render.html.moz&&win.document.designMode.toLowerCase()=="on"){
dojo.event.browser.addListener(node,"contextmenu",dojo.lang.hitch(this,"onOpen"));
}
dojo.widget.PopupManager.registerWin(win);
},unBindDomNode:function(_a5e){
var node=dojo.byId(_a5e);
dojo.event.kwDisconnect({srcObj:node,srcFunc:"oncontextmenu",targetObj:this,targetFunc:"onOpen",once:true});
dojo.widget.Menu2.OperaAndKonqFixer.cleanNode(node);
},_moveToNext:function(evt){
this._highlightOption(1);
return true;
},_moveToPrevious:function(evt){
this._highlightOption(-1);
return true;
},_moveToParentMenu:function(evt){
if(this._highlighted_option&&this.parentPopup){
if(evt._menu2UpKeyProcessed){
return true;
}else{
this._highlighted_option.onUnhover();
this.closeSubpopup();
evt._menu2UpKeyProcessed=true;
}
}
return false;
},_moveToChildMenu:function(evt){
if(this._highlighted_option&&this._highlighted_option.submenuId){
this._highlighted_option._onClick(true);
return true;
}
return false;
},_selectCurrentItem:function(evt){
if(this._highlighted_option){
this._highlighted_option._onClick();
return true;
}
return false;
},processKey:function(evt){
if(evt.ctrlKey||evt.altKey||!evt.key){
return false;
}
var rval=false;
switch(evt.key){
case evt.KEY_DOWN_ARROW:
rval=this._moveToNext(evt);
break;
case evt.KEY_UP_ARROW:
rval=this._moveToPrevious(evt);
break;
case evt.KEY_RIGHT_ARROW:
rval=this._moveToChildMenu(evt);
break;
case evt.KEY_LEFT_ARROW:
rval=this._moveToParentMenu(evt);
break;
case " ":
case evt.KEY_ENTER:
if(rval=this._selectCurrentItem(evt)){
break;
}
case evt.KEY_ESCAPE:
dojo.widget.PopupManager.currentMenu.close();
rval=true;
break;
}
return rval;
},_findValidItem:function(dir,_a68){
if(_a68){
_a68=dir>0?_a68.getNextSibling():_a68.getPreviousSibling();
}
for(var i=0;i<this.children.length;++i){
if(!_a68){
_a68=dir>0?this.children[0]:this.children[this.children.length-1];
}
if(_a68.onHover&&_a68.isShowing()){
return _a68;
}
_a68=dir>0?_a68.getNextSibling():_a68.getPreviousSibling();
}
},_highlightOption:function(dir){
var item;
if((!this._highlighted_option)){
item=this._findValidItem(dir);
}else{
item=this._findValidItem(dir,this._highlighted_option);
}
if(item){
if(this._highlighted_option){
this._highlighted_option.onUnhover();
}
item.onHover();
//  IFENG: Commentted out to fix  Bug LER-7790 
//dojo.html.scrollIntoView(item.domNode);
try{
var node=dojo.html.getElementsByClass("dojoMenuItem2Label",item.domNode)[0];
node.focus();
}
catch(e){
}
}
},onItemClick:function(item){
},close:function(_a6e){
if(this.animationInProgress){
dojo.widget.PopupMenu2.superclass.close.apply(this,arguments);
return;
}
if(this._highlighted_option){
this._highlighted_option.onUnhover();
}
dojo.widget.PopupMenu2.superclass.close.apply(this,arguments);
},closeSubpopup:function(_a6f){
if(this.currentSubpopup==null){
return;
}
this.currentSubpopup.close(_a6f);
this.currentSubpopup=null;
this.currentSubmenuTrigger.is_open=false;
this.currentSubmenuTrigger._closedSubmenu(_a6f);
this.currentSubmenuTrigger=null;
},_openSubmenu:function(_a70,_a71){
var _a72=dojo.html.getAbsolutePosition(_a71.domNode,true);
var _a73=dojo.html.getMarginBox(this.domNode).width;
var x=_a72.x+_a73-this.submenuOverlap;
var y=_a72.y;
_a70.open(x,y,this,_a71.domNode);
this.currentSubmenuTrigger=_a71;
this.currentSubmenuTrigger.is_open=true;
},onOpen:function(e){
this.openEvent=e;
if(e["target"]){
this.openedForWindow=dojo.html.getElementWindow(e.target);
}else{
this.openedForWindow=null;
}
var x=e.pageX,y=e.pageY;
var win=dojo.html.getElementWindow(e.target);
var _a7a=win._frameElement||win.frameElement;
if(_a7a){
var cood=dojo.html.abs(_a7a,true);
x+=cood.x-dojo.withGlobal(win,dojo.html.getScroll).left;
y+=cood.y-dojo.withGlobal(win,dojo.html.getScroll).top;
}
this.open(x,y,null,[x,y]);
e.preventDefault();
e.stopPropagation();
}});
dojo.widget.defineWidget("dojo.widget.MenuItem2",dojo.widget.HtmlWidget,function(){
this.eventNames={engage:""};
},{templateString:"<tr class=\"dojoMenuItem2\" dojoAttachEvent=\"onMouseOver: onHover; onMouseOut: onUnhover; onClick: _onClick; onKey:onKey;\">"+"<td><div class=\"${this.iconClass}\" style=\"${this.iconStyle}\"></div></td>"+"<td tabIndex=\"-1\" class=\"dojoMenuItem2Label\">${this.caption}</td>"+"<td class=\"dojoMenuItem2Accel\">${this.accelKey}</td>"+"<td><div class=\"dojoMenuItem2Submenu\" style=\"display:${this.arrowDisplay};\"></div></td>"+"</tr>",is_hovering:false,hover_timer:null,is_open:false,topPosition:0,caption:"Untitled",accelKey:"",iconSrc:"",disabledClass:"dojoMenuItem2Disabled",iconClass:"dojoMenuItem2Icon",submenuId:"",eventNaming:"default",highlightClass:"dojoMenuItem2Hover",postMixInProperties:function(){
this.iconStyle="";
if(this.iconSrc){
if((this.iconSrc.toLowerCase().substring(this.iconSrc.length-4)==".png")&&(dojo.render.html.ie55||dojo.render.html.ie60)){
this.iconStyle="filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+this.iconSrc+"', sizingMethod='image')";
}else{
this.iconStyle="background-image: url("+this.iconSrc+")";
}
}
this.arrowDisplay=this.submenuId?"block":"none";
dojo.widget.MenuItem2.superclass.postMixInProperties.apply(this,arguments);
},fillInTemplate:function(){
dojo.html.disableSelection(this.domNode);
if(this.disabled){
this.setDisabled(true);
}
if(this.eventNaming=="default"){
for(var _a7c in this.eventNames){
this.eventNames[_a7c]=this.widgetId+"/"+_a7c;
}
}
},onHover:function(){
this.onUnhover();
if(this.is_hovering){
return;
}
if(this.is_open){
return;
}
if(this.parent._highlighted_option){
this.parent._highlighted_option.onUnhover();
}
this.parent.closeSubpopup();
this.parent._highlighted_option=this;
dojo.widget.PopupManager.setFocusedMenu(this.parent);
this._highlightItem();
if(this.is_hovering){
this._stopSubmenuTimer();
}
this.is_hovering=true;
this._startSubmenuTimer();
},onUnhover:function(){
if(!this.is_open){
this._unhighlightItem();
}
this.is_hovering=false;
this.parent._highlighted_option=null;
if(this.parent.parentPopup){
dojo.widget.PopupManager.setFocusedMenu(this.parent.parentPopup);
}
this._stopSubmenuTimer();
},_onClick:function(_a7d){
var _a7e=false;
if(this.disabled){
return false;
}
if(this.submenuId){
if(!this.is_open){
this._stopSubmenuTimer();
this._openSubmenu();
}
_a7e=true;
}else{
this.onUnhover();
this.parent.closeAll(true);
}
this.onClick();
dojo.event.topic.publish(this.eventNames.engage,this);
if(_a7e&&_a7d){
dojo.widget.getWidgetById(this.submenuId)._highlightOption(1);
}
return;
},onClick:function(){
this.parent.onItemClick(this);
},_highlightItem:function(){
dojo.html.addClass(this.domNode,this.highlightClass);
},_unhighlightItem:function(){
dojo.html.removeClass(this.domNode,this.highlightClass);
},_startSubmenuTimer:function(){
this._stopSubmenuTimer();
if(this.disabled){
return;
}
var self=this;
var _a80=function(){
return function(){
self._openSubmenu();
};
}();
this.hover_timer=dojo.lang.setTimeout(_a80,this.parent.submenuDelay);
},_stopSubmenuTimer:function(){
if(this.hover_timer){
dojo.lang.clearTimeout(this.hover_timer);
this.hover_timer=null;
}
},_openSubmenu:function(){
if(this.disabled){
return;
}
this.parent.closeSubpopup();
var _a81=dojo.widget.getWidgetById(this.submenuId);
if(_a81){
this.parent._openSubmenu(_a81,this);
}
},_closedSubmenu:function(){
this.onUnhover();
},setDisabled:function(_a82){
this.disabled=_a82;
if(this.disabled){
dojo.html.addClass(this.domNode,this.disabledClass);
}else{
dojo.html.removeClass(this.domNode,this.disabledClass);
}
},enable:function(){
this.setDisabled(false);
},disable:function(){
this.setDisabled(true);
},menuOpen:function(_a83){
}});
dojo.widget.defineWidget("dojo.widget.MenuSeparator2",dojo.widget.HtmlWidget,{templateString:"<tr class=\"dojoMenuSeparator2\"><td colspan=4>"+"<div class=\"dojoMenuSeparator2Top\"></div>"+"<div class=\"dojoMenuSeparator2Bottom\"></div>"+"</td></tr>",postCreate:function(){
dojo.html.disableSelection(this.domNode);
}});
dojo.widget.defineWidget("dojo.widget.MenuBar2",dojo.widget.PopupMenu2,{menuOverlap:2,templateString:"<div class=\"dojoMenuBar2\" tabIndex=\"0\"><table class=\"dojoMenuBar2Client\"><tr dojoAttachPoint=\"containerNode\"></tr></table></div>",close:function(_a84){
if(this._highlighted_option){
this._highlighted_option.onUnhover();
}
this.closeSubpopup(_a84);
},processKey:function(evt){
if(evt.ctrlKey||evt.altKey){
return false;
}
if(!dojo.html.hasClass(evt.target,"dojoMenuBar2")){
return false;
}
var rval=false;
switch(evt.key){
case evt.KEY_DOWN_ARROW:
rval=this._moveToChildMenu(evt);
break;
case evt.KEY_UP_ARROW:
rval=this._moveToParentMenu(evt);
break;
case evt.KEY_RIGHT_ARROW:
rval=this._moveToNext(evt);
break;
case evt.KEY_LEFT_ARROW:
rval=this._moveToPrevious(evt);
break;
default:
rval=dojo.widget.MenuBar2.superclass.processKey.apply(this,arguments);
break;
}
return rval;
},postCreate:function(){
dojo.widget.MenuBar2.superclass.postCreate.apply(this,arguments);
dojo.widget.PopupManager.opened(this);
this.isShowingNow=true;
},_openSubmenu:function(_a87,_a88){
var _a89=dojo.html.getAbsolutePosition(_a88.domNode,true);
var _a8a=dojo.html.getAbsolutePosition(this.domNode,true);
var _a8b=dojo.html.getBorderBox(this.domNode).height;
var x=_a89.x;
var y=_a8a.y+_a8b-this.menuOverlap;
_a87.open(x,y,this,_a88.domNode);
this.currentSubmenuTrigger=_a88;
this.currentSubmenuTrigger.is_open=true;
}});
dojo.widget.defineWidget("dojo.widget.MenuBarItem2",dojo.widget.MenuItem2,{templateString:"<td class=\"dojoMenuBarItem2\" dojoAttachEvent=\"onMouseOver: onHover; onMouseOut: onUnhover; onClick: _onClick;\">"+"<span>${this.caption}</span>"+"</td>",highlightClass:"dojoMenuBarItem2Hover",setDisabled:function(_a8e){
this.disabled=_a8e;
if(this.disabled){
dojo.html.addClass(this.domNode,"dojoMenuBarItem2Disabled");
}else{
dojo.html.removeClass(this.domNode,"dojoMenuBarItem2Disabled");
}
}});
dojo.widget.Menu2.OperaAndKonqFixer=new function(){
var _a8f=true;
var _a90=false;
if(!dojo.lang.isFunction(dojo.doc().oncontextmenu)){
dojo.doc().oncontextmenu=function(){
_a8f=false;
_a90=true;
};
}
if(dojo.doc().createEvent){
try{
var e=dojo.doc().createEvent("MouseEvents");
e.initMouseEvent("contextmenu",1,1,dojo.global(),1,0,0,0,0,0,0,0,0,0,null);
dojo.doc().dispatchEvent(e);
}
catch(e){
}
}else{
_a8f=false;
}
if(_a90){
delete dojo.doc().oncontextmenu;
}
this.fixNode=function(node){
if(_a8f){
if(!dojo.lang.isFunction(node.oncontextmenu)){
node.oncontextmenu=function(e){
};
}
if(dojo.render.html.opera){
node._menufixer_opera=function(e){
if(e.ctrlKey){
this.oncontextmenu(e);
}
};
dojo.event.connect(node,"onclick",node,"_menufixer_opera");
}else{
node._menufixer_konq=function(e){
if(e.button==2){
e.preventDefault();
this.oncontextmenu(e);
}
};
dojo.event.connect(node,"onmousedown",node,"_menufixer_konq");
}
}
};
this.cleanNode=function(node){
if(_a8f){
if(node._menufixer_opera){
dojo.event.disconnect(node,"onclick",node,"_menufixer_opera");
delete node._menufixer_opera;
}else{
if(node._menufixer_konq){
dojo.event.disconnect(node,"onmousedown",node,"_menufixer_konq");
delete node._menufixer_konq;
}
}
if(node.oncontextmenu){
delete node.oncontextmenu;
}
}
};
};
dojo.provide("dojo.widget.Button");
dojo.widget.defineWidget("dojo.widget.Button",dojo.widget.HtmlWidget,{isContainer:true,caption:"",templateString:"<div dojoAttachPoint=\"buttonNode\" class=\"dojoButton\" style=\"position:relative;\" dojoAttachEvent=\"onMouseOver; onMouseOut; onMouseDown; onMouseUp; onClick:buttonClick; onKey:onKey; onFocus;\">\n  <div class=\"dojoButtonContents\" align=center dojoAttachPoint=\"containerNode\" style=\"position:absolute;z-index:2;\"></div>\n  <img dojoAttachPoint=\"leftImage\" style=\"position:absolute;left:0px;\">\n  <img dojoAttachPoint=\"centerImage\" style=\"position:absolute;z-index:1;\">\n  <img dojoAttachPoint=\"rightImage\" style=\"position:absolute;top:0px;right:0px;\">\n</div>\n",templateCssString:"/* ---- button --- */\n.dojoButton {\n	padding: 0 0 0 0;\n	font-size: 8pt;\n	white-space: nowrap;\n	cursor: pointer;\n	font-family: Myriad, Tahoma, Verdana, sans-serif;\n}\n\n.dojoButton .dojoButtonContents {\n	padding: 2px 2px 2px 2px;\n	text-align: center;		/* if icon and label are split across two lines, center icon */\n	color: white;\n}\n\n.dojoButtonLeftPart .dojoButtonContents {\n	padding-right: 8px;\n}\n\n.dojoButtonDisabled {\n	cursor: url(\"images/no.gif\"), default;\n}\n\n\n.dojoButtonContents img {\n	vertical-align: middle;	/* if icon and label are on same line, center them */\n}\n\n/* -------- colors ------------ */\n\n.dojoButtonHover .dojoButtonContents {\n}\n\n.dojoButtonDepressed .dojoButtonContents {\n	color: #293a4b;\n}\n\n.dojoButtonDisabled .dojoButtonContents {\n	color: #aaa;\n}\n\n\n/* ---------- drop down button specific ---------- */\n\n/* border between label and arrow (for drop down buttons */\n.dojoButton .border {\n	width: 1px;\n	background: gray;\n}\n\n/* button arrow */\n.dojoButton .downArrow {\n	padding-left: 10px;\n	text-align: center;\n}\n\n.dojoButton.disabled .downArrow {\n	cursor : default;\n}",templateCssPath:dojo.uri.dojoUri("src/widget/templates/ButtonTemplate.css"),inactiveImg:"src/widget/templates/images/soriaButton-",activeImg:"src/widget/templates/images/soriaActive-",pressedImg:"src/widget/templates/images/soriaPressed-",disabledImg:"src/widget/templates/images/soriaDisabled-",width2height:1/3,fillInTemplate:function(){
if(this.caption){
this.containerNode.appendChild(document.createTextNode(this.caption));
}
dojo.html.disableSelection(this.containerNode);
},postCreate:function(){
this._sizeMyself();
},_sizeMyself:function(){
if(this.domNode.parentNode){
var _a97=document.createElement("span");
dojo.html.insertBefore(_a97,this.domNode);
}
dojo.body().appendChild(this.domNode);
this._sizeMyselfHelper();
if(_a97){
dojo.html.insertBefore(this.domNode,_a97);
dojo.html.removeNode(_a97);
}
},_sizeMyselfHelper:function(){
var mb=dojo.html.getMarginBox(this.containerNode);
this.height=mb.height;
this.containerWidth=mb.width;
var _a99=this.height*this.width2height;
this.containerNode.style.left=_a99+"px";
this.leftImage.height=this.rightImage.height=this.centerImage.height=this.height;
this.leftImage.width=this.rightImage.width=_a99+1;
this.centerImage.width=this.containerWidth;
this.centerImage.style.left=_a99+"px";
this._setImage(this.disabled?this.disabledImg:this.inactiveImg);
if(this.disabled){
dojo.html.prependClass(this.domNode,"dojoButtonDisabled");
this.domNode.removeAttribute("tabIndex");
dojo.widget.wai.setAttr(this.domNode,"waiState","disabled",true);
}else{
dojo.html.removeClass(this.domNode,"dojoButtonDisabled");
this.domNode.setAttribute("tabIndex","0");
dojo.widget.wai.setAttr(this.domNode,"waiState","disabled",false);
}
this.domNode.style.height=this.height+"px";
this.domNode.style.width=(this.containerWidth+2*_a99)+"px";
},onMouseOver:function(e){
if(this.disabled){
return;
}
dojo.html.prependClass(this.buttonNode,"dojoButtonHover");
this._setImage(this.activeImg);
},onMouseDown:function(e){
if(this.disabled){
return;
}
dojo.html.prependClass(this.buttonNode,"dojoButtonDepressed");
dojo.html.removeClass(this.buttonNode,"dojoButtonHover");
this._setImage(this.pressedImg);
},onMouseUp:function(e){
if(this.disabled){
return;
}
dojo.html.prependClass(this.buttonNode,"dojoButtonHover");
dojo.html.removeClass(this.buttonNode,"dojoButtonDepressed");
this._setImage(this.activeImg);
},onMouseOut:function(e){
if(this.disabled){
return;
}
if(e.toElement&&dojo.html.isDescendantOf(e.toElement,this.buttonNode)){
return;
}
dojo.html.removeClass(this.buttonNode,"dojoButtonHover");
dojo.html.removeClass(this.buttonNode,"dojoButtonDepressed");
this._setImage(this.inactiveImg);
},onKey:function(e){
if(!e.key){
return;
}
var menu=dojo.widget.getWidgetById(this.menuId);
if(e.key==e.KEY_ENTER||e.key==" "){
this.onMouseDown(e);
this.buttonClick(e);
dojo.lang.setTimeout(this,"onMouseUp",75,e);
dojo.event.browser.stopEvent(e);
}
if(menu&&menu.isShowingNow&&e.key==e.KEY_DOWN_ARROW){
dojo.event.disconnect(this.domNode,"onblur",this,"onBlur");
}
},onFocus:function(e){
var menu=dojo.widget.getWidgetById(this.menuId);
if(menu){
dojo.event.connectOnce(this.domNode,"onblur",this,"onBlur");
}
},onBlur:function(e){
var menu=dojo.widget.getWidgetById(this.menuId);
if(!menu){
return;
}
if(menu.close&&menu.isShowingNow){
menu.close();
}
},buttonClick:function(e){
if(!this.disabled){
try{
this.domNode.focus();
}
catch(e2){
}
this.onClick(e);
}
},onClick:function(e){
},_setImage:function(_aa6){
this.leftImage.src=dojo.uri.dojoUri(_aa6+"l.gif");
this.centerImage.src=dojo.uri.dojoUri(_aa6+"c.gif");
this.rightImage.src=dojo.uri.dojoUri(_aa6+"r.gif");
},_toggleMenu:function(_aa7){
var menu=dojo.widget.getWidgetById(_aa7);
if(!menu){
return;
}
if(menu.open&&!menu.isShowingNow){
var pos=dojo.html.getAbsolutePosition(this.domNode,false);
menu.open(pos.x,pos.y+this.height,this);
}else{
if(menu.close&&menu.isShowingNow){
menu.close();
}else{
menu.toggle();
}
}
},setCaption:function(_aaa){
this.caption=_aaa;
this.containerNode.innerHTML=_aaa;
this._sizeMyself();
},setDisabled:function(_aab){
this.disabled=_aab;
this._sizeMyself();
}});
dojo.widget.defineWidget("dojo.widget.DropDownButton",dojo.widget.Button,{menuId:"",downArrow:"src/widget/templates/images/whiteDownArrow.gif",disabledDownArrow:"src/widget/templates/images/whiteDownArrow.gif",fillInTemplate:function(){
dojo.widget.DropDownButton.superclass.fillInTemplate.apply(this,arguments);
this.arrow=document.createElement("img");
dojo.html.setClass(this.arrow,"downArrow");
dojo.widget.wai.setAttr(this.domNode,"waiState","haspopup",this.menuId);
},_sizeMyselfHelper:function(){
this.arrow.src=dojo.uri.dojoUri(this.disabled?this.disabledDownArrow:this.downArrow);
this.containerNode.appendChild(this.arrow);
dojo.widget.DropDownButton.superclass._sizeMyselfHelper.call(this);
},onClick:function(e){
this._toggleMenu(this.menuId);
}});
dojo.widget.defineWidget("dojo.widget.ComboButton",dojo.widget.Button,{menuId:"",templateString:"<div class=\"dojoButton\" style=\"position:relative;top:0px;left:0px; text-align:none;\" dojoAttachEvent=\"onKey;onFocus\">\n\n	<div dojoAttachPoint=\"buttonNode\" class=\"dojoButtonLeftPart\" style=\"position:absolute;left:0px;top:0px;\"\n		dojoAttachEvent=\"onMouseOver; onMouseOut; onMouseDown; onMouseUp; onClick:buttonClick;\">\n		<div class=\"dojoButtonContents\" dojoAttachPoint=\"containerNode\" style=\"position:absolute;top:0px;right:0px;z-index:2;\"></div>\n		<img dojoAttachPoint=\"leftImage\" style=\"position:absolute;left:0px;top:0px;\">\n		<img dojoAttachPoint=\"centerImage\" style=\"position:absolute;right:0px;top:0px;z-index:1;\">\n	</div>\n\n	<div dojoAttachPoint=\"rightPart\" class=\"dojoButtonRightPart\" style=\"position:absolute;top:0px;right:0px;\"\n		dojoAttachEvent=\"onMouseOver:rightOver; onMouseOut:rightOut; onMouseDown:rightDown; onMouseUp:rightUp; onClick:rightClick;\">\n		<img dojoAttachPoint=\"arrowBackgroundImage\" style=\"position:absolute;top:0px;left:0px;z-index:1;\">\n		<img src=\"${dojoRoot}src/widget/templates/images/whiteDownArrow.gif\"\n		  		style=\"z-index:2;position:absolute;left:3px;top:50%;\">\n		<img dojoAttachPoint=\"rightImage\" style=\"position:absolute;top:0px;right:0px;\">\n	</div>\n\n</div>\n",splitWidth:2,arrowWidth:5,_sizeMyselfHelper:function(e){
var mb=dojo.html.getMarginBox(this.containerNode);
this.height=mb.height;
this.containerWidth=mb.width;
var _aaf=this.height/3;
if(this.disabled){
dojo.widget.wai.setAttr(this.domNode,"waiState","disabled",true);
this.domNode.removeAttribute("tabIndex");
}else{
dojo.widget.wai.setAttr(this.domNode,"waiState","disabled",false);
this.domNode.setAttribute("tabIndex","0");
}
this.leftImage.height=this.rightImage.height=this.centerImage.height=this.arrowBackgroundImage.height=this.height;
this.leftImage.width=_aaf+1;
this.centerImage.width=this.containerWidth;
this.buttonNode.style.height=this.height+"px";
this.buttonNode.style.width=_aaf+this.containerWidth+"px";
this._setImage(this.disabled?this.disabledImg:this.inactiveImg);
this.arrowBackgroundImage.width=this.arrowWidth;
this.rightImage.width=_aaf+1;
this.rightPart.style.height=this.height+"px";
this.rightPart.style.width=this.arrowWidth+_aaf+"px";
this._setImageR(this.disabled?this.disabledImg:this.inactiveImg);
this.domNode.style.height=this.height+"px";
var _ab0=this.containerWidth+this.splitWidth+this.arrowWidth+2*_aaf;
this.domNode.style.width=_ab0+"px";
},_setImage:function(_ab1){
this.leftImage.src=dojo.uri.dojoUri(_ab1+"l.gif");
this.centerImage.src=dojo.uri.dojoUri(_ab1+"c.gif");
},rightOver:function(e){
if(this.disabled){
return;
}
dojo.html.prependClass(this.rightPart,"dojoButtonHover");
this._setImageR(this.activeImg);
},rightDown:function(e){
if(this.disabled){
return;
}
dojo.html.prependClass(this.rightPart,"dojoButtonDepressed");
dojo.html.removeClass(this.rightPart,"dojoButtonHover");
this._setImageR(this.pressedImg);
},rightUp:function(e){
if(this.disabled){
return;
}
dojo.html.prependClass(this.rightPart,"dojoButtonHover");
dojo.html.removeClass(this.rightPart,"dojoButtonDepressed");
this._setImageR(this.activeImg);
},rightOut:function(e){
if(this.disabled){
return;
}
dojo.html.removeClass(this.rightPart,"dojoButtonHover");
dojo.html.removeClass(this.rightPart,"dojoButtonDepressed");
this._setImageR(this.inactiveImg);
},rightClick:function(e){
if(this.disabled){
return;
}
try{
this.domNode.focus();
}
catch(e2){
}
this._toggleMenu(this.menuId);
},_setImageR:function(_ab7){
this.arrowBackgroundImage.src=dojo.uri.dojoUri(_ab7+"c.gif");
this.rightImage.src=dojo.uri.dojoUri(_ab7+"r.gif");
},onKey:function(e){
if(!e.key){
return;
}
var menu=dojo.widget.getWidgetById(this.menuId);
if(e.key==e.KEY_ENTER||e.key==" "){
this.onMouseDown(e);
this.buttonClick(e);
dojo.lang.setTimeout(this,"onMouseUp",75,e);
dojo.event.browser.stopEvent(e);
}else{
if(e.key==e.KEY_DOWN_ARROW&&e.altKey){
this.rightDown(e);
this.rightClick(e);
dojo.lang.setTimeout(this,"rightUp",75,e);
dojo.event.browser.stopEvent(e);
}else{
if(menu&&menu.isShowingNow&&e.key==e.KEY_DOWN_ARROW){
dojo.event.disconnect(this.domNode,"onblur",this,"onBlur");
}
}
}
}});
dojo.provide("dojo.widget.Tooltip");
dojo.widget.defineWidget("dojo.widget.Tooltip",[dojo.widget.ContentPane,dojo.widget.PopupContainerBase],{caption:"",showDelay:500,hideDelay:100,connectId:"",templateCssString:".dojoTooltip {\n	border: solid black 1px;\n	background: beige;\n	color: black;\n	position: absolute;\n	font-size: small;\n	padding: 2px 2px 2px 2px;\n	z-index: 10;\n	display: block;\n}\n",templateCssPath:dojo.uri.dojoUri("src/widget/templates/TooltipTemplate.css"),fillInTemplate:function(args,frag){
if(this.caption!=""){
this.domNode.appendChild(document.createTextNode(this.caption));
}
this._connectNode=dojo.byId(this.connectId);
dojo.widget.Tooltip.superclass.fillInTemplate.call(this,args,frag);
this.addOnLoad(this,"_loadedContent");
dojo.html.addClass(this.domNode,"dojoTooltip");
var _abc=this.getFragNodeRef(frag);
dojo.html.copyStyle(this.domNode,_abc);
this.applyPopupBasicStyle();
},postCreate:function(args,frag){
dojo.event.connect(this._connectNode,"onmouseover",this,"_onMouseOver");
dojo.widget.Tooltip.superclass.postCreate.call(this,args,frag);
},_onMouseOver:function(e){
this._mouse={x:e.pageX,y:e.pageY};
if(!this._tracking){
dojo.event.connect(document.documentElement,"onmousemove",this,"_onMouseMove");
this._tracking=true;
}
this._onHover(e);
},_onMouseMove:function(e){
this._mouse={x:e.pageX,y:e.pageY};
if(dojo.html.overElement(this._connectNode,e)||dojo.html.overElement(this.domNode,e)){
this._onHover(e);
}else{
this._onUnHover(e);
}
},_onHover:function(e){
if(this._hover){
return;
}
this._hover=true;
if(this._hideTimer){
clearTimeout(this._hideTimer);
delete this._hideTimer;
}
if(!this.isShowingNow&&!this._showTimer){
this._showTimer=setTimeout(dojo.lang.hitch(this,"open"),this.showDelay);
}
},_onUnHover:function(e){
if(!this._hover){
return;
}
this._hover=false;
if(this._showTimer){
clearTimeout(this._showTimer);
delete this._showTimer;
}
if(this.isShowingNow&&!this._hideTimer){
this._hideTimer=setTimeout(dojo.lang.hitch(this,"close"),this.hideDelay);
}
if(!this.isShowingNow){
dojo.event.disconnect(document.documentElement,"onmousemove",this,"_onMouseMove");
this._tracking=false;
}
},open:function(){
if(this.isShowingNow){
return;
}
dojo.widget.PopupContainerBase.prototype.open.call(this,this._mouse.x,this._mouse.y,null,[this._mouse.x,this._mouse.y],"TL,TR,BL,BR",[10,15]);
},close:function(){
if(this.isShowingNow){
if(this._showTimer){
clearTimeout(this._showTimer);
delete this._showTimer;
}
if(this._hideTimer){
clearTimeout(this._hideTimer);
delete this._hideTimer;
}
dojo.event.disconnect(document.documentElement,"onmousemove",this,"_onMouseMove");
this._tracking=false;
dojo.widget.PopupContainerBase.prototype.close.call(this);
}
},_position:function(){
this.move(this._mouse.x,this._mouse.y,[10,15],"TL,TR,BL,BR");
},_loadedContent:function(){
if(this.isShowingNow){
this._position();
}
},checkSize:function(){
},uninitialize:function(){
this.close();
dojo.event.disconnect(this._connectNode,"onmouseover",this,"_onMouseOver");
}});
if(!this["dojo"]){
alert("\"dojo/__package__.js\" is now located at \"dojo/dojo.js\". Please update your includes accordingly");
}
dojo.provide("dojo.collections.Collections");
dojo.collections.DictionaryEntry=function(k,v){
this.key=k;
this.value=v;
this.valueOf=function(){
return this.value;
};
this.toString=function(){
return String(this.value);
};
};
dojo.collections.Iterator=function(arr){
var a=arr;
var _ac7=0;
this.element=a[_ac7]||null;
this.atEnd=function(){
return (_ac7>=a.length);
};
this.get=function(){
if(this.atEnd()){
return null;
}
this.element=a[_ac7++];
return this.element;
};
this.map=function(fn,_ac9){
var s=_ac9||dj_global;
if(Array.map){
return Array.map(a,fn,s);
}else{
var arr=[];
for(var i=0;i<a.length;i++){
arr.push(fn.call(s,a[i]));
}
return arr;
}
};
this.reset=function(){
_ac7=0;
this.element=a[_ac7];
};
};
dojo.collections.DictionaryIterator=function(obj){
var a=[];
var _acf={};
for(var p in obj){
if(!_acf[p]){
a.push(obj[p]);
}
}
var _ad1=0;
this.element=a[_ad1]||null;
this.atEnd=function(){
return (_ad1>=a.length);
};
this.get=function(){
if(this.atEnd()){
return null;
}
this.element=a[_ad1++];
return this.element;
};
this.map=function(fn,_ad3){
var s=_ad3||dj_global;
if(Array.map){
return Array.map(a,fn,s);
}else{
var arr=[];
for(var i=0;i<a.length;i++){
arr.push(fn.call(s,a[i]));
}
return arr;
}
};
this.reset=function(){
_ad1=0;
this.element=a[_ad1];
};
};
dojo.provide("dojo.collections.ArrayList");
dojo.collections.ArrayList=function(arr){
var _ad8=[];
if(arr){
_ad8=_ad8.concat(arr);
}
this.count=_ad8.length;
this.add=function(obj){
_ad8.push(obj);
this.count=_ad8.length;
};
this.addRange=function(a){
if(a.getIterator){
var e=a.getIterator();
while(!e.atEnd()){
this.add(e.get());
}
this.count=_ad8.length;
}else{
for(var i=0;i<a.length;i++){
_ad8.push(a[i]);
}
this.count=_ad8.length;
}
};
this.clear=function(){
_ad8.splice(0,_ad8.length);
this.count=0;
};
this.clone=function(){
return new dojo.collections.ArrayList(_ad8);
};
this.contains=function(obj){
for(var i=0;i<_ad8.length;i++){
if(_ad8[i]==obj){
return true;
}
}
return false;
};
this.forEach=function(fn,_ae0){
var s=_ae0||dj_global;
if(Array.forEach){
Array.forEach(_ad8,fn,s);
}else{
for(var i=0;i<_ad8.length;i++){
fn.call(s,_ad8[i],i,_ad8);
}
}
};
this.getIterator=function(){
return new dojo.collections.Iterator(_ad8);
};
this.indexOf=function(obj){
for(var i=0;i<_ad8.length;i++){
if(_ad8[i]==obj){
return i;
}
}
return -1;
};
this.insert=function(i,obj){
_ad8.splice(i,0,obj);
this.count=_ad8.length;
};
this.item=function(i){
return _ad8[i];
};
this.remove=function(obj){
var i=this.indexOf(obj);
if(i>=0){
_ad8.splice(i,1);
}
this.count=_ad8.length;
};
this.removeAt=function(i){
_ad8.splice(i,1);
this.count=_ad8.length;
};
this.reverse=function(){
_ad8.reverse();
};
this.sort=function(fn){
if(fn){
_ad8.sort(fn);
}else{
_ad8.sort();
}
};
this.setByIndex=function(i,obj){
_ad8[i]=obj;
this.count=_ad8.length;
};
this.toArray=function(){
return [].concat(_ad8);
};
this.toString=function(_aee){
return _ad8.join((_aee||","));
};
};
dojo.provide("dojo.collections.Dictionary");
dojo.collections.Dictionary=function(_aef){
var _af0={};
this.count=0;
var _af1={};
this.add=function(k,v){
var b=(k in _af0);
_af0[k]=new dojo.collections.DictionaryEntry(k,v);
if(!b){
this.count++;
}
};
this.clear=function(){
_af0={};
this.count=0;
};
this.clone=function(){
return new dojo.collections.Dictionary(this);
};
this.contains=this.containsKey=function(k){
if(_af1[k]){
return false;
}
return (_af0[k]!=null);
};
this.containsValue=function(v){
var e=this.getIterator();
while(e.get()){
if(e.element.value==v){
return true;
}
}
return false;
};
this.entry=function(k){
return _af0[k];
};
this.forEach=function(fn,_afa){
var a=[];
for(var p in _af0){
if(!_af1[p]){
a.push(_af0[p]);
}
}
var s=_afa||dj_global;
if(Array.forEach){
Array.forEach(a,fn,s);
}else{
for(var i=0;i<a.length;i++){
fn.call(s,a[i],i,a);
}
}
};
this.getKeyList=function(){
return (this.getIterator()).map(function(_aff){
return _aff.key;
});
};
this.getValueList=function(){
return (this.getIterator()).map(function(_b00){
return _b00.value;
});
};
this.item=function(k){
if(k in _af0){
return _af0[k].valueOf();
}
return undefined;
};
this.getIterator=function(){
return new dojo.collections.DictionaryIterator(_af0);
};
this.remove=function(k){
if(k in _af0&&!_af1[k]){
delete _af0[k];
this.count--;
return true;
}
return false;
};
if(_aef){
var e=_aef.getIterator();
while(e.get()){
this.add(e.element.key,e.element.value);
}
}
};
dojo.provide("dojo.collections.Stack");
dojo.collections.Stack=function(arr){
var q=[];
if(arr){
q=q.concat(arr);
}
this.count=q.length;
this.clear=function(){
q=[];
this.count=q.length;
};
this.clone=function(){
return new dojo.collections.Stack(q);
};
this.contains=function(o){
for(var i=0;i<q.length;i++){
if(q[i]==o){
return true;
}
}
return false;
};
this.copyTo=function(arr,i){
arr.splice(i,0,q);
};
this.forEach=function(fn,_b0b){
var s=_b0b||dj_global;
if(Array.forEach){
Array.forEach(q,fn,s);
}else{
for(var i=0;i<q.length;i++){
fn.call(s,q[i],i,q);
}
}
};
this.getIterator=function(){
return new dojo.collections.Iterator(q);
};
this.peek=function(){
return q[(q.length-1)];
};
this.pop=function(){
var r=q.pop();
this.count=q.length;
return r;
};
this.push=function(o){
this.count=q.push(o);
};
this.toArray=function(){
return [].concat(q);
};
};

