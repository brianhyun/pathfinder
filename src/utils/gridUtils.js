export const generateInitialGridState = (rows, columns) => {
  const initialGridState = [];

  for (let i = 0; i < rows; i++) {
    const row = [];

    for (let j = 0; j < columns; j++) {
      row.push({ row: i, col: j, type: "empty" }); // Create an empty cell object
    }

    initialGridState.push(row);
  }

  return initialGridState;
};
