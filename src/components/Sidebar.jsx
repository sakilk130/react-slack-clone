import React, { useState, useEffect } from 'react';

import '../styles/Sidebar.css';

import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CreateIcon from '@material-ui/icons/Create';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AppsIcon from '@material-ui/icons/Apps';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import SidebarOption from './SidebarOption';
import db from '../firebase/config';
import { useStateValue } from '../context-api/StateProvider';
import ContentLoader from 'react-content-loader';

function Sidebar() {
  const [{ user }] = useStateValue();
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.collection('rooms').onSnapshot(
      (snapshot) => (
        setChannels(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name,
          }))
        ),
        setLoading(false)
      )
    );
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar___info">
          <h2>Programmers</h2>
          <h3>
            <FiberManualRecordIcon />
            {user?.displayName}
          </h3>
        </div>
        <CreateIcon />
      </div>
      <SidebarOption Icon={InsertCommentIcon} title="Threads" />
      <SidebarOption Icon={InboxIcon} title="Metions & reactions" />
      <SidebarOption Icon={DraftsIcon} title="Saved items" />
      <SidebarOption Icon={BookmarkBorderIcon} title="Channel browser" />
      <SidebarOption Icon={FileCopyIcon} title="File browser" />
      <SidebarOption Icon={PeopleAltIcon} title="People & user groups" />
      <SidebarOption Icon={AppsIcon} title="Apps" />
      <SidebarOption Icon={ExpandLessIcon} title="Show less" />
      <hr />
      <SidebarOption Icon={ExpandMoreIcon} title="Channels" />
      <hr />
      <SidebarOption Icon={AddIcon} addChannelOption title="Add Channels" />
      {/* Connect to database and list all channels */}

      {loading ? (
        <ContentLoader
          speed={2}
          width={400}
          height={160}
          viewBox="0 0 400 160"
          backgroundColor="#49274b"
          foregroundColor="#ecebeb"
        >
          <rect x="28" y="30" rx="0" ry="0" width="92" height="8" />
          <rect x="30" y="52" rx="0" ry="0" width="89" height="8" />
        </ContentLoader>
      ) : (
        channels.map((channel) => (
          <SidebarOption
            key={channel.id}
            title={channel.name}
            id={channel.id}
          />
        ))
      )}
    </div>
  );
}

export default Sidebar;
