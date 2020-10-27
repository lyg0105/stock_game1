function app(){
	box=document.getElementById("box");
	box2=document.getElementById("box2");
	box3=document.getElementById("box3");
	box4=document.getElementById("box4");
	txt1=document.getElementById("txt1");
	txt2=document.getElementById("txt2");
	txt3=document.getElementById("txt3");
	txt4=document.getElementById("txt4");
	point_tx=document.getElementById("point");
	money_tx=document.getElementById("money");
	msCharg_span=document.getElementById("mscharg");
	showM_span=document.getElementById("showm");
	start_bt=document.getElementById("start_bt");
	timer_span=document.getElementById("timer");
	goal_span=document.getElementById("goal");
	lv_selcect=document.getElementById("lv_selcect");
	bul_span=document.getElementById("bul_span");//불렛레벨표시 ■ 이거로
	map=document.getElementById("map");
	
	
	
	bgi=new Bg_e();
	p1= new Player();
	levelReset();//레벨초기화
	bulLevelReset();//총알레벨초기화
	point=0;
	money=0;
	showMs("안녕하세요..ㅋㅋㅋ",3000,0);
	setTimeout(function(){showMs("아래의 Start버튼이 시작입니다.",10000);},3000,0);
	//canvas에 넣을 배경이미지
	bg_img=document.createElement("img");
	bg_img.src="../imgs/earth2.PNG";
	bg_img.style.width=180+"px";
	bg_img.style.height=120+"px";
	//게임프레임 시작
	start_interval=setInterval("GameInterver();",game_frame);
}
function showState(){
	txt1.value=p1.deg;
	txt2.value=arMs.length;
	txt3.value=arEn.length;
	txt4.value=arMsE.length;
	txt5.value=p1.shild;
	point_tx.innerHTML=point+"점"
	money_tx.innerHTML=money+"$"
	if(p1.mCnt>=40){msCharg_span.style.color="red";}else{msCharg_span.style.color="yellow";}
	msCharg_span.innerHTML=p1.mCnt+"G";
	showBul_lv();
	showTimer();
}
function showBul_lv(){
	bul_span.innerHTML="";
	for(var i=0;i<arBulLv[witchBul];i++){
		bul_span.innerHTML=bul_span.innerHTML+="■";
	}
}
function levelReset(){
	for(var i=0;i<10;i++){
		arLv[i]=false;
	}
}
function bulLevelReset(){
	for(var i=0;i<10;i++){
		arBulLv[i]=1;
	}
}
function keyReset(){
	arKey=new Array();
	isMouse=false;
}
function GameInterver(){
	IamProcess();
	enermyProcess();
	lv_Process();
}

