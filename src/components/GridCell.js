import styled from "styled-components";

const GridCell = styled.div`
  flex: 1;
  aspect-ratio: 1/1;
  cursor: pointer;
  border-radius: 6px;
  background-color: ${(props) => {
    if (props.$cellType === "start") return "#0a9396";
    else if (props.$cellType === "visited") return "#003049";
    else if (props.$cellType === "path") return "#bb3e03";
    else if (props.$cellType === "end") return "#ee9b00";
    else if (props.$cellType === "boundary") return "#001524";
    else return "#edede9";
  }};
`;

export default GridCell;
