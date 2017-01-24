var LEVEL = {
		currentLevel: 1, //current level...
		maxLevel: 5,	 //number of levels in the game
		hasKey: false,	 //is there a key in the level?
		keyX1: 0,		 //if there the box where mukka takes the key
		keyX2: 0,
		keyY1: 0,
		keyY2: 0,
		doors: [],		 //dorrs in the level [{x,y},...]
		cannons: []		 //cannons in the level [{x,y,dir,speed,delay},...]
}



LEVEL.resetLevel = function() {
	
	LEVEL.doors = [];
	LEVEL.cannons = [];
}

//adds a key in the position (x,y) of the grid
LEVEL.addKey = function(x,y) {

	WORLD.addObject("key");
	WORLD.setObjectAtPosition($('#key'), x, y);
	x = x-1;
	y = y-1;
	LEVEL.hasKey = true;
	LEVEL.keyY1 = x*WORLD.SIZE_OF_BLOCKS-16;
	LEVEL.keyY2 = x*WORLD.SIZE_OF_BLOCKS+80;
	LEVEL.keyX1 = y*WORLD.SIZE_OF_BLOCKS-16;
	LEVEL.keyX2 = y*WORLD.SIZE_OF_BLOCKS+80;
}

//transforms the block in the position (x,y) of the grid into a door
LEVEL.blockToDoor = function(x,y) {
	var id = "block"+x+"_"+y;
	var block = $('#'+id);
	if (!block) 
		return false;
	
	block.attr('class','door');
	LEVEL.doors.push({x:x,y:y});
		
}

//transforms the block in the positon (x,y) of the grid, shooting in direction dir (0,1,2,3), with speed speed and with a deloay of...delay
LEVEL.blockToCannon = function(x,y,dir,speed,delay) {
	var id = "block"+x+"_"+y;
	var block = $('#'+id);
	if (!block)
		return false;
	
	block.attr('class','cannon dir'+dir);
	block.attr('name',x+"-"+y+"-"+dir+"-"+speed+"-"+delay);
	LEVEL.cannons.push({x:x, y:y, dir:dir, speed:speed, delay:delay});
}

//deletes all the doors
LEVEL.openDoors = function() {
	for(k in LEVEL.doors) {
		WORLD.removeBlock(LEVEL.doors[k].x,LEVEL.doors[k].y);
	}
}

//sets the common settings of the level, with mukka in position (n,m)
LEVEL.setBaseLevel = function(n,m) {
	
	LEVEL.hasKey = false;
	LEVEL.doors = [];
	WORLD.addObject("mukka");
	MUKKA.pointer = $('#mukka');
	WORLD.setObjectAtPosition(MUKKA.pointer, n, m);
	MUKKA.moving = false;
	var y = Math.round(MUKKA.pointer.offset().top);
	var x = Math.round(MUKKA.pointer.offset().left);
	var w = window;
	window.scrollTo(x+32-w.innerWidth/2,y+32-w.innerHeight/2);
}

function createLevel1() {
	
	WORLD.createWorld(13,7);
	LEVEL.setBaseLevel(2,2.5);
		
	WORLD.surroundWorld();
	WORLD.addColumn(4);
	WORLD.removeBlock(12,4);
	WORLD.removeBlock(11,4);
	WORLD.removeBlock(1,5);
	WORLD.removeBlock(1,6);
	
}

function createLevel2() {
	
	WORLD.createWorld(19,12);
	
	LEVEL.setBaseLevel(2.5,11);
	
	WORLD.surroundWorld();
	WORLD.removeBlock(5,12);
	WORLD.removeBlock(6,12);
	
	WORLD.addRow(4);
	WORLD.removeBlock(4,2);
	WORLD.removeBlock(4,3);
	WORLD.removeBlock(4,4);
	
	WORLD.addBlock(5,6);
	WORLD.addBlock(6,6);
	WORLD.addBlock(7,6);
	WORLD.addBlock(8,6);
	WORLD.addBlock(9,6);
	WORLD.addBlock(10,6);
	WORLD.addBlock(11,6);
	WORLD.addBlock(12,6);
	WORLD.addBlock(13,6);
	WORLD.addBlock(14,6);
	WORLD.addBlock(15,6);
	WORLD.addBlock(16,6);	
	WORLD.addBlock(7,2);
	WORLD.addBlock(7,3);	
	WORLD.addBlock(10,4);
	WORLD.addBlock(10,5);	
	WORLD.addBlock(13,2);
	WORLD.addBlock(13,3);	
	WORLD.addBlock(16,4);
	WORLD.addBlock(16,5);	
	WORLD.addBlock(16,7);
	WORLD.addBlock(16,10);
	WORLD.addBlock(16,11);
	WORLD.addBlock(13,7);
	WORLD.addBlock(13,8);
	WORLD.addBlock(13,9);	
	WORLD.addBigBlock(7,9,10,11);
	
}


function createLevel3() {
	WORLD.createWorld(9,18);
	LEVEL.setBaseLevel(2,9.5);
	
	WORLD.surroundWorld();
	WORLD.addBigBlock(2,8,5,8);
	WORLD.addBigBlock(2,11,5,11);
	WORLD.addBigBlock(5,4,6,7);
	WORLD.addBigBlock(5,12,6,15);
	WORLD.addBlock(4,4);
	WORLD.addBlock(2,15);
	
	LEVEL.addKey(4,7);
	LEVEL.blockToDoor(1,12);
	LEVEL.blockToDoor(1,13);
}


function createLevel4() {
	WORLD.createWorld(15,15);
	LEVEL.setBaseLevel(2.5,2);
	
	WORLD.surroundWorld();
	WORLD.addBigBlock(4,2,4,12);
	WORLD.addBigBlock(5,12,12,12);
	WORLD.addBigBlock(7,4,11,4);
	WORLD.addBigBlock(7,5,7,9);
	WORLD.addBigBlock(12,4,12,11);
	WORLD.addBlock(8,9);
	WORLD.addBigBlock(9,7,9,9);
	
	LEVEL.addKey(8,6);
	LEVEL.blockToDoor(2,1);
	LEVEL.blockToDoor(3,1);
	
}

function createLevel5() {
	WORLD.createWorld(8,18);
	LEVEL.setBaseLevel(4.5,2.1);
	
	WORLD.addBigBlock(3,1,3,4);
	WORLD.addBigBlock(6,1,6,4);
	WORLD.addBigBlock(1,4,1,15);
	WORLD.addBigBlock(8,4,8,15);
	WORLD.addBigBlock(3,15,3,18);
	WORLD.addBigBlock(6,15,6,18);	
	WORLD.addBigBlock(4,1,5,1);
	
	WORLD.addBlock(2,4);
	WORLD.addBlock(7,4);
	WORLD.addBlock(2,15);
	WORLD.addBlock(7,15);
	
	LEVEL.blockToCannon(8,7,1,10,0);
	LEVEL.blockToCannon(1,12,3,10,0);
}
