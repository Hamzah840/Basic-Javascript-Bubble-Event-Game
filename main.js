window.addEventListener("DOMContentLoaded", () => {
  const bubbleContainer = document.querySelector(".playBoard");
  const hit = document.querySelector("#hit");
  const gameOver = document.querySelector(".gameOver");
  const displayScore1 = document.querySelector("#score");
  const displayScore2 = document.querySelector("#score2");
  const displayTimeInterval = document.querySelector("#timer");
  const restartButton = document.querySelector("#restart");
  const gameStart = document.querySelector(".gameStart");
  const play = document.querySelector("#start");
  const displayHighScore = document.querySelector("#highScore");
  let highScore = localStorage.getItem("highScore") ? parseInt(localStorage.getItem("highScore")) : 0;
  console.log(highScore);
  let matchNumber;
  let timer = 60;
  let timeCounter;
  let score = 0;
  let randomNumber = "";
  let correctClicks = 0;


  const bubbleWidthInRem = 2.5;
  const bubbleHeightInRem = 2.5;
  const rootFontSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize
  );
  const bubbleWidth = rootFontSize * bubbleWidthInRem;
  const bubbleHeight = rootFontSize * bubbleHeightInRem;

  //   Create function For Score
  const scoreCounter = () => {
      score += 10;
      displayScore1.textContent = score;
      displayScore2.textContent = score;
      displayHighScore.textContent = highScore;
      
      if (highScore < score) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
        displayHighScore.textContent = highScore;
      }
  };
  //   Create function For Score

  //   Create funtion to restart game
  const endGame = (message) => {
    gameOver.classList.add("active");
    gameOver.children[2].textContent = message;
    bubbleContainer.innerHTML = "";
    clearInterval(timeCounter);
    resizeObserver.disconnect();
  };
  //   Create funtion to restart game

  // Create Function For Timer
  const runTimer = () => {
    timeCounter = setInterval(() => {
      if (timer > 0) {
        timer--;
        displayTimeInterval.textContent = timer;
      } else {
        endGame("YOU RAN OUT OF TIME");
      }
    }, 1000);
  };
  //   runTimer();
  // Create Function For Timer

  //   Bubbles Creation Start
  const randomColor = () => {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 50) + 20 + "%";
    const lightness = Math.floor(Math.random() * 40) + 25 + "%";
    return `hsl(${hue}, ${saturation}, ${lightness})`;
  };

  const createBubble = () => {
    bubbleContainer.innerHTML = " ";
    const parentWidth = bubbleContainer.clientWidth;
    const parentHeight = bubbleContainer.clientHeight;

    const bubblePerRow = Math.floor(parentWidth / bubbleWidth);
    const bubblePerColumn = Math.floor(parentHeight / bubbleHeight);
    const totalBubbles = bubblePerRow * bubblePerColumn;

    const fragment = document.createDocumentFragment();

    for (let i = 1; i <= totalBubbles; i++) {
      randomNumber = Math.floor(Math.random() * 10);
      const bubble = document.createElement("div");
      bubble.className = "bubble";
      bubble.style.backgroundColor = randomColor();
      bubble.textContent = randomNumber;
      fragment.appendChild(bubble);
    }
    matchNumber = hit.innerHTML = randomNumber;
    bubbleContainer.appendChild(fragment);
  };
  //   Bubbles Creation End

  // Bubble Event On Click Start
  bubbleContainer.onclick = (e) => {
    if (e.target.classList.contains("bubble")) {
      const clickedBubble = Number(e.target.textContent);
      if (clickedBubble !== matchNumber) {
        endGame("YOU HIT THE WRONG NUMBER");
      } else {
        correctClicks++;
        if (correctClicks === 1) {
          correctClicks = 0;
          timer++;
          displayTimeInterval.textContent = timer;
        }
        createBubble();
        scoreCounter();
      }
    }
  };
  // Bubble Event On Click End

  const startNewGame = () => {
    timer = 60;
    displayTimeInterval.textContent = timer;
    score = 0;
    displayScore1.textContent = 0;
    displayScore2.textContent = 0;
    runTimer();
    createBubble();
  };
  play.onclick = () => {
    gameStart.style.display = "none";
    startNewGame();
  };

  restartButton.onclick = (e) => {
    gameOver.classList.remove("active");
    startNewGame();
  };

  const resizeObserver = new ResizeObserver(createBubble);
  resizeObserver.observe(bubbleContainer);
});
