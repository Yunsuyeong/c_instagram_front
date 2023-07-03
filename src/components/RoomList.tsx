import { gql, useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Room_Fragment } from "../fragments";
import { SeeRoomsQuery } from "../generated/graphql";
import useUser from "../hooks/useUser";

const Messages = styled.div`
  width: 30vw;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid ${(props) => props.theme.borderColor};
  padding: 10px 15px;
`;

const Header = styled.div`
  display: flex;
  margin: 15px 10px;
  cursor: pointer;
`;

const Avatar = styled.img`
  height: 35px;
  width: 35px;
  background-color: #2c2c2c;
  margin-left: 10px;
  margin-right: 20px;
  border-radius: 50%;
`;

const Username = styled.h3`
  font-size: 16px;
  font-weight: 600;
`;

const See_Rooms_Query = gql`
  query seeRooms {
    seeRooms {
      ...RoomFragment
    }
  }
  ${Room_Fragment}
`;

const RoomList = () => {
  const history = useHistory();
  const { data } = useUser();
  const { data: roomsData } = useQuery<SeeRoomsQuery>(See_Rooms_Query);
  const Name = roomsData?.seeRooms
    ?.map((room) => room?.users)
    ?.map((user) => user?.map((names) => names?.username))?.[0]
    ?.find((name) => name !== data?.me?.username);
  return (
    <Messages>
      <h3 style={{ fontSize: "18px", fontWeight: "bold" }}>
        {data?.me?.username}
      </h3>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h5>메시지</h5>
        <p>요청</p>
      </div>
      {roomsData?.seeRooms?.map((room) => (
        <Header
          onClick={() => history.push(`/direct/${room?.id}`)}
          key={room?.id}
        >
          <Avatar src="" />
          <Username>{Name}</Username>
        </Header>
      ))}
    </Messages>
  );
};

export default RoomList;
