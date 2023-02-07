import PropTypes from "prop-types";
import React, { useState } from "react";
import AuthForm from "./AuthForm";

import {
  Button,
  Dialog,
  DialogContent,
  IconButton,
  ListItemIcon,
  MenuItem,
  useMediaQuery,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useDialogStyles, useNavStyles } from "../styles/muiStyles";
import { DialogTitle } from "./CustomDialogTitle";

const AuthFormModal = ({ closeMobileMenu, type }) => {
  const classes = useDialogStyles();
  const classesBtn = useNavStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMobileMenu = () => {
    handleClickOpen();
    closeMobileMenu();
  };

  return (
    <div>
      {type === "upvote" ? (
        <IconButton
          onClick={handleClickOpen}
          fontSize={isMobile ? "small" : "medium"}
        >
          <ArrowUpwardIcon style={{ color: "#b2b2b2" }} />
        </IconButton>
      ) : type === "downvote" ? (
        <IconButton
          onClick={handleClickOpen}
          fontSize={isMobile ? "small" : "medium"}
        >
          <ArrowDownwardIcon style={{ color: "#b2b2b2" }} />
        </IconButton>
      ) : isMobile ? (
        <MenuItem onClick={handleMobileMenu}>
          <ListItemIcon>
            <ExitToAppIcon style={{ marginRight: 7 }} />
            Login/Register
          </ListItemIcon>
        </MenuItem>
      ) : (
        <Button
          color="primary"
          onClick={handleClickOpen}
          className={classesBtn.navButtons}
        >
          Login/Register
        </Button>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        classes={{ paper: classes.dialogWrapper }}
      >
        <DialogTitle onClose={handleClose}></DialogTitle>
        <DialogContent>
          <AuthForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

AuthFormModal.propTypes = {
  closeMobileMenu: PropTypes.func,
};

export default AuthFormModal;
