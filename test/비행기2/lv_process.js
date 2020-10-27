//레벨에 맞게 반복할 함수들을 정의하자.
function lv_Process(){
	if(arLv[0]){
		lv0_Process();
	}
	if(arLv[1]){
		 lv1_Crt();
	}
	if(arLv[2]){
		 lv2_Crt();
	}
	if(arLv[3]){
		 lv3_Crt();
	}
}
