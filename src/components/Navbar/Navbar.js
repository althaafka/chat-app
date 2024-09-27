import React from 'react';
import './Navbar.css';

function Navbar({ user, activeMenu, setMenu, isChatView }) {
  const menus = [
    { name: "Profile", icon: user.image_url },
    { name: "Chats", icon: "icons/chat.png" },
    { name: "Friends", icon: "icons/friends.png" },
    { name: "Settings", icon: "icons/settings.png" }
  ];

  return (
    <nav className={`navbar ${!isChatView ? 'active' : ''}`}>
      <ul>
        {menus.map((menu) => (
          <li 
            key={menu.name} 
            className={activeMenu === menu.name ? "active" : ""} 
            onClick={() => setMenu(menu.name)}
          >
            <img src={menu.icon} alt={`${menu.name} Icon`} className="menu-icon"/>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
