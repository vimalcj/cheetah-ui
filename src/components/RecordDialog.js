
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React, { useState, useEffect } from "react";

export default function RecordDialog () {
  const [open, setOpen] = useState(false);
  
  const handleClickToOpen = () => {
    setOpen(true);
  };
  
  const handleToClose = () => {
    setOpen(false);
  };
  
  return (
    <div stlye={{}}>
      <h4>How to create Dialog Box in ReactJS?</h4>
      <Button variant="outlined" color="primary" 
              onClick={handleClickToOpen}>
        Open Demo Dialog
      </Button>
      <Dialog open={open} onClose={handleToClose}>
        <DialogTitle>{"How are you?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            I am Good, Hope the same for you!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleToClose} 
                  color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
  