import { Helmet } from "react-helmet-async";
import { gql, useMutation, useQuery } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as SolidHeart } from "@fortawesome/free-solid-svg-icons";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { SeePhotoLikesQuery, SeePhotoQuery } from "../generated/graphql";
import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { FatText } from "../components/shared";
import PostComment from "../components/feed/PostComment";
import PageTitle from "../components/PageTitle";
import { Comment_Fragment, Photo_Fragment, User_Fragment } from "../fragments";
import { useEffect, useState } from "react";

interface IParams {
  photoid: string;
}

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: gray;
  opacity: 0.5;
`;

const PostContainer = styled.div`
  display: flex;
  position: fixed;
  bottom: 5vh;
  left: 10vw;
  width: 80%;
  height: 90%;
  background-color: ${(props) => props.theme.bgColor};
`;

const PhotoImage = styled.img`
  position: relative;
  width: 60%;
  border-right: 1px solid black;
`;

const PostHeader = styled.div`
  display: flex;
  margin: 15px 10px;
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

const PostData = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const PostContent = styled.div`
  margin-left: 60px;
  margin-top: 20px;
`;

const Caption = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 20px;
`;

const Hashtag = styled.p`
  font-size: 18px;
  font-weight: 600;
`;

const PostComments = styled.div`
  position: relative;
  top: 120%;
`;

const Comment = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin-left: 10px;
`;

const PhotoActions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-left: 10px;
  div {
    display: flex;
    align-items: center;
  }
  svg {
    font-size: 20px;
  }
`;

const PhotoAction = styled.div`
  margin-right: 10px;
  cursor: pointer;
`;

const Likes = styled(FatText)`
  display: block;
  margin-top: 10px;
  margin-left: 10px;
  cursor: pointer;
`;

const Container = styled.div`
  position: fixed;
  top: 25vh;
  left: 30vw;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 40%;
  height: 50%;
  background-color: ${(props) => props.theme.bgColor};
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: 600;
  padding: 15px 0px;
`;

const Liker = styled.div`
  width: 100%;
  display: flex;
  padding: 5px 5px;
`;

const LAvatar = styled.img`
  height: 35px;
  width: 35px;
  background-color: #2c2c2c;
  margin-left: 10px;
  margin-right: 20px;
  border-radius: 50%;
`;

const Lname = styled.h3`
  font-size: 16px;
  font-weight: bold;
`;

const Lfollow = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: skyblue;
`;

const Photo_Query = gql`
  query seePhoto($id: Int!) {
    seePhoto(id: $id) {
      ...PhotoFragment
      user {
        username
        avatar
      }
      comments {
        ...CommentFragment
      }
      hashtags {
        id
        hashtag
      }
    }
  }
  ${Photo_Fragment}
  ${Comment_Fragment}
`;

const Toggle_Like_Mutation = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

const See_Photo_Likes_Query = gql`
  query seePhotoLikes($id: Int!) {
    seePhotoLikes(id: $id) {
      ...UserFragment
    }
  }
  ${User_Fragment}
`;

const Post = () => {
  const history = useHistory();
  const { photoid } = useParams<IParams>();
  const id = +photoid;
  const { data } = useQuery<SeePhotoQuery>(Photo_Query, {
    variables: {
      id,
    },
  });
  const likes = data?.seePhoto?.likes;
  const isLiked = data?.seePhoto?.isLiked;
  const updateToggleLike = (cache: any, result: any) => {
    const {
      data: {
        toggleLike: { ok },
      },
    } = result;
    if (ok) {
      const photoId = `Photo:${id}`;
      cache.modify({
        id: photoId,
        fields: {
          isLiked(prev: boolean) {
            return !prev;
          },
          likes(prev: number) {
            if (isLiked) {
              return prev - 1;
            }
            return prev + 1;
          },
        },
      });
    }
  };
  const [toggleLike, { loading }] = useMutation(Toggle_Like_Mutation, {
    variables: {
      id,
    },
    update: updateToggleLike,
  });
  const { data: likesData } = useQuery<SeePhotoLikesQuery>(
    See_Photo_Likes_Query,
    {
      variables: {
        id,
      },
    }
  );
  const [isLikes, setIsLikes] = useState<boolean>(false);
  const onLikesChange = () => {
    setIsLikes((prev) => !prev);
  };
  useEffect(() => {
    console.log("isLikes is ", isLikes);
  }, [isLikes]);
  const onBack = () => {
    setIsLikes(false);
    history.goBack();
  };
  return (
    <>
      <Background onClick={() => onBack()}>
        <Helmet>
          <title>Instagram</title>
        </Helmet>
      </Background>
      <PostContainer>
        <PhotoImage src={data?.seePhoto?.file} />
        <div>
          <PostHeader>
            <Avatar src={data?.seePhoto?.user?.avatar!} />
            <Username>{data?.seePhoto?.user?.username}</Username>
          </PostHeader>
          <PostData>
            <PostHeader>
              <Avatar src={data?.seePhoto?.user?.avatar!} />
              <Username>{data?.seePhoto?.user?.username}</Username>
            </PostHeader>
            <PostContent>
              <Caption>{data?.seePhoto?.caption}</Caption>
              {data?.seePhoto?.hashtags?.map((hashtag) => (
                <Hashtag key={hashtag?.id}>{hashtag?.hashtag}</Hashtag>
              ))}
            </PostContent>
            <PostComments>
              {data?.seePhoto?.comments?.map((comment) => (
                <PostHeader key={comment?.id}>
                  <Avatar src={comment?.user?.avatar!} />
                  <Username>{comment?.user?.username} </Username>
                  <Comment>{comment?.payload}</Comment>
                </PostHeader>
              ))}
            </PostComments>
            <div style={{ position: "absolute", bottom: "10%" }}>
              <PhotoActions>
                <div>
                  <PhotoAction onClick={() => toggleLike()}>
                    <FontAwesomeIcon
                      style={{ color: isLiked ? "tomato" : "inherit" }}
                      icon={isLiked ? SolidHeart : faHeart}
                    />
                  </PhotoAction>
                  <PhotoAction>
                    <FontAwesomeIcon size={"2x"} icon={faComment} />
                  </PhotoAction>
                  <PhotoAction>
                    <FontAwesomeIcon size={"2x"} icon={faPaperPlane} />
                  </PhotoAction>
                </div>
                <div>
                  <FontAwesomeIcon size={"2x"} icon={faBookmark} />
                </div>
              </PhotoActions>
              <Likes onClick={() => onLikesChange()}>
                {likes === 1 ? "1 like" : `${likes} likes`}
              </Likes>
            </div>
            <PostComment photoId={id} />
          </PostData>
        </div>
      </PostContainer>
      {isLikes && (
        <Container>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Title>팔로워</Title>
          </div>
          {likesData?.seePhotoLikes?.map((like) => (
            <Liker key={like?.id}>
              <LAvatar src={like?.avatar!} />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "3px",
                }}
              >
                <Lname>{like?.username}</Lname>
                <Lname>
                  {like?.firstName} {like?.lastName}
                </Lname>
              </div>
              {!like?.isFollowing ? <Lfollow> * 팔로우</Lfollow> : null}
            </Liker>
          ))}
        </Container>
      )}
    </>
  );
};

export default Post;
