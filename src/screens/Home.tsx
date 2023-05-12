import { gql, useQuery } from "@apollo/client";
import Photo from "../components/feed/Photo";
import PageTitle from "../components/PageTitle";
import { Comment_Fragment, Photo_Fragment } from "../fragments";
import { SeeFeedQuery } from "../generated/graphql";

const Feed_Query = gql`
  query seeFeed {
    seeFeed {
      ...PhotoFragment
      user {
        username
        avatar
      }
      caption
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
    }
  }
  ${Photo_Fragment}
  ${Comment_Fragment}
`;

const Home = () => {
  const { data } = useQuery<SeeFeedQuery>(Feed_Query);
  return (
    <div>
      <PageTitle title="Home" />
      {data?.seeFeed?.map((photo) => (
        <Photo key={photo?.id} {...photo} />
      ))}
    </div>
  );
};
export default Home;
