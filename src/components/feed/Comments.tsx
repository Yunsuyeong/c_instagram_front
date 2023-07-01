import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { CreateCommentMutation } from "../../generated/graphql";
import useUser from "../../hooks/useUser";
import { FatText } from "../shared";
import Comment from "./Comment";
import { useHistory } from "react-router-dom";

export interface ICommentForm {
  payload: string;
}

interface ICommentsProps {
  author?: string;
  caption?: string | null;
  commentNumber?: number;
  comments?: any;
  photoId?: number;
}

const CommentsContainer = styled.div`
  margin-top: 20px;
`;

const CommentCount = styled.span`
  opacity: 0.7;
  margin: 10px 0px;
  display: block;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
`;

const PostCommentContainer = styled.div`
  margin-top: 10px;
  padding-top: 15px;
  padding-bottom: 10px;
  border-top: 1px solid ${(props) => props.theme.borderColor};
`;

const PostCommentInput = styled.input`
  width: 100%;
  &::placeholder {
    font-size: 12px;
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

const Comments = ({
  author,
  caption,
  commentNumber,
  comments,
  photoId,
}: ICommentsProps) => {
  const history = useHistory();
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
        id: `Photo:${photoId}`,
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
  const [createComment, { loading }] = useMutation<CreateCommentMutation>(
    Create_Comment_Mutation,
    {
      update: createCommentUpdate,
    }
  );
  const onValid = (form: ICommentForm) => {
    const { payload } = form;
    if (loading) {
      return;
    }
    createComment({
      variables: {
        photoId,
        payload,
      },
    });
  };
  return (
    <CommentsContainer>
      <Comment author={author} payload={caption} />
      <CommentCount onClick={() => history.push(`/p/${photoId}`)}>
        {commentNumber === 1 ? "1 comment" : `${commentNumber} comments`} 모두
        보기
      </CommentCount>
      {comments?.map((comment: any) => (
        <Comment
          key={comment.id}
          id={comment.id}
          photoId={photoId}
          author={comment?.user?.username}
          payload={comment?.payload}
          isMine={comment?.isMine}
        />
      ))}
      <PostCommentContainer>
        <form onSubmit={handleSubmit(onValid)}>
          <PostCommentInput
            {...register("payload", { required: true })}
            type="text"
            placeholder="Write a comment"
          />
        </form>
      </PostCommentContainer>
    </CommentsContainer>
  );
};

export default Comments;
