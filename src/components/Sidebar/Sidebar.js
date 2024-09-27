import React from 'react';
import { useState, useEffect } from 'react';
// import './Sidebar.css';

const Sidebar = ({ visible, activeRoom, toggleSidebar, user}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  useEffect(() => {
    if (visible) {
      setIsAnimating(true);
    } else {
      setTimeout(() => setIsAnimating(false), 0);
    }
  }, [visible]);

  const getRoomName = (room) => {
      if (room?.type === "single") {
        const otherParticipant = room.participant.find(p => p.id !== user.id);
        return otherParticipant ? otherParticipant.name : "Private Chat";
      }
      return room?.name;
  };

  const getDescription = () => {
    if (activeRoom?.room.type === "single"){
        const otherParticipant = activeRoom.room.participant.find(p => p.id !== user.id);
        return <div>{otherParticipant.id}</div>
    } else {
        return (
            <div className="group-participants">
              <ul>
                {activeRoom.room.participant
                  .filter(p => p.id !== user.id)
                  .map((participant) => (
                    <li key={participant.id}>{participant.name || participant.id}</li>
                  ))}
              </ul>
            </div>
          );
    }
  }

  return (
    <div className={`side-bar ${visible ? 'active' : ''} ${isAnimating ? 'open' : ''}`}>
      <button className="back-button-sidebar" onClick={toggleSidebar}>
        <img src="icons/right-arrow.png" alt="back"/>
      </button>
      {activeRoom && (
        <div className="menu-profile">
          <img src={activeRoom.room.type == "single"? "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg": activeRoom.room.image_url} alt="profile"/>
          <h2>{getRoomName(activeRoom.room)}</h2>
          {getDescription()}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
