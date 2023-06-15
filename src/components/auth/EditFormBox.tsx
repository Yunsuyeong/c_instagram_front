import styled from "styled-components";
import { BaseBox } from "../shared";

const Container = styled(BaseBox)`
  width: 60vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 35px 40px 25px 40px;
  margin-top: 45px;
  form {
    margin-top: 35px;
    width: 50%;
    display: flex;
    justify-items: center;
    flex-direction: column;
    align-items: center;
  }
`;

const EditFormBox = ({ children }: any) => {
  return <Container>{children}</Container>;
};

export default EditFormBox;
