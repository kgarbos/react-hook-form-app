import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useData } from "../DataContext";
import MainContainer from "../MainContainer";
import PrimaryButton from "../PrimaryButton";
import axios from "axios";
import Swal from "sweetalert2";
import Confetti from "react-confetti";
import { InsertDriveFile } from "@material-ui/icons";

const useStyles = makeStyles({
  root: {
    marginBottom: "30px",
  },
  table: {
    marginBottom: "30px",
  },
});

function Result() {
  const [success, setSuccess] = useState(false);
  const styles = useStyles();
  const { data } = useData();

  const entries = Object.entries(data).filter((entry) => entry[0] !== "files");
  const { files } = data;

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (data.files) {
      data.files.forEach((file) => {
        formData.append("files", file, file.name);
      });
    }

    entries.forEach((entry) => {
      formData.append(entry[0], entry[1]);
    });

    const response = await axios({
      method: 'post',
      url: 'api/result',
      data: formData,
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
      },
    });

    if (response.status === 200) {
      Swal.fire("Great job!", "You've passed the challenge and have received an email!", "success");
      setSuccess(true);
    }
  };
  if (success) {
    return <Confetti />;
  }
  return (
    <>
      <MainContainer>
        <Typography component="h2" variant="h5">
          📋 Form Values
        </Typography>
        <TableContainer className={styles.root} component={Paper}>
          <Table className={styles.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Field</TableCell>
                <TableCell align="right">Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {entries.map((entry) => (
                <TableRow key={entry[0]}>
                  <TableCell component="th" scope="row">
                    {entry[0]}
                  </TableCell>
                  <TableCell align="right">{entry[1].toString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {files && (
          <>
            <Typography componemt="h2" variant="h5">
              📦 Files
            </Typography>
            <List>
              {files.map((f, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <InsertDriveFile />
                  </ListItemIcon>
                  <ListItemText primary={f.name} secondary={f.size} />
                </ListItem>
              ))}
            </List>
          </>
        )}
        <PrimaryButton onClick={onSubmit}>Submit</PrimaryButton>
        <Link to="/">Start over</Link>
      </MainContainer>
    </>
  );
}

export default Result;
