import React from 'react';
import { Avatar } from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SearchIcon from '@material-ui/icons/Search';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

import '../styles/Header.css';

function Header() {
  return (
    <div className="header">
      <div className="header__left">
        {/* Avatar for logged in user */}
        <Avatar className="header__avatar" />

        {/* Time icon */}
        <AccessTimeIcon />
      </div>

      <div className="header__search">
        {/* Search icon */}
        <SearchIcon />

        {/* Input */}
        <input type="text" placeholder="Search Programmer " />
      </div>

      <div className="header__right">
        {/* help icon */}
        <HelpOutlineIcon />
      </div>
    </div>
  );
}

export default Header;
