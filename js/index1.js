// JavaScript Document
function view() {
    return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight
    };
}

function id(obj) {
    return document.getElementById(obj);
}

function bind(obj,ev,fn){
	if(obj.addEventListener){
		obj.addEventListener(ev,fn,false);
	}else{
		obj.attachEvent('on'+ev,function(){
			fn.call(obj);
		})
	}
}
function addClass(obj, sClass) { 
    var aClass = obj.className.split(' ');
    if (!obj.className) {
        obj.className = sClass;
        return;
    }
    for (var i = 0; i < aClass.length; i++) {
        if (aClass[i] === sClass) return;
    }
    obj.className += ' ' + sClass;
}

function removeClass(obj,sClass){
	var aClass=obj.className.split(' ');
	if(!obj.className){
		return;
	}
	for(var i=0; i<aClass.length; i++){
		if(aClass[i] === sClass){
			aClass.splice(i,1)
			obj.className=aClass.join(' ');
			break;
		} 
	}
}


function fnLoad(){
	var oW=id('welcome');
	var iTime=new Date().getTime();
	var bImgLoad=true;//假设已经全部加载完成了
	var bTime=false;
	var oTimer=0;
	bind(oW,'transitionend',end);
	bind(oW,'webkitTransitionEnd',end);
	oTimer=setInterval(function(){
		if(new Date().getTime() - iTime >= 5000){
			bTime = true;
		}
		if(bImgLoad && bTime){
			clearInterval(oTimer);
			oW.style.opacity=0;

		}
	},1000);
	function end(){
		alert('动画结束');
		removeClass(oW,'pageShow');
		fnTab();
	}
	
}



/*bind(document,'touchmove',function(ev){
	ev.preventDefault();
})*/

function fnTab(){
	
	var oTab=id('tabPic');
	var oList=id('picList');
	var aNav=oTab.getElementsByTagName('nav')[0].children;
	var iNow=0;
	var iX=0;
	var iW=view().w;
	var oTimer=null;
	var iStartTouchX=0;
	var iStartX=0;
	bind(oTab,"touchstart",fnStart);
	bind(oTab,"touchmove",fnMove);
	bind(oTab,"touchend",fnEnd);
	newsBtn();
	fnScore();
	auto();
	if(!window.BfnScore){
		fnScore();
		window.BfnScore=true;
	}	
	
	function auto(){
		oTimer=setInterval(function(){
			iNow++;	
			iNow=iNow%aNav.length;
			tab();
		},2000);
	}	

	function fnStart(ev)
	{
		oList.style.transition="none";
		ev=ev.changedTouches[0];
		iStartTouchX=ev.pageX;
		iStartX=iX;
		clearInterval(oTimer);
	}
	function fnMove(ev)
	{
		ev=ev.changedTouches[0];
		var iDis=ev.pageX-iStartTouchX;
		iX=iStartX+iDis;
		oList.style.WebkitTransform=oList.style.transform="translateX("+iX+"px)";
	}
	function fnEnd()
	{
		iNow=iX/iW;
		iNow=-Math.round(iNow);
		if(iNow<0)
		{
			iNow=0;
		}
		if(iNow>aNav.length-1)
		{
			iNow=aNav.length-1;
		}
		tab();
		auto();
	} 

	
	function tab()
	{
		iX=-iNow*iW;
		oList.style.transition="0.5s";
		oList.style.WebkitTransform=oList.style.transform="translateX("+iX+"px)";
		for(var i=0;i<aNav.length;i++)
		{
			removeClass(aNav[i],"active");
		}
		addClass(aNav[iNow],"active");
	}
}

function fnScore(){
	var oScore=id('score');
	var aLi=oScore.getElementsByTagName('li');
    var arr=['好失望','没有想象的那么好','很一般','良好','棒极了']
	for(var i=0; i<aLi.length; i++){
		fn(aLi[i]);
	}
	function fn(oLi){
		var aNav=oLi.getElementsByTagName('a');
		var oIn=oLi.getElementsByTagName('input')[0];
		for(var i=0; i<aNav.length; i++){
			aNav[i].index=i;
			bind(aNav[i],'touchstart',function(){
				for(var i=0; i<aNav.length; i++){
					if(i<=this.index){
						addClass(aNav[i],'active');
					}else{
						removeClass(aNav[i],'active');
					}
				}
				//oIn.value=parseInt(this.index+1);
				oIn.value=arr[this.index];
			})

		}

	}
    fnIndex()
}

