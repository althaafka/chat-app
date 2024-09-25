import './App.css';
import { useState } from 'react';
import Navbar from './components/Navbar/Navbar';

const user_data = {
  "id": "customer@mail.com",
  "name": "king customer",
  "image_url": "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
}

const menu_data = [
  "profile",
  "chat",
  "friend",
  "setting"
]

function App() {
  const [user, setUser] = useState(user_data);
  const [menu, setMenu] = useState("chat");

  return (
    <div class="container">
      <Navbar user={user} activeMenu={menu} setMenu={setMenu} />
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
