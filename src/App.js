import './App.css';
import { useState, useRef, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import ChatMenu from './components/Menu/ChatMenu';
import ProfileMenu from './components/Menu/ProfileMenu';
import SettingsMenu from './components/Menu/SettingsMenu';
import ChatArea from './components/Chat/ChatArea';
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

      {isChatView && (
        <ChatArea 
          activeRoom={activeRoom}
          user={user}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          handleSendMessage={handleSendMessage}
          handleKeyPress={handleKeyPress}
          backToMenu={backToMenu}
        />
      )}
    </div>
  );
}

export default App;
