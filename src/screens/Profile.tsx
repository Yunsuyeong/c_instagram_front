import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/auth/Button";
import PageTitle from "../components/PageTitle";
import { FatText } from "../components/shared";
import { Photo_Fragment } from "../fragments";
import {
  FollowUserMutation,
  SeeFollowersQuery,
  SeeFollowingQuery,
  SeeProfileQuery,
  UnfollowUserMutation,
} from "../generated/graphql";
import useUser from "../hooks/useUser";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ProfileParams {
  username: string;
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
  font-size: 16px;
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

const ProfileButton = styled(Button).attrs({
  as: "span",
})`
  margin-top: 0px;
  margin-left: 10px;
`;

const FollowersBg = styled(motion.div)`
  width: 100vw;
  height: 90vh;
  display: flex;
  justify-content: center;
  background-color: gray;
  opacity: 0.5;
`;

const BackHeader = styled.div`
  display: flex;
  margin-top: 12px;
`;

const Container = styled.div`
  position: fixed;
  top: 10vw;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 40%;
  height: 50%;
  background-color: white;
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: 600;
  padding: 15px 0px;
`;

const Follower = styled.div`
  width: 100%;
  display: flex;
  padding: 5px 5px;
`;

const FAvatar = styled.img`
  height: 35px;
  width: 35px;
  background-color: #2c2c2c;
  margin-left: 10px;
  margin-right: 20px;
  border-radius: 50%;
`;

const Fname = styled.h3`
  font-size: 16px;
  font-weight: bold;
`;

const Ffollow = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: skyblue;
`;

const Fbutton = styled.button`
  position: relative;
  left: 100%;
  border: none;
  background-color: lightgray;
  text-align: center;
  border-radius: 10px;
  font-weight: 600;
  padding: 10px 5px;
  cursor: pointer;
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

const Follow_User_Mutation = gql`
  mutation followUser($username: String!) {
    followUser(username: $username) {
      ok
    }
  }
`;

const Unfollow_User_Mutation = gql`
  mutation unfollowUser($username: String!) {
    unfollowUser(username: $username) {
      ok
    }
  }
`;

const See_Followers_Query = gql`
  query seeFollowers($username: String!, $page: Int!) {
    seeFollowers(username: $username, page: $page) {
      ok
      followers {
        id
        username
        firstName
        lastName
        bio
        isFollowing
        avatar
      }
      totalPages
    }
  }
`;

const See_Following_Query = gql`
  query seeFollowing($username: String!) {
    seeFollowing(username: $username) {
      ok
      following {
        id
        username
        firstName
        lastName
        bio
        isFollowing
        avatar
      }
    }
  }
`;

const Profile = () => {
  const history = useHistory();
  const client = useApolloClient();
  const { username } = useParams<ProfileParams>();
  const { data: userData } = useUser();
  const { data, loading } = useQuery<SeeProfileQuery>(See_Profile_Query, {
    variables: {
      username,
    },
  });
  const updateUnfollowUser = (cache: any, result: any) => {
    const {
      data: {
        unfollowUser: { ok },
      },
    } = result;
    if (!ok) {
      return;
    }
    cache.modify({
      id: `User:${username}`,
      fields: {
        isFollowing(prev: boolean) {
          return false;
        },
        totalFollowers(prev: number) {
          return prev - 1;
        },
      },
    });
    const Username = userData?.me?.username;
    cache.modify({
      id: `User:${Username}`,
      fields: {
        totalFollowing(prev: number) {
          return prev - 1;
        },
      },
    });
  };
  const onCompleted = (data: FollowUserMutation) => {
    const {
      followUser: { ok },
    } = data;
    if (!ok) {
      return;
    }
    const { cache } = client;
    cache.modify({
      id: `User:${username}`,
      fields: {
        isFollowing(prev: boolean) {
          return true;
        },
        totalFollowers(prev: number) {
          return prev + 1;
        },
      },
    });
    const Username = userData?.me?.username;
    cache.modify({
      id: `User:${Username}`,
      fields: {
        totalFollowing(prev: number) {
          return prev + 1;
        },
      },
    });
  };
  const [unfollowUser] = useMutation<UnfollowUserMutation>(
    Unfollow_User_Mutation,
    {
      variables: {
        username,
      },
      update: updateUnfollowUser,
    }
  );
  const [followUser] = useMutation<FollowUserMutation>(Follow_User_Mutation, {
    variables: {
      username,
    },
    onCompleted,
  });
  const [isFollowers, setIsFollowers] = useState<boolean>(false);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const onFollowerChange = () => {
    setIsFollowers(true);
    history.push(`/${userData?.me?.username}/followers`);
  };
  const onFollowingChange = () => {
    setIsFollowing(true);
    history.push(`/${userData?.me?.username}/following`);
  };
  const onBack = () => {
    setIsFollowers(false);
    setIsFollowing(false);
    history.push(`/${userData?.me?.username}`);
  };
  useEffect(() => {
    console.log("isFollowers is ", isFollowers);
  }, [isFollowers]);
  const { data: followersData } = useQuery<SeeFollowersQuery>(
    See_Followers_Query,
    {
      variables: {
        username,
        page: 1,
      },
    }
  );
  const { data: followingData } = useQuery<SeeFollowingQuery>(
    See_Following_Query,
    {
      variables: {
        username,
      },
    }
  );
  return (
    <div>
      <PageTitle
        title={
          loading ? "Loading..." : `${data?.seeProfile?.username}'s profile`
        }
      ></PageTitle>
      {isFollowers ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FollowersBg onClick={() => onBack()}>
            <BackHeader>
              <Avatar src={data?.seeProfile?.avatar!} />
              <Column>
                <Row>
                  <Username>{data?.seeProfile?.username}</Username>
                  {data?.seeProfile?.isMe ? (
                    <ProfileButton
                      onClick={() =>
                        history.push(
                          `/accounts/edit/${data?.seeProfile?.username}`
                        )
                      }
                    >
                      Edit Profile
                    </ProfileButton>
                  ) : data?.seeProfile?.isFollowing ? (
                    <ProfileButton onClick={() => unfollowUser()}>
                      Unfollow
                    </ProfileButton>
                  ) : (
                    <ProfileButton onClick={() => followUser()}>
                      Follow
                    </ProfileButton>
                  )}
                </Row>
                <Row>
                  <List>
                    <Item>
                      <span>
                        <Value>{data?.seeProfile?.photos?.length}</Value> 게시물
                      </span>
                    </Item>
                    <Item>
                      <span style={{ cursor: "pointer" }}>
                        <Value>{data?.seeProfile?.totalFollowers}</Value>{" "}
                        followers
                      </span>
                    </Item>
                    <Item>
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          history.push(`/${userData?.me?.username}/following`)
                        }
                      >
                        <Value>{data?.seeProfile?.totalFollowing}</Value>{" "}
                        following
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
            </BackHeader>
          </FollowersBg>
          <Container>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Title>팔로워</Title>
            </div>
            {followersData?.seeFollowers?.followers?.map((follower) => (
              <Follower key={follower?.id}>
                <FAvatar src={follower?.avatar!} />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "3px",
                  }}
                >
                  <Fname>{follower?.username}</Fname>
                  <Fname>
                    {follower?.firstName} {follower?.lastName}
                  </Fname>
                </div>
                {!follower?.isFollowing ? <Ffollow> * 팔로우</Ffollow> : null}
              </Follower>
            ))}
          </Container>
        </div>
      ) : isFollowing ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FollowersBg onClick={() => onBack()}>
            <BackHeader>
              <Avatar src={data?.seeProfile?.avatar!} />
              <Column>
                <Row>
                  <Username>{data?.seeProfile?.username}</Username>
                  {data?.seeProfile?.isMe ? (
                    <ProfileButton
                      onClick={() =>
                        history.push(
                          `/accounts/edit/${data?.seeProfile?.username}`
                        )
                      }
                    >
                      Edit Profile
                    </ProfileButton>
                  ) : data?.seeProfile?.isFollowing ? (
                    <ProfileButton onClick={() => unfollowUser()}>
                      Unfollow
                    </ProfileButton>
                  ) : (
                    <ProfileButton onClick={() => followUser()}>
                      Follow
                    </ProfileButton>
                  )}
                </Row>
                <Row>
                  <List>
                    <Item>
                      <span>
                        <Value>{data?.seeProfile?.photos?.length}</Value> 게시물
                      </span>
                    </Item>
                    <Item>
                      <span style={{ cursor: "pointer" }}>
                        <Value>{data?.seeProfile?.totalFollowers}</Value>{" "}
                        followers
                      </span>
                    </Item>
                    <Item>
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          history.push(`/${userData?.me?.username}/following`)
                        }
                      >
                        <Value>{data?.seeProfile?.totalFollowing}</Value>{" "}
                        following
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
            </BackHeader>
          </FollowersBg>
          <Container>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Title>팔로잉</Title>
            </div>
            {followingData?.seeFollowing?.following?.map((following) => (
              <Follower key={following?.id}>
                <FAvatar src={following?.avatar!} />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "50px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "3px",
                    }}
                  >
                    <Fname>{following?.username}</Fname>
                    <Fname>
                      {following?.firstName} {following?.lastName}
                    </Fname>
                  </div>
                  {!following?.isFollowing ? (
                    <Ffollow> * 팔로우</Ffollow>
                  ) : (
                    <Fbutton onClick={() => unfollowUser()}>
                      팔로우 취소
                    </Fbutton>
                  )}
                </div>
              </Follower>
            ))}
          </Container>
        </div>
      ) : (
        <>
          <Header>
            <Avatar src={data?.seeProfile?.avatar!} />
            <Column>
              <Row>
                <Username>{data?.seeProfile?.username}</Username>
                {data?.seeProfile?.isMe ? (
                  <ProfileButton
                    onClick={() =>
                      history.push(
                        `/accounts/edit/${data?.seeProfile?.username}`
                      )
                    }
                  >
                    Edit Profile
                  </ProfileButton>
                ) : data?.seeProfile?.isFollowing ? (
                  <ProfileButton onClick={() => unfollowUser()}>
                    Unfollow
                  </ProfileButton>
                ) : (
                  <ProfileButton onClick={() => followUser()}>
                    Follow
                  </ProfileButton>
                )}
              </Row>
              <Row>
                <List>
                  <Item>
                    <span>
                      <Value>{data?.seeProfile?.photos?.length}</Value> 게시물
                    </span>
                  </Item>
                  <Item>
                    <span
                      onClick={() => onFollowerChange()}
                      style={{ cursor: "pointer" }}
                    >
                      <Value>{data?.seeProfile?.totalFollowers}</Value>{" "}
                      followers
                    </span>
                  </Item>
                  <Item>
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => onFollowingChange()}
                    >
                      <Value>{data?.seeProfile?.totalFollowing}</Value>{" "}
                      following
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
        </>
      )}
    </div>
  );
};

export default Profile;

function seeProfile(seeProfile: any): import("react").ReactNode {
  throw new Error("Function not implemented.");
}
