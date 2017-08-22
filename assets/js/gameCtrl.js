let game = {
  round: 0,
  possibilities: ['#orange', '#red', '#blue', '#green'],
  currentGame: [],
  player: []
};

const orangePad = document.getElementById('orange');
const redPad = document.getElementById('red');
const bluePad = document.getElementById('blue');
const greenPad = document.getElementById('green');
const startBtn = document.getElementById('start-btn');
const overlay = document.getElementById('overlay');

orangePad.addEventListener('click', function(){addToPlayer('#orange');});
redPad.addEventListener('click', function(){addToPlayer('#red');});
bluePad.addEventListener('click', function(){addToPlayer('#blue');});
greenPad.addEventListener('click', function(){addToPlayer('#green');});
startBtn.addEventListener('click', startGame);

function startGame() {
  console.log('starting game');
  overlay.classList.add('hidden');
  setPattern();
};

function setPattern(){
    console.log('set pattern ' + game.round);
    let idx = Math.floor(Math.random() * 4);
    // console.log('idx: ' + idx);
    // console.log(game.possibilities[idx]);
    game.currentGame.push(game.possibilities[idx]);
    console.log(game);
    showPattern();
};

//let i = 0;
function showPattern() {

  document.body.classList.add('disable_clicking');
  console.log('disable_clicking');
  let i = 0;
  let delay = 0;
  let moves = setInterval(function(){
    fillColor(game.currentGame[i]);
    i++;
    delay = 3000;
    if(i > game.currentGame.length){
      clearInterval(moves);
      document.body.classList.remove('disable_clicking');
      console.log('disable_clicking off ' + i);
    }
  }, 1000);

};

function addToPlayer(colorSel) {
    fillColor(colorSel);
    game.player.push(colorSel)

  if(game.player.length >= game.currentGame.length){
      checkRound();
  }
};

function fillColor(theColor){
  console.log("filling color");
    if(theColor === '#orange'){
        orangePad.classList.add('orangeFill');
        setTimeout(function(){orangePad.classList.remove('orangeFill')}, 500);
    }
    else if (theColor === '#red') {
      redPad.classList.add('redFill');
      setTimeout(function(){redPad.classList.remove('redFill')}, 500);
    }
    else if (theColor === '#blue') {
      bluePad.classList.add('blueFill');
      setTimeout(function(){bluePad.classList.remove('blueFill')}, 500);
    }
    else if (theColor === '#green') {
      greenPad.classList.add('greenFill');
      setTimeout(function(){greenPad.classList.remove('greenFill')}, 500);
    }
};

function checkRound() {
  let roundStatus = document.getElementById('round_status');

  overlay.classList.remove('hidden');
  startBtn.classList.add('hidden');
  roundStatus.classList.remove('hidden');

  for(let b=0;b<game.currentGame.length;b++){
    if((game.currentGame[b] != game.player[b]) || (game.currentGame.length != game.player.length)){
      console.log('game over');
      break
    }
    else if(b + 1 === game.player.length){

      setTimeout(function(){
        overlay.classList.add('hidden');
        startBtn.classList.remove('hidden');
        roundStatus.classList.add('hidden');
      }, 1000);

      console.log('win');
      game.round++;
      game.player = [];
      setPattern();
      break;
    }
  }
}
