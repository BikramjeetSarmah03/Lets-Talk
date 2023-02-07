import { CircularProgress, Typography } from "@material-ui/core";
import React from "react";
import { usePostListStyles } from "../styles/muiStyles";

const LoadingSpinner = ({ text }) => {
  const classes = usePostListStyles();

  return (
    <div className={classes.loadSpinner}>
      <CircularProgress size="6em" disableShrink />
      <Typography color="primary" variant="body1">
        {text}
      </Typography>
    </div>
  );
};

export default LoadingSpinner;
