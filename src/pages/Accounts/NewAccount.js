import React, { Fragment } from 'react';

import AccountForm from '../../components/AdminComponents/Accounts/AccountForm';
import AdminNavbar from '../../components/AdminComponents/AdminNavbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import { useParams } from "react-router-dom";

const NewAccount = () => {
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
                        <AccountForm></AccountForm>
                    </Grid>
                </Grid>
            </Container>
        </Fragment>
    )
};

export default NewAccount;