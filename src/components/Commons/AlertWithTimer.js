import React, { useEffect, useState } from 'react';

import Alert from '@mui/material/Alert';

function AlertWithTimer({severity, message}) {
    const [alert, setAlert] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setAlert(false);
        }, 5000);
    }, []);

    return alert && <Alert severity={severity}>{message}</Alert>
};

export default AlertWithTimer;