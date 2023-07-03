import { gql } from "@apollo/client";

export const Photo_Fragment = gql`
  fragment PhotoFragment on Photo {
    id
    file
    caption
    likes
    commentNumber
    hashtags {
      id
      hashtag
      totalPhotos
      createdAt
    }
    createdAt
    isLiked
  }
`;

export const User_Fragment = gql`
  fragment UserFragment on User {
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
  ${Photo_Fragment}
`;

export const Comment_Fragment = gql`
  fragment CommentFragment on Comment {
    id
    user {
      username
      avatar
    }
    payload
    isMine
    createdAt
  }
`;

export const Room_Fragment = gql`
  fragment RoomFragment on Room {
    id
    unreadTotal
    users {
      id
      username
      avatar
    }
    messages {
      id
      payload
      user {
        id
        username
        avatar
      }
      read
      createdAt
    }
    createdAt
    updatedAt
  }
`;
