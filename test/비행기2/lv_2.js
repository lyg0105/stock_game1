var lv2_killnum=0;
function lv2_mod(){
	showMs("레벨2단계: 적비행기 30기 잡기~",4000,2);
	goal_span.innerHTML="목표:<br>Stage 2:<br>적비행기30기 잡기!<br>잡은 적 수:"+lv2_killnum+"/30";
	bgi.x=-2000;
	bgi.y=-3200;
	hom[hom.length]=new Hom(bgi.x+3000,bgi.y+1900,0);
	
	lv2_makeEms();
}
function lv2_makeEms(){
	enPros1();
	enPros2();
}
function lv2_Crt(){
	//레벨에서 반복되는 함수
	goal_span.innerHTML="목표:<br>Stage 2:<br>적비행기30기 잡기!<br>잡은 적 수:"+lv2_killnum+"/30";
	if(lv2_killnum>=30){
			alert("성공! 다음스테이지 사용가능, 보상으로 점수와 돈을 받았습니다.");
			//hom지우기
			homReset();
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
			showMs("성공입니다.!ㅋㅋ:$+3, point+30",3000,4);
			point+=30;
			money+=3;
			//레벨추가해주기
			if(lv_selcect.length<4)
			var option = document.createElement("option");
			option.text="3stage";
			option.value="3";
			lv_selcect.add(option);
			//지금레벨 다시 못하게!
			lv_selcect.options[2].disabled=true;
			//마지막레벨 셀렉되있게하기
			lv_selcect.selectedIndex=lv_selcect.length-1;
			//시작버튼 사용가능으로
			start_bt.disabled=false;
			//2레벨조건초기화
			lv2_killnum=0;
			//목표다시설정
			goal_span.innerHTML="목표:<br>없습니다.<br>다음스테이지를<br>진행하세요.";
		}
	}
