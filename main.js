const promise = fetch('q.json').then(res => res.json()).then((data) => {
  main(data);
}).catch(err => { throw err });


function main(data) {
  aArr = ["A", "B", "C", "D"];
  var qNum = 0;
  rightAn = 0;

  createQ();
  result();
  timerStarter();

  //question builder
  function createQ() {
    if (data[qNum]) {
      document.getElementById("qu").innerHTML = data[qNum]["q"];
      for (j = 0; j < 4; j++) {
        document.getElementById("an").innerHTML += "<div class='anOne' id= 'an" + j + "'> " + aArr[j] + " " + data[qNum]["a"][j]["aText"] + "</div>";
      }
    }
  }

  //result
  function result() {
    document.getElementById("result").innerText = "Count: " + rightAn;
  }

  //timer builder
  function timerStarter() {
    var endIn = 20;
    var display = document.querySelector('#time');
    startTimer(endIn, display);
  }

  //timer to the end of game, if ended - lost
  function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    var myTimer = setInterval(timerF, 1000);

    //stop the game
    if (data[qNum] == undefined) {
      document.getElementById("qu").innerText = "GAME OVER";
      clearInterval(myTimer);
    }
    
    //timer
    function timerF() {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      display.innerHTML = "<span style='color:#fff; font-width:bold; font-size: 28px;'>Time to answer: " + minutes + ":" + seconds + "</span>";
      if (seconds < 11 && minutes == 0) {
        display.innerHTML = "<span style='color:#f00; font-width:bold; font-size: 28px;'>Time to answer: " + minutes + ":" + seconds + "</span>";
      }
      if (timer-- == 0) {
        alert("Timeout! Next Question");
        newQ();
        clearInterval(myTimer);
      }
    }

    //build new question
    function newQ() {
      document.getElementById("an").innerHTML = "";
      qNum++;
      createQ();
      clearInterval(myTimer);
      timerStarter();
    }

    // create button
    if (data[qNum]){
      for (j = 0; j < 4; j++) {
        document.getElementById("an" + j).addEventListener("click", testAn);
      }
    }

    //test answer and count
    function testAn() {
      j = this.id.substring(2);
      if (document.getElementById("an" + j).innerText == aArr[j] + " " + data[qNum]["a"][j]["aText"] && data[qNum]["a"][j]["isTrue"] == true) {
        alert("right");
        rightAn++;
        result();
        newQ();
      } else {
        alert("wrong");
        newQ();
      }
    }
  }
}


