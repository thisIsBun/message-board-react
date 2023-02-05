import styled from "styled-components";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const API_ENDPOINT = "https://student-json-api.lidemy.me/comments";

const Page = styled.div`
  width: 360px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #333;
`;

const MessageForm = styled.form`
  margin-top: 16px;
`;

const MessageTextArea = styled.textarea`
  display: block;
  width: 100%;
`;

const SubmitButton = styled.button`
  margin-top: 8px;
`;

const MessageList = styled.div`
  margin-top: 16px;
`;

const MessageContainer = styled.div`
  border: 1px solid black;
  padding: 8px 16px;
  border-radius: 8px;

  &:not(first-child) {
    margin-top: 8px;
  }
`;

const MessageHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3)
  padding-bottom: 4px;
`;

const MessageAuther = styled.div`
  color: #333;
  font-size: 14px;
`;

const MessageTime = styled.div``;
const MessageBody = styled.div`
  margin-top: 16px;
  font-size: 16px;
`;

const ErrorMessage = styled.p`
  margin-top: 16px;
  color: red;
`;

const Loading = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
`

function Message({ auther, time, children }) {
  return (
    <MessageContainer>
      <MessageHead>
        <MessageAuther>{auther}</MessageAuther>
        <MessageTime>{time}</MessageTime>
      </MessageHead>
      <MessageBody>{children}</MessageBody>
    </MessageContainer>
  );
}

Message.propTypes = {
  auther: PropTypes.string,
  time: PropTypes.string,
  children: PropTypes.node,
};

function App() {
  const [messages, setMessages] = useState(null);
  const [messageApiError, setMessageApiError] = useState(null);
  const [value, setValue] = useState("");
  const [postMessageError, setPostMessageError] = useState("")
  const [isLoadingPostMessage, setIsLoadingPostMessage] = useState(false)

  const fetchMessage = () => {
    fetch(API_ENDPOINT)
      .then((res) => res.json())
      .then((data) => {
        setMessages(data.reverse());
      })
      .catch((err) => {
        setMessageApiError(err.message);
      });
  };

  const handleTextareaChange = (e) => {
    setValue(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (isLoadingPostMessage) return;
    setIsLoadingPostMessage(true)

    fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        nickname: "bun",
        body: value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoadingPostMessage(false);
        if (data.ok === 0) {
          setPostMessageError(data.message);
          return;
        }
        fetchMessage();
        setValue("");
      })
      .catch((err) => {
        setIsLoadingPostMessage(false);
        setPostMessageError(err.message);
      });
  };

  const handleTextareaFocus = () => {
    setPostMessageError(null)
  }

  // App component render完後去 fetch api，因為只有畫面 render完後 fetch一次所以要放[]
  useEffect(() => {
    fetchMessage()
  }, []);

  return (
    <Page>
      {isLoadingPostMessage && <Loading>Loading...</Loading>}
      <Title>留言板</Title>
      <MessageForm onSubmit={handleFormSubmit}>
        <MessageTextArea
          rows={10}
          value={value}
          onChange={handleTextareaChange}
          onFocus={handleTextareaFocus}
        />
        <SubmitButton>送出留言</SubmitButton>
        {postMessageError && (
          <ErrorMessage>{postMessageError}</ErrorMessage>
        )}
      </MessageForm>
      <MessageList>
        {messages &&
          messages.map((message) => {
            return (
              <Message
                key={message.id}
                auther={message.nickname}
                time={new Date(message.createdAt).toLocaleString()}
              >
                {message.body}
              </Message>
            );
          })}
      </MessageList>
      {messageApiError && (
        <ErrorMessage>
          Something went wrong. {messageApiError.toString()}
        </ErrorMessage>
      )}
      {messages && messages.length === 0 && <p>No Message.</p>}
    </Page>
  );
}

export default App;
