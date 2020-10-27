function miniMap(){
	var ctx=map.getContext("2d");
	ctx.drawImage(bg_img,0,0,180,120);
	//내가보는위치 사각형그리기
	ctx.beginPath();
	ctx.strokeStyle="#FFFFFF";
	var rx1=(180-((6000+bgi.x)/6000)*180);
	var ry1=(120-((4000+bgi.y)/4000)*120);
	var rx2=180/(6000/800);
	rx2=rx2-(((rx1/180)*24)*(6000/800));
	var ry2=120/(4000/800);
	ry2=ry2-(((ry1/120)*24)*(4000/800));
	ctx.rect(rx1,ry1,rx1+rx2,ry1+ry2);
	ctx.stroke();
	
	//내위치
	ctx.beginPath();
	ctx.fillStyle="#ABF200";
	ctx.arc((p1.x/6000)*180-(bgi.x/6000)*180,(p1.y/4000)*120-(bgi.y/4000)*120,3,0,2*Math.PI);
	ctx.fill();
	
	//미사일 위치
	ctx.fillStyle="#FFFF24";
	for(var i=0;i<arMs.length;i++){
	
	ctx.beginPath();
	ctx.arc((arMs[i].x/6000)*180-(bgi.x/6000)*180,(arMs[i].y/4000)*120-(bgi.y/4000)*120,2,0,2*Math.PI);
	ctx.fill();
	}
	//적비행선 위치
	
	for(var i=0;i<arEn.length;i++){
	
	ctx.beginPath();
	if(arEn[i].kind==1){
		//1번적
		ctx.fillStyle="#FF00DD";
		ctx.arc((arEn[i].x/6000)*180-(bgi.x/6000)*180,(arEn[i].y/4000)*120-(bgi.y/4000)*120,3,0,2*Math.PI);
	}else if(arEn[i].kind==2){
		//2번적
		ctx.fillStyle="#FF0000";
		ctx.arc((arEn[i].x/6000)*180-(bgi.x/6000)*180,(arEn[i].y/4000)*120-(bgi.y/4000)*120,5,0,2*Math.PI);
	}else{
		//기본적
		ctx.fillStyle="#FF7E7E";
		ctx.arc((arEn[i].x/6000)*180-(bgi.x/6000)*180,(arEn[i].y/4000)*120-(bgi.y/4000)*120,3,0,2*Math.PI);
	}
	
	ctx.fill();
	}
	//적 미사일 위치
	/*ctx.fillStyle="#FF0000";
	for(var i=0;i<arMsE.length;i++){
	
	ctx.beginPath();
	ctx.arc((arMsE[i].x/6000)*180-(bgi.x/6000)*180,(arMsE[i].y/4000)*120-(bgi.y/4000)*120,1,0,2*Math.PI);
	ctx.fill();
	}*/
	//내 홈정거장 위치
	ctx.fillStyle="#1DDB16";
	for(var i=0;i<hom.length;i++){
		ctx.beginPath();
		ctx.arc((hom[i].x/6000)*180-(bgi.x/6000)*180,(hom[i].y/4000)*120-(bgi.y/4000)*120,5,0,2*Math.PI);
		ctx.fill();
	}
}
