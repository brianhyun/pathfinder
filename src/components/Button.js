import styled from "styled-components";

const Button = styled.button`
  display: flex;
  align-items: center;
  font-weight: 600;
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  box-shadow: 0px 3px 8px ECECEC;
  &:hover {
    background-color: #1b263b;
  }
  background-color: ${(props) => (props.disabled ? "#6C6C6C" : "#415a77")};
`;

export default Button;
