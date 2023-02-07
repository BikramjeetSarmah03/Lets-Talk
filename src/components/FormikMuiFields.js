import { FormControlLabel, Radio, TextField } from "@material-ui/core";
import { useField } from "formik";
import React from "react";

export const TextInput = ({
  placeholder,
  label,
  type,
  required,
  fullWidth,
  InputProps,
  multiline,
  rows,
  rowsMax,
  variant,
  size,
  disabled,
  ...props
}) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";

  return (
    <TextField
      placeholder={placeholder}
      label={label}
      type={type}
      InputProps={InputProps}
      required={required}
      fullWidth
      multiline={multiline}
      rows={rows}
      rowsMax={rowsMax}
      variant={variant}
      size={size}
      disabled={disabled}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

export const RadioInput = ({ label, ...props }) => {
  const [field] = useField(props);
  return <FormControlLabel {...field} control={<Radio />} label={label} />;
};
