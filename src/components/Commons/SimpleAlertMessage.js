import Button from "@material-ui/core/Button";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, { forwardRef, useImperativeHandle, useState } from 'react';

const SimpleAlertMessage = forwardRef((props, _ref) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('Ocurrio un error, intente nuevamente');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useImperativeHandle(_ref, (message) => ({
        getHandleClickOpen: (message) => {
            setMessage(message);
            return handleClickOpen;
        },
    }));

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Error!"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    )
})

export default SimpleAlertMessage;