import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { notify } from "redux/reducers/notificationReducer";
import { addNewSub } from "redux/reducers/subReducer";
import getErrorMsg from "utils/getErrorMsg";
import AlertMessage from "../alert/AlertMessage";
import { TextInput } from "../others/FormikMuiFields";

import { Button, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import InfoIcon from "@material-ui/icons/Info";
import { useSubredditFormStyles } from "styles/muiStyles";

const validationSchema = yup.object({
  subredditName: yup
    .string()
    .required("Required")
    .max(20, "Must be at most 20 characters")
    .min(3, "Must be at least 3 characters")
    .matches(
      /^[a-zA-Z0-9-_]*$/,
      "Only alphanumeric characters allowed, no spaces/symbols"
    ),
  description: yup
    .string()
    .required("Required")
    .max(100, "Must be at most 100 characters")
    .min(3, "Must be at least 3 characters"),
});

const SubForm = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const classes = useSubredditFormStyles();
  const history = useHistory();

  const handleCreateSub = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
      await dispatch(addNewSub(values));
      setSubmitting(false);
      dispatch(
        notify(`New community created: c/${values.subredditName}`, "success")
      );
      history.push(`/c/${values.subredditName}`);
    } catch (err) {
      setSubmitting(false);
      dispatch(notify(getErrorMsg(err), "error"));
    }
  };

  return (
    <div className={classes.formWrapper}>
      <Formik
        validateOnChange={true}
        initialValues={{ subredditName: "", description: "" }}
        onSubmit={handleCreateSub}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => (
          <Form className={classes.form}>
            <div className={classes.input}>
              <Typography
                className={classes.inputIconText}
                color="primary"
                variant="h5"
              >
                c/
              </Typography>
              <TextInput
                name="subredditName"
                type="text"
                placeholder="Enter name"
                label="community Name"
                required
                fullWidth
              />
            </div>
            <div className={classes.descInput}>
              <InfoIcon className={classes.inputIcon} color="primary" />
              <TextInput
                name="description"
                type="text"
                placeholder="Enter description"
                label="Description"
                required
                fullWidth
                variant="outlined"
                multiline
                rows={2}
                maxRows={Infinity}
              />
            </div>
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              size="large"
              className={classes.submitButton}
              disabled={isSubmitting}
              startIcon={<AddIcon />}
            >
              {isSubmitting ? "Creating" : "Create community"}
            </Button>
          </Form>
        )}
      </Formik>
      <AlertMessage
        error={error}
        severity="error"
        clearError={() => setError(null)}
      />
    </div>
  );
};

export default SubForm;
