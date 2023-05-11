import React from "react";
import styled from "styled-components";
import { FatText } from "../shared";
import saniziteHtml from "sanitize-html";
import { Link } from "react-router-dom";

interface IcommentProps {
  author?: string;
  payload?: string | null;
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

const Comment = ({ author, payload }: IcommentProps) => {
  /* const cleanPayload = saniziteHtml(
    payload?.replace(/#[\w]+/g, "<mark>$&</mark>") || "",
    {
      allowedTags: ["mark"],
    }
  ); */
  return (
    <CommentContainer>
      <FatText>{author}</FatText>
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
    </CommentContainer>
  );
};

export default Comment;
