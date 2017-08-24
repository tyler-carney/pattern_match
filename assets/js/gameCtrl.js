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
  game.round = 0;
  game.currentGame = [];
  game.player = [];
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
    game.player.push(colorSel);

  if(game.player.length >= game.currentGame.length){
      checkRound();
  }
};

function fillColor(theColor){
  console.log("filling color");
    if(theColor === '#orange'){
      const audio_one = document.getElementById('audio_one');
      audio_one.load();
      audio_one.volume = 0.2;
      audio_one.play();
        orangePad.classList.add('orangeFill');
        setTimeout(function(){orangePad.classList.remove('orangeFill')}, 500);
        // orangePad.style.backgroundColor = 'orange';
        // setTimeout(function(){orangePad.style.backgroundColor = 'black';}, 500);
    }
    else if (theColor === '#red') {
      const audio_two = document.getElementById('audio_two');
      audio_two.load();
      audio_two.volume = 0.2;
      audio_two.play();
      redPad.classList.add('redFill');
      setTimeout(function(){redPad.classList.remove('redFill')}, 500);
    }
    else if (theColor === '#blue') {
      const audio_three = document.getElementById('audio_three');
      audio_three.load();
      audio_three.volume = 0.2;
      audio_three.play();
      bluePad.classList.add('blueFill');
      setTimeout(function(){bluePad.classList.remove('blueFill')}, 500);
    }
    else if (theColor === '#green') {
      const audio_four = document.getElementById('audio_four');
      audio_four.load();
      audio_four.volume = 0.2;
      audio_four.play();
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
      startBtn.classList.remove('hidden');
      roundStatus.classList.add('hidden');
      startBtn.value = "Try again";
      console.log('game over');
      break
    }
    else if(b + 1 === game.player.length){

      roundStatus.textContent = "Round " + game.round + " cleared";

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
