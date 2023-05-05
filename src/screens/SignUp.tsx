import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import { FatLink } from "../components/shared";
import routes from "../routes";
import PageTitle from "../components/PageTitle";
import { gql, useMutation } from "@apollo/client";
import { CreateAccountMutation } from "../generated/graphql";
import { useHistory } from "react-router-dom";

interface ISignupForm {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
  result: string;
}

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Subtitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;

const Create_Account_Mutation = gql`
  mutation createAccount(
    $firstname: String!
    $lastname: String
    $email: String!
    $username: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstname
      lastName: $lastname
      email: $email
      username: $username
      password: $password
    ) {
      ok
      error
    }
  }
`;

const SignUp = () => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    setError,
    getValues,
  } = useForm<ISignupForm>({
    mode: "onChange",
  });
  const onCompleted = (data: CreateAccountMutation) => {
    const { username, password } = getValues();
    const {
      createAccount: { ok, error },
    } = data;
    if (!ok) {
      return setError("result", {
        message: error ? error : "",
      });
    }
    history.push(routes.home, {
      message: "Account craeted. Please log in.",
      username,
      password,
    });
  };
  const [createAccount, { loading }] = useMutation<CreateAccountMutation>(
    Create_Account_Mutation,
    { onCompleted }
  );
  const onValid = ({
    firstname,
    lastname,
    email,
    username,
    password,
  }: ISignupForm) => {
    if (loading) {
      return;
    }
    createAccount({
      variables: {
        firstname,
        lastname,
        email,
        username,
        password,
      },
    });
  };
  return (
    <AuthLayout>
      <PageTitle title="Sign up" />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <Subtitle>
            Sign up to see photos and videos from your friends.
          </Subtitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onValid)}>
          <Input
            {...register("firstname", { required: "First name is required" })}
            type="text"
            placeholder="Firstname"
          />
          <Input {...register("lastname")} type="text" placeholder="Lastname" />
          <Input
            {...register("email", { required: "Email isrequired" })}
            type="text"
            placeholder="Email"
          />
          <Input
            {...register("username", {
              required: "Username is required",
              minLength: 3,
            })}
            type="text"
            placeholder="Username"
          />
          <Input
            {...register("password", {
              required: "Password is required",
              minLength: 5,
            })}
            type="password"
            placeholder="Password"
          />
          <Button
            type="submit"
            value={loading ? "Loading..." : "Sign up"}
            disabled={!isValid || loading}
          />
        </form>
      </FormBox>
      <BottomBox cta="Have an account?" linkText="Log in" link={routes.home} />
    </AuthLayout>
  );
};

export default SignUp;
