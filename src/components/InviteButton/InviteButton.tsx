import React, { useState } from 'react';
import { Button, Icon, Popup } from 'semantic-ui-react';
import { InviteModal } from '../Modal/InviteModal';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { MuiPersonAddIcon } from './MuiIcon';
export const InviteButton = () => {
  const [inviteModalOpen, setInviteModalOpen] = useState(false);

  return (
    <>
      {inviteModalOpen && (
        <InviteModal closeInviteModal={() => setInviteModalOpen(false)} />
      )}
      <Popup
        content="Invite friends!"
        trigger={
          <div onClick={() => setInviteModalOpen(true)}>
            <MuiPersonAddIcon fontSize="large" />
          </div>
        }
      />
    </>
  );
};
