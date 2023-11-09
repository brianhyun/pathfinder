import GridRow from "./GridRow";
import GridCell from "./GridCell";
import GridContainer from "./GridContainer";

const Grid = ({
  rows,
  cols,
  grid,
  onCellClick,
  onCellMouseUp,
  onCellMouseDown,
  onCellMouseEnter,
}) => {
  return (
    <GridContainer>
      {grid.map((row, rowIndex) => (
        <GridRow key={rowIndex}>
          {row.map((cell, colIndex) => (
            <GridCell
              $cellType={cell.type}
              onMouseUp={onCellMouseUp}
              key={`${rowIndex}-${colIndex}`}
              onClick={() => onCellClick(rowIndex, colIndex)}
              onMouseDown={() => onCellMouseDown(rowIndex, colIndex)}
              onMouseEnter={() => onCellMouseEnter(rowIndex, colIndex)}
            />
          ))}
        </GridRow>
      ))}
    </GridContainer>
  );
};

export default Grid;
