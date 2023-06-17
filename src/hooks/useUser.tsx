import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { isLoggedInVar, logUserOut } from "../apollo";
import { MeQuery } from "../generated/graphql";

export const Me_Query = gql`
  query me {
    me {
      id
      username
      email
      bio
      avatar
      totalFollowing
      totalFollowers
    }
  }
`;

const useUser = () => {
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data } = useQuery<MeQuery>(Me_Query, {
    skip: !hasToken,
  });
  useEffect(() => {
    if (data?.me === null) {
      logUserOut();
    }
  }, [data]);
  return { data };
};

export default useUser;
