let game = {
  round: 0,
  possibilities: ['#orange', '#red', '#blue', '#green'],
  currentGame: [],
  player: [],
  record: 0,
  volume: [{amt: 0.0, cl: 'icon-volume-mute'},
    {amt: 0.25, cl: 'icon-volume-quarter'},
    {amt: 0.50, cl: 'icon-volume-half'},
    {amt: 0.75, cl: 'icon-volume-three-quarter'},
    {amt: 1, cl: 'icon-volume-full'}]
};

let volumeIdx = 2;

const orangePad = document.getElementById('orange');
const redPad = document.getElementById('red');
const bluePad = document.getElementById('blue');
const greenPad = document.getElementById('green');
const startBtn = document.getElementById('start-btn');
const overlay = document.getElementById('overlay');
const audioBtn = document.getElementById('volume-btn');
const volIcon = document.getElementById('vol_icon');
const roundTitle = document.getElementById('round_title');
const recordText = document.getElementById('record_score');

orangePad.addEventListener('click', function(){addToPlayer('#orange');});
redPad.addEventListener('click', function(){addToPlayer('#red');});
bluePad.addEventListener('click', function(){addToPlayer('#blue');});
greenPad.addEventListener('click', function(){addToPlayer('#green');});
startBtn.addEventListener('click', startGame);
audioBtn.addEventListener('click', function(){adjustVolume(volumeIdx);});

function startGame() {
  console.log('starting game');
  overlay.classList.add('hidden');
  game.round = 0;
  game.currentGame = [];
  game.player = [];
  volIcon.classList.add(game.volume[volumeIdx].cl);
  roundTitle.textContent = "Round " + (game.round + 1);
  recordText.textContent = game.record;
  setPattern();
};

function adjustVolume(volume) {
  const volume_feedback = document.getElementById('volume_ctrl');
  if (volumeIdx + 1 < game.volume.length) {
    volumeIdx = volumeIdx + 1;
    volIcon.classList.remove(game.volume[volumeIdx - 1].cl);
    volIcon.classList.add(game.volume[volumeIdx].cl);
  }
  else {
    volumeIdx = 0;
    volIcon.classList.remove(game.volume[4].cl);
    volIcon.classList.add(game.volume[0].cl);
  }

  volume_feedback.load();
  volume_feedback.volume = game.volume[volumeIdx].amt;
  volume_feedback.play();
}

function setPattern(){
    console.log('set pattern ' + game.round);
    let idx = Math.floor(Math.random() * 4);
    game.currentGame.push(game.possibilities[idx]);
    console.log(game);
    showPattern();
};

function showPattern() {

  const gameBoard = document.getElementById('game-board');

  gameBoard.classList.add('disable_clicking');
  console.log('disable_clicking');
  let i = 0;
  let delay = 0;
  let moves = setInterval(function(){
    fillColor(game.currentGame[i]);
    i++;
    delay = 3000;
    if(i > game.currentGame.length){
      clearInterval(moves);
      gameBoard.classList.remove('disable_clicking');
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

    if(theColor === '#orange'){
      const audio_one = document.getElementById('audio_one');
      audio_one.load();
      audio_one.volume = game.volume[volumeIdx].amt;
      audio_one.play();
        orangePad.classList.add('orangeFill');
        setTimeout(function(){orangePad.classList.remove('orangeFill')}, 500);
        // orangePad.style.backgroundColor = 'orange';
        // setTimeout(function(){orangePad.style.backgroundColor = 'black';}, 500);
    }
    else if (theColor === '#red') {
      const audio_two = document.getElementById('audio_two');
      audio_two.load();
      audio_two.volume = game.volume[volumeIdx].amt;
      audio_two.play();
      redPad.classList.add('redFill');
      setTimeout(function(){redPad.classList.remove('redFill')}, 500);
    }
    else if (theColor === '#blue') {
      const audio_three = document.getElementById('audio_three');
      audio_three.load();
      audio_three.volume = game.volume[volumeIdx].amt;
      audio_three.play();
      bluePad.classList.add('blueFill');
      setTimeout(function(){bluePad.classList.remove('blueFill')}, 500);
    }
    else if (theColor === '#green') {
      const audio_four = document.getElementById('audio_four');
      audio_four.load();
      audio_four.volume = game.volume[volumeIdx].amt;
      audio_four.play();
      greenPad.classList.add('greenFill');
      setTimeout(function(){greenPad.classList.remove('greenFill')}, 500);
    }
};

function checkRound() {
  const roundStatus = document.getElementById('round_status');
  const infoText = document.getElementById('info_text');

  overlay.classList.remove('hidden');
  startBtn.classList.add('hidden');
  infoText.classList.add('hidden');
  roundStatus.classList.remove('hidden');

  for(let b=0;b<game.currentGame.length;b++){
    if((game.currentGame[b] != game.player[b]) || (game.currentGame.length != game.player.length)){
      infoText.classList.remove('hidden');
      //check if new record
      if(game.round > game.record){
        infoText.textContent = "You made it to round " + game.round +
          ". Congratulations A new record!";
        game.record = game.round;
      }
      else {
        infoText.textContent = "You made it to round " + game.round +
          ". Try again to reach a new record";
        game.record = game.record;
      }

      startBtn.classList.remove('hidden');
      roundStatus.classList.add('hidden');
      startBtn.value = "Try again";
      break
    }
    else if(b + 1 === game.player.length){

      roundTitle.textContent = "Round " + (game.round + 2);
      roundStatus.textContent = "Round " + (game.round + 1) + " cleared";

      setTimeout(function(){
        overlay.classList.add('hidden');
        startBtn.classList.remove('hidden');
        roundStatus.classList.add('hidden');
      }, 1000);

      game.round++;
      game.player = [];
      setPattern();
      break;
    }
  }
}
