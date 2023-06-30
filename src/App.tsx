import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import { isLoggedInVar, darkModeVar, client } from "./apollo";
import { ThemeProvider } from "styled-components";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";
import SignUp from "./screens/SignUp";
import routes from "./routes";
import { HelmetProvider } from "react-helmet-async";
import Layout from "./components/Layout";
import Profile from "./screens/Profile";
import EditProfile from "./screens/EditProfile";
import Post from "./screens/Post";
import Upload from "./screens/Upload";
import Photos from "./screens/Photos";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <GlobalStyles />
          <Router>
            <Switch>
              <Route path={routes.home} exact>
                {isLoggedIn ? (
                  <Layout>
                    <Home />
                  </Layout>
                ) : (
                  <Login />
                )}
              </Route>
              {!isLoggedIn ? (
                <Route path={routes.signUp}>
                  <SignUp />
                </Route>
              ) : null}
              <Route path={`/hashtags/:keyword`}>
                <Layout>
                  <Photos />
                </Layout>
              </Route>
              <Route path={`/upload`}>
                <Layout>
                  <Upload />
                </Layout>
              </Route>
              <Route path={`/p/:photoid`}>
                <Post />
              </Route>
              <Route path={`/accounts/edit/:username`}>
                <Layout>
                  <EditProfile />
                </Layout>
              </Route>
              <Route path={`/:username/followers`}>
                <Layout>
                  <Profile />
                </Layout>
              </Route>
              <Route path={`/:username/following`}>
                <Layout>
                  <Profile />
                </Layout>
              </Route>
              <Route path={`/:username`}>
                <Layout>
                  <Profile />
                </Layout>
              </Route>
            </Switch>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
