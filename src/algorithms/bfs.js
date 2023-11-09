export default async function bfs(grid, startNode, endNode, visualizeStep) {
  const numRows = grid.length;
  const numCols = grid[0].length;

  const isValidMove = (row, col) => {
    return (
      row >= 0 &&
      row < numRows &&
      col >= 0 &&
      col < numCols &&
      grid[row][col].type !== "boundary"
    );
  };

  const queue = [];
  const visited = Array(numRows)
    .fill(null)
    .map(() => Array(numCols).fill(false));
  const cameFrom = {};

  queue.push(startNode);
  visited[startNode.row][startNode.col] = true;

  while (queue.length > 0) {
    const currentNode = queue.shift();

    await visualizeStep(currentNode); // Visualize the current step

    if (currentNode.row === endNode.row && currentNode.col === endNode.col) {
      // Reconstruct and return the path if end node is reached
      const path = [];
      let node = currentNode;

      while (node !== undefined) {
        path.unshift(node);
        node = cameFrom[`${node.row}-${node.col}`];
      }

      return path;
    }

    const rowOffsets = [-1, 1, 0, 0];
    const colOffsets = [0, 0, -1, 1];

    for (let i = 0; i < 4; i++) {
      const newRow = currentNode.row + rowOffsets[i];
      const newCol = currentNode.col + colOffsets[i];

      if (isValidMove(newRow, newCol) && !visited[newRow][newCol]) {
        const neighbor = grid[newRow][newCol];
        queue.push(neighbor);
        cameFrom[`${newRow}-${newCol}`] = currentNode;
        visited[newRow][newCol] = true;
      }
    }
  }

  // No valid path found
  console.log("No valid path found!");
  return [];
}
