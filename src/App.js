import './App.css';
import { useState } from 'react';

const user_data = {
  "id": "customer@mail.com",
  "name": "king customer",
  "image_url": "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
}

function App() {
  const [user, setUser] = useState(user_data);

  return (
    <div class="container">
      <nav class="navbar">
          <ul>
              <li>
                <img src={user.image_url} alt="User Icon" class="user-icon"/>
              </li>
              <li>
                <img src="icons/chat.png" alt="Chat Icon" class="menu-icon"/>
              </li>    
              <li>
                <img src="icons/friends.png" alt="Friends Icon" class="menu-icon"/>
              </li>               
              <li>
                <img src="icons/settings.png" alt="Settings Icon" class="menu-icon"/>
              </li>
          </ul>
      </nav>
      <div class="menu">
          menu
      </div>
      <div class="chat-area">
          chat
      </div>
      <div class="side-bar">
          side-bar
      </div>
   </div>
  );
}

export default App;
