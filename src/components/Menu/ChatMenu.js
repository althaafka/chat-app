import React from 'react';
import './Menu.css';

const ChatMenu = ({ filteredItems, activeRoom, handleRoomClick, searchTerm, setSearchTerm }) => {
  const getRoomName = (room) => {
    if (room?.type === "single") {
      const otherParticipant = room.participant.find(p => p.id !== "customer@mail.com");
      return otherParticipant ? otherParticipant.name : "Private Chat";
    }
    return room?.name;
  };

  return (
    <>
      <div className="menu-header">Chats</div>
      <div className="menu-controls">
        <input 
          type="text" 
          className="search-bar" 
          placeholder="Search" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <button className="add-button">+</button>
      </div>
      <ul className="item-list">
        {filteredItems.map((item) => (
          <li 
            key={item.room.id} 
            className={`item ${activeRoom?.room.id === item.room.id ? 'active' : ''}`}
            onClick={() => handleRoomClick(item)}
          >
            <div className="item-avatar">
              <img src={item.room.image_url ? item.room.image_url : "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"} alt={item.room.name} />
            </div>
            <div className="item-details">
              <div className="item-name">
                {getRoomName(item.room)}
              </div>
              <div className="item-message">
              {item.comments[item.comments.length-1].type === "text"? item.comments[item.comments.length-1].message : item.comments[item.comments.length-1].type}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ChatMenu;