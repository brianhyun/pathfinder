import "./App.css";
import { useState } from "react";
import styled from "styled-components";

import Grid from "./components/Grid";
import Button from "./components/Button";
import dijkstra from "./algorithms/dijkstra";
import { generateInitialGridState } from "./utils/gridUtils";

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AppContainer = styled.div`
  padding: 20px;
  min-width: 600px;
`;

function App() {
  // Grid state
  const rows = 20;
  const cols = 20;
  const initialGridState = generateInitialGridState(rows, cols);
  const [grid, setGrid] = useState(initialGridState);

  const [endNode, setEndNode] = useState(null);
  const [startNode, setStartNode] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const onCellMouseDown = (row, col) => {
    setIsDrawing(true);
    const updatedGrid = [...grid];
    updatedGrid[row][col].type = "boundary"; // Set the initial cell as part of the boundary
    setGrid(updatedGrid);
  };

  const onCellMouseEnter = (row, col) => {
    if (isDrawing) {
      const updatedGrid = [...grid];
      updatedGrid[row][col].type = "boundary"; // Set the current cell as part of the boundary
      setGrid(updatedGrid);
    }
  };

  const onCellMouseUp = () => {
    setIsDrawing(false); // Stop drawing when the mouse button is released
  };

  const onCellClick = (row, col) => {
    const updatedGrid = [...grid];
    const clickedCell = updatedGrid[row][col];

    // If startNode is not set, set the clicked cell as the start node
    if (!startNode) {
      setStartNode({ row, col });
      clickedCell.type = "start";
    }
    // If endNode is not set, set the clicked cell as the end node
    else if (!endNode) {
      setEndNode({ row, col });
      clickedCell.type = "end";
    }

    // Update grid state
    updatedGrid[row][col] = clickedCell;
    setGrid(updatedGrid);
  };

  const ANIMATION_SPEED = 10; // Duration of each animation step in milliseconds

  const animatePath = (path) => {
    let step = 0;

    const intervalId = setInterval(() => {
      if (step >= path.length) {
        clearInterval(intervalId); // Animation complete
        return;
      }

      const { row, col } = path[step];
      const updatedGrid = [...grid];
      if (updatedGrid[row][col].type !== "end")
        updatedGrid[row][col].type = "path"; // Mark the cell as part of the path
      setGrid(updatedGrid);

      step++;
    }, ANIMATION_SPEED);
  };

  const visualizeStep = async (node, distance) => {
    const updatedGrid = [...grid];
    if (
      (node.row === startNode.row && node.col === startNode.col) ||
      (node.row === endNode.row && node.col === endNode.col)
    )
      return;

    updatedGrid[node.row][node.col].distance = distance; // Optionally, store the distance on the grid for visualization purposes
    updatedGrid[node.row][node.col].type = "visited"; // Mark the current node as visited

    setGrid(updatedGrid);
    await sleep(ANIMATION_SPEED); // Pause for a short duration for visualization
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleFindPath = async () => {
    if (startNode && endNode) {
      const updatedGrid = [...grid];

      // Call the pathfinding algorithm to find the shortest path
      const path = await dijkstra(
        updatedGrid,
        startNode,
        endNode,
        visualizeStep
      );
      console.log(path);

      // Return error if no path exists
      if (!path.length) {
        alert("No path exists between the start and end nodes!");
        return;
      }

      animatePath(path);
    } else {
      alert("Please select start and end nodes before finding the path.");
    }
  };

  return (
    <MainContainer>
      <AppContainer>
        <Button onClick={handleFindPath}>Find Path</Button>
        <Grid
          rows={rows}
          cols={cols}
          grid={grid}
          onCellClick={onCellClick}
          onCellMouseUp={onCellMouseUp}
          onCellMouseDown={onCellMouseDown}
          onCellMouseEnter={onCellMouseEnter}
        />
      </AppContainer>
    </MainContainer>
  );
}

export default App;
