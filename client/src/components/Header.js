import { Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3, 0, 2),
    fontFamily: "Permanent Marker",
    textAlign: "center",
    fontSize: "40px",
    color: "black",
    textShadow: "1px 1px darkmagenta",
  },
}));

function Header() {
  const styles = useStyles();
  return (
    <Typography className={styles.root} component="h1" variant="h5">
      The Ultimate Form Challenge
    </Typography>
  );
}

export default Header;
