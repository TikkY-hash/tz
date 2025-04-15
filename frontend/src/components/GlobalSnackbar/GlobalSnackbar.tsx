import { Snackbar, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { AlertService } from "../AlertService";

export const GlobalSnackbar = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<"success" | "error">("success");

  useEffect(() => {
    AlertService.register((msg, sev) => {
      setMessage(msg);
      setSeverity(sev);
      setOpen(true);
    });
  }, []);

  const handleClose = () => setOpen(false);

  return (
    <Snackbar
      open={open}
      autoHideDuration={1000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
