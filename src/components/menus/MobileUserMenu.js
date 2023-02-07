import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { getCircularAvatar } from "utils/cloudinaryTransform";
import storageService from "utils/localStorage";
import AuthFormModal from "../auth/AuthFormModal";
import DarkModeMenuItem from "./DarkModeMenuItem";
import SubFormModal from "./SubFormModal";
import UpdateAvatarModal from "../user/UpdateAvatarModal";

import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import { useUserMenuStyles } from "styles/muiStyles";

const MobileUserMenu = ({ user, handleLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useUserMenuStyles();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    handleClose();
    handleLogout();
  };

  const loggedUser = storageService.loadUser() || user;

  return (
    <div>
      {loggedUser ? (
        <IconButton onClick={handleMenu} className={classes.userBtnMob}>
          {loggedUser?.avatar?.exists ? (
            <Avatar
              alt={loggedUser.username}
              src={getCircularAvatar(loggedUser.avatar.imageLink)}
              className={classes.avatar}
            />
          ) : (
            <Avatar className={classes.avatar}>{loggedUser.username[0]}</Avatar>
          )}
          <MoreVertIcon color="primary" />
        </IconButton>
      ) : (
        <IconButton onClick={handleMenu} color="primary">
          <MoreVertIcon color="primary" />
        </IconButton>
      )}
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {loggedUser ? (
          <div>
            <MenuItem
              component={RouterLink}
              to={`/u/${loggedUser.username}`}
              onClick={handleClose}
            >
              <ListItemIcon>
                <AccountCircleIcon style={{ marginRight: 7 }} /> My Profile
              </ListItemIcon>
            </MenuItem>
            <SubFormModal type="menu" handleCloseMenu={handleClose} />
            <UpdateAvatarModal
              handleCloseMenu={handleClose}
              user={loggedUser}
            />
            <MenuItem onClick={handleLogoutClick}>
              <ListItemIcon>
                <PowerSettingsNewIcon style={{ marginRight: 7 }} /> Logout
              </ListItemIcon>
            </MenuItem>
            <Divider variant="middle" />
            <DarkModeMenuItem closeMenu={handleClose} />
          </div>
        ) : (
          <div>
            <AuthFormModal closeMobileMenu={handleClose} />
            <Divider variant="middle" />
            <DarkModeMenuItem closeMenu={handleClose} />
          </div>
        )}
      </Menu>
    </div>
  );
};

export default MobileUserMenu;
