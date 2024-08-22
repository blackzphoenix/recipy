import React from "react";
import { Snackbar as MUISnackbar, Alert } from "@mui/material";

function Snackbar({ open, handleClose, message, severity }) {
  return (
    <MUISnackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </MUISnackbar>
  );
}

export default Snackbar;
