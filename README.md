# Pathfinder

Pathfinding Visualizer is an interactive web application that allows users to visualize various pathfinding algorithms in action. Users can create custom grids of nodes representing different terrains. By selecting a starting point and an end point, users can watch algorithms like A\*, Dijkstra's, and Breadth-First Search find the shortest path while navigating around obstacles. The application provides real-time visualization, allowing users to understand how these algorithms work step by step. It's a valuable tool for learning and exploring the principles of pathfinding algorithms in a hands-on and visually engaging way.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Future Improvements and Development Plans](#future-improvements-and-development-plans)
- [Existing Bugs](#existing-bugs)
- [Project Credits and Development Timeline](#project-credits-and-development-timeline)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Features

### Interactive Grid

- Create custom grids by placing nodes representing different terrains.
- Define start and end points to visualize pathfinding algorithms.

### Algorithm Visualization

- **Dijkstra's Algorithm:** Visualize the process of finding the shortest path using Dijkstra's algorithm.
- **A\* Algorithm:** Find the shortest path using the A\* algorithm, considering node weights and obstacles.
- **Breadth-First Search (BFS):** Explore paths in a breadth-first manner, suitable for unweighted graphs.

### Real-Time Visualization

- Observe the algorithms in action with step-by-step visualization of their exploration process.
- Understand how algorithms navigate around obstacles and choose optimal paths.

### User Interaction

- **Drag and Drop:** Easily set start and end points by clicking nodes.
- **Obstacle Placement:** Add and remove obstacles by clicking and dragging nodes.

### Educational Tool

- Ideal for learning the fundamentals of pathfinding algorithms.
- Helps users grasp algorithmic concepts through interactive visualization.

### Customization

- Adjust grid size and node placement to create scenarios of varying complexity.
- Experiment with different algorithms to compare their performance.

## Prerequisites

- Node.js and npm installed on your system.

## Installation

1. Clone the repository:

```
git clone https://github.com/brianhyun/pathfinder.git
cd pathfinder
```

2. Install dependencies for the application:

```
npm install
```

## Usage

1. Start the development server:

npm run start

2. Open your browser and navigate to `http://localhost:3000` to use the application.

## Future Improvements and Development Plans

### Customization

- Change grid size.
- Change pathfinding algorithm.
- Slow animation speed.

## Existing Bugs

- Sometimes the boundary drawing function draws boundaries even when the mouse is not clicked but simply dragged.

## Project Credits and Development Timeline

### Developer

- **Brian Hyun** - Sole Developer

### Project Timeline

- **Project Start Date:** 11/01/23
- **Project Completion Date:** TBD
- **Estimated Total Hours:** TBD

## License

This project is licensed under the [MIT License](LICENSE.md) - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgements

- Thanks to Josh Comeau for the CSS Reset.
- Thanks Abdul Bari for helping me understand pathfinding algorithms.
- Hat tip to the developers of React and other open-source libraries used in this project.
