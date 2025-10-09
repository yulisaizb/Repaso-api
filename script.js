const container = document.getElementById("puzzle-container");
const message = document.getElementById("message");
const difficultySelect = document.getElementById("difficulty");
const restartBtn = document.getElementById("restart");

let gridSize = parseInt(difficultySelect.value);
let draggedPiece = null;

function initPuzzle() {
  container.innerHTML = "";
  message.textContent = "";
  gridSize = parseInt(difficultySelect.value);
  const totalPieces = gridSize * gridSize;

  container.style.width = `${gridSize * 100}px`;
  container.style.height = `${gridSize * 100}px`;
  container.style.display = "grid";
  container.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

  let positions = Array.from({ length: totalPieces }, (_, i) => i);
  shuffle(positions);

  positions.forEach((pos) => {
    const piece = document.createElement("div");
    piece.classList.add("piece");
    piece.draggable = true;
    piece.dataset.correct = pos;

    piece.style.backgroundImage = "url('https://your-image-url.jpg')"; // Cambia por tu imagen
    piece.style.backgroundSize = `${gridSize * 100}px ${gridSize * 100}px`;
    piece.style.backgroundPosition = `${-(pos % gridSize) * 100}px ${-Math.floor(pos / gridSize) * 100}px`;
    piece.style.width = "100px";
    piece.style.height = "100px";
    piece.style.border = "1px solid #ccc";
    piece.style.boxSizing = "border-box";
    piece.style.cursor = "grab";

    container.appendChild(piece);
  });

  addDragEvents();
}

function addDragEvents() {
  const pieces = container.querySelectorAll(".piece");

  pieces.forEach((piece) => {
    piece.addEventListener("dragstart", (e) => {
      draggedPiece = e.target;
    });

    piece.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    piece.addEventListener("drop", (e) => {
      e.preventDefault();
      if (draggedPiece && draggedPiece !== e.target) {
        const draggedIndex = [...container.children].indexOf(draggedPiece);
        const targetIndex = [...container.children].indexOf(e.target);

        container.insertBefore(draggedPiece, container.children[targetIndex]);
        container.insertBefore(e.target, container.children[draggedIndex]);

        checkWin();
      }
    });
  });
}

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

restartBtn.addEventListener("click", initPuzzle);
difficultySelect.addEventListener("change", initPuzzle);

initPuzzle();
