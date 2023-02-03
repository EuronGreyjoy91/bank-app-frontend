import './Forbidden.css';

import React from 'react';
import { Typography } from '@mui/material';

const Forbidden = () => (
    <div className='center-div-forbidden'>
        <Typography variant="h1">
            403
        </Typography>
        <Typography variant="h2">
            Acceso invalido
        </Typography>
    </div>
)

export default Forbidden;