import React, { Fragment, useEffect } from 'react';
import { clientHasMissingData, userIsAdmin, userIsLogged } from '../../Commons';

import ClientNavbar from '../../components/ClientComponents/ClientNavbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MyTransferForm from '../../components/ClientComponents/Movements/MyTransferForm';
import { Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";

const NewTransfer = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!userIsLogged())
            navigate('/');

        if (userIsAdmin())
            navigate('/forbidden');

        if (clientHasMissingData())
            navigate('/completar-datos');
    }, []);

    return (
        <Fragment>
            <ClientNavbar></ClientNavbar>
            <Container maxWidth={false}>
                <Grid container spacing={2} alignItems="center">
                    <Grid style={{ paddingTop: "40px" }} item xs={8}>
                        <Typography variant="h4">
                            Nueva transferencia
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2} alignItems="center">
                    <Grid style={{ paddingTop: "40px" }} item xs={12} md={4}>
                        <MyTransferForm></MyTransferForm>
                    </Grid>
                </Grid>
            </Container>
        </Fragment>
    )
};

export default NewTransfer;