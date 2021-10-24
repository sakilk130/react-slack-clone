import React from 'react';

import '../styles/Message.css';
import moment from 'moment';

const Message = ({ message, timestamp, user, userImage }) => {
  return (
    <div className="message">
      <img src={userImage} alt="" />
      <div className="message__info">
        <h4>
          {user}{' '}
          <span className="message__timestamp">
            {moment(new Date(timestamp?.toDate()).toUTCString()).fromNow()}
          </span>
        </h4>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Message;
