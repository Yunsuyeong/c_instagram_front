import { faBoltLightning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../components/auth/Button";
import Input from "../components/auth/Input";
import PageTitle from "../components/PageTitle";
import RoomList from "../components/RoomList";

const Container = styled.div<{ isSend: boolean }>`
  display: flex;
  height: 90vh;
  opacity: ${(props) => (props.isSend ? 0.1 : 1)};
`;

const SendContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 70vw;
  padding: 15px 5px;
`;

const Icon = styled.span`
  margin-left: 15px;
  cursor: pointer;
`;

const ProfileButton = styled(Button).attrs({
  as: "span",
})`
  width: 15%;
  margin-top: 0px;
  margin-left: 10px;
`;

const Scontainer = styled.div`
  position: fixed;
  top: 25vh;
  left: 30vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  width: 40%;
  height: 50%;
  background-color: white;
`;

const SendForm = styled.form`
  width: 30vw;
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 12px;
`;

const Rooms = () => {
  const [isSend, setIsSend] = useState<boolean>(false);
  const onSendChange = () => {
    setIsSend((prev) => !prev);
  };
  const onBack = () => {
    setIsSend(false);
  };
  useEffect(() => {
    console.log("isSend is ", isSend);
  }, [isSend]);
  return (
    <div>
      <PageTitle title={"받은 메시지함 * Direct"}></PageTitle>
      <Container isSend={isSend}>
        <RoomList />
        <SendContainer>
          <Icon>
            <FontAwesomeIcon icon={faBoltLightning} size="6x" />
          </Icon>
          <h1 style={{ fontSize: "24px" }}>내 메시지</h1>
          <p style={{ fontSize: "16px" }}>
            친구나 그룹에 비공개 사진과 메시지를 보내보세요
          </p>
          <ProfileButton onClick={() => onSendChange()}>
            Send Message
          </ProfileButton>
        </SendContainer>
      </Container>
      {isSend && (
        <Scontainer>
          <h1>New Message</h1>
          <SendForm>
            <Input type="text" placeholder="Search..." />
          </SendForm>
        </Scontainer>
      )}
    </div>
  );
};

export default Rooms;
