import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { RefreshContext } from "../../pages/MyContent";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function UpdateAlert(props) {
  const [state, dispatch] = React.useContext(RefreshContext);

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch({ type: "OnAlert", payload: false });
  };
  return (
    <Snackbar
      open={state.alert}
      autoHideDuration={5000}
      onClose={handleCloseAlert}
    >
      <Alert
        onClose={handleCloseAlert}
        severity={state.message === "updated" ? "success" : "error"}
      >
        Your post has been {state.message}!
      </Alert>
    </Snackbar>
  );
}
