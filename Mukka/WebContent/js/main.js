var MUKKA = {
		moving: false,			//should mukka move?
		pointer: $('#mukka'),	//mukka!
		speed: 6,				//module of the speed
		dirX: 0,				//speed on X axis
		dirY: 3,				//speed on Y axis
		bCreationLoop: {},		//id of the loop for creation of bullets
		bMoveLoop: {}			//id of the loop for motion of bullets
}
var timer = 0;
//crea livello1 -> abilita il click (cambio direzione ed inizio movimento) e inizializza il ciclo
function wlCommonInit(){
	
	createLevel(LEVEL.currentLevel);

	$('#content').on("touchstart", function(ev){
		var e = ev.originalEvent;
		ev.stopPropagation();
		var touches = e.touches;
		
		if (!MUKKA.moving) {
			MUKKA.moving = true;
			MUKKA.pointer.css("background-image",'url(images/mukka.gif)');
		}
		
		var mouseX = touches[0].pageX;
		var mouseY = touches[0].pageY;
		
		var x = MUKKA.pointer.offset().left+32;
		var y = MUKKA.pointer.offset().top+32;
		
		var varX = mouseX-x;
		var varY = mouseY-y;

		MUKKA.setDirection(varX, varY);
	});
	
	$('#content').on("click", function(e){
		
		if (!MUKKA.moving) {
			MUKKA.moving = true;
			MUKKA.pointer.css("background-image",'url(images/mukka.gif)');
		}
		
		var mouseX = e.pageX;
		var mouseY = e.pageY;
		
		var x = MUKKA.pointer.offset().left+32;
		var y = MUKKA.pointer.offset().top+32;
		
		var varX = mouseX-x;
		var varY = mouseY-y;

		MUKKA.setDirection(varX, varY);
	});


	
	setInterval(function(){ doStuff(); }, 45);
}

function createLevel(n) {
	timer = 0;
	clearInterval(MUKKA.bCreationLoop);
	clearInterval(MUKKA.bMoveLoop);

	switch(n) {
	case 1: createLevel1(); break;
	case 2: createLevel2(); break;
	case 3: createLevel3(); break;
	case 4: createLevel4(); break;
	case 5: createLevel5(); break;
	}
	
	if (LEVEL.cannons.length > 0) {
		MUKKA.bCreationLoop = setInterval(function() {shootBullets();}, 1500);
		MUKKA.bMoveLoop = setInterval(function() {moveBullets();}, 50);
	}
	
}

//ciclo di vita del gioco
function doStuff() {
	
	if (MUKKA.moving == false)
		return false;	

	var y = Math.round(MUKKA.pointer.offset().top);
	var x = Math.round(MUKKA.pointer.offset().left);
	var nextX = x+MUKKA.dirX;
	var nextY = y+MUKKA.dirY;
	
	MUKKA.pointer.offset({top:nextY,left:nextX});
	window.scrollTo(MUKKA.pointer.offset().left+32-window.innerWidth/2,MUKKA.pointer.offset().top+32-window.innerHeight/2);	
	
	if (x > WORLD.M*WORLD.SIZE_OF_BLOCKS-64 || x < 0 || y > WORLD.N*WORLD.SIZE_OF_BLOCKS-64 || y < 0) {
		winEvent();
	}
	
	if (WORLD.isBlocked[x][y] > 0) {
		lossEvent();
		return false;
	}

	if (LEVEL.hasKey && (x+32>LEVEL.keyX1 && x+32<LEVEL.keyX2 && y+32>LEVEL.keyY1 && y+32<LEVEL.keyY2)) {
		$('.key').remove();
		LEVEL.openDoors();
		LEVEL.hasKey = false;
	}		
}

function shootBullets() {
	var cannon, x ,y ,dir, speed;
	timer++;
	for  (var j in LEVEL.cannons) {
		cannon = LEVEL.cannons[j];
		x = cannon.y;
		y = cannon.x;
		dir = cannon.dir;
		speed = cannon.speed;
		WORLD.addObjectIdNameClass("bul"+timer+"-"+x+"-"+y,dir+'-'+speed,'bullet');
		$("#bul"+timer+"-"+x+"-"+y).offset({top:(y-0.625)*WORLD.SIZE_OF_BLOCKS,left:(x-0.625)*WORLD.SIZE_OF_BLOCKS});
		}
}

function moveBullets() {

	$('.bullet').each(function(){
		var x = $(this);
		var tmpArr = x.attr("name").split("-");
		var off = x.offset();
		var dir = parseInt(tmpArr[0]);
		var speed = parseInt(tmpArr[1]);
		var newY = off.top;
		var newX = off.left;
		if (newX < 0 || newX > WORLD.M*WORLD.SIZE_OF_BLOCKS || newY < 0 || newY > WORLD.N*WORLD.SIZE_OF_BLOCKS) {
			x.remove();
			return false;
		}
		var mY = MUKKA.pointer.offset().top;
		var mX = MUKKA.pointer.offset().left;
		if (mY > newY-60 && mY < newY+12 && mX > newX-60 && mX < newX+12) {
			lossEvent();
			return false;
		}
			
		switch (dir) {
			case 0: newX=newX+speed;
					break;
			case 1: newY=newY-speed;
					break;
			case 2: newX=newX-speed;
					break;
			case 3: newY=newY+speed;
					break;
			default: console.log("OMAGAAAD");
			break;
		}
		
		x.offset({top:newY, left:newX});
	});
}

function winEvent() {
	MUKKA.moving = false;
	LEVEL.resetLevel();
	if (LEVEL.currentLevel >= LEVEL.maxLevel) {
		alert("You won...you great great cow!");
		LEVEL.currentLevel = 1;
		createLevel(LEVEL.currentLevel);
	}	else {
		alert("Gratz cow, you completed level "+LEVEL.currentLevel+"!");
		LEVEL.currentLevel++; 
		createLevel(LEVEL.currentLevel);
	}
	
}

function lossEvent() {
	LEVEL.resetLevel();
	alert("Muuuuuh!");
	createLevel(LEVEL.currentLevel);	
}

//funzione che gestisce il movimento della mukka
MUKKA.setDirection = function(varX, varY) {
	var K = Math.abs(varX/varY);
	var y = varY > 0 ? MUKKA.speed/Math.sqrt(K*K+1) : -MUKKA.speed/Math.sqrt(K*K+1);
	var x = varX > 0 ? K*MUKKA.speed/Math.sqrt(K*K+1) : -K*MUKKA.speed/Math.sqrt(K*K+1);
	
	MUKKA.dirX = x;
	MUKKA.dirY = y;
}
