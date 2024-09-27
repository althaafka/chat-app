import './App.css';
import { useState, useRef, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import ChatMenu from './components/Menu/ChatMenu';
import ProfileMenu from './components/Menu/ProfileMenu';
import SettingsMenu from './components/Menu/SettingsMenu';
import Message from './components/Chat/Message';
import raw_data from './data/data_long.json';

const user_data = {
  "id": "customer@mail.com",
  "name": "king customer",
  "image_url": "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
};

function App() {
  const [user, setUser] = useState(user_data);
  const [menu, setMenu] = useState("Chats");
  const [items, setItems] = useState(raw_data.results);
  const [activeRoom, setActiveRoom] = useState(null);
  const [newMessage, setNewMessage] = useState(""); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const [isChatView, setIsChatView] = useState(false); 
  const [darkMode, setDarkMode] = useState(false)

  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeRoom?.comments]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [darkMode]);

  const getRoomName = (room) => {
    if (room?.type === "single") {
      const otherParticipant = room.participant.find(p => p.id !== user.id);
      return otherParticipant ? otherParticipant.name : "Private Chat";
    }
    return room?.name;
  };

  const handleRoomClick = (room) => {
    setActiveRoom(room);
    setIsChatView(true);
  };

  const getParticipant = (senderId) => {
    return activeRoom.room.participant.find((participant) => participant.id === senderId);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const newComment = {
      id: Date.now(), 
      type: "text",
      message: newMessage,
      sender: user.id
    };

    const updatedRoom = {
      ...activeRoom,
      comments: [...activeRoom.comments, newComment]
    };

    const updatedItems = items.map(item =>
      item.room.id === activeRoom.room.id ? updatedRoom : item
    );

    setActiveRoom(updatedRoom); 
    setItems(updatedItems); 
    setNewMessage(""); 
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const backToMenu = () => {
    setIsChatView(false); 
  };

  const filteredItems = items.filter(item => {
    const roomName = getRoomName(item.room).toLowerCase();
    const hasMatchingMessage = item.comments.some(comment =>
      comment.message?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return roomName.includes(searchTerm.toLowerCase()) || hasMatchingMessage;
  });

  const renderMenu = () => {
    switch (menu) {
      case "Chats":
        return (
          <ChatMenu
            filteredItems={filteredItems} 
            activeRoom={activeRoom} 
            handleRoomClick={handleRoomClick} 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm}
          />
        );
      case "Settings":
        return <SettingsMenu darkMode={darkMode} setDarkMode={setDarkMode}/>;
      case "Profile":
        return <ProfileMenu user={user}/>;
      default:
        return <ChatMenu 
          filteredItems={filteredItems} 
          activeRoom={activeRoom} 
          handleRoomClick={handleRoomClick} 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm}
        />;
    }
  };
  return (
    <div className="container">
      <Navbar user={user} activeMenu={menu} setMenu={setMenu} isChatView={isChatView} />

      <div className={`menu ${!isChatView ? 'active' : ''}`}>
        {renderMenu()}
      </div>

      <div className={`chat-area ${isChatView ? 'active' : ''}`}>
        <div className="chat-header">
          <button className="back-button" onClick={backToMenu}>
            <img src="icons/left-arrow.png" alt="back"/>
          </button>
          <img src={activeRoom?.room.image_url || user.image_url} className="chat-avatar" alt="avatar"/>
          <div className="chat-room-info">
            <h3>{getRoomName(activeRoom?.room)}</h3>
          </div>
        </div>
        <div className="chat-messages">
          {activeRoom?.comments.map((comment, index) => {
            const participant = getParticipant(comment.sender);
            const previousComment = index > 0 ? activeRoom.comments[index - 1] : null;
            return (
              <>
                {activeRoom.room.type === "multiple" && comment.sender !== user.id && (!previousComment || previousComment.sender !== comment.sender) && (
                  <div className="message-sender">{participant?.name}</div>
                )}
                <Message key={comment.id} comment={comment} user={user} />
                <div ref={chatEndRef}></div>
              </>
            );
          })}
        </div>
        <div className="chat-input">
          <button className="attachment-button">
            <img src='icons/link-file.png' alt="Attach" />
          </button>
          <input 
            type="text" 
            placeholder="Type something..." 
            value={newMessage} 
            onChange={(e) => setNewMessage(e.target.value)} 
            onKeyPress={handleKeyPress}
          />
          <button className="send-button" onClick={handleSendMessage}>
            <img src='icons/send-message.png' alt="Send" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
