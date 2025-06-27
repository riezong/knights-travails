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
      // Path reconstruction
      // Build path

      // get last square
      // get parent of last square
      // set parent as current
      // get parent of current
      // ...
      // repeat until parent is the starting square

      const buildPath = [];
      let lastSquare = Array.from(parentMap.keys())[parentMap.size - 1];

      buildPath.push(lastSquare);
      let thisSquare = parentMap.get(lastSquare);
      buildPath.push(thisSquare);
      let parentSquare = parentMap.get(thisSquare);
      buildPath.push(parentSquare);

      while (parentSquare !== arrayToKey(startSquare)) {
        thisSquare = parentSquare;
        parentSquare = parentMap.get(thisSquare);
        buildPath.push(parentSquare);
        if (parentSquare === startSquare) break;
      }

      // Reverse path
      const reversePath = [];
      for (let i = buildPath.length; i > 0; i--) {
        reversePath.push(buildPath[i - 1]);
      }

      // Output path and move count
      console.log(
        "You made it in " +
          (reversePath.length - 1) +
          " moves! Here's your path: " +
          reversePath.join(" -> "),
      );
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
