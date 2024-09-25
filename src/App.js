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
                  <img id="user-icon" src={user.image_url} alt="User Icon" class="user-icon"/>
              </li>
              <li><i class="icon-chat">C</i></li>
              <li><i class="icon-settings">S</i></li>
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
