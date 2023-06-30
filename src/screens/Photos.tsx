import { gql, useQuery } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { Search_Photos_Query } from "../components/Header";
import PageTitle from "../components/PageTitle";
import { SearchPhotosQuery } from "../generated/graphql";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";

interface IParams {
  keyword: string;
}

const Container = styled.div`
  width: 50vw;
  height: 100%;
`;

const TagsHeader = styled.div`
  display: flex;
  margin: 30px 15px;
`;

const Avatar = styled.img`
  height: 120px;
  width: 120px;
  background-color: #2c2c2c;
  margin-right: 20px;
  border-radius: 50%;
`;

const Tag = styled.h3`
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const PostNum = styled.p`
  font-size: 16px;
  font-weight: 400;
`;

const Grid = styled.div`
  display: grid;
  grid-auto-rows: 250px;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 50px;
`;

const Photo = styled.div<{ bg?: string }>`
  position: relative;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  cursor: pointer;
`;

const Icons = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;

const Icon = styled.span`
  display: flex;
  align-items: center;
  font-size: 18px;
  margin: 0px 5px;
  svg {
    font-size: 14px;
    margin-right: 5px;
  }
`;

const Photos = () => {
  const history = useHistory();
  const { keyword } = useParams<IParams>();
  const Keyword = "#".concat(keyword);
  const { data: photoData, loading: photoLoading } =
    useQuery<SearchPhotosQuery>(Search_Photos_Query, {
      variables: {
        keyword: Keyword,
      },
    });
  const first = photoData?.searchPhotos?.at(0);
  return (
    <div>
      <PageTitle title={`${keyword} Instagram 콘텐츠`} />
      <Container>
        <TagsHeader>
          <Avatar src={first?.file} />
          <div>
            <Tag>{Keyword}</Tag>
            <PostNum>게시물</PostNum>
            <PostNum>{photoData?.searchPhotos?.length}</PostNum>
          </div>
        </TagsHeader>
        <p>관련 게시물</p>
        <Grid>
          {photoData?.searchPhotos?.map((photo) => (
            <Photo
              onClick={() => history.push(`/p/${photo?.id}`)}
              key={photo?.id}
              bg={photo?.file}
            >
              <Icons>
                <Icon>
                  <FontAwesomeIcon icon={faHeart} />
                  {photo?.likes}
                </Icon>
                <Icon>
                  <FontAwesomeIcon icon={faComment} />
                  {photo?.commentNumber}
                </Icon>
              </Icons>
            </Photo>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Photos;
