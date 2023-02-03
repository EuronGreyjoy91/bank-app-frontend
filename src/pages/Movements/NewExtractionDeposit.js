import React, { Fragment, useEffect } from 'react';
import { clientHasMissingData, userIsAdmin, userIsLogged } from '../../Commons';
import { useNavigate, useParams } from "react-router-dom";

import ClientNavbar from '../../components/ClientComponents/ClientNavbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MyMovementForm from '../../components/ClientComponents/Movements/MyMovementForm';
import { Typography } from '@mui/material';

const NewExtractionDeposit = () => {
    const { accountId } = useParams();
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
                            Nuevo movimiento de cuenta
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2} alignItems="center">
                    <Grid style={{ paddingTop: "40px" }} item xs={12} md={4}>
                        <MyMovementForm></MyMovementForm>
                    </Grid>
                </Grid>
            </Container>
        </Fragment>
    )
};

export default NewExtractionDeposit;