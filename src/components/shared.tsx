import styled from "styled-components";

export const BaseBox = styled.div`
  width: 100%;
  background-color: white;
  border: 1px solid ${(props) => props.theme.borderColor};
`;

export const FatLink = styled.div`
  font-weight: 600;
  color: rgb(142, 142, 142);
`;
