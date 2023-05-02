import styled from "styled-components";

export const BaseBox = styled.div`
  width: 100%;
  background-color: white;
  border: 1px solid ${(props) => props.theme.borderColor};
`;
