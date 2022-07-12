import { Button } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function PrimaryButton({ children, ...props }) {
  const styles = useStyles();
  return (
    <Button
      className={styles.root}
      fullWidth
      variant="contained"
      color="primary"
      type="submit"
      {...props}
    >
      {children}
    </Button>
  );
}

export default PrimaryButton;
