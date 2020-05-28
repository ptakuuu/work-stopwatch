import React from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";

function SnackBar(props) {
  const [showSnackbar, setShowSnackbar] = React.useState(true);

  function Alert(props) {
    return <MuiAlert elevation={6} variant='filled' {...props} />;
  }

  function handleOpenCloseSnackbar() {
    setShowSnackbar(!showSnackbar);
  }

  return (
    <Snackbar
      open={showSnackbar}
      autoHideDuration={3000}
      onClose={handleOpenCloseSnackbar}
    >
      <Alert onClose={handleOpenCloseSnackbar} severity={props.type}>
        {props.message}
      </Alert>
    </Snackbar>
  );
}

export default SnackBar;
