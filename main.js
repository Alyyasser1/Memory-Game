let control = document.querySelector(".control-button span");

control.addEventListener("click", function () {
  document.querySelector(".control-button").remove();
});

let duration = 1000;

let bolcksContainer = document.querySelector(".main-game .container");

let blocks = Array.from(bolcksContainer.children);

let order = [...Array.from(blocks).keys()];
shuffle(order);

blocks.forEach((block, index) => {
  block.style.order = order[index];

  block.addEventListener("click", function () {
    flip(block);
  });
});
console.log(blocks);
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}

function flip(block) {
  block.classList.add("flip");

  let allFlipedBlocks = blocks.filter((flipedBlock) =>
    flipedBlock.classList.contains("flip"),
  );

  if (allFlipedBlocks.length === 2) {
    stopClicking();

    checkFlipped(allFlipedBlocks[0], allFlipedBlocks[1]);
  }
}

function stopClicking() {
  bolcksContainer.classList.add("no-click");

  setTimeout(() => {
    bolcksContainer.classList.remove("no-click");
  }, duration);
}

function checkFlipped(flippedOne, flippedTwo) {
  let tries = document.querySelector(".info .tries span");

  if (flippedOne.dataset.tech === flippedTwo.dataset.tech) {
    // tries.innerHTML = parseInt(tries.innerHTML) + 1;
    flippedOne.classList.remove("flip");
    flippedTwo.classList.remove("flip");

    flippedOne.classList.add("done");
    flippedTwo.classList.add("done");
  } else {
    tries.innerHTML = parseInt(tries.innerHTML) + 1;

    setTimeout(() => {
      flippedOne.classList.remove("flip");
      flippedTwo.classList.remove("flip");
    }, duration);
  }
}
