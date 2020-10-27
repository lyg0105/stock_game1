//적 객체
var Enermy=function(mx,my,deg,kind){
	this.span;
	this.img;
	this.span_sh;
	this.x=mx;
	this.y=my;
	this.xw=60;
	this.yw=60;
	this.deg=deg;
	this.speed=5;
	this.shild=1;
	this.kind=kind;
	this.Cnt_m=0;
	//이동거리변수
	this.distance=0;
	//죽는애니매이션
	this.st;
	this.ani_n=0;
	this.init=function(){
		this.span=document.createElement("span");
		
		box.appendChild(this.span);
		this.img=document.createElement("img");
		this.img.src="../imgs/en/en_plan1.png";
		this.img.style.position="absolute";
		this.img.style.left=(this.x-(this.xw/2))+"px";
		this.img.style.top=(this.y-(this.yw/2))+"px";
		this.img.style.WebkitTransform="rotate("+(this.deg+90)+"deg)";
		this.img.style.visibility="hidden";
		this.img.style.width=60+"px";
		this.img.style.height=60+"px";
		//3단계 레벨에서쓸 이미지네임을 준다.
		this.img.name="enermy"+this.kind;
		this.span.appendChild(this.img);
		
		//남은쉴드보이기 span
		this.span_sh=document.createElement("span");
		this.span_sh.style.position="absolute";
		this.span_sh.innerHTML="■";
		this.span_sh.style.color="yellow";
		this.span_sh.style.fontSize=9+"pt";
		this.span.appendChild(this.span_sh);
	}
	this.move=function(){
		var m_x=Math.cos(this.deg*(Math.PI/180))*this.speed;
		var m_y=Math.sin(this.deg*(Math.PI/180))*this.speed;
		this.x+=parseInt(m_x);
		this.y+=parseInt(m_y);
		//위치적용
		this.img.style.left=(this.x-(this.xw/2))+"px";
		this.img.style.top=(this.y-(this.yw/2))+"px";
		this.img.style.WebkitTransform="rotate("+(this.deg+90)+"deg)";
		this.span_sh.style.left=parseInt(this.img.style.left)+20+"px";
		this.span_sh.style.top=parseInt(this.img.style.top)-20+"px";
		//이동거리증가
		this.distance+=this.speed;
		//미사일이 화면 밖이면 안보이게하기
		if(this.x>800||this.x<0){
			this.img.style.visibility="hidden";
			this.span_sh.style.visibility="hidden";
		}else if(this.y>800||this.y<0){
			this.img.style.visibility="hidden";
			this.span_sh.style.visibility="hidden";
		}else{
			this.img.style.visibility="visible";
			this.span_sh.style.visibility="visible";
		}
		//쉴드값 span에 보이기
		this.span_sh.innerHTML="";
		for(var i=0;i<this.shild;i++){
		this.span_sh.innerHTML+="■";
		}
		this.fire();
	}
	this.fire=function(){
		if(this.Cnt_m<250){
			this.Cnt_m++;}
		//0종류의 적기라면. 총알을 쏜다.
		if(this.kind==0){
			// 미사일이 충전되고(140),플레이어가 사거리에 와야 미사일 발사한다.
			if(this.Cnt_m>140&&getDistance(this.x,this.y,p1.x,p1.y)<900){
				var deg1=getD(this.x,this.y,p1.x,p1.y);
				var ms1=new Emisail(this.x,this.y,deg1,12);
				ms1.xw=10;
				ms1.yw=10;
				arMsE[arMsE.length]=ms1;
				//미사일 있음 알림.
				this.Cnt_m=0;
			}
		}else if(this.kind==1||this.kind==2){
			//1종류의 적기라면. 적기를 만들고, 총도 쏜다. 총알은 굵게
			// 미사일이 충전되면(240), 미사일과 적기를 만든다.
			if(this.Cnt_m>240){
				var deg1=getD(this.x,this.y,p1.x,p1.y);
				var ms1=new Emisail(this.x,this.y,deg1,6);
				ms1.xw=50;
				ms1.yw=50;
				arMsE[arMsE.length]=ms1;
				//미사일 있음 알림.
				this.Cnt_m=0;
				//적기를 만들자.
				arEn[arEn.length]=new Enermy(this.x,this.y,deg1-10,0);
				arEn[arEn.length]=new Enermy(this.x,this.y,deg1+10,0);
			}
			
		}
	}
	this.del=function(){
		var obj=this;
		this.span_sh.innerHTML="";
		this.ani_n++;
		this.img.style.width=(this.xw)+"px";
		this.img.style.height=(this.yw)+"px";
		if(this.ani_n==1){
			this.img.src="../imgs/en/en_ms1_1.png";
		}else if(this.ani_n==2){
			this.img.src="../imgs/en/en_ms1_2.png";
		}else if(this.ani_n==5){
			clearTimeout(this.st);
			box.removeChild(this.span);
			return;
		}
		
		this.st=setTimeout(function(){obj.del();},100);
	}
	this.init();
}
var Emisail=function(x,y,deg,sp){
	this.span;
	this.ms;
	this.x=x;
	this.y=y;
	this.xw=20;
	this.yw=35;
	this.deg=deg;
	this.deg2=0;
	this.speed=sp;
	//이동거리변수
	this.distance=0;
	this.ani_n=0;
	this.st;
	this.init=function(){
		this.span=document.createElement("span");
		box.appendChild(this.span);
		this.ms=document.createElement("img");
		this.ms.src="../imgs/en/en_ms1.png";
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
		
		//미사일이 계속돌면서 이동하기
		this.deg2+=10;
		if(this.deg2>360){
			this.deg2=0;
		}
		this.ms.style.WebkitTransform="rotate("+this.deg2+"deg)";
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
	}
	this.del=function(){
		var obj=this;
		
		this.ms.style.width=(this.xw)+"px";
		this.ms.style.height=(this.yw)+"px";
		if(this.ani_n==1){
			this.ms.src="../imgs/en/en_ms1_1.png";
		}else if(this.ani_n==2){
			this.ms.src="../imgs/en/en_ms1_2.png";
		}else if(this.ani_n==5){
			clearTimeout(this.st);
			box.removeChild(this.span);
			return;
		}
		this.ani_n++;
		this.st=setTimeout(function(){obj.del();},100);
	}
	this.init();
}
