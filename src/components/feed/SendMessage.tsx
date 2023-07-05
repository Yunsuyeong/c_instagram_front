import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { SendMessageMutation } from "../../generated/graphql";
import useUser from "../../hooks/useUser";
import { See_Room_Query } from "../../screens/Room";

export interface IMessageForm {
  payload: string;
}

interface IMessagesProps {
  roomId?: number;
}

const MessagesContainer = styled.div`
  width: 100%;
  position: absolute;
  bottom: 10px;
`;

const MessageCount = styled.span`
  opacity: 0.7;
  margin: 10px 0px;
  display: block;
  font-weight: 600;
  font-size: 10px;
`;

const SendMessageContainer = styled.div`
  margin-top: 10px;
  padding-top: 15px;
  padding-bottom: 10px;
  border-top: 1px solid ${(props) => props.theme.borderColor};
`;

const SendMessageInput = styled.input`
  width: 100%;
  &::placeholder {
    font-size: 12px;
  }
`;

const Send_Message_Mutation = gql`
  mutation sendMessage($payload: String!, $roomId: Int, $userId: Int) {
    sendMessage(payload: $payload, roomId: $roomId, userId: $userId) {
      ok
      id
    }
  }
`;

export const Room_Updates = gql`
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

const SendMessage = ({ roomId }: IMessagesProps) => {
  const client = useApolloClient();
  const { data: userData } = useUser();
  const { data: roomData, subscribeToMore } = useQuery(See_Room_Query, {
    variables: {
      id: roomId,
    },
  });
  const { register, handleSubmit, setValue, getValues } =
    useForm<IMessageForm>();
  const sendMessageUpdate = (cache: any, result: any) => {
    const { payload } = getValues();
    setValue("payload", "");
    const {
      data: {
        sendMessage: { ok, id },
      },
    } = result;
    if (ok && userData?.me) {
      const newMessage = {
        __typename: "Message",
        id,
        read: true,
        payload,
        user: {
          ...userData.me,
        },
      };
      const newCacheMessage = cache.writeFragment({
        fragment: gql`
          fragment NewMessage on Message {
            id
            payload
            user {
              username
              avatar
            }
            read
          }
        `,
        data: newMessage,
      });
      cache.modify({
        id: `Room:${roomId}`,
        fields: {
          messages(prev: any) {
            return [...prev, newCacheMessage];
          },
        },
      });
    }
  };
  const [sendMessage, { loading }] = useMutation<SendMessageMutation>(
    Send_Message_Mutation,
    {
      update: sendMessageUpdate,
    }
  );
  const updateQuery = (prev: any, options: any) => {
    const {
      subscriptionData: {
        data: { roomUpdates: payload },
      },
    } = options;
    if (payload?.id) {
      const incomingMessage = client.cache.writeFragment({
        fragment: gql`
          fragment NewMessage on Message {
            id
            payload
            user {
              username
              avatar
            }
            read
          }
        `,
        data: payload,
      });
      client.cache.modify({
        id: `Room:${roomId}`,
        fields: {
          messages(prev) {
            const existingMessage = prev.find(
              (aMessage: any) => aMessage.__ref === incomingMessage?.__ref
            );
            if (existingMessage) {
              return prev;
            }
            return [...prev, incomingMessage];
          },
        },
      });
    }
  };
  const [subscribed, setSubscribed] = useState(false);
  useEffect(() => {
    if (roomData?.seeRoom && !subscribed) {
      subscribeToMore({
        document: Room_Updates,
        variables: {
          id: roomId,
        },
        updateQuery,
      });
      setSubscribed(true);
    }
  }, [roomData, subscribed]);
  const onValid = (form: IMessageForm) => {
    const { payload } = form;
    if (loading) {
      return;
    }
    sendMessage({
      variables: {
        roomId,
        payload,
      },
    });
  };
  return (
    <MessagesContainer>
      <SendMessageContainer>
        <form onSubmit={handleSubmit(onValid)}>
          <SendMessageInput
            {...register("payload", { required: true })}
            type="text"
            placeholder="Send a Message"
          />
        </form>
      </SendMessageContainer>
    </MessagesContainer>
  );
};

export default SendMessage;
