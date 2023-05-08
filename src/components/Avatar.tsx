import styled from "styled-components";

const SAvatar = styled.div<{ lg: boolean }>`
  width: ${(props) => (props.lg ? "30px" : "25px")};
  height: ${(props) => (props.lg ? "30px" : "25px")};
  background-color: #2c2c2c;
  border-radius: 15px;
  overflow: hidden;
`;

const Img = styled.img`
  max-width: 100%;
`;

const Avatar = ({ url = "", lg = false }: any) => {
  return <SAvatar lg>{url !== "" ? <Img src={url} /> : null}</SAvatar>;
};

export default Avatar;
