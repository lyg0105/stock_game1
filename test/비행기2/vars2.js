var Player=function(){
	this.span;
	this.plan;
	this.img_sh;
	this.span_sh;
	this.x=400;
	this.y=400;
	this.x2=this.x;
	this.y2=this.y;
	this.xw=60;
	this.yw=60;
	this.deg=270;
	this.tdeg=270;
	this.speed=10;
	this.mCnt=30;//미사일발사속도제어
	this.mCnt_limt=42;
	this.shild=2;
	//죽었을때이미지를위한변수
	this.st;
	this.ani_n=0;
	this.ani_n2=0;
	this.init=function(){
		this.span=document.createElement("span");
		box.appendChild(this.span);
		this.plan=document.createElement("img");
		this.plan.src="../imgs/im/plan1.PNG";
		this.plan.style.position="absolute";
		this.plan.style.left=this.x-(this.xw/2)+"px";
		this.plan.style.top=this.y-(this.yw/2)+"px";
		this.plan.style.width=this.xw+"px";
		this.plan.style.height=this.yw+"px";
		this.plan.id="player";
		this.span.appendChild(this.plan);
		//쉴드이미지
		this.img_sh=document.createElement("img");
		this.img_sh.src="../imgs/im/plan1.PNG";
		this.img_sh.style.position="absolute";
		this.img_sh.style.left=this.x-(this.xw/2)+"px";
		this.img_sh.style.top=this.y-(this.yw/2)+"px";
		this.img_sh.style.width=this.xw+"px";
		this.img_sh.style.height=this.yw+"px";
		this.span.appendChild(this.img_sh);
		//남은쉴드보이기 span
		this.span_sh=document.createElement("span");
		this.span_sh.style.position="absolute";
		this.span_sh.innerHTML="■■";
		this.span_sh.style.color="blue";
		this.span_sh.style.fontSize=9+"pt";
		this.span.appendChild(this.span_sh);
	}
	this.move=function(){
		//위
		if(arKey[87]){
			moveBg(0,this.speed,true); this.tdeg=270; this.y2=this.y;}
		//아래
		if(arKey[83]){moveBg(0,-this.speed,true); this.tdeg=90; this.y2=this.y;}
		//좌
		if(arKey[65]){moveBg(this.speed,0,true); this.tdeg=180; this.x2=this.x;}
		//우
		if(arKey[68]){moveBg(-this.speed,0,true); this.tdeg=0; this.x2=this.x;}
		//좌상
		if(arKey[87]&&arKey[65]){this.tdeg=225;}
		//우상
		if(arKey[87]&&arKey[68]){this.tdeg=315;}
		//우하
		if(arKey[83]&&arKey[68]){this.tdeg=45;}
		//좌하
		if(arKey[83]&&arKey[65]){this.tdeg=135;}
		//deg컨트롤
		if(this.deg>this.tdeg){
			if(this.deg-this.tdeg>180){
				this.deg+=9;
			}else{this.deg-=9;}
			//가까우면 deg 멈춤
			if((this.deg-this.tdeg)<9){
				this.tdeg=this.deg;
			}
		}else if(this.deg<this.tdeg){
			if(this.tdeg-this.deg>180){
				this.deg-=9;
			}else{this.deg+=9;}
			//가까우면 deg 멈춤
			if((this.tdeg-this.deg)<9){
				this.tdeg=this.deg;
			}
		}
		if(this.deg>360){this.deg=0;}else if(this.deg<0){this.deg=360;}
		//벽에 닿았을때!!배경도 이동!! 캐릭터는 그자리!
		if(this.x>=(800-this.xw/2)){
			moveBg(-this.speed,0,false);
		}else if(this.x<=(0+this.xw/2)){
			moveBg(this.speed,0,false);
		}
		if(this.y>=(800-this.xw/2)){
			moveBg(0,-this.speed,false);
		}else if(this.y<=(0+this.xw/2)){
			moveBg(0,this.speed,false);
		}
		//클릭으로 움직이는 !!
		if(this.x!=this.x2||this.y!=this.y2){
			var m_x=Math.cos(this.deg*(Math.PI/180))*this.speed;
			var m_y=Math.sin(this.deg*(Math.PI/180))*this.speed;
			this.x+=parseInt(m_x);
			this.y+=parseInt(m_y);
			//목표거리와 가까우면 멈춤
			if(getDistance(this.x,this.y,this.x2,this.y2)<50){
				this.x2=this.x;
				this.y2=this.y;
			}
		}
		//움직이자!
		this.plan.style.left=this.x-(this.xw/2)+"px";
		this.plan.style.top=this.y-(this.yw/2)+"px";
		this.img_sh.style.left=parseInt(this.plan.style.left)+"px";
		this.img_sh.style.top=parseInt(this.plan.style.top)+"px";
		this.span_sh.style.left=parseInt(this.plan.style.left)+"px";
		this.span_sh.style.top=parseInt(this.plan.style.top)-20+"px";
		this.plan.style.WebkitTransform="rotate("+(this.deg+90)+"deg)";
		//움직이는 애니매이션
		this.moveAni();
		//미사일발사
		this.makeMsPlayer();
	}
	this.moveAni=function(){
		this.ani_n2++;
		if(this.ani_n2>2){this.ani_n2=0;}
		//이동때 애니매이션
		if(arKey[87]||arKey[83]||arKey[65]||arKey[68]){
			if(this.ani_n2==0){
				this.plan.src="../imgs/im/plan1_m1.png";
			}else if(this.ani_n2){
				this.plan.src="../imgs/im/plan1_m2.png";
			}
		}else{
			this.plan.src="../imgs/im/plan1.PNG";
		}
		//쉴드가 있으면 쉴드보이기
		if(this.shild>0){
			this.img_sh.style.visibility="visible";
			if(this.ani_n2==0){
				this.img_sh.src="../imgs/im/plan1_sh1.png";
			}else if(this.ani_n2==1){
				this.img_sh.style.WebkitTransform="rotate("+0+"deg)";
				this.img_sh.src="../imgs/im/plan1_sh2.png";
			}else if(this.ani_n2==2){
				this.img_sh.style.WebkitTransform="rotate("+180+"deg)";
			}
		}else{
			this.img_sh.style.visibility="hidden";
		}
		//쉴드값 span에 보이기
		this.span_sh.innerHTML="";
		for(var i=0;i<this.shild;i++){
		this.span_sh.innerHTML+="■";
		}
	}
	this.makeMsPlayer=function(){
		if(this.mCnt<this.mCnt_limt){this.mCnt++;}
		if(arKey[32]){
			if(this.mCnt>=this.mCnt_limt){
				if(witchBul==0){
				//총알발사속도 제한
				this.mCnt_limt=42+arBulLv[0];
				//레벨에맞는 총알발사
				arMs[arMs.length]=new Misail(this.x,this.y,this.deg,25);
				for(var i=1;i<=arBulLv[0];i++){
					arMs[arMs.length]=new Misail(this.x,this.y,this.deg-(i*20),25);
					arMs[arMs.length]=new Misail(this.x,this.y,this.deg+(i*20),25);
				}
				this.mCnt-=this.mCnt_limt;
				}else if(witchBul==1){
				//총알발사속도 제한
				this.mCnt_limt=42+arBulLv[1];
				//레벨에맞는 총알발사
				arMs[arMs.length]=new Misail(this.x,this.y,Math.random()*360,25);
				for(var i=0;i<arBulLv[1];i++){
				arMs[arMs.length]=new Misail(this.x,this.y,Math.random()*360,25);
				}
				this.mCnt-=this.mCnt_limt;
				}
			}
		}
		
	}
	//쉴드이미지그렷다지우기: 맞았을때 쉴드치는 거
	this.aniShild=function(){
		var obj=this;
		this.plan.src="../imgs/im/plan1_sh3.png";
		setTimeout(function(){
			obj.plan.src="../imgs/im/plan1.PNG";
		},300);
	}
	//죽는애니매이션
	this.del=function(){
		var obj=this;
		this.ani_n++;
		this.plan.src="../imgs/en/en_ms1_1.png";
		this.plan.style.width=(this.xw*3)+"px";
		this.plan.style.height=(this.xw*3)+"px";
		if(this.ani_n==1){
			this.plan.src="../imgs/en/en_ms1_1.png";
		}else if(this.ani_n==2){
			this.plan.src="../imgs/en/en_ms1_2.png";
		}else if(this.ani_n==5){
			clearTimeout(this.st);
			box.removeChild(this.span);
			return;
		}
		
		this.st=setTimeout(function(){obj.del();},100);
	}
	this.init();
}

