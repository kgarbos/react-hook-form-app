import { TextField } from "@material-ui/core";
import React, { forwardRef } from "react";

export const Input = forwardRef((props, ref) => {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      inputRef={ref}
      fullWidth
      {...props}
    />
  );
});
