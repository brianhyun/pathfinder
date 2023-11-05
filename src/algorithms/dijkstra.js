import { calculateDistance } from "./utils";

export default async function dijkstra(
  grid,
  startNode,
  endNode,
  visualizeStep
) {
  const numRows = grid.length;
  const numCols = grid[0].length;

  const distances = Array(numRows)
    .fill(null)
    .map(() => Array(numCols).fill(Infinity));
  const visited = Array(numRows)
    .fill(null)
    .map(() => Array(numCols).fill(false));

  distances[startNode.row][startNode.col] = 0;
  const priorityQueue = [{ node: startNode, distance: 0 }];

  while (priorityQueue.length > 0) {
    priorityQueue.sort((a, b) => a.distance - b.distance);
    const { node, distance } = priorityQueue.shift();
    visited[node.row][node.col] = true;

    await visualizeStep(node, distance); // Visualize the current step

    if (node.row === endNode.row && node.col === endNode.col) {
      const path = [];
      let currentNode = node;

      while (currentNode !== null && currentNode.previous !== undefined) {
        path.unshift(currentNode);
        currentNode = currentNode.previous;
      }

      if (currentNode === null) {
        return []; // No valid path found
      }

      return path;
    }

    const neighbors = [];

    if (node.row > 0) neighbors.push(grid[node.row - 1][node.col]);
    if (node.row < numRows - 1) neighbors.push(grid[node.row + 1][node.col]);
    if (node.col > 0) neighbors.push(grid[node.row][node.col - 1]);
    if (node.col < numCols - 1) neighbors.push(grid[node.row][node.col + 1]);

    for (const neighbor of neighbors) {
      if (
        neighbor.type !== "boundary" &&
        !visited[neighbor.row][neighbor.col]
      ) {
        const newDistance =
          distances[node.row][node.col] + calculateDistance(node, neighbor);
        if (newDistance < distances[neighbor.row][neighbor.col]) {
          distances[neighbor.row][neighbor.col] = newDistance;
          neighbor.previous = node;
          priorityQueue.push({ node: neighbor, distance: newDistance });
        }
      }
    }
  }

  return []; // No valid path found
}
