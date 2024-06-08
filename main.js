window.addEventListener("DOMContentLoaded", () => {
  let bubbleContainer = document.querySelector(".playBoard");
  let randomNumber = "";
  let hit = document.querySelector("#hit");
  let matchNumber;
  let gameOver = document.querySelector(".gameOver");
  let timer = 60;
  let timeCounter;
  let score = 0;

//   Create function For Score
let scoreCounter = ()=>{
    score+=10;
    document.querySelector('#score').textContent = score;
    document.querySelector('#score2').textContent = score;
}
//   Create function For Score

  // Create Function For Timer
  let runTimer = () => {
    timeCounter = setInterval(() => {
      if (timer > 0) {
        timer--;
        document.querySelector("#timer").textContent = timer;
      } else {
        gameOver.classList.add("active");
        gameOver.children[2].textContent = "YOU RAN OUT OF TIME";
        bubbleContainer.innerHTML = "";
        clearInterval(timeCounter);
        resizeObserver.disconnect();
      }
    }, 1000);
  };
  runTimer();
  // Create Function For Timer

  //   Bubbles Creation Start
  let bubbleWidthInRem = 2.5;
  let bubbleHeightInRem = 2.5;

  let rootFontSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize
  );

  let bubbleWidth = rootFontSize * bubbleWidthInRem;
  let bubbleHeight = rootFontSize * bubbleHeightInRem;

  let randomColor = () => {
    let hue = Math.floor(Math.random() * 360);
    let saturation = Math.floor(Math.random() * 50) + 20 + "%";
    let lightness = Math.floor(Math.random() * 40) + 25 + "%";
    return `hsl(${hue}, ${saturation}, ${lightness})`;
  };

  let createBubble = () => {
    bubbleContainer.innerHTML = " ";
    let parentWidth = bubbleContainer.clientWidth;
    let parentHeight = bubbleContainer.clientHeight;

    let bubblePerRow = Math.floor(parentWidth / bubbleWidth);
    let bubblePerColumn = Math.floor(parentHeight / bubbleHeight);
    let totalBubbles = bubblePerRow * bubblePerColumn;

    let fragment = document.createDocumentFragment();

    for (let i = 1; i <= totalBubbles; i++) {
      randomNumber = Math.floor(Math.random() * 10);
      let bubble = document.createElement("div");
      bubble.className = "bubble";
      bubble.style.backgroundColor = randomColor();
      bubble.textContent = randomNumber;
      fragment.appendChild(bubble);
    }
    matchNumber = hit.innerHTML = randomNumber;
    bubbleContainer.appendChild(fragment);
  };
//   createBubble();

  let resizeObserver = new ResizeObserver(createBubble);
  resizeObserver.observe(bubbleContainer);
  //   Bubbles Creation End

  // Bubble Event On Click Start
  bubbleContainer.onclick = (e) => {
    if (e.target.classList.contains("bubble")) {
      let clickedBubble = Number(e.target.textContent);
      if (clickedBubble !== matchNumber) {
        gameOver.classList.add("active");
        gameOver.children[2].textContent = "YOU HIT THE WRONG NUMBER";
        bubbleContainer.innerHTML = "";
        clearInterval(timeCounter);
        resizeObserver.disconnect();
      } else {
        createBubble();
        scoreCounter();
    }
}
  };
  // Bubble Event On Click End

  document.querySelector('#restart')
  gameOver.onclick = (e) => {
    gameOver.classList.remove('active');
    window.location.reload();
  }
  
  
});
