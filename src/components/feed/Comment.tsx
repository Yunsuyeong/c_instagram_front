import React from "react";
import styled from "styled-components";
import { FatText } from "../shared";
import saniziteHtml from "sanitize-html";
import { Link } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { DeleteCommentMutation } from "../../generated/graphql";

interface IcommentProps {
  id?: number | null;
  photoId?: number | null;
  author?: string;
  payload?: string | null;
  isMine?: boolean | null;
}

const CommentContainer = styled.div``;
const CommentCaption = styled.span`
  margin-left: 10px;
  a {
    background-color: inherit;
    color: ${(props) => props.theme.accent};
    cursor: pointer;
    &:hover {
      font-weight: bold;
      text-decoration: underline;
    }
  }
`;

const Delete_Comment_Mutation = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      ok
    }
  }
`;

const Comment = ({ id, photoId, author, payload, isMine }: IcommentProps) => {
  const deleteCommentUpdate = (cache: any, result: any) => {
    const {
      data: {
        deleteComment: { ok },
      },
    } = result;
    if (ok) {
      cache.evict({ id: `Comment:${id}` });
      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          commentNumber(prev: number) {
            return prev - 1;
          },
        },
      });
    }
  };
  const [deleteComment] = useMutation<DeleteCommentMutation>(
    Delete_Comment_Mutation,
    {
      variables: {
        id,
      },
      update: deleteCommentUpdate,
    }
  );
  const onDeleteClick = () => {
    deleteComment();
  };
  /* const cleanPayload = saniziteHtml(
    payload?.replace(/#[\w]+/g, "<mark>$&</mark>") || "",
    {
      allowedTags: ["mark"],
    }
  ); */
  return (
    <CommentContainer>
      <Link to={`/users/${author}`}>
        <FatText>{author}</FatText>
      </Link>
      <CommentCaption>
        {payload?.split(" ").map((word, index) => (
          <React.Fragment key={index}>
            {/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w-]+/g.test(word) ? (
              <Link to={`/hashtags/${word}`}>{word}</Link>
            ) : /@[\w-]+/.test(word) ? (
              <Link to={`/user/${word}`}>{word}</Link>
            ) : (
              word
            )}{" "}
          </React.Fragment>
        ))}
      </CommentCaption>
      {isMine ? <button onClick={onDeleteClick}>X</button> : null}
    </CommentContainer>
  );
};

export default Comment;
