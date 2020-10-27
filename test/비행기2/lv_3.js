var lv3_killnum=0;
function lv3_mod(){
	showMs("레벨3단계: 적기지 모두 부수기~",4000,2);
	goal_span.innerHTML="목표:<br>Stage 3:<br>적기지 모두 부수기~<br>남은 적 기지:"+lv3_killnum+"개";
	bgi.x=-2000;
	bgi.y=-3200;
	hom[hom.length]=new Hom(bgi.x+3000,bgi.y+1900,0);
	
	lv3_makeEms();
}
function lv3_makeEms(){
	enPros1();
	enPros2();
	setTimeout("enPros1();",120000);
}
function lv3_Crt(){
	
	//레벨에서 반복되는 함수
	lv3_killnum=document.getElementsByName("enermy2").length;
	
	goal_span.innerHTML="목표:<br>Stage 3:<br>적기지 모두 부수기~<br>남은 적 기지:"+lv3_killnum+"개";
	if(lv3_killnum<=0){
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
			showMs("성공입니다.!ㅋㅋ",3000,4);
			point+=50;
			money+=5;
			//레벨추가해주기
			var option = document.createElement("option");
			option.text="4stage";
			option.value="4";
			lv_selcect.add(option);
			//지금레벨 다시 못하게!
			lv_selcect.options[3].disabled=true;
			//마지막레벨 셀렉되있게하기
			lv_selcect.selectedIndex=lv_selcect.length-1;
			//시작버튼 사용가능으로
			start_bt.disabled=false;
			//레벨조건숫자 초기화
			lv3_killnum=0;
			//목표다시설정
			goal_span.innerHTML="목표:<br>없습니다.<br>다음스테이지를<br>진행하세요.";
		}
	}
