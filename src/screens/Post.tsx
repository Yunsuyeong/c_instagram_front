import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { SeePhotoQuery } from "../generated/graphql";

interface IParams {
  photoid: string;
}

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
`;

const PostContainer = styled.div`
  display: flex;
  position: relative;
  width: 70%;
  height: 90%;
  background-color: white;
`;

const PhotoImage = styled.img`
  position: relative;
  width: 60%;
  border-right: 1px solid black;
`;

const PostHeader = styled.div`
  display: flex;
  margin-top: 15px;
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

const PostMain = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const Caption = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin-top: 15px;
  margin-left: 55px;
`;

const Photo_Query = gql`
  query seePhoto($id: Int!) {
    seePhoto(id: $id) {
      id
      user {
        username
        avatar
      }
      file
      caption
      likes
      commentNumber
      comments {
        user {
          username
          avatar
        }
        payload
        createdAt
      }
      hashtags {
        hashtag
      }
      createdAt
    }
  }
`;

const Photo = () => {
  const { photoid } = useParams<IParams>();
  const id = +photoid;
  const { data } = useQuery<SeePhotoQuery>(Photo_Query, {
    variables: {
      id,
    },
  });
  console.log(data);
  return (
    <Background>
      <PostContainer>
        <PhotoImage src={data?.seePhoto?.file} />
        <div>
          <PostHeader>
            <Avatar src={data?.seePhoto?.user?.avatar!} />
            <Username>{data?.seePhoto?.user?.username}</Username>
          </PostHeader>
          <PostMain>
            <PostHeader>
              <Avatar src={data?.seePhoto?.user?.avatar!} />
              <Username>{data?.seePhoto?.user?.username}</Username>
            </PostHeader>
            <Caption>{data?.seePhoto?.caption}</Caption>
          </PostMain>
        </div>
      </PostContainer>
    </Background>
  );
};

export default Photo;
