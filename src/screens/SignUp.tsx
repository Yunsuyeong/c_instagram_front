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

interface ISignupForm {
  email: string;
  name: string;
  username: string;
  password: number;
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

const SignUp = () => {
  const { register, handleSubmit, watch } = useForm<ISignupForm>();
  const onValid = (form: ISignupForm) => {
    console.log(form);
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
            {...register("email", { required: true })}
            type="text"
            placeholder="Email"
          />
          <Input
            {...register("name", { required: true })}
            type="text"
            placeholder="Name"
          />
          <Input
            {...register("username", { required: true, minLength: 5 })}
            type="text"
            placeholder="Username"
          />
          <Input
            {...register("password", { required: true, minLength: 5 })}
            type="password"
            placeholder="Password"
          />
          <Button type="submit" value="Log in" />
        </form>
      </FormBox>
      <BottomBox cta="Have an account?" linkText="Log in" link={routes.home} />
    </AuthLayout>
  );
};

export default SignUp;
