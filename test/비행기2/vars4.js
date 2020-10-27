var Hom=function(mx,my,deg){
	this.span;
	this.img;
	this.x=mx;
	this.y=my;
	this.xw=300;
	this.yw=300;
	this.deg=deg;
	this.bt1;
	this.m_bt;
	this.mCnt=0;
	this.init=function(){
		this.span=document.createElement("span");
		box.appendChild(this.span);
		
		this.img=document.createElement("img");
		this.img.src="../imgs/im/home1.png";
		this.img.style.position="absolute";
		this.img.style.left=this.x-(this.xw/2)+"px";
		this.img.style.top=this.y-(this.yw/2)+"px";
		this.img.style.width=this.xw+"px";
		this.img.style.height=this.yw+"px";
		this.span.appendChild(this.img);
		
		this.bt1=document.createElement("INPUT");
		this.bt1.style.width=60+"px";
		this.bt1.style.height=40+"px";
		this.bt1.style.position="absolute";
		this.bt1.setAttribute("type","button");
		this.bt1.value="Shild";
		this.bt1.onclick=function(){
			if(p1.shild<5&&money>=1){
				showMs("쉴드를 충전하였습니다.",2000,2);
				p1.shild=5;
				money-=1;
			}else{
				if(money<=0){
					showMs("쉴드를 충전할 돈이 없습니다.",2000,1);
				}else{
					showMs("쉴드가 이미 꽉찼습니다.",2000,2);
				}
			}
		};
		this.span.appendChild(this.bt1);
		
		this.m_bt=document.createElement("INPUT");
		this.m_bt.style.width=60+"px";
		this.m_bt.style.height=40+"px";
		this.m_bt.style.position="absolute";
		this.m_bt.setAttribute("type","button");
		this.m_bt.value="점수=>$";
		this.m_bt.onclick=function(){
			if(point>=20){
				showMs("점수를 돈으로교환: $+1, 점수-20",2000,4);
				money+=1;
				point-=20;
			}else{
				showMs("점수가 20이상 필요합니다.",2000,1);
			}
		};
		this.span.appendChild(this.m_bt);
	}
	this.move=function(){
		//계속돌기위해 각도를 움직이자.
		this.deg++;
		if(this.deg>360){
			this.deg=0;
		}
		//움직이자!
		this.img.style.left=this.x-(this.xw/2)+"px";
		this.img.style.top=this.y-(this.yw/2)+"px";
		this.img.style.WebkitTransform="rotate("+(this.deg+90)+"deg)";
		this.bt1.style.left=parseInt(this.img.style.left)+80+"px";
		this.bt1.style.top=parseInt(this.img.style.top)+-15+"px";
		this.m_bt.style.left=parseInt(this.img.style.left)+80+"px";
		this.m_bt.style.top=parseInt(this.img.style.top)+25+"px";
		//플레이어가 가까이오면 버튼보이게하기
		var d1=getDistance(this.x,this.y,p1.x,p1.y);
		var d2=this.xw/2+p1.xw/2;
		if(d1<d2){
			if(isMclick){showMs("$1=>쉴드충전,점수20=>$1",5000,4);}
			//쉴드버튼
			this.bt1.style.visibility="visible";
			this.bt1.disabled=false;
			//to money button
			this.m_bt.style.visibility="visible";
			this.m_bt.disabled=false;
			isMclick=false;//마우스로 움직이는 것 막기
		}else{
			//쉴드버튼
			this.bt1.style.visibility="hidden";
			this.bt1.disabled=true;
			//to money button
			this.m_bt.style.visibility="hidden";
			this.m_bt.disabled=true;
			isMclick=true;
		}
		
		
		//화면 밖이면 안보이게하기
		if(this.x>800||this.x<0){
			this.img.style.visibility="hidden";
		}else if(this.y>800||this.y<0){
			this.img.style.visibility="hidden";
		}else{
			this.img.style.visibility="visible";
		}
		this.fire();
	}
	this.fire=function(){
		
		if(this.mCnt<=2){
			this.mCnt++;
		}
		//주변적비행기 지우기
		for(var i=0;i<arEn.length;i++){
			if(getDistance(this.x,this.y,arEn[i].x,arEn[i].y)<150){
				if(this.mCnt>1){
					var hms1=new HomMs(this.x,this.y,arEn[i].x,arEn[i].y,i,0);
					this.mCnt=0;
				}
			}
		}
		//주변의 적 미사일 지우기
		for(var i=0;i<arMsE.length;i++){
			if(getDistance(this.x,this.y,arMsE[i].x,arMsE[i].y)<150){
				if(this.mCnt>1){
					var hms1=new HomMs(this.x,this.y,arMsE[i].x,arMsE[i].y,i,1);
					this.mCnt=0;
				}
			}
		}
	}
	this.del=function(){
		box.removeChild(this.span);
	}
	this.init();
}
var HomMs=function(x,y,x2,y2,mi,kind){
	this.span;
	this.ms;
	this.x=x;
	this.y=y;
	this.x2=x2;
	this.y2=y2;
	this.mi=mi;
	this.kind=kind//적기인지 적 미사일인지구분 0은 적기, 1은 적 미사일
	this.deg=0;
	this.distance=0;
	this.st;
	this.init=function(){
		this.span=document.createElement("span");
		box.appendChild(this.span);
		this.ms=document.createElement("img");
		this.ms.src="../imgs/im/ms2.png";
		
		//거리만큼 그리기
		this.distance=getDistance(this.x,this.y,this.x2,this.y2);
		this.ms.style.width=10+"px";
		this.ms.style.height=this.distance+"px";
		//각도만큼 회전
		this.deg=getD(this.x,this.y,this.x2,this.y2);
		this.ms.style.WebkitTransform="rotate("+(this.deg+90)+"deg)";
		//위치지정
		this.ms.style.position="absolute";
		this.ms.style.left=this.x2-(10/5)+"px";
		this.ms.style.top=this.y2-(this.distance/2)+"px";
		this.span.appendChild(this.ms);
		this.setDel();
	}
	this.move=function(){
		
	}
	this.setDel=function(){
		var obj=this;
		if(this.kind==0){
			//적비행기 지우기
			arEn[mi].shild-=1;
			if(arEn[mi].shild<=0){
				arEn[mi].del();
				arEn.splice(mi,1);
			}
		}else if(this.kind==1){
			//적미사일지우기
			arMsE[mi].del();
			arMsE.splice(mi,1);
		}
		//home 미사일도 지우기
		this.st=setTimeout(function(){box.removeChild(obj.span);return;},300);
	}
	this.init();
}
