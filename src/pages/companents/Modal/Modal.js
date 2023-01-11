import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

export const Modal = ({ children, modal, setModal, title }) => {
 
  return (
    <div>

      <Dialog
        onClose={()=>setModal(false)}
        aria-labelledby="customized-dialog-title"
        open={modal}>
        <DialogTitle id="customized-dialog-title">{title}</DialogTitle>
            {children}
      </Dialog>
    </div>
  );
};
