var stateActions = { preload: preload, create: create, update: update };

var game = new Phaser.Game(750, 500, Phaser.AUTO, 'game', stateActions);
var score = 0;
console.log(score);
var labelScore;
var player;
var objects = [];
var objectInterval = 3;
var objectsPosition = [];
var newObject;
var collectedObjects = new Array(11).fill(0);
var x;
var y;

function preload(){
  game.load.image("playerImg","../assets/mario.png");
  game.load.audio("score","../assets/score.mp3");
  game.load.audio("notscore","../assets/notscore.mp3");
  game.load.audio("rootscore","../assets/rootscore.mp3");
  game.load.image("background","../assets/background.jpg");
  game.load.image("good","../assets/good.png");
  game.load.image("bad","../assets/bad.png");
  game.load.image("root","../assets/root.png");
}

function create(){
  game.stage.setBackgroundColor("#070332");
  game.add.image(0,-200,"background");
  game.add.text(13,16,"score :",{font: "25px Langdon", fill: "#FFFFFF"});
  labelScore = game.add.text(90,15,"0", {font: "30px Langdon", fill:"#FFFFFF"});

  player = game.add.sprite(350,360,"playerImg");
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.arcade.enable(player);

  this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
  this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
  this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
  this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);

  this.rightKey2 = game.input.keyboard.addKey(Phaser.Keyboard.D);
  this.leftKey2 = game.input.keyboard.addKey(Phaser.Keyboard.A);
  this.upKey2 = game.input.keyboard.addKey(Phaser.Keyboard.W);
  this.downKey2 = game.input.keyboard.addKey(Phaser.Keyboard.S);

  game.time.events.loop(
    objectInterval*Phaser.Timer.SECOND,
    generateObject);
}

function update(){
  player.body.velocity.x = 0;
  player.body.velocity.y = 0;

  if (this.leftKey.isDown || this.leftKey2.isDown)
  {
    player.body.velocity.x = -75;
  }
  if (this.rightKey.isDown || this.rightKey2.isDown)
  {
    player.body.velocity.x = 75;
  }
  if (this.upKey.isDown || this.upKey2.isDown)
  {
    player.body.velocity.y = -75;
  }
  if (this.downKey.isDown || this.downKey2.isDown)
  {
    player.body.velocity.y = 75;
  }


  if(player.y < 0 || player.y > 500 || player.x < 0 || player.x > 750){
      gameOver();
    }

  for(var i=0; i<objects.length; i++){
    if(game.physics.arcade.overlap(player,objects[i])){
        if(objectsPosition[i]==0){
          updateScoreGood();
          game.sound.play("score");
        }
        else if(objectsPosition[i]==1){
          updateScoreBad();
          game.sound.play("notscore");
        }
        else if(objectsPosition[i]==2){
          updateScoreRoot();
          game.sound.play("rootscore");
        }
      collectedObjects[objectsPosition[i]] = 1;
      objects[i].destroy();
      objects.splice(i,1);
      objectsPosition.splice(i,1);
    }
  }

  if(score>=12){

  }

  if(score<0){
    gameOver();
  }
}


function generateObject(){
  if(score<12){
    pickObject();
  }
  else if(score>=12){
    pickObject2();
  }

  pickLocation();
  var diceRollX2 = game.rnd.integerInRange(-50,50);
  var object = game.add.sprite(x, y, newObject);
  object.scale.x = 0.5;
  object.scale.y = 0.5;
  objects.push(object);
  game.physics.arcade.enable(object);
  object.body.velocity.x = diceRollX2;
  object.body.velocity.y = 50;
}

function pickObject(){
  var diceRoll = game.rnd.integerInRange(0,2);
  switch(diceRoll){
    case 0:
      newObject = "good";
      objectsPosition.push(0);
      break;
    case 1:
      newObject = "bad";
      objectsPosition.push(1);
      break;
    case 2:
      newObject = "root";
      objectsPosition.push(2);
      break;
  }
}

function pickObject2(){
  var diceRoll = game.rnd.integerInRange(0,5);
  switch(diceRoll){
    case 0:
      newObject = "good";
      objectsPosition.push(0);
      break;
    case 1:
      newObject = "bad";
      objectsPosition.push(1);
      break;
    case 2:
      newObject = "bad";
      objectsPosition.push(1);
      break;
    case 3:
      newObject = "bad";
      objectsPosition.push(1);
      break;
    case 4:
      newObject = "root";
      objectsPosition.push(2);
      break;
    case 5:
      newObject = "root";
      objectsPosition.push(2);
      break;
  }
}

function pickLocation(){
  var diceRoll = game.rnd.integerInRange(0,2);
  switch(diceRoll){
    case 0:
      x = 350;
      y = 20;
      break;
    case 1:
      x = 20;
      y = 120;
      break;
    case 2:
      x = 770;
      y = 120;
      break;
  }
}

function updateScoreGood(){
  score+=5;
  labelScore.setText(score.toString());
}

function updateScoreBad(){
  score-=5;
  labelScore.setText(score.toString());
}

function updateScoreRoot(){
  score = Math.round(Math.sqrt(score));
  labelScore.setText(score.toString());
}

function gameOver(){
  game.paused = true;
  var answer = prompt("would you like to play again? enter y or n");
  if(answer == "y"){
    score = 0;
    game.paused = false;
    game.state.restart();
  }
  else{
    game.destroy();
  }
}
