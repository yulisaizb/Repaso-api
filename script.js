const container = document.getElementById("puzzle-container");
const message = document.getElementById("message");
const difficultySelect = document.getElementById("difficulty");
const restartBtn = document.getElementById("restart");

let gridSize = parseInt(difficultySelect.value);

function initPuzzle() {
  container.innerHTML = "";
  message.textContent = "";
  const totalPieces = gridSize * gridSize;
  container.style.width = `${gridSize * 100}px`;
  container.style.height = `${gridSize * 100}px`;
  container.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

  let positions = Array.from({ length: totalPieces }, (_, i) => i);
  shuffle(positions);

  positions.forEach((pos, index) => {
    const piece = document.createElement("div");
    piece.classList.add("piece");
    piece.draggable = true;
    piece.dataset.correct = pos;
    piece.dataset.current = index;
    piece.style.backgroundPosition = `${-(pos % gridSize) * 100}px ${-Math.floor(pos / gridSize) * 100}px`;
    container.appendChild(piece);
  });
}

let dragged;

container.addEventListener("dragstart", (e) => {
  dragged = e.target;
});

container.addEventListener("dragover", (e) => {
  e.preventDefault();
});

container.addEventListener("drop", (e) => {
  if (e.target.classList.contains("piece")) {
    const draggedIndex = [...container.children].indexOf(dragged);
    const targetIndex = [...container.children].indexOf(e.target);

    container.insertBefore(dragged, container.children[targetIndex]);
    container.insertBefore(e.target, container.children[draggedIndex]);

    checkWin();
  }
});

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function checkWin() {
  const pieces = [...container.children];
  const isCorrect = pieces.every((piece, index) => {
    return parseInt(piece.dataset.correct) === index;
  });

  if (isCorrect) {
    message.textContent = "🎉 ¡Rompecabezas completado!";
  }
}

restartBtn.addEventListener("click", () => {
  gridSize = parseInt(difficultySelect.value);
  initPuzzle();
});

difficultySelect.addEventListener("change", () => {
  gridSize = parseInt(difficultySelect.value);
  initPuzzle();
});

initPuzzle();
