import { useHistory, useParams } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { useForm } from "react-hook-form";
import Input from "../components/auth/Input";
import TextArea from "../components/auth/TextArea";
import EditFormBox from "../components/auth/EditFormBox";
import styled from "styled-components";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import { gql, useMutation } from "@apollo/client";
import { EditProfileMutation } from "../generated/graphql";
import useUser from "../hooks/useUser";

interface IParams {
  username: string;
}

interface IEditForm {
  username: string;
  email: string;
  bio: string;
  result: string;
}

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 50px;
  margin-top: 30px;
`;

const EditButton = styled.input`
  width: 20%;
  border: none;
  margin-top: 12px;
  background-color: ${(props) => props.theme.accent};
  color: white;
  text-align: center;
  padding: 8px 0px;
  font-weight: 600;
  border-radius: 10%;
  opacity: ${(props) => (props.disabled ? "0.2" : 1)};
  cursor: pointer;
`;

const Edit_Profile_Mutation = gql`
  mutation editProfile($username: String, $email: String, $bio: String) {
    editProfile(username: $username, email: $email, bio: $bio) {
      ok
      error
    }
  }
`;

const EditProfile = () => {
  const history = useHistory();
  const { data: userData } = useUser();
  console.log(userData);
  const { username } = useParams<IParams>();
  const {
    register,
    handleSubmit,
    formState: { isValid },
    getValues,
    setError,
  } = useForm<IEditForm>({
    mode: "onChange",
    defaultValues: {
      username,
      email: userData?.me?.email,
      bio: userData?.me?.bio!,
    },
  });
  const onCompleted = (data: EditProfileMutation) => {
    const { username: editUsername, email, bio } = getValues();
    const {
      editProfile: { ok, error },
    } = data;
    if (!ok) {
      return setError("result", {
        message: error ? error : "",
      });
    }
    history.push(`${editUsername}`, {
      message: "Profile Edited",
      username,
      email,
      bio,
    });
  };
  const [editProfile, { loading }] = useMutation<EditProfileMutation>(
    Edit_Profile_Mutation,
    { onCompleted }
  );
  const onValid = ({ username, email, bio }: IEditForm) => {
    if (loading) {
      return;
    }
    editProfile({
      variables: {
        username,
        email,
        bio,
      },
    });
  };
  return (
    <div>
      <PageTitle title={`Edit ${username}'s Profile`}></PageTitle>
      <EditFormBox>
        <div>
          <FontAwesomeIcon icon={faUserPen} size="3x" />
        </div>
        <EditForm onSubmit={handleSubmit(onValid)}>
          <Input
            {...register("username", {
              required: "Username is required",
              minLength: 3,
            })}
            type="text"
            placeholder="Username"
          />
          <Input
            {...register("email", { required: "Email is required" })}
            type="text"
            placeholder="Email"
          />
          <TextArea
            {...register("bio", {
              required: "Bio is required",
              maxLength: 150,
            })}
            rows={6}
            cols={2}
            placeholder="Bio"
          />
          <EditButton
            type="submit"
            value={"Edit"}
            disabled={!isValid || loading}
          />
        </EditForm>
      </EditFormBox>
    </div>
  );
};

export default EditProfile;
