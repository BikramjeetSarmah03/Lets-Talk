import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notify } from "redux/reducers/notificationReducer";
import { deleteAvatar, setAvatar } from "redux/reducers/userReducer";
import generateBase64Encode from "utils/genBase64Encode";
import getErrorMsg from "utils/getErrorMsg";
import AlertMessage from "../alert/AlertMessage";
import DeleteDialog from "../others/DeleteDialog";

import {
  Button,
  IconButton,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import FaceIcon from "@material-ui/icons/Face";
import PublishIcon from "@material-ui/icons/Publish";
import { useAvatarFormStyles } from "styles/muiStyles";

const UpdateAvatarForm = ({ closeModal }) => {
  const classes = useAvatarFormStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
  const [avatarInput, setAvatarInput] = useState("");
  const [fileName, setFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setFileName(file.name);
    generateBase64Encode(file, setAvatarInput, true);
  };

  const clearfileSelection = () => {
    setAvatarInput("");
    setFileName("");
  };

  const handleAvatarUpload = async () => {
    if (avatarInput === "") {
      return setError("Select an image file first.");
    }

    try {
      setIsLoading(true);
      await dispatch(setAvatar(avatarInput));
      setIsLoading(false);

      dispatch(notify("Successfully updated the avatar!", "success"));
      setAvatarInput("");
      setFileName("");
      closeModal();
    } catch (err) {
      setIsLoading(false);
      setError(getErrorMsg(err), "error");
    }
  };

  const handleRemoveAvatar = async () => {
    try {
      await dispatch(deleteAvatar());
      dispatch(notify("Removed avatar.", "success"));
    } catch (err) {
      setError(getErrorMsg(err), "error");
    }
  };

  return (
    <div>
      {user?.avatar?.exists && (
        <div>
          <div className={classes.imagePreview}>
            <img
              alt={user.username + "-avatar"}
              src={user.avatar.imageLink}
              width={150}
            />
          </div>
          <div className={classes.currentAvatar}>
            <Typography
              variant="h6"
              color="secondary"
              className={classes.currentAvatarText}
            >
              Current Avatar
            </Typography>
            <DeleteDialog type="avatar" handleDelete={handleRemoveAvatar} />
          </div>
        </div>
      )}
      <div className={classes.imageBtnsWrapper}>
        <input
          type="file"
          id="image-upload"
          accept="image/*"
          hidden
          onChange={handleFileInputChange}
        />
        <Button
          component="label"
          htmlFor="image-upload"
          variant="outlined"
          color="primary"
          fullWidth
          startIcon={avatarInput ? <CheckCircleIcon /> : <PublishIcon />}
          className={classes.selectBtn}
        >
          {avatarInput
            ? `${isMobile ? "" : "Selected "}"${fileName}"`
            : `Select Image`}
        </Button>
        {avatarInput && (
          <IconButton
            onClick={clearfileSelection}
            color="secondary"
            size={isMobile ? "small" : "medium"}
            className={classes.clearSelectionBtn}
          >
            <CancelIcon />
          </IconButton>
        )}
      </div>
      {avatarInput && (
        <div className={classes.imagePreview}>
          <img alt={fileName} src={avatarInput} width={isMobile ? 250 : 350} />
        </div>
      )}
      <Button
        size={isMobile ? "medium" : "large"}
        variant="contained"
        color="secondary"
        className={classes.submitButton}
        fullWidth
        startIcon={<FaceIcon />}
        onClick={handleAvatarUpload}
        disabled={isLoading}
      >
        {user?.avatar?.exists
          ? isLoading
            ? "Updating"
            : "Update avatar"
          : isLoading
          ? "Adding"
          : "Add avatar"}
      </Button>
      <AlertMessage
        error={error}
        severity="error"
        clearError={() => setError(null)}
      />
    </div>
  );
};

export default UpdateAvatarForm;
