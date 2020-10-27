var isInfinit_make=true;//적만드는 것 제어변수

function infinit_mod(){
	showMs("제한이 없는무한모드를 시작합니다!",4000,2);
	goal_span.innerHTML="목표:<br>최고기록을<br>달성해보자.";
	bgi.x=-2000;
	bgi.y=-3200;
	hom[hom.length]=new Hom(bgi.x+3000,bgi.y+1900,0);
	enPros1();
}

//반복되는 함수 무한단계일 시
function lv0_Process(){
	if(g_Cnt%800==0){
		isInfinit_make=true;
	}
	if(isInfinit_make){
		enPros1();
		isInfinit_make=false;
	}
}