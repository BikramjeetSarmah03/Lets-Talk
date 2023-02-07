import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { getCircularAvatar } from "utils/cloudinaryTransform";
import storageService from "utils/localStorage";
import AuthFormModal from "../auth/AuthFormModal";
import DarkModeMenuItem from "../menus/DarkModeMenuItem";
import SubFormModal from "../menus/SubFormModal";
import UpdateAvatarModal from "../user/UpdateAvatarModal";

import {
  Avatar,
  Button,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import { useUserMenuStyles } from "styles/muiStyles";

const DesktopUserMenu = ({ user, handleLogout }) => {
  const classes = useUserMenuStyles();
  const [anchorEl, setAnchorEl] = useState(null);

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
        <>
          <Button onClick={handleMenu} className={classes.userBtn}>
            {loggedUser?.avatar?.exists ? (
              <Avatar
                alt={loggedUser.username}
                src={getCircularAvatar(loggedUser.avatar.imageLink)}
                variant="rounded"
                className={classes.avatar}
              />
            ) : (
              <Avatar variant="rounded" className={classes.avatar}>
                {loggedUser.username[0]}
              </Avatar>
            )}
            <div>
              <Typography color="secondary">{loggedUser.username}</Typography>
            </div>
          </Button>
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
          </Menu>
        </>
      ) : (
        <div className={classes.navItems}>
          <AuthFormModal />
          <DarkModeMenuItem closeMenu={handleClose} navItem={true} />
        </div>
      )}
    </div>
  );
};

export default DesktopUserMenu;
