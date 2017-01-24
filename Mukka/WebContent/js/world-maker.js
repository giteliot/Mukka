var WORLD = {
		
		isBlocked : [[]], 	 //array che assegna ad ogni punto della mappa il numero delle istanze che bloccano il passaggio su quel punto
		SIZE_OF_BLOCKS : 64, //grandezza dei blocchi in pixel
		SIZE_OF_BOUND : 60,	 //tolleranza alla collision (se = a SIZE_OF_BLOCKS zero tolleranza, se = a 0 non c'è collisione
		N: 1,				 //larghezza in blocchi
		M: 1				 //altezza in blocchi
		
};

//reset the world function, and the content of the html
WORLD.createWorld = function(N,M) {
	
	$('#content').html("");
	$('#content').height(N*WORLD.SIZE_OF_BLOCKS-16);
	$('#content').width(M*WORLD.SIZE_OF_BLOCKS-12);
	
	WORLD.N = N;
	WORLD.M = M;
	WORLD.isBlocked = [[]];
	WORLD.addObject("wallContainer");
	
	for(var i = 0; i < M*WORLD.SIZE_OF_BLOCKS; i++) {
		var tmp = [];
		for(var j = 0; j < N*WORLD.SIZE_OF_BLOCKS; j++)
			tmp[j] = 0;
		WORLD.isBlocked[i] = tmp;

	}		
}

WORLD.addObject = function(id) {
	$('#content').append("<div id='"+id+"' class='"+id+"'><\/div>");
}

//adds an object with the specified id, name and class
WORLD.addObjectIdNameClass = function(objId, objName,objClass) {
	$('#content').append("<div id='"+objId+"' name='"+objName+"' class='"+objClass+"'><\/div>");
}

//circonda la mappa di blocchi, con n righe e m colonne
WORLD.surroundWorld = function(){
	for (var i = 1; i <= WORLD.N; i++) {
		WORLD.addBlock(i,1);
		WORLD.addBlock(i,WORLD.M);
	}
	
	for (var i = 2; i < WORLD.M; i++) {
		WORLD.addBlock(1,i);
		WORLD.addBlock(WORLD.N,i);
	}
};


//crea un muro nella posizione (n,m) della griglia
WORLD.addBlock = function(n,m) {
	$('#wallContainer').append("<div id='block"+n+"_"+m+"' class='wallBlock'></div>");
	var id = "block"+n+"_"+m;
	$('#'+id).offset({top:(n-1)*WORLD.SIZE_OF_BLOCKS,left:(m-1)*WORLD.SIZE_OF_BLOCKS});
	var y = $('#'+id).offset().top;
	var x = $('#'+id).offset().left;
	
	for(var i = x-WORLD.SIZE_OF_BOUND-1; i < x+WORLD.SIZE_OF_BOUND; i++)
		for(var j = y-WORLD.SIZE_OF_BOUND-1; j < y+WORLD.SIZE_OF_BOUND; j++)
			if (i >= 0 && j >= 0)
				WORLD.isBlocked[i][j] += 1;
};

//rimuove il blocco in posizione (n,m)
WORLD.removeBlock = function(n,m) {
	var id = "block"+n+"_"+m;
	var block = $('#'+id);
	if (!block)
		return false;
	
	var y = block.offset().top;
	var x = block.offset().left;
	
	for(var i = x-WORLD.SIZE_OF_BOUND-1; i < x+WORLD.SIZE_OF_BOUND; i++)
		for(var j = y-WORLD.SIZE_OF_BOUND-1; j < y+WORLD.SIZE_OF_BOUND; j++)
			if (i >= 0 && j >= 0)
				WORLD.isBlocked[i][j] -= 1;

	block.remove();
}

//add a row at at column n
WORLD.addRow = function(n) {
	for (var k = 2; k < WORLD.M; k++)
		WORLD.addBlock(n,k);
}

//add a column at row m
WORLD.addColumn = function(m) {
	for (var k = 2; k < WORLD.N; k++)
		WORLD.addBlock(k,m);
}

//add blocks from X1, Y1 to X2 Y2
WORLD.addBigBlock = function(X1,Y1, X2, Y2) {
	for (var i = X1; i <= X2; i++)
		for (var j = Y1; j <= Y2; j++)
		WORLD.addBlock(i,j);
}

//set the object id at position (n,m) in the grid
WORLD.setObjectAtPosition = function(id, n, m) {
	id.offset({top: (n-1)*WORLD.SIZE_OF_BLOCKS, left: (m-1)*WORLD.SIZE_OF_BLOCKS});
}
