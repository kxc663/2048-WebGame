var mainGame = {
  blockNumber: [],
  score: 0,
  begin: function(){
    //initialize all the blocks
    this.blockNumber = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]];
    //initialize score
    this.score = 0;
    // create 5 numbers in the block (2 or 4) randomly
    this.createNumber(5);
    // update the blocks
    this.update();
  },
  // a function to update blocks and score
  update: function(){
    for (var i = 0; i < 4; i++){
      for (var j = 0; j < 4; j++){
        var block = document.getElementById("block" + i + j);
        if (this.blockNumber[i][j] != 0){
          block.innerHTML = this.blockNumber[i][j];
        }else{
          block.innerHTML = "";
        }
      }
    }
    document.getElementById("score").innerHTML = this.score;
    document.getElementById("highestScore").innerHTML = localStorage.getItem("highestScore");
    if(this.gameOver()){
        document.getElementById("pause").style.display = "block";
      setTimeout(() => {
        document.getElementById("pause").style.display = "none";
        document.getElementById("gameOver").style.display = "block";
        document.getElementById("finalScore").innerHTML = this.score;}, 5000);
    }

  },
  
  //move left
  left: function(){
    var temp = String(this.blockNumber);
    for (var i = 0; i < 4; i++){
      for (var j = 0; j < 3; j++){
        var index = -1;
        for (var k = j + 1; k < 4; k++){
          if (this.blockNumber[i][k] != 0) {
            index = k;
            break;
          }
        }
        if (index != -1){
          if (this.blockNumber[i][j] == this.blockNumber[i][index]){
            this.blockNumber[i][j] += this.blockNumber[i][index];
            this.blockNumber[i][index] = 0;
            this.score += this.blockNumber[i][j];
          }else if(this.blockNumber[i][j] == 0) {
            this.blockNumber[i][j] = this.blockNumber[i][index];
            this.blockNumber[i][index] = 0;
            j--;
         }
        }
      }
    }
    if (temp != String(this.blockNumber)){
      this.createNumber(0);
    }
    this.update();
  },
  
  //move right
  right: function(){
    var temp = String(this.blockNumber);
    for (var i = 0; i < 4; i++){
      for (var j = 3; j >= 0; j--){
        var index = -1;
        for (var k = j - 1; k >=0; k--){
          if (this.blockNumber[i][k] != 0) {
            index = k;
            break;
          }
        }
        if (index != -1){
          if (this.blockNumber[i][j] == this.blockNumber[i][index]){
            this.blockNumber[i][j] += this.blockNumber[i][index];
            this.blockNumber[i][index] = 0;
            this.score += this.blockNumber[i][j];
          }else if(this.blockNumber[i][j] == 0) {
            this.blockNumber[i][j] = this.blockNumber[i][index];
            this.blockNumber[i][index] = 0;
            j++;
         }
        }
      }
    }
    if (temp != String(this.blockNumber)){
      this.createNumber(0);
    }
    this.update();
  },
  
  up: function(){
    var temp = String(this.blockNumber);
    for (var i = 0; i < 4; i++){
      for (var j = 0; j <3 ; j++){
        var index = -1;
        for (var k = j + 1; k < 4; k++){
          if (this.blockNumber[k][i] != 0) {
            index = k;
            break;
          }
        }
        if (index != -1){
          if (this.blockNumber[j][i] == this.blockNumber[index][i]){
            this.blockNumber[j][i] += this.blockNumber[index][i];
            this.blockNumber[index][i] = 0;
            this.score += this.blockNumber[i][j];
          }else if(this.blockNumber[j][i] == 0) {
            this.blockNumber[j][i] = this.blockNumber[index][i];
            this.blockNumber[index][i] = 0;
            j--;
         }
        }
      }
    }
    if (temp != String(this.blockNumber)){
      this.createNumber(0);
    }
    this.update();
  },
  
  down: function(){
    var temp = String(this.blockNumber);
    for (var i = 0; i < 4; i++){
      for (var j = 3; j >=0 ; j--){
        var index = -1;
        for (var k = j - 1; k >= 0; k--){
          if (this.blockNumber[k][i] != 0) {
            index = k;
            break;
          }
        }
        if (index != -1){
          if (this.blockNumber[j][i] == this.blockNumber[index][i]){
            this.blockNumber[j][i] += this.blockNumber[index][i];
            this.blockNumber[index][i] = 0;
            this.score += this.blockNumber[i][j];
          }else if(this.blockNumber[j][i] == 0) {
            this.blockNumber[j][i] = this.blockNumber[index][i];
            this.blockNumber[index][i] = 0;
            j++;
         }
        }
      }
    }
    if (temp != String(this.blockNumber)){
      this.createNumber(0);
    } 
    this.update();
  },
  
  // a function to create n 2 or 4 blocks
  createNumber: function(n){
    for (var i = 0; i < n + 1; i++){
      while (true){
        var row = Math.floor(Math.random() * 4);
        var col = Math.floor(Math.random() * 4);
        if (this.blockNumber[row][col] == 0){
          // randomize number 0 or 1
          var randomNumber = Math.floor(Math.random() * 2);
          // if 0 create 2, else create 4
          if (randomNumber == 0){
            this.blockNumber[row][col] = 2; 
          }else{
            this.blockNumber[row][col] = 4; 
          }
          break;
        }
      }
    }
  },
  
  // a function used to check when the game is over
  gameOver: function(){
    for (var i = 0; i < 4; i++){
      for (var j = 0; j < 4; j++){
        if(this.blockNumber[i][j] == 0){
          return false;
        }else if(j < 3 && this.blockNumber[i][j] == this.blockNumber[i][j+1]){
          return false;
        }else if(i < 3 && this.blockNumber[i][j] == this.blockNumber[i+1][j]){
          return false;
        }
      }
    }

    if(this.score>=localStorage.getItem("highestScore")){
      localStorage.setItem("highestScore", this.score);
      document.getElementById("highestScore").innerHTML = localStorage.getItem("highestScore");
    }
    return true;
  }
}

document.onkeydown = function(){
  if (event.keyCode == 37){ //move left
    mainGame.left();
  }else if(event.keyCode == 39){  //move right
    mainGame.right();
  }else if(event.keyCode == 38){  //move up
    mainGame.up();
  }else if(event.keyCode == 40){  //move down
    mainGame.down();
  }
}

/*
function tryAgain() {
  mainGame.begin();
  document.getElementById("pause").style.display = "none";
  document.getElementById("gameOver").style.display = "none";
}*/

mainGame.begin();
console.log(mainGame.blockNumber);

function tryAgain(){
  document.getElementById("pause").style.display = "none";
  document.getElementById("gameOver").style.display = "none";
  mainGame.begin();
}