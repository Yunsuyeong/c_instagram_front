import { gql, useQuery } from "@apollo/client";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/auth/Button";
import PageTitle from "../components/PageTitle";
import RoomList from "../components/RoomList";
import { Room_Fragment } from "../fragments";
import { SeeRoomQuery } from "../generated/graphql";
import useUser from "../hooks/useUser";

interface IParams {
  roomid: string;
}

const Container = styled.div`
  display: flex;
  height: 90vh;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70vw;
  background-color: lightyellow;
  padding: 15px 5px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin: 15px 10px;
`;

const Avatar = styled.img`
  height: 30px;
  width: 30px;
  background-color: #2c2c2c;
  margin-left: 10px;
  margin-right: 20px;
  border-radius: 50%;
`;

const Username = styled.h3`
  font-size: 16px;
  font-weight: 600;
`;

const Messages = styled.div`
  display: flex;
  justify-content: center;
`;

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`;

const Pavatar = styled.img`
  height: 50px;
  width: 50px;
  background-color: #2c2c2c;
  border-radius: 50%;
`;

const PButton = styled(Button).attrs({
  as: "span",
})`
  border-radius: 10px;
  padding: 7px 10px;
`;

const See_Room_Query = gql`
  query seeRoom($id: Int!) {
    seeRoom(id: $id) {
      ...RoomFragment
    }
  }
  ${Room_Fragment}
`;

const Room = () => {
  const history = useHistory();
  const { roomid } = useParams<IParams>();
  const roomId = +roomid;
  const { data } = useUser();
  const { data: roomData } = useQuery<SeeRoomQuery>(See_Room_Query, {
    variables: {
      id: roomId,
    },
  });
  const Name = roomData?.seeRoom?.users
    ?.map((user) => user?.username)
    ?.find((name) => name !== data?.me?.username);
  return (
    <div>
      <PageTitle title={"Instagram * Direct"}></PageTitle>
      <Container>
        <RoomList />
        <MessageContainer>
          <Header>
            <Avatar src="" />
            <Username>{Name}</Username>
          </Header>
          <Messages>
            <ProfileHeader>
              <Pavatar src="" />
              <Username style={{ fontSize: "20px" }}>{Name}</Username>
              <p>Instagram</p>
              <PButton onClick={() => history.push(`/${Name}`)}>
                Go to Profile
              </PButton>
            </ProfileHeader>
          </Messages>
        </MessageContainer>
      </Container>
    </div>
  );
};

export default Room;
