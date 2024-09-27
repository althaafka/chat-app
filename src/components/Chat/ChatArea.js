import React, { useRef, useEffect } from 'react';
import Message from './Message';
import './Chat.css';

const ChatArea = ({ activeRoom, user, newMessage, setNewMessage, handleSendMessage, handleKeyPress, backToMenu }) => {
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeRoom?.comments]);

  const getParticipant = (senderId) => {
    return activeRoom.room.participant.find((participant) => participant.id === senderId);
  };

  return (
    <div className="chat-area active">
      <div className="chat-header">
        <button className="back-button" onClick={backToMenu}>
          <img src="icons/left-arrow.png" alt="back"/>
        </button>
        <img src={activeRoom?.room.image_url || user.image_url} className="chat-avatar" alt="avatar"/>
        <div className="chat-room-info">
          <h3>{activeRoom?.room.name}</h3>
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
  );
};

export default ChatArea;