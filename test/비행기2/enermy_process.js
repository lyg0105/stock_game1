//반복되는 적컨트롤
function enermyProcess(){
	moveEms();
	moveMsEs();
}
//적을 나오게하는 프로세스 1
function moveEms(){
	for(var i=0;i<arEn.length;i++){
		arEn[i].move();
		//지도밖으로가면 지우기
		if(arEn[i].x<bgi.x||arEn[i].x>(bgi.x+6000)){
			arEn[i].del();
			arEn.splice(i,1);
		}else if(arEn[i].y<bgi.y||arEn[i].y>(bgi.y+4000)){
			arEn[i].del();
			arEn.splice(i,1);
		}	
		}
}
function moveMsEs(){
	for(var i=0;i<arMsE.length;i++){
		arMsE[i].move();
		//지도밖으로가면 지우기
		if(arMsE[i].x<bgi.x||arMsE[i].x>(bgi.x+6000)){
			arMsE[i].del();
			arMsE.splice(i,1);
			return;
		}
		if(arMsE[i].y<bgi.y||arMsE[i].y>(bgi.y+4000)){
			arMsE[i].del();
			arMsE.splice(i,1);
			return;
		}
	}
}
function enermyReset(){
	for(var i=0;i<arEn.length;i++){
		arEn[i].del();
		arEn.splice(i,1);
		setTimeout("enermyReset();",30);//확실히 남아있는 적을 죽이기위해 종료전 지우기함수를 또부른다.
		return;
	}
}
function enermyMsReset(){
	for(var i=0;i<arMsE.length;i++){
		arMsE[i].del();
		arMsE.splice(i,1);
		setTimeout("enermyMsReset();",30);//확실히  남아있는 적을 죽이기위해 종료전 지우기함수를 또부른다.
		return;
	}
}
function makeEnermy1(mx,my,deg,num){
	var en1=new Enermy(mx,my,deg,num);
	en1.xw=250;
	en1.yw=200;
	en1.speed=2;
	en1.shild=3;
	en1.img.src="../imgs/en/en_plan2.png";
	en1.img.style.width=en1.xw+"px";
	en1.img.style.height=en1.yw+"px";
	
	arEn[arEn.length]=en1;
}
function makeEnermy2(mx,my,deg,num){
	var en1=new Enermy(mx,my,deg,num);
	en1.xw=300;
	en1.yw=250;
	en1.speed=0;
	en1.shild=30;
	en1.img.src="../imgs/en/en_plan3.png";
	en1.img.style.width=en1.xw+"px";
	en1.img.style.height=en1.yw+"px";
	
	arEn[arEn.length]=en1;
}
//기본적을 만드는 패턴 1;
function enPros1(){
		arEn[arEn.length]=new Enermy(bgi.x+200,bgi.y+200,Math.random()*360,0);//좌상
		makeEnermy1(bgi.x+3000,bgi.y+200,Math.random()*360,1);//중앙상
		arEn[arEn.length]=new Enermy(bgi.x+5800,bgi.y+200,Math.random()*360,0);//우상
		arEn[arEn.length]=new Enermy(bgi.x+5800,bgi.y+3800,Math.random()*360,0);//우하
		makeEnermy1(bgi.x+3000,bgi.y+3800,Math.random()*360,1);//중앙하
		arEn[arEn.length]=new Enermy(bgi.x+200,bgi.y+3800,Math.random()*360,0);//좌하
}
function enPros2(){
	makeEnermy2(bgi.x+200,bgi.y+200,Math.random()*360,2);//좌상
	makeEnermy2(bgi.x+3000,bgi.y+200,Math.random()*360,2);//중앙상
	makeEnermy2(bgi.x+5800,bgi.y+200,Math.random()*360,2);//우상
	makeEnermy2(bgi.x+5800,bgi.y+3800,Math.random()*360,2);//우하
	makeEnermy2(bgi.x+3000,bgi.y+3800,Math.random()*360,2);//중앙하
	makeEnermy2(bgi.x+200,bgi.y+3800,Math.random()*360,2);//좌하
}