import React from 'react';
import Avatar from '@mui/material/Avatar';
import { SignInButton } from '../TopBar/TopBar';
import { InviteButton } from '../InviteButton/InviteButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const UserAvatar = (props) => {
  const clickSetting = () => {
    if (props.menuItemRef.current) {
      props.menuItemRef.current.props.onClick();
    }
  };
  return (
    <div
      style={{
        visibility: props.displayRightContent ? '' : 'hidden',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '5px',
        paddingLeft: '8px',
        paddingRight: '8px',
      }}
    >
      <div style={{ cursor: 'pointer' }}>
        {<SignInButton name={props.name} />}
      </div>
      <div style={{ cursor: 'pointer' }}>
        {props.showInviteButton && <InviteButton />}
      </div>
      <div style={{}} onClick={clickSetting}>
        <MoreVertIcon
          fontSize="large"
          style={{ color: 'white', cursor: 'pointer' }}
        />
      </div>
    </div>
  );
};

export default UserAvatar;
