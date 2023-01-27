import React, { Fragment, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { userIsAdmin, userIsLogged } from '../../Commons';

import ClientNavbar from '../../components/ClientComponents/ClientNavbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MyAccountForm from '../../components/ClientComponents/MyAccounts/MyAccountForm';
import { Typography } from '@mui/material';

const MyNewAccount = () => {
    const { accountId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!userIsLogged())
            navigate('/');

        if (userIsAdmin()) {
            navigate('/forbidden');
        }
    }, []);

    return (
        <Fragment>
            <ClientNavbar></ClientNavbar>
            <Container maxWidth={false}>
                <Grid container spacing={2} alignItems="center">
                    <Grid style={{ paddingTop: "40px" }} item xs={8}>
                        <Typography variant="h4">
                            {accountId != null ? "Editar cuenta" : "Nueva cuenta"}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2} alignItems="center">
                    <Grid style={{ paddingTop: "40px" }} item xs={12} md={4}>
                        <MyAccountForm></MyAccountForm>
                    </Grid>
                </Grid>
            </Container>
        </Fragment>
    )
};

export default MyNewAccount;