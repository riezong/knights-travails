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

function arrayToKey(arr) {
  return `${arr[0]},${arr[1]}`;
}

function keyToArray(key) {
  return key.split(",").map(Number);
}

function knightMoves(startSquare, endSquare) {
  const queue = [];
  const visited = new Set();
  const parentMap = new Map();

  queue.push(startSquare);
  visited.add(arrayToKey(startSquare));

  // BFS Loop
  while (queue.length !== 0) {
    let currentSquare = queue.shift();
    if (
      currentSquare[0] === endSquare[0] &&
      currentSquare[1] === endSquare[1]
    ) {
      console.log(parentMap);
      console.log("you found it");
      return;
    } else {
      // Generate all 8 potential nextSquares from currentSquare using the knight moves.
      let possibleNextSquares = possibleKnightMoves(
        currentSquare[0],
        currentSquare[1],
      );
      // console.log(possibleNextSquares);

      possibleNextSquares.forEach((move) => {
        if (isValidMove(move[0], move[1])) {
          if (visited.has(arrayToKey(move)) === false) {
            visited.add(arrayToKey(move));
            parentMap.set(arrayToKey(move), arrayToKey(currentSquare)); // [key (child), value (parent)]
            queue.push(move);
          }
        }
      });
    }
  }

  console.error("queue");
  console.log(queue);
  console.error("visited");
  console.log(visited);
  console.error("parentMap");
  console.log(parentMap);
}

knightMoves([0, 0], [7, 7]);
