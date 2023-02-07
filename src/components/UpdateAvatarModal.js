import React, { useState } from 'react';
import UpdateAvatarForm from './UpdateAvatarForm';

import {
  Dialog,
  DialogContent, ListItemIcon, MenuItem
} from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import { useDialogStyles } from '../styles/muiStyles';
import { DialogTitle } from './CustomDialogTitle';

const UpdateAvatarModal = ({ handleCloseMenu, user }) => {
  const classes = useDialogStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    handleCloseMenu();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <MenuItem onClick={handleClickOpen}>
        <ListItemIcon>
          <FaceIcon style={{ marginRight: 7 }} />
          {user.avatar.exists ? "Change Avatar" : "Add Avatar"}
        </ListItemIcon>
      </MenuItem>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        classes={{ paper: classes.dialogWrapper }}
        fullWidth
      >
        <DialogTitle onClose={handleClose}>
          {user.avatar.exists ? "Update your avatar" : "Add an avatar"}
        </DialogTitle>
        <DialogContent>
          <UpdateAvatarForm closeModal={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateAvatarModal;
