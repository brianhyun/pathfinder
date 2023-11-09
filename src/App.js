import "./App.css";
import styled from "styled-components";
import { useState, useEffect } from "react";

import Grid from "./components/Grid";
import Button from "./components/Button";
import astar from "./algorithms/astar";
import dijkstra from "./algorithms/dijkstra";
import { generateInitialGridState } from "./utils/gridUtils";

const AppContainer = styled.div``;

const MainContainer = styled.main`
  max-width: 600px;
  margin: 0 auto; /* Center the container */
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
`;

const Section = styled.section`
  margin-top: 20px;
`;

const SectionHeading = styled.h2`
  font-weight: 900;
  color: #353535;
  letter-spacing: 0em;
  font-size: 0.875rem;
  line-height: 1.25rem;
  text-transform: uppercase;
`;

const SectionDivider = styled.hr`
  margin-top: 20px;
  margin-bottom: 20px;
  border-left: none;
  border-right: none;
  border-bottom: none;
  border-top: 1px solid lightgray;
`;

const List = styled.ol`
  margin-top: 4px;
  padding-inline-start: 0px;
  list-style-position: inside;
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
  const [buttonDisabled, setButtonDisabled] = useState(!(startNode && endNode));

  useEffect(() => {
    setButtonDisabled(!(startNode && endNode));
  }, [startNode, endNode]);

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
      if (
        !(
          updatedGrid[row][col].type === "end" ||
          updatedGrid[row][col].type === "start"
        )
      )
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
      const path = await astar(updatedGrid, startNode, endNode, visualizeStep);
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
    <AppContainer>
      <MainContainer>
        <Section id="heading">
          <h1>Pathfinder</h1>
          <p style={{ marginTop: "4px" }}>
            Explore the world of algorithms in real-time with Pathfinder. This
            interactive web application allows you to witness the magic of
            pathfinding algorithms like A*, Dijkstra's, and Breadth-First Search
            as they navigate through mazes and obstacles, finding the shortest
            routes.
          </p>
        </Section>

        <SectionDivider />

        <Section id="instructions">
          <SectionHeading>Instructions</SectionHeading>
          <List>
            <li>Click to select a start node.</li>
            <li>Click to select an end node.</li>
            <li>Click and drag to create a boundary.</li>
          </List>
        </Section>

        <Section id="grid">
          <Grid
            rows={rows}
            cols={cols}
            grid={grid}
            onCellClick={onCellClick}
            onCellMouseUp={onCellMouseUp}
            onCellMouseDown={onCellMouseDown}
            onCellMouseEnter={onCellMouseEnter}
          />
          <div
            style={{
              display: "flex",
              marginTop: "14px",
              alignItems: "center",
              justifyContent: "end",
            }}
          >
            <Button onClick={handleFindPath} disabled={buttonDisabled}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                style={{ width: "20px", height: "20px", marginRight: "8px" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              Find path
            </Button>
          </div>
        </Section>
      </MainContainer>
    </AppContainer>
  );
}

export default App;
