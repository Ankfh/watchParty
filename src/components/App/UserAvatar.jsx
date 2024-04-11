import React from 'react';
import Avatar from '@mui/material/Avatar';
import { SignInButton } from '../TopBar/TopBar';
import { InviteButton } from '../InviteButton/InviteButton';
const UserAvatar = (props) => {
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
      <div>{<SignInButton name={props.name} />}</div>
      <div>{props.showInviteButton && <InviteButton />}</div>
    </div>
  );
};

export default UserAvatar;
