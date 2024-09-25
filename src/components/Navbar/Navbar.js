import React from 'react';
import './Navbar.css';

function Navbar({ user, activeMenu, setMenu }) {
  const menus = [
    { name: "profile", icon: user.image_url },
    { name: "chat", icon: "icons/chat.png" },
    { name: "friend", icon: "icons/friends.png" },
    { name: "setting", icon: "icons/settings.png" }
  ];

  return (
    <nav className="navbar">
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
