function IamProcess(){
	p1.move();
	homsMove();
	myPlanCrash();
	moveMs();
	mapCtr();//맵컨트롤
	miniMap();
	showState();
	g_Cnt++;
	if(g_Cnt>40000){g_Cnt=0;}
}
function homsMove(){
	for(var i=0;i<hom.length;i++){
		hom[i].move();
	}
}
function moveMs(){
	for(var i=0;i<arMs.length;i++){
		arMs[i].move();
		//일정거리이동하면 없어지기
		if(arMs[i].distance>800){
			arMs[i].del();
			arMs.splice(i,1);
			return;
		}
		//적기 및 적 미사일과 충돌검사
		if(myMsCrash(i)==false){
			return;
		}
	}
}
function myMsCrash(j){
	var d1=0;
	var d2=0;
	//적 비행기와 충돌시
	for(var i=0;i<arEn.length;i++){
		//충돌에필요한 반지름 알기
		d1=(arMs[j].xw/2)+(arEn[i].xw/2);
		d2=getDistance(arMs[j].x,arMs[j].y,arEn[i].x,arEn[i].y);
		//반지름에의한 충돌판단. 충돌시 비행기, 미사일 지우기.
		if(d2<d1){
			
			//미사일 지우기.
			arMs[j].del();
			arMs.splice(j,1);
			//적의 쉴드를 깍고, 쉴드가 0보다 작으면 지운다.
			arEn[i].shild-=1; 
			if(arEn[i].shild<=0){
				point+=2;//죽였을때 포인트++
					//죽인적에때라서 포인트 더주자.
					if(arEn[i].kind==1){
						point+=3;
					}
					//적을 지운다.
				arEn[i].del();
				arEn.splice(i,1);
				//레벨2미션을위한 적을 죽였을때의 카운트
				if(arLv[2]){
					lv2_killnum++;
				}
			}
			return false;
			}
		}
		//적 미사일과 충돌검사
	for(var i=0;i<arMsE.length;i++){
		//충돌에필요한 반지름 알기
		d1=(arMs[j].xw/2)+(arMsE[i].xw/2);
		d2=getDistance(arMs[j].x,arMs[j].y,arMsE[i].x,arMsE[i].y);
		//반지름에의한 충돌판단. 충돌시 비행기, 미사일 지우기.
		if(d2<d1){
			//point++;
			//미사일 지우기.
			//arMs[j].del();
			//arMs.splice(j,1);
			//적미사일지우기
			//arMsE[i].del();
			//arMsE.splice(i,1);
			return false;
			}
		}
	}
function myPlanCrash(){
	var d1=0;
	var d2=0;
	//적기와 충돌
	for(var i=0;i<arEn.length;i++){
		//충돌에필요한 반지름 알기
		d1=(p1.xw/2)+(arEn[i].xw/2);
		d2=getDistance(p1.x,p1.y,arEn[i].x,arEn[i].y);
		//반지름에의한 충돌판단. 충돌시 비행기지우고, 내체력깍기
		if(d2<(d1-10)){
			point-=10;
			//내비행기체력깍기
			p1.shild-=1;
			p1.aniShild();
			showMs("내쉴드:-1, Point:-10",1000,1);
			if(p1.shild<0){
				iamDie();
			}
			//적비행기지우기
			arEn[i].del();
			arEn.splice(i,1);
		}
	}
	//적 미사일과 충돌
	for(var i=0;i<arMsE.length;i++){
		//충돌에필요한 반지름 알기
		d1=(p1.xw/2)+(arMsE[i].xw/2);
		d2=getDistance(p1.x,p1.y,arMsE[i].x,arMsE[i].y);
		//반지름에의한 충돌판단. 충돌시 비행기, 미사일 지우기.내체력깍기
		if(d2<(d1-10)){
			point-=10;
			//내비행기체력깍기
			p1.shild-=1;
			p1.aniShild();
			//alert("내쉴드"+p1.shild);
			if(p1.shild<0){
				iamDie();
			}
			//적 미사일 없애기
			arMsE[i].del();
			arMsE.splice(i,1);
		}
	}
	
}
//홈 리셋
function homReset(){
	for(var i=0;i<hom.length;i++){
		hom[i].del();
		hom.splice(i,1);
		setTimeout("homReset();",30);//확실히  남아있는 적을 죽이기위해 종료전 지우기함수를 또부른다.
		return;
	}
}
//케릭이 죽으면!! 페이지 새로고침
function iamDie(){
	showMs("으악!! 주금!! T_T",2500,1);
	p1.del();
	p1=null;
	setTimeout(function(){showMs("새로 시작하겠습니다.",3000);},2700,0);
	setTimeout(function(){location.reload();},5000);
}
