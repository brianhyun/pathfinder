import { calculateDistance } from "./utils";

export default async function astar(grid, startNode, endNode, visualizeStep) {
  const numRows = grid.length;
  const numCols = grid[0].length;

  const heuristic = (node) => {
    // A* heuristic (Euclidean distance to the end node)
    return calculateDistance(node, endNode);
  };

  const openSet = [startNode];
  const cameFrom = {};

  const gScore = Array(numRows)
    .fill(null)
    .map(() => Array(numCols).fill(Infinity));
  gScore[startNode.row][startNode.col] = 0;

  const fScore = Array(numRows)
    .fill(null)
    .map(() => Array(numCols).fill(Infinity));
  fScore[startNode.row][startNode.col] = heuristic(startNode);

  while (openSet.length > 0) {
    openSet.sort((a, b) => fScore[a.row][a.col] - fScore[b.row][b.col]);
    const currentNode = openSet.shift();

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

    const neighbors = [];

    if (currentNode.row > 0)
      neighbors.push(grid[currentNode.row - 1][currentNode.col]);
    if (currentNode.row < numRows - 1)
      neighbors.push(grid[currentNode.row + 1][currentNode.col]);
    if (currentNode.col > 0)
      neighbors.push(grid[currentNode.row][currentNode.col - 1]);
    if (currentNode.col < numCols - 1)
      neighbors.push(grid[currentNode.row][currentNode.col + 1]);

    for (const neighbor of neighbors) {
      if (neighbor.type !== "boundary") {
        const tentativeGScore = gScore[currentNode.row][currentNode.col] + 1; // Assuming uniform cost for grid cells

        if (tentativeGScore < gScore[neighbor.row][neighbor.col]) {
          cameFrom[`${neighbor.row}-${neighbor.col}`] = currentNode;
          gScore[neighbor.row][neighbor.col] = tentativeGScore;
          fScore[neighbor.row][neighbor.col] =
            tentativeGScore + heuristic(neighbor);

          if (!openSet.includes(neighbor)) {
            openSet.push(neighbor);
          }
        }
      }
    }
  }

  // No valid path found
  console.log("No valid path found!");
  return [];
}
