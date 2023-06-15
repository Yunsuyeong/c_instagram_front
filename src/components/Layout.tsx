import styled from "styled-components";
import Header from "./Header";

const Content = styled.main`
  width: 100%;
  max-width: 930px;
  display: flex;
  justify-content: center;
  margin-top: 45px;
  margin: 0 auto;
`;

const Layout = ({ children }: any) => {
  return (
    <>
      <Header />
      <Content>{children}</Content>
    </>
  );
};

export default Layout;