function fninfo(oInfo,sInfo){
	oInfo.innerHTML=sInfo;
	oInfo.style.WebkitTransform='scale(1)';
	oInfo.style.Transform='scale(1)';
	oInfo.style.opacity='1';
	setTimeout(function(){
		oInfo.style.WebkitTransform='scale(0)';
		oInfo.style.Transform='scale(0)';
		oInfo.style.opacity='0';
	},1000)
}

function fnIndex(){
	var oIndex=id('index');
	var oInfo=oIndex.getElementsByClassName('info')[0];
	var oBtn=oIndex.getElementsByClassName('btn')[0];
	var bScore=false;
	var bTag=false;
	bind(oBtn,'touchstart',fnEnd);
	function fnEnd(){
		bScore=fnScoreChecked();
		bTag=fnIndexTag();
		if(bScore){
			if(bTag){
				fnIndexOut();
			}else{
				fninfo(oInfo,'给景区添加标签');
			}
		}else{
			fninfo(oInfo,'给景区评分');
		}
	}
	
	function fnScoreChecked(){
		var oScore=id('score');
		var aInput=oScore.getElementsByTagName('input');
		
		for(var i=0; i<aInput.length; i++){
		    if(aInput[i].value==0){
			return false;
		}
	  }
	  return true;
	}
	
	function fnIndexTag(){
		var oTag=id('indexTag');
		var aInput=oTag.getElementsByTagName('input');
		for(var i=0; i<aInput.length; i++){
			if(aInput[i].checked){
				return true;
			}
		}
		return false;
	}
}

function fnIndexOut(){
	var oMask=id('mask');
	var oIndex=id('index');
	var oNew=id('news');
	addClass(oNew,'pageShow');
	addClass(oMask,'pageShow');
	   fnNews();
	setTimeout(function(){
		oMask.style.opacity=1;
		oIndex.style.WebkitFilter=oIndex.style.filter='blur(10px)';
	},10);
	setTimeout(function(){
		removeClass(oMask,'pageShow');
		oMask.style.opacity=0;
		oIndex.style.WebkitFilter=oIndex.style.filter='blur(0px)';
		oNew.style.WebkitTransition=oNew.style.transition='.5s';
		oNew.style.opacity=1;
	},3000)	
	
}

function fnNews(){
	var oNews=id('news');
	var aInput=oNews.getElementsByTagName('input');
    var oInfo=oNews.getElementsByClassName('info')[0];
	aInput[0].onchange=function(){
		if(this.files[0].type.split('/')[0]=='video'){
			fnNewsOut();
		}else{
			fninfo(oInfo,'请选择视频文件');
		}
	}
	aInput[1].onchange=function(){
		if(this.files[0].type.split('/')[0]=='image'){
			fnNewsOut();
		}else{
			fninfo(oInfo,'请选择图像文件');
		}
	}
}

function fnNewsOut(){
	var oNews=id('news'); 
	var oform=id('form');
	removeClass(oNews,'pageShow');
	oNews.style.cssText='';
	addClass(oform,'pageShow');
	formIn();
}

function formIn(){
	var oForm=id('form');
	var oVer=id('over');
	var aFormTag=id('formTag').getElementsByTagName('label');
	var oBtn=oForm.getElementsByClassName('btn')[0];
	var abuff=false;
	
	for(var i=0; i<aFormTag.length; i++){
		bind(aFormTag[i],'touchend',function(){
			abuff=true;
			addClass(oBtn,'submit');
		})
	}
	bind(oBtn,'touchend',function(){
		if(abuff){
			addClass(oVer,'pageShow');
			removeClass(oForm,'pageShow');
			over();
		}
	})
}

function over(){
	var oVer=id('over');
	var oBtn=oVer.getElementsByClassName('btn')[0];
	bind(oBtn,'touchend',function(){
		removeClass(oVer,'pageShow');
	})
}
function newsBtn(){
	var oNew=id('news');
	var oNewsBtn=id('newsBtn')
	bind(oNewsBtn,'touchstart',function(){
            addClass(oNew,'pageShow');
			oNew.style.WebkitTransition=oNew.style.transition='.5s';
			oNew.style.opacity=1;
	})

}
