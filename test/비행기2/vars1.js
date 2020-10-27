//화면을 나눈 div들~
var box,box2,box3,box4,box5;
var txt1,txt2,txt3,txt4,point_tx,money_tx;
var msCharg_span,showM_span,timer_span,goal_span,bul_span;
var message_setTimer=null;
var lv_selcect;
var start_bt;
var game_frame=25;
var mm=0;
var ss=0;
//게임에서 계속돌아가는 인터벌을 담는변수
var start_interval;
//자기자신 변수
var p1;
//내기지
var hom=new Array();
//게임진행에 참조할 카운트값
var g_Cnt=0;
//키가 눌렸을때 확인할 배열, true,false로 담는다.
var arKey=new Array();
var arMs=new Array();
var arEn=new Array();
var arMsE=new Array();
//level: 0은 무한모드, 1,2,3~그냥 모드! true,false
var arLv=new Array();
//어떤총알을 선택했는지
var witchBul=0;
//총알 레벨배열, 순서는 총알종류, 값은 총알레벨
var arBulLv=new Array();
//포인트와 돈
var point=0;
var money=0;
//미니맵을담을 canvas를 받아온다.
var map;
//배경이미지의 정보저장
var bgi;
//배경이미지
var bg_img;
//배경위치 초과인지 확인하는 변수
var isEx=false;
var isMouse=false;//마우스로 캐릭움직일수 있게? c버튼으로! true,false조정
var isMclick=true;//home 정거장에 있을땐 클릭못하게막기
var isMapCenter=true;

//배경이미지 정보 함수
var Bg_e=function(){
	this.x=-2000;
	this.y=-3200;
	this.xw=6000;
	this.yw=4000;
	this.bg=document.getElementById("bg_img")
}


