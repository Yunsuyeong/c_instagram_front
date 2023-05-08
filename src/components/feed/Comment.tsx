import styled from "styled-components";
import { FatText } from "../shared";

interface IcommentProps {
  author?: string;
  payload?: string | null;
}

const CommentContainer = styled.div``;
const CommentCaption = styled.span`
  margin-left: 10px;
`;

const Comment = ({ author, payload }: IcommentProps) => {
  return (
    <CommentContainer>
      <FatText>{author}</FatText>
      <CommentCaption>{payload}</CommentCaption>
    </CommentContainer>
  );
};

export default Comment;
