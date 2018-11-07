
window.onload = function(){
	var blankx = "300px";
	var blanky = "300px";
	
	
	var solvedleft = new Array();
	var solvedtop = new Array();
	

	var puzzleArea = document.querySelectorAll("div#puzzlearea div");
	var shuffButton = document.getElementById("shufflebutton");
	var header = document.body.children[0];
	
	var i=0;
	var a=0;
	var k=0;
		
	for(i=0;i<puzzleArea.length;i++){
		puzzleArea[i].classList.add("puzzlepiece");
			
		puzzleArea[i].style.backgroundPosition = "" + (a*100*-1) + "px " + (k*100*-1) + "px";
			
		puzzleArea[i].style.left="" + (a*100) + "px";
		solvedleft.push(puzzleArea[i].style.left);
		puzzleArea[i].style.top="" + (k*100) + "px";
		solvedtop.push(puzzleArea[i].style.top);
			
		a++;
		if(a>3){
			k+=1;
			a=0;
		}

		(function(){
			var pos = i;
			
			puzzleArea[i].addEventListener("click",function(){move(pos);},false);
			
			puzzleArea[i].addEventListener("mouseover",function(){isMovable(pos);},false);
		}());
	}

	
	shuffButton.addEventListener("click",function(){shuffle();},false);


	function isMovable(pos){
		if(puzzleArea[pos].style.left == blankx || puzzleArea[pos].style.top == blanky){
            
			if(Math.abs(blankx.substring(0,blankx.length-2) - (puzzleArea[pos].style.left.substring(0,puzzleArea[pos].style.left.length-2)))==100 ||
		   	   Math.abs(blanky.substring(0,blanky.length-2) - (puzzleArea[pos].style.top.substring(0,puzzleArea[pos].style.top.length-2)))==100)
			{
				puzzleArea[pos].classList.add('movablepiece');
				return true;
			}
		}
	}

	function move(position){
		
		if(isMovable(position)){
			var tempx = blankx;
			var tempy = blanky;
			blankx = puzzleArea[position].style.left;
			blanky = puzzleArea[position].style.top;
			puzzleArea[position].style.left = tempx;
			puzzleArea[position].style.top = tempy;
			for(var i=0;i<puzzleArea.length;i++){
				puzzleArea[i].classList.remove('movablepiece');
			}
		}
		
		if(isSolved()){
			for(i=0;i<puzzleArea.length;i++)
			{
				puzzleArea[i].style.backgroundImage = "url('car.jpg')";
				puzzleArea[i].style.backgroundSize = "400px 400px";
				puzzleArea[i].style.borderColor = "red";
			}
			header.innerHTML =  "<h1>YOU SOLVED IT!</h1>";
			header.style.fontSize = "14pt";
			header.style.color = "red";
			header.style.fontFamily = "Times New Roman";
		}
	}

	var options = new Array();
	var opt=0;

	function shuffle(){
		for(var a=0;a<1000;a++){
			for(var i=0;i<puzzleArea.length;i++){
				if(isMovable(i)){
					options.push(i);		
				}
			}
			opt=options[Math.floor((Math.random()*options.length)+0)];
			move(opt);
		}
		for(var i=0;i<puzzleArea.length;i++)
		{
			puzzleArea[i].style.backgroundImage = "url('car.jpg')";
			puzzleArea[i].style.borderColor = "black";
			puzzleArea[i].style.backgroundSize = "400px 400px";
		}
		document.body.children[0].innerHTML =  "<h1>Fifteen Puzzle</h1>";
		header.style.fontSize = "14pt";
		header.style.color = "black";
		header.style.fontFamily = "Arial";
	}

	function isSolved(){
		for(var i=0;i<puzzleArea.length;i++){
			if(puzzleArea[i].style.left!=solvedleft[i] || puzzleArea[i].style.top!=solvedtop[i]){
				return false;
			}
		}
		return true;
	}
	shuffle();
};
