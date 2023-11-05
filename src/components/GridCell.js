import styled from "styled-components";

const GridCell = styled.div`
  width: 30px;
  height: 30px;
  cursor: pointer;
  border-radius: 8px;
  background-color: ${(props) => {
    if (props.cellType === "start") return "#219ebc";
    else if (props.cellType === "visited") return "#8338ec";
    else if (props.cellType === "path") return "#4f772d";
    else if (props.cellType === "end") return "#fb8500";
    else if (props.cellType === "boundary") return "#023047";
    else return "#edede9";
  }};
`;

export default GridCell;
