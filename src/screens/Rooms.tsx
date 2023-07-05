import { gql, useQuery } from "@apollo/client";
import { faBoltLightning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "../components/auth/Button";
import Input from "../components/auth/Input";
import { Search_Users_Query } from "../components/Header";
import PageTitle from "../components/PageTitle";
import RoomList from "../components/RoomList";
import { SearchUsersQuery } from "../generated/graphql";

interface ISearchForm {
  keyword: string;
}

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

const SearchForm = styled.form`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 12px;
`;

const ResultContainer = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
`;

const Result = styled.div`
  display: flex;
  padding: 10px 5px;
  margin-top: 10px;
  cursor: pointer;
`;

const UserAvatar = styled.img`
  height: 30px;
  width: 30px;
  background-color: #2c2c2c;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 50%;
`;
const Username = styled.h3`
  font-size: 16px;
  font-weight: 600;
`;

const SendButton = styled(Button).attrs({})`
  width: 90%;
  position: absolute;
  bottom: 10px;
  margin: 10px 10px;
`;

const Create_Room_Mutation = gql`
  mutation createRoom($userId: Int!) {
    createRoom(userId: $userId) {
      ok
      id
    }
  }
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
  const { register, handleSubmit, setFocus, watch } = useForm<ISearchForm>({
    defaultValues: {
      keyword: "",
    },
  });
  const Keyword = watch("keyword");
  const { data: userData, loading } = useQuery<SearchUsersQuery>(
    Search_Users_Query,
    {
      variables: {
        keyword: Keyword,
      },
    }
  );
  let array = userData?.searchUsers;
  if (Keyword === "") {
    array = [];
  }
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
          <SearchForm>
            <Input
              {...register("keyword", { required: true })}
              type="text"
              placeholder="Search..."
            />
            <ResultContainer>
              {array?.map((user) => (
                <Result key={user?.id}>
                  <UserAvatar src={user?.avatar!} />
                  <Username>{user?.username}</Username>
                </Result>
              ))}
            </ResultContainer>
            <SendButton type="submit" value="Chat" />
          </SearchForm>
        </Scontainer>
      )}
    </div>
  );
};

export default Rooms;
