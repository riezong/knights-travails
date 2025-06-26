import "./styles.css";

function possibleKnightMoves(row, column) {
  return [
    [row - 2, column - 1],
    [row - 2, column + 1],
    [row - 1, column - 2],
    [row + 1, column - 2],
    [row - 1, column + 2],
    [row + 1, column + 2],
    [row + 2, column - 1],
    [row + 2, column + 1],
  ];
}

function isValidMove(row, column) {
  if (0 <= row && row <= 7) {
    if (0 <= column && column <= 7) {
      return true;
    }
  } else {
    return false;
  }
}

function knightMoves(startSquare, endSquare) {
  const queue = [];
  const visited = [];
  const parentMap = [];

  queue.push(startSquare);
  visited.push(startSquare);

  // BFS Loop
  let currentSquare = queue.shift();
  if (currentSquare[0] === endSquare[0] && currentSquare[1] === endSquare[1]) {
    console.log(parentMap);
    console.log("you found it");
    return;
  } else {
    // Generate all 8 potential nextSquares from currentSquare using the knight moves.
    let possibleNextSquares = possibleKnightMoves(
      startSquare[0],
      startSquare[1],
    );
    console.log(possibleNextSquares);

    possibleNextSquares.forEach((move) => {
      if (isValidMove(move[0], move[1])) {
        if (visited.includes(move) === false) {
          visited.push(move);
          parentMap.push(currentSquare);
          queue.push(move);
        }
      }
    });
  }

  console.log(queue);
  console.log(visited);
  console.log(parentMap);
}

knightMoves([0, 0], [7, 7]);
