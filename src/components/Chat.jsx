import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import '../styles/Chat.css';
import StarBorderOutlineIcon from '@material-ui/icons/StarBorderOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import db from '../firebase/config';
import Message from './Message';
import ChatInput from './ChatInput';
import ContentLoader from 'react-content-loader';

function Chat() {
  const [roomDetails, setRoomDetails] = useState(null);
  const [roomMessages, setRoomMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emptyMessage, setEmptyMessage] = useState(false);

  const { roomId } = useParams();
  useEffect(() => {
    if (roomId) {
      db.collection('rooms')
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomDetails(snapshot.data()));
    }
    db.collection('rooms')
      .doc(roomId)
      .collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot((snapshot) => {
        setRoomMessages(snapshot.docs.map((doc) => doc.data()));
        setLoading(false);
      });
  }, [roomId]);

  useEffect(() => {
    if (!roomMessages.length) setEmptyMessage(true);
    else setEmptyMessage(false);
  }, [roomMessages]);

  return (
    <div className="chat">
      <div className="chat__header">
        <div className="chat__headerLeft">
          <h4 className="chat__channelName">
            <strong># {roomDetails?.name}</strong>
            <StarBorderOutlineIcon />
          </h4>
        </div>
        <div className="chat__headerRight">
          <p>
            <InfoOutlinedIcon /> Details
          </p>
        </div>
      </div>
      {loading ? (
        <ContentLoader
          style={{ padding: '20px' }}
          speed={2}
          width={400}
          height={160}
          viewBox="0 0 400 160"
          backgroundColor="#d1cccc"
          foregroundColor="#ecebeb"
        >
          <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
          <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
          <rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
          <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
          <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
          <circle cx="20" cy="20" r="20" />
        </ContentLoader>
      ) : (
        <div className="chat__messages">
          {emptyMessage ? (
            <Message emptyMessage />
          ) : (
            roomMessages.map(({ message, timestamp, user, userImage }) => (
              <Message
                message={message}
                timestamp={timestamp}
                user={user}
                userImage={userImage}
                key={timestamp}
              />
            ))
          )}
        </div>
      )}

      <ChatInput channelName={roomDetails?.name} channelId={roomId} />
    </div>
  );
}

export default Chat;
