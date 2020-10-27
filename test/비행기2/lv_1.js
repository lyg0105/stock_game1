function lv1_mod(){
	showMs("레벨1단계: 우주정거장 찾기~",4000,2);
	goal_span.innerHTML="목표:<br>Stage 1:<br>미니맵에 보이는<br>초록색 점을 찾으세요.";
	bgi.x=-2000;
	bgi.y=-3200;
	hom[hom.length]=new Hom(bgi.x+5500,bgi.y+1200,0);
	
	lv1_makeEms();
}
function lv1_makeEms(){
	for(var i=0;i<7;i++){
		enPros1();
	}
	if(arLv[1]){
		
	}
}
function lv1_Crt(){
	var d1=0;
	var d2=0;
	//홈과 내가 충돌시 성공!
	for(var i=0;i<hom.length;i++){
		//충돌에필요한 반지름 알기
		d1=(hom[i].xw/2)+(p1.xw/2);
		d2=getDistance(hom[i].x,hom[i].y,p1.x,p1.y);
		//반지름에의한 충돌판단. 충돌시 비행기, 미사일 지우기.
		if(d2<d1){
			alert("성공! 다음스테이지 사용가능, 보상으로 점수와 돈을 받았습니다.");
			//hom지우기
			hom[i].del();
			hom.splice(i,1);
			//내위치초기화
			viewCenter();
			bgi.x=-2000;
			bgi.y=-3200;
			//레벨리셋
			levelReset();
			//모든키 리셋
			keyReset();
			//적다죽여놓자
			enermyReset();
			enermyMsReset();
			enermyReset();
			enermyMsReset();
			//메세지보여주기 및 보상주기
			showMs("성공입니다.!ㅋㅋ:$+1, point+10",3000,4);
			point+=10;
			money+=1;
			//레벨추가해주기
			if(lv_selcect.length<3)
			var option = document.createElement("option");
			option.text="2stage";
			option.value="2";
			lv_selcect.add(option);
			//지금레벨 다시 못하게!
			lv_selcect.options[1].disabled=true;
			//마지막레벨 셀렉되있게하기
			lv_selcect.selectedIndex=lv_selcect.length-1;
			//시작버튼 사용가능으로
			start_bt.disabled=false;
			//목표다시설정
			goal_span.innerHTML="목표:<br>없습니다.<br>다음스테이지를<br>진행하세요.";
			}
			return;
		}
}
