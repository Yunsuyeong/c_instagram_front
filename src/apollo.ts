import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { offsetLimitPagination } from "@apollo/client/utilities";

const TOKEN = "TOKEN";
const DARKMODE = "DARK_MODE";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));
export const logUserIn = (token: string) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};

export const logUserOut = () => {
  localStorage.removeItem(TOKEN);
  isLoggedInVar(false);
  window.location.reload();
};

export const darkModeVar = makeVar(
  Boolean(localStorage.getItem(DARKMODE) === "enabled")
);

export const darkModeOn = () => {
  localStorage.setItem(DARKMODE, "enabled");
  darkModeVar(true);
};

export const darkModeOff = () => {
  localStorage.removeItem(DARKMODE);
  darkModeVar(false);
};

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const uploadHttpLink = createUploadLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: localStorage.getItem(TOKEN),
    },
  };
});

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log(`GraphQL Error`, graphQLErrors);
  }
  if (networkError) {
    console.log(`Network Error`, networkError);
  }
});

export const client = new ApolloClient({
  link: authLink.concat(onErrorLink).concat(uploadHttpLink),
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        keyFields: (obj) => `User:${obj.username}`,
      },
      Query: {
        fields: {
          seeFeed: offsetLimitPagination(),
        },
      },
    },
  }),
});
