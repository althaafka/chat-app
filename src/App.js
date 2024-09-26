import './App.css';
import { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
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
  const [activeRoom, setActiveRoom] = useState(items[0]);
  console.log(items);

  const getRoomName = (room) => {
    if (room.type && room.type == "single") {
      const otherParticipant = room.participant.find(p => p.id != user.id);
      return otherParticipant ? otherParticipant.name : "Private Chat";
    }
    return room.name;
  };

  const handleRoomClick = (room) => {
    setActiveRoom(room);
  };

  return (
    <div className="container">
      <Navbar user={user} activeMenu={menu} setMenu={setMenu} />
      <div className="menu">
        <div className="menu-header">{menu}</div>
        <div className="menu-controls">
          <input type="text" className="search-bar" placeholder="Search" />
          <button className="add-button">+</button>
        </div>
        <ul className="item-list">
          {items.map((item) => (
            <li 
              key={item.room.id} 
              className={`item ${activeRoom.room.id === item.room.id? 'active': ''}`}
              onClick={() => handleRoomClick(item)}
            >
              <img src={item.room.image_url? item.room.image_url: "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg" } className="item-avatar" alt={item.room.name} />
              <div className="item-details">
                <div className="item-name">
                  {getRoomName(item.room)}
                </div>
                <div className="item-message">{item.comments[0].message}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="chat-area">
        chat
      </div>
      <div className="side-bar">
        side-bar
      </div>
    </div>
  );
}

export default App;
