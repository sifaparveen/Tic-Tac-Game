"use strict";

const cells = document.querySelectorAll(".board-cell");
const profile1 = document.querySelector(".profile1");
const profile2 = document.querySelector(".profile2");
const reset = document.querySelector(".reset");
const sound = document.querySelector(".sound");

const gameModal = document.getElementById("gameModal");
const modalMessage = document.getElementById("modalMessage");
const closeModal = document.getElementById("closeModal");
const soundSvg = document.querySelector(".feather");

const cell = [
  document.querySelector(".symbol0"),
  document.querySelector(".symbol1"),
  document.querySelector(".symbol2"),
  document.querySelector(".symbol3"),
  document.querySelector(".symbol4"),
  document.querySelector(".symbol5"),
  document.querySelector(".symbol6"),
  document.querySelector(".symbol7"),
  document.querySelector(".symbol8"),
];

const bgAudio = new Audio("sounds/gb_music.mp3");
const tileAudio = new Audio("sounds/tile_music.mp3");
const winAudio = new Audio("sounds/win_music.wav");
const drawAudio = new Audio("sounds/fail.mp3");

bgAudio.loop = true;
bgAudio.volume = 0.4;

let isPlaying = false;

sound.addEventListener("click", () => {
  if (isPlaying) {
    bgAudio.pause();
    console.log("Background music paused");
    soundSvg.innerHTML = `<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <line x1="23" y1="9" x2="17" y2="15"></line>
        <line x1="17" y1="9" x2="23" y2="15"></line>`;
  } else {
    bgAudio
      .play()
      .then(() => {
        console.log("Background music playing");
      })
      .catch((error) => {
        console.error("Error playing audio:", error);
      });
    soundSvg.innerHTML = `<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <path
          d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"
        ></path>`;
  }
  isPlaying = !isPlaying;
});

const svgX = `<svg
        xmlns="http://www.w3.org/2000/svg"
        width="88"
        height="88"
        viewBox="0 0 24 24"
        fill="none"
        stroke="url(#whiteShadeGradient)"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <defs>
          <!-- Gradient Definition -->
          <linearGradient
            id="whiteShadeGradient"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop offset="0%" stop-color="#ffffff" />
            <stop offset="25%" stop-color="#d9d9d9" />
            <stop offset="50%" stop-color="#bfbfbf" />
            <stop offset="75%" stop-color="#d9d9d9" />
            <stop offset="100%" stop-color="#ffffff" />
          </linearGradient>
        </defs>
        <line x1="6" y1="6" x2="18" y2="18" stroke="url(#whiteShadeGradient)" stroke-width="4"></line>
        <line x1="18" y1="6" x2="6" y2="18" stroke="url(#whiteShadeGradient)" stroke-width="4"></line>
      </svg>`;

const svgO = `<svg
          xmlns="http://www.w3.org/2000/svg"
          width="88"
          height="88"
          viewBox="0 0 24 24"
          fill="none"
          stroke="url(#goldGradient)"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <defs>
            <!-- Gradient Definition -->
            <linearGradient id="goldGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#DFC505" />
              <!-- Base gold -->
              <stop offset="25%" stop-color="#bfa204" />
              <!-- Darker gold -->
              <stop offset="50%" stop-color="#997f03" />
              <!-- Deep gold -->
              <stop offset="75%" stop-color="#bfa204" />
              <!-- Darker gold -->
              <stop offset="100%" stop-color="#DFC505" />
              <!-- Base gold -->
            </linearGradient>

            <!-- Shadow Filter -->
            <filter id="circleShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="2" dy="2" stdDeviation="2" flood-color="rgba(0, 0, 0, 0.4)" />
            </filter>
          </defs>

          <!-- Circle with Shadow -->
          <circle
            cx="12"
            cy="12"
            r="8"
            stroke="url(#goldGradient)"
            filter="url(#circleShadow)"
          ></circle>
        </svg>`;

const resetGame = () => {
  cells.forEach((cell) => {
    cell.innerHTML = " ";
    cell.style.boxShadow = "none";
    cell.style.border = "none";
    cell.style.backgroundColor = "transparent";
    cell.style.backgroundImage = "none";
  });
  boardState.fill(null);
  player = "X";
  gameModal.classList.add("hidden");
  modalMessage.innerHTML = "";
};

const showModal = (message) => {
  setTimeout(() => {
    gameModal.classList.remove("hidden");
    if (message === "X") {
      winAudio.play();
      modalMessage.innerHTML = `${svgX} Wins!!`;
    } else if (message === "O") {
      winAudio.play();
      modalMessage.innerHTML = `${svgO} Wins!!`;
    } else {
      modalMessage.innerHTML = "It's Draw!!";
      drawAudio.play();
    }
  }, 600);
};

let player = "X";
const boardState = Array(9).fill(null);

function winnerHighlight(a, b, c) {
  [cells[a], cells[b], cells[c]].forEach((cell) => {
    cell.style.boxShadow = "0 0 5px 5px gold";
    cell.style.border = "2px solid rgba(255, 217, 0, 0.83)";
    cell.style.backgroundColor = "rgba(176, 100, 0, 0.3)";
    cell.style.backgroundImage =
      "linear-gradient(315deg,rgba(176, 100, 0, 0.3) 0%,rgba(90, 51, 26, 0.3) 74%)";
  });
}

function checkGameStatus() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (
      boardState[a] &&
      boardState[a] === boardState[b] &&
      boardState[a] === boardState[c]
    ) {
      winnerHighlight(a, b, c);
      console.log("Winner is: " + boardState[a]);
      return boardState[a];
    }
  }

  return boardState.includes(null) ? null : "draw";
}

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    // If the cell is already filled, return early
    if (boardState[index]) return;

    console.log("Cell is clicked");

    // Update the board state with the current player's symbol
    boardState[index] = player;

    // Mark the cell with the player's symbol
    if (player === "X") {
      cell.innerHTML = svgX;
      profile1.style.transform = "scale(1.1)";
      setTimeout(() => {
        profile1.style.transform = "scale(1)";
        profile1.style.transform = "rotate(-10deg)";
      }, 400);
      player = "O";
    } else {
      cell.innerHTML = svgO;

      profile2.style.transform = "scale(1.1)";

      setTimeout(() => {
        profile2.style.transform = "scale(1)";
        profile2.style.transform = "rotate(10deg)";
      }, 400);
      player = "X";
    }

    tileAudio.play();

    // To check if there's a winner or a draw
    const status = checkGameStatus();
    if (status) {
      showModal(status);
    }
  });
});

reset.addEventListener("click", resetGame);

closeModal.addEventListener("click", resetGame);