var Misail=function(x,y,deg,sp){
	this.span;
	this.ms;
	this.x=x;
	this.y=y;
	this.xw=16;
	this.yw=20;
	this.deg=deg;
	this.speed=sp;
	//애니매이션변수들
	this.msAn=false;
	this.st;
	this.ani_n=0;
	//이동거리변수
	this.distance=0;
	this.init=function(){
		this.span=document.createElement("span");
		box.appendChild(this.span);
		this.ms=document.createElement("img");
		this.ms.src="../imgs/im/ms1_1.PNG";
		this.ms.style.position="absolute";
		this.ms.style.left=this.x-(this.xw/2)+"px";
		this.ms.style.top=this.y-(this.yw/2)+"px";
		this.ms.style.visibility="hidden";
		this.ms.style.width=this.xw+"px";
		this.ms.style.height=this.yw+"px";
		this.ms.name="misail";
		this.span.appendChild(this.ms);
	}
	
	this.move=function(){
		//각도방향으로 움직이자!
		var m_x=Math.cos(this.deg*(Math.PI/180))*this.speed;
		var m_y=Math.sin(this.deg*(Math.PI/180))*this.speed;
		this.x+=parseInt(m_x);
		this.y+=parseInt(m_y);
		this.ms.style.left=this.x-(this.xw/2)+"px";
		this.ms.style.top=this.y-(this.yw/2)+"px";
		this.ms.style.width=this.xw+"px";
		this.ms.style.height=this.yw+"px";
		this.ms.style.WebkitTransform="rotate("+(this.deg+90)+"deg)";
		//이동거리증가
		this.distance+=this.speed;
		//미사일이 화면 밖이면 안보이게하기
		if(this.x>800||this.x<0){
			this.ms.style.visibility="hidden";
		}else if(this.y>800||this.y<0){
			this.ms.style.visibility="hidden";
		}else{
			this.ms.style.visibility="visible";
		}
		//처음시작땐 안보이기
		if(this.distance<35){
			this.ms.style.visibility="hidden";
		}
		//미사일 애니매이션
		//this.ani();
	}
	this.ani=function(){
		//미사일애니매이션
		this.msAn=!this.msAn;
		if(this.msAn){
		this.ms.src="../imgs/im/ms1_1.PNG";
		}else{
			this.ms.src="../imgs/im/ms1_2.png";
		}
	}
	//죽는애니매이션
	this.del=function(){
		var obj=this;
		this.ani_n++;
		this.ms.style.width=(this.xw)+"px";
		this.ms.style.height=(this.xw)+"px";
		if(this.ani_n==1){
			this.ms.src="../imgs/en/en_ms1_1.png";
		}else if(this.ani_n==2){
			this.ms.src="../imgs/en/en_ms1_2.png";
		}else if(this.ani_n==5){
			clearTimeout(this.st);
			box.removeChild(this.span);
			return;
		}
		
		this.st=setTimeout(function(){obj.del();},100);
	}
	this.init();
}

