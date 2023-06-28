import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "../components/auth/Button";
import Input from "../components/auth/Input";
import PageTitle from "../components/PageTitle";

interface UploadForm {
  image: FileList;
  caption: string;
}

const UploadContainer = styled.div`
  padding: 20px 5px;
`;

const UploadForm = styled.form`
  width: 30vw;
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 12px;
`;

const FileInput = styled.label`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 16 / 9;
  padding: 20px 0px;
  margin-bottom: 12px;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    color: gray;
  }
`;

const FilePreview = styled.img`
  height: 288px;
  width: full;
  border-radius: 10px;
  padding: 20px 0px;
`;

const Upload_Photo_Mutation = gql`
  mutation uploadPhoto($file: Upload!, $caption: String) {
    uploadPhoto(file: $file, caption: $caption) {
      id
      file
      likes
      commentNumber
      isLiked
      user {
        id
        username
        avatar
      }
      caption
      createdAt
      isMine
    }
  }
`;

const Upload = () => {
  const [preview, setPreview] = useState("");
  const { register, handleSubmit, watch } = useForm<UploadForm>();
  const image = watch("image");
  useEffect(() => {
    if (image && image.length > 0) {
      const file = image[0];
      setPreview(URL.createObjectURL(file));
    }
  }, [image]);
  const updateUploadPhoto = (cache: any, result: any) => {
    const {
      data: { uploadPhoto },
    } = result;
    if (uploadPhoto.id) {
      cache.modify({
        id: `${uploadPhoto.id}`,
        fields: {
          seeFeed(prev: any) {
            return [uploadPhoto, ...prev];
          },
        },
      });
    }
  };
  const [uploadPhoto, { loading }] = useMutation(Upload_Photo_Mutation, {
    update: updateUploadPhoto,
  });
  const onValid = ({ image, caption }: UploadForm) => {
    if (loading) {
      return;
    }
    const file = image[0];
    const url = URL.createObjectURL(file);
    uploadPhoto({
      variables: {
        file: url,
        caption,
      },
    });
  };
  return (
    <div>
      <PageTitle title={"upload"}></PageTitle>
      <UploadContainer>
        <UploadForm onSubmit={handleSubmit(onValid)}>
          <div>
            {preview ? (
              <FilePreview src={preview} alt="" />
            ) : (
              <FileInput htmlFor="file">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-12 w-12"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
                <input
                  type="file"
                  id="file"
                  accept="image/*"
                  {...register("image")}
                  style={{ display: "none" }}
                />
              </FileInput>
            )}
          </div>
          <Input
            style={{ marginBottom: "12px" }}
            {...register("caption", { required: true })}
            type="text"
            placeholder="문구 입력..."
          />
          <Button style={{ width: "40%" }} type="submit" value="공유하기" />
        </UploadForm>
      </UploadContainer>
    </div>
  );
};

export default Upload;
