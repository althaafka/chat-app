import React from 'react';
import './Menu.css';

const SettingsMenu = ({ darkMode, setDarkMode }) => {
  
  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <div className="menu-header">Settings</div>
      <div className="menu-settings">
        <div class="theme-switch-wrapper">
            <label class="theme-switch" for="checkbox">
                <input 
                    type="checkbox" 
                    id="checkbox"
                    checked={darkMode} 
                    onChange={handleToggleDarkMode} 
                />
                <div class="slider round"></div>
            </label>
        </div>
        <h3>Dark Mode</h3>
      </div>
    </>
  );
};

export default SettingsMenu;
