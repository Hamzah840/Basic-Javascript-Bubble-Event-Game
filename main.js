window.addEventListener("DOMContentLoaded", () => {
  let bubbleContainer = document.querySelector(".playBoard");
  let randomNumber = "";

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

  let makeBubble = () => {
    let parentWidth = bubbleContainer.clientWidth;
    let parentHeight = bubbleContainer.clientHeight;

    let bubblePerRow = Math.floor(parentWidth / bubbleWidth);
    let bubblePerColumn = Math.floor(parentHeight / bubbleHeight);
    let totalBubbles = bubblePerRow * bubblePerColumn;

    bubbleContainer.innerHTML = "";
    
    let fragment = document.createDocumentFragment();

    for (let i = 1; i <= totalBubbles; i++) {
      randomNumber = Math.floor(Math.random() * 10);
      let bubble = document.createElement("div");
      bubble.className = "bubble";
      bubble.style.backgroundColor = randomColor();
      bubble.textContent = randomNumber;
      fragment.appendChild(bubble);
    }
    bubbleContainer.appendChild(fragment);
  };
  makeBubble();
  let resizeObserver = new ResizeObserver(makeBubble);
  resizeObserver.observe(bubbleContainer);
});
