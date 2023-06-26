import { Helmet } from "react-helmet-async";
import { gql, useMutation, useQuery } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as SolidHeart } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { CreateCommentMutation, SeePhotoQuery } from "../generated/graphql";
import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { FatText } from "../components/shared";
import Comments, { ICommentForm } from "../components/feed/Comments";
import { useForm } from "react-hook-form";
import useUser from "../hooks/useUser";
import PostComment from "../components/feed/PostComment";
import PageTitle from "../components/PageTitle";

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
`;

const PostCommentContainer = styled.div`
  margin-top: 10px;
  padding-top: 15px;
  padding-bottom: 10px;
`;

const PostCommentInput = styled.input`
  width: 100%;
  &::placeholder {
    font-size: 12px;
  }
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
        id
        payload
        createdAt
      }
      hashtags {
        id
        hashtag
      }
      createdAt
      isLiked
    }
  }
`;

const Create_Comment_Mutation = gql`
  mutation createComment($photoId: Int!, $payload: String!) {
    createComment(photoId: $photoId, payload: $payload) {
      ok
      error
      id
    }
  }
`;

const Toggle_Like_Mutation = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

const Post = () => {
  const { photoid } = useParams<IParams>();
  const id = +photoid;
  const { data: userData } = useUser();
  const { register, handleSubmit, setValue, getValues } =
    useForm<ICommentForm>();
  const createCommentUpdate = (cache: any, result: any) => {
    const { payload } = getValues();
    setValue("payload", "");
    const {
      data: {
        createComment: { ok, id },
      },
    } = result;
    if (ok && userData?.me) {
      const newComment = {
        __typename: "Comment",
        createdAt: Date.now(),
        id,
        isMine: true,
        payload,
        user: {
          ...userData.me,
        },
      };
      const newCacheComment = cache.writeFragment({
        fragment: gql`
          fragment BSName on Comment {
            id
            createdAt
            isMine
            payload
            user {
              username
              avatar
            }
          }
        `,
        data: newComment,
      });
      cache.modify({
        id: `Photo:${id}`,
        fields: {
          comments(prev: any) {
            return [...prev, newCacheComment];
          },
          commentNumber(prev: number) {
            return prev + 1;
          },
        },
      });
    }
  };
  const [createComment, { loading: createLoading }] =
    useMutation<CreateCommentMutation>(Create_Comment_Mutation, {
      update: createCommentUpdate,
    });
  const onValid = (form: ICommentForm) => {
    const { payload } = form;
    if (createLoading) {
      return;
    }
    createComment({
      variables: {
        id,
        payload,
      },
    });
  };
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
  return (
    <Background>
      <Helmet>
        <title>Instagram</title>
      </Helmet>
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
              <Likes>{likes === 1 ? "1 like" : `${likes} likes`}</Likes>
            </div>
            <PostComment photoId={id} />
          </PostData>
        </div>
      </PostContainer>
    </Background>
  );
};

export default Post;
