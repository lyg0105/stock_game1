function mkeyDown(){
	//alert(event.keyCode);
	arKey[event.keyCode]=true;
	//m버튼은 클릭시만
	if(arKey[77]){isMouse=!isMouse;}
	//map계속센터?
	if(arKey[67]){isMapCenter=!isMapCenter;}
	//미사일자동발사 키보드f
	if(arKey[70]){arKey[32]=!arKey[32];}
}
function mkeyUp(){
	arKey[event.keyCode]=false;
}
function mOnClick(){
	//클릭으로도 캐릭 움직이기
	if(isMclick){
	var mx=parseInt(event.clientX);
	var my=parseInt(event.clientY);
	var deg=getD(p1.x,p1.y,mx,my);
	p1.x2=parseInt(mx);
	p1.y2=parseInt(my);
	p1.tdeg=deg;
	}
	
}
function mOnmove(){
	//마우스로 움직임으로 움직이기
	if(isMouse){
		var mx=parseInt(event.clientX);
		var my=parseInt(event.clientY);
		var deg=getD(p1.x,p1.y,mx,my);
		p1.x2=parseInt(mx);
		p1.y2=parseInt(my);
		p1.tdeg=deg;
	}
}
function joyClick(info){
	if(info=="UP"){
		arKey[87]=!arKey[87];
		arKey[83]=false;
	}else if(info=="Down"){
		arKey[83]=!arKey[83];
		arKey[87]=false;
	}else if(info=="Left"){
		arKey[65]=!arKey[65];
		arKey[68]=false;
	}else if(info=="Right"){
		arKey[68]=!arKey[68];
		arKey[65]=false;}
	if(info=="Fire"){
		//버튼눌리면 잠깐 포커스 사라지기위해 disabled줫다가빼기
		document.getElementById("f_bt").disabled=true;
		setTimeout(function(){document.getElementById("f_bt").disabled=false;},300);
		arKey[32]=!arKey[32];}
	if(info=="Upgrade"){
		//버튼눌리면 잠깐 포커스 사라지기위해 disabled줫다가빼기
		document.getElementById("u_bt").disabled=true;
		setTimeout(function(){document.getElementById("u_bt").disabled=false;},300);
		//총알레벨받아오기
		witchBul=parseInt(witchBul);
		//총알업그래이드판별 총알레벨 10이하만 업글
		if(arBulLv[witchBul]<10){
			//돈이 있어야 업글
			if(money>=arBulLv[witchBul]+1){
				money-=arBulLv[witchBul]+1;
				arBulLv[witchBul]+=1;
				showMs(witchBul+"번총알 레벨"+arBulLv[witchBul]+"로 업그레이드!",2000,2);
			}else{
				showMs("돈이"+(arBulLv[witchBul]+1)+"이상 있어야 합니다.",2000,2);
			}
		}else{
			showMs("더이상 업그래이드가 불가능합니다.",2000,1);
		}
	}
	if(info=="bulChange"){
		//버튼눌리면 잠깐 포커스 사라지기위해 disabled줫다가빼기
		document.getElementById("bul_selcect").disabled=true;
		setTimeout(function(){document.getElementById("bul_selcect").disabled=false;},300);
		//선택된 총알로 변경
		var bs=document.getElementById("bul_selcect");
		witchBul=parseInt(bs.value);
		showMs("총알변경:"+witchBul+"번 총알입니다.",2000,2);
	}
	if(info=="Start"){
		var lv=document.getElementById("lv_selcect").value;
		lv=parseInt(lv);
		arLv[lv]=true;
		showMs(lv+"레벨 시작!",3000,2);
		start_bt.disabled=true;
		ss=mm=0;
		
		if(arLv[0]){
			infinit_mod();
		}else if(arLv[1]){
			lv1_mod();
		}else if(arLv[2]){
			lv2_mod();
		}else if(arLv[3]){
			lv3_mod();
		}
	}
	if(info=="Center"){
		//버튼눌리면 잠깐 포커스 사라지기위해 disabled줫다가빼기
		document.getElementById("c_bt").disabled=true;
		setTimeout(function(){document.getElementById("c_bt").disabled=false;},300);
		//화면계속중앙
		isMapCenter=!isMapCenter;
	}
	if(info=="Mouse"){
		//버튼눌리면 잠깐 포커스 사라지기위해 disabled줫다가빼기
		document.getElementById("m_bt").disabled=true;
		setTimeout(function(){document.getElementById("m_bt").disabled=false;},300);
		//오토무므
		isMouse=!isMouse;
	}
}
function mapCtr(){
	//위
	if(arKey[38]){moveBg(0,10,false);}
	//아래
	if(arKey[40]){moveBg(0,-10,false);}
	//좌
	if(arKey[37]){moveBg(10,0,false);}
	//우
	if(arKey[39]){moveBg(-10,0,false);}
	//비행기 화면중앙으로 보이기
	if(isMapCenter){viewCenter();}
}
function viewCenter(){
	//비행기 화면중앙으로 보이기
	if(p1.x!=400&&p1.y!=400){
		var d=0;
		if(p1.x>400){
			d=p1.x-400;
			moveBg(-d,0,false);
		}else{
			d=400-p1.x;
			moveBg(d,0,false);
		}
		if(p1.y>400){
			d=p1.y-400;
			moveBg(0,-d,false);
		}else{
			d=400-p1.y;
			moveBg(0,d,false);
		}
	}
}
function moveBg(mx,my,im){
		//초과가 아니면 위치변경
		//배경위치초과시 조정
		if(bgi.x>400){arKey[68]=true; arKey[65]=false;//좌충돌
		}else if(bgi.x<-5600){arKey[65]=true; arKey[68]=false;//우충돌
		}else if(bgi.y>400){arKey[83]=true; arKey[87]=false;//위충돌
		}else if(bgi.y<-3600){arKey[87]=true; arKey[83]=false;//아래충돌
		}else{}
		//배경위치변경
		//if((bgi.x<=0&&bgi.x>=-5200)&&(bgi.y<=0&&bgi.y>=-3200)){
				//im=!im;
		//}
		//배경위치변경
		bgi.x+=mx;
		bgi.y+=my;
		bgi.bg.style.backgroundPosition=bgi.x+"px  "+bgi.y+"px";
		//배경바뀔 시 미사일위치도 변경
		for(var i=0;i<arMs.length;i++){
			arMs[i].x+=mx;
			arMs[i].y+=my;
		}
		//배경바뀔 시 적위치도 변경
		for(var i=0;i<arEn.length;i++){
			arEn[i].x+=mx;
			arEn[i].y+=my;
		}
		//배경바뀔시 적미사일 위치도 변경
		for(var i=0;i<arMsE.length;i++){
			arMsE[i].x+=mx;
			arMsE[i].y+=my;
		}
		//배경바뀔시 홈: 내정거장도 변경
		for(var i=0;i<hom.length;i++){
			hom[i].x+=mx;
			hom[i].y+=my;
		}
		//내가요청한 움직임이 아니면! 나도움직인다.
		if(!im){
			p1.x+=mx;p1.x2+=mx;
			p1.y+=my;p1.y2+=my;
		}
	
}
function getD(x1,y1,x2, y2) {
	//목표 x2,y2 주체x1,y1으로부터의 각도
	var dgr = Math.atan((-(y2 - y1)) / (x2 - x1)) * (180 / Math.PI);

	dgr = parseInt(dgr);

	if (x1 < x2 && y1 > y2) {
		dgr = 360 - dgr;
	} else if (x1 < x2 && y1 < y2) {
		dgr = (-dgr);
	} else if (x1 > x2 && y1 < y2) {
		dgr = 180 - dgr;
	} else if (x1 > x2 && y1 > y2) {
		dgr = 180 + (-dgr);
	}
	dgr = parseInt(dgr);

	return dgr;
}
function getDistance(x1,y1,x2, y2){
	//목표x2,y2와 주체x1,y1과의 거리구하기
	var distance=Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
	distance=parseInt(distance);
	return distance;
}
//메세지를 s초동안 보여주기
function showMs(message,s,num){
	if(message_setTimer!=null){clearTimeout(message_setTimer);}
	//글자색 변경
	switch(num){
		case 0:
			showM_span.style.color="#1DDB16";//그린
			break;
		case 1:
			showM_span.style.color="#FF0000";//빨강
			break;
		case 2:
			showM_span.style.color="#0100FF";//파랑
			break;
		case 3:
			showM_span.style.color="#000000";//검정
			break;
		case 4:
			showM_span.style.color="#5F00FF";//보라
			break;
	}
	
	showM_span.style.visibility="visible";
	showM_span.innerHTML=message;
	
	//s초후에 사라진다.
	message_setTimer=setTimeout(function(){showM_span.style.visibility="hidden";showM_span.style.color="#1DDB16";message_setTimer=null;},s);
}
function showTimer(){
	if(g_Cnt%40==0){ss++;}
	if(ss>=60){ss=0;mm++;}
	timer_span.innerHTML=mm+"분"+ss+"초";
}
