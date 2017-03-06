// JavaScript Document

/*插入一组数据*/
var ip = 'http://192.168.8.111:8080/';
function creatOdl(className,data,num){
	var oDiv = document.createElement('div');
	    oDiv.className = className;
		var oH2 = document.createElement('h2');
		oH2.innerHTML =  data[num][0].typeName;
		oDiv.insertBefore(oH2,oDiv.children[0]);
	for(var i=0; i<data[num].length; i++){ 
		  var oDl = document.createElement('dl');
		  oDl.setAttribute('fromType',data[num][i].fromType)
		  if(data[num][i].isTop == 1){
			oDl.innerHTML=
				 '<dt id='+data[num][i].id+' class="isTop"><img src="'+data[num][i].coverTopUrl+'"></dt>\
					<dd id='+data[num][i].playUrl+'>\
					<p>'+data[num][i].videoName+'</p>\
				  </dd>';
		    oDl.style.width = '100%';
		    oDl.style.height = '4.889rem';			  
		    addClass(oDiv,'hasTop');
		    oDiv.insertBefore(oDl,oDiv.children[1]);
		  }else{
			 oDl.innerHTML=
				 '<dt id='+data[num][i].id+'><img src="'+data[num][i].coverUrl+'"></dt>\
					<dd id='+data[num][i].playUrl+'>\
					<p class='+data[num][i].coverHotUrl+'>'+data[num][i].videoName+'</p>\
				  </dd>';
			  oDiv.appendChild(oDl);
		  }	  		  
	}
	return oDiv;
}
function view() {
    return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight
    };
}
/*跳转artboard7*/
function toArt7(parent){
	var obottomLoading = getByClass(document,'bottomLoading')[0]
	var oSection = document.getElementById(parent);
	var oDt = oSection.getElementsByTagName("dt");
 	for(var i=0; i<oDt.length; i++){
		addEvent(oDt[i],function(){
			var This = this;
			var id = This.getAttribute('id')
			window.localStorage.setItem('id',id);
			var fromType =  This.parentNode.getAttribute('fromType')
			if(fromType == 2){
				obottomLoading.style.display = 'block';
				//HostApp.play(id,fromType);
				window.location.href = './artboard7.html';
			}
			obottomLoading.style.display = 'none';		 
		},'click')
	}   
}


/*window.history.back(-1);*/
function goBack(){
	var oPage = getByClass(document,'pageShow')[0];
	var backBtn = getByClass(oPage,'return')[0];
	var numberOfEntries = window.history.length;
		$(backBtn).on('click',goBack2)
}

function goBack2(){
	var currentUrl = document.location.toString().toLowerCase().substring(29);
		if(currentUrl == 'artboard2_2.html'){
		window.location.href = './artboard2.html';
	}else if(currentUrl == 'artboard4.html'||currentUrl == 'artboard8.html'||currentUrl == 'artboard5.html'||currentUrl == 'artboard6.html'||currentUrl == 'artboard9.html'){
		window.location.href = './artboard3.html';
	}else if(currentUrl == 'artboard2.html' || currentUrl == 'artboard3.html'){
		window.location.href = './index.html';
	}else if(currentUrl == 'index.html'){
		return;
	}else{
		window.history.back(-1);   
}

//<span>'+data[num][i].videoSummary+'</span>\

/*huancun*/
/*code1,简单粗暴的*/
//applicationCache.onupdateready = function(){
//applicationCache.swapCache();
//location.reload();
//};
/*code2，缓存公用方法*/
 var EventUtil = {
 addHandler: function(element, type, handler) {
    if (element.addEventListener) {
       element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
       element.attachEvent("on" + type, handler);
    } else {
       element["on" + type] = handler;
      }
    }
 };
 EventUtil.addHandler(applicationCache, "updateready", function() { //缓存更新并已下载，要在下次进入页面生效
       applicationCache.update(); //检查缓存manifest文件是否更新，ps:页面加载默认检查一次。
       applicationCache.swapCache(); //交换到新的缓存项中，交换了要下次进入页面才生效
       location.reload(); //重新载入页面
 })};








