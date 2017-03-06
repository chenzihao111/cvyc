// JavaScript Document

function getByClass(oParent,sClass){
	var aEle;
	if(document.getElementsByClassName){
		aEle = oParent.getElementsByClassName(sClass);
		return aEle;
	}else{
		aEle=oParent.getElementsByTagName('*');
		var result=[];
		
		//var re = /\bbox\b/;
		var re = new RegExp('\\b'+sClass+'\\b');
		
		for(var i=0;i<aEle.length;i++){	
			if(re.test(aEle[i].className)){
				result.push(aEle[i])
			}
		}
		return result;
	}

}

function addClass(obj,sClass){
	var re = new RegExp('\\b'+sClass+'\\b');
	if(!re.test(obj.className)){
		if(obj.className){
			obj.className = obj.className + ' ' + sClass;
		}else{
		obj.className=sClass;
	}
	  obj.className=obj.className.replace(/^\s+|\s+$/g,'').replace(/\s+/g,' ');
	}
}

function removeClass(obj,sClass){
	var re = new RegExp('\\b'+sClass+'\\b','g');
	if(re.test(obj.className)){
			//this.elements[i].className=this.elements[i].className.replace(re,'').replace(/^\s+|\s+$/,'').replace(/\s+/g,' ');
			obj.className=obj.className.replace(re,'').replace(/^\s+|\s+$/g,'').replace(/\s+/g,' ');
		}
}

function hasClass(obj,sClass){
	var re = new RegExp('\\b' + sClass + '\\b','g');
	if(re.test(obj.className))return true;
	return false;
}

function toggleClass(obj,sClass){
	if(hasClass(obj,sClass)){
		removeClass(obj,sClass);
	}else{
		addClass(obj,sClass)
	}
}

function getStyle(obj,attr){
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj,false)[attr];	
}

function findMax(tmp){
    var max = tmp[0];

    for(var i=1;i<tmp.length;i++){ 
     if(max<tmp[i])max=tmp[i];
	}
	return max
}

function addMouseWheel(obj,fn){
	//1.判断浏览器
	if(navigator.userAgent.toLowerCase().indexOf('firefox') != -1){
		//ff
		obj.addEventListener('DOMMouseScroll', fnWheel,false);
	}else{
		//other
		obj.onmousewheel=fnWheel;
	}
	//2.确定方向
	function fnWheel(ev){
		var oEvt=ev||event;
		if(oEvt.wheelDelta){
			//ie chrome 	-120下
			var down=oEvt.wheelDelta<0?true:false;
		}else{
			//ff 			3下
			var down=oEvt.detail>0?true:false;
		}
		//3.回调传参
		fn && fn(down);
	}
	
}


function getPos(obj){
	var l=t=0;

	while(obj){
	//for(;obj;){
		//找	累加	l
		l+=obj.offsetLeft;	//取到定位父级的距离
		t+=obj.offsetTop;	//取到定位父级的距离
		obj=obj.offsetParent;	//把obj的定位父级变成obj
		
	}
	return {left:l,top:t};
	
}

function removeEvent(obj,fn,sEvt){
	if(obj.removeEventListener){
		obj.removeEventListener(sEvt,fn,false);	
	}else{
		obj.detachEvent('on'+sEvt,fn);
	}	
}

function addEvent(obj,fn,sEvt){
	if(obj.addEventListener){
		obj.addEventListener(sEvt,fn,false);	
	}else{
		obj.attachEvent('on'+sEvt,fn);
	}	
}

function fillZero(n){
	return n<10?'0'+n:''+n;	
}

function addCookie(name,value,iDay){
	
	if(iDay){
		var oDate = new Date();
		oDate.setDate(oDate.getDate() + iDay);
		document.cookie = name + "=" + value + ";path=/;expires=" + oDate.toUTCString();
	} else {
		document.cookie = name + "=" + value + ";path=/";
	}
}

function getCookie(name){
	var arr = document.cookie.split("; ");
	for(var i = 0; i < arr.length; i++){
		var arr2 = arr[i].split("=");
		if(name == arr2[0]){
			return arr2[1];
		}
	}
	
	return "";
}

function removeCookie(name){
	addCookie(name,"",-1)
}

function DealTime(time){
	var d = new Date();
	d.setTime(time);
	var year=d.getFullYear();
	var month=d.getMonth()+1;
	month=fillZero(month);
	var date=d.getDate();
	date=fillZero(date);
	var hours=d.getHours();
	hours=fillZero(hours);
	var minutes=d.getMinutes();
	minutes=fillZero(minutes);
	var seconds=d.getSeconds();
	seconds=fillZero(seconds);
	var t = year+'-'+month+'-'+date+' '+hours+':'+minutes+':'+seconds;
	
	return t;
}

/*localStorage和userData的存取数据的兼容方法*/
//localStorage ----->ie高 chome ff
//userData -------> ie7,8,9
var localData = {
        hname:location.hostname?location.hostname:'localStatus',
        isLocalStorage:window.localStorage?true:false,
        dataDom:null,

        initDom:function(){ //初始化userData
            if(!this.dataDom){
                try{
                    this.dataDom = document.createElement('input');//这里使用hidden的input元素
                    this.dataDom.type = 'hidden';
                    this.dataDom.style.display = "none";
                    this.dataDom.addBehavior('#default#userData');//这是userData的语法
                    document.body.appendChild(this.dataDom);
                    var exDate = new Date();
                    exDate = exDate.getDate()+30;
                    this.dataDom.expires = exDate.toUTCString();//设定过期时间
                }catch(ex){
                    return false;
                }
            }
            return true;
        },
        set:function(key,value){
            if(this.isLocalStorage){
                window.localStorage.setItem(key,value);
            }else{
                if(this.initDom()){
                    this.dataDom.load(this.hname);
                    this.dataDom.setAttribute(key,value);
                    this.dataDom.save(this.hname)
                }
            }
        },
        get:function(key){
            if(this.isLocalStorage){
                return window.localStorage.getItem(key);
            }else{
                if(this.initDom()){
                    this.dataDom.load(this.hname);
                    return this.dataDom.getAttribute(key);
                }
            }
        },
        remove:function(key){
            if(this.isLocalStorage){
                localStorage.removeItem(key);
            }else{
                if(this.initDom()){
                    this.dataDom.load(this.hname);
                    this.dataDom.removeAttribute(key);
                    this.dataDom.save(this.hname)
                }
            }
        }
    }