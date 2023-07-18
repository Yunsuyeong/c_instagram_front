import { useReactiveVar } from "@apollo/client";
import { faMoon } from "@fortawesome/free-regular-svg-icons";
import { faSun } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { darkModeVar, darkModeOn, darkModeOff } from "../../apollo";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

const Wrapper = styled.div`
  max-width: 350px;
  width: 100%;
`;

const Footer = styled.footer`
  margin-top: 20px;
`;

const DarkModeBtn = styled.span`
  cursor: pointer;
`;

const AuthLayout = ({ children }: any) => {
  const darkmode = useReactiveVar(darkModeVar);
  return (
    <Container>
      <Wrapper>{children}</Wrapper>
      <Footer>
        <DarkModeBtn onClick={darkmode ? darkModeOff : darkModeOn}>
          <FontAwesomeIcon icon={darkmode ? faSun : faMoon} />
        </DarkModeBtn>
      </Footer>
    </Container>
  );
};

export default AuthLayout;
