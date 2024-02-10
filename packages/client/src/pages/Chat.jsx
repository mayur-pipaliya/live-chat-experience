import React, { useEffect, useState, useRef, useCallback } from "react";
import Axios from "../request/axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  // useEffect(() => {
  //   if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
  //     navigate("/login");
  //   } else {
  //     setCurrentUser(
  //       JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
  //     );
  //   }
  // }, [navigate]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(process.env.REACT_APP_API_HOST);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  const fetchData = useCallback(async (id) => {
    const data = await Axios.get(`${allUsersRoute}/${id}`);
    if (data.data) {
      setContacts(data.data);
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        fetchData(currentUser._id);
      } else {
        navigate("/setAvatar");
      }
    }
  }, [currentUser, fetchData, navigate]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts} changeChat={handleChatChange} />
        {!currentChat ? (
          <Welcome />
        ) : (
          <ChatContainer currentChat={currentChat} socket={socket} />
        )}
      </div>
    </Container>
  );
}
