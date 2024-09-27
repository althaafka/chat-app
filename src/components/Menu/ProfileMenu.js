import React from 'react';
import './Menu.css';

const ProfileMenu = ({ user }) => {
  return (
    <>
      <div className="menu-header">Profile</div>
      <div className="menu-profile">
        <img src={user.image_url} alt="profile"/>
        <h2>{user.name}</h2>
        <div>{user.id}</div>
      </div>
    </>
  );
};

export default ProfileMenu;