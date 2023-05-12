import { gql, useQuery } from "@apollo/client";
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/auth/Button";
import PageTitle from "../components/PageTitle";
import { FatText } from "../components/shared";
import { Photo_Fragment } from "../fragments";
import { SeeProfileQuery } from "../generated/graphql";

interface ProfileParams {
  username: string;
}

interface ProfileProps {
  isMe?: boolean;
  isFollowing?: boolean;
}

const Header = styled.div`
  display: flex;
  margin-top: 12px;
`;

const Avatar = styled.img`
  height: 160px;
  width: 160px;
  background-color: #2c2c2c;
  margin-left: 50px;
  margin-right: 150px;
  border-radius: 50%;
`;

const Column = styled.div``;

const Row = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  margin-bottom: 20px;
`;

const Username = styled.h3`
  font-size: 28px;
  font-weight: 400;
`;

const List = styled.ul`
  display: flex;
`;

const Item = styled.li`
  margin-right: 20px;
`;

const Value = styled(FatText)`
  font-size: 18px;
`;

const Name = styled(FatText)`
  font-size: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-auto-rows: 440px;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 50px;
`;

const Photo = styled.div<{ bg?: string }>`
  position: relative;
  background-image: url(${(props) => props.bg});
  background-size: cover;
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

const ProfileButton = styled(Button).attrs({
  as: "span",
})`
  margin-top: 0px;
  margin-left: 10px;
`;

const See_Profile_Query = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      id
      firstName
      lastName
      username
      bio
      avatar
      photos {
        ...PhotoFragment
      }
      totalFollowing
      totalFollowers
      isMe
      isFollowing
    }
  }
  ${Photo_Fragment}
`;

const Profile = () => {
  const { username } = useParams<ProfileParams>();
  const { data, loading } = useQuery<SeeProfileQuery>(See_Profile_Query, {
    variables: {
      username,
    },
  });
  return (
    <div>
      <PageTitle
        title={
          loading ? "Loading..." : `${data?.seeProfile?.username}'s profile`
        }
      ></PageTitle>
      <Header>
        <Avatar src={data?.seeProfile?.avatar!} />
        <Column>
          <Row>
            <Username>{data?.seeProfile?.username}</Username>
            {data?.seeProfile?.isMe ? (
              <ProfileButton>Edit Profile</ProfileButton>
            ) : data?.seeProfile?.isFollowing ? (
              <ProfileButton>Unfollow</ProfileButton>
            ) : (
              <ProfileButton>Follow</ProfileButton>
            )}
          </Row>
          <Row>
            <List>
              <Item>
                <span>
                  <Value>{data?.seeProfile?.totalFollowers}</Value> followers
                </span>
              </Item>
              <Item>
                <span>
                  <Value>{data?.seeProfile?.totalFollowing}</Value> following
                </span>
              </Item>
            </List>
          </Row>
          <Row>
            <Name>
              {data?.seeProfile?.firstName} {data?.seeProfile?.lastName}
            </Name>
          </Row>
          <Row>{data?.seeProfile?.bio}</Row>
        </Column>
      </Header>
      <Grid>
        {data?.seeProfile?.photos?.map((photo) => (
          <Photo key={photo?.id} bg={photo?.file}>
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
    </div>
  );
};

export default Profile;
function seeProfile(seeProfile: any): import("react").ReactNode {
  throw new Error("Function not implemented.");
}
