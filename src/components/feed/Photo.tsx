import { gql, useMutation } from "@apollo/client";
import {
  faBookmark,
  faComment,
  faPaperPlane,
  faHeart,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as SolidHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../Avatar";
import { FatText } from "../shared";
import Comments from "./Comments";

interface Icomments {
  id?: number;
  user?: {
    username?: string;
    avatar?: string | null;
  };
  payload?: string;
  isMine?: boolean;
  createdAt?: string;
}

interface IPhotoProps {
  id?: number;
  user?: {
    username?: string;
    avatar?: string | null;
  };
  file?: string;
  isLiked?: boolean;
  likes?: number;
  caption?: string | null;
  commentNumber?: number;
  comments?: any;
}

const PhotoContainer = styled.div`
  max-width: 615px;
  background-color: #66e0ff;
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 20px;
`;

const PhotoHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 15px;
`;

const Username = styled(FatText)`
  margin-left: 15px;
`;

const PhotoFile = styled.img`
  min-width: 100%;
  max-width: 40vw;
  height: 50%;
`;

const PhotoData = styled.div`
  padding: 15px;
`;

const PhotoActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
`;

const Toggle_Like_Mutation = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

const Photo = ({
  id,
  user,
  file,
  isLiked,
  likes,
  caption,
  commentNumber,
  comments,
}: IPhotoProps) => {
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
      /* const fragment = gql`
        fragment BSName on Photo {
          isLiked
          likes
        }
      `;
      const result = cache.readFragment({
        id: fragmentId,
        fragment: fragment,
      });
      if ("isLiked" in result && "likes" in result) {
        const { isLiked, likes } = result;
        cache.writeFragment({
          id: fragmentId,
          fragment: fragment,
          data: {
            isLiked: !isLiked,
            likes: isLiked ? likes - 1 : likes + 1,
          },
        });
      } */
    }
  };
  const [toggleLike, { loading }] = useMutation(Toggle_Like_Mutation, {
    variables: {
      id,
    },
    update: updateToggleLike,
  });
  return (
    <PhotoContainer key={id}>
      <PhotoHeader>
        <Link to={`/${user?.username}`}>
          <Avatar lg url={user?.avatar} />
        </Link>
        <Link to={`/${user?.username}`}>
          <Username>{user?.username}</Username>
        </Link>
      </PhotoHeader>
      <PhotoFile src={file} />
      <PhotoData>
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
        <Comments
          author={user?.username}
          caption={caption}
          comments={comments}
          commentNumber={commentNumber}
          photoId={id}
        />
      </PhotoData>
    </PhotoContainer>
  );
};

export default Photo;
