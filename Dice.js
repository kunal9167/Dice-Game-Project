
var scores=[0,0];
var roundScore=0;
var activePlayer=0;
var gameOver=false;
var limit=100;
var s0=document.getElementById("score-0");
var s1=document.getElementById("score-1");
var curr0=document.getElementById("current-0");
var curr1=document.getElementById("current-1");
var hold=document.querySelector(".btn-hold");
var submit=document.querySelector(".btn-submit");
var input=document.querySelector("input");
var limNum=document.querySelector("#Limit-num");
limNum.textContent=100;
reset();
submit.addEventListener("click",function()
{
	var v=input.value;

	if(v>0 && v>=scores[0] && v>=scores[1])
	{
		limit=v;
		limNum.textContent=limit;
		input.value='';
	}
});
document.querySelector('.btn-roll').addEventListener("click",function()
{
	if(gameOver==false)
	{
		document.querySelector(".dice1").style.display="block";
		document.querySelector(".dice2").style.display="block";
	//1. Random Number
	var dice1=(Math.floor(Math.random()*6))+1;
	var dice2=(Math.floor(Math.random()*6))+1;
	
	//2. Display The Result
	var diceDom1=document.querySelector('.dice1');
	diceDom1.style.display="block";
	diceDom1.src="dice-"+dice1+".png";

	var diceDom2=document.querySelector('.dice2');
	diceDom2.style.display="block";
	diceDom2.src="dice-"+dice2+".png";

	//3. Update the eound score if the dice!=1
	if(dice1>1 && dice2>1)
	{
		roundScore+=dice1;
		roundScore+=dice2;
		document.getElementById("current-"+activePlayer).textContent=roundScore;
	}
	else
	{
		document.querySelector('.dice1').style.display="block";
		document.querySelector('.dice2').style.display="block";
		nextPlayer();
	}
}
});
hold.addEventListener("click",function(){
	if(!gameOver)
		{scores[activePlayer]+=roundScore;
			document.getElementById("score-"+activePlayer).textContent=scores[activePlayer];
			if(scores[activePlayer]>=limit)
			{
				document.querySelector('#name-'+activePlayer).textContent="WINNER!";
				document.querySelector(".dice1").style.display="none";
				document.querySelector(".dice2").style.display="none";
				document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
				document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
				gameOver=true;
			}
			else
			{
				nextPlayer();
			}
		}
	});
document.querySelector(".btn-new").addEventListener("click",reset);
function reset()
{
	scores=[0,0];
	roundScore=0;
	document.querySelector('.player-'+activePlayer+'-panel').classList.remove('winner');
	
	document.querySelector('.dice1').style.display="none";
	document.querySelector('.dice2').style.display="none";
	
	s0.textContent='0';
	s1.textContent='0';
	curr0.textContent='0';
	curr1.textContent='0';
	document.querySelector('#name-'+activePlayer).textContent="Player "+(activePlayer+1);
	document.querySelector('.player-0-panel').classList.add('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	gameOver=false;
	activePlayer=0;
}
function nextPlayer()
{
	roundScore=0;		
	document.getElementById("current-"+activePlayer).textContent=roundScore;
	document.querySelector(".player-0-panel").classList.toggle("active");
	document.querySelector(".player-1-panel").classList.toggle("active");
	document.querySelector(".dice1").style.display="none";
	document.querySelector(".dice2").style.display="none";
	activePlayer==0?activePlayer=1:activePlayer=0;
}