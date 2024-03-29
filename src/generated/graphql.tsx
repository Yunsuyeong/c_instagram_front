import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Upload: any;
};

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type Comment = {
  __typename?: 'Comment';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  isMine: Scalars['Boolean'];
  payload: Scalars['String'];
  photo: Photo;
  updatedAt: Scalars['String'];
  user: User;
};

export type Hashtag = {
  __typename?: 'Hashtag';
  createdAt: Scalars['String'];
  hashtag: Scalars['String'];
  id: Scalars['Int'];
  photos?: Maybe<Array<Maybe<Photo>>>;
  totalPhotos: Scalars['Int'];
  updatedAt: Scalars['String'];
};


export type HashtagPhotosArgs = {
  page: Scalars['Int'];
};

export type Like = {
  __typename?: 'Like';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  photo: Photo;
  updatedAt: Scalars['String'];
};

export type LoginResult = {
  __typename?: 'LoginResult';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  token?: Maybe<Scalars['String']>;
};

export type Message = {
  __typename?: 'Message';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  payload: Scalars['String'];
  read: Scalars['Boolean'];
  room: Room;
  updatedAt: Scalars['String'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAccount: MutationResponse;
  createComment: MutationResponse;
  createRoom: MutationResponse;
  deleteComment: MutationResponse;
  deletePhoto: MutationResponse;
  editComment: MutationResponse;
  editPhoto: MutationResponse;
  editProfile: MutationResponse;
  followUser: MutationResponse;
  login: LoginResult;
  readMessage: MutationResponse;
  sendMessage: MutationResponse;
  toggleLike: MutationResponse;
  unfollowUser: MutationResponse;
  uploadPhoto?: Maybe<Photo>;
};


export type MutationCreateAccountArgs = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationCreateCommentArgs = {
  payload: Scalars['String'];
  photoId?: InputMaybe<Scalars['Int']>;
};


export type MutationCreateRoomArgs = {
  username: Scalars['String'];
};


export type MutationDeleteCommentArgs = {
  id: Scalars['Int'];
};


export type MutationDeletePhotoArgs = {
  id: Scalars['Int'];
};


export type MutationEditCommentArgs = {
  id: Scalars['Int'];
  payload: Scalars['String'];
};


export type MutationEditPhotoArgs = {
  caption: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationEditProfileArgs = {
  avatar?: InputMaybe<Scalars['Upload']>;
  bio?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};


export type MutationFollowUserArgs = {
  username: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationReadMessageArgs = {
  id: Scalars['Int'];
};


export type MutationSendMessageArgs = {
  payload: Scalars['String'];
  roomId?: InputMaybe<Scalars['Int']>;
  userId?: InputMaybe<Scalars['Int']>;
};


export type MutationToggleLikeArgs = {
  id: Scalars['Int'];
};


export type MutationUnfollowUserArgs = {
  username: Scalars['String'];
};


export type MutationUploadPhotoArgs = {
  caption?: InputMaybe<Scalars['String']>;
  file: Scalars['Upload'];
};

export type MutationResponse = {
  __typename?: 'MutationResponse';
  error?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  ok: Scalars['Boolean'];
};

export type Photo = {
  __typename?: 'Photo';
  caption?: Maybe<Scalars['String']>;
  commentNumber: Scalars['Int'];
  comments?: Maybe<Array<Maybe<Comment>>>;
  createdAt: Scalars['String'];
  file: Scalars['String'];
  hashtags?: Maybe<Array<Maybe<Hashtag>>>;
  id: Scalars['Int'];
  isLiked: Scalars['Boolean'];
  isMine: Scalars['Boolean'];
  likes: Scalars['Int'];
  updatedAt: Scalars['String'];
  user: User;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  searchPhotos?: Maybe<Array<Maybe<Photo>>>;
  searchUsers?: Maybe<Array<Maybe<User>>>;
  seeFeed?: Maybe<Array<Maybe<Photo>>>;
  seeFollowers: SeeFollowersResult;
  seeFollowing: SeeFollowingResult;
  seeHashtag?: Maybe<Hashtag>;
  seePhoto?: Maybe<Photo>;
  seePhotoComments?: Maybe<Array<Maybe<Comment>>>;
  seePhotoLikes?: Maybe<Array<Maybe<User>>>;
  seeProfile?: Maybe<User>;
  seeRoom?: Maybe<Room>;
  seeRooms?: Maybe<Array<Maybe<Room>>>;
};


export type QuerySearchPhotosArgs = {
  keyword: Scalars['String'];
};


export type QuerySearchUsersArgs = {
  keyword: Scalars['String'];
};


export type QuerySeeFeedArgs = {
  offset: Scalars['Int'];
};


export type QuerySeeFollowersArgs = {
  page: Scalars['Int'];
  username: Scalars['String'];
};


export type QuerySeeFollowingArgs = {
  lastId?: InputMaybe<Scalars['Int']>;
  username: Scalars['String'];
};


export type QuerySeeHashtagArgs = {
  hashtag: Scalars['String'];
};


export type QuerySeePhotoArgs = {
  id?: InputMaybe<Scalars['Int']>;
};


export type QuerySeePhotoCommentsArgs = {
  id: Scalars['Int'];
};


export type QuerySeePhotoLikesArgs = {
  id: Scalars['Int'];
};


export type QuerySeeProfileArgs = {
  username: Scalars['String'];
};


export type QuerySeeRoomArgs = {
  id: Scalars['Int'];
};

export type Room = {
  __typename?: 'Room';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  messages?: Maybe<Array<Maybe<Message>>>;
  unreadTotal: Scalars['Int'];
  updatedAt: Scalars['String'];
  users?: Maybe<Array<Maybe<User>>>;
};

export type SeeFollowersResult = {
  __typename?: 'SeeFollowersResult';
  error?: Maybe<Scalars['String']>;
  followers?: Maybe<Array<Maybe<User>>>;
  ok: Scalars['Boolean'];
  totalPages?: Maybe<Scalars['Int']>;
};

export type SeeFollowingResult = {
  __typename?: 'SeeFollowingResult';
  error?: Maybe<Scalars['String']>;
  following?: Maybe<Array<Maybe<User>>>;
  ok: Scalars['Boolean'];
};

export type Subscription = {
  __typename?: 'Subscription';
  roomUpdates?: Maybe<Message>;
};


export type SubscriptionRoomUpdatesArgs = {
  id: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  followers?: Maybe<Array<Maybe<User>>>;
  following?: Maybe<Array<Maybe<User>>>;
  id: Scalars['Int'];
  isFollowing: Scalars['Boolean'];
  isMe: Scalars['Boolean'];
  lastName?: Maybe<Scalars['String']>;
  photos?: Maybe<Array<Maybe<Photo>>>;
  totalFollowers: Scalars['Int'];
  totalFollowing: Scalars['Int'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type SearchUsersQueryVariables = Exact<{
  keyword: Scalars['String'];
}>;


export type SearchUsersQuery = { __typename?: 'Query', searchUsers?: Array<{ __typename?: 'User', id: number, firstName: string, lastName?: string | null, username: string, bio?: string | null, avatar?: string | null, totalFollowing: number, totalFollowers: number, isMe: boolean, isFollowing: boolean, following?: Array<{ __typename?: 'User', id: number, username: string, avatar?: string | null, isFollowing: boolean } | null> | null, followers?: Array<{ __typename?: 'User', id: number, username: string, avatar?: string | null, isFollowing: boolean } | null> | null, photos?: Array<{ __typename?: 'Photo', id: number, file: string, caption?: string | null, likes: number, commentNumber: number, createdAt: string, isLiked: boolean, hashtags?: Array<{ __typename?: 'Hashtag', id: number, hashtag: string, totalPhotos: number, createdAt: string } | null> | null } | null> | null } | null> | null };

export type SearchPhotosQueryVariables = Exact<{
  keyword: Scalars['String'];
}>;


export type SearchPhotosQuery = { __typename?: 'Query', searchPhotos?: Array<{ __typename?: 'Photo', id: number, file: string, caption?: string | null, likes: number, commentNumber: number, createdAt: string, isLiked: boolean, hashtags?: Array<{ __typename?: 'Hashtag', id: number, hashtag: string, totalPhotos: number, createdAt: string } | null> | null } | null> | null };

export type SeeRoomsQueryVariables = Exact<{ [key: string]: never; }>;


export type SeeRoomsQuery = { __typename?: 'Query', seeRooms?: Array<{ __typename?: 'Room', id: number, unreadTotal: number, createdAt: string, updatedAt: string, users?: Array<{ __typename?: 'User', id: number, username: string, avatar?: string | null } | null> | null, messages?: Array<{ __typename?: 'Message', id: number, payload: string, read: boolean, createdAt: string, user: { __typename?: 'User', id: number, username: string, avatar?: string | null } } | null> | null } | null> | null };

export type DeleteCommentMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment: { __typename?: 'MutationResponse', ok: boolean } };

export type CreateCommentMutationVariables = Exact<{
  photoId: Scalars['Int'];
  payload: Scalars['String'];
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'MutationResponse', ok: boolean, error?: string | null, id?: number | null } };

export type BsNameFragment = { __typename?: 'Comment', id: number, createdAt: string, isMine: boolean, payload: string, user: { __typename?: 'User', username: string, avatar?: string | null } };

export type ToggleLikeMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ToggleLikeMutation = { __typename?: 'Mutation', toggleLike: { __typename?: 'MutationResponse', ok: boolean, error?: string | null } };

export type SendMessageMutationVariables = Exact<{
  payload: Scalars['String'];
  roomId?: InputMaybe<Scalars['Int']>;
  userId?: InputMaybe<Scalars['Int']>;
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage: { __typename?: 'MutationResponse', ok: boolean, id?: number | null } };

export type RoomUpdatesSubscriptionVariables = Exact<{
  id: Scalars['Int'];
}>;


export type RoomUpdatesSubscription = { __typename?: 'Subscription', roomUpdates?: { __typename?: 'Message', id: number, payload: string, read: boolean, user: { __typename?: 'User', username: string, avatar?: string | null } } | null };

export type NewMessageFragment = { __typename?: 'Message', id: number, payload: string, read: boolean, user: { __typename?: 'User', username: string, avatar?: string | null } };

export type PhotoFragmentFragment = { __typename?: 'Photo', id: number, file: string, caption?: string | null, likes: number, commentNumber: number, createdAt: string, isLiked: boolean, hashtags?: Array<{ __typename?: 'Hashtag', id: number, hashtag: string, totalPhotos: number, createdAt: string } | null> | null };

export type UserFragmentFragment = { __typename?: 'User', id: number, firstName: string, lastName?: string | null, username: string, bio?: string | null, avatar?: string | null, totalFollowing: number, totalFollowers: number, isMe: boolean, isFollowing: boolean, photos?: Array<{ __typename?: 'Photo', id: number, file: string, caption?: string | null, likes: number, commentNumber: number, createdAt: string, isLiked: boolean, hashtags?: Array<{ __typename?: 'Hashtag', id: number, hashtag: string, totalPhotos: number, createdAt: string } | null> | null } | null> | null };

export type CommentFragmentFragment = { __typename?: 'Comment', id: number, payload: string, isMine: boolean, createdAt: string, user: { __typename?: 'User', username: string, avatar?: string | null } };

export type RoomFragmentFragment = { __typename?: 'Room', id: number, unreadTotal: number, createdAt: string, updatedAt: string, users?: Array<{ __typename?: 'User', id: number, username: string, avatar?: string | null } | null> | null, messages?: Array<{ __typename?: 'Message', id: number, payload: string, read: boolean, createdAt: string, user: { __typename?: 'User', id: number, username: string, avatar?: string | null } } | null> | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, username: string, email: string, bio?: string | null, avatar?: string | null, totalFollowing: number, totalFollowers: number } | null };

export type EditProfileMutationVariables = Exact<{
  username?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
}>;


export type EditProfileMutation = { __typename?: 'Mutation', editProfile: { __typename?: 'MutationResponse', ok: boolean, error?: string | null } };

export type SeeFeedQueryVariables = Exact<{
  offset: Scalars['Int'];
}>;


export type SeeFeedQuery = { __typename?: 'Query', seeFeed?: Array<{ __typename?: 'Photo', caption?: string | null, createdAt: string, isMine: boolean, id: number, file: string, likes: number, commentNumber: number, isLiked: boolean, user: { __typename?: 'User', username: string, avatar?: string | null }, comments?: Array<{ __typename?: 'Comment', id: number, payload: string, isMine: boolean, createdAt: string, user: { __typename?: 'User', username: string, avatar?: string | null } } | null> | null, hashtags?: Array<{ __typename?: 'Hashtag', id: number, hashtag: string, totalPhotos: number, createdAt: string } | null> | null } | null> | null };

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResult', ok: boolean, token?: string | null, error?: string | null } };

export type SeePhotoQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type SeePhotoQuery = { __typename?: 'Query', seePhoto?: { __typename?: 'Photo', id: number, file: string, caption?: string | null, likes: number, commentNumber: number, createdAt: string, isLiked: boolean, user: { __typename?: 'User', username: string, avatar?: string | null }, comments?: Array<{ __typename?: 'Comment', id: number, payload: string, isMine: boolean, createdAt: string, user: { __typename?: 'User', username: string, avatar?: string | null } } | null> | null, hashtags?: Array<{ __typename?: 'Hashtag', id: number, hashtag: string, totalPhotos: number, createdAt: string } | null> | null } | null };

export type SeePhotoLikesQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type SeePhotoLikesQuery = { __typename?: 'Query', seePhotoLikes?: Array<{ __typename?: 'User', id: number, firstName: string, lastName?: string | null, username: string, bio?: string | null, avatar?: string | null, totalFollowing: number, totalFollowers: number, isMe: boolean, isFollowing: boolean, photos?: Array<{ __typename?: 'Photo', id: number, file: string, caption?: string | null, likes: number, commentNumber: number, createdAt: string, isLiked: boolean, hashtags?: Array<{ __typename?: 'Hashtag', id: number, hashtag: string, totalPhotos: number, createdAt: string } | null> | null } | null> | null } | null> | null };

export type SeeProfileQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type SeeProfileQuery = { __typename?: 'Query', seeProfile?: { __typename?: 'User', id: number, firstName: string, lastName?: string | null, username: string, bio?: string | null, avatar?: string | null, totalFollowing: number, totalFollowers: number, isMe: boolean, isFollowing: boolean, photos?: Array<{ __typename?: 'Photo', id: number, file: string, caption?: string | null, likes: number, commentNumber: number, createdAt: string, isLiked: boolean, hashtags?: Array<{ __typename?: 'Hashtag', id: number, hashtag: string, totalPhotos: number, createdAt: string } | null> | null } | null> | null } | null };

export type SeeFollowersQueryVariables = Exact<{
  username: Scalars['String'];
  page: Scalars['Int'];
}>;


export type SeeFollowersQuery = { __typename?: 'Query', seeFollowers: { __typename?: 'SeeFollowersResult', ok: boolean, totalPages?: number | null, followers?: Array<{ __typename?: 'User', id: number, firstName: string, lastName?: string | null, username: string, bio?: string | null, avatar?: string | null, totalFollowing: number, totalFollowers: number, isMe: boolean, isFollowing: boolean, photos?: Array<{ __typename?: 'Photo', id: number, file: string, caption?: string | null, likes: number, commentNumber: number, createdAt: string, isLiked: boolean, hashtags?: Array<{ __typename?: 'Hashtag', id: number, hashtag: string, totalPhotos: number, createdAt: string } | null> | null } | null> | null } | null> | null } };

export type SeeFollowingQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type SeeFollowingQuery = { __typename?: 'Query', seeFollowing: { __typename?: 'SeeFollowingResult', ok: boolean, following?: Array<{ __typename?: 'User', id: number, firstName: string, lastName?: string | null, username: string, bio?: string | null, avatar?: string | null, totalFollowing: number, totalFollowers: number, isMe: boolean, isFollowing: boolean, photos?: Array<{ __typename?: 'Photo', id: number, file: string, caption?: string | null, likes: number, commentNumber: number, createdAt: string, isLiked: boolean, hashtags?: Array<{ __typename?: 'Hashtag', id: number, hashtag: string, totalPhotos: number, createdAt: string } | null> | null } | null> | null } | null> | null } };

export type FollowUserMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type FollowUserMutation = { __typename?: 'Mutation', followUser: { __typename?: 'MutationResponse', ok: boolean } };

export type UnfollowUserMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type UnfollowUserMutation = { __typename?: 'Mutation', unfollowUser: { __typename?: 'MutationResponse', ok: boolean } };

export type SeeRoomQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type SeeRoomQuery = { __typename?: 'Query', seeRoom?: { __typename?: 'Room', id: number, unreadTotal: number, createdAt: string, updatedAt: string, users?: Array<{ __typename?: 'User', id: number, username: string, avatar?: string | null } | null> | null, messages?: Array<{ __typename?: 'Message', id: number, payload: string, read: boolean, createdAt: string, user: { __typename?: 'User', id: number, username: string, avatar?: string | null } } | null> | null } | null };

export type CreateRoomMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type CreateRoomMutation = { __typename?: 'Mutation', createRoom: { __typename?: 'MutationResponse', ok: boolean, id?: number | null } };

export type CreateAccountMutationVariables = Exact<{
  firstname: Scalars['String'];
  lastname?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type CreateAccountMutation = { __typename?: 'Mutation', createAccount: { __typename?: 'MutationResponse', ok: boolean, error?: string | null } };

export type UploadPhotoMutationVariables = Exact<{
  file: Scalars['Upload'];
  caption?: InputMaybe<Scalars['String']>;
}>;


export type UploadPhotoMutation = { __typename?: 'Mutation', uploadPhoto?: { __typename?: 'Photo', id: number, file: string, likes: number, commentNumber: number, isLiked: boolean, caption?: string | null, createdAt: string, isMine: boolean, user: { __typename?: 'User', id: number, username: string, avatar?: string | null } } | null };

export const BsNameFragmentDoc = gql`
    fragment BSName on Comment {
  id
  createdAt
  isMine
  payload
  user {
    username
    avatar
  }
}
    `;
export const NewMessageFragmentDoc = gql`
    fragment NewMessage on Message {
  id
  payload
  user {
    username
    avatar
  }
  read
}
    `;
export const PhotoFragmentFragmentDoc = gql`
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
export const UserFragmentFragmentDoc = gql`
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
    ${PhotoFragmentFragmentDoc}`;
export const CommentFragmentFragmentDoc = gql`
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
export const RoomFragmentFragmentDoc = gql`
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
export const SearchUsersDocument = gql`
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
    ${UserFragmentFragmentDoc}`;

/**
 * __useSearchUsersQuery__
 *
 * To run a query within a React component, call `useSearchUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchUsersQuery({
 *   variables: {
 *      keyword: // value for 'keyword'
 *   },
 * });
 */
export function useSearchUsersQuery(baseOptions: Apollo.QueryHookOptions<SearchUsersQuery, SearchUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchUsersQuery, SearchUsersQueryVariables>(SearchUsersDocument, options);
      }
export function useSearchUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchUsersQuery, SearchUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchUsersQuery, SearchUsersQueryVariables>(SearchUsersDocument, options);
        }
export type SearchUsersQueryHookResult = ReturnType<typeof useSearchUsersQuery>;
export type SearchUsersLazyQueryHookResult = ReturnType<typeof useSearchUsersLazyQuery>;
export type SearchUsersQueryResult = Apollo.QueryResult<SearchUsersQuery, SearchUsersQueryVariables>;
export const SearchPhotosDocument = gql`
    query searchPhotos($keyword: String!) {
  searchPhotos(keyword: $keyword) {
    ...PhotoFragment
  }
}
    ${PhotoFragmentFragmentDoc}`;

/**
 * __useSearchPhotosQuery__
 *
 * To run a query within a React component, call `useSearchPhotosQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchPhotosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchPhotosQuery({
 *   variables: {
 *      keyword: // value for 'keyword'
 *   },
 * });
 */
export function useSearchPhotosQuery(baseOptions: Apollo.QueryHookOptions<SearchPhotosQuery, SearchPhotosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchPhotosQuery, SearchPhotosQueryVariables>(SearchPhotosDocument, options);
      }
export function useSearchPhotosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchPhotosQuery, SearchPhotosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchPhotosQuery, SearchPhotosQueryVariables>(SearchPhotosDocument, options);
        }
export type SearchPhotosQueryHookResult = ReturnType<typeof useSearchPhotosQuery>;
export type SearchPhotosLazyQueryHookResult = ReturnType<typeof useSearchPhotosLazyQuery>;
export type SearchPhotosQueryResult = Apollo.QueryResult<SearchPhotosQuery, SearchPhotosQueryVariables>;
export const SeeRoomsDocument = gql`
    query seeRooms {
  seeRooms {
    ...RoomFragment
  }
}
    ${RoomFragmentFragmentDoc}`;

/**
 * __useSeeRoomsQuery__
 *
 * To run a query within a React component, call `useSeeRoomsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeeRoomsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeeRoomsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSeeRoomsQuery(baseOptions?: Apollo.QueryHookOptions<SeeRoomsQuery, SeeRoomsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SeeRoomsQuery, SeeRoomsQueryVariables>(SeeRoomsDocument, options);
      }
export function useSeeRoomsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SeeRoomsQuery, SeeRoomsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SeeRoomsQuery, SeeRoomsQueryVariables>(SeeRoomsDocument, options);
        }
export type SeeRoomsQueryHookResult = ReturnType<typeof useSeeRoomsQuery>;
export type SeeRoomsLazyQueryHookResult = ReturnType<typeof useSeeRoomsLazyQuery>;
export type SeeRoomsQueryResult = Apollo.QueryResult<SeeRoomsQuery, SeeRoomsQueryVariables>;
export const DeleteCommentDocument = gql`
    mutation deleteComment($id: Int!) {
  deleteComment(id: $id) {
    ok
  }
}
    `;
export type DeleteCommentMutationFn = Apollo.MutationFunction<DeleteCommentMutation, DeleteCommentMutationVariables>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, options);
      }
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const CreateCommentDocument = gql`
    mutation createComment($photoId: Int!, $payload: String!) {
  createComment(photoId: $photoId, payload: $payload) {
    ok
    error
    id
  }
}
    `;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      photoId: // value for 'photoId'
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const ToggleLikeDocument = gql`
    mutation toggleLike($id: Int!) {
  toggleLike(id: $id) {
    ok
    error
  }
}
    `;
export type ToggleLikeMutationFn = Apollo.MutationFunction<ToggleLikeMutation, ToggleLikeMutationVariables>;

/**
 * __useToggleLikeMutation__
 *
 * To run a mutation, you first call `useToggleLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleLikeMutation, { data, loading, error }] = useToggleLikeMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useToggleLikeMutation(baseOptions?: Apollo.MutationHookOptions<ToggleLikeMutation, ToggleLikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleLikeMutation, ToggleLikeMutationVariables>(ToggleLikeDocument, options);
      }
export type ToggleLikeMutationHookResult = ReturnType<typeof useToggleLikeMutation>;
export type ToggleLikeMutationResult = Apollo.MutationResult<ToggleLikeMutation>;
export type ToggleLikeMutationOptions = Apollo.BaseMutationOptions<ToggleLikeMutation, ToggleLikeMutationVariables>;
export const SendMessageDocument = gql`
    mutation sendMessage($payload: String!, $roomId: Int, $userId: Int) {
  sendMessage(payload: $payload, roomId: $roomId, userId: $userId) {
    ok
    id
  }
}
    `;
export type SendMessageMutationFn = Apollo.MutationFunction<SendMessageMutation, SendMessageMutationVariables>;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      payload: // value for 'payload'
 *      roomId: // value for 'roomId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useSendMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendMessageMutation, SendMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, options);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<SendMessageMutation, SendMessageMutationVariables>;
export const RoomUpdatesDocument = gql`
    subscription roomUpdates($id: Int!) {
  roomUpdates(id: $id) {
    id
    payload
    user {
      username
      avatar
    }
    read
  }
}
    `;

/**
 * __useRoomUpdatesSubscription__
 *
 * To run a query within a React component, call `useRoomUpdatesSubscription` and pass it any options that fit your needs.
 * When your component renders, `useRoomUpdatesSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRoomUpdatesSubscription({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRoomUpdatesSubscription(baseOptions: Apollo.SubscriptionHookOptions<RoomUpdatesSubscription, RoomUpdatesSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<RoomUpdatesSubscription, RoomUpdatesSubscriptionVariables>(RoomUpdatesDocument, options);
      }
export type RoomUpdatesSubscriptionHookResult = ReturnType<typeof useRoomUpdatesSubscription>;
export type RoomUpdatesSubscriptionResult = Apollo.SubscriptionResult<RoomUpdatesSubscription>;
export const MeDocument = gql`
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

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const EditProfileDocument = gql`
    mutation editProfile($username: String, $email: String, $bio: String) {
  editProfile(username: $username, email: $email, bio: $bio) {
    ok
    error
  }
}
    `;
export type EditProfileMutationFn = Apollo.MutationFunction<EditProfileMutation, EditProfileMutationVariables>;

/**
 * __useEditProfileMutation__
 *
 * To run a mutation, you first call `useEditProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editProfileMutation, { data, loading, error }] = useEditProfileMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      bio: // value for 'bio'
 *   },
 * });
 */
export function useEditProfileMutation(baseOptions?: Apollo.MutationHookOptions<EditProfileMutation, EditProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditProfileMutation, EditProfileMutationVariables>(EditProfileDocument, options);
      }
export type EditProfileMutationHookResult = ReturnType<typeof useEditProfileMutation>;
export type EditProfileMutationResult = Apollo.MutationResult<EditProfileMutation>;
export type EditProfileMutationOptions = Apollo.BaseMutationOptions<EditProfileMutation, EditProfileMutationVariables>;
export const SeeFeedDocument = gql`
    query seeFeed($offset: Int!) {
  seeFeed(offset: $offset) {
    ...PhotoFragment
    user {
      username
      avatar
    }
    caption
    comments {
      ...CommentFragment
    }
    createdAt
    isMine
  }
}
    ${PhotoFragmentFragmentDoc}
${CommentFragmentFragmentDoc}`;

/**
 * __useSeeFeedQuery__
 *
 * To run a query within a React component, call `useSeeFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeeFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeeFeedQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useSeeFeedQuery(baseOptions: Apollo.QueryHookOptions<SeeFeedQuery, SeeFeedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SeeFeedQuery, SeeFeedQueryVariables>(SeeFeedDocument, options);
      }
export function useSeeFeedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SeeFeedQuery, SeeFeedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SeeFeedQuery, SeeFeedQueryVariables>(SeeFeedDocument, options);
        }
export type SeeFeedQueryHookResult = ReturnType<typeof useSeeFeedQuery>;
export type SeeFeedLazyQueryHookResult = ReturnType<typeof useSeeFeedLazyQuery>;
export type SeeFeedQueryResult = Apollo.QueryResult<SeeFeedQuery, SeeFeedQueryVariables>;
export const LoginDocument = gql`
    mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    ok
    token
    error
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const SeePhotoDocument = gql`
    query seePhoto($id: Int!) {
  seePhoto(id: $id) {
    ...PhotoFragment
    user {
      username
      avatar
    }
    comments {
      ...CommentFragment
    }
    hashtags {
      id
      hashtag
    }
  }
}
    ${PhotoFragmentFragmentDoc}
${CommentFragmentFragmentDoc}`;

/**
 * __useSeePhotoQuery__
 *
 * To run a query within a React component, call `useSeePhotoQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeePhotoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeePhotoQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSeePhotoQuery(baseOptions: Apollo.QueryHookOptions<SeePhotoQuery, SeePhotoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SeePhotoQuery, SeePhotoQueryVariables>(SeePhotoDocument, options);
      }
export function useSeePhotoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SeePhotoQuery, SeePhotoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SeePhotoQuery, SeePhotoQueryVariables>(SeePhotoDocument, options);
        }
export type SeePhotoQueryHookResult = ReturnType<typeof useSeePhotoQuery>;
export type SeePhotoLazyQueryHookResult = ReturnType<typeof useSeePhotoLazyQuery>;
export type SeePhotoQueryResult = Apollo.QueryResult<SeePhotoQuery, SeePhotoQueryVariables>;
export const SeePhotoLikesDocument = gql`
    query seePhotoLikes($id: Int!) {
  seePhotoLikes(id: $id) {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;

/**
 * __useSeePhotoLikesQuery__
 *
 * To run a query within a React component, call `useSeePhotoLikesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeePhotoLikesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeePhotoLikesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSeePhotoLikesQuery(baseOptions: Apollo.QueryHookOptions<SeePhotoLikesQuery, SeePhotoLikesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SeePhotoLikesQuery, SeePhotoLikesQueryVariables>(SeePhotoLikesDocument, options);
      }
export function useSeePhotoLikesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SeePhotoLikesQuery, SeePhotoLikesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SeePhotoLikesQuery, SeePhotoLikesQueryVariables>(SeePhotoLikesDocument, options);
        }
export type SeePhotoLikesQueryHookResult = ReturnType<typeof useSeePhotoLikesQuery>;
export type SeePhotoLikesLazyQueryHookResult = ReturnType<typeof useSeePhotoLikesLazyQuery>;
export type SeePhotoLikesQueryResult = Apollo.QueryResult<SeePhotoLikesQuery, SeePhotoLikesQueryVariables>;
export const SeeProfileDocument = gql`
    query seeProfile($username: String!) {
  seeProfile(username: $username) {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;

/**
 * __useSeeProfileQuery__
 *
 * To run a query within a React component, call `useSeeProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeeProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeeProfileQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useSeeProfileQuery(baseOptions: Apollo.QueryHookOptions<SeeProfileQuery, SeeProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SeeProfileQuery, SeeProfileQueryVariables>(SeeProfileDocument, options);
      }
export function useSeeProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SeeProfileQuery, SeeProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SeeProfileQuery, SeeProfileQueryVariables>(SeeProfileDocument, options);
        }
export type SeeProfileQueryHookResult = ReturnType<typeof useSeeProfileQuery>;
export type SeeProfileLazyQueryHookResult = ReturnType<typeof useSeeProfileLazyQuery>;
export type SeeProfileQueryResult = Apollo.QueryResult<SeeProfileQuery, SeeProfileQueryVariables>;
export const SeeFollowersDocument = gql`
    query seeFollowers($username: String!, $page: Int!) {
  seeFollowers(username: $username, page: $page) {
    ok
    followers {
      ...UserFragment
    }
    totalPages
  }
}
    ${UserFragmentFragmentDoc}`;

/**
 * __useSeeFollowersQuery__
 *
 * To run a query within a React component, call `useSeeFollowersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeeFollowersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeeFollowersQuery({
 *   variables: {
 *      username: // value for 'username'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useSeeFollowersQuery(baseOptions: Apollo.QueryHookOptions<SeeFollowersQuery, SeeFollowersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SeeFollowersQuery, SeeFollowersQueryVariables>(SeeFollowersDocument, options);
      }
export function useSeeFollowersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SeeFollowersQuery, SeeFollowersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SeeFollowersQuery, SeeFollowersQueryVariables>(SeeFollowersDocument, options);
        }
export type SeeFollowersQueryHookResult = ReturnType<typeof useSeeFollowersQuery>;
export type SeeFollowersLazyQueryHookResult = ReturnType<typeof useSeeFollowersLazyQuery>;
export type SeeFollowersQueryResult = Apollo.QueryResult<SeeFollowersQuery, SeeFollowersQueryVariables>;
export const SeeFollowingDocument = gql`
    query seeFollowing($username: String!) {
  seeFollowing(username: $username) {
    ok
    following {
      ...UserFragment
    }
  }
}
    ${UserFragmentFragmentDoc}`;

/**
 * __useSeeFollowingQuery__
 *
 * To run a query within a React component, call `useSeeFollowingQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeeFollowingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeeFollowingQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useSeeFollowingQuery(baseOptions: Apollo.QueryHookOptions<SeeFollowingQuery, SeeFollowingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SeeFollowingQuery, SeeFollowingQueryVariables>(SeeFollowingDocument, options);
      }
export function useSeeFollowingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SeeFollowingQuery, SeeFollowingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SeeFollowingQuery, SeeFollowingQueryVariables>(SeeFollowingDocument, options);
        }
export type SeeFollowingQueryHookResult = ReturnType<typeof useSeeFollowingQuery>;
export type SeeFollowingLazyQueryHookResult = ReturnType<typeof useSeeFollowingLazyQuery>;
export type SeeFollowingQueryResult = Apollo.QueryResult<SeeFollowingQuery, SeeFollowingQueryVariables>;
export const FollowUserDocument = gql`
    mutation followUser($username: String!) {
  followUser(username: $username) {
    ok
  }
}
    `;
export type FollowUserMutationFn = Apollo.MutationFunction<FollowUserMutation, FollowUserMutationVariables>;

/**
 * __useFollowUserMutation__
 *
 * To run a mutation, you first call `useFollowUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followUserMutation, { data, loading, error }] = useFollowUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useFollowUserMutation(baseOptions?: Apollo.MutationHookOptions<FollowUserMutation, FollowUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FollowUserMutation, FollowUserMutationVariables>(FollowUserDocument, options);
      }
export type FollowUserMutationHookResult = ReturnType<typeof useFollowUserMutation>;
export type FollowUserMutationResult = Apollo.MutationResult<FollowUserMutation>;
export type FollowUserMutationOptions = Apollo.BaseMutationOptions<FollowUserMutation, FollowUserMutationVariables>;
export const UnfollowUserDocument = gql`
    mutation unfollowUser($username: String!) {
  unfollowUser(username: $username) {
    ok
  }
}
    `;
export type UnfollowUserMutationFn = Apollo.MutationFunction<UnfollowUserMutation, UnfollowUserMutationVariables>;

/**
 * __useUnfollowUserMutation__
 *
 * To run a mutation, you first call `useUnfollowUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnfollowUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unfollowUserMutation, { data, loading, error }] = useUnfollowUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUnfollowUserMutation(baseOptions?: Apollo.MutationHookOptions<UnfollowUserMutation, UnfollowUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnfollowUserMutation, UnfollowUserMutationVariables>(UnfollowUserDocument, options);
      }
export type UnfollowUserMutationHookResult = ReturnType<typeof useUnfollowUserMutation>;
export type UnfollowUserMutationResult = Apollo.MutationResult<UnfollowUserMutation>;
export type UnfollowUserMutationOptions = Apollo.BaseMutationOptions<UnfollowUserMutation, UnfollowUserMutationVariables>;
export const SeeRoomDocument = gql`
    query seeRoom($id: Int!) {
  seeRoom(id: $id) {
    ...RoomFragment
  }
}
    ${RoomFragmentFragmentDoc}`;

/**
 * __useSeeRoomQuery__
 *
 * To run a query within a React component, call `useSeeRoomQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeeRoomQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeeRoomQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSeeRoomQuery(baseOptions: Apollo.QueryHookOptions<SeeRoomQuery, SeeRoomQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SeeRoomQuery, SeeRoomQueryVariables>(SeeRoomDocument, options);
      }
export function useSeeRoomLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SeeRoomQuery, SeeRoomQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SeeRoomQuery, SeeRoomQueryVariables>(SeeRoomDocument, options);
        }
export type SeeRoomQueryHookResult = ReturnType<typeof useSeeRoomQuery>;
export type SeeRoomLazyQueryHookResult = ReturnType<typeof useSeeRoomLazyQuery>;
export type SeeRoomQueryResult = Apollo.QueryResult<SeeRoomQuery, SeeRoomQueryVariables>;
export const CreateRoomDocument = gql`
    mutation createRoom($username: String!) {
  createRoom(username: $username) {
    ok
    id
  }
}
    `;
export type CreateRoomMutationFn = Apollo.MutationFunction<CreateRoomMutation, CreateRoomMutationVariables>;

/**
 * __useCreateRoomMutation__
 *
 * To run a mutation, you first call `useCreateRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRoomMutation, { data, loading, error }] = useCreateRoomMutation({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useCreateRoomMutation(baseOptions?: Apollo.MutationHookOptions<CreateRoomMutation, CreateRoomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRoomMutation, CreateRoomMutationVariables>(CreateRoomDocument, options);
      }
export type CreateRoomMutationHookResult = ReturnType<typeof useCreateRoomMutation>;
export type CreateRoomMutationResult = Apollo.MutationResult<CreateRoomMutation>;
export type CreateRoomMutationOptions = Apollo.BaseMutationOptions<CreateRoomMutation, CreateRoomMutationVariables>;
export const CreateAccountDocument = gql`
    mutation createAccount($firstname: String!, $lastname: String, $email: String!, $username: String!, $password: String!) {
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
export type CreateAccountMutationFn = Apollo.MutationFunction<CreateAccountMutation, CreateAccountMutationVariables>;

/**
 * __useCreateAccountMutation__
 *
 * To run a mutation, you first call `useCreateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAccountMutation, { data, loading, error }] = useCreateAccountMutation({
 *   variables: {
 *      firstname: // value for 'firstname'
 *      lastname: // value for 'lastname'
 *      email: // value for 'email'
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useCreateAccountMutation(baseOptions?: Apollo.MutationHookOptions<CreateAccountMutation, CreateAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAccountMutation, CreateAccountMutationVariables>(CreateAccountDocument, options);
      }
export type CreateAccountMutationHookResult = ReturnType<typeof useCreateAccountMutation>;
export type CreateAccountMutationResult = Apollo.MutationResult<CreateAccountMutation>;
export type CreateAccountMutationOptions = Apollo.BaseMutationOptions<CreateAccountMutation, CreateAccountMutationVariables>;
export const UploadPhotoDocument = gql`
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
export type UploadPhotoMutationFn = Apollo.MutationFunction<UploadPhotoMutation, UploadPhotoMutationVariables>;

/**
 * __useUploadPhotoMutation__
 *
 * To run a mutation, you first call `useUploadPhotoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadPhotoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadPhotoMutation, { data, loading, error }] = useUploadPhotoMutation({
 *   variables: {
 *      file: // value for 'file'
 *      caption: // value for 'caption'
 *   },
 * });
 */
export function useUploadPhotoMutation(baseOptions?: Apollo.MutationHookOptions<UploadPhotoMutation, UploadPhotoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadPhotoMutation, UploadPhotoMutationVariables>(UploadPhotoDocument, options);
      }
export type UploadPhotoMutationHookResult = ReturnType<typeof useUploadPhotoMutation>;
export type UploadPhotoMutationResult = Apollo.MutationResult<UploadPhotoMutation>;
export type UploadPhotoMutationOptions = Apollo.BaseMutationOptions<UploadPhotoMutation, UploadPhotoMutationVariables>;