import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faCompass, faHome } from "@fortawesome/free-solid-svg-icons";
import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { darkModeOff, darkModeOn, darkModeVar, isLoggedInVar } from "../apollo";
import { Link, useHistory } from "react-router-dom";
import routes from "../routes";
import useUser from "../hooks/useUser";
import Avatar from "./Avatar";
import {
  faMoon,
  faPaperPlane,
  faSquarePlus,
  faSun,
  faTimesCircle,
} from "@fortawesome/free-regular-svg-icons";
import { motion, useAnimation } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Photo_Fragment, User_Fragment } from "../fragments";
import { SearchPhotosQuery, SearchUsersQuery } from "../generated/graphql";

interface ISearchForm {
  keyword: string;
}

const SHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.bgColor};
  padding: 18px 0px;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Column = styled.div``;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Icon = styled.span`
  margin-left: 15px;
  cursor: pointer;
`;

const Button = styled.span`
  color: white;
  background-color: ${(props) => props.theme.accent};
  font-weight: 600;
  border-radius: 4px;
  padding: 5px 15px;
`;

const Search = styled.form`
  color: white;
  display: flex;
  align-items: center;
  position: relative;
  svg {
    height: 25px;
    cursor: pointer;
  }
`;

const SearchInput = styled(motion.input)`
  transform-origin: left center;
  position: absolute;
  left: 0px;
  padding: 5px 10px;
  padding-left: 40px;
  z-index: 1;
  color: ${(props) => props.theme.fontColor};
  font-size: 16px;
`;

const ResultContainer = styled(motion.div)`
  width: 20vw;
  height: 40px;
  display: flex;
  border: 1px solid ${(props) => props.theme.borderColor};
`;

const Result = styled.div`
  display: flex;
  padding: 10px 5px;
  cursor: pointer;
`;

const UserAvatar = styled.img`
  height: 20px;
  width: 20px;
  background-color: #2c2c2c;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 50%;
`;

const Hashtags = styled.div`
  display: flex;
  align-items: center;
`;

const Username = styled.h3`
  font-size: 16px;
  font-weight: 600;
`;

const Footer = styled.div``;

const DarkModeBtn = styled.span`
  cursor: pointer;
`;

export const Search_Users_Query = gql`
  query searchUsers($keyword: String!) {
    searchUsers(keyword: $keyword) {
      ...UserFragment
      following {
        id
        username
        avatar
        isFollowing
      }
      followers {
        id
        username
        avatar
        isFollowing
      }
    }
  }
  ${User_Fragment}
`;

export const Search_Photos_Query = gql`
  query searchPhotos($keyword: String!) {
    searchPhotos(keyword: $keyword) {
      ...PhotoFragment
    }
  }
  ${Photo_Fragment}
`;

const Header = () => {
  const history = useHistory();
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data } = useUser();
  const { register, handleSubmit, setFocus, setValue, watch } =
    useForm<ISearchForm>({
      defaultValues: {
        keyword: "",
      },
    });
  const [searchOpen, setSearchOpen] = useState(false);
  const inputAnimation = useAnimation();
  const toggleSearch = () => {
    if (searchOpen) {
      inputAnimation.start({
        scaleX: 0,
        x: 185,
      });
    } else {
      inputAnimation.start({
        scaleX: 1,
        x: -20,
      });
    }
    setSearchOpen((prev) => !prev);
    setFocus("keyword");
  };
  const Keyword = watch("keyword");
  const { data: userData, loading } = useQuery<SearchUsersQuery>(
    Search_Users_Query,
    {
      variables: {
        keyword: Keyword,
      },
    }
  );
  let array = userData?.searchUsers;
  if (Keyword === "") {
    array = [];
  }
  const onUserClick = (username: string) => {
    history.push(`/${username}`);
    setValue("keyword", "");
  };
  const onValid = ({ keyword }: ISearchForm) => {
    console.log(keyword);
  };
  const { data: photoData, loading: photoLoading } =
    useQuery<SearchPhotosQuery>(Search_Photos_Query, {
      variables: {
        keyword: Keyword,
      },
    });
  let array2 = photoData?.searchPhotos;
  if (Keyword === "") {
    array2 = [];
  }
  const darkmode = useReactiveVar(darkModeVar);
  return (
    <SHeader>
      <Wrapper>
        <Column>
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </Column>
        <Column>
          {isLoggedIn ? (
            <IconsContainer>
              <Icon onClick={() => history.push("/")}>
                <FontAwesomeIcon icon={faHome} size="lg" />
              </Icon>
              <Icon onClick={() => history.push("/upload")}>
                <FontAwesomeIcon icon={faSquarePlus} size="lg" />
              </Icon>
              <Icon onClick={() => history.push("/direct")}>
                <FontAwesomeIcon icon={faPaperPlane} size="lg" />
              </Icon>
              <Icon>
                <FontAwesomeIcon icon={faCompass} size="lg" />
              </Icon>
              <Icon>
                <Link to={`/${data?.me?.username}`}>
                  <Avatar url={data?.me?.avatar} />
                </Link>
              </Icon>
              <Search onSubmit={handleSubmit(onValid)}>
                <motion.svg
                  onClick={toggleSearch}
                  animate={{ x: searchOpen ? 185 : 0 }}
                  fill={darkmode ? "white" : "black"}
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </motion.svg>
                <SearchInput
                  type="text"
                  {...register("keyword", { required: true })}
                  initial={{ scaleX: 0 }}
                  transition={{ type: "linear" }}
                  animate={inputAnimation}
                  placeholder="검색"
                />
              </Search>
            </IconsContainer>
          ) : (
            <Link to={routes.home}>
              <Button>Login</Button>
            </Link>
          )}
        </Column>
        <Column>
          {userData && Keyword.indexOf("#") !== 0 ? (
            loading ? (
              <Icon>
                <FontAwesomeIcon icon={faTimesCircle} />
              </Icon>
            ) : (
              <ResultContainer>
                {array?.map((user) => (
                  <Result
                    onClick={() => onUserClick(user?.username!)}
                    key={user?.id}
                  >
                    <UserAvatar src={user?.avatar!} />
                    <Username>{user?.username}</Username>
                  </Result>
                ))}
              </ResultContainer>
            )
          ) : photoData && Keyword.indexOf("#") === 0 ? (
            <ResultContainer>
              {array2?.map((photo) => (
                <Result key={photo?.id}>
                  <UserAvatar src={photo?.file} />
                  <Hashtags>
                    {photo?.hashtags?.map((hashtag) => (
                      <Username
                        onClick={() =>
                          history.push(
                            `/hashtags/${hashtag?.hashtag.substring(1)}`
                          )
                        }
                        key={hashtag?.id}
                      >
                        {hashtag?.hashtag}
                      </Username>
                    ))}
                  </Hashtags>
                </Result>
              ))}
            </ResultContainer>
          ) : (
            <ResultContainer></ResultContainer>
          )}
        </Column>
      </Wrapper>
      <Footer>
        <DarkModeBtn onClick={darkmode ? darkModeOff : darkModeOn}>
          <FontAwesomeIcon icon={darkmode ? faSun : faMoon} />
        </DarkModeBtn>
      </Footer>
    </SHeader>
  );
};

export default Header;
