import React, { Fragment } from 'react';

import AdminNavbar from '../../components/AdminComponents/AdminNavbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MyAccountForm from '../../components/ClientComponents/MyAccounts/MyAccountForm';
import { Typography } from '@mui/material';
import { useParams } from "react-router-dom";

const MyNewAccount = () => {
    const { accountId } = useParams();

    return (
        <Fragment>
            <AdminNavbar></AdminNavbar>
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