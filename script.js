"use strict";

const cells = document.querySelectorAll(".board-cell");
const profile1 = document.querySelector(".profile1");
const profile2 = document.querySelector(".profile2");

let player = "X"; // Starting with "X" (player's turn)
const boardState = Array(9).fill(null);

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
      console.log("Winner is: " + boardState[a]);
      return boardState[a]; // Return the winner ("X" or "O")
    }
  }

  return boardState.includes(null) ? null : "draw"; // Return "draw" if no moves left
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
      cell.innerHTML = `<svg
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
      profile1.style.transform = "scale(1.1)";
      setTimeout(() => {
        profile1.style.transform = "scale(1)";
      }, 400);
      player = "O"; // Switch player
    } else {
      cell.innerHTML = `<svg
        xmlns="http://www.w3.org/2000/svg"
        width="88"
        height="88"
        viewBox="0 0 24 24"
        fill="none"
        stroke="url(#darkRedGradient)"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <defs>
          <linearGradient id="darkRedGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#892201" />
            <stop offset="25%" stop-color="#6f1b01" />
            <stop offset="50%" stop-color="#4e1301" />
            <stop offset="75%" stop-color="#6f1b01" />
            <stop offset="100%" stop-color="#892201" />
          </linearGradient>
        </defs>
        <circle cx="12" cy="12" r="8" stroke="url(#darkRedGradient)" stroke-width="4"></circle>
      </svg>`;
      profile2.style.transform = "scale(1.1)";
      setTimeout(() => {
        profile2.style.transform = "scale(1)";
      }, 400);
      player = "X"; // Switch player
    }

    // After the move, check if there's a winner or a draw
    const status = checkGameStatus();
    if (status) {
      if (status === "draw") {
        console.log("The game is a draw.");
      } else {
        console.log(`${status} wins!`);
      }
    }
  });
});
